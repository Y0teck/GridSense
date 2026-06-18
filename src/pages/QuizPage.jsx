import { useContext, useState } from 'react'
import MixSliders from '../components/MixSliders'
import ResultGauges from '../components/ResultGauges'
import { useTheme } from '../ThemeContext'
import { LanguageContext } from '../LanguageContext'
import { useStrings } from '../i18n/useStrings'
import { calculateResults } from '../utils/calculations'

const CHALLENGES = [
  {
    id: 'paris',
    title: 'Objectif Accord de Paris',
    titleEn: 'Paris Agreement Target',
    difficulty: 'Facile',
    description: 'Composez un mix électrique compatible avec une trajectoire 1,5°C.',
    descriptionEn: 'Build an electricity mix compatible with a 1.5°C pathway.',
    startMix: { nucleaire: 10, eolien: 15, solaire: 10, hydraulique: 10, gaz: 30, charbon: 20, bioenergies: 5 },
    objectives: [
      { label: 'CO2 < 50 gCO2eq/kWh', check: (results) => results.co2 < 50 },
    ],
    objectivesEn: [
      { label: 'CO₂ < 50 gCO₂eq/kWh', check: (results) => results.co2 < 50 },
    ],
    successExamples: [
      '🇫🇷 France (~34 gCO2eq/kWh) — grâce à son parc nucléaire dominant',
      '🇸🇪 Suède (~13 gCO2eq/kWh) — mix nucléaire + hydraulique',
      '🇳🇴 Norvège (~26 gCO2eq/kWh) — quasi 100% hydraulique',
    ],
    successExamplesEn: [
      '🇫🇷 France (~34 gCO₂eq/kWh) — thanks to its dominant nuclear fleet',
      '🇸🇪 Sweden (~13 gCO₂eq/kWh) — nuclear + hydro mix',
      '🇳🇴 Norway (~26 gCO₂eq/kWh) — almost 100% hydropower',
    ],
  },
  {
    id: 'renewables',
    title: 'Mix majoritairement renouvelable',
    titleEn: 'Majority Renewable Mix',
    difficulty: 'Facile',
    description: 'Faites passer les énergies renouvelables au-dessus de 60% du mix.',
    descriptionEn: 'Push renewable energy above 60% of the mix.',
    startMix: { nucleaire: 30, eolien: 10, solaire: 8, hydraulique: 10, gaz: 25, charbon: 12, bioenergies: 5 },
    objectives: [
      { label: 'Renouvelables >= 60 %', check: (results) => results.renewables >= 60 },
    ],
    objectivesEn: [
      { label: 'Renewables ≥ 60 %', check: (results) => results.renewables >= 60 },
    ],
    successExamples: [
      "🇳🇴 Norvège (~98% renouvelables) — champion mondial de l'hydraulique",
      '🇧🇷 Brésil (~85% renouvelables) — hydraulique + éolien + solaire',
      "🇩🇪 Allemagne (~59% renouvelables) — forte montée de l'éolien et du solaire",
    ],
    successExamplesEn: [
      '🇳🇴 Norway (~98% renewables) — world hydropower champion',
      '🇧🇷 Brazil (~85% renewables) — hydro + wind + solar',
      '🇩🇪 Germany (~59% renewables) — strong growth in wind and solar',
    ],
  },
  {
    id: 'competitive',
    title: 'Mix vert et compétitif',
    titleEn: 'Green and Competitive Mix',
    difficulty: 'Moyen',
    description: 'Trouvez un mix à la fois économique et renouvelable.',
    descriptionEn: 'Find a mix that is both affordable and renewable.',
    startMix: { nucleaire: 5, eolien: 10, solaire: 8, hydraulique: 8, gaz: 40, charbon: 25, bioenergies: 4 },
    objectives: [
      { label: 'Coût <= 70 EUR/MWh', check: (results) => results.cost <= 70 },
      { label: 'Renouvelables >= 40 %', check: (results) => results.renewables >= 40 },
    ],
    objectivesEn: [
      { label: 'Cost ≤ 70 €/MWh', check: (results) => results.cost <= 70 },
      { label: 'Renewables ≥ 40 %', check: (results) => results.renewables >= 40 },
    ],
    successExamples: [
      '🇪🇸 Espagne (~58% renouvelables, coût modéré) — solaire + éolien en forte croissance',
      '🇧🇷 Brésil (~85% renouvelables, LCOE compétitif) — hydraulique pilotable et peu coûteux',
    ],
    successExamplesEn: [
      '🇪🇸 Spain (~58% renewables, moderate cost) — solar + wind in strong growth',
      '🇧🇷 Brazil (~85% renewables, competitive LCOE) — dispatchable and low-cost hydro',
    ],
  },
  {
    id: 'nonuclear',
    title: 'Décarboner sans nucléaire',
    titleEn: 'Decarbonise Without Nuclear',
    difficulty: 'Moyen',
    description: 'Atteignez une faible intensité carbone en utilisant uniquement les renouvelables.',
    descriptionEn: 'Reach low carbon intensity using renewables only.',
    startMix: { nucleaire: 0, eolien: 15, solaire: 10, hydraulique: 10, gaz: 40, charbon: 20, bioenergies: 5 },
    objectives: [
      { label: 'Nucléaire = 0 %', check: (_, mix) => mix.nucleaire === 0 },
      { label: 'CO2 < 150 gCO2eq/kWh', check: (results) => results.co2 < 150 },
      { label: 'Stabilité >= 50', check: (results) => results.stability >= 50 },
    ],
    objectivesEn: [
      { label: 'Nuclear = 0 %', check: (_, mix) => mix.nucleaire === 0 },
      { label: 'CO₂ < 150 gCO₂eq/kWh', check: (results) => results.co2 < 150 },
      { label: 'Stability ≥ 50', check: (results) => results.stability >= 50 },
    ],
    successExamples: [
      "🇳🇴 Norvège (0% nucléaire, ~26 gCO2eq/kWh) — preuve que c'est possible avec l'hydraulique",
      '🇧🇷 Brésil (0% nucléaire, faible CO2) — combinaison hydraulique + éolien + solaire',
    ],
    successExamplesEn: [
      "🇳🇴 Norway (0% nuclear, ~26 gCO₂eq/kWh) — proof it's possible with hydro",
      '🇧🇷 Brazil (0% nuclear, low CO₂) — hydro + wind + solar combination',
    ],
  },
  {
    id: 'stable_paris',
    title: 'Accord de Paris ET réseau stable',
    titleEn: 'Paris Agreement AND Stable Grid',
    difficulty: 'Difficile',
    description: 'Décarbonez le mix sans sacrifier la stabilité du réseau.',
    descriptionEn: 'Decarbonise the mix without sacrificing grid stability.',
    startMix: { nucleaire: 5, eolien: 20, solaire: 20, hydraulique: 10, gaz: 25, charbon: 15, bioenergies: 5 },
    objectives: [
      { label: 'CO2 < 50 gCO2eq/kWh', check: (results) => results.co2 < 50 },
      { label: 'Stabilité >= 60', check: (results) => results.stability >= 60 },
    ],
    objectivesEn: [
      { label: 'CO₂ < 50 gCO₂eq/kWh', check: (results) => results.co2 < 50 },
      { label: 'Stability ≥ 60', check: (results) => results.stability >= 60 },
    ],
    successExamples: [
      '🇫🇷 France (~34 gCO2eq/kWh, stabilité ~85) — le nucléaire pilotable est la clé',
      '🇸🇪 Suède (~13 gCO2eq/kWh, stabilité ~90) — nucléaire + hydraulique, très pilotable',
    ],
    successExamplesEn: [
      '🇫🇷 France (~34 gCO₂eq/kWh, stability ~85) — dispatchable nuclear is the key',
      '🇸🇪 Sweden (~13 gCO₂eq/kWh, stability ~90) — nuclear + hydro, highly dispatchable',
    ],
  },
  {
    id: 'perfect',
    title: 'Le mix parfait',
    titleEn: 'The Perfect Mix',
    difficulty: 'Difficile',
    description: 'Trouvez un mix qui satisfait simultanément quatre contraintes exigeantes.',
    descriptionEn: 'Find a mix that simultaneously satisfies four demanding constraints.',
    startMix: { nucleaire: 10, eolien: 15, solaire: 10, hydraulique: 8, gaz: 30, charbon: 22, bioenergies: 5 },
    objectives: [
      { label: 'CO2 < 100 gCO2eq/kWh', check: (results) => results.co2 < 100 },
      { label: 'Coût <= 75 EUR/MWh', check: (results) => results.cost <= 75 },
      { label: 'Stabilité >= 60', check: (results) => results.stability >= 60 },
      { label: 'Renouvelables >= 40 %', check: (results) => results.renewables >= 40 },
    ],
    objectivesEn: [
      { label: 'CO₂ < 100 gCO₂eq/kWh', check: (results) => results.co2 < 100 },
      { label: 'Cost ≤ 75 €/MWh', check: (results) => results.cost <= 75 },
      { label: 'Stability ≥ 60', check: (results) => results.stability >= 60 },
      { label: 'Renewables ≥ 40 %', check: (results) => results.renewables >= 40 },
    ],
    successExamples: [
      '🇫🇷 France — CO2 ~34, coût ~65, stabilité ~85, renouvelables ~28% (presque !)',
      '🇪🇸 Espagne — bon équilibre renouvelables + stabilité + coût modéré',
      '🇸🇪 Suède — CO2 et stabilité excellents, renouvelables élevés',
    ],
    successExamplesEn: [
      '🇫🇷 France — CO₂ ~34, cost ~65, stability ~85, renewables ~28% (almost!)',
      '🇪🇸 Spain — good balance of renewables + stability + moderate cost',
      '🇸🇪 Sweden — excellent CO₂ and stability, high renewables',
    ],
  },
]

