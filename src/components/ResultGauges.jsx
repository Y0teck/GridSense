import { useState } from 'react'
import IndicatorModal from './IndicatorModal'

// Source donnees : resultats calcules depuis src/utils/calculations.js.

const INDICATOR_CONTENT = {
  co2: {
    title: 'Émissions CO₂',
    unit: 'gCO₂eq/kWh',
    definition:
      "Quantité de CO₂ équivalent émise pour produire 1 kWh, en tenant compte du cycle de vie complet de chaque source : fabrication, construction, exploitation et démantèlement des installations.",
    calculation:
      'CO₂ = Σ (part_source × coef_co2_source)\nCoefficients IPCC AR6 :\n- Nucléaire : 12 gCO₂eq/kWh\n- Éolien : 11 gCO₂eq/kWh\n- Solaire : 45 gCO₂eq/kWh\n- Hydraulique : 24 gCO₂eq/kWh\n- Gaz : 490 gCO₂eq/kWh\n- Thermique fossile : 820 gCO₂eq/kWh\n- Bioénergies : 230 gCO₂eq/kWh',
    references: [
      { label: 'France (RTE 2025)', value: '~34 gCO₂eq/kWh' },
      { label: 'Union européenne (2023)', value: '~242 gCO₂eq/kWh' },
      { label: 'Allemagne (2023)', value: '~380 gCO₂eq/kWh' },
      { label: 'Moyenne mondiale', value: '~460 gCO₂eq/kWh' },
      { label: 'Objectif Accord de Paris', value: '< 50 gCO₂eq/kWh' },
    ],
    example:
      "Un mix à 100 % gaz émettrait ~490 gCO₂eq/kWh — soit 14× le mix français actuel. À l'inverse, 100 % nucléaire ne dépasserait pas 12 gCO₂eq/kWh.",
    caveat:
      "Les coefficients IPCC sont des médianes. Le nucléaire peut varier de 4 à 110 gCO₂eq/kWh selon la durée de vie, le site et la méthode d'allocation de l'uranium.",
    sources: [
      { name: 'IPCC AR6 WGIII — Annexe III (2022)', url: 'https://www.ipcc.ch/report/ar6/wg3/' },
      {
        name: 'RTE — Bilan électrique 2025',
        url: 'https://odre.opendatasoft.com/explore/dataset/prod-national-annuel-filiere/',
      },
      {
        name: 'Ember — European Electricity Review 2024',
        url: 'https://ember-energy.org/latest-insights/european-electricity-review-2024/eu-electricity-trends/',
      },
    ],
  },
  cost: {
    title: 'Coût de production',
    unit: '€/MWh',
    definition:
      "Le LCOE (Levelized Cost of Energy) représente le coût moyen de production d'un MWh sur toute la durée de vie d'une installation, incluant construction, exploitation et financement. C'est l'indicateur standard de comparaison entre filières.",
    calculation:
      'Coût = Σ (part_source × LCOE_source)\nValeurs IRENA 2023 :\n- Éolien : 50 €/MWh\n- Solaire : 45 €/MWh\n- Hydraulique : 40 €/MWh\n- Nucléaire : 70 €/MWh\n- Gaz : 100 €/MWh\n- Thermique fossile : 80 €/MWh\n- Bioénergies : 90 €/MWh',
    references: [
      { label: 'France (mix 2025)', value: '~65 €/MWh' },
      { label: 'Allemagne (mix 2023)', value: '~85 €/MWh' },
      { label: 'Solaire seul', value: '~45 €/MWh' },
      { label: 'Gaz seul', value: '~100 €/MWh' },
    ],
    example:
      "Le solaire et l'éolien ont aujourd'hui un LCOE inférieur au gaz sur le seul coût de production — mais leur intermittence entraîne des coûts réseau non inclus ici.",
    caveat:
      'Le LCOE ne tient pas compte des subventions, des coûts de stockage, ni des coûts de démantèlement (nucléaire). Comparer des LCOE bruts entre pays peut être trompeur.',
    sources: [
      {
        name: 'IRENA — Renewable Power Generation Costs 2023',
        url: 'https://www.irena.org/Publications/2024/Sep/Renewable-Power-Generation-Costs-in-2023',
      },
    ],
  },
  stability: {
    title: 'Stabilité réseau',
    unit: '/100',
    definition:
      "Score représentant la part des sources pilotables (dispatchables) dans le mix : sources dont on peut ajuster la production à la demande en temps réel. Un réseau avec beaucoup de sources intermittentes (éolien, solaire) est plus difficile à équilibrer et nécessite des capacités de stockage ou de backup.",
    calculation:
      'Stabilité = Σ parts des sources pilotables\nSources pilotables : nucléaire, hydraulique, gaz, thermique fossile, bioénergies\nSources intermittentes (non comptées) : éolien, solaire',
    references: [
      { label: 'France (mix 2025)', value: '~85/100' },
      { label: 'Norvège (quasi 100% hydro)', value: '~99/100' },
      { label: 'Union européenne (2023)', value: '~65/100' },
      { label: 'Allemagne (mix 2023)', value: '~60/100' },
      { label: 'Seuil recommandé', value: '≥ 60/100' },
    ],
    example:
      "L'Allemagne (~60 %) fait face au 'duck curve' : surplus solaire à midi, pic de demande le soir sans soleil. La France (~85 %) est moins exposée à ce phénomène.",
    caveat:
      "Ce score simplifie la réalité : l'hydraulique fil-de-l'eau est moins flexible qu'un barrage-lac. Les interconnexions européennes peuvent aussi compenser l'intermittence locale.",
    sources: [
      { name: 'Méthodologie interne ÉnergIA', url: null },
      {
        name: "RTE — Rapport sur l'adéquation du système électrique",
        url: 'https://www.rte-france.com/analyses-tendances-et-prospectives/bilan-previsionnel-2050-futurs-energetiques',
      },
    ],
  },
  renewables: {
    title: 'Énergies renouvelables',
    unit: '%',
    definition:
      "Part des énergies renouvelables dans le mix électrique : éolien (terrestre et offshore), solaire photovoltaïque, hydraulique (fil de l'eau, lac, STEP) et bioénergies (biomasse, biogaz, déchets). Le nucléaire n'est pas comptabilisé comme renouvelable.",
    calculation: 'Renouvelables = éolien + solaire + hydraulique + bioénergies',
    references: [
      { label: 'France (RTE 2025)', value: '~28%' },
      { label: 'Union européenne (2023)', value: '45,3%' },
      { label: 'Allemagne (2023)', value: '~59%' },
      { label: 'Norvège (2023)', value: '~98%' },
      { label: 'Objectif UE 2030 (RED III)', value: '42,5%' },
    ],
    example:
      "La Norvège (~98 %) illustre qu'un mix quasi 100 % renouvelable est possible — grâce à ses fjords et barrages. Cette géographie est rare et non reproductible partout.",
    caveat:
      'Toutes les renouvelables ne sont pas équivalentes : éolien et solaire sont intermittents, hydraulique et biomasse sont pilotables. Le pourcentage brut ne reflète pas cette différence.',
    sources: [
      {
        name: 'Directive européenne RED III (2023)',
        url: 'https://energy.ec.europa.eu/topics/renewable-energy/renewable-energy-directive-targets-and-rules/renewable-energy-directive_en',
      },
      {
        name: 'IEA — World Energy Outlook 2025',
        url: 'https://www.iea.org/reports/world-energy-outlook-2025',
      },
      {
        name: "Eurostat — Part des renouvelables dans l'électricité 2023",
        url: 'https://ec.europa.eu/eurostat/en/web/products-eurostat-news/w/ddn-20250221-3',
      },
    ],
  },
  lowCarbon: {
    title: 'Énergie bas-carbone',
    unit: '%',
    definition:
      "Part des sources d'électricité émettant peu de CO₂ sur leur cycle de vie : le nucléaire (12 gCO₂eq/kWh) et toutes les énergies renouvelables. Cet indicateur reflète la capacité d'un mix à décarboner le secteur électrique, indépendamment du caractère renouvelable ou non des sources.",
    calculation: 'Bas-carbone = nucléaire + éolien + solaire + hydraulique + bioénergies',
    references: [
      { label: 'France (RTE 2025)', value: '~97%' },
      { label: 'Suède (2023)', value: '~99%' },
      { label: 'Union européenne (2023)', value: '~70%' },
      { label: 'Allemagne (2023)', value: '~60%' },
      { label: 'Monde (2023)', value: '~38%' },
    ],
    example:
      'France (~97 %) et Suède (~99 %) atteignent le même résultat par deux chemins différents : nucléaire dominant pour la France, mix hydraulique + nucléaire pour la Suède.',
    caveat:
      "Le nucléaire est bas-carbone mais non renouvelable — c'est pourquoi les indicateurs 'Renouvelables' et 'Bas-carbone' peuvent diverger fortement pour un même mix.",
    sources: [
      {
        name: 'IEA — World Energy Outlook 2025',
        url: 'https://www.iea.org/reports/world-energy-outlook-2025',
      },
      { name: 'IPCC AR6 WGIII — Annexe III (2022)', url: 'https://www.ipcc.ch/report/ar6/wg3/' },
    ],
  },
}

