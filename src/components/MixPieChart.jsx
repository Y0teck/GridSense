// Source donnees : mix utilisateur et coefficients depuis src/data/energyData.js.

import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { useStrings } from '../i18n/useStrings'

function renderLabel({ name, value }) {
  return value > 3 ? `${name} ${value}%` : ''
}

function MixTooltip({ active, payload }) {
  if (!active || !payload?.length) {
    return null
  }

  const item = payload[0].payload

  return (
    <div className="rounded-lg border border-[#334155] bg-[#0F172A] px-3 py-2 text-sm text-[#F8FAFC] shadow-xl">
      <p className="font-semibold" style={{ color: item.color }}>
        {item.name}
      </p>
      <p className="mt-1 font-mono">{item.value}%</p>
      <p className="mt-1 text-xs text-[#CBD5E1]">
        {item.twh === null ? 'TWh non disponible' : `${item.twh.toFixed(1)} TWh`}
      </p>
    </div>
  )
}

export default function MixPieChart({ mix, sources, refData, theme, exportMode = false, showLegend = true }) {
  const isLight = theme === 'light'
  const s = useStrings()
  const shouldShowLegend = exportMode ? false : showLegend
  const referenceTotal = Number.isFinite(refData?.total) ? refData.total : null
  const data = Object.values(sources).map((source) => ({
    id: source.id,
    name: `${source.icon} ${s.sources[source.id] ?? source.label}`,
    legendName: s.sources[source.id] ?? source.label,
    value: mix[source.id],
    twh: referenceTotal === null ? null : (mix[source.id] / 100) * referenceTotal,
    color: source.color,
  }))

  return (
    <section
      className={`rounded-xl border p-6 transition-colors ${
        isLight
          ? 'border-[#E2E8F0] bg-white'
          : 'border-[#1F2937] bg-[#111827]'
      }`}
    >
      <h2
        className={`mb-4 text-sm font-semibold uppercase tracking-normal ${
          isLight ? 'text-[#64748B]' : 'text-[#9CA3AF]'
        }`}
      >
        {s.pieChart.title}
      </h2>

      {exportMode ? (
        <PieChart width={620} height={360}>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="47%"
            outerRadius={130}
            label={renderLabel}
            labelLine={false}
            stroke="#ffffff"
            strokeWidth={1}
            isAnimationActive={true}
          >
            {data.map((entry) => (
              <Cell key={entry.id} fill={entry.color} />
            ))}
          </Pie>

          <Tooltip content={<MixTooltip />} cursor={false} />

          {shouldShowLegend ? (
            <Legend
              layout="horizontal"
              verticalAlign="bottom"
              align="center"
              iconType="circle"
              formatter={(_, entry) => entry.payload.legendName}
              wrapperStyle={{
                color: isLight ? '#475569' : '#9CA3AF',
                fontSize: '12px',
              }}
            />
          ) : null}
        </PieChart>
      ) : (
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="45%"
              outerRadius="68%"
              label={renderLabel}
              labelLine={false}
              stroke="#ffffff"
              strokeWidth={1}
              isAnimationActive={true}
            >
              {data.map((entry) => (
                <Cell key={entry.id} fill={entry.color} />
              ))}
            </Pie>

            <Tooltip content={<MixTooltip />} cursor={false} />

            {shouldShowLegend ? (
              <Legend
                layout="horizontal"
                verticalAlign="bottom"
                align="center"
                iconType="circle"
                formatter={(_, entry) => entry.payload.legendName}
                wrapperStyle={{
                  color: isLight ? '#475569' : '#9CA3AF',
                  fontSize: '12px',
                }}
              />
            ) : null}
          </PieChart>
        </ResponsiveContainer>
      )}
    </section>
  )
}
