# ÉnergIA — Roadmap

Statuts : ✅ Fait · 🚧 En cours · 💡 À faire

---

## Infrastructure & UI

| Statut | Fonctionnalité |
|--------|---------------|
| ✅ | Architecture multi-pages avec React Router extensible |
| ✅ | Navigation menu (Simulateur, Comparaison, Sources) |
| ✅ | Thème dark / light |
| ✅ | Logo SVG + favicon custom |
| ✅ | Footer avec liens sociaux (GitHub, Mastodon, Bluesky) |
| ✅ | Page Sources & méthodologie avec liens vers IEA, IPCC, IRENA, RTE, Ember, Eurostat, RED III |

---

## Simulateur

| Statut | Fonctionnalité |
|--------|---------------|
| ✅ | Sliders par filière avec indicateurs temps réel (CO₂, coût, stabilité, renouvelables, bas-carbone) |
| ✅ | Seuils couleurs cohérents sur tous les indicateurs (vert / ambre / rouge) |
| ✅ | Sélecteur de pays en grille (10 pays, état actif marqué) |
| ✅ | Titre dynamique "Mix énergétique de [pays]" |
| ✅ | Reset du label preset au mouvement des sliders |
| ✅ | Auto-normalisation des sliders à 100% (redistribution proportionnelle entre les autres sources) |
| 💡 | Contraintes réalistes par source (capacité max installée par pays) |
| 💡 | Alerte si mix physiquement incohérent |
| 💡 | Indicateur "Accord de Paris" avec écart par rapport à l'objectif 50 gCO₂eq/kWh |

---

## Comparaison pays

| Statut | Fonctionnalité |
|--------|---------------|
| ✅ | Comparateur côte à côte (2 pays, indicateurs différenciés) |
| ✅ | 10 pays préconfigurés avec données IEA WEO 2025 (historique 2023) |
| ✅ | État par défaut : France à gauche, aucun pays à droite |
| ✅ | Pays déjà sélectionné de l'autre côté grisé |
| 💡 | Carte choroplèthe mondiale colorée par CO₂/kWh |
| 💡 | Ajout de pays supplémentaires (UK, Japon, Australie…) |

---

## Mode pédagogique

| Statut | Fonctionnalité |
|--------|---------------|
| ✅ | Modales explicatives sur chaque indicateur (définition, calcul, références UE/pays, exemple concret, limites) |
| 💡 | Fiches par source d'énergie (avantages, limites, chiffres clés) |
| 💡 | Glossaire des termes (LCOE, pilotable, bas-carbone…) |
| 💡 | Mode quiz/défi : atteindre un objectif CO₂ ou coût imposé |
| 💡 | Scénarios GIEC intégrés en mode jeu ou prévision (SSP1, SSP2, SSP5…) avec objectif Accord de Paris 1.5°C / 2°C |
| 💡 | Indicateur "Accord de Paris" avec écart par rapport à l'objectif 50 gCO₂eq/kWh (à mixer avec scénarios GIEC) |

---

## Données temps réel

| Statut | Fonctionnalité |
|--------|---------------|
| 💡 | Visualisation temps réel du mix France (API RTE eCO2mix) |
| 💡 | Visualisation par région française (données RTE régionales) |
| 💡 | Visualisation temps réel monde (API Electricity Maps) |

---

## Évolution temporelle

| Statut | Fonctionnalité |
|--------|---------------|
| 💡 | Historique du mix France 2000–2024 avec slider temporel |
| 💡 | Scénarios prospectifs 2030/2050 (PPE, IEA STEPS, RTE S3…) |
| 💡 | Courbe d'évolution des indicateurs en fonction du temps |

---

## Partage & export

| Statut | Fonctionnalité |
|--------|---------------|
| 💡 | URL partageable encodant le mix custom (query params) |
| 💡 | Export PNG du résumé indicateurs |
| 💡 | Sauvegarde de scénarios nommés en localStorage |

---

## Page "Aller plus loin"

| Statut | Fonctionnalité |
|--------|---------------|
| 💡 | Page dédiée avec ressources classées par thème |
| 💡 | GIEC / IPCC — rapports AR6, résumés pour décideurs |
| 💡 | Carbone 4 / Jean-Marc Jancovici — articles, conférences |
| 💡 | Electricity Maps — visualisation temps réel mondiale |
| 💡 | RTE / ODRÉ — données françaises open data |
| 💡 | IEA — World Energy Outlook, statistiques mondiales |
| 💡 | Wikipedia — pages clés (mix énergétique, LCOE, facteur de charge…) |
| 💡 | Livres recommandés (ex. "Le monde sans fin" — Jancovici & Blain) |

---

## Mobile & distribution

| Statut | Fonctionnalité |
|--------|---------------|
| 💡 | Build APK Android (Capacitor ou PWA) |
| 💡 | Publication de l'APK dans les Releases GitHub |
| 💡 | PWA installable (manifest + service worker) |
