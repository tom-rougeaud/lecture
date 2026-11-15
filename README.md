# 📖 Lecture+

**Le prompteur de lecture accessible, avec guide de fluence, pour la classe et la maison.**

🌐 **Application en ligne : https://tom-rougeaud.github.io/lecture/**

Lecture+ fait défiler un texte à une vitesse réglée en **mots par minute (MPM)**. L’affichage s’adapte à chaque lecteur : polices scolaires et DYS, espacements, masque de lecture, thèmes et contraste.

Tout fonctionne **sur l’appareil** : aucun compte, aucune collecte de données, et l’application marche même hors connexion.

> 🎯 **Pour qui ?** Élèves du CP au lycée, enseignants, orthophonistes, parents, et lecteurs DYS ou malvoyants. Plus largement, Lecture+ s’adresse à tous ceux qui veulent s’entraîner à lire avec fluidité.

---

## ✨ En bref

| | |
|---|---|
| 🎚️ **Vitesse par niveau** | Curseur gradué du CP (50 MPM) au lycée (160 MPM), avec un réglage fin entre les paliers. |
| ⏱️ **Rythme exact** | Chaque ligne défile exactement au rythme demandé (écart mesuré : ±2 %). Option « rythme naturel » : respirations aux points et aux virgules. |
| 🔍 **Masque de lecture** | Ruban de 1 à 5 lignes, avec flou « verre dépoli » autour. Des repères aux bords de l’écran encadrent la ligne lue. |
| 🔤 **Polices DYS et scolaires** | 12 polices au choix, dont OpenDyslexic, Lexend, Andika, Atkinson Hyperlegible et les cursives Playwrite FR. Tous les accents sont gérés. |
| 🎨 **6 thèmes** | Clair, beige, sépia, sombre, noir et contrasté, avec un curseur de contraste (conformité WCAG AAA). |
| 📚 **Bibliothèque locale** | Chaque texte retrouve sa position de lecture et sa progression. On y renseigne aussi le titre et l’auteur. |
| 📥 **Import facile** | PDF, EPUB, DOCX, Markdown, TXT et HTML par glisser-déposer ou depuis les fichiers. Le collage conserve la mise en page. |
| 🚀 **Gros livres** | Un livre de 400 000 mots s’ouvre en moins d’une seconde et défile à 60 images par seconde. |
| ⚙️ **Réglages en direct** | Thème, police, taille et masque se changent pendant le défilement, sans l’interrompre. |
| 📴 **Hors connexion** | Après une première visite, l’application s’ouvre sans réseau. |
| 📲 **Installable** | S’installe sur l’écran d’accueil et s’ouvre en plein écran, comme une appli. |
| 🔒 **Zéro traceur** | Aucun cookie, aucune statistique, aucun CDN, aucune police Google. |

---

## 🚀 Démarrer en 30 secondes

1. Ouvrir **https://tom-rougeaud.github.io/lecture/** sur un ordinateur, une tablette ou un téléphone.
2. Cliquer sur **Importer le texte**, puis déposer un fichier ou coller un texte. Valider ensuite le titre et l’auteur.
3. Choisir le **niveau** sur le curseur de vitesse et appuyer sur ▶️.

💡 On peut aussi essayer avec le **texte de démonstration** (*Le Lièvre et la Tortue*, La Fontaine).

---

## 🧩 Fonctionnalités détaillées

### 📥 Importer et organiser
- **Formats acceptés :**
  - **PDF** : texte, titres et images. Les pages numérisées sont affichées en image.
  - **EPUB**, **DOCX**, **Markdown**, **TXT** et **HTML**.
- **Coller un texte :** la mise en page est conservée (sauts de ligne, tabulations, tailles relatives, gras, italique, alignements et retraits).
- **Titre et auteur :** ils sont lus dans le fichier quand c’est possible, puis proposés à la validation. Ils restent modifiables depuis la bibliothèque.
- **Bibliothèque :** recherche par titre ou par auteur, renommage, suppression et reprise de lecture à l’endroit exact.

### 🎚️ Vitesse et fluence
- Curseur à paliers calé sur les repères de fin d’année :

  | CP | CE1 | CE2 | CM1 | CM2 | 6e – 5e | 4e – 3e | Lycée / adulte |
  |---|---|---|---|---|---|---|---|
  | 50 | 70 | 90 | 110 | 120 | 130 | 140 | 160 |

- **Moteur « horloge des mots » :** chaque ligne dure exactement le temps nécessaire pour lire ses mots.
- **Rythme naturel :** de courtes pauses aux fins de phrase, aux virgules et aux paragraphes. La vitesse moyenne ne change pas.
- **Images :** une image n’immobilise jamais la lecture. Son passage est limité à une durée réglable (1,5 s par défaut).
- **Guide de fluence :** repères par niveau et conseils d’entraînement.

