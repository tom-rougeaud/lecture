# Lecture+

**Prompteur de lecture accessible, voix off naturelle et guide de fluence, pour la classe et la maison.**

👉 Application en ligne : **https://tom-rougeaud.github.io/lecture/**

Lecture+ fait défiler un texte à une vitesse réglée en **mots par minute (MPM)**, ou le lit à voix haute en **surlignant chaque mot**. L’affichage s’adapte à chaque lecteur : polices scolaires et DYS, espacements, masque de lecture, thèmes et contraste. Tout fonctionne **sur l’appareil**, sans compte ni collecte de données.

---

## Fonctionnalités

| | |
|---|---|
| **Bibliothèque** | Les textes importés sont rangés avec leur position et leur progression. Recherche, renommage, suppression, reprise de lecture. |
| **Importer le texte** | PDF (texte, titres, images, pages numérisées), EPUB, DOCX, Markdown, TXT, HTML — par glisser-déposer ou depuis les fichiers (ordinateur, tablette, téléphone). |
| **Coller un texte** | Zone de collage qui **conserve la mise en page** : sauts de ligne, tabulations, tailles relatives, gras, italique, alignements, retraits. |
| **Vitesse par paliers** | Curseur gradué selon les niveaux scolaires (CP, CE1, CE2, CM1, CM2, 6e, lycée) avec réglage fin entre les paliers. |
| **Voix off** | *Voix naturelle Lecture+* (voix neuronale calculée sur l’appareil) ou voix du système. Le débit et les pauses sont ajustés pour respecter le rythme choisi, même très lent (lecture par groupes de mots). |
| **Surlignage karaoké** | Mot et/ou phrase surlignés, texte maintenu sur la ligne de lecture. |
| **Masque de lecture** | Ruban de 1 à 5 lignes, flou et voile réglables autour. |
| **Images** | Une image n’immobilise jamais la lecture : son passage est limité à une durée réglable (1,5 s par défaut). |
| **Affichage** | 6 thèmes (clair, beige, sépia, sombre, noir, contrasté), curseur de contraste, 12 polices dont OpenDyslexic, Lexend, Andika, cursives scolaires Playwrite FR (Belle Allure et Marelle si elles sont installées). |
| **Menus escamotables** | Pendant la lecture, les menus disparaissent ; ils reviennent au clic ou au toucher sur le texte, ou au survol du haut / du bas de l’écran. |
| **Divers** | Décompte avant défilement, sommaire, plein écran, écran maintenu allumé, raccourcis clavier, pincement pour zoomer. |

### Raccourcis clavier

`Espace` lecture / pause · `↑` `↓` vitesse ± 5 MPM · `Page ↑` `Page ↓` niveau précédent / suivant · `←` `→` ± 10 s · `Maj` + `+` / `−` taille du texte · `V` voix · `M` masque · `F` plein écran · `Échap` arrêter et revenir à l’accueil.

---

## Contenu du dépôt

```
index.html              l’application complète (fichier autonome, ~3,6 Mo)
voix/                   moteur de la voix naturelle, chargé uniquement si on l’utilise
  piper-worker.js         calcul de la voix (Web Worker)
  ort.wasm.min.js, ort-wasm-simd-threaded.mjs/.wasm   ONNX Runtime Web
  piper_phonemize.js/.wasm/.data                      phonétisation (espeak-ng, données françaises)
  LICENCES.txt            licences des composants
README.md
```

`index.html` fonctionne aussi **seul**, ouvert par double-clic (hors ligne). Dans ce cas la voix naturelle n’est pas disponible (les navigateurs interdisent le calcul de la voix depuis un fichier local) : la voix de l’appareil est utilisée.

## Publication (GitHub Pages)

1. *Settings › Pages › Build and deployment* : **Deploy from a branch**, branche `main`, dossier `/ (root)`.
2. L’adresse est `https://tom-rougeaud.github.io/lecture/`.
3. Pour mettre à jour : remplacer `index.html` (et le dossier `voix/` s’il change).

## La voix naturelle

- Au premier usage, Lecture+ demande l’autorisation de télécharger une voix française (environ 75 Mo au total). Elle est ensuite conservée dans le navigateur et fonctionne **hors ligne**.
- **Le texte lu n’est jamais envoyé** : la voix est calculée sur l’appareil (modèles [Piper](https://github.com/rhasspy/piper)).
- Voix proposées : Siwis (féminine, recommandée), Tom (masculine), Jessica et Pierre (UPMC), Siwis légère.
- Par défaut, le modèle est téléchargé depuis [Hugging Face — rhasspy/piper-voices](https://huggingface.co/rhasspy/piper-voices/tree/main/fr/fr_FR). **Pour ne dépendre d’aucun service extérieur**, il suffit de déposer les fichiers du modèle dans `voix/modeles/` : Lecture+ les utilise en priorité. Exemple pour la voix Siwis :
  - `voix/modeles/fr_FR-siwis-medium.onnx`
  - `voix/modeles/fr_FR-siwis-medium.onnx.json`
- Sur un appareil ancien, la première phrase peut mettre une à deux secondes à démarrer.

## Confidentialité

- Aucun compte, cookie, traceur ni statistique. Polices et bibliothèques intégrées (aucun CDN, aucune police Google).
- Une politique de sécurité (CSP) limite les connexions possibles au site lui-même et, seulement si l’on choisit la voix naturelle, au téléchargement du modèle de voix.
- Données conservées **uniquement dans le navigateur utilisé** : réglages (`lectureplus.v2.settings`), bibliothèque (IndexedDB `lectureplus_v2`), voix téléchargées (cache `lectureplus-voix-v1`). Elles ne suivent pas l’utilisateur sur un autre navigateur ou un autre appareil : utiliser **Exporter / Importer** pour les transférer. Le bouton **Tout effacer** supprime tout.
- Les voix « en ligne » du système (Edge, Chrome) sont désactivées par défaut, car elles transmettent le texte à Microsoft ou Google.

## Repères de fluence

Les fourchettes de MPM affichées sont des repères indicatifs d’entraînement, inspirés des attendus de fin d’année publiés sur Éduscol. Vérifier les repères officiels en vigueur avant de s’en servir pour une évaluation.

## Licences et crédits

- **Lecture+** © Tom Rougeaud — [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/deed.fr).
- Bibliothèques intégrées : pdf.js (Apache 2.0), JSZip (MIT), mammoth.js (BSD-2), marked (MIT).
- Voix : ONNX Runtime Web (MIT), piper-phonemize / piper-wasm (MIT), espeak-ng (GPL-3.0, fichiers séparés dans `voix/`, sources : https://github.com/rhasspy/espeak-ng), modèles Piper (licence propre à chaque voix, voir leur fiche sur Hugging Face).
- Polices (SIL Open Font License 1.1) : Inter, Literata, Lexend, Andika, Atkinson Hyperlegible, OpenDyslexic, Playwrite FR, JetBrains Mono.
- Texte d’essai : *Le Lièvre et la Tortue*, Jean de La Fontaine (domaine public).
