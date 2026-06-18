import { useContext, useEffect, useMemo, useRef, useState } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Label,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { LanguageContext } from '../LanguageContext'
import { useTheme } from '../ThemeContext'
import { SOURCE_CONTENT } from '../data/sourceContent'
import { ENERGIES_CONTENT } from '../data/energiesContent'
import { useStrings } from '../i18n/useStrings'

const SECTION_KEYS = ['env', 'costs', 'infra', 'grid']

const WIKI_SLUGS = {
  nucleaire: 'Nuclear_power_plant',
  eolien: 'Wind_farm',
  solaire: 'Solar_panel',
  hydraulique: 'Hydroelectric_power_station',
  gaz: 'Combined_cycle_power_plant',
  charbon: 'Coal-fired_power_station',
  bioenergies: 'Biomass_heating_system',
}

const WIKI_SECTION_SLUGS = {
  nucleaire: ['Flamanville_nuclear_power_plant', 'Radioactive_waste'],
  eolien: ['Hornsea_wind_farm', 'Wind_turbine'],
  solaire: ['Agrivoltaics', 'Solar_panel'],
  hydraulique: ['Three_Gorges_Dam', 'Pumped-storage_hydroelectricity'],
  gaz: ['Combined_cycle_power_plant', 'Liquefied_natural_gas'],
  charbon: ['Coal_power_in_the_United_States', 'Fly_ash'],
  bioenergies: ['Anaerobic_digestion', 'Drax_power_station'],
}

const METRICS = {
  nucleaire: { co2: 12, lcoe: 72 },
  eolien: { co2: 11, lcoe: 50 },
  solaire: { co2: 45, lcoe: 55 },
  hydraulique: { co2: 24, lcoe: 37 },
  gaz: { co2: 490, lcoe: 100 },
  charbon: { co2: 820, lcoe: 85 },
  bioenergies: { co2: 230, lcoe: 115 },
}

function getCO2Color(co2) {
  if (co2 < 50) return '#10B981'
  if (co2 < 200) return '#F59E0B'
  return '#EF4444'
}

function getIntermittenceLabel(value, lang) {
  const labels = {
    low: { fr: 'Faible', en: 'Low' },
    medium: { fr: 'Moyenne', en: 'Medium' },
    high: { fr: 'Élevée', en: 'High' },
  }

  return labels[value]?.[lang] ?? value
}

function ChartTooltip({ active, payload, label, isLight }) {
  if (!active || !payload?.length) {
    return null
  }

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
          {item.name}: {item.value}
          {item.dataKey === 'co2' ? ' gCO₂eq/kWh' : ' €/MWh'}
        </p>
      ))}
    </div>
  )
}

