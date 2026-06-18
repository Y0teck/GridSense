import { COUNTRY_PRESETS } from '../data/countryPresets'
import { useStrings } from '../i18n/useStrings'

export default function PresetSelector({ onSelect, theme, activeId = null, disabledId = null }) {
  const isLight = theme === 'light'
  const s = useStrings()

  function selectPreset(preset) {
    onSelect(preset.mix)
  }

  return (
    <section
      className={`rounded-xl border transition-colors ${
        isLight
          ? 'border-[#E2E8F0] bg-white'
          : 'border-[#1F2937] bg-[#111827]'
      }`}
    >
      <div className="grid grid-cols-5 gap-2">
        {COUNTRY_PRESETS.map((preset) => {
          const isActive = preset.id === activeId
          const isDisabled = preset.id === disabledId

          return (
            <button
              key={preset.id}
              type="button"
              disabled={isDisabled}
              onClick={() => {
                if (!isDisabled) selectPreset(preset)
              }}
              className={`flex min-w-0 flex-col items-center gap-1 rounded border px-2 py-3 transition ${
                isActive
                  ? 'border-[#22D3EE] bg-[#22D3EE]/10 text-[#22D3EE]'
                  : isDisabled
                    ? `cursor-not-allowed opacity-40 ${
                        isLight
                          ? 'border-[#E2E8F0] text-[#475569]'
                          : 'border-[#1F2937] text-[#9CA3AF]'
                      }`
                  : isLight
                    ? 'border-[#E2E8F0] text-[#475569] hover:border-[#22D3EE] hover:text-[#0891B2]'
                    : 'border-[#1F2937] text-[#9CA3AF] hover:border-[#22D3EE] hover:text-[#22D3EE]'
              }`}
            >
              <span aria-hidden="true" style={{ fontSize: '1.5rem' }}>
                {preset.flag}
              </span>
              <span className="max-w-full truncate text-xs font-semibold">
                {s.countries[preset.id] ?? preset.label}
              </span>
            </button>
          )
        })}
      </div>
    </section>
  )
}
