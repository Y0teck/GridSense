import { useContext } from 'react'
import { LanguageContext } from '../LanguageContext'
import { useTheme } from '../ThemeContext'
import { useStrings } from '../i18n/useStrings'

const RAW_SOURCES = [
  {
    name: 'IEA World Energy Outlook 2025 — Free Dataset',
    url: 'https://www.iea.org/data-and-statistics/data-product/world-energy-outlook-2025-free-dataset',
  },
  {
    name: 'Ember — Global Electricity Review 2024',
    url: 'https://ember-climate.org/insights/research/global-electricity-review-2024/',
  },
  {
    name: 'IEA — Africa Energy Outlook 2024',
    url: 'https://www.iea.org/reports/africa-energy-outlook-2024',
  },
  {
    name: 'IEA — Kenya Energy Review 2024',
    url: 'https://www.iea.org/reports/kenya-2024',
  },
  {
    name: 'ODRÉ / RTE — Bilan électrique annuel 2025',
    url: 'https://odre.opendatasoft.com/explore/dataset/prod-national-annuel-filiere/',
  },
  {
    name: 'IPCC AR6 — Annexe III (2022)',
    url: 'https://www.ipcc.ch/report/ar6/wg3/',
  },
  {
    name: 'IPCC AR6 — Résumé pour décideurs, trajectoire 1,5°C (2022)',
    url: 'https://www.ipcc.ch/report/ar6/wg3/chapter/summary-for-policymakers/',
  },
  {
    name: 'Accord de Paris — Nations Unies (2015)',
    url: 'https://unfccc.int/process-and-meetings/the-paris-agreement',
  },
  {
    name: 'IEA — Net Zero by 2050 (2021)',
    url: 'https://www.iea.org/reports/net-zero-by-2050',
  },
  {
    name: 'Ember — European Electricity Review 2024',
    url: 'https://ember-energy.org/latest-insights/european-electricity-review-2024/eu-electricity-trends/',
  },
  {
    name: 'Eurostat — Share of renewables in electricity 2023',
    url: 'https://ec.europa.eu/eurostat/en/web/products-eurostat-news/w/ddn-20250221-3',
  },
  {
    name: 'Directive européenne RED III (2023)',
    url: 'https://energy.ec.europa.eu/topics/renewable-energy/renewable-energy-directive-targets-and-rules/renewable-energy-directive_en',
  },
  {
    name: 'IRENA — Renewable Power Generation Costs 2023',
    url: 'https://www.irena.org/Publications/2024/Sep/Renewable-Power-Generation-Costs-in-2023',
  },
  {
    name: {
      fr: 'Méthodologie interne',
      en: 'Internal Methodology',
    },
    url: null,
  },
]

