import { useState } from 'react'
import MixSliders from '../components/MixSliders'
import ResultGauges from '../components/ResultGauges'
import { useTheme } from '../ThemeContext'
import { calculateResults } from '../utils/calculations'

const CHALLENGES = [
  {
    id: 'paris',
    title: 'Objectif Accord de Paris',
    difficulty: 'Facile',
    description: 'Composez un mix électrique compatible avec une trajectoire 1,5°C.',
    startMix: { nucleaire: 10, eolien: 15, solaire: 10, hydraulique: 10, gaz: 30, charbon: 20, bioenergies: 5 },
    objectives: [
      { label: 'CO2 < 50 gCO2eq/kWh', check: (results) => results.co2 < 50 },
    ],
    successExamples: [
      '🇫🇷 France (~34 gCO2eq/kWh) — grâce à son parc nucléaire dominant',
      '🇸🇪 Suède (~13 gCO2eq/kWh) — mix nucléaire + hydraulique',
      '🇳🇴 Norvège (~26 gCO2eq/kWh) — quasi 100% hydraulique',
    ],
  },
  {
    id: 'renewables',
    title: 'Mix majoritairement renouvelable',
    difficulty: 'Facile',
    description: 'Faites passer les énergies renouvelables au-dessus de 60% du mix.',
    startMix: { nucleaire: 30, eolien: 10, solaire: 8, hydraulique: 10, gaz: 25, charbon: 12, bioenergies: 5 },
    objectives: [
      { label: 'Renouvelables >= 60 %', check: (results) => results.renewables >= 60 },
    ],
    successExamples: [
      "🇳🇴 Norvège (~98% renouvelables) — champion mondial de l'hydraulique",
      '🇧🇷 Brésil (~85% renouvelables) — hydraulique + éolien + solaire',
      "🇩🇪 Allemagne (~59% renouvelables) — forte montée de l'éolien et du solaire",
    ],
  },
  {
    id: 'competitive',
    title: 'Mix vert et compétitif',
    difficulty: 'Moyen',
    description: 'Trouvez un mix à la fois économique et renouvelable.',
    startMix: { nucleaire: 5, eolien: 10, solaire: 8, hydraulique: 8, gaz: 40, charbon: 25, bioenergies: 4 },
    objectives: [
      { label: 'Coût <= 70 EUR/MWh', check: (results) => results.cost <= 70 },
      { label: 'Renouvelables >= 40 %', check: (results) => results.renewables >= 40 },
    ],
    successExamples: [
      '🇪🇸 Espagne (~58% renouvelables, coût modéré) — solaire + éolien en forte croissance',
      '🇧🇷 Brésil (~85% renouvelables, LCOE compétitif) — hydraulique pilotable et peu coûteux',
    ],
  },
  {
    id: 'nonuclear',
    title: 'Décarboner sans nucléaire',
    difficulty: 'Moyen',
    description: 'Atteignez une faible intensité carbone en utilisant uniquement les renouvelables.',
    startMix: { nucleaire: 0, eolien: 15, solaire: 10, hydraulique: 10, gaz: 40, charbon: 20, bioenergies: 5 },
    objectives: [
      { label: 'Nucléaire = 0 %', check: (_, mix) => mix.nucleaire === 0 },
      { label: 'CO2 < 150 gCO2eq/kWh', check: (results) => results.co2 < 150 },
      { label: 'Stabilité >= 50', check: (results) => results.stability >= 50 },
    ],
    successExamples: [
      "🇳🇴 Norvège (0% nucléaire, ~26 gCO2eq/kWh) — preuve que c'est possible avec l'hydraulique",
      '🇧🇷 Brésil (0% nucléaire, faible CO2) — combinaison hydraulique + éolien + solaire',
    ],
  },
  {
    id: 'stable_paris',
    title: 'Accord de Paris ET réseau stable',
    difficulty: 'Difficile',
    description: 'Décarbonez le mix sans sacrifier la stabilité du réseau.',
    startMix: { nucleaire: 5, eolien: 20, solaire: 20, hydraulique: 10, gaz: 25, charbon: 15, bioenergies: 5 },
    objectives: [
      { label: 'CO2 < 50 gCO2eq/kWh', check: (results) => results.co2 < 50 },
      { label: 'Stabilité >= 60', check: (results) => results.stability >= 60 },
    ],
    successExamples: [
      '🇫🇷 France (~34 gCO2eq/kWh, stabilité ~85) — le nucléaire pilotable est la clé',
      '🇸🇪 Suède (~13 gCO2eq/kWh, stabilité ~90) — nucléaire + hydraulique, très pilotable',
    ],
  },
  {
    id: 'perfect',
    title: 'Le mix parfait',
    difficulty: 'Difficile',
    description: 'Trouvez un mix qui satisfait simultanément quatre contraintes exigeantes.',
    startMix: { nucleaire: 10, eolien: 15, solaire: 10, hydraulique: 8, gaz: 30, charbon: 22, bioenergies: 5 },
    objectives: [
      { label: 'CO2 < 100 gCO2eq/kWh', check: (results) => results.co2 < 100 },
      { label: 'Coût <= 75 EUR/MWh', check: (results) => results.cost <= 75 },
      { label: 'Stabilité >= 60', check: (results) => results.stability >= 60 },
      { label: 'Renouvelables >= 40 %', check: (results) => results.renewables >= 40 },
    ],
    successExamples: [
      '🇫🇷 France — CO2 ~34, coût ~65, stabilité ~85, renouvelables ~28% (presque !)',
      '🇪🇸 Espagne — bon équilibre renouvelables + stabilité + coût modéré',
      '🇸🇪 Suède — CO2 et stabilité excellents, renouvelables élevés',
    ],
  },
]