const PARIS_ACCORD_CONTENT = {
  title: "Accord de Paris — Objectif 1,5°C",
  unit: '< 50 gCO₂eq/kWh',
  definition:
    "L'Accord de Paris (2015) vise à limiter le réchauffement climatique à 1,5°C au-dessus des niveaux préindustriels. Pour atteindre cet objectif, le secteur électrique mondial doit décarboner en priorité : il doit atteindre une intensité carbone inférieure à 50 gCO₂eq/kWh d'ici 2030–2035, contre ~460 gCO₂eq/kWh en moyenne mondiale aujourd'hui.",
  calculation:
    "Seuil de référence IPCC AR6 (2022) :\n- Trajectoire 1,5°C : < 50 gCO₂eq/kWh pour l'électricité d'ici 2035\n- Trajectoire 2°C : < 100 gCO₂eq/kWh\n\nL'indicateur ÉnergIA compare les émissions de votre mix simulé à ce seuil de 50 gCO₂eq/kWh.",
  references: [
    { label: 'France (RTE 2025)', value: '~34 gCO₂eq/kWh ✓' },
    { label: 'Union européenne (2023)', value: '~242 gCO₂eq/kWh' },
    { label: 'Allemagne (2023)', value: '~380 gCO₂eq/kWh' },
    { label: 'Moyenne mondiale (2023)', value: '~460 gCO₂eq/kWh' },
    { label: 'Seuil Accord de Paris', value: '< 50 gCO₂eq/kWh' },
  ],
  example:
    "La France est l'un des rares grands pays à déjà respecter ce seuil grâce à son parc nucléaire. À l'inverse, un mix à 50 % gaz atteindrait ~250 gCO₂eq/kWh — 5× au-dessus de l'objectif.",
  caveat:
    "Ce seuil s'applique à la production électrique. Il ne suffit pas : l'objectif 1,5°C implique aussi de décarboner les transports, l'industrie et le chauffage, et de réduire la consommation totale d'énergie.",
  sources: [
    {
      name: 'IPCC AR6 — Résumé pour décideurs, trajectoire 1,5°C (2022)',
      url: 'https://www.ipcc.ch/report/ar6/wg3/chapter/summary-for-policymakers/',
    },
    {
      name: 'Accord de Paris — Nations Unies (2015)',
      url: 'https://unfccc.int/process-and-meetings/the-paris-agreement',
    },
    {
      name: 'IEA — Net Zero by 2050',
      url: 'https://www.iea.org/reports/net-zero-by-2050',
    },
  ],
}

