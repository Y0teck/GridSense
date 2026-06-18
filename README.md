# ÉnergIA ⚡

**Simulateur interactif de mix électrique**

Projet réalisé dans le cadre du hackathon 48h **Defend Intelligence**, sponsorisé par **Engie**.  
Thème : **L'énergie**

---

## 🎯 Concept

ÉnergIA permet à n'importe qui de composer son propre mix électrique en ajustant la part de chaque filière (nucléaire, éolien, solaire, hydraulique, gaz, thermique fossile, bioénergies), de le comparer à des pays réels, et de visualiser immédiatement les impacts sur :

- Les **émissions de CO₂** (gCO₂eq/kWh, cycle de vie)
- Le **coût de production** (€/MWh, LCOE moyen pondéré)
- La **stabilité du réseau** (part des sources pilotables)
- La **part des énergies renouvelables** (%)
- La **part bas-carbone** et l'écart à l'objectif **Accord de Paris** (< 50 gCO₂eq/kWh)

Le mix France est basé sur le **Bilan électrique RTE 2025** — données réelles issues d'ODRÉ. Les autres pays utilisent des sources IEA et Ember.

---

## 🛠️ Stack technique

| Outil | Rôle |
|---|---|
| React 18 + Vite | Framework frontend |
| react-router-dom | Navigation multi-pages |
| Tailwind CSS | Styling |
| Recharts | Graphiques (camembert, jauges) |
| react-simple-maps | Carte choroplèthe mondiale |
| html2canvas | Export PNG du résumé |
| vite-plugin-pwa | Manifest + service worker PWA |
| Node.js (script one-shot) | Téléchargement des données ODRÉ |
| Vercel | Déploiement |

---

## 📊 Sources de données

