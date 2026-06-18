import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { LanguageContext } from '../LanguageContext'
import { useTheme } from '../ThemeContext'

const COPY = {
  fr: {
    description:
      "Composez votre mix électrique, visualisez son impact climatique, et découvrez les scénarios du GIEC.",
    primaryCta: 'Lancer le simulateur →',
    secondaryCta: 'Voir les scénarios GIEC',
    educationTitle: 'Conçu pour apprendre, conçu pour comprendre',
    educationCards: [
      {
        icon: '⚡',
        title: 'Comprendre le mix énergétique',
        body: "Chaque pays tourne sur un cocktail de sources différent. GridSense vous fait ressentir ce qui se passe quand on remplace le charbon par l'éolien, ou le gaz par le nucléaire — en temps réel.",
        borderColor: '#22D3EE',
      },
      {
        icon: '🔌',
        title: 'Maîtriser la stabilité du réseau',
        body: "Les renouvelables sont propres mais intermittents. Comprenez pourquoi un réseau a besoin de sources pilotables — et ce qui se passe quand l'équilibre bascule.",
        borderColor: '#F59E0B',
      },
      {
        icon: '🌱',
        title: 'Naviguer les objectifs climatiques',
        body: "Le GIEC trace quatre futurs, de +1,5°C à +4,4°C. Simulez le mix électrique que chaque trajectoire impose — et mesurez l'écart avec les réseaux d'aujourd'hui.",
        borderColor: '#10B981',
      },
    ],
    featuresTitle: 'Tout ce que GridSense vous offre',
    ready: 'Prêt à explorer votre mix ?',
    stats: [
      ['50', 'pays couverts'],
      ['7', 'filières énergétiques'],
      ['4', 'scénarios GIEC'],
      ['5', "indicateurs d'impact"],
    ],
    features: [
      {
        icon: '⚡',
        color: '#22D3EE',
        title: 'Simulateur interactif',
        body: "7 curseurs, 5 indicateurs en temps réel. Ajustez le mix et observez l'impact CO₂, coût et stabilité réseau.",
        link: 'Essayer →',
        to: '/simulateur',
      },
      {
        icon: '🌍',
        color: '#38F2B2',
        title: 'Scénarios GIEC',
        body: 'SSP1-1.9 à SSP5-8.5 : visualisez les trajectoires CO₂ 2020-2050 et simulez chaque mix cible.',
        link: 'Explorer →',
        to: '/scenarios',
      },
      {
        icon: '🗺️',
        color: '#F59E0B',
        title: 'Carte mondiale',
        body: 'Carte choroplèthe CO₂/kWh de 50 pays. Cliquez sur un pays pour voir son mix et son scénario GIEC.',
        link: 'Découvrir →',
        to: '/carte',
      },
    ],
  },
  en: {
    description: 'Build your electricity mix, visualise its climate impact, and explore IPCC scenarios.',
    primaryCta: 'Launch simulator →',
    secondaryCta: 'View IPCC scenarios',
    educationTitle: 'Built to learn, built to understand',
    educationCards: [
      {
        icon: '⚡',
        title: 'Understand the energy mix',
        body: 'Every country runs on a different cocktail of sources. GridSense lets you feel what happens when you swap coal for wind, or gas for nuclear — in real time.',
        borderColor: '#22D3EE',
      },
      {
        icon: '🔌',
        title: 'Master grid stability',
        body: 'Renewables are clean but intermittent. Learn why a grid needs dispatchable sources — and what happens when the balance tips.',
        borderColor: '#F59E0B',
      },
      {
        icon: '🌱',
        title: 'Navigate climate goals',
        body: "The IPCC maps four futures, from +1.5°C to +4.4°C. Simulate the electricity mix each pathway requires — and see how far today's grids really are.",
        borderColor: '#10B981',
      },
    ],
    featuresTitle: 'Everything GridSense offers',
    ready: 'Ready to explore your mix?',
    stats: [
      ['50', 'countries covered'],
      ['7', 'energy sources'],
      ['4', 'IPCC scenarios'],
      ['5', 'impact indicators'],
    ],
    features: [
      {
        icon: '⚡',
        color: '#22D3EE',
        title: 'Interactive Simulator',
        body: '7 sliders, 5 real-time indicators. Adjust the mix and watch CO₂, cost and grid stability respond.',
        link: 'Try it →',
        to: '/simulateur',
      },
      {
        icon: '🌍',
        color: '#38F2B2',
        title: 'IPCC Scenarios',
        body: 'SSP1-1.9 to SSP5-8.5: visualise CO₂ pathways 2020-2050 and simulate each target mix.',
        link: 'Explore →',
        to: '/scenarios',
      },
      {
        icon: '🗺️',
        color: '#F59E0B',
        title: 'World Map',
        body: 'CO₂/kWh choropleth map of 50 countries. Click a country to see its mix and IPCC scenario.',
        link: 'Discover →',
        to: '/carte',
      },
    ],
  },
}

