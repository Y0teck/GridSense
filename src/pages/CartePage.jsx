import { useEffect, useMemo, useRef, useState } from 'react'
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps'
import { COUNTRY_PRESETS } from '../data/countryPresets'
import { calculateResults } from '../utils/calculations'
import { useTheme } from '../ThemeContext'
import { useStrings } from '../i18n/useStrings'

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'

const COUNTRY_DATA = {
  FRA: COUNTRY_PRESETS.find((preset) => preset.id === 'france'),
  DEU: COUNTRY_PRESETS.find((preset) => preset.id === 'germany'),
  POL: COUNTRY_PRESETS.find((preset) => preset.id === 'poland'),
  ESP: COUNTRY_PRESETS.find((preset) => preset.id === 'spain'),
  SWE: COUNTRY_PRESETS.find((preset) => preset.id === 'sweden'),
  NOR: COUNTRY_PRESETS.find((preset) => preset.id === 'norway'),
  USA: COUNTRY_PRESETS.find((preset) => preset.id === 'usa'),
  CHN: COUNTRY_PRESETS.find((preset) => preset.id === 'china'),
  IND: COUNTRY_PRESETS.find((preset) => preset.id === 'india'),
  BRA: COUNTRY_PRESETS.find((preset) => preset.id === 'brazil'),
  GBR: COUNTRY_PRESETS.find((preset) => preset.id === 'united-kingdom'),
  ITA: COUNTRY_PRESETS.find((preset) => preset.id === 'italy'),
  JPN: COUNTRY_PRESETS.find((preset) => preset.id === 'japan'),
  AUS: COUNTRY_PRESETS.find((preset) => preset.id === 'australia'),
  KOR: COUNTRY_PRESETS.find((preset) => preset.id === 'south-korea'),
  CAN: COUNTRY_PRESETS.find((preset) => preset.id === 'canada'),
  ZAF: COUNTRY_PRESETS.find((preset) => preset.id === 'south-africa'),
  TUR: COUNTRY_PRESETS.find((preset) => preset.id === 'turkey'),
  PRT: COUNTRY_PRESETS.find((preset) => preset.id === 'portugal'),
  BEL: COUNTRY_PRESETS.find((preset) => preset.id === 'belgium'),
  NLD: COUNTRY_PRESETS.find((preset) => preset.id === 'netherlands'),
  DNK: COUNTRY_PRESETS.find((preset) => preset.id === 'denmark'),
  FIN: COUNTRY_PRESETS.find((preset) => preset.id === 'finland'),
  CHE: COUNTRY_PRESETS.find((preset) => preset.id === 'switzerland'),
  CZE: COUNTRY_PRESETS.find((preset) => preset.id === 'czech-republic'),
  UKR: COUNTRY_PRESETS.find((preset) => preset.id === 'ukraine'),
  ARG: COUNTRY_PRESETS.find((preset) => preset.id === 'argentina'),
  CHL: COUNTRY_PRESETS.find((preset) => preset.id === 'chile'),
  IDN: COUNTRY_PRESETS.find((preset) => preset.id === 'indonesia'),
  SAU: COUNTRY_PRESETS.find((preset) => preset.id === 'saudi-arabia'),
  MAR: COUNTRY_PRESETS.find((preset) => preset.id === 'morocco'),
  THA: COUNTRY_PRESETS.find((preset) => preset.id === 'thailand'),
  AUT: COUNTRY_PRESETS.find((preset) => preset.id === 'austria'),
  COL: COUNTRY_PRESETS.find((preset) => preset.id === 'colombia'),
  ETH: COUNTRY_PRESETS.find((preset) => preset.id === 'ethiopia'),
  GRC: COUNTRY_PRESETS.find((preset) => preset.id === 'greece'),
  HUN: COUNTRY_PRESETS.find((preset) => preset.id === 'hungary'),
  IRN: COUNTRY_PRESETS.find((preset) => preset.id === 'iran'),
  KAZ: COUNTRY_PRESETS.find((preset) => preset.id === 'kazakhstan'),
  KEN: COUNTRY_PRESETS.find((preset) => preset.id === 'kenya'),
  MYS: COUNTRY_PRESETS.find((preset) => preset.id === 'malaysia'),
  MEX: COUNTRY_PRESETS.find((preset) => preset.id === 'mexico'),
  NZL: COUNTRY_PRESETS.find((preset) => preset.id === 'new-zealand'),
  NGA: COUNTRY_PRESETS.find((preset) => preset.id === 'nigeria'),
  PAK: COUNTRY_PRESETS.find((preset) => preset.id === 'pakistan'),
  PHL: COUNTRY_PRESETS.find((preset) => preset.id === 'philippines'),
  ROU: COUNTRY_PRESETS.find((preset) => preset.id === 'romania'),
  VNM: COUNTRY_PRESETS.find((preset) => preset.id === 'vietnam'),
  ARE: COUNTRY_PRESETS.find((preset) => preset.id === 'uae'),
  EGY: COUNTRY_PRESETS.find((preset) => preset.id === 'egypt'),
}

