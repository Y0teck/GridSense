export const ENERGIES_CONTENT = [
  {
    "id": "nucleaire",
    "intermittence": "low",
    "sources": [
      {
        "labelFr": "IPCC AR6 — Émissions CO₂ cycle de vie",
        "labelEn": "IPCC AR6 — Lifecycle CO₂ emissions",
        "url": "https://www.ipcc.ch/report/ar6/wg3/"
      },
      {
        "labelFr": "IRENA — Coûts des énergies renouvelables 2023",
        "labelEn": "IRENA — Renewable Power Generation Costs 2023",
        "url": "https://www.irena.org/Publications/2024/Sep/Renewable-Power-Generation-Costs-in-2023"
      },
      {
        "labelFr": "IEA — Nuclear Power and Secure Energy Transitions",
        "labelEn": "IEA — Nuclear Power and Secure Energy Transitions",
        "url": "https://www.iea.org/reports/nuclear-power-and-secure-energy-transitions"
      }
    ],
    "sections": {
      "env": {
        "titleFr": "Impacts environnementaux",
        "titleEn": "Environmental impacts",
        "bulletsFr": [
          "Émissions CO₂ parmi les plus faibles sur cycle de vie (12 gCO₂eq/kWh, IPCC AR6) — inférieures à l'éolien terrestre.",
          "Faible emprise au sol : une centrale de 1 GW occupe ~1 km², contre ~400 km² pour l'équivalent solaire.",
          "Déchets radioactifs : point central. La France stocke ses déchets de haute activité à vie longue à Cigéo (Meuse). Volume total mondial très faible : l'ensemble des déchets nucléaires civils produits depuis 60 ans tiendrait dans un terrain de football sur 10 mètres de haut.",
          "Risque de contamination en cas d'accident grave (Tchernobyl 1986, Fukushima 2011) : rare mais potentiellement durable sur les écosystèmes locaux.",
          "Consommation d'eau élevée pour le refroidissement — impact sur les rivières en période de canicule (arrêts partiels en France en 2022, 2023).",
          "Extraction d'uranium : impact minier au Niger, Kazakhstan, Canada. Faible volume, mais gestion des résidus nécessaire."
        ],
        "bulletsEn": [
          "Lifecycle CO₂ among the lowest of any source (12 gCO₂eq/kWh, IPCC AR6) — lower than onshore wind.",
          "Small land footprint: a 1 GW plant occupies ~1 km², vs ~400 km² for equivalent solar capacity.",
          "Radioactive waste: the central concern. France stores high-level long-lived waste at the Cigéo facility (Meuse). Total global civilian nuclear waste ever produced would fit in a football field stacked 10m high.",
          "Risk of contamination in case of serious accident (Chernobyl 1986, Fukushima 2011): rare but potentially lasting effects on local ecosystems.",
          "High water consumption for cooling — impact on rivers during heatwaves (partial shutdowns in France in 2022, 2023).",
          "Uranium mining: environmental footprint in Niger, Kazakhstan, Canada. Low volume, but tailings management required."
        ]
      },
      "costs": {
        "titleFr": "Coûts détaillés",
        "titleEn": "Detailed costs",
        "bulletsFr": [
          "LCOE moyen 2023 : ~65–80 €/MWh (IRENA). Très variable selon les pays et l'âge du parc.",
          "Capex : 5 000–8 000 €/kW pour les nouvelles constructions en Europe (Flamanville, Hinkley Point C). Les réacteurs de 3e génération ont connu des dépassements de coûts importants (+200% à +300%).",
          "Opex faible : ~15–20 €/MWh une fois la centrale amortie — c'est pourquoi le parc français existant produit de l'électricité très compétitive.",
          "Coût du combustible (uranium) : faible part du LCOE (~5–10%). Hausse du cours de l'uranium en 2023–2024 mais impact limité sur le prix de l'électricité.",
          "Démantèlement : coût significatif (~1–2 Md€ par réacteur), provisionné mais incertain.",
          "Les SMR (Small Modular Reactors) pourraient réduire les coûts de construction par industrialisation — en développement chez EDF, NuScale, Rolls-Royce."
        ],
        "bulletsEn": [
          "Average LCOE 2023: ~65–80 €/MWh (IRENA). Highly variable by country and age of fleet.",
          "Capex: 5,000–8,000 €/kW for new builds in Europe (Flamanville, Hinkley Point C). 3rd-generation reactors have seen major cost overruns (+200% to +300%).",
          "Low opex: ~15–20 €/MWh once amortised — why France's existing fleet produces very competitive electricity.",
          "Fuel cost (uranium): small share of LCOE (~5–10%). Uranium price rose in 2023–2024 but limited impact on electricity price.",
          "Decommissioning: significant cost (~€1–2bn per reactor), provisioned but uncertain.",
          "SMRs (Small Modular Reactors) could reduce construction costs through industrialisation — in development at EDF, NuScale, Rolls-Royce."
        ]
      },
      "infra": {
        "titleFr": "Infrastructure & compétences",
        "titleEn": "Infrastructure & skills",
        "bulletsFr": [
          "Construction : 10–15 ans minimum pour un réacteur de grande taille. Nécessite des milliers de soudeurs, chaudronniers, ingénieurs nucléaires spécialisés.",
          "Filière industrielle lourde : forge (JCFC au Japon, Le Creusot en France), chaudronnerie nucléaire, tuyauterie qualifiée. Savoir-faire qui se perd si la filière s'arrête trop longtemps.",
          "Compétences rares : physique des réacteurs, radioprotection, sûreté nucléaire, gestion des déchets. La France forme des ingénieurs via l'INSTN et l'École des Mines.",
          "Réseau électrique : le nucléaire produit à haute tension en base — pas de contrainte d'intégration réseau particulière, au contraire il stabilise le réseau.",
          "Approvisionnement en uranium : marché mondial, France dépendante des importations (Niger, Kazakhstan, Australie, Canada). Diversification en cours."
        ],
        "bulletsEn": [
          "Construction: 10–15 years minimum for a large reactor. Requires thousands of qualified welders, boilermakers, and nuclear engineers.",
          "Heavy industrial supply chain: forging (JCFC Japan, Le Creusot France), nuclear boilermaking, qualified piping. Expertise that degrades if the industry pauses too long.",
          "Rare skills: reactor physics, radiation protection, nuclear safety, waste management. France trains engineers via INSTN and École des Mines.",
          "Grid: nuclear produces at high voltage as baseload — no particular integration challenge, it actually stabilises the grid.",
          "Uranium supply: global market, France dependent on imports (Niger, Kazakhstan, Australia, Canada). Diversification underway."
        ]
      },
      "grid": {
        "titleFr": "Intégration réseau",
        "titleEn": "Grid integration",
        "bulletsFr": [
          "Source pilotable par excellence : montée/descente en puissance possible, mais plus lente que le gaz (heures vs minutes). Difficile à suivre la demande journalière sans cycles coûteux.",
          "En France, le parc nucléaire suit partiellement la demande (mode \"load following\"), mais cette flexibilité use les composants.",
          "Aucun besoin de stockage associé : le nucléaire produit en permanence, ce qui est un atout pour la stabilité de base mais une contrainte si la production dépasse la consommation (nuits, week-ends).",
          "Complémentaire à l'hydraulique (rapide) pour la flexibilité. Complémentaire au solaire et à l'éolien pour la base décarbonée.",
          "Pas de problème d'intermittence, mais facteur de charge réduit lors des maintenances planifiées (~70-75% effectif en France)."
        ],
        "bulletsEn": [
          "The dispatchable source par excellence: power can be ramped up/down, but slower than gas (hours vs minutes). Difficult to follow daily demand without costly cycling.",
          "In France, the nuclear fleet partly follows demand (load following mode), but this flexibility wears components.",
          "No associated storage needed: nuclear produces continuously, an asset for baseload stability but a constraint when production exceeds demand (nights, weekends).",
          "Complementary to hydro (fast) for flexibility. Complementary to wind and solar for decarbonised baseload.",
          "No intermittency issue, but effective capacity factor reduced by planned maintenance (~70-75% in France)."
        ]
      }
    }
  },
  {
    "id": "eolien",
    "intermittence": "high",
    "sources": [
      {
        "labelFr": "IPCC AR6 — Émissions CO₂ cycle de vie",
        "labelEn": "IPCC AR6 — Lifecycle CO₂ emissions",
        "url": "https://www.ipcc.ch/report/ar6/wg3/"
      },
      {
        "labelFr": "IRENA — Coûts des énergies renouvelables 2023",
        "labelEn": "IRENA — Renewable Power Generation Costs 2023",
        "url": "https://www.irena.org/Publications/2024/Sep/Renewable-Power-Generation-Costs-in-2023"
      },
      {
        "labelFr": "RTE — Futurs Énergétiques 2050",
        "labelEn": "RTE — Energy Futures 2050",
        "url": "https://www.rte-france.com/analyses-tendances-et-prospectives/bilan-previsionnel-2050-futurs-energetiques"
      }
    ],
    "sections": {
      "env": {
        "titleFr": "Impacts environnementaux",
        "titleEn": "Environmental impacts",
        "bulletsFr": [
          "Très faibles émissions CO₂ sur cycle de vie (11 gCO₂eq/kWh), incluant fabrication et recyclage des pales.",
          "Impact sur la biodiversité : mortalité aviaire et chiroptère (chauves-souris). Des systèmes radar peuvent couper les turbines lors des migrations — en développement.",
          "Bruit : turbines terrestres audibles à moins de 500 m (bruit de fond ~35–45 dB). Réglementation stricte en France (500 m des habitations minimum).",
          "Impact paysager : subjectif mais réel — facteur clé d'acceptabilité locale. L'offshore réduit cet impact.",
          "Emprise au sol : les turbines occupent peu de surface au sol (les terres entre les turbines restent agricoles). Parc éolien de 50 MW : ~15–20 km² mais usage du sol partagé.",
          "Pales en fibre de verre difficiles à recycler : filières de recyclage en développement (ciment, valorisation thermique). Problème croissant avec le renouvellement du parc.",
          "Offshore : impact sur les écosystèmes marins pendant la construction, mais les structures deviennent des récifs artificiels bénéfiques à la biodiversité marine à long terme."
        ],
        "bulletsEn": [
          "Very low lifecycle CO₂ emissions (11 gCO₂eq/kWh), including blade manufacturing and recycling.",
          "Biodiversity impact: bird and bat mortality. Radar systems can shut down turbines during migrations — under development.",
          "Noise: onshore turbines audible within 500m (background noise ~35–45 dB). Strict regulation in France (minimum 500m from dwellings).",
          "Visual impact: subjective but real — key factor for local acceptance. Offshore reduces this.",
          "Land footprint: turbines occupy little ground surface (land between turbines remains agricultural). A 50 MW wind farm: ~15–20 km² but shared land use.",
          "Fibreglass blades difficult to recycle: recycling streams in development (cement, thermal valorisation). Growing issue as fleet reaches end-of-life.",
          "Offshore: impact on marine ecosystems during construction, but structures become artificial reefs beneficial to marine biodiversity long-term."
        ]
      },
      "costs": {
        "titleFr": "Coûts détaillés",
        "titleEn": "Detailed costs",
        "bulletsFr": [
          "LCOE terrestre 2023 : ~40–60 €/MWh (IRENA). Parmi les moins chers au monde, en baisse continue.",
          "LCOE offshore 2023 : ~80–130 €/MWh. Coûts en baisse mais encore élevés par rapport au terrestre.",
          "Capex terrestre : ~1 200–1 500 €/kW. Offshore : ~3 000–5 000 €/kW.",
          "Opex faible (~15–20 €/MWh) grâce à l'absence de combustible. Maintenance des pales et des engrenages principal poste.",
          "Durée de vie : 20–25 ans pour le turbine, fondations réutilisables pour le repowering.",
          "Risque de hausse des coûts offshore : inflation des matériaux, coût des câbles sous-marins, logistique d'installation en mer. Plusieurs projets annulés en 2023–2024 au Royaume-Uni et aux États-Unis."
        ],
        "bulletsEn": [
          "Onshore LCOE 2023: ~40–60 €/MWh (IRENA). Among the cheapest globally, continuously falling.",
          "Offshore LCOE 2023: ~80–130 €/MWh. Costs falling but still significantly higher than onshore.",
          "Capex onshore: ~1,200–1,500 €/kW. Offshore: ~3,000–5,000 €/kW.",
          "Low opex (~15–20 €/MWh) with no fuel cost. Blade and gearbox maintenance is the main cost.",
          "Lifespan: 20–25 years for the turbine, foundations reusable for repowering.",
          "Offshore cost pressure: material inflation, submarine cable costs, offshore installation logistics. Several projects cancelled in 2023–2024 in the UK and US."
        ]
      },
      "infra": {
        "titleFr": "Infrastructure & compétences",
        "titleEn": "Infrastructure & skills",
        "bulletsFr": [
          "Fabrication : pales (Vestas, Siemens Gamesa, GE), nacelles, mâts. Chaîne d'approvisionnement mondiale avec terres rares (aimants permanents) principalement issues de Chine.",
          "Installation terrestre : accessible avec des grues standard, réseau routier existant. Délai de construction : 1–2 ans par parc.",
          "Installation offshore : navires d'installation spécialisés (jack-up vessels), câbles sous-marins, plateformes de transformation. Infrastructure lourde et rare.",
          "Compétences : ingénierie mécanique, électrique, génie civil. Techniciens de maintenance en forte demande. Offshore nécessite des plongeurs, ROV, personnel navigant.",
          "Raccordement réseau : chaque parc nécessite un poste de transformation et une ligne d'évacuation. Goulot d'étranglement fréquent en France (délais RTE de 6–10 ans)."
        ],
        "bulletsEn": [
          "Manufacturing: blades (Vestas, Siemens Gamesa, GE), nacelles, towers. Global supply chain with rare earths (permanent magnets) mainly from China.",
          "Onshore installation: accessible with standard cranes, existing road network. Construction time: 1–2 years per farm.",
          "Offshore installation: specialised jack-up vessels, submarine cables, transformer platforms. Heavy and scarce infrastructure.",
          "Skills: mechanical and electrical engineering, civil engineering. Maintenance technicians in high demand. Offshore requires divers, ROVs, marine personnel.",
          "Grid connection: each farm needs a transformer substation and an export line. Frequent bottleneck in France (RTE connection delays of 6–10 years)."
        ]
      },
      "grid": {
        "titleFr": "Intégration réseau",
        "titleEn": "Grid integration",
        "bulletsFr": [
          "Principale contrainte : variabilité. La production peut chuter de 0% à 100% de la capacité en quelques heures selon la météo.",
          "Prévisibilité : bonne à 24–48h (modèles météo), meilleure que le solaire. Permet un équilibrage anticipé.",
          "Complémentaire au solaire : l'éolien produit surtout l'hiver et la nuit, le solaire l'été en journée — les deux se combinent bien.",
          "Backup nécessaire : une pénétration éolienne élevée (>30%) requiert des sources pilotables (gaz, hydro, batteries) pour les périodes de vent faible prolongées (dunkelflaute — semaines sans vent ni soleil).",
          "Impact sur le réseau : les grandes fermes injectent à haute tension. Les éoliennes décentralisées posent des défis d'équilibre local (congestions réseau).",
          "L'Europe développe des interconnexions transfrontalières pour mutualiser la variabilité géographique."
        ],
        "bulletsEn": [
          "Main constraint: variability. Output can swing from 0% to 100% of capacity within hours depending on weather.",
          "Predictability: good at 24–48h (weather models), better than solar. Enables anticipatory balancing.",
          "Complementary to solar: wind peaks in winter and at night, solar in summer daytime — the two pair well.",
          "Backup needed: high wind penetration (>30%) requires dispatchable sources (gas, hydro, batteries) for extended low-wind periods (dunkelflaute — weeks without wind or sun).",
          "Grid impact: large farms inject at high voltage. Distributed wind turbines create local balancing challenges (grid congestion).",
          "Europe is developing cross-border interconnections to pool geographic variability."
        ]
      }
    }
  },
  {
    "id": "solaire",
    "intermittence": "high",
    "sources": [
      {
        "labelFr": "IPCC AR6 — Émissions CO₂ cycle de vie",
        "labelEn": "IPCC AR6 — Lifecycle CO₂ emissions",
        "url": "https://www.ipcc.ch/report/ar6/wg3/"
      },
      {
        "labelFr": "IRENA — Coûts des énergies renouvelables 2023",
        "labelEn": "IRENA — Renewable Power Generation Costs 2023",
        "url": "https://www.irena.org/Publications/2024/Sep/Renewable-Power-Generation-Costs-in-2023"
      },
      {
        "labelFr": "IEA — Special Report on Solar PV",
        "labelEn": "IEA — Special Report on Solar PV",
        "url": "https://www.iea.org/reports/solar-pv-global-supply-chains"
      }
    ],
    "sections": {
      "env": {
        "titleFr": "Impacts environnementaux",
        "titleEn": "Environmental impacts",
        "bulletsFr": [
          "Émissions CO₂ cycle de vie : ~45 gCO₂eq/kWh (IPCC AR6). Plus élevé que le nucléaire et l'éolien, mais bien inférieur au gaz (~10×) et au charbon (~18×).",
          "Fabrication des panneaux : consommatrice d'énergie, de silicium, d'argent, et pour les panneaux à haut rendement, de tellure, indium (métaux critiques). Production dominée par la Chine.",
          "Fin de vie : 90% du panneau est recyclable (verre, aluminium). Filières de recyclage en développement en Europe (directive DEEE). Volumes importants à prévoir d'ici 2030–2040.",
          "Occupation des sols : grande ferme solaire de 100 MW → ~200 ha. Agrivoltaïsme : cohabitation culture + panneaux montrant des résultats positifs (ombre bénéfique pour certaines cultures, revenus complémentaires agriculteurs).",
          "Impact sur la biodiversité : limité si bien conçu. Certains parcs intègrent des corridors écologiques et favorisent la végétation basse.",
          "Pollution locale pendant la fabrication : solvants, acides utilisés en usine. Impact concentré en Chine où une grande partie de la production a lieu."
        ],
        "bulletsEn": [
          "Lifecycle CO₂: ~45 gCO₂eq/kWh (IPCC AR6). Higher than nuclear and wind, but well below gas (~10×) and coal (~18×).",
          "Panel manufacturing: energy-intensive, uses silicon, silver, and for high-efficiency panels, tellurium and indium (critical metals). Production dominated by China.",
          "End of life: 90% of a panel is recyclable (glass, aluminium). Recycling streams developing in Europe (WEEE directive). Large volumes expected from 2030–2040.",
          "Land use: 100 MW solar farm → ~200 ha. Agrivoltaics: crop + panel coexistence showing positive results (shade beneficial for some crops, supplementary farmer income).",
          "Biodiversity impact: limited if well-designed. Some farms integrate ecological corridors and promote low vegetation.",
          "Local pollution during manufacturing: solvents and acids used in factories. Impact concentrated in China where most production occurs."
        ]
      },
      "costs": {
        "titleFr": "Coûts détaillés",
        "titleEn": "Detailed costs",
        "bulletsFr": [
          "LCOE 2023 : ~30–50 €/MWh dans les pays très ensoleillés (Espagne, MENA). ~50–70 €/MWh en France (ensoleillement moindre).",
          "Baisse de 90% du coût des panneaux depuis 2010 — la baisse la plus rapide de l'histoire de l'énergie. Le coût des panneaux représente désormais ~30% du LCOE total.",
          "Capex : ~600–900 €/kWc pour une grande ferme. ~1 000–1 500 €/kWc pour le résidentiel (avec installation).",
          "Opex très faible : ~10 €/MWh. Pas de combustible, peu de pièces mobiles. Nettoyage des panneaux principal coût variable.",
          "Raccordement réseau : coût croissant, goulot d'étranglement dans de nombreux pays.",
          "Stockage : le solaire sans stockage ne produit pas la nuit. Couplage avec batteries (BESS) en forte croissance : ajoute ~20–40 €/MWh au LCOE effectif selon la durée de stockage."
        ],
        "bulletsEn": [
          "LCOE 2023: ~30–50 €/MWh in high-sunshine countries (Spain, MENA). ~50–70 €/MWh in France (lower irradiation).",
          "Panel costs have fallen 90% since 2010 — the fastest cost decline in energy history. Panel cost now represents ~30% of total LCOE.",
          "Capex: ~600–900 €/kWp for utility-scale farms. ~1,000–1,500 €/kWp for residential (with installation).",
          "Very low opex: ~10 €/MWh. No fuel, few moving parts. Panel cleaning is the main variable cost.",
          "Grid connection: growing cost, bottleneck in many countries.",
          "Storage: solar without storage produces nothing at night. Battery coupling (BESS) growing rapidly: adds ~20–40 €/MWh to effective LCOE depending on storage duration."
        ]
      },
      "infra": {
        "titleFr": "Infrastructure & compétences",
        "titleEn": "Infrastructure & skills",
        "bulletsFr": [
          "Fabrication : dominée par la Chine (85% de la production mondiale de panneaux). Europe tente de relancer une filière via le Net-Zero Industry Act.",
          "Installation : rapide et modulaire. Une ferme de 100 MW s'installe en 6–12 mois. Compétences : électriciens, techniciens de pose, ingénieurs électriques. Pas de qualification rare.",
          "Résidentiel : installateurs certifiés RGE en France. Marché en forte croissance post-2020.",
          "Chaîne d'approvisionnement : dépendance aux importations chinoises. Tensions commerciales (droits de douane UE 2024).",
          "Raccordement réseau : pose des câbles, postes de transformation, démarche de raccordement Enedis/RTE. Délais administratifs souvent plus longs que la construction elle-même (1–5 ans en France)."
        ],
        "bulletsEn": [
          "Manufacturing: dominated by China (85% of global panel production). Europe is attempting to rebuild a supply chain via the Net-Zero Industry Act.",
          "Installation: fast and modular. A 100 MW farm installs in 6–12 months. Skills: electricians, installation technicians, electrical engineers. No rare qualifications.",
          "Residential: RGE-certified installers in France. Rapidly growing market post-2020.",
          "Supply chain: dependence on Chinese imports. Trade tensions (EU tariffs 2024).",
          "Grid connection: cable laying, transformer substations, Enedis/RTE connection process. Administrative delays often longer than construction (1–5 years in France)."
        ]
      },
      "grid": {
        "titleFr": "Intégration réseau",
        "titleEn": "Grid integration",
        "bulletsFr": [
          "Intermittence double : journalière (nuit/jour) ET saisonnière (hiver/été). Problème plus structurel que l'éolien.",
          "Duck curve : en milieu de journée, l'excès de solaire fait chuter le prix spot à zéro ou négatif, puis la demande du soir crée un pic brutal à couvrir rapidement.",
          "Solutions : batteries de courte durée (4h), effacement de la demande, pompage hydraulique, interconnexions.",
          "Forte pénétration solaire (>20%) nécessite des actifs de flexibilité importants et un réseau de distribution renforcé.",
          "En France : RTE estime qu'il faudra ~200 GW de solaire d'ici 2050 (vs ~17 GW en 2023). Nécessite des investissements réseau massifs.",
          "L'autoconsommation collective et les communautés énergétiques réduisent l'impact sur le réseau haute tension."
        ],
        "bulletsEn": [
          "Double intermittency: daily (night/day) AND seasonal (winter/summer). A more structural problem than wind.",
          "Duck curve: at midday, excess solar drives spot prices to zero or negative, then evening demand creates a sharp ramp that must be covered quickly.",
          "Solutions: short-duration batteries (4h), demand response, pumped hydro, interconnections.",
          "High solar penetration (>20%) requires significant flexibility assets and a reinforced distribution network.",
          "In France: RTE estimates ~200 GW of solar needed by 2050 (vs ~17 GW in 2023). Requires massive grid investment.",
          "Collective self-consumption and energy communities reduce the impact on the high-voltage grid."
        ]
      }
    }
  },
  {
    "id": "hydraulique",
    "intermittence": "low",
    "sources": [
      {
        "labelFr": "IPCC AR6 — Émissions CO₂ cycle de vie",
        "labelEn": "IPCC AR6 — Lifecycle CO₂ emissions",
        "url": "https://www.ipcc.ch/report/ar6/wg3/"
      },
      {
        "labelFr": "IRENA — Coûts des énergies renouvelables 2023",
        "labelEn": "IRENA — Renewable Power Generation Costs 2023",
        "url": "https://www.irena.org/Publications/2024/Sep/Renewable-Power-Generation-Costs-in-2023"
      },
      {
        "labelFr": "IEA — Hydropower Special Market Report",
        "labelEn": "IEA — Hydropower Special Market Report",
        "url": "https://www.iea.org/reports/hydropower-special-market-report"
      }
    ],
    "sections": {
      "env": {
        "titleFr": "Impacts environnementaux",
        "titleEn": "Environmental impacts",
        "bulletsFr": [
          "Très faibles émissions CO₂ en fonctionnement (24 gCO₂eq/kWh sur cycle de vie, IPCC AR6).",
          "Impact majeur sur les écosystèmes aquatiques : fragmentation des cours d'eau, blocage des migrations de poissons (saumons, anguilles), modification des régimes sédimentaires en aval.",
          "Obligation légale de débits réservés et de passes à poissons en France depuis la loi sur l'eau de 2006.",
          "Réservoirs : ennoyage de vallées, déplacement de populations (Three Gorges en Chine : 1,4 million de personnes déplacées). Impact irréversible sur les paysages.",
          "Changement climatique : réduction des ressources en eau dans de nombreux bassins versants. La production hydraulique française a baissé de 20% lors de la sécheresse de 2022.",
          "Risque : rupture de barrage (Vajont 1963, Banqiao 1975) — catastrophe rare mais aux conséquences extrêmes.",
          "Les petits barrages au fil de l'eau ont un impact moindre sur les écosystèmes que les grands réservoirs."
        ],
        "bulletsEn": [
          "Very low operational CO₂ emissions (24 gCO₂eq/kWh lifecycle, IPCC AR6).",
          "Major impact on aquatic ecosystems: river fragmentation, blocking fish migration (salmon, eels), modifying downstream sediment regimes.",
          "Legal requirement for minimum flows and fish passes in France since the 2006 Water Act.",
          "Reservoirs: flooding of valleys, displacement of populations (Three Gorges in China: 1.4 million people displaced). Irreversible landscape impact.",
          "Climate change: reduced water resources in many river basins. French hydro output fell 20% during the 2022 drought.",
          "Risk: dam failure (Vajont 1963, Banqiao 1975) — rare disaster but with extreme consequences.",
          "Small run-of-river plants have much less ecosystem impact than large reservoirs."
        ]
      },
      "costs": {
        "titleFr": "Coûts détaillés",
        "titleEn": "Detailed costs",
        "bulletsFr": [
          "LCOE moyen 2023 : ~25–50 €/MWh (IRENA). Parmi les moins chers une fois amorti.",
          "Capex : 1 500–4 000 €/kW (très variable selon topographie, taille, type). Les grands barrages sont parmi les projets d'infrastructure les plus coûteux.",
          "Opex très faible : ~5–15 €/MWh. Pas de combustible, faible maintenance mécanique. Les ouvrages durent 50–100 ans.",
          "En France : la plupart des concessions hydrauliques (EDF) sont proches d'être amorties. La production est donc extrêmement compétitive (~5–10 €/MWh de coût opérationnel).",
          "STEP (Station de Transfert d'Énergie par Pompage) : Capex élevé (~800–1 200 €/kW), mais valeur de marché très élevée (flexibilité et stockage).",
          "Peu de nouvelles constructions possibles en Europe : sites déjà exploités. Potentiel résiduel en Afrique et Asie du Sud-Est."
        ],
        "bulletsEn": [
          "Average LCOE 2023: ~25–50 €/MWh (IRENA). Among the cheapest once amortised.",
          "Capex: 1,500–4,000 €/kW (highly variable by topography, size, type). Large dams are among the most expensive infrastructure projects.",
          "Very low opex: ~5–15 €/MWh. No fuel, low mechanical maintenance. Assets last 50–100 years.",
          "In France: most hydro concessions (EDF) are nearly fully depreciated. Output is therefore extremely competitive (~5–10 €/MWh operational cost).",
          "PSH (Pumped Storage Hydro): high capex (~800–1,200 €/kW), but very high market value (flexibility and storage).",
          "Few new sites available in Europe: most already developed. Remaining potential in Africa and Southeast Asia."
        ]
      },
      "infra": {
        "titleFr": "Infrastructure & compétences",
        "titleEn": "Infrastructure & skills",
        "bulletsFr": [
          "Génie civil lourd : barrages en béton ou remblai, tunnels de dérivation, conduites forcées. Compétences de spécialistes du génie civil hydraulique, rares et concentrées dans quelques entreprises (Bouygues, Vinci, EDF).",
          "Turbines et alternateurs : fabrication industrielle (Andritz, Voith, GE Renewable). Durée de vie mécanique très longue, révisions décennales.",
          "En France : renouvellement des concessions EDF source d'enjeux juridiques et politiques. Ouverture à la concurrence demandée par l'UE depuis 2010, toujours en cours.",
          "STEP : creusement de cavernes souterraines pour les turbines-pompes, galeries de liaison entre les deux bassins. Infrastructure d'ingénierie civile complexe.",
          "Gestion du débit : salle de contrôle permanente, coordination avec RTE pour l'effacement et le soutien réseau."
        ],
        "bulletsEn": [
          "Heavy civil engineering: concrete or embankment dams, diversion tunnels, penstocks. Skills from hydraulic civil engineering specialists, rare and concentrated in a few firms (Bouygues, Vinci, EDF).",
          "Turbines and alternators: industrial manufacturing (Andritz, Voith, GE Renewable). Very long mechanical lifespan, decade-long overhauls.",
          "In France: renewal of EDF concessions is a source of legal and political disputes. Competition required by the EU since 2010, still ongoing.",
          "PSH: excavation of underground caverns for pump-turbines, galleries linking the two reservoirs. Complex civil engineering infrastructure.",
          "Flow management: permanent control room, coordination with RTE for demand response and grid support."
        ]
      },
      "grid": {
        "titleFr": "Intégration réseau",
        "titleEn": "Grid integration",
        "bulletsFr": [
          "Atout majeur pour le réseau : démarrage en quelques secondes (STEP), quelques minutes (lac de barrage). Idéal pour la pointe du soir et les fluctuations rapides.",
          "Seule source renouvelable pilotable à grande échelle — c'est pourquoi les pays riches en hydraulique (Norvège, Brésil) peuvent atteindre 100% d'énergies bas-carbone plus facilement.",
          "STEP : \"batterie géante\" du système électrique. La France dispose de ~5 GW de STEP (Grand'Maison, Montézic). L'Europe en développe de nouvelles (Nant de Drance en Suisse, 900 MW).",
          "Contrainte saisonnière : production dépendante des précipitations et de la fonte des neiges. L'été 2022 a montré la vulnérabilité au changement climatique.",
          "Synergies avec l'éolien et le solaire : l'hydraulique peut compenser quasi instantanément les creux de production éolienne/solaire."
        ],
        "bulletsEn": [
          "Major grid asset: startup in seconds (PSH), minutes (reservoir). Ideal for evening peak and rapid fluctuations.",
          "Only large-scale dispatchable renewable — why hydro-rich countries (Norway, Brazil) can more easily achieve 100% low-carbon electricity.",
          "PSH: the \"giant battery\" of the electricity system. France has ~5 GW of PSH (Grand'Maison, Montézic). Europe developing new ones (Nant de Drance in Switzerland, 900 MW).",
          "Seasonal constraint: output dependent on rainfall and snowmelt. Summer 2022 showed vulnerability to climate change.",
          "Synergies with wind and solar: hydro can near-instantly compensate for wind/solar output drops."
        ]
      }
    }
  },
  {
    "id": "gaz",
    "intermittence": "low",
    "sources": [
      {
        "labelFr": "IPCC AR6 — Émissions CO₂ cycle de vie",
        "labelEn": "IPCC AR6 — Lifecycle CO₂ emissions",
        "url": "https://www.ipcc.ch/report/ar6/wg3/"
      },
      {
        "labelFr": "IEA — World Energy Outlook 2024",
        "labelEn": "IEA — World Energy Outlook 2024",
        "url": "https://www.iea.org/reports/world-energy-outlook-2024"
      },
      {
        "labelFr": "IEA — Net Zero by 2050",
        "labelEn": "IEA — Net Zero by 2050",
        "url": "https://www.iea.org/reports/net-zero-by-2050"
      }
    ],
    "sections": {
      "env": {
        "titleFr": "Impacts environnementaux",
        "titleEn": "Environmental impacts",
        "bulletsFr": [
          "Émissions CO₂ élevées : ~490 gCO₂eq/kWh (cycle de vie, IPCC AR6). Environ 2× moins que le charbon, mais incompatible avec les objectifs 1,5°C.",
          "Méthane : le gaz naturel est à 90% du méthane, un GES ~80× plus puissant que le CO₂ sur 20 ans. Les fuites lors de l'extraction et du transport (méthane fugitif) peuvent annuler l'avantage sur le charbon si le taux de fuite dépasse ~3–4%.",
          "Pas d'émissions de particules fines ni de NOx/SOx significatifs par rapport au charbon — meilleure qualité de l'air locale.",
          "Extraction : impact environnemental variable. Le gaz naturel liquéfié (GNL) a une empreinte plus élevée (liquéfaction, transport maritime).",
          "Fracturation hydraulique (fracking) : technique controversée pour le gaz de schiste — consommation d'eau, contamination des nappes phréatiques, séismes induits. Interdite en France."
        ],
        "bulletsEn": [
          "High CO₂ emissions: ~490 gCO₂eq/kWh (lifecycle, IPCC AR6). About 2× less than coal, but incompatible with 1.5°C targets.",
          "Methane: natural gas is ~90% methane, a GHG ~80× more potent than CO₂ over 20 years. Fugitive methane during extraction and transport can eliminate the coal advantage if leak rates exceed ~3–4%.",
          "No significant fine particles or NOx/SOx compared to coal — better local air quality.",
          "Extraction: variable environmental footprint. LNG has a higher footprint (liquefaction, maritime transport).",
          "Hydraulic fracturing (fracking): controversial technique for shale gas — water use, groundwater contamination, induced earthquakes. Banned in France."
        ]
      },
      "costs": {
        "titleFr": "Coûts détaillés",
        "titleEn": "Detailed costs",
        "bulletsFr": [
          "LCOE 2023 : ~80–120 €/MWh (fortement variable selon le prix du gaz).",
          "Capex faible : ~600–800 €/kW pour une centrale CCGT. L'un des investissements les plus rapides à rentabiliser.",
          "Opex dominé par le coût du combustible : 60–70% du LCOE total. Extrêmement sensible au prix du gaz.",
          "Prix du gaz TTF (Europe) : passé de ~20 €/MWh en 2021 à ~340 €/MWh au pic d'août 2022 (crise ukrainienne), puis redescendu à ~30–40 €/MWh en 2024.",
          "Risque de stranded asset : les centrales à gaz pourraient devenir non rentables avant la fin de leur vie technique si les prix du carbone augmentent et que les renouvelables continuent de baisser.",
          "Certaines centrales fonctionnent moins de 1 000h/an en Europe — en mode backup pur, ce qui détériore l'économie du projet."
        ],
        "bulletsEn": [
          "LCOE 2023: ~80–120 €/MWh (highly variable with gas prices).",
          "Low capex: ~600–800 €/kW for a CCGT plant. One of the fastest investments to recoup.",
          "Opex dominated by fuel cost: 60–70% of total LCOE. Extremely sensitive to gas prices.",
          "European TTF gas price: from ~€20/MWh in 2021 to ~€340/MWh at the August 2022 peak (Ukraine crisis), then back to ~€30–40/MWh in 2024.",
          "Stranded asset risk: gas plants could become uneconomical before end of technical life if carbon prices rise and renewables keep falling.",
          "Some plants operate fewer than 1,000h/year in Europe — in pure backup mode, which deteriorates project economics."
        ]
      },
      "infra": {
        "titleFr": "Infrastructure & compétences",
        "titleEn": "Infrastructure & skills",
        "bulletsFr": [
          "Réseau de gazoducs : infrastructure existante, Europe très bien maillée. Le gaz russe (~40% des importations européennes en 2021) a été largement remplacé post-2022 (GNL américain, norvégien, algérien).",
          "Terminaux GNL : construction coûteuse (1–2 Md€), mais permettent la diversification des approvisionnements. Nouveaux terminaux flottants en Allemagne, Italie, Pays-Bas depuis 2022.",
          "Centrales CCGT : construction rapide (2–3 ans). Technologie mature, turbines fabriquées par GE, Siemens, Mitsubishi.",
          "Compétences : ingénierie thermique, turbiniers, opérateurs de centrale. Filière bien établie, reconversion possible depuis le charbon.",
          "Hydrogène : les centrales à gaz pourraient à terme brûler un mélange gaz/hydrogène (H2-ready), permettant une décarbonation progressive."
        ],
        "bulletsEn": [
          "Gas pipeline network: existing infrastructure, Europe is very well connected. Russian gas (~40% of European imports in 2021) largely replaced post-2022 (US, Norwegian, Algerian LNG).",
          "LNG terminals: costly construction (€1–2bn), but enable supply diversification. New floating terminals in Germany, Italy, Netherlands since 2022.",
          "CCGT plants: fast to build (2–3 years). Mature technology, turbines from GE, Siemens, Mitsubishi.",
          "Skills: thermal engineering, turbine operators, plant operators. Well-established industry, possible retraining from coal.",
          "Hydrogen: gas plants could eventually burn gas/hydrogen blends (H2-ready), enabling gradual decarbonisation."
        ]
      },
      "grid": {
        "titleFr": "Intégration réseau",
        "titleEn": "Grid integration",
        "bulletsFr": [
          "Atout réseau majeur : démarrage rapide (quelques minutes), montée en charge rapide, très pilotable. Idéal pour le backup des renouvelables.",
          "Rôle de \"filet de sécurité\" des systèmes électriques à forte part renouvelable : les centrales à gaz tournent peu mais sont indispensables lors des pics de consommation ou des dunkelflaute.",
          "Couplage avec batteries : les centrales gaz + batteries deviennent des unités de flexibilité à très haute valeur.",
          "Impact sur le marché : le prix marginal du gaz fixe souvent le prix spot de l'électricité en Europe (merit order). Une hausse du prix du gaz fait monter le prix de l'électricité pour tous, même les sources moins chères.",
          "Transition : dans les scénarios NZE de l'IEA, le gaz non-abattu doit disparaître de la production électrique des pays développés avant 2035."
        ],
        "bulletsEn": [
          "Major grid asset: fast start (minutes), fast ramp-up, highly dispatchable. Ideal for renewable backup.",
          "Role as \"safety net\" in high-renewable electricity systems: gas plants run little but are indispensable during demand peaks or dunkelflaute.",
          "Gas + battery coupling: gas plants paired with batteries become very high-value flexibility assets.",
          "Market impact: marginal gas price often sets the spot electricity price in Europe (merit order). A gas price spike raises electricity prices for all sources, even cheaper ones.",
          "Transition: in IEA NZE scenarios, unabated gas must exit electricity production in developed countries before 2035."
        ]
      }
    }
  },
  {
    "id": "charbon",
    "intermittence": "low",
    "sources": [
      {
        "labelFr": "IPCC AR6 — Émissions CO₂ cycle de vie",
        "labelEn": "IPCC AR6 — Lifecycle CO₂ emissions",
        "url": "https://www.ipcc.ch/report/ar6/wg3/"
      },
      {
        "labelFr": "OMS — Pollution de l'air et santé",
        "labelEn": "WHO — Ambient air pollution and health",
        "url": "https://www.who.int/news-room/fact-sheets/detail/ambient-(outdoor)-air-quality-and-health"
      },
      {
        "labelFr": "IEA — World Energy Outlook 2024",
        "labelEn": "IEA — World Energy Outlook 2024",
        "url": "https://www.iea.org/reports/world-energy-outlook-2024"
      }
    ],
    "sections": {
      "env": {
        "titleFr": "Impacts environnementaux",
        "titleEn": "Environmental impacts",
        "bulletsFr": [
          "La source la plus émettrice : ~820 gCO₂eq/kWh (cycle de vie, IPCC AR6). Plus de 65× supérieur au nucléaire.",
          "Pollution locale grave : émissions de SO₂, NOx, mercure, particules fines (PM2.5). La pollution de l'air liée au charbon tue ~800 000 personnes/an dans le monde (OMS).",
          "Cendres volantes : résidu de combustion contenant des métaux lourds (arsenic, plomb, cadmium). Stockage en lagunes, risque de contamination des nappes.",
          "Extraction : mines à ciel ouvert (déforestation, érosion), mines souterraines (affaissements, accidents, maladies des mineurs). Méthane des mines (grisou) contribue aux émissions.",
          "Destruction des écosystèmes liée à l'extraction de charbon dans les pays producteurs (Australie, Indonésie, États-Unis Appalachians)."
        ],
        "bulletsEn": [
          "The most emitting source: ~820 gCO₂eq/kWh (lifecycle, IPCC AR6). More than 65× higher than nuclear.",
          "Severe local pollution: SO₂, NOx, mercury, fine particulate (PM2.5) emissions. Air pollution from coal kills ~800,000 people/year globally (WHO).",
          "Fly ash: combustion residue containing heavy metals (arsenic, lead, cadmium). Stored in lagoons, groundwater contamination risk.",
          "Extraction: open-cast mining (deforestation, erosion), underground mines (subsidence, accidents, miner diseases). Mine methane (firedamp) contributes to emissions.",
          "Ecosystem destruction from coal extraction in producing countries (Australia, Indonesia, US Appalachia)."
        ]
      },
      "costs": {
        "titleFr": "Coûts détaillés",
        "titleEn": "Detailed costs",
        "bulletsFr": [
          "LCOE 2023 : ~70–100 €/MWh en Europe (incluant le coût du carbone EU ETS, ~60–80 €/tCO₂ en 2023).",
          "Sans prix du carbone : ~40–60 €/MWh — c'est pourquoi le charbon reste compétitif dans les pays sans taxe carbone.",
          "Le prix du carbone EU ETS est le principal mécanisme qui rend le charbon non rentable en Europe.",
          "Capex faible (centrales existantes amorties), mais Opex élevé (charbon + CO₂).",
          "En Asie (Chine, Inde, Indonésie) : LCOE charbon ~40–50 €/MWh sans prix carbone — compétitif face aux renouvelables dans des contextes sans mécanisme de prix carbone.",
          "Coût social masqué : les externalities de santé publique (pollution de l'air) représentent ~300–500 €/MWh selon les études si on les internalise."
        ],
        "bulletsEn": [
          "LCOE 2023: ~70–100 €/MWh in Europe (including EU ETS carbon price, ~€60–80/tCO₂ in 2023).",
          "Without carbon price: ~40–60 €/MWh — why coal remains competitive in countries without carbon pricing.",
          "EU ETS carbon price is the main mechanism making coal uneconomical in Europe.",
          "Low capex (existing plants fully depreciated), but high opex (coal + CO₂).",
          "In Asia (China, India, Indonesia): coal LCOE ~40–50 €/MWh without carbon price — competitive vs renewables without a carbon pricing mechanism.",
          "Hidden social cost: public health externalities (air pollution) represent ~€300–500/MWh in some studies if internalised."
        ]
      },
      "infra": {
        "titleFr": "Infrastructure & compétences",
        "titleEn": "Infrastructure & skills",
        "bulletsFr": [
          "Infrastructure mature et en déclin en Europe : phase-out programmé (Allemagne 2038, France 2022 déjà accompli, Royaume-Uni 2024).",
          "Reconversion des sites : anciennes centrales à charbon reconverties en centrales à gaz, biomasse, ou en parcs solaires sur le foncier.",
          "Reconversion des mineurs : enjeu social majeur. Programmes de transition juste nécessaires (Allemagne : 40 Mrd€ pour la Rhénanie et la Lusace, bassin minier polonais).",
          "En Asie : construction de nouvelles centrales charbon se poursuit, notamment en Chine et en Inde. Financement refusé par de nombreuses banques occidentales post-Accord de Paris.",
          "Capture et stockage du carbone (CCS) sur centrales charbon : technologie existante mais coûteuse (~50–80 €/tCO₂ capturé). Peu de projets à grande échelle opérationnels."
        ],
        "bulletsEn": [
          "Mature and declining infrastructure in Europe: phase-out scheduled (Germany 2038, France achieved in 2022, UK 2024).",
          "Site repurposing: old coal plants converted to gas, biomass, or solar parks on the land.",
          "Miner retraining: major social challenge. Just transition programmes needed (Germany: €40bn for Rhineland and Lusatia, Polish mining basin).",
          "In Asia: new coal plant construction continues, notably in China and India. Financing refused by many Western banks post-Paris Agreement.",
          "Carbon capture and storage (CCS) on coal plants: existing technology but costly (~€50–80/tCO₂ captured). Few large-scale projects operational."
        ]
      },
      "grid": {
        "titleFr": "Intégration réseau",
        "titleEn": "Grid integration",
        "bulletsFr": [
          "Techniquement pilotable, mais moins flexible que le gaz (démarrage plus lent, 4–8h). Adapté à la production en base, pas aux variations rapides.",
          "En Europe, les centrales à charbon restantes servent de backup exceptionnel (ex: France en 2022, hiver 2022–2023 en Allemagne pendant la crise gazière).",
          "Le rôle du charbon dans l'équilibre réseau est amenés à disparaître à mesure que les batteries, l'hydrogène et les interconnexions prennent le relais.",
          "Dans les pays en développement, le charbon reste souvent la seule source pilotable disponible localement — son remplacement nécessite un développement simultané de l'infrastructure réseau et des alternatives."
        ],
        "bulletsEn": [
          "Technically dispatchable, but less flexible than gas (slower startup, 4–8h). Suited to baseload, not rapid fluctuations.",
          "In Europe, remaining coal plants serve as exceptional backup (e.g. France in 2022, winter 2022–2023 in Germany during the gas crisis).",
          "Coal's role in grid balancing will disappear as batteries, hydrogen, and interconnections take over.",
          "In developing countries, coal is often the only locally available dispatchable source — replacing it requires simultaneous development of grid infrastructure and alternatives."
        ]
      }
    }
  },
  {
    "id": "bioenergies",
    "intermittence": "low",
    "sources": [
      {
        "labelFr": "IPCC AR6 — Émissions CO₂ cycle de vie",
        "labelEn": "IPCC AR6 — Lifecycle CO₂ emissions",
        "url": "https://www.ipcc.ch/report/ar6/wg3/"
      },
      {
        "labelFr": "IRENA — Bioenergy for the Energy Transition",
        "labelEn": "IRENA — Bioenergy for the Energy Transition",
        "url": "https://www.irena.org/publications/2022/Sep/Bioenergy-for-the-Energy-Transition"
      },
      {
        "labelFr": "RED III — Directive énergies renouvelables UE",
        "labelEn": "RED III — EU Renewable Energy Directive",
        "url": "https://energy.ec.europa.eu/topics/renewable-energy/renewable-energy-directive-targets-and-rules/renewable-energy-directive_en"
      }
    ],
    "sections": {
      "env": {
        "titleFr": "Impacts environnementaux",
        "titleEn": "Environmental impacts",
        "bulletsFr": [
          "Émissions CO₂ cycle de vie : ~230 gCO₂eq/kWh (IPCC AR6). Très variable selon la filière : déchets agricoles ~50 gCO₂eq/kWh, bois énergie importé ~700+ gCO₂eq/kWh.",
          "Controverse sur la neutralité carbone : la combustion de biomasse émet du CO₂, qui est théoriquement réabsorbé par la forêt replantée — mais sur quelle échelle de temps ? La dette carbone peut durer 40–100 ans avant d'être remboursée.",
          "Déforestation indirecte : si la demande en biomasse augmente trop, pression sur les forêts. Certifications de durabilité (FSC, PEFC) tentent de l'encadrer.",
          "BECCS (Bioenergy with Carbon Capture and Storage) : technologie prometteuse pour le CO₂ négatif mais énergivore, coûteuse, et à grande échelle nécessite d'immenses surfaces agricoles.",
          "Biogaz agricole : valorise les déchets (lisier, effluents), réduit les émissions de méthane agricoles. Impact positif si bien géré.",
          "Compétition alimentaire : les cultures dédiées à l'énergie (maïs éthanol, colza biodiesel) peuvent entrer en concurrence avec l'alimentation. Débat vif sur l'agrocarburant."
        ],
        "bulletsEn": [
          "Lifecycle CO₂: ~230 gCO₂eq/kWh (IPCC AR6). Highly variable by supply chain: agricultural waste ~50 gCO₂eq/kWh, imported wood energy ~700+ gCO₂eq/kWh.",
          "Carbon neutrality controversy: burning biomass emits CO₂, theoretically reabsorbed by replanted forest — but over what timeframe? The carbon debt can take 40–100 years to repay.",
          "Indirect deforestation: if biomass demand grows too fast, pressure on forests. Sustainability certifications (FSC, PEFC) attempt to govern this.",
          "BECCS (Bioenergy with Carbon Capture and Storage): promising negative-emissions technology but energy-intensive, costly, and at scale requires vast agricultural land.",
          "Agricultural biogas: valorises waste (slurry, effluents), reduces agricultural methane emissions. Positive impact if well managed.",
          "Food competition: energy-dedicated crops (corn ethanol, rapeseed biodiesel) can compete with food production. Active debate on agrofuels."
        ]
      },
      "costs": {
        "titleFr": "Coûts détaillés",
        "titleEn": "Detailed costs",
        "bulletsFr": [
          "LCOE 2023 : ~80–150 €/MWh selon la filière et la disponibilité de la biomasse locale.",
          "Coût du combustible élevé et variable : bois granulé, biogaz, déchets. Contrairement au solaire ou à l'éolien, la biomasse a un coût variable qui peut fluctuer avec le marché.",
          "Capex : 2 000–4 000 €/kW selon la technologie (cogénération, gazéification, méthanisation).",
          "Opex plus élevé que les autres renouvelables : alimentation en combustible, maintenance des systèmes de traitement.",
          "Cogénération (chaleur + électricité) : améliore significativement le rendement global (~80–90% vs ~35–40% en production électrique seule) et l'économie du projet.",
          "Subventions importantes dans de nombreux pays (tarifs d'achat garantis). Sans soutien public, difficilement compétitif."
        ],
        "bulletsEn": [
          "LCOE 2023: ~80–150 €/MWh depending on supply chain and local biomass availability.",
          "High and variable fuel cost: wood pellets, biogas, waste. Unlike solar or wind, biomass has a variable cost that can fluctuate with the market.",
          "Capex: 2,000–4,000 €/kW depending on technology (cogeneration, gasification, methanisation).",
          "Higher opex than other renewables: fuel supply, treatment system maintenance.",
          "Cogeneration (heat + electricity): significantly improves overall efficiency (~80–90% vs ~35–40% for electricity only) and project economics.",
          "Heavy subsidies in many countries (guaranteed feed-in tariffs). Difficult to compete without public support."
        ]
      },
      "infra": {
        "titleFr": "Infrastructure & compétences",
        "titleEn": "Infrastructure & skills",
        "bulletsFr": [
          "Filière forestière et agricole : logistique de collecte, traitement, stockage de la biomasse. Compétences agro-industrielles et logistiques.",
          "Méthanisation : digesteurs anaérobies, gestion du digestat (engrais naturel). Technologie accessible pour les agriculteurs (méthaniseurs à la ferme).",
          "Grandes centrales biomasse : Drax au Royaume-Uni (4 GW de bois importé), Gardanne en France. Controversées sur leur durabilité.",
          "Réseau de biogaz : en France, objectif de 10% de gaz renouvelable dans le réseau d'ici 2030 (GrDF).",
          "Compétences : agronomes, techniciens de traitement des eaux et déchets, ingénieurs en procédés thermiques."
        ],
        "bulletsEn": [
          "Forestry and agricultural sector: biomass collection logistics, processing, storage. Agro-industrial and logistics skills.",
          "Methanisation: anaerobic digesters, digestate management (natural fertiliser). Accessible technology for farmers (on-farm digesters).",
          "Large biomass plants: Drax in the UK (4 GW imported wood), Gardanne in France. Controversial on sustainability grounds.",
          "Biogas network: in France, target of 10% renewable gas in the network by 2030 (GrDF).",
          "Skills: agronomists, water and waste treatment technicians, thermal process engineers."
        ]
      },
      "grid": {
        "titleFr": "Intégration réseau",
        "titleEn": "Grid integration",
        "bulletsFr": [
          "Source pilotable : production ajustable à la demande comme une centrale thermique. Atout rare parmi les renouvelables.",
          "Facteur de charge élevé (~60–80%) : produit de façon quasi-continue, contrairement au solaire et à l'éolien.",
          "Idéal en cogénération pour les réseaux de chaleur urbains (district heating) : valorise la chaleur fatale.",
          "Contrainte logistique : la disponibilité de la biomasse locale limite la puissance installable. Difficile à déployer à très grande échelle sans impacts sur les usages concurrents du bois.",
          "Complémentaire à l'éolien et au solaire : peut compenser leurs creux de production.",
          "Rôle croissant dans le biogaz injecté au réseau (power-to-gas) et dans le bioGNV pour les transports."
        ],
        "bulletsEn": [
          "Dispatchable source: output adjustable on demand like a thermal plant. A rare asset among renewables.",
          "High capacity factor (~60–80%): produces near-continuously, unlike solar and wind.",
          "Ideal in cogeneration for urban district heating networks: valorises waste heat.",
          "Logistical constraint: local biomass availability limits installable capacity. Difficult to scale massively without impact on competing wood uses.",
          "Complementary to wind and solar: can compensate for their output troughs.",
          "Growing role in biogas injected to the grid (power-to-gas) and biomethane for transport (bioGNV)."
        ]
      }
    }
  }
]
