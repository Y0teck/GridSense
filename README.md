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
│   └── fetchODRE.mjs        # Script one-shot téléchargement données RTE
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── MixSliders.jsx   # 7 curseurs du mix énergétique
│   │   ├── ResultGauges.jsx # 4 indicateurs d'impact
│   │   ├── MixPieChart.jsx  # Camembert de composition
│   │   ├── ReferenceBar.jsx # Bandeau mix RTE 2025
│   │   └── Footer.jsx
│   ├── data/
│   │   ├── energyData.js    # Constantes et coefficients par filière
│   │   └── refMix.json      # Données ODRÉ/RTE (généré par fetchODRE.mjs)
│   ├── utils/
│   │   └── calculations.js  # Fonctions de calcul des 4 indicateurs
│   └── App.jsx
```

---

## ⚙️ Fonctionnalités

- [x] 7 curseurs de mix énergétique indépendants
- [x] 4 indicateurs recalculés en temps réel
- [x] Camembert interactif du mix
- [x] Barre de référence RTE 2025 (données réelles)
- [x] Bouton reset vers le mix de référence
- [x] Mode clair / mode sombre
- [x] Responsive mobile
- [ ] Modales explicatives par indicateur *(en cours)*
- [ ] Comparaison avec d'autres pays
- [ ] Mini-jeu avec objectifs et score

---

## 👤 Auteur

Jean-Julien Molères — Hackathon Defend Intelligence 48h, juin 2026