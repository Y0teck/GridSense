# Quiz Challenges — i18n FR/EN translations

Reference file for `src/pages/QuizPage.jsx`. Add a `titleEn`, `descriptionEn`, `objectivesEn[]` and `successExamplesEn[]` field to each CHALLENGES entry. The check functions and startMix stay the same.

---

## paris
- **titleEn:** Paris Agreement Target
- **descriptionEn:** Build an electricity mix compatible with a 1.5°C pathway.
- **objectivesEn labels:** ["CO₂ < 50 gCO₂eq/kWh"]
- **successExamplesEn:**
  - 🇫🇷 France (~34 gCO₂eq/kWh) — thanks to its dominant nuclear fleet
  - 🇸🇪 Sweden (~13 gCO₂eq/kWh) — nuclear + hydro mix
  - 🇳🇴 Norway (~26 gCO₂eq/kWh) — almost 100% hydropower

## renewables
- **titleEn:** Majority Renewable Mix
- **descriptionEn:** Push renewable energy above 60% of the mix.
- **objectivesEn labels:** ["Renewables ≥ 60 %"]
- **successExamplesEn:**
  - 🇳🇴 Norway (~98% renewables) — world hydropower champion
  - 🇧🇷 Brazil (~85% renewables) — hydro + wind + solar
  - 🇩🇪 Germany (~59% renewables) — strong growth in wind and solar

## competitive
- **titleEn:** Green and Competitive Mix
- **descriptionEn:** Find a mix that is both affordable and renewable.
- **objectivesEn labels:** ["Cost ≤ 70 €/MWh", "Renewables ≥ 40 %"]
- **successExamplesEn:**
  - 🇪🇸 Spain (~58% renewables, moderate cost) — solar + wind in strong growth
  - 🇧🇷 Brazil (~85% renewables, competitive LCOE) — dispatchable and low-cost hydro

## nonuclear
- **titleEn:** Decarbonise Without Nuclear
- **descriptionEn:** Reach low carbon intensity using renewables only.
- **objectivesEn labels:** ["Nuclear = 0 %", "CO₂ < 150 gCO₂eq/kWh", "Stability ≥ 50"]
- **successExamplesEn:**
  - 🇳🇴 Norway (0% nuclear, ~26 gCO₂eq/kWh) — proof it's possible with hydro
  - 🇧🇷 Brazil (0% nuclear, low CO₂) — hydro + wind + solar combination

## stable_paris
- **titleEn:** Paris Agreement AND Stable Grid
- **descriptionEn:** Decarbonise the mix without sacrificing grid stability.
- **objectivesEn labels:** ["CO₂ < 50 gCO₂eq/kWh", "Stability ≥ 60"]
- **successExamplesEn:**
  - 🇫🇷 France (~34 gCO₂eq/kWh, stability ~85) — dispatchable nuclear is the key
  - 🇸🇪 Sweden (~13 gCO₂eq/kWh, stability ~90) — nuclear + hydro, highly dispatchable

## perfect
- **titleEn:** The Perfect Mix
- **descriptionEn:** Find a mix that simultaneously satisfies four demanding constraints.
- **objectivesEn labels:** ["CO₂ < 100 gCO₂eq/kWh", "Cost ≤ 75 €/MWh", "Stability ≥ 60", "Renewables ≥ 40 %"]
- **successExamplesEn:**
  - 🇫🇷 France — CO₂ ~34, cost ~65, stability ~85, renewables ~28% (almost!)
  - 🇪🇸 Spain — good balance of renewables + stability + moderate cost
  - 🇸🇪 Sweden — excellent CO₂ and stability, high renewables
