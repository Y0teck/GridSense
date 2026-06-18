# GridSense ⚡

> **See the energy, feel the impact.**

Simulateur interactif de mix électrique — projet réalisé en 48h dans le cadre du hackathon **Defend Intelligence**, sponsorisé par **Engie**. Thème : **L'énergie**

> Built with [Codex](https://openai.com/codex)

---

## 🎯 Concept

GridSense permet à n'importe qui de composer son propre mix électrique en ajustant la part de chaque filière (nucléaire, éolien, solaire, hydraulique, gaz, thermique fossile, bioénergies), de le comparer à des pays réels ou aux scénarios climatiques du GIEC, et de visualiser immédiatement les impacts sur :

- Les **émissions de CO₂** (gCO₂eq/kWh, cycle de vie)
- Le **coût de production** (€/MWh, LCOE moyen pondéré)
- La **stabilité du réseau** (part des sources pilotables)
- La **part des énergies renouvelables** (%)
- La **part bas-carbone** et le **scénario GIEC correspondant** (SSP1-1.9 à SSP5-8.5)

Le mix France est basé sur le **Bilan électrique RTE 2025** — données réelles issues d'ODRÉ. Les autres pays utilisent des sources IEA et Ember.

---

## 🛠️ Stack technique

| Outil | Rôle |
|---|---|
| React 18 + Vite | Framework frontend |
| react-router-dom v6 | Navigation multi-pages |
| Tailwind CSS | Styling |
| Recharts | Graphiques (camembert, jauges, LineChart, BarChart dual-axe) |
| react-simple-maps | Carte choroplèthe mondiale |
| html2canvas | Export PNG du résumé |
| vite-plugin-pwa | Manifest + service worker PWA |
| Node.js (script one-shot) | Téléchargement des données ODRÉ |
| Vercel | Déploiement |

---

## 📊 Sources de données

| Donnée | Source | Accès |
|---|---|---|
| Mix électrique français 2025 (TWh/filière) | [ODRÉ / RTE](https://odre.opendatasoft.com/explore/dataset/prod-national-annuel-filiere/) | Public |
| Mix électrique par pays (50 pays) | [IEA World Energy Statistics](https://www.iea.org/data-and-statistics) + [Ember](https://ember-climate.org/data/) | Public |
| Coefficients CO₂ cycle de vie | IPCC AR6 WGIII Annex III (2022) | Public |
| Coûts de production (LCOE) | IRENA Renewable Power Generation Costs (2023) | Public |
| Scénarios climatiques (SSP) | IPCC AR6 WGI/WGIII — trajectoires CO₂ 2020–2050 | Public |
| Données environnementales par filière | Eurostat, IPCC, IEA, RED III (UE) | Public |

> Les valeurs de coefficients sont **indicatives** — se référer aux sources primaires pour une utilisation académique.

---

## 🚀 Installation et lancement

### Prérequis
- Node.js ≥ 18

### Installation
```bash
git clone https://github.com/<ton-repo>/gridsense.git
cd gridsense
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
gridsense/
├── scripts/
│   └── fetchODRE.mjs              # Script one-shot téléchargement données RTE
├── src/
│   ├── components/
│   │   ├── Header.jsx             # Logo, toggle langue FR/EN, toggle dark/light
│   │   ├── NavMenu.jsx            # Navigation responsive (hamburger mobile, barre desktop)
│   │   ├── MixSliders.jsx         # 7 curseurs du mix avec auto-normalisation
│   │   ├── PresetSelector.jsx     # Grille 50 pays (2 lignes par défaut, toggle)
│   │   ├── ResultGauges.jsx       # 5 indicateurs d'impact + bannière scénario GIEC
│   │   ├── IndicatorModal.jsx     # Modales explicatives des indicateurs
│   │   ├── SourceModal.jsx        # Fiches détaillées par filière
│   │   ├── ComparatorPanel.jsx    # Comparaison côte à côte
│   │   ├── MixPieChart.jsx        # Camembert de composition
│   │   ├── ReferenceBar.jsx       # Barre de référence CO₂
│   │   ├── ScrollToTop.jsx        # Bouton flottant retour haut de page
│   │   └── Footer.jsx
│   ├── pages/
│   │   ├── SimulateurPage.jsx     # Page principale avec sliders + indicateurs
│   │   ├── ScenariosPage.jsx      # Scénarios GIEC (SSP1-1.9 à SSP5-8.5)
│   │   ├── CartePage.jsx          # Carte choroplèthe mondiale
│   │   ├── EnergiesPage.jsx       # Fiches pédagogiques par filière + graphes
│   │   ├── ComparaisonPage.jsx    # Comparaison pays côte à côte
│   │   ├── QuizPage.jsx           # Mode défi / quiz
│   │   ├── GlossairePage.jsx      # Glossaire bilingue (21 termes)
│   │   ├── AllerPlusLoinPage.jsx  # Ressources classées par thème
│   │   └── SourcesPage.jsx        # Sources & méthodologie complètes
│   ├── data/
│   │   ├── energyData.js          # Coefficients CO₂ + LCOE par filière
│   │   ├── countryPresets.js      # 50 pays — IEA / Ember
│   │   ├── scenariosData.js       # 4 scénarios GIEC (SSP) + trajectoires CO₂
│   │   ├── energiesContent.js     # Contenu pédagogique détaillé par filière
│   │   ├── glossaryContent.js     # 21 termes du glossaire (FR/EN)
│   │   ├── sourceContent.js       # Fiches synthétiques par filière
│   │   └── refMix.json            # Données ODRÉ/RTE (généré par fetchODRE.mjs)
│   ├── i18n/
│   │   ├── strings.js             # Textes FR/EN centralisés
│   │   └── useStrings.js          # Hook d'accès aux strings
│   ├── routes.jsx                 # Config centralisée des routes (landing exclue du Layout)
│   ├── Layout.jsx                 # Shell : Header + NavMenu + Outlet
│   ├── ThemeContext.js
│   ├── LanguageContext.js
│   └── App.jsx
├── vite.config.js
└── ROADMAP.md
```

---

## ⚙️ Fonctionnalités

- [x] Landing page avec animations énergie, section pédagogique, stats et CTA
- [x] Navigation responsive : menu hamburger sur mobile, barre horizontale sur desktop
- [x] Navigation multi-pages : Simulateur, Scénarios GIEC, Carte, Comparaison pays, Énergies, Quiz, Glossaire, Aller plus loin, Sources
- [x] 7 curseurs de mix énergétique avec recalcul en temps réel + auto-normalisation à 100%
- [x] 5 indicateurs d'impact colorés par seuil : CO₂, coût, stabilité réseau, renouvelables, bas-carbone
- [x] Bannière scénario GIEC : identifie en temps réel quel scénario SSP le mix simulé respecte
- [x] Sélecteur de 50 pays préconfigurés (2 lignes par défaut, toggle pour tout afficher)
- [x] Page Scénarios GIEC avec LineChart des trajectoires CO₂ 2020–2050 et boutons "Simuler ce mix"
- [x] Carte choroplèthe mondiale CO₂/kWh avec zoom, pan, infobulles et popup détaillée par pays
- [x] Popup carte avec statut scénario GIEC du mix du pays sélectionné
- [x] Comparateur côte à côte entre deux pays avec différenciation des meilleures valeurs
- [x] Page Énergies : fiches pédagogiques par filière avec images Wikipedia + graphe comparatif CO₂/LCOE dual-axe
- [x] Glossaire bilingue (21 termes dont GIEC et SSP) avec filtres par catégorie et fiches sources
- [x] Mode quiz/défi avec objectifs, validation et exemples de pays
- [x] Modales explicatives sur chaque indicateur (définition, calcul, références, exemple, limites)
- [x] Page Sources & méthodologie complète (IEA, IPCC AR6, IRENA, ODRÉ/RTE, Ember, Eurostat, RED III, ONU, OMS)
- [x] URL partageable encodant le mix custom (query params)
- [x] Export PNG du résumé indicateurs
- [x] Bouton flottant "retour en haut" (ScrollToTop)
- [x] Internationalisation FR/EN persistée (anglais par défaut)
- [x] PWA installable (manifest + service worker)
- [x] Mode clair / mode sombre
- [x] Logo SVG custom + favicon
- [x] Footer avec liens cliquables (GitHub, DefendHack2, Built with Codex) + bouton Home
- [ ] Évolution temporelle du mix (slider historique)
- [ ] Données temps réel (API RTE eCO2mix / Electricity Maps)

---

## 🗺️ Roadmap

Le fichier [`ROADMAP.md`](./ROADMAP.md) liste l'ensemble des fonctionnalités envisagées,
organisées par catégorie (Simulateur, Comparaison, Mode pédagogique, Évolution temporelle,
Partage & export) avec leur statut d'implémentation.

---

## 👤 Auteur

Yoteck — Hackathon Defend Intelligence 48h, juin 2026
