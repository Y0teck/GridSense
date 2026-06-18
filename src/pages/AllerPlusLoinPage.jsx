import { useContext } from 'react'
import { LanguageContext } from '../LanguageContext'
import { useTheme } from '../ThemeContext'
import { useStrings } from '../i18n/useStrings'

const SECTION_DEFINITIONS = [
  {
    color: 'text-[#22D3EE]',
    resources: [
      {
        name: 'IPCC AR6 — Résumé pour décideurs (2022)',
        url: 'https://www.ipcc.ch/report/ar6/wg3/',
      },
      {
        name: 'The Shift Project — Jancovici',
        url: 'https://theshiftproject.org/',
      },
      {
        name: 'Conférence Jancovici — Mines ParisTech (YouTube)',
        url: 'https://www.youtube.com/watch?v=Fp6aJZQldFs',
      },
      {
        name: 'Carbone 4',
        url: 'https://www.carbone4.com/',
      },
    ],
  },
  {
    color: 'text-[#38F2B2]',
    resources: [
      {
        name: 'Electricity Maps',
        url: 'https://app.electricitymaps.com/map',
      },
      {
        name: 'RTE — eCO2mix',
        url: 'https://www.rte-france.com/eco2mix',
      },
      {
        name: 'IEA — World Energy Outlook 2025',
        url: 'https://www.iea.org/reports/world-energy-outlook-2025',
      },
      {
        name: 'Ember — European Electricity Review',
        url: 'https://ember-energy.org/latest-insights/european-electricity-review-2024/',
      },
    ],
  },
  {
    color: 'text-[#F59E0B]',
    resources: [
      {
        name: 'Livre : "Le monde sans fin" — Jancovici & Blain',
        url: 'https://www.casterman.com/Bande-dessinee/Catalogue/Albums-Casterman/le-monde-sans-fin',
      },
      {
        name: 'Wikipedia — Mix énergétique',
        url: 'https://fr.wikipedia.org/wiki/Mix_%C3%A9nerg%C3%A9tique',
      },
      {
        name: "Wikipedia — Coût actualisé de l'énergie (LCOE)",
        url: 'https://fr.wikipedia.org/wiki/Co%C3%BBt_actualis%C3%A9_de_l%27%C3%A9nergie',
      },
      {
        name: 'Wikipedia — Facteur de charge',
        url: 'https://fr.wikipedia.org/wiki/Facteur_de_charge',
      },
    ],
  },
]

const DESCRIPTIONS_FR = [
  [
    "Le rapport de référence mondial sur l'atténuation du changement climatique. Contient les coefficients CO₂ utilisés dans ÉnergIA.",
    "Think-tank sur la décarbonation de l'économie. Articles, rapports et conférences accessibles au grand public.",
    'Introduction complète aux enjeux énergie-climat en 2h. Point de départ recommandé.',
    'Cabinet de conseil spécialisé en stratégie bas-carbone. Publications et outils de référence.',
  ],
  [
    "Carte mondiale du mix électrique et de l'intensité carbone en temps réel.",
    "Production électrique française par filière, en temps réel. Source des données France d'ÉnergIA.",
    "Rapport annuel de référence sur les tendances mondiales de l'énergie. Source des données pays d'ÉnergIA.",
    'Analyse annuelle du mix électrique européen par filière.',
  ],
  [
    'BD qui explique les liens entre énergie, économie et climat. Accessible et très complet.',
    "Vue d'ensemble du concept de mix énergétique.",
    "Définition et méthode de calcul du LCOE utilisé dans ÉnergIA.",
    'Explication du facteur de charge par filière (nucléaire ~75%, solaire ~12%…).',
  ],
]

const DESCRIPTIONS_EN = [
  [
    "The world's leading reference report on climate change mitigation. Contains the CO₂ coefficients used in ÉnergIA.",
    'Think-tank on decarbonising the economy. Articles, reports and conferences accessible to the general public.',
    'A complete 2-hour introduction to energy-climate issues. Recommended starting point.',
    'Consulting firm specialising in low-carbon strategy. Reference publications and tools.',
  ],
  [
    'World map of the electricity mix and carbon intensity in real time.',
    "French electricity production by source, in real time. Source of ÉnergIA's France data.",
    "Annual reference report on global energy trends. Source of ÉnergIA's country data.",
    'Annual analysis of the European electricity mix by source.',
  ],
  [
    'A graphic novel explaining the links between energy, economy and climate. Accessible and very comprehensive.',
    'Overview of the energy mix concept.',
    'Definition and calculation method of the LCOE used in ÉnergIA.',
    'Explanation of capacity factor by source (nuclear ~75%, solar ~12%…).',
  ],
]

function getSections(lang, s) {
  const descriptions = lang === 'en' ? DESCRIPTIONS_EN : DESCRIPTIONS_FR
  const titles = [s.goFurtherPage.section1, s.goFurtherPage.section2, s.goFurtherPage.section3]

  return SECTION_DEFINITIONS.map((section, sectionIndex) => ({
    ...section,
    title: titles[sectionIndex],
    resources: section.resources.map((resource, resourceIndex) => ({
      ...resource,
      description: descriptions[sectionIndex][resourceIndex],
    })),
  }))
}

export default function AllerPlusLoinPage() {
  const theme = useTheme()
  const s = useStrings()
  const { lang } = useContext(LanguageContext)
  const isLight = theme === 'light'
  const mutedColor = isLight ? 'text-[#64748B]' : 'text-[#9CA3AF]'
  const separatorColor = isLight ? 'border-[#E2E8F0]' : 'border-[#1F2937]'
  const sections = getSections(lang, s)

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <h2 className="font-mono text-2xl font-bold text-[#22D3EE]">{s.goFurtherPage.title}</h2>

      <p className={`mt-3 text-sm leading-relaxed ${mutedColor}`}>
        {s.goFurtherPage.intro}
      </p>

      <div className="mt-8 space-y-8">
        {sections.map((section, index) => (
          <section key={section.title}>
            <h3 className={`text-sm font-semibold uppercase tracking-wider ${section.color}`}>
              {section.title}
            </h3>

            <div className="mt-4 space-y-5">
              {section.resources.map((resource) => (
                <article key={resource.name}>
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noreferrer"
                    className="font-semibold text-[#22D3EE]"
                  >
                    {resource.name}
                  </a>
                  <p className={`mt-1 text-sm leading-relaxed ${mutedColor}`}>
                    {resource.description}
                  </p>
                </article>
              ))}
            </div>

            {index < sections.length - 1 ? (
              <hr className={`mt-8 border-t ${separatorColor}`} />
            ) : null}
          </section>
        ))}
      </div>
    </div>
  )
}