| Donnée | Source | Accès |
|---|---|---|
| Mix électrique français 2025 (TWh/filière) | [ODRÉ / RTE](https://odre.opendatasoft.com/explore/dataset/prod-national-annuel-filiere/) | Public, sans authentification |
| Coefficients CO₂ cycle de vie | IPCC AR6 WGIII Annex III (2022) | Public |
| Coûts de production (LCOE) | IRENA Renewable Power Generation Costs (2023) | Public |

> Les valeurs de coefficients sont **indicatives** — se référer aux sources primaires pour une utilisation académique.

---

## 🚀 Installation et lancement

### Prérequis
- Node.js ≥ 18

### Installation
```bash
git clone https://github.com/<ton-repo>/energiA.git
cd energiA
npm install
```

### Téléchargement des données (une seule fois)
```bash
node scripts/fetchODRE.mjs
```
Ce script interroge l'API publique ODRÉ et génère `src/data/refMix.json` avec les données de production 2025 par filière. À ne relancer que si vous souhaitez mettre à jour les données de référence.

### Lancement en développement
```bash
npm run dev
```
L'application est disponible sur `http://localhost:5173`

### Build de production
```bash
npm run build
```

---

## 🌍 Déploiement sur Vercel

1. Pusher le repo sur GitHub (avec `src/data/refMix.json` committé)
2. Connecter le repo sur [vercel.com](https://vercel.com)
3. Vercel détecte automatiquement Vite — cliquer "Deploy"

---

## 📁 Structure du projet

```
energiA/
├── scripts/
│   └── fetchODRE.mjs              # Script one-shot téléchargement données RTE
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── NavMenu.jsx            # Menu de navigation (piloté par routes.jsx)
│   │   ├── MixSliders.jsx         # 7 curseurs du mix énergétique
│   │   ├── PresetSelector.jsx     # Grille de sélection des pays
│   │   ├── ResultGauges.jsx       # 5 indicateurs d'impact colorés
│   │   ├── IndicatorModal.jsx     # Modales explicatives des indicateurs
│   │   ├── SourceModal.jsx        # Fiches détaillées par filière
│   │   ├── ComparatorPanel.jsx    # Comparaison côte à côte
│   │   ├── MixPieChart.jsx        # Camembert de composition
│   │   └── Footer.jsx
│   ├── pages/
│   │   ├── SimulateurPage.jsx
│   │   ├── CartePage.jsx
│   │   ├── EnergiesPage.jsx
│   │   ├── ComparaisonPage.jsx
│   │   ├── QuizPage.jsx
│   │   ├── GlossairePage.jsx
│   │   ├── AllerPlusLoinPage.jsx
│   │   └── SourcesPage.jsx
│   ├── data/
│   │   ├── energyData.js          # Constantes et coefficients par filière
│   │   ├── countryPresets.js      # 50 pays — IEA / Ember
│   │   ├── sourceContent.js       # Fiches synthétiques par filière
│   │   ├── energiesContent.js     # Contenu pédagogique détaillé
│   │   └── refMix.json            # Données ODRÉ/RTE (généré par fetchODRE.mjs)
│   ├── i18n/
│   │   ├── strings.js             # Textes FR/EN
│   │   └── useStrings.js
│   ├── utils/
│   │   └── calculations.js        # Fonctions de calcul des indicateurs
│   ├── routes.jsx                 # Config centralisée des routes
│   ├── Layout.jsx                 # Shell : Header + NavMenu + Outlet
│   ├── ThemeContext.js
│   ├── LanguageContext.js
│   └── App.jsx
├── vite.config.js                 # Configuration Vite + PWA
├── ROADMAP.md                     # Suivi des fonctionnalités
```

---

## ⚙️ Fonctionnalités

- [x] Navigation multi-pages extensible (React Router) : Simulateur, Carte, Énergies, Comparaison pays, Défis, Glossaire, Aller plus loin, Sources
- [x] 7 curseurs de mix énergétique indépendants avec indicateurs recalculés en temps réel
- [x] 5 indicateurs d'impact colorés par seuil : CO₂, coût, stabilité réseau, renouvelables, bas-carbone
- [x] Sélecteur de 50 pays préconfigurés (données IEA / Ember, historique 2023)
- [x] Comparateur côte à côte entre deux pays avec différenciation des meilleures valeurs
- [x] Carte choroplèthe mondiale CO₂/kWh avec zoom, pan et infobulles
- [x] Camembert interactif du mix énergétique + export PNG du résumé
- [x] Page Énergies avec fiches pédagogiques détaillées par filière
- [x] Page Sources & méthodologie avec références complètes (IEA, IPCC AR6, IRENA, ODRÉ/RTE, Ember, Eurostat, RED III, Nations Unies, OMS)
- [x] Modales explicatives sur chaque indicateur (définition, calcul, valeurs de référence, exemple concret, limites)
- [x] Indicateur Accord de Paris avec écart par rapport à l'objectif 1,5°C (< 50 gCO₂eq/kWh)
- [x] Mode quiz/défi avec objectifs, validation et exemples de pays
- [x] Glossaire bilingue avec fiches sources reliées aux modales
- [x] Page "Aller plus loin" avec ressources classées par thème (IPCC, Jancovici, IEA, Electricity Maps…)
- [x] Internationalisation FR/EN avec préférence persistée
- [x] URL partageable encodant le mix custom
- [x] PWA installable avec manifest et service worker
- [x] Mode clair / mode sombre
- [x] Logo SVG custom + favicon
- [x] Auto-normalisation des sliders à 100% (redistribution proportionnelle)
- [ ] Évolution temporelle du mix (slider historique)

---

## 🗺️ Roadmap

Le fichier [`ROADMAP.md`](./ROADMAP.md) liste l'ensemble des fonctionnalités envisagées,
organisées par catégorie (Simulateur, Comparaison, Mode pédagogique, Évolution temporelle,
Partage & export) avec leur statut d'implémentation.

---

## 👤 Auteur

Yoteck — Hackathon Defend Intelligence 48h, juin 2026