const DIFFICULTY_STYLES = {
  Facile: 'border-[#10B981] bg-[#10B981]/10 text-[#10B981]',
  Moyen: 'border-[#F59E0B] bg-[#F59E0B]/10 text-[#F59E0B]',
  Difficile: 'border-[#EF4444] bg-[#EF4444]/10 text-[#EF4444]',
}

function DifficultyBadge({ difficulty }) {
  return (
    <span className={`rounded-full border px-2.5 py-1 text-xs font-bold ${DIFFICULTY_STYLES[difficulty]}`}>
      {difficulty}
    </span>
  )
}

function ObjectiveList({ objectives, results, mix, flashFailures = false, isLight = false }) {
  return (
    <ul className="space-y-2">
      {objectives.map((objective) => {
        const passed = results ? objective.check(results, mix) : false
        const failedFlash = flashFailures && !passed

        return (
          <li
            key={objective.label}
            className={`flex items-start gap-2 rounded-lg px-2 py-1 text-sm transition-colors ${
              failedFlash
                ? 'bg-[#EF4444]/15 text-[#EF4444]'
                : isLight
                  ? 'text-[#475569]'
                  : 'text-[#D1D5DB]'
            }`}
          >
            <span className={`font-bold ${passed ? 'text-[#10B981]' : 'text-[#EF4444]'}`}>
              {passed ? '✓' : '✗'}
            </span>
            <span>{objective.label}</span>
          </li>
        )
      })}
    </ul>
  )
}

