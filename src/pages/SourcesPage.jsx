import { useTheme } from '../ThemeContext'

const SOURCES = [
  {
    title: 'Mix électrique — données pays',
    name: 'IEA World Energy Outlook 2025 — Free Dataset',
    url: 'https://www.iea.org/data-and-statistics/data-product/world-energy-outlook-2025-free-dataset',
    description:
      'Données historiques 2023 de production électrique par source et par pays, converties en pourcentages. Utilisées pour les 9 pays hors France.',
  },
  {
    title: 'Mix électrique — France',
    name: 'ODRÉ / RTE — Bilan électrique annuel 2025',
    url: 'https://odre.opendatasoft.com/explore/dataset/prod-national-annuel-filiere/',
    description:
      'Données de production nationale annuelle par filière (TWh), converties en pourcentages. Millésime 2025.',
  },
  {
    title: 'Coefficients CO₂',
    name: 'IPCC AR6 — Annexe III (2022)',
    url: 'https://www.ipcc.ch/report/ar6/wg3/',
    description:
      'Émissions de CO₂ en cycle de vie (gCO₂eq/kWh) par technologie de production électrique. Valeurs médianes utilisées.',
  },
  {
    title: 'Objectif climatique — Accord de Paris',
    name: 'IPCC AR6 — Résumé pour décideurs, trajectoire 1,5°C (2022)',
    url: 'https://www.ipcc.ch/report/ar6/wg3/chapter/summary-for-policymakers/',
    description:
      "Le secteur électrique doit atteindre une intensité carbone inférieure à 50 gCO₂eq/kWh d'ici 2030–2035 pour rester sur une trajectoire compatible avec un réchauffement limité à 1,5°C. Valeur utilisée comme seuil de référence dans l'indicateur Accord de Paris d'ÉnergIA.",
  },
  {
    title: 'Accord de Paris — texte officiel',
    name: 'Accord de Paris — Nations Unies (2015)',
    url: 'https://unfccc.int/process-and-meetings/the-paris-agreement',
    description:
      "Accord international signé par 196 parties visant à limiter le réchauffement climatique à 1,5–2°C. Fixe le cadre des engagements nationaux de réduction des émissions (NDC) auquel se réfère l'indicateur Accord de Paris d'ÉnergIA.",
  },
  {
    title: 'Scénario net zéro 2050',
    name: 'IEA — Net Zero by 2050 (2021)',
    url: 'https://www.iea.org/reports/net-zero-by-2050',
    description:
      "Feuille de route de l'AIE pour atteindre la neutralité carbone mondiale en 2050, compatible avec l'objectif 1,5°C. Décrit les transformations nécessaires du secteur électrique, dont la décarbonation quasi-totale d'ici 2035 pour les économies avancées.",
  },
  {
    title: 'Valeurs de référence — Union européenne',
    name: 'Ember — European Electricity Review 2024',
    url: 'https://ember-energy.org/latest-insights/european-electricity-review-2024/eu-electricity-trends/',
    description:
      'Données sur le mix électrique européen 2023 : intensité carbone (~242 gCO₂eq/kWh) et composition par filière. Utilisées comme valeur de référence UE dans les indicateurs CO₂ et bas-carbone.',
  },
  {
    title: 'Part des renouvelables — Union européenne',
    name: 'Eurostat — Share of renewables in electricity 2023',
    url: 'https://ec.europa.eu/eurostat/en/web/products-eurostat-news/w/ddn-20250221-3',
    description:
      "Part des énergies renouvelables dans la production électrique européenne : 45,3 % en 2023. Utilisée comme valeur de référence UE dans l'indicateur Renouvelables.",
  },
  {
    title: 'Objectif renouvelables 2030',
    name: 'Directive européenne RED III (2023)',
    url: 'https://energy.ec.europa.eu/topics/renewable-energy/renewable-energy-directive-targets-and-rules/renewable-energy-directive_en',
    description:
      "Directive fixant l'objectif contraignant de 42,5 % d'énergies renouvelables dans la consommation finale d'énergie de l'UE d'ici 2030. Utilisée comme objectif de référence dans l'indicateur Renouvelables.",
  },
  {
    title: 'Coûts de production (LCOE)',
    name: 'IRENA — Renewable Power Generation Costs 2023',
    url: 'https://www.irena.org/Publications/2024/Sep/Renewable-Power-Generation-Costs-in-2023',
    description:
      "Coût actualisé de l'énergie (€/MWh) par filière. Valeurs indicatives, moyennes mondiales pondérées.",
  },
  {
    title: 'Indicateur de stabilité réseau',
    name: 'Méthodologie interne',
    url: null,
    description:
      "Score calculé comme la somme des parts (%) des sources pilotables (dispatchables) : nucléaire, hydraulique, gaz, thermique fossile, bioénergies. Les sources intermittentes (éolien, solaire) n'y contribuent pas.",
  },
]

export default function SourcesPage() {
  const theme = useTheme()
  const isLight = theme === 'light'
  const mutedColor = isLight ? 'text-[#64748B]' : 'text-[#9CA3AF]'
  const separatorColor = isLight ? 'border-[#E2E8F0]' : 'border-[#1F2937]'

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <h2 className="mb-8 font-mono text-2xl font-bold text-[#22D3EE]">
        Sources & méthodologie
      </h2>

      <div>
        {SOURCES.map((source) => (
          <section key={source.title} className={`mb-6 border-b pb-6 ${separatorColor}`}>
            <h3 className={`text-sm font-semibold uppercase tracking-wider ${mutedColor}`}>
              {source.title}
            </h3>

            <div className="mt-3">
              {source.url ? (
                <a
                  href={source.url}
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-[#22D3EE]"
                >
                  {source.name}
                </a>
              ) : (
                <p className={isLight ? 'font-semibold text-[#111827]' : 'font-semibold text-[#F9FAFB]'}>
                  {source.name}
                </p>
              )}
            </div>

            <p className={`mt-2 text-sm ${mutedColor}`}>{source.description}</p>
          </section>
        ))}
      </div>

      <p className={`text-xs ${mutedColor}`}>
        Les valeurs affichées dans le simulateur sont des approximations à visée pédagogique.
        Pour des analyses précises, référez-vous directement aux sources ci-dessus.
      </p>
    </div>
  )
}