const ISO_A3_BY_NUMERIC = {
  '032': 'ARG',
  '036': 'AUS',
  '040': 'AUT',
  '056': 'BEL',
  '076': 'BRA',
  '124': 'CAN',
  '152': 'CHL',
  '156': 'CHN',
  '170': 'COL',
  '203': 'CZE',
  '208': 'DNK',
  '231': 'ETH',
  '246': 'FIN',
  '250': 'FRA',
  '276': 'DEU',
  '300': 'GRC',
  '348': 'HUN',
  '356': 'IND',
  '360': 'IDN',
  '364': 'IRN',
  '380': 'ITA',
  '392': 'JPN',
  '398': 'KAZ',
  '404': 'KEN',
  '410': 'KOR',
  '458': 'MYS',
  '484': 'MEX',
  '504': 'MAR',
  '528': 'NLD',
  '554': 'NZL',
  '566': 'NGA',
  '578': 'NOR',
  '586': 'PAK',
  '608': 'PHL',
  '616': 'POL',
  '620': 'PRT',
  '642': 'ROU',
  '682': 'SAU',
  '704': 'VNM',
  '710': 'ZAF',
  '724': 'ESP',
  '756': 'CHE',
  '764': 'THA',
  '792': 'TUR',
  '804': 'UKR',
  '818': 'EGY',
  '826': 'GBR',
  '784': 'ARE',
  '752': 'SWE',
  '840': 'USA',
}

const COUNTRY_RESULTS = Object.fromEntries(
  Object.entries(COUNTRY_DATA)
    .filter(([, preset]) => Boolean(preset))
    .map(([isoCode, preset]) => [
      isoCode,
      {
        preset,
        results: calculateResults(preset.mix),
      },
    ]),
)

function hexToRgb(hex) {
  const value = hex.replace('#', '')
  return {
    r: Number.parseInt(value.slice(0, 2), 16),
    g: Number.parseInt(value.slice(2, 4), 16),
    b: Number.parseInt(value.slice(4, 6), 16),
  }
}

function rgbToHex({ r, g, b }) {
  return `#${[r, g, b]
    .map((value) => Math.round(value).toString(16).padStart(2, '0'))
    .join('')}`
}

function interpolateColor(fromHex, toHex, ratio) {
  const from = hexToRgb(fromHex)
  const to = hexToRgb(toHex)
  const clampedRatio = Math.max(0, Math.min(1, ratio))

  return rgbToHex({
    r: from.r + (to.r - from.r) * clampedRatio,
    g: from.g + (to.g - from.g) * clampedRatio,
    b: from.b + (to.b - from.b) * clampedRatio,
  })
}

function getCO2Color(co2) {
  if (co2 <= 50) return '#22C55E'
  if (co2 <= 200) return interpolateColor('#22C55E', '#F59E0B', (co2 - 50) / 150)
  if (co2 <= 500) return interpolateColor('#F59E0B', '#EF4444', (co2 - 200) / 300)
  return '#7F1D1D'
}

function getIsoCode(geo) {
  const isoCode = geo.properties?.ISO_A3
  if (isoCode && isoCode !== '-99') return isoCode
  return ISO_A3_BY_NUMERIC[String(geo.id).padStart(3, '0')]
}