const SOURCES_FR = [
  {
    title: 'Mix électrique — données pays',
    description:
      "Données historiques 2023 de production électrique par source et par pays, converties en pourcentages. Utilisées pour les 10 pays initiaux issus de l'IEA WEO 2025.",
    source: RAW_SOURCES[0],
  },
  {
    title: 'Mix électrique — données pays (monde)',
    description:
      "Données de production électrique 2023 par source et par pays, pour les 40 pays hors France intégrés dans ÉnergIA. Couvre l'Europe, les Amériques, l'Asie, l'Afrique et l'Océanie.",
    source: RAW_SOURCES[1],
  },
  {
    title: 'Afrique — données énergétiques',
    description:
      "Données de production électrique pour les pays africains (Kenya, Nigeria, Éthiopie, Égypte, Afrique du Sud, Maroc). Rapport annuel de l'AIE sur l'énergie en Afrique.",
    source: RAW_SOURCES[2],
  },
  {
    title: 'Kenya — revue énergétique',
    description:
      "Données spécifiques au Kenya pour préciser son mix électrique, notamment la place de la géothermie agrégée dans les bioénergies faute de catégorie dédiée dans ÉnergIA.",
    source: RAW_SOURCES[3],
  },
  {
    title: 'Mix électrique — France',
    description:
      'Données de production nationale annuelle par filière (TWh), converties en pourcentages. Millésime 2025.',
    source: RAW_SOURCES[4],
  },
  {
    title: 'Coefficients CO₂',
    description:
      'Émissions de CO₂ en cycle de vie (gCO₂eq/kWh) par technologie de production électrique. Valeurs médianes utilisées.',
    source: RAW_SOURCES[5],
  },
  {
    title: 'Objectif climatique — Accord de Paris',
    description:
      "Le secteur électrique doit atteindre une intensité carbone inférieure à 50 gCO₂eq/kWh d'ici 2030–2035 pour rester sur une trajectoire compatible avec un réchauffement limité à 1,5°C. Valeur utilisée comme seuil de référence dans l'indicateur Accord de Paris d'ÉnergIA.",
    source: RAW_SOURCES[6],
  },
  {
    title: 'Accord de Paris — texte officiel',
    description:
      "Accord international signé par 196 parties visant à limiter le réchauffement climatique à 1,5–2°C. Fixe le cadre des engagements nationaux de réduction des émissions (NDC) auquel se réfère l'indicateur Accord de Paris d'ÉnergIA.",
    source: RAW_SOURCES[7],
  },
  {
    title: 'Scénario net zéro 2050',
    description:
      "Feuille de route de l'AIE pour atteindre la neutralité carbone mondiale en 2050, compatible avec l'objectif 1,5°C. Décrit les transformations nécessaires du secteur électrique, dont la décarbonation quasi-totale d'ici 2035 pour les économies avancées.",
    source: RAW_SOURCES[8],
  },
  {
    title: 'Valeurs de référence — Union européenne',
    description:
      'Données sur le mix électrique européen 2023 : intensité carbone (~242 gCO₂eq/kWh) et composition par filière. Utilisées comme valeur de référence UE dans les indicateurs CO₂ et bas-carbone.',
    source: RAW_SOURCES[9],
  },
  {
    title: 'Part des renouvelables — Union européenne',
    description:
      "Part des énergies renouvelables dans la production électrique européenne : 45,3 % en 2023. Utilisée comme valeur de référence UE dans l'indicateur Renouvelables.",
    source: RAW_SOURCES[10],
  },
  {
    title: 'Objectif renouvelables 2030',
    description:
      "Directive fixant l'objectif contraignant de 42,5 % d'énergies renouvelables dans la consommation finale d'énergie de l'UE d'ici 2030. Utilisée comme objectif de référence dans l'indicateur Renouvelables.",
    source: RAW_SOURCES[11],
  },
  {
    title: 'Coûts de production (LCOE)',
    description:
      "Coût actualisé de l'énergie (€/MWh) par filière. Valeurs indicatives, moyennes mondiales pondérées.",
    source: RAW_SOURCES[12],
  },
  {
    title: 'Indicateur de stabilité réseau',
    description:
      "Score calculé comme la somme des parts (%) des sources pilotables (dispatchables) : nucléaire, hydraulique, gaz, thermique fossile, bioénergies. Les sources intermittentes (éolien, solaire) n'y contribuent pas.",
    source: RAW_SOURCES[13],
  },
]

