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
| **Vitesse par paliers** | Curseur gradué selon les repères de fin d’année (CP 50, CE1 70, CE2 90, CM1 110, CM2 120, 6e 130, 4e 140, lycée 200 MPM) avec réglage fin entre les paliers. |
| **Voix off** | *Voix naturelle Lecture+* (voix neuronale calculée sur l’appareil) ou voix du système. Le débit et les pauses sont ajustés pour respecter le rythme choisi, même très lent (lecture par groupes de mots). |
| **Surlignage karaoké** | Mot et/ou phrase surlignés, texte maintenu sur la ligne de lecture. |
| **Masque de lecture** | Ruban de 1 à 5 lignes, flou et voile réglables autour. |
| **Images** | Une image n’immobilise jamais la lecture : son passage est limité à une durée réglable (1,5 s par défaut). |
| **Affichage** | 6 thèmes (clair, beige, sépia, sombre, noir, contrasté), curseur de contraste, 12 polices dont OpenDyslexic, Lexend, Andika, cursives scolaires Playwrite FR (Belle Allure et Marelle si elles sont installées). |
| **Menus escamotables** | Pendant la lecture, les menus disparaissent ; ils reviennent au clic ou au toucher sur le texte, ou au survol du haut / du bas de l’écran. |
| **Hors connexion** | Après une première visite en ligne, l’application s’ouvre sans réseau (service worker), y compris la voix naturelle si elle a été téléchargée. |
| **Divers** | Décompte avant défilement, sommaire, plein écran, écran maintenu allumé, raccourcis clavier, pincement pour zoomer. |

### Raccourcis clavier

`Espace` lecture / pause · `↑` `↓` vitesse ± 5 MPM · `Page ↑` `Page ↓` niveau précédent / suivant · `←` `→` ± 10 s · `Maj` + `+` / `−` taille du texte · `V` voix · `M` masque · `F` plein écran · `Échap` arrêter et revenir à l’accueil.

---

## Contenu du dépôt

```
index.html              l’application complète (fichier autonome, ~3,4 Mo)
sw.js                   service worker : ouverture hors connexion après une première visite
voix/                   moteur de la voix naturelle, chargé uniquement si on l’utilise
  modeles/                (facultatif) voix déposées sur le site — voir « Héberger les voix »
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
- Voix proposées : Siwis (féminine, recommandée — Université d’Édimbourg, CC BY 4.0), Pierre et Jessica (UPMC, CC BY-SA 4.0), Siwis légère. La voix « Tom » a été écartée : sa licence (AGPL-3.0) est incompatible avec une diffusion simple.
- Sans hébergement sur le site, le modèle est téléchargé depuis [Hugging Face — rhasspy/piper-voices](https://huggingface.co/rhasspy/piper-voices/tree/main/fr/fr_FR) (entreprise américaine, qui voit alors l’adresse IP de l’appareil).

### Héberger les voix sur le site (recommandé pour un usage scolaire)

Une fois les voix déposées dans `voix/modeles/`, Lecture+ ne contacte plus aucun service extérieur.

1. Dans le dépôt, onglet **Actions** › **Héberger les voix naturelles sur le site** › **Run workflow**.
2. Choisir `siwis-medium` (≈ 64 Mo) ou `toutes` (≈ 170 Mo), puis **Run workflow**.
3. Le robot télécharge les modèles et les ajoute au dossier `voix/modeles/` (2 à 3 minutes). GitHub Pages republie le site automatiquement.

(Les fichiers dépassent 25 Mo : ils ne peuvent pas être déposés par le bouton « Upload files » du site GitHub, d’où ce robot.)
- Sur un appareil ancien, la première phrase peut mettre une à deux secondes à démarrer.

## Confidentialité

- Aucun compte, cookie, traceur ni statistique. Polices et bibliothèques intégrées (aucun CDN, aucune police Google).
- Une politique de sécurité (CSP) limite les connexions possibles au site lui-même et, seulement si l’on choisit la voix naturelle sans l’avoir hébergée, au téléchargement du modèle depuis Hugging Face.
- Comme tout hébergeur, GitHub Pages (GitHub Inc., États-Unis) peut journaliser l’adresse IP des visiteurs. Ouvert depuis un fichier local, Lecture+ ne se connecte à rien.
- Données conservées **uniquement dans le navigateur utilisé** : réglages (`lectureplus.v2.settings`), bibliothèque (IndexedDB `lectureplus_v2`), voix téléchargées (cache `lectureplus-voix-v1`). Elles ne suivent pas l’utilisateur sur un autre navigateur ou un autre appareil : utiliser **Exporter / Importer** pour les transférer. Le bouton **Tout effacer** supprime tout.
- Les voix « en ligne » du système (Edge, Chrome) sont désactivées par défaut, car elles transmettent le texte à Microsoft ou Google.

## Repères de fluence

Valeurs en mots correctement lus par minute, utilisées comme objectifs d’entraînement (pas comme outil d’évaluation) :
- école : seuils de fin d’année couramment utilisés dans les circonscriptions (CP 50, CE1 70, CE2 90, CM1 110, CM2 120) ;
- 4e – 3e : 140, seuil « satisfaisant » de l’évaluation nationale de 4e publiée sur Éduscol (120 à 139 = fragile) ;
- 6e – 5e : 130, valeur intermédiaire estimée (pas de repère officiel chiffré) ;
- lycée / adulte : 200, ordre de grandeur du lecteur expert.

## Licences et crédits

- **Lecture+** © Tom Rougeaud — [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/deed.fr).
- Bibliothèques intégrées : pdf.js (Apache 2.0), JSZip (MIT), mammoth.js (BSD-2), marked (MIT).
- Voix : ONNX Runtime Web (MIT), piper-phonemize / piper-wasm (MIT), espeak-ng (GPL-3.0, fichiers séparés dans `voix/`, sources : https://github.com/rhasspy/espeak-ng), modèles Piper : Siwis (Université d’Édimbourg, CC BY 4.0), UPMC Pierre et Jessica (CC BY-SA 4.0).
- Polices (SIL Open Font License 1.1) : Inter, Literata, Lexend, Andika, Atkinson Hyperlegible, OpenDyslexic, Playwrite FR, JetBrains Mono.
- Texte d’essai : *Le Lièvre et la Tortue*, Jean de La Fontaine (domaine public).
