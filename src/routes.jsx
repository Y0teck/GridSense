import LandingPage from './pages/LandingPage'
import SimulateurPage from './pages/SimulateurPage'
import ComparaisonPage from './pages/ComparaisonPage'
import SourcesPage from './pages/SourcesPage'
import AllerPlusLoinPage from './pages/AllerPlusLoinPage'
import QuizPage from './pages/QuizPage'
import GlossairePage from './pages/GlossairePage'
import CartePage from './pages/CartePage'
import EnergiesPage from './pages/EnergiesPage'
import ScenariosPage from './pages/ScenariosPage'

export const ROUTES = [
  { path: '/', key: 'landing', element: <LandingPage />, hidden: true },
  { path: '/simulateur', key: 'simulator', element: <SimulateurPage /> },
  { path: '/scenarios', key: 'scenarios', element: <ScenariosPage /> },
  { path: '/carte', key: 'carte', element: <CartePage /> },
  { path: '/comparaison', key: 'comparison', element: <ComparaisonPage /> },
  { path: '/energies', key: 'energies', element: <EnergiesPage /> },
  { path: '/quiz', key: 'challenges', element: <QuizPage /> },
  { path: '/glossaire', aliases: ['/glossary'], key: 'glossaire', element: <GlossairePage /> },
  { path: '/aller-plus-loin', key: 'goFurther', element: <AllerPlusLoinPage /> },
  { path: '/sources', key: 'sources', element: <SourcesPage />, navRight: true },
]