const SOURCES_EN = [
  {
    title: 'Electricity Mix — Country Data',
    description:
      'Historical 2023 electricity production data by source and country, converted to percentages. Used for the 10 original countries from the IEA WEO 2025 dataset.',
    source: RAW_SOURCES[0],
  },
  {
    title: 'Electricity mix — country data (world)',
    description:
      'Electricity generation data for 2023 by source and country, for the 40 non-France countries in ÉnergIA. Covers Europe, the Americas, Asia, Africa, and Oceania.',
    source: RAW_SOURCES[1],
  },
  {
    title: 'Africa — energy data',
    description:
      'Electricity generation data for African countries (Kenya, Nigeria, Ethiopia, Egypt, South Africa, Morocco). IEA annual report on energy in Africa.',
    source: RAW_SOURCES[2],
  },
  {
    title: 'Kenya — energy review',
    description:
      'Kenya-specific electricity data used to refine its mix, including geothermal generation aggregated into bioenergy because ÉnergIA has no dedicated geothermal category.',
    source: RAW_SOURCES[3],
  },
  {
    title: 'Electricity Mix — France',
    description:
      'Annual national production data by source (TWh), converted to percentages. 2025 vintage.',
    source: RAW_SOURCES[4],
  },
  {
    title: 'CO₂ Coefficients',
    description:
      'Lifecycle CO₂ emissions (gCO₂eq/kWh) by electricity generation technology. Median values used.',
    source: RAW_SOURCES[5],
  },
  {
    title: 'Climate Target — Paris Agreement',
    description:
      "The electricity sector must reach a carbon intensity below 50 gCO₂eq/kWh by 2030–2035 to stay on a 1.5°C pathway. Value used as reference threshold in ÉnergIA's Paris Agreement indicator.",
    source: RAW_SOURCES[6],
  },
  {
    title: 'Paris Agreement — Official Text',
    description:
      "International agreement signed by 196 parties aiming to limit global warming to 1.5–2°C. Sets the framework for national emission reduction commitments (NDCs) referenced in ÉnergIA's Paris Agreement indicator.",
    source: RAW_SOURCES[7],
  },
  {
    title: 'Net Zero 2050 Scenario',
    description:
      'IEA roadmap to achieve global carbon neutrality by 2050, compatible with the 1.5°C target. Describes the necessary transformations of the electricity sector, including near-total decarbonisation by 2035 for advanced economies.',
    source: RAW_SOURCES[8],
  },
  {
    title: 'Reference Values — European Union',
    description:
      'Data on the European electricity mix 2023: carbon intensity (~242 gCO₂eq/kWh) and source breakdown. Used as EU reference value in the CO₂ and low-carbon indicators.',
    source: RAW_SOURCES[9],
  },
  {
    title: 'Renewable Share — European Union',
    description:
      'Share of renewables in European electricity production: 45.3% in 2023. Used as EU reference value in the Renewables indicator.',
    source: RAW_SOURCES[10],
  },
  {
    title: '2030 Renewables Target',
    description:
      'Directive setting the binding target of 42.5% renewables in EU final energy consumption by 2030. Used as reference target in the Renewables indicator.',
    source: RAW_SOURCES[11],
  },
  {
    title: 'Production Costs (LCOE)',
    description:
      'Levelized cost of energy (€/MWh) by source. Indicative values, weighted global averages.',
    source: RAW_SOURCES[12],
  },
  {
    title: 'Grid Stability Indicator',
    description:
      'Score calculated as the sum of dispatchable source shares (%): nuclear, hydro, gas, fossil thermal, bioenergy. Intermittent sources (wind, solar) do not contribute.',
    source: RAW_SOURCES[13],
  },
]

function getSources(lang) {
  const localizedSources = lang === 'en' ? SOURCES_EN : SOURCES_FR

  return localizedSources.map((source) => {
    const link = source.source
    const name = typeof link.name === 'string' ? link.name : link.name[lang]

    return {
      ...source,
      name,
      url: link.url,
    }
  })
}

export default function SourcesPage() {
  const theme = useTheme()
  const s = useStrings()
  const { lang } = useContext(LanguageContext)
  const isLight = theme === 'light'
  const mutedColor = isLight ? 'text-[#64748B]' : 'text-[#9CA3AF]'
  const separatorColor = isLight ? 'border-[#E2E8F0]' : 'border-[#1F2937]'
  const sources = getSources(lang)

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <h2 className="mb-8 font-mono text-2xl font-bold text-[#22D3EE]">
        {s.sourcesPage.title}
      </h2>

      <div>
        {sources.map((source) => (
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
        {s.sourcesPage.footer}
      </p>
    </div>
  )
}
