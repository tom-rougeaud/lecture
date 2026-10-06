/* Lecture+ — moteur de voix neuronale Piper (s’exécute entièrement dans le navigateur).
   Le texte ne quitte jamais l’appareil : seuls les fichiers du modèle de voix sont téléchargés
   (une seule fois, puis conservés dans le cache du navigateur). */
'use strict';
self.importScripts('ort.wasm.min.js', 'piper_phonemize.js');
const BASE = new URL('./', self.location.href).href;
ort.env.wasm.numThreads = 1;
ort.env.wasm.wasmPaths = BASE;
const CACHE = 'lectureplus-voix-v1';

let session = null, cfg = null, phon = null, phonOut = [];

async function getPhonemizer() {
  if (phon) return phon;
  phon = await createPiperPhonemize({
    print: line => { phonOut.push(line); },
    printErr: () => {},
    locateFile: f => BASE + f
  });
  return phon;
}

async function openCache() {
  try { return await caches.open(CACHE); } catch (e) { return null; }
}

/** Télécharge (avec progression) ou relit depuis le cache la première URL qui répond. */
async function fetchFirst(urls, label, wantJson) {
  const cache = await openCache();
  for (const url of urls) {
    try {
      if (cache) {
        const hit = await cache.match(url);
        if (hit) return wantJson ? hit.json() : hit.arrayBuffer();
      }
      const res = await fetch(url, { credentials: 'omit', referrerPolicy: 'no-referrer' });
      if (!res.ok) continue;
      const type = res.headers.get('content-type') || '';
      if (/text\/html/i.test(type)) continue;
      const total = Number(res.headers.get('content-length')) || 0;
      let buf;
      if (res.body && res.body.getReader && !wantJson) {
        const reader = res.body.getReader();
        const parts = [];
        let got = 0, last = 0;
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          parts.push(value); got += value.length;
          const now = Date.now();
          if (now - last > 200) { last = now; self.postMessage({ type: 'progress', label, got, total }); }
        }
        const all = new Uint8Array(got);
        let o = 0;
        for (const p of parts) { all.set(p, o); o += p.length; }
        buf = all.buffer;
      } else {
        buf = await res.arrayBuffer();
      }
      if (cache) { try { await cache.put(url, new Response(buf.slice(0))); } catch (e) { /* cache plein : on continue sans */ } }
      if (wantJson) return JSON.parse(new TextDecoder().decode(buf));
      return buf;
    } catch (e) { /* on essaie l’URL suivante */ }
  }
  throw new Error(`Impossible de télécharger : ${label}`);
}

function phonemize(text, voice) {
  phonOut = [];
  phon.callMain(['-l', voice, '--input', JSON.stringify([{ text }]), '--espeak_data', '/espeak-ng-data']);
  const parts = [];
  for (const line of phonOut) {
    try { const j = JSON.parse(line); if (j && j.phoneme_ids && j.phoneme_ids.length > 2) parts.push(j); } catch (e) { /* ligne ignorée */ }
  }
  return parts;
}

async function synth(text, lengthScale, speaker) {
  const voice = (cfg.espeak && cfg.espeak.voice) || 'fr';
  const inf = cfg.inference || {};
  const parts = phonemize(text, voice);
  const pcms = [];
  const phonemes = [];
  const sr = (cfg.audio && cfg.audio.sample_rate) || 22050;
  const gap = new Float32Array(Math.round(sr * 0.12));
  for (let i = 0; i < parts.length; i++) {
    const ids = parts[i].phoneme_ids;
    const feeds = {
      input: new ort.Tensor('int64', BigInt64Array.from(ids, x => BigInt(x)), [1, ids.length]),
      input_lengths: new ort.Tensor('int64', BigInt64Array.from([BigInt(ids.length)])),
      scales: new ort.Tensor('float32', Float32Array.from([inf.noise_scale ?? 0.667, (inf.length_scale ?? 1) * lengthScale, inf.noise_w ?? 0.8]))
    };
    if (cfg.num_speakers > 1) {
      let sid = 0;
      if (typeof speaker === 'string' && cfg.speaker_id_map && speaker in cfg.speaker_id_map) sid = cfg.speaker_id_map[speaker];
      else if (Number.isInteger(speaker)) sid = speaker;
      feeds.sid = new ort.Tensor('int64', BigInt64Array.from([BigInt(sid)]));
    }
    const r = await session.run(feeds);
    pcms.push(r.output.data);
    phonemes.push(...(parts[i].phonemes || []));
    if (i < parts.length - 1) { pcms.push(gap); phonemes.push(' '); }
  }
  const len = pcms.reduce((n, p) => n + p.length, 0);
  const pcm = new Float32Array(len);
  let o = 0;
  for (const p of pcms) { pcm.set(p, o); o += p.length; }
  return { pcm, sr, phonemes };
}

self.onmessage = async e => {
  const m = e.data || {};
  try {
    if (m.type === 'load') {
      await getPhonemizer();
      cfg = await fetchFirst(m.configUrls, 'configuration de la voix', true);
      const model = await fetchFirst(m.modelUrls, 'modèle de voix', false);
      self.postMessage({ type: 'progress', label: 'préparation', got: 1, total: 1 });
      session = await ort.InferenceSession.create(model, { executionProviders: ['wasm'], graphOptimizationLevel: 'all' });
      const speakers = cfg.speaker_id_map ? Object.keys(cfg.speaker_id_map) : [];
      self.postMessage({ type: 'ready', key: m.key, sampleRate: (cfg.audio && cfg.audio.sample_rate) || 22050, speakers });
    } else if (m.type === 'synth') {
      if (!session) throw new Error('Voix non chargée');
      const out = await synth(m.text, m.lengthScale || 1, m.speaker || 0);
      self.postMessage({ type: 'audio', id: m.id, pcm: out.pcm, sr: out.sr, phonemes: out.phonemes }, [out.pcm.buffer]);
    } else if (m.type === 'cached') {
      const cache = await openCache();
      const res = {};
      for (const [key, url] of Object.entries(m.urls || {})) {
        res[key] = false;
        if (!cache) continue;
        for (const u of url) { if (await cache.match(u)) { res[key] = true; break; } }
      }
      self.postMessage({ type: 'cached', id: m.id, res });
    } else if (m.type === 'forget') {
      const cache = await openCache();
      if (cache) for (const u of m.urls || []) await cache.delete(u);
      self.postMessage({ type: 'forgotten', id: m.id });
    }
  } catch (err) {
    self.postMessage({ type: 'error', id: m.id, msg: String((err && err.message) || err) });
  }
};
