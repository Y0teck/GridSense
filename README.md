# ÉnergIA ⚡

**Simulateur interactif de mix électrique français**

Projet réalisé dans le cadre du hackathon 48h **Defend Intelligence**, sponsorisé par **Engie**.  
Thème : **L'énergie**

---

## 🎯 Concept

ÉnergIA permet à n'importe qui de composer son propre mix électrique en ajustant la part de chaque filière (nucléaire, éolien, solaire, hydraulique, gaz, thermique fossile, bioénergies), et de visualiser immédiatement les impacts sur :

- Les **émissions de CO₂** (gCO₂eq/kWh, cycle de vie)
- Le **coût de production** (€/MWh, LCOE moyen pondéré)
- La **stabilité du réseau** (part des sources pilotables)
- La **part des énergies renouvelables** (%)

Le mix de référence affiché est le **Bilan électrique RTE 2025** — données réelles issues d'ODRÉ.

---

## 🛠️ Stack technique

| Outil | Rôle |
|---|---|
| React 18 + Vite | Framework frontend |
| react-router-dom | Navigation multi-pages |
| Tailwind CSS | Styling |
| Recharts | Graphiques (camembert, jauges) |
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
│   │   ├── ComparatorPanel.jsx    # Comparaison côte à côte
│   │   ├── MixPieChart.jsx        # Camembert de composition
│   │   ├── ReferenceBar.jsx       # Bandeau mix RTE 2025
│   │   └── Footer.jsx
│   ├── pages/
│   │   ├── SimulateurPage.jsx
│   │   ├── ComparaisonPage.jsx
│   │   └── SourcesPage.jsx
│   ├── data/
│   │   ├── energyData.js          # Constantes et coefficients par filière
│   │   ├── countryPresets.js      # 10 pays — IEA WEO 2025
│   │   └── refMix.json            # Données ODRÉ/RTE (généré par fetchODRE.mjs)
│   ├── utils/
│   │   └── calculations.js        # Fonctions de calcul des indicateurs
│   ├── routes.jsx                 # Config centralisée des routes
│   ├── Layout.jsx                 # Shell : Header + NavMenu + Outlet
│   ├── ThemeContext.js
│   └── App.jsx
├── ROADMAP.md                     # Suivi des fonctionnalités
```

---

## ⚙️ Fonctionnalités

- [x] Navigation multi-pages extensible (React Router) : Simulateur, Comparaison pays, Sources, Aller plus loin
- [x] 7 curseurs de mix énergétique indépendants avec indicateurs recalculés en temps réel
- [x] 5 indicateurs d'impact colorés par seuil : CO₂, coût, stabilité réseau, renouvelables, bas-carbone
- [x] Sélecteur de 10 pays préconfigurés (données IEA WEO 2025, historique 2023)
- [x] Comparateur côte à côte entre deux pays avec différenciation des meilleures valeurs
- [x] Camembert interactif du mix énergétique
- [x] Page Sources & méthodologie avec références complètes (IEA, IPCC AR6, IRENA, ODRÉ/RTE, Ember, Eurostat, RED III, Nations Unies)
- [x] Modales explicatives sur chaque indicateur (définition, calcul, valeurs de référence, exemple concret, limites)
- [x] Indicateur Accord de Paris avec écart par rapport à l'objectif 1,5°C (< 50 gCO₂eq/kWh)
- [x] Page "Aller plus loin" avec ressources classées par thème (IPCC, Jancovici, IEA, Electricity Maps…)
- [x] Mode clair / mode sombre
- [x] Logo SVG custom + favicon
- [x] Auto-normalisation des sliders à 100% (redistribution proportionnelle)
- [ ] Mode quiz/défi avec objectifs et score
- [ ] Carte choroplèthe mondiale CO₂/kWh
- [ ] Évolution temporelle du mix (slider historique)
- [ ] URL partageable encodant le mix custom

---

## 🗺️ Roadmap

Le fichier [`ROADMAP.md`](./ROADMAP.md) liste l'ensemble des fonctionnalités envisagées,
organisées par catégorie (Simulateur, Comparaison, Mode pédagogique, Évolution temporelle,
Partage & export) avec leur statut d'implémentation.

---

## 👤 Auteur

Yoteck — Hackathon Defend Intelligence 48h, juin 2026