### 👁️ Confort de lecture
- **Masque de lecture :** ruban de 1 à 5 lignes, avec flou et voile réglables autour.
- **Repères de ligne :** fixés aux bords de l’écran, quel que soit l’appareil.
- **Taille du texte :** curseur dans le dock, ou pincement sur écran tactile.
- **Menus escamotables :**
  - Ils disparaissent pendant la lecture.
  - Ils reviennent au clic ou au toucher, ou au survol du haut ou du bas de l’écran.
- **Autres outils :** décompte avant défilement, sommaire, plein écran et écran maintenu allumé.

### ⌨️ Raccourcis clavier

| Touche | Action |
|---|---|
| `Espace` | Lecture / pause (fonctionne aussi quand les Réglages sont ouverts) |
| `↑` `↓` | Vitesse ± 5 MPM |
| `Page ↑` `Page ↓` | Niveau précédent / suivant |
| `←` `→` | Reculer / avancer de 10 s |
| `Maj` + `+` / `−` | Taille du texte |
| `M` / `F` | Masque / plein écran |
| `Échap` | Arrêter et revenir à l’accueil |

---

## 🔒 Confidentialité (RGPD)

- ✅ **Aucun compte, cookie, traceur ou statistique.** Les polices et les bibliothèques sont intégrées au fichier.
- ✅ **Données conservées uniquement dans le navigateur utilisé :**
  - réglages : `lectureplus.v2.settings` ;
  - bibliothèque : IndexedDB `lectureplus_v2`.
- ⚠️ **Rien ne suit l’utilisateur** sur un autre navigateur ou un autre appareil. Pour transférer sa bibliothèque, utiliser **Exporter / Importer**.
- 🗑️ Le bouton **Tout effacer** supprime toutes les données.
- 🛡️ **Connexions limitées :** une politique de sécurité (CSP) restreint les connexions au site lui-même : aucun service extérieur n’est contacté.
- ℹ️ **Hébergement :** comme tout hébergeur, GitHub Pages (GitHub Inc., États-Unis) peut journaliser l’adresse IP des visiteurs. Ouvert depuis un fichier local, Lecture+ ne se connecte à rien.

---

## 🛠️ Installation et publication

### Contenu du dépôt

```
index.html              l’application complète (fichier autonome, ~3,4 Mo)
sw.js                   service worker : ouverture hors connexion
manifest.json           fiche d’installation (nom, couleurs, icônes)
icons/                  icônes de l’application (192, 512, maskable, iPhone)
confidentialite.html    politique de confidentialité (page publique)
README.md
```

💾 `index.html` fonctionne aussi **seul**, ouvert par double-clic, hors ligne (sans installation sur l’écran d’accueil).

### 🌍 GitHub Pages
1. Dans *Settings › Pages › Build and deployment*, choisir **Deploy from a branch**, la branche `main` et le dossier `/ (root)`.
2. L’adresse du site est `https://tom-rougeaud.github.io/lecture/`.
3. Pour mettre à jour, remplacer les fichiers du dépôt. Une bannière « Nouvelle version disponible » prévient les utilisateurs déjà installés.

### 📲 Installer sur l’écran d’accueil
- **Android, Chrome, Edge :** une fenêtre propose « Installer l’appli » ; sinon menu ⋮ › *Installer l’application*.
- **iPhone, iPad (Safari) :** bouton *Partager* › *Sur l’écran d’accueil* › *Ajouter*.

### 🏪 Google Play
L’application peut être emballée en *Trusted Web Activity* (PWABuilder ou Bubblewrap). La page publique de confidentialité à indiquer dans la fiche est `https://tom-rougeaud.github.io/lecture/confidentialite.html`.

---

## 📊 Repères de fluence

Valeurs en mots correctement lus par minute. Ce sont des **objectifs d’entraînement**, pas un outil d’évaluation.

- **École (CP → CM2) :** seuils de fin d’année couramment utilisés dans les circonscriptions.
- **4e – 3e (140) :** seuil « satisfaisant » de l’évaluation nationale de 4e publiée sur Éduscol. La zone « fragile » va de 120 à 139.
- **6e – 5e (130) :** valeur intermédiaire estimée, faute de repère officiel chiffré.
- **Lycée / adulte (160) :** rythme confortable d’un bon lecteur à voix haute. La lecture silencieuse est plus rapide : 200 à 250 MPM.

---

## 📜 Licences et crédits

- **Lecture+** © Tom Rougeaud, sous licence [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/deed.fr) : partage et adaptation libres, sans usage commercial.
- **Bibliothèques intégrées :** pdf.js (Apache 2.0), JSZip (MIT), mammoth.js (BSD-2), marked (MIT).
- **Polices (SIL Open Font License 1.1) :** Inter, Literata, Lexend, Andika, Atkinson Hyperlegible, OpenDyslexic, Playwrite FR et JetBrains Mono.
- **Texte d’essai :** *Le Lièvre et la Tortue*, Jean de La Fontaine (domaine public).

---

<p align="center">Fait avec ❤️ pour les lecteurs de tous niveaux · 🇫🇷 100 % en français · 🔒 100 % local</p>