function SuccessModal({ challenge, results, onClose, onShare, theme }) {
  const isLight = theme === 'light'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4" onClick={onClose}>
      <section
        className={`w-full max-w-lg rounded-xl border p-6 shadow-2xl ${
          isLight ? 'border-[#E2E8F0] bg-white text-[#111827]' : 'border-[#1F2937] bg-[#111827] text-[#F9FAFB]'
        }`}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-2xl font-bold text-[#22D3EE]">Défi relevé !</p>
            <h2 className="mt-2 text-lg font-bold">{challenge.title}</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className={`rounded-full border px-2 py-1 text-xs font-bold ${
              isLight ? 'border-[#CBD5E1] text-[#64748B]' : 'border-[#374151] text-[#9CA3AF]'
            }`}
            aria-label="Fermer la réussite du défi"
          >
            ✕
          </button>
        </div>

        <div className="mb-6 grid grid-cols-2 gap-3">
          {[
            ['CO2', `${results.co2} gCO2eq/kWh`],
            ['Coût', `${results.cost} EUR/MWh`],
            ['Stabilité', `${results.stability}`],
            ['Renouvelables', `${results.renewables}%`],
            ['Bas-carbone', `${results.lowCarbon}%`],
          ].map(([label, value]) => (
            <div key={label} className={`rounded-lg border p-3 ${isLight ? 'border-[#E2E8F0]' : 'border-[#1F2937]'}`}>
              <p className={isLight ? 'text-xs text-[#64748B]' : 'text-xs text-[#9CA3AF]'}>{label}</p>
              <p className="mt-1 font-mono text-sm font-bold">{value}</p>
            </div>
          ))}
        </div>

        {challenge.successExamples?.length ? (
          <div className="mb-6">
            <p className={`mb-2 text-xs font-semibold uppercase tracking-normal ${isLight ? 'text-[#64748B]' : 'text-[#9CA3AF]'}`}>
              Pays qui relèvent ce défi
            </p>
            <ul className="space-y-1">
              {challenge.successExamples.map((example) => (
                <li key={example} className={`text-sm ${isLight ? 'text-[#64748B]' : 'text-[#9CA3AF]'}`}>
                  {example}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={onShare}
            className="rounded-lg border border-[#22D3EE] px-4 py-2 text-sm font-bold text-[#22D3EE] transition-colors hover:bg-[#22D3EE] hover:text-[#111827]"
          >
            Partager ce mix
          </button>
          <button
            type="button"
            onClick={onClose}
            className={`rounded-lg border px-4 py-2 text-sm font-bold transition-colors ${
              isLight
                ? 'border-[#CBD5E1] text-[#64748B] hover:border-[#22D3EE] hover:text-[#0891B2]'
                : 'border-[#374151] text-[#9CA3AF] hover:border-[#22D3EE] hover:text-[#22D3EE]'
            }`}
          >
            Choisir un autre défi
          </button>
        </div>
      </section>
    </div>
  )
}

export default function QuizPage() {
  const theme = useTheme()
  const isLight = theme === 'light'
  const [activeChallenge, setActiveChallenge] = useState(null)
  const [mix, setMix] = useState(null)
  const [successOpen, setSuccessOpen] = useState(false)
  const [flashFailures, setFlashFailures] = useState(false)

  const results = mix ? calculateResults(mix) : null

  function startChallenge(challenge) {
    setActiveChallenge(challenge)
    setMix(challenge.startMix)
    setSuccessOpen(false)
    setFlashFailures(false)
  }

  function leaveChallenge() {
    setActiveChallenge(null)
    setMix(null)
    setSuccessOpen(false)
    setFlashFailures(false)
  }

  function validateChallenge() {
    const allPassed = activeChallenge.objectives.every((objective) => objective.check(results, mix))

    if (allPassed) {
      setSuccessOpen(true)
      return
    }

    setFlashFailures(true)
    window.setTimeout(() => setFlashFailures(false), 1000)
  }

  async function shareChallenge() {
    const shareData = {
      title: `ÉnergIA — ${activeChallenge.title}`,
      text: 'J’ai relevé un défi ÉnergIA avec ce mix électrique.',
      url: window.location.href,
    }

    try {
      if (navigator.share) {
        await navigator.share(shareData)
        return
      }

      await navigator.clipboard.writeText(window.location.href)
    } catch {
      // User cancellation or clipboard refusal leaves the success modal unchanged.
    }
  }

  if (!activeChallenge) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-8">
          <h1 className="font-mono text-2xl font-bold text-[#22D3EE]">Défis ÉnergIA</h1>
          <p className={`mt-2 max-w-2xl text-sm ${isLight ? 'text-[#64748B]' : 'text-[#9CA3AF]'}`}>
            Relevez un objectif énergétique en ajustant le mix, puis validez vos indicateurs.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {CHALLENGES.map((challenge) => (
            <article
              key={challenge.id}
              className={`flex min-h-[280px] flex-col rounded-xl border p-5 transition-colors ${
                isLight ? 'border-[#E2E8F0] bg-white' : 'border-[#1F2937] bg-[#111827]'
              }`}
            >
              <div className="mb-4 flex items-start justify-between gap-3">
                <h2 className={`text-lg font-bold ${isLight ? 'text-[#111827]' : 'text-[#F9FAFB]'}`}>
                  {challenge.title}
                </h2>
                <DifficultyBadge difficulty={challenge.difficulty} />
              </div>

              <p className={`mb-4 text-sm ${isLight ? 'text-[#475569]' : 'text-[#D1D5DB]'}`}>
                {challenge.description}
              </p>

              <div className="mb-5">
                <p className={`mb-2 text-xs font-semibold uppercase tracking-normal ${isLight ? 'text-[#64748B]' : 'text-[#9CA3AF]'}`}>
                  Objectifs
                </p>
                <ul className={`space-y-1 text-sm ${isLight ? 'text-[#475569]' : 'text-[#D1D5DB]'}`}>
                  {challenge.objectives.map((objective) => (
                    <li key={objective.label}>• {objective.label}</li>
                  ))}
                </ul>
              </div>

              <button
                type="button"
                onClick={() => startChallenge(challenge)}
                className="mt-auto rounded-lg bg-[#22D3EE] px-4 py-2 text-sm font-bold text-[#111827] transition-colors hover:bg-[#38F2B2]"
              >
                Relever le défi
              </button>
            </article>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 py-8 lg:grid-cols-2">
      <div className="space-y-5">
        <button
          type="button"
          onClick={leaveChallenge}
          className={`rounded-lg border px-3 py-1.5 text-sm font-semibold transition-colors ${
            isLight
              ? 'border-[#CBD5E1] text-[#64748B] hover:border-[#22D3EE] hover:text-[#0891B2]'
              : 'border-[#374151] text-[#9CA3AF] hover:border-[#22D3EE] hover:text-[#22D3EE]'
          }`}
        >
          ← Retour aux défis
        </button>

        <section className={`rounded-xl border p-6 ${isLight ? 'border-[#E2E8F0] bg-white' : 'border-[#1F2937] bg-[#111827]'}`}>
          <div className="mb-4 flex items-start justify-between gap-4">
            <div>
              <h1 className={`font-mono text-xl font-bold ${isLight ? 'text-[#111827]' : 'text-[#F9FAFB]'}`}>
                {activeChallenge.title}
              </h1>
              <p className={`mt-2 text-sm ${isLight ? 'text-[#475569]' : 'text-[#D1D5DB]'}`}>
                {activeChallenge.description}
              </p>
            </div>
            <DifficultyBadge difficulty={activeChallenge.difficulty} />
          </div>

          <p className={`mb-2 text-xs font-semibold uppercase tracking-normal ${isLight ? 'text-[#64748B]' : 'text-[#9CA3AF]'}`}>
            Objectifs en direct
          </p>
          <ObjectiveList
            objectives={activeChallenge.objectives}
            results={results}
            mix={mix}
            flashFailures={flashFailures}
            isLight={isLight}
          />
        </section>

        <MixSliders mix={mix} onChange={setMix} theme={theme} />
      </div>

      <div className="space-y-5">
        <ResultGauges
          co2={results.co2}
          cost={results.cost}
          stability={results.stability}
          renewables={results.renewables}
          lowCarbon={results.lowCarbon}
          theme={theme}
          hideParisBanner={true}
        />

        <button
          type="button"
          onClick={validateChallenge}
          className="w-full rounded-xl bg-[#22D3EE] px-5 py-3 text-sm font-bold text-[#111827] transition-colors hover:bg-[#38F2B2]"
        >
          Valider mon mix
        </button>
      </div>

      {successOpen ? (
        <SuccessModal
          challenge={activeChallenge}
          results={results}
          theme={theme}
          onShare={shareChallenge}
          onClose={leaveChallenge}
        />
      ) : null}
    </div>
  )
}