function CountryPopup({ selectedCountry, onClose, isLight, s }) {
  const { preset, results } = selectedCountry
  const countryName = s.countries[preset.id] ?? preset.label
  const co2Color = getCO2Color(results.co2)
  const parisCompatible = results.co2 < 50

  return (
    <div
      className={`fixed left-1/2 top-1/2 z-40 w-[min(92vw,360px)] -translate-x-1/2 -translate-y-1/2 rounded-xl border p-5 shadow-2xl ${
        isLight ? 'border-[#E2E8F0] bg-white text-[#111827]' : 'border-[#1F2937] bg-[#111827] text-[#F9FAFB]'
      }`}
    >
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold">
            <span className="mr-2" aria-hidden="true">
              {preset.flag}
            </span>
            {countryName}
          </h2>
          <p className={`mt-1 text-xs ${isLight ? 'text-[#64748B]' : 'text-[#9CA3AF]'}`}>
            {preset.year} · {preset.source}
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className={`rounded-lg px-2 py-1 text-lg leading-none transition-colors ${
            isLight ? 'text-[#64748B] hover:bg-[#E2E8F0]' : 'text-[#9CA3AF] hover:bg-[#1F2937]'
          }`}
          aria-label={s.modal.close}
        >
          ×
        </button>
      </div>

      <div className="mb-4 flex items-center justify-between rounded-lg border border-[#1F2937] px-3 py-2">
        <span className={`text-sm ${isLight ? 'text-[#475569]' : 'text-[#D1D5DB]'}`}>
          {s.gauges.co2.label}
        </span>
        <span
          className="rounded-full border px-2.5 py-1 font-mono text-sm font-bold"
          style={{ borderColor: co2Color, color: co2Color }}
        >
          {results.co2} gCO₂eq/kWh
        </span>
      </div>

      <dl className="grid grid-cols-2 gap-3 text-sm">
        {[
          [s.gauges.cost.label, `${results.cost} €/MWh`],
          [s.gauges.stability.label, `${results.stability}`],
          [s.gauges.renewables.label, `${results.renewables}%`],
          [s.gauges.lowCarbon.label, `${results.lowCarbon}%`],
        ].map(([label, value]) => (
          <div key={label} className={`rounded-lg border p-3 ${isLight ? 'border-[#E2E8F0]' : 'border-[#1F2937]'}`}>
            <dt className={isLight ? 'text-xs text-[#64748B]' : 'text-xs text-[#9CA3AF]'}>
              {label}
            </dt>
            <dd className="mt-1 font-mono font-bold">{value}</dd>
          </div>
        ))}
      </dl>

      <p className={`mt-4 rounded-lg px-3 py-2 text-sm font-semibold ${
        parisCompatible
          ? 'bg-[#10B981]/10 text-[#10B981]'
          : 'bg-[#EF4444]/10 text-[#EF4444]'
      }`}
      >
        {parisCompatible ? '✓' : '✗'} {parisCompatible ? s.paris.success.title : s.paris.warning.title(results.co2 - 50)}
      </p>
    </div>
  )
}