function EnergyGridBackground() {
  const lines = Array.from({ length: 25 }, (_, index) => index * 40)
  const pulses = [
    { x: 0, y: 80, axis: 'x', distance: 620, duration: '4.5s', delay: '0s' },
    { x: 0, y: 200, axis: 'x', distance: 760, duration: '5.8s', delay: '0.7s' },
    { x: 0, y: 360, axis: 'x', distance: 540, duration: '3.8s', delay: '1.4s' },
    { x: 0, y: 520, axis: 'x', distance: 820, duration: '6s', delay: '2s' },
    { x: 120, y: 0, axis: 'y', distance: 620, duration: '4.2s', delay: '0.35s' },
    { x: 320, y: 0, axis: 'y', distance: 700, duration: '5.2s', delay: '1.1s' },
    { x: 560, y: 0, axis: 'y', distance: 500, duration: '3.6s', delay: '1.8s' },
    { x: 800, y: 0, axis: 'y', distance: 680, duration: '5.6s', delay: '2.4s' },
  ]

  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 960 640"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <filter id="pulse-glow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {lines.map((position) => (
        <line
          key={`v-${position}`}
          x1={position}
          y1="0"
          x2={position}
          y2="640"
          stroke="rgba(34,211,238,0.06)"
          strokeWidth="1"
        />
      ))}
      {lines.map((position) => (
        <line
          key={`h-${position}`}
          x1="0"
          y1={position}
          x2="960"
          y2={position}
          stroke="rgba(34,211,238,0.06)"
          strokeWidth="1"
        />
      ))}
      {pulses.map((pulse, index) => (
        <circle
          key={`${pulse.axis}-${pulse.x}-${pulse.y}`}
          cx={pulse.x}
          cy={pulse.y}
          r="2"
          fill="#22D3EE"
          filter="url(#pulse-glow)"
          style={{
            '--travel-x': pulse.axis === 'x' ? `${pulse.distance}px` : '0px',
            '--travel-y': pulse.axis === 'y' ? `${pulse.distance}px` : '0px',
            animation: `energy-pulse ${pulse.duration} ease-in-out ${pulse.delay} infinite`,
          }}
        >
          <title>{`energy pulse ${index + 1}`}</title>
        </circle>
      ))}
    </svg>
  )
}

function StatNumber({ value }) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    const duration = 1200
    let frameId
    let startTime

    function animate(timestamp) {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplayValue(Math.round(value * eased))

      if (progress < 1) {
        frameId = window.requestAnimationFrame(animate)
      }
    }

    frameId = window.requestAnimationFrame(animate)
    return () => window.cancelAnimationFrame(frameId)
  }, [value])

  return displayValue
}

