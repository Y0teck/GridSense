# GridSense — Roadmap

Statuts : ✅ Fait · 🚧 En cours · 💡 À faire

---

## Infrastructure & UI

| Statut | Fonctionnalité |
|--------|---------------|
| ✅ | Architecture multi-pages avec React Router extensible |
| ✅ | Navigation : Simulateur · Scénarios GIEC · Carte · Énergies · Comparaison pays · Quiz · Glossaire · Aller plus loin · Sources |
| ✅ | Internationalisation FR/EN (LanguageContext + fichier de strings centralisé, toggle dans le header) |
| ✅ | Thème dark / light |
| ✅ | Logo SVG + favicon custom |
| ✅ | Footer avec liens sociaux (GitHub, Mastodon, Bluesky) |
| ✅ | Page Sources & méthodologie avec liens vers IEA, IPCC, IRENA, RTE, Ember, Eurostat, RED III, ONU, OMS |
| ✅ | Bouton flottant "retour en haut de page" (ScrollToTop) |
| ✅ | Renommage du projet : ÉnergIA → GridSense — "See the energy, feel the impact" |
| ✅ | Landing page avec animations énergie (grille SVG animée, count-up stats, glow CTA), section pédagogique, métriques et footer |
| ✅ | Navigation responsive : hamburger animé sur mobile (< 768px), menu horizontal sur desktop |
| ✅ | Langue anglaise par défaut (FR/EN persisté en localStorage) |
| ✅ | Titre de l'onglet et meta description mis à jour |
| ✅ | Footer avec liens cliquables (repo GitHub, chaîne YouTube DefendHack2, openai.com/codex) + bouton ⚡ Home |

---

## Simulateur

| Statut | Fonctionnalité |
|--------|---------------|
| ✅ | Sliders par filière avec indicateurs temps réel (CO₂, coût, stabilité, renouvelables, bas-carbone) |
| ✅ | Seuils couleurs cohérents sur tous les indicateurs (vert / ambre / rouge) |
| ✅ | Sélecteur de 50 pays en grille (2 lignes par défaut, toggle pour tout afficher) |
| ✅ | Titre dynamique "Mix énergétique de [pays]" |
| ✅ | Reset du label preset au mouvement des sliders |
| ✅ | Auto-normalisation des sliders à 100% (redistribution proportionnelle entre les autres sources) |
| ✅ | Bannière scénario GIEC : identifie quel SSP (1.9 / 2.6 / 4.5 / 8.5) le mix courant respecte, avec couleur et température cible |
| ✅ | URL partageable encodant le mix custom (query params) + navigation depuis la page Scénarios |
| 💡 | Contraintes réalistes par source (capacité max installée par pays) |
| 💡 | Alerte si mix physiquement incohérent |

---

## Comparaison pays

| Statut | Fonctionnalité |
|--------|---------------|
| ✅ | Comparateur côte à côte (2 pays, indicateurs différenciés, meilleures valeurs surlignées) |
| ✅ | 50 pays préconfigurés avec données IEA / Ember (historique 2023) |
| ✅ | État par défaut : France à gauche, aucun pays à droite |
| ✅ | Pays déjà sélectionné de l'autre côté grisé |
| ✅ | Carte choroplèthe mondiale colorée par CO₂/kWh (react-simple-maps) |
| ✅ | Carte interactive — survol : tooltip · clic : popup avec détail du mix + statut scénario GIEC |

---

## Mode pédagogique

| Statut | Fonctionnalité |
|--------|---------------|
| ✅ | Modales explicatives sur chaque indicateur (définition, calcul, références UE/pays, exemple concret, limites) |
| ✅ | Page Énergies : fiches pédagogiques détaillées par filière (impacts env., coûts, infrastructure, réseau) |
| ✅ | Images Wikipedia dans les fiches Énergies |
| ✅ | Graphe comparatif CO₂ vs LCOE par filière (BarChart double axe Y) |
| ✅ | Sources bibliographiques par filière dans la page Énergies |
| ✅ | Glossaire bilingue (21 termes : technique, concept, source) — dont GIEC et SSP |
| ✅ | Mode quiz/défi : atteindre un objectif CO₂ ou coût imposé |
| ✅ | Page Scénarios GIEC (SSP1-1.9, SSP1-2.6, SSP2-4.5, SSP5-8.5) avec trajectoires CO₂ 2020–2050, description, implications et bouton "Simuler ce mix" |
| ✅ | Bannière scénario GIEC dans le simulateur et dans la popup carte |
| 💡 | Annotations pédagogiques sur le graphe de trajectoires (ex. Accord de Paris, point net zéro) |

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
| ✅ | URL partageable encodant le mix custom (query params) |
| ✅ | Export PNG du résumé indicateurs |
| 💡 | Partage natif (Web Share API) sur mobile |

---

## Page "Aller plus loin"

| Statut | Fonctionnalité |
|--------|---------------|
| ✅ | Page dédiée avec ressources classées par thème |
| ✅ | GIEC / IPCC — rapports AR6, résumés pour décideurs |
| ✅ | Carbone 4 / Jean-Marc Jancovici — articles, conférences |
| ✅ | Electricity Maps — visualisation temps réel mondiale |
| ✅ | RTE / ODRÉ — données françaises open data |
| ✅ | IEA — World Energy Outlook, statistiques mondiales |
| ✅ | Wikipedia — pages clés (mix énergétique, LCOE, facteur de charge…) |
| ✅ | Livres recommandés (ex. "Le monde sans fin" — Jancovici & Blain) |

---

## Mobile & distribution

| Statut | Fonctionnalité |
|--------|---------------|
| ✅ | PWA installable (manifest + service worker via vite-plugin-pwa) |
| 💡 | Build APK Android (Capacitor)A) |
| 💡 | Publication de l'APK dans les Releases GitHub |
| 💡 | PWA installable (manifest + service worker) |