export default function CartePage() {
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [position, setPosition] = useState({ coordinates: [10, 52], zoom: 4 })
  const [hoveredCountry, setHoveredCountry] = useState(null)
  const mapRef = useRef(null)
  const theme = useTheme()
  const isLight = theme === 'light'
  const s = useStrings()
  const noDataColor = isLight ? '#E2E8F0' : '#1F2937'
  const strokeColor = isLight ? '#F8FAFC' : '#0A0F1E'

  useEffect(() => {
    const el = mapRef.current
    if (!el) return
    function onWheel(e) {
      if (!e.ctrlKey) return
      e.preventDefault()
      setPosition((p) => ({
        ...p,
        zoom: e.deltaY < 0
          ? Math.min(p.zoom * 1.3, 8)
          : Math.max(p.zoom / 1.3, 1),
      }))
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [])

  const geographyStyle = useMemo(
    () => ({
      default: { outline: 'none' },
      hover: { outline: 'none', filter: 'brightness(1.2)' },
      pressed: { outline: 'none', filter: 'brightness(0.95)' },
    }),
    [],
  )

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-6">
        <h1 className="font-mono text-2xl font-bold text-[#22D3EE]">{s.cartePage.title}</h1>
        <p className={`mt-2 text-sm ${isLight ? 'text-[#64748B]' : 'text-[#9CA3AF]'}`}>
          {s.cartePage.subtitle}
        </p>
      </div>

      <div className="mb-6 flex flex-wrap items-center gap-6">
        <div className="min-w-[260px] flex-1">
          <div className="h-3 rounded-full bg-gradient-to-r from-[#22C55E] via-[#F59E0B] to-[#EF4444]" />
          <div className={`mt-2 flex justify-between text-xs ${isLight ? 'text-[#64748B]' : 'text-[#9CA3AF]'}`}>
            <span>&lt; 50 gCO₂/kWh</span>
            <span>200</span>
            <span>500+</span>
          </div>
        </div>
      </div>

      <section
        ref={mapRef}
        className={`relative overflow-hidden rounded-xl border ${
          isLight ? 'border-[#E2E8F0] bg-white' : 'border-[#1F2937] bg-[#111827]'
        }`}
      >
        <div className="absolute right-3 top-3 z-10 flex flex-col gap-1">
          {[
            {
              label: '+',
              action: () => setPosition((current) => ({ ...current, zoom: Math.min(current.zoom * 1.5, 8) })),
            },
            {
              label: '−',
              action: () => setPosition((current) => ({ ...current, zoom: Math.max(current.zoom / 1.5, 1) })),
            },
            {
              label: '⊙',
              action: () => setPosition({ coordinates: [10, 52], zoom: 4 }),
            },
          ].map((control) => (
            <button
              key={control.label}
              type="button"
              onClick={control.action}
              className="flex h-8 w-8 items-center justify-center rounded border border-[#374151] bg-[#0A0F1E]/80 text-sm font-bold text-white shadow-lg transition-colors hover:border-[#22D3EE] hover:text-[#22D3EE]"
            >
              {control.label}
            </button>
          ))}
        </div>

        <ComposableMap
          projectionConfig={{ scale: 150 }}
          className="h-[600px] w-full cursor-grab active:cursor-grabbing"
          aria-label={s.cartePage.title}
        >
          <ZoomableGroup
            zoom={position.zoom}
            center={position.coordinates}
            onMoveEnd={setPosition}
            minZoom={1}
            maxZoom={8}
          >
            <Geographies geography={GEO_URL}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const isoCode = getIsoCode(geo)
                  const countryData = isoCode ? COUNTRY_RESULTS[isoCode] : null
                  const fillColor = countryData ? getCO2Color(countryData.results.co2) : noDataColor

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={fillColor}
                      stroke={strokeColor}
                      strokeWidth={0.5}
                      onClick={() => {
                        if (countryData) setSelectedCountry({ ...countryData, isoCode })
                      }}
                      onMouseEnter={(event) => {
                        if (!countryData) return

                        setHoveredCountry({
                          name: s.countries[countryData.preset.id] ?? countryData.preset.label,
                          flag: countryData.preset.flag,
                          co2: countryData.results.co2,
                          x: event.clientX,
                          y: event.clientY,
                        })
                      }}
                      onMouseLeave={() => setHoveredCountry(null)}
                      onMouseMove={(event) =>
                        setHoveredCountry((current) =>
                          current ? { ...current, x: event.clientX, y: event.clientY } : null,
                        )
                      }
                      style={geographyStyle}
                      className={countryData ? 'cursor-pointer transition' : 'cursor-grab active:cursor-grabbing'}
                    />
                  )
                })
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>

      </section>

      <p className={`mt-4 text-sm ${isLight ? 'text-[#64748B]' : 'text-[#9CA3AF]'}`}>
        {s.cartePage.note}
      </p>

      {selectedCountry ? (
        <CountryPopup
          selectedCountry={selectedCountry}
          onClose={() => setSelectedCountry(null)}
          isLight={isLight}
          s={s}
        />
      ) : null}

      {hoveredCountry ? (
        <div
          className="pointer-events-none fixed z-50 rounded-lg border border-[#1F2937] bg-[#0A0F1E]/90 px-3 py-2 text-sm text-white shadow-xl"
          style={{ left: hoveredCountry.x + 12, top: hoveredCountry.y - 10 }}
        >
          <span>
            {hoveredCountry.flag} {hoveredCountry.name}
          </span>
          <br />
          <span
            style={{ color: getCO2Color(hoveredCountry.co2) }}
            className="font-mono font-bold"
          >
            {hoveredCountry.co2} gCO₂eq/kWh
          </span>
        </div>
      ) : null}
    </div>
  )
}
