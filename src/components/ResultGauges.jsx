// Source donnees : resultats calcules depuis src/utils/calculations.js.
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

function GaugeCard({ label, value, unit, colorClass, sublabel, theme }) {
  const isLight = theme === 'light'
  return (
    <article
      className={`rounded-xl p-5 transition-colors ${
        isLight ? 'border border-[#E2E8F0] bg-white' : 'bg-[#111827]'
      }`}
    >
      <p
        className={`text-xs font-semibold uppercase tracking-normal ${
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
    </article>
  )
}

export default function ResultGauges({ co2, cost, stability, renewables, theme }) {
  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <GaugeCard
        label="Émissions CO₂"
        value={co2}
        unit="gCO₂eq/kWh"
        colorClass={getCO2Color(co2)}
        theme={theme}
      />
      <GaugeCard
        label="Coût de production"
        value={cost}
        unit="€/MWh"
        colorClass={getCostColor(cost)}
        theme={theme}
      />
      <GaugeCard
        label="Stabilité réseau"
        value={stability}
        unit="/100"
        colorClass={getStabilityColor(stability)}
        theme={theme}
      />
      <GaugeCard
        label="Énergies renouvelables"
        value={renewables}
        unit="%"
        colorClass={getRenewablesColor(renewables)}
        theme={theme}
      />
    </section>
  )
}