export default function LandingPage() {
  const theme = useTheme()
  const isLight = theme === 'light'
  const { lang } = useContext(LanguageContext)
  const copy = COPY[lang] ?? COPY.fr

  return (
    <div className={isLight ? 'bg-[#F8FAFC] text-[#111827]' : 'bg-[#0A0F1E] text-[#F9FAFB]'}>
      <style>
        {`
          @keyframes energy-pulse {
            0% { opacity: 0; transform: translate3d(0, 0, 0) scale(0.8); }
            18% { opacity: 1; }
            82% { opacity: 1; }
            100% { opacity: 0; transform: translate3d(var(--travel-x), var(--travel-y), 0) scale(1.15); }
          }

          @keyframes gridsense-pulse {
            0%, 100% { box-shadow: 0 0 0 rgba(34, 211, 238, 0); }
            50% { box-shadow: 0 0 18px rgba(34, 211, 238, 0.55); }
          }
        `}
      </style>
      <section
        className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0B0F1A] px-6 py-20 text-white"
      >
        <EnergyGridBackground />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_32%,rgba(34,211,238,0.20),transparent_42%)]" />
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <p className="mx-auto inline-flex rounded-full border border-[#22D3EE]/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.28em] text-[#22D3EE]">
            DefendHack2 · Juin 2026
          </p>
          <h1 className="mt-8 font-mono text-5xl font-bold tracking-tight md:text-7xl">
            ⚡ GridSense
          </h1>
          <p className="mt-2 text-xl italic text-[#9CA3AF]">See the energy, feel the impact.</p>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-[#D1D5DB] md:text-lg">
            {copy.description}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/simulateur"
              className="rounded-xl bg-[#22D3EE] px-6 py-3 text-sm font-semibold text-[#111827] no-underline shadow-lg shadow-[#22D3EE]/20 transition hover:bg-[#67E8F9]"
              style={{ animation: 'gridsense-pulse 2.4s ease-in-out infinite' }}
            >
              {copy.primaryCta}
            </Link>
            <Link
              to="/scenarios"
              className="rounded-xl border border-[#22D3EE] px-6 py-3 text-sm font-semibold text-[#22D3EE] no-underline transition hover:bg-[#22D3EE]/10"
            >
              {copy.secondaryCta}
            </Link>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-2xl text-[#9CA3AF]" aria-hidden="true">
          ▼
        </div>
      </section>

      <section className={isLight ? 'bg-[#F1F5F9]' : 'bg-[#080C18]'}>
        <div className="mx-auto max-w-7xl px-6 py-20">
          <h2 className="text-center font-mono text-2xl font-bold text-[#22D3EE] md:text-3xl">
            {copy.educationTitle}
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
            {copy.educationCards.map((card) => (
              <article
                key={card.title}
                className={`rounded-2xl border border-l-4 p-6 ${
                  isLight
                    ? 'border-[#E2E8F0] bg-white shadow-sm'
                    : 'border-[#1F2937] bg-[#0F172A]'
                }`}
                style={{ borderLeftColor: card.borderColor }}
              >
                <div className="text-4xl" aria-hidden="true">
                  {card.icon}
                </div>
                <h3 className="mt-5 text-lg font-bold">{card.title}</h3>
                <p className={`mt-3 text-sm leading-6 ${isLight ? 'text-[#64748B]' : 'text-[#9CA3AF]'}`}>
                  {card.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <h2 className="text-center font-mono text-2xl font-bold text-[#22D3EE] md:text-3xl">
          {copy.featuresTitle}
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
          {copy.features.map((feature) => (
            <article
              key={feature.title}
              className={`rounded-2xl border p-6 transition hover:-translate-y-1 hover:border-[#22D3EE] ${
                isLight ? 'border-[#E2E8F0] bg-white shadow-sm' : 'border-[#1F2937] bg-[#111827]'
              }`}
            >
              <div
                className="grid h-12 w-12 place-items-center rounded-xl text-2xl"
                style={{ backgroundColor: `${feature.color}22` }}
                aria-hidden="true"
              >
                {feature.icon}
              </div>
              <h3 className="mt-5 text-lg font-bold">{feature.title}</h3>
              <p className={`mt-3 text-sm leading-6 ${isLight ? 'text-[#64748B]' : 'text-[#9CA3AF]'}`}>
                {feature.body}
              </p>
              <Link
                to={feature.to}
                className="mt-5 inline-flex text-sm font-semibold text-[#22D3EE] no-underline hover:text-[#67E8F9]"
              >
                {feature.link}
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className={isLight ? 'bg-[#F8FAFC]' : 'bg-[#0F172A]'}>
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-6 py-12 text-center md:grid-cols-4">
          {copy.stats.map(([value, label]) => (
            <div key={label}>
              <p className="font-mono text-4xl font-bold text-[#22D3EE]">
                <StatNumber value={Number(value)} />
              </p>
              <p className={`mt-2 text-sm ${isLight ? 'text-[#64748B]' : 'text-[#9CA3AF]'}`}>{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#0B0F1A] px-6 py-16 text-center text-white">
        <h2 className="font-mono text-3xl font-bold">{copy.ready}</h2>
        <Link
          to="/simulateur"
          className="mt-8 inline-flex rounded-xl bg-[#22D3EE] px-6 py-3 text-sm font-semibold text-[#111827] no-underline transition hover:bg-[#67E8F9]"
          style={{ animation: 'gridsense-pulse 2.4s ease-in-out infinite' }}
        >
          {copy.primaryCta}
        </Link>
        <p className="mt-8 text-xs text-[#9CA3AF]">
          <a href="https://github.com/Y0teck/GridSense" target="_blank" rel="noreferrer" className="transition-colors hover:text-[#22D3EE]">GridSense</a>
          {' · '}
          <a href="https://www.youtube.com/c/DefendIntelligence-tech" target="_blank" rel="noreferrer" className="transition-colors hover:text-[#22D3EE]">DefendHack2</a>
          {' · '}
          <a href="https://openai.com/codex" target="_blank" rel="noreferrer" className="transition-colors hover:text-[#22D3EE]">Built with Codex</a>
        </p>
      </section>
    </div>
  )
}
