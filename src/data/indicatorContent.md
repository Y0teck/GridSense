# Indicator Modal Content

## CO2

**title:** Émissions CO₂
**unit:** gCO₂eq/kWh
**definition:** Quantité de CO₂ équivalent émise pour produire 1 kWh, en tenant compte du cycle de vie complet de chaque source : fabrication, construction, exploitation et démantèlement des installations.
**calculation:**
```
CO₂ = Σ (part_source × coef_co2_source)
Coefficients IPCC AR6 :
- Nucléaire : 12 gCO₂eq/kWh
- Éolien : 11 gCO₂eq/kWh
- Solaire : 45 gCO₂eq/kWh
- Hydraulique : 24 gCO₂eq/kWh
- Gaz : 490 gCO₂eq/kWh
- Thermique fossile : 820 gCO₂eq/kWh
- Bioénergies : 230 gCO₂eq/kWh
```
**references:**
- France (RTE 2025) → ~34 gCO₂eq/kWh
- Union européenne (2023) → ~242 gCO₂eq/kWh
- Allemagne (2023) → ~380 gCO₂eq/kWh
- Moyenne mondiale → ~460 gCO₂eq/kWh
- Objectif Accord de Paris → < 50 gCO₂eq/kWh

**sources:**
- IPCC AR6 WGIII — Annexe III (2022) → https://www.ipcc.ch/report/ar6/wg3/
- RTE — Bilan électrique 2025 → https://odre.opendatasoft.com/explore/dataset/prod-national-annuel-filiere/
- Ember — European Electricity Review 2024 → https://ember-energy.org/latest-insights/european-electricity-review-2024/eu-electricity-trends/

---

## COST

**title:** Coût de production
**unit:** €/MWh
**definition:** Le LCOE (Levelized Cost of Energy) représente le coût moyen de production d'un MWh sur toute la durée de vie d'une installation, incluant construction, exploitation et financement. C'est l'indicateur standard de comparaison entre filières.
**calculation:**
```
Coût = Σ (part_source × LCOE_source)
Valeurs IRENA 2023 :
- Éolien : 50 €/MWh
- Solaire : 45 €/MWh
- Hydraulique : 40 €/MWh
- Nucléaire : 70 €/MWh
- Gaz : 100 €/MWh
- Thermique fossile : 80 €/MWh
- Bioénergies : 90 €/MWh
```
**references:**
- France (mix 2025) → ~65 €/MWh
- Allemagne (mix 2023) → ~85 €/MWh
- Solaire seul → ~45 €/MWh
- Gaz seul → ~100 €/MWh

**sources:**
- IRENA — Renewable Power Generation Costs 2023 → https://www.irena.org/Publications/2024/Sep/Renewable-Power-Generation-Costs-in-2023

---

## STABILITY

**title:** Stabilité réseau
**unit:** /100
**definition:** Score représentant la part des sources pilotables (dispatchables) dans le mix : sources dont on peut ajuster la production à la demande en temps réel. Un réseau avec beaucoup de sources intermittentes (éolien, solaire) est plus difficile à équilibrer et nécessite des capacités de stockage ou de backup.
**calculation:**
```
Stabilité = Σ parts des sources pilotables
Sources pilotables : nucléaire, hydraulique, gaz, thermique fossile, bioénergies
Sources intermittentes (non comptées) : éolien, solaire
```
**references:**
- France (mix 2025) → ~85/100
- Norvège (quasi 100% hydro) → ~99/100
- Union européenne (2023) → ~65/100
- Allemagne (mix 2023) → ~60/100
- Seuil recommandé → ≥ 60/100

**sources:**
- Méthodologie interne ÉnergIA → (pas de lien)
- RTE — Rapport sur l'adéquation du système électrique → https://www.rte-france.com/analyses-tendances-et-prospectives/bilan-previsionnel-2050-futurs-energetiques

---

## RENEWABLES

**title:** Énergies renouvelables
**unit:** %
**definition:** Part des énergies renouvelables dans le mix électrique : éolien (terrestre et offshore), solaire photovoltaïque, hydraulique (fil de l'eau, lac, STEP) et bioénergies (biomasse, biogaz, déchets). Le nucléaire n'est pas comptabilisé comme renouvelable.
**calculation:**
```
Renouvelables = éolien + solaire + hydraulique + bioénergies
```
**references:**
- France (RTE 2025) → ~28%
- Union européenne (2023) → 45,3%
- Allemagne (2023) → ~59%
- Norvège (2023) → ~98%
- Objectif UE 2030 (RED III) → 42,5%

**sources:**
- Directive européenne RED III (2023) → https://energy.ec.europa.eu/topics/renewable-energy/renewable-energy-directive-targets-and-rules/renewable-energy-directive_en
- IEA — World Energy Outlook 2025 → https://www.iea.org/reports/world-energy-outlook-2025
- Eurostat — Part des renouvelables dans l'électricité 2023 → https://ec.europa.eu/eurostat/en/web/products-eurostat-news/w/ddn-20250221-3

---

## LOW_CARBON

**title:** Énergie bas-carbone
**unit:** %
**definition:** Part des sources d'électricité émettant peu de CO₂ sur leur cycle de vie : le nucléaire (12 gCO₂eq/kWh) et toutes les énergies renouvelables. Cet indicateur reflète la capacité d'un mix à décarboner le secteur électrique, indépendamment du caractère renouvelable ou non des sources.
**calculation:**
```
Bas-carbone = nucléaire + éolien + solaire + hydraulique + bioénergies
```
**references:**
- France (RTE 2025) → ~97%
- Suède (2023) → ~99%
- Union européenne (2023) → ~70%
- Allemagne (2023) → ~60%
- Monde (2023) → ~38%

**sources:**
- IEA — World Energy Outlook 2025 → https://www.iea.org/reports/world-energy-outlook-2025
- IPCC AR6 WGIII — Annexe III (2022) → https://www.ipcc.ch/report/ar6/wg3/
