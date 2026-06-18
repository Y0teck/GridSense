# Quiz Challenges — Mode Défi ÉnergIA

Données pour `src/pages/QuizPage.jsx`. Chaque défi a : id, title, difficulty, description, startMix, objectives[].

Les `check` functions reçoivent `(results, mix)` où results = { co2, cost, stability, renewables, lowCarbon }.

---

## Défi 1 — Objectif Accord de Paris

- **id:** paris
- **title:** Objectif Accord de Paris
- **difficulty:** Facile
- **description:** Composez un mix électrique compatible avec une trajectoire 1,5°C.
- **startMix:** { nucleaire: 10, eolien: 15, solaire: 10, hydraulique: 10, gaz: 30, charbon: 20, bioenergies: 5 }

**objectives:**
- label: "CO₂ < 50 gCO₂eq/kWh" — check: `r.co2 < 50`

**successExamples:**
- 🇫🇷 France (~34 gCO₂eq/kWh) — grâce à son parc nucléaire dominant
- 🇸🇪 Suède (~13 gCO₂eq/kWh) — mix nucléaire + hydraulique
- 🇳🇴 Norvège (~26 gCO₂eq/kWh) — quasi 100% hydraulique

---

## Défi 2 — Mix majoritairement renouvelable

- **id:** renewables
- **title:** Mix majoritairement renouvelable
- **difficulty:** Facile
- **description:** Faites passer les énergies renouvelables au-dessus de 60% du mix.
- **startMix:** { nucleaire: 30, eolien: 10, solaire: 8, hydraulique: 10, gaz: 25, charbon: 12, bioenergies: 5 }

**objectives:**
- label: "Renouvelables ≥ 60 %" — check: `r.renewables >= 60`

**successExamples:**
- 🇳🇴 Norvège (~98% renouvelables) — champion mondial de l'hydraulique
- 🇧🇷 Brésil (~85% renouvelables) — hydraulique + éolien + solaire
- 🇩🇪 Allemagne (~59% renouvelables) — forte montée de l'éolien et du solaire

---

## Défi 3 — Mix vert et compétitif

- **id:** competitive
- **title:** Mix vert et compétitif
- **difficulty:** Moyen
- **description:** Trouvez un mix à la fois économique et renouvelable.
- **startMix:** { nucleaire: 5, eolien: 10, solaire: 8, hydraulique: 8, gaz: 40, charbon: 25, bioenergies: 4 }

**objectives:**
- label: "Coût ≤ 70 €/MWh" — check: `r.cost <= 70`
- label: "Renouvelables ≥ 40 %" — check: `r.renewables >= 40`

**successExamples:**
- 🇪🇸 Espagne (~58% renouvelables, coût modéré) — solaire + éolien en forte croissance
- 🇧🇷 Brésil (~85% renouvelables, LCOE compétitif) — hydraulique pilotable et peu coûteux

---

## Défi 4 — Décarboner sans nucléaire

- **id:** nonuclear
- **title:** Décarboner sans nucléaire
- **difficulty:** Moyen
- **description:** Atteignez une faible intensité carbone en utilisant uniquement les renouvelables.
- **startMix:** { nucleaire: 0, eolien: 15, solaire: 10, hydraulique: 10, gaz: 40, charbon: 20, bioenergies: 5 }

**objectives:**
- label: "Nucléaire = 0 %" — check: `mix.nucleaire === 0`
- label: "CO₂ < 150 gCO₂eq/kWh" — check: `r.co2 < 150`
- label: "Stabilité ≥ 50" — check: `r.stability >= 50`

**Note:** si le joueur monte le nucléaire, l'objectif "Nucléaire = 0%" échoue immédiatement.

**successExamples:**
- 🇳🇴 Norvège (0% nucléaire, ~26 gCO₂eq/kWh) — preuve que c'est possible avec l'hydraulique
- 🇧🇷 Brésil (0% nucléaire, faible CO₂) — combinaison hydraulique + éolien + solaire

---

## Défi 5 — Accord de Paris ET réseau stable

- **id:** stable_paris
- **title:** Accord de Paris ET réseau stable
- **difficulty:** Difficile
- **description:** Décarbonez le mix sans sacrifier la stabilité du réseau.
- **startMix:** { nucleaire: 5, eolien: 20, solaire: 20, hydraulique: 10, gaz: 25, charbon: 15, bioenergies: 5 }

**objectives:**
- label: "CO₂ < 50 gCO₂eq/kWh" — check: `r.co2 < 50`
- label: "Stabilité ≥ 60" — check: `r.stability >= 60`

**successExamples:**
- 🇫🇷 France (~34 gCO₂eq/kWh, stabilité ~85) — le nucléaire pilotable est la clé
- 🇸🇪 Suède (~13 gCO₂eq/kWh, stabilité ~90) — nucléaire + hydraulique, très pilotable

---

## Défi 6 — Le mix parfait

- **id:** perfect
- **title:** Le mix parfait
- **difficulty:** Difficile
- **description:** Trouvez un mix qui satisfait simultanément quatre contraintes exigeantes.
- **startMix:** { nucleaire: 10, eolien: 15, solaire: 10, hydraulique: 8, gaz: 30, charbon: 22, bioenergies: 5 }

**objectives:**
- label: "CO₂ < 100 gCO₂eq/kWh" — check: `r.co2 < 100`
- label: "Coût ≤ 75 €/MWh" — check: `r.cost <= 75`
- label: "Stabilité ≥ 60" — check: `r.stability >= 60`
- label: "Renouvelables ≥ 40 %" — check: `r.renewables >= 40`

**successExamples:**
- 🇫🇷 France — CO₂ ~34, coût ~65, stabilité ~85, renouvelables ~28% (presque !)
- 🇪🇸 Espagne — bon équilibre renouvelables + stabilité + coût modéré
- 🇸🇪 Suède — CO₂ et stabilité excellents, renouvelables élevés
