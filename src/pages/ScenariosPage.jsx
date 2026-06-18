import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CartesianGrid,
  Label,
  Legend,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { LanguageContext } from '../LanguageContext'
import { useTheme } from '../ThemeContext'
import { ENERGY_SOURCES } from '../data/energyData'
import { CO2_TRAJECTORIES, SCENARIOS } from '../data/scenariosData'
import { useStrings } from '../i18n/useStrings'

const MIX_KEYS = ['nucleaire', 'eolien', 'solaire', 'hydraulique', 'gaz', 'charbon', 'bioenergies']

function ChartTooltip({ active, payload, label, isLight }) {
  if (!active || !payload?.length) return null

  return (
    <div
      className={`rounded-lg border px-3 py-2 text-xs shadow-xl ${
        isLight
          ? 'border-[#CBD5E1] bg-white text-[#111827]'
          : 'border-[#334155] bg-[#0F172A] text-[#F8FAFC]'
      }`}
    >
      <p className="mb-1 font-semibold">{label}</p>
      {payload.map((item) => (
        <p key={item.dataKey} className="font-mono" style={{ color: item.color }}>
          {item.name}: {item.value} gCO₂eq/kWh
        </p>
      ))}
    </div>
  )
}

function ScenarioCard({ scenario, lang, s, isLight, onSimulate }) {
  const description = lang === 'en' ? scenario.descriptionEn : scenario.descriptionFr
  const implications = lang === 'en' ? scenario.implsEn : scenario.implsFr

  return (
    <article
      className={`rounded-xl border p-5 ${
        isLight ? 'border-[#E2E8F0] bg-white' : 'border-[#1F2937] bg-[#111827]'
      }`}
      style={{ borderLeftColor: scenario.color, borderLeftWidth: '4px' }}
    >
      <div className="space-y-3">
        <div className="flex flex-wrap items-start gap-3">
          <span
            className="rounded-full px-3 py-1 text-xs font-bold"
            style={{ backgroundColor: `${scenario.color}22`, color: scenario.color }}
          >
            {scenario.tempTarget[lang]}
          </span>
          <div className="min-w-0 flex-1">
            <h2 className={`text-lg font-bold ${isLight ? 'text-[#111827]' : 'text-white'}`}>
              {scenario.label[lang]}
            </h2>
            <p className={`mt-1 text-sm ${isLight ? 'text-[#64748B]' : 'text-[#9CA3AF]'}`}>
              {scenario.probability[lang]}
            </p>
          </div>
        </div>

        <div>
          <span className="font-mono text-3xl font-bold" style={{ color: scenario.color }}>
            {scenario.co2Target}
          </span>
          <span className={`ml-2 text-sm ${isLight ? 'text-[#64748B]' : 'text-[#9CA3AF]'}`}>
            {s.scenariosPage.co2By2050}
          </span>
        </div>

        <p className={`text-sm leading-6 ${isLight ? 'text-[#475569]' : 'text-[#D1D5DB]'}`}>{description}</p>

        <div className="h-4 overflow-hidden rounded-full border border-black/10 bg-black/10">
          <div className="flex h-full w-full">
            {MIX_KEYS.map((sourceId) => {
              const source = ENERGY_SOURCES[sourceId]
              const value = scenario.mix[sourceId]
              const sourceLabel = s.sources[sourceId] ?? source.label

              return value > 0 ? (
                <div
                  key={sourceId}
                  title={`${sourceLabel}: ${value}%`}
                  style={{ width: `${value}%`, backgroundColor: source.color }}
                />
              ) : null
            })}
          </div>
        </div>

        <div>
          <h3 className={`mb-2 text-xs font-semibold uppercase tracking-wider ${isLight ? 'text-[#64748B]' : 'text-[#9CA3AF]'}`}>
            {s.scenariosPage.implications}
          </h3>
          <ul className={`list-disc space-y-1 pl-5 text-sm ${isLight ? 'text-[#475569]' : 'text-[#D1D5DB]'}`}>
            {implications.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <button
          type="button"
          onClick={() => onSimulate(scenario.mix)}
          className="rounded-lg border border-[#22D3EE] px-4 py-2 text-sm font-semibold text-[#22D3EE] transition-colors hover:bg-[#22D3EE] hover:text-[#111827]"
        >
          {s.scenariosPage.simulate}
        </button>
      </div>
    </article>
  )
}

export default function ScenariosPage() {
  const navigate = useNavigate()
  const theme = useTheme()
  const isLight = theme === 'light'
  const s = useStrings()
  const { lang } = useContext(LanguageContext)

  function simulateMix(mix) {
    const params = new URLSearchParams()
    MIX_KEYS.forEach((key) => params.set(key, String(mix[key])))
    navigate(`/simulateur?${params.toString()}`)
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <header className="mb-8 max-w-3xl">
        <h1 className="font-mono text-2xl font-bold text-[#22D3EE]">{s.scenariosPage.title}</h1>
        <p className={`mt-2 text-sm ${isLight ? 'text-[#64748B]' : 'text-[#9CA3AF]'}`}>
          {s.scenariosPage.subtitle}
        </p>
      </header>

      <section
        className={`mb-8 rounded-xl border p-5 ${
          isLight ? 'border-[#E2E8F0] bg-white' : 'border-[#1F2937] bg-[#111827]'
        }`}
      >
        <h2 className={`mb-4 text-sm font-semibold uppercase tracking-wider ${isLight ? 'text-[#64748B]' : 'text-[#9CA3AF]'}`}>
          {s.scenariosPage.chartTitle}
        </h2>
        <div className="h-[360px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={CO2_TRAJECTORIES} margin={{ top: 10, right: 26, bottom: 26, left: 18 }}>
              <CartesianGrid stroke={isLight ? '#E2E8F0' : '#1F2937'} strokeDasharray="3 3" />
              <XAxis dataKey="year" stroke={isLight ? '#64748B' : '#94A3B8'} />
              <YAxis stroke={isLight ? '#64748B' : '#94A3B8'}>
                <Label
                  value="gCO₂eq/kWh"
                  angle={-90}
                  position="insideLeft"
                  style={{ fill: isLight ? '#64748B' : '#94A3B8', textAnchor: 'middle' }}
                />
              </YAxis>
              <Tooltip content={<ChartTooltip isLight={isLight} />} />
              <ReferenceLine
                y={50}
                stroke={SCENARIOS[1].color}
                strokeDasharray="5 5"
                label={{ value: 'Accord de Paris', fill: SCENARIOS[1].color, fontSize: 12 }}
              />
              {SCENARIOS.map((scenario) => (
                <Line
                  key={scenario.id}
                  type="monotone"
                  dataKey={scenario.id}
                  name={scenario.label[lang]}
                  stroke={scenario.color}
                  strokeWidth={3}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              ))}
              <Legend verticalAlign="bottom" height={36} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        {SCENARIOS.map((scenario) => (
          <ScenarioCard
            key={scenario.id}
            scenario={scenario}
            lang={lang}
            s={s}
            isLight={isLight}
            onSimulate={simulateMix}
          />
        ))}
      </section>

      <p className={`mt-8 text-xs ${isLight ? 'text-[#64748B]' : 'text-[#9CA3AF]'}`}>
        {s.scenariosPage.source}
      </p>
    </div>
  )
}