function getCO2Color(value) {
  if (value <= 100) return 'text-[#10B981]'
  if (value <= 300) return 'text-[#F59E0B]'
  return 'text-[#EF4444]'
}

function getCostColor(value) {
  if (value <= 60) return 'text-[#10B981]'
  if (value <= 90) return 'text-[#F59E0B]'
  return 'text-[#EF4444]'
}

function getStabilityColor(value) {
  if (value >= 60) return 'text-[#10B981]'
  if (value >= 30) return 'text-[#F59E0B]'
  return 'text-[#EF4444]'
}

function getRenewablesColor(value) {
  if (value >= 40) return 'text-[#10B981]'
  if (value >= 20) return 'text-[#F59E0B]'
  return 'text-[#EF4444]'
}

function getLowCarbonColor(value) {
  if (value >= 70) return 'text-[#10B981]'
  if (value >= 40) return 'text-[#F59E0B]'
  return 'text-[#EF4444]'
}

function GaugeCard({ label, value, unit, colorClass, sublabel, indicator, theme, onInfoClick, exportMode = false }) {
  const isLight = theme === 'light'

  return (
    <article
      className={`group relative rounded-xl p-5 transition-colors ${
        isLight ? 'border border-[#E2E8F0] bg-white' : 'bg-[#111827]'
      }`}
    >
      {!exportMode ? (
        <button
          type="button"
          onClick={() => onInfoClick(indicator)}
          aria-label={`Afficher les détails : ${label}`}
          className={`absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full border text-xs font-bold opacity-0 transition-all group-hover:opacity-100 ${
            isLight
              ? 'border-[#CBD5E1] text-[#64748B] hover:border-[#22D3EE] hover:text-[#22D3EE]'
              : 'border-[#374151] text-[#6B7280] hover:border-[#22D3EE] hover:text-[#22D3EE]'
          }`}
        >
          i
        </button>
      ) : null}

      <p
        className={`pr-8 text-xs font-semibold uppercase tracking-normal ${
          isLight ? 'text-[#64748B]' : 'text-[#9CA3AF]'
        }`}
      >
        {label}
      </p>

      <div className="mt-4 flex items-end gap-2">
        <span className={`font-mono text-4xl font-bold leading-none ${colorClass}`}>
          {value}
        </span>
        <span className={`pb-1 text-sm ${isLight ? 'text-[#475569]' : 'text-[#9CA3AF]'}`}>
          {unit}
        </span>
      </div>

      <p className={`mt-3 text-xs leading-relaxed ${isLight ? 'text-[#64748B]' : 'text-[#9CA3AF]'}`}>
        {sublabel}
      </p>
    </article>
  )
}