export default function EnergiesPage() {
  const [expandedId, setExpandedId] = useState(null)
  const [thumbnails, setThumbnails] = useState({})
  const [sectionImages, setSectionImages] = useState({})
  const thumbnailCacheRef = useRef({})
  const sectionImageCacheRef = useRef({})
  const theme = useTheme()
  const isLight = theme === 'light'
  const s = useStrings()
  const { lang } = useContext(LanguageContext)
  const pillClass = isLight
    ? 'border-[#CBD5E1] bg-[#F8FAFC] text-[#475569]'
    : 'border-[#374151] bg-[#111827] text-[#D1D5DB]'

  const chartData = useMemo(
    () =>
      ENERGIES_CONTENT.map((energy) => {
        const source = SOURCE_CONTENT[energy.id]

        return {
          id: energy.id,
          name: s.sources[energy.id] ?? source.label,
          color: source.color,
          co2: METRICS[energy.id].co2,
          lcoe: METRICS[energy.id].lcoe,
        }
      }),
    [s],
  )

  useEffect(() => {
    let cancelled = false

    async function fetchThumbnails() {
      const entries = await Promise.all(
        ENERGIES_CONTENT.map(async (energy) => {
          if (thumbnailCacheRef.current[energy.id] !== undefined) {
            return [energy.id, thumbnailCacheRef.current[energy.id]]
          }

          try {
            const response = await fetch(
              `https://en.wikipedia.org/api/rest_v1/page/summary/${WIKI_SLUGS[energy.id]}`,
            )

            if (!response.ok) {
              throw new Error('Wikipedia thumbnail request failed')
            }

            const data = await response.json()
            const thumbnail = data.thumbnail?.source ?? null
            thumbnailCacheRef.current[energy.id] = thumbnail
            return [energy.id, thumbnail]
          } catch {
            thumbnailCacheRef.current[energy.id] = null
            return [energy.id, null]
          }
        }),
      )

      if (!cancelled) {
        setThumbnails(Object.fromEntries(entries))
      }
    }

    fetchThumbnails()

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    let cancelled = false

    async function fetchSectionImages() {
      const entries = await Promise.all(
        ENERGIES_CONTENT.map(async (energy) => {
          if (sectionImageCacheRef.current[energy.id] !== undefined) {
            return [energy.id, sectionImageCacheRef.current[energy.id]]
          }

          const settledImages = await Promise.allSettled(
            WIKI_SECTION_SLUGS[energy.id].map(async (slug) => {
              const response = await fetch(
                `https://en.wikipedia.org/api/rest_v1/page/summary/${slug}`,
              )

              if (!response.ok) {
                throw new Error('Wikipedia image request failed')
              }

              const data = await response.json()
              return data.thumbnail?.source ?? null
            }),
          )

          const images = settledImages
            .filter((result) => result.status === 'fulfilled' && result.value)
            .map((result) => result.value)

          sectionImageCacheRef.current[energy.id] = images
          return [energy.id, images]
        }),
      )

      if (!cancelled) {
        setSectionImages(Object.fromEntries(entries))
      }
    }

    fetchSectionImages()

    return () => {
      cancelled = true
    }
  }, [])

  function toggleSource(sourceId) {
    setExpandedId((currentId) => (currentId === sourceId ? null : sourceId))
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <div className="mb-8">
        <h1 className="font-mono text-2xl font-bold text-[#22D3EE]">
          {s.energiesPage.title}
        </h1>
        <p className={`mt-3 text-sm ${isLight ? 'text-[#64748B]' : 'text-[#9CA3AF]'}`}>
          {s.energiesPage.intro}
        </p>
      </div>

      <section
        className={`mb-8 rounded-xl border p-5 transition-colors ${
          isLight ? 'border-[#E2E8F0] bg-white' : 'border-[#1F2937] bg-[#111827]'
        }`}
      >
        <h2
          className={`mb-4 text-sm font-semibold uppercase tracking-wide ${
            isLight ? 'text-[#64748B]' : 'text-[#9CA3AF]'
          }`}
        >
          {s.energiesPage.chartTitle}
        </h2>

        <div className="h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 42 }}>
              <CartesianGrid stroke={isLight ? '#E2E8F0' : '#1F2937'} vertical={false} />
              <XAxis
                dataKey="name"
                tick={{ fill: isLight ? '#64748B' : '#9CA3AF', fontSize: 11 }}
                interval={0}
                angle={-25}
                textAnchor="end"
                height={60}
                stroke={isLight ? '#CBD5E1' : '#374151'}
              />
              <YAxis
                yAxisId="left"
                orientation="left"
                stroke="#94a3b8"
                tick={{ fill: isLight ? '#64748B' : '#9CA3AF', fontSize: 11 }}
                tickFormatter={(value) => value}
              >
                <Label
                  value="CO₂ (gCO₂eq/kWh)"
                  angle={-90}
                  position="insideLeft"
                  style={{ fill: isLight ? '#64748B' : '#9CA3AF', fontSize: 12 }}
                />
              </YAxis>
              <YAxis
                yAxisId="right"
                orientation="right"
                stroke="#f59e0b"
                tick={{ fill: '#F59E0B', fontSize: 11 }}
                tickFormatter={(value) => `${value}€`}
              >
                <Label
                  value="LCOE (€/MWh)"
                  angle={-90}
                  position="insideRight"
                  style={{ fill: '#F59E0B', fontSize: 12 }}
                />
              </YAxis>
              <Tooltip content={<ChartTooltip isLight={isLight} />} />
              <Legend
                wrapperStyle={{ color: isLight ? '#64748B' : '#9CA3AF', fontSize: 12 }}
              />
              <Bar
                yAxisId="left"
                dataKey="co2"
                name={s.energiesPage.co2Label}
                radius={[4, 4, 0, 0]}
              >
                {chartData.map((entry) => (
                  <Cell key={`co2-${entry.id}`} fill={entry.color} />
                ))}
              </Bar>
              <Bar
                yAxisId="right"
                dataKey="lcoe"
                name={s.energiesPage.lcoeLabel}
                radius={[4, 4, 0, 0]}
                opacity={0.55}
              >
                {chartData.map((entry) => (
                  <Cell key={`lcoe-${entry.id}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="space-y-3">
        {ENERGIES_CONTENT.map((energy) => {
          const source = SOURCE_CONTENT[energy.id]
          const isExpanded = expandedId === energy.id
          const sourceLabel = s.sources[energy.id] ?? source.label
          const metrics = METRICS[energy.id]
          const thumbnail = thumbnails[energy.id]

          return (
            <article
              key={energy.id}
              className={`overflow-hidden rounded-xl border transition-colors ${
                isLight
                  ? 'border-neutral-200 bg-white'
                  : 'border-neutral-700 bg-[#111827]'
              }`}
            >
              <button
                type="button"
                aria-expanded={isExpanded}
                onClick={() => toggleSource(energy.id)}
                className={`flex w-full cursor-pointer select-none items-center gap-3 px-4 py-3 text-left transition-colors ${
                  isLight
                    ? 'text-[#111827] hover:bg-[#F8FAFC]'
                    : 'text-[#F9FAFB] hover:bg-[#1F2937]'
                }`}
                style={{
                  borderLeftColor: source.color,
                  borderLeftWidth: '4px',
                  backgroundColor: isExpanded
                    ? `${source.color}${isLight ? '14' : '1F'}`
                    : undefined,
                }}
              >
                <span className="text-2xl" aria-hidden="true">
                  {source.icon}
                </span>
                <span className="flex-1 font-semibold">{sourceLabel}</span>
                {thumbnail ? (
                  <img
                    src={thumbnail}
                    alt=""
                    className="hidden h-12 w-12 rounded-lg object-cover sm:block"
                    loading="lazy"
                  />
                ) : null}
                <span className="text-sm text-[#9CA3AF]" aria-hidden="true">
                  {isExpanded ? '▾' : '▸'}
                </span>
              </button>

              {isExpanded ? (
                <div
                  className={`space-y-5 overflow-hidden px-5 py-4 ${
                    isLight ? 'bg-white' : 'bg-neutral-900'
                  }`}
                >
                  <div className="flex flex-wrap gap-2">
                    <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold ${pillClass}`}>
                      <span
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ backgroundColor: getCO2Color(metrics.co2) }}
                      />
                      CO₂ : {metrics.co2} gCO₂eq/kWh
                    </span>
                    <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold ${pillClass}`}>
                      <span className="h-2.5 w-2.5 rounded-full bg-[#22D3EE]" />
                      LCOE : {metrics.lcoe} €/MWh
                    </span>
                    <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold ${pillClass}`}>
                      <span className="h-2.5 w-2.5 rounded-full bg-[#F59E0B]" />
                      Intermittence : {getIntermittenceLabel(energy.intermittence, lang)}
                    </span>
                  </div>

                  {SECTION_KEYS.map((sectionKey, sectionIndex) => {
                    const section = energy.sections[sectionKey]
                    const title = lang === 'en' ? section.titleEn : section.titleFr
                    const bullets = lang === 'en' ? section.bulletsEn : section.bulletsFr
                    const inlineImage =
                      sectionIndex < 3 ? sectionImages[energy.id]?.[sectionIndex] : null

                    return (
                      <div key={sectionKey}>
                        <section>
                          <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
                            {title}
                          </h2>
                          <ul
                            className={`list-disc space-y-1 pl-5 text-sm leading-6 ${
                              isLight ? 'text-neutral-700' : 'text-neutral-300'
                            }`}
                          >
                            {bullets.map((bullet) => (
                              <li key={bullet}>{bullet}</li>
                            ))}
                          </ul>
                        </section>

                        {inlineImage ? (
                          <div className="my-4 flex flex-col items-center">
                            <img
                              src={inlineImage}
                              alt=""
                              className="h-44 w-64 rounded-lg object-cover shadow-md"
                              loading="lazy"
                            />
                            <p className="mt-1 text-xs text-neutral-400">
                              © Wikimedia Commons
                            </p>
                          </div>
                        ) : null}
                      </div>
                    )
                  })}

                  <div>
                    <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
                      Sources
                    </h2>
                    <div className="text-xs leading-6">
                      {energy.sources.map((energySource, index) => (
                        <span key={energySource.url}>
                          <a
                            href={energySource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 underline transition-colors hover:text-blue-400"
                          >
                            {lang === 'en' ? energySource.labelEn : energySource.labelFr}
                          </a>
                          {index < energy.sources.length - 1 ? (
                            <span className={isLight ? 'text-neutral-400' : 'text-neutral-600'}>
                              {' · '}
                            </span>
                          ) : null}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ) : null}
            </article>
          )
        })}
      </section>
    </div>
  )
}
