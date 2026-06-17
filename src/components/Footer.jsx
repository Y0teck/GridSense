// Source donnees : references indicatives IPCC, IRENA et ODRE / RTE.

export default function Footer({ theme }) {
  const isLight = theme === 'light'

  return (
    <footer
      className={`mx-auto max-w-7xl px-4 pb-28 pt-6 text-xs leading-relaxed sm:px-6 lg:px-8 ${
        isLight ? 'text-[#475569]' : 'text-[#9CA3AF]'
      }`}
    >
      ÉnergIA - Hackathon 48h · Coefficients CO₂ : IPCC AR6 WGIII (2022) ·
      Coûts : IRENA (2023) · Production : ODRÉ/RTE · Valeurs indicatives
    </footer>
  )
}