export function ParisAccordBanner({ co2, theme, exportMode = false }) {
  const [modalOpen, setModalOpen] = useState(false)
  const isLight = theme === 'light'
  const isSuccess = co2 <= 50
  const delta = co2 - 50
  const borderColor = isSuccess ? 'border-[#10B981]' : co2 <= 200 ? 'border-[#F59E0B]' : 'border-[#EF4444]'
  const borderHex = isSuccess ? '#10B981' : co2 <= 200 ? '#F59E0B' : '#EF4444'
  const accentColor = isSuccess ? 'text-[#10B981]' : co2 <= 200 ? 'text-[#F59E0B]' : 'text-[#EF4444]'
  const mutedText = isLight ? 'text-[#475569]' : 'text-[#D1D5DB]'

  return (
    <>
      <aside
        className={`group relative mt-4 flex items-center justify-between gap-4 rounded-xl border p-4 pr-12 transition-colors ${borderColor} ${
          isSuccess
            ? isLight
              ? 'bg-[#D1FAE5]'
              : 'bg-[#065F46]'
            : isLight
              ? 'bg-[#FEF3C7]'
              : 'bg-[#7C2D12]'
        }`}
        style={
          exportMode
            ? {
                backgroundColor: isSuccess ? '#065F46' : '#7C2D12',
                border: `1px solid ${borderHex}`,
              }
            : undefined
        }
      >
        {!exportMode ? (
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            aria-label="Afficher les détails : Accord de Paris"
            className={`absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full border text-xs font-bold opacity-0 transition-all group-hover:opacity-100 ${
              isLight
                ? 'border-[#CBD5E1] text-[#64748B] hover:border-[#22D3EE] hover:text-[#22D3EE]'
                : 'border-[#374151] text-[#D1D5DB] hover:border-[#22D3EE] hover:text-[#22D3EE]'
            }`}
          >
            i
          </button>
        ) : null}

        <div className="flex items-center gap-4">
          <span
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border font-mono text-lg font-bold ${borderColor} ${accentColor}`}
            aria-hidden="true"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: '2rem', minHeight: '2rem' }}
          >
            {isSuccess ? (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 10L8.5 14.5L16 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 2L18.5 17H1.5L10 2Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
                <path d="M10 8V11.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                <circle cx="10" cy="14.5" r="0.8" fill="currentColor"/>
              </svg>
            )}
          </span>

          <div>
            <p className="font-semibold">
              {isSuccess
                ? 'Objectif Accord de Paris atteint'
                : `${delta} gCO₂eq/kWh au-dessus de l'objectif Accord de Paris`}
            </p>
            <p className={`mt-1 text-sm leading-relaxed ${mutedText}`}>
              {isSuccess
                ? 'Votre mix est compatible avec une trajectoire 1,5°C — en dessous de 50 gCO₂eq/kWh.'
                : "L'objectif pour le secteur électrique est < 50 gCO₂eq/kWh (IPCC AR6, trajectoire 1,5°C)."}
            </p>
          </div>
        </div>

        {!isSuccess ? (
          <span
            className={`shrink-0 ${accentColor}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              whiteSpace: 'nowrap',
              padding: '2px 10px',
              borderRadius: '9999px',
              border: '1px solid currentColor',
              fontSize: '0.75rem',
              fontWeight: '700',
              fontFamily: 'monospace',
              lineHeight: '1.5',
            }}
          >
            ×{(co2 / 50).toFixed(1)}
          </span>
        ) : null}
      </aside>

      {modalOpen && !exportMode && (
        <IndicatorModal
          indicator={PARIS_ACCORD_CONTENT}
          theme={theme}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  )
}

export default function ResultGauges({ co2, cost, stability, renewables, lowCarbon, theme, exportMode = false, hideParisBanner = false }) {
  const [openIndicator, setOpenIndicator] = useState(null)

  return (
    <>
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <GaugeCard
          label="Émissions CO₂"
          value={co2}
          unit="gCO₂eq/kWh"
          colorClass={getCO2Color(co2)}
          sublabel="Moyenne pondérée cycle de vie (IPCC AR6)"
          indicator={INDICATOR_CONTENT.co2}
          theme={theme}
          onInfoClick={setOpenIndicator}
          exportMode={exportMode}
        />
        <GaugeCard
          label="Coût de production"
          value={cost}
          unit="€/MWh"
          colorClass={getCostColor(cost)}
          sublabel="LCOE moyen pondéré (IRENA 2023, indicatif)"
          indicator={INDICATOR_CONTENT.cost}
          theme={theme}
          onInfoClick={setOpenIndicator}
          exportMode={exportMode}
        />
        <GaugeCard
          label="Stabilité réseau"
          value={stability}
          unit="/100"
          colorClass={getStabilityColor(stability)}
          sublabel="Part des sources pilotables (dispatchables)"
          indicator={INDICATOR_CONTENT.stability}
          theme={theme}
          onInfoClick={setOpenIndicator}
          exportMode={exportMode}
        />
        <GaugeCard
          label="Énergies renouvelables"
          value={renewables}
          unit="%"
          colorClass={getRenewablesColor(renewables)}
          sublabel="Éolien + Solaire + Hydraulique + Bioénergies"
          indicator={INDICATOR_CONTENT.renewables}
          theme={theme}
          onInfoClick={setOpenIndicator}
          exportMode={exportMode}
        />
        <GaugeCard
          label="Énergie bas-carbone"
          value={lowCarbon}
          unit="%"
          colorClass={getLowCarbonColor(lowCarbon)}
          sublabel="Nucléaire + Renouvelables"
          indicator={INDICATOR_CONTENT.lowCarbon}
          theme={theme}
          onInfoClick={setOpenIndicator}
          exportMode={exportMode}
        />
      </section>

      {!exportMode && !hideParisBanner ? <ParisAccordBanner co2={co2} theme={theme} /> : null}

      {openIndicator && !exportMode ? (
        <IndicatorModal
          indicator={openIndicator}
          theme={theme}
          onClose={() => setOpenIndicator(null)}
        />
      ) : null}
    </>
  )
}