const DIFFICULTY_STYLES = {
  Facile: 'border-[#10B981] bg-[#10B981]/10 text-[#10B981]',
  Moyen: 'border-[#F59E0B] bg-[#F59E0B]/10 text-[#F59E0B]',
  Difficile: 'border-[#EF4444] bg-[#EF4444]/10 text-[#EF4444]',
}

function getDifficultyLabel(difficulty, s) {
  if (difficulty === 'Facile') return s.quiz.difficulty.easy
  if (difficulty === 'Moyen') return s.quiz.difficulty.medium
  return s.quiz.difficulty.hard
}

function getChallengeTitle(challenge, lang) {
  return lang === 'en' ? challenge.titleEn : challenge.title
}

function getChallengeDescription(challenge, lang) {
  return lang === 'en' ? challenge.descriptionEn : challenge.description
}

function getChallengeObjectives(challenge, lang) {
  return lang === 'en' ? challenge.objectivesEn : challenge.objectives
}

function getChallengeSuccessExamples(challenge, lang) {
  return lang === 'en' ? challenge.successExamplesEn : challenge.successExamples
}

function DifficultyBadge({ difficulty, label }) {
  return (
    <span className={`rounded-full border px-2.5 py-1 text-xs font-bold ${DIFFICULTY_STYLES[difficulty]}`}>
      {label}
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
  const s = useStrings()
  const { lang } = useContext(LanguageContext)
  const challengeTitle = getChallengeTitle(challenge, lang)
  const successExamples = getChallengeSuccessExamples(challenge, lang)

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
            <p className="font-mono text-2xl font-bold text-[#22D3EE]">{s.quiz.successTitle}</p>
            <h2 className="mt-2 text-lg font-bold">{challengeTitle}</h2>
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
            [s.gauges.co2.label, `${results.co2} gCO2eq/kWh`],
            [s.gauges.cost.label, `${results.cost} EUR/MWh`],
            [s.gauges.stability.label, `${results.stability}`],
            [s.gauges.renewables.label, `${results.renewables}%`],
            [s.gauges.lowCarbon.label, `${results.lowCarbon}%`],
          ].map(([label, value]) => (
            <div key={label} className={`rounded-lg border p-3 ${isLight ? 'border-[#E2E8F0]' : 'border-[#1F2937]'}`}>
              <p className={isLight ? 'text-xs text-[#64748B]' : 'text-xs text-[#9CA3AF]'}>{label}</p>
              <p className="mt-1 font-mono text-sm font-bold">{value}</p>
            </div>
          ))}
        </div>

        {successExamples?.length ? (
          <div className="mb-6">
            <p className={`mb-2 text-xs font-semibold uppercase tracking-normal ${isLight ? 'text-[#64748B]' : 'text-[#9CA3AF]'}`}>
              {s.quiz.successExamplesTitle}
            </p>
            <ul className="space-y-1">
              {successExamples.map((example) => (
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
            {s.quiz.shareBtn}
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
            {s.quiz.nextChallengeBtn}
          </button>
        </div>
      </section>
    </div>
  )
}

export default function QuizPage() {
  const theme = useTheme()
  const isLight = theme === 'light'
  const s = useStrings()
  const { lang } = useContext(LanguageContext)
  const [activeChallenge, setActiveChallenge] = useState(null)
  const [mix, setMix] = useState(null)
  const [successOpen, setSuccessOpen] = useState(false)
  const [flashFailures, setFlashFailures] = useState(false)

  const results = mix ? calculateResults(mix) : null
  const activeObjectives = activeChallenge ? getChallengeObjectives(activeChallenge, lang) : []

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
    const allPassed = activeObjectives.every((objective) => objective.check(results, mix))

    if (allPassed) {
      setSuccessOpen(true)
      return
    }

    setFlashFailures(true)
    window.setTimeout(() => setFlashFailures(false), 1000)
  }

  async function shareChallenge() {
    const shareData = {
      title: `ÉnergIA — ${getChallengeTitle(activeChallenge, lang)}`,
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
          <h1 className="font-mono text-2xl font-bold text-[#22D3EE]">{s.quiz.title}</h1>
          <p className={`mt-2 max-w-2xl text-sm ${isLight ? 'text-[#64748B]' : 'text-[#9CA3AF]'}`}>
            {s.quiz.subtitle}
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
                  {getChallengeTitle(challenge, lang)}
                </h2>
                <DifficultyBadge difficulty={challenge.difficulty} label={getDifficultyLabel(challenge.difficulty, s)} />
              </div>

              <p className={`mb-4 text-sm ${isLight ? 'text-[#475569]' : 'text-[#D1D5DB]'}`}>
                {getChallengeDescription(challenge, lang)}
              </p>

              <div className="mb-5">
                <p className={`mb-2 text-xs font-semibold uppercase tracking-normal ${isLight ? 'text-[#64748B]' : 'text-[#9CA3AF]'}`}>
                  {s.quiz.objectivesTitle}
                </p>
                <ul className={`space-y-1 text-sm ${isLight ? 'text-[#475569]' : 'text-[#D1D5DB]'}`}>
                  {getChallengeObjectives(challenge, lang).map((objective) => (
                    <li key={objective.label}>• {objective.label}</li>
                  ))}
                </ul>
              </div>

              <button
                type="button"
                onClick={() => startChallenge(challenge)}
                className="mt-auto rounded-lg bg-[#22D3EE] px-4 py-2 text-sm font-bold text-[#111827] transition-colors hover:bg-[#38F2B2]"
              >
                {s.quiz.startBtn}
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
          {s.quiz.backBtn}
        </button>

        <section className={`rounded-xl border p-6 ${isLight ? 'border-[#E2E8F0] bg-white' : 'border-[#1F2937] bg-[#111827]'}`}>
          <div className="mb-4 flex items-start justify-between gap-4">
            <div>
              <h1 className={`font-mono text-xl font-bold ${isLight ? 'text-[#111827]' : 'text-[#F9FAFB]'}`}>
                {getChallengeTitle(activeChallenge, lang)}
              </h1>
              <p className={`mt-2 text-sm ${isLight ? 'text-[#475569]' : 'text-[#D1D5DB]'}`}>
                {getChallengeDescription(activeChallenge, lang)}
              </p>
            </div>
            <DifficultyBadge difficulty={activeChallenge.difficulty} label={getDifficultyLabel(activeChallenge.difficulty, s)} />
          </div>

          <p className={`mb-2 text-xs font-semibold uppercase tracking-normal ${isLight ? 'text-[#64748B]' : 'text-[#9CA3AF]'}`}>
            {s.quiz.objectivesTitle}
          </p>
          <ObjectiveList
            objectives={activeObjectives}
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
          {s.quiz.validateBtn}
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
