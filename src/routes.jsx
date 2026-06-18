import SimulateurPage from './pages/SimulateurPage'
import ComparaisonPage from './pages/ComparaisonPage'
import SourcesPage from './pages/SourcesPage'
import AllerPlusLoinPage from './pages/AllerPlusLoinPage'
import QuizPage from './pages/QuizPage'
import GlossairePage from './pages/GlossairePage'
import CartePage from './pages/CartePage'
import EnergiesPage from './pages/EnergiesPage'

export const ROUTES = [
  { path: '/', key: 'simulator', element: <SimulateurPage /> },
  { path: '/carte', key: 'carte', element: <CartePage /> },
  { path: '/energies', key: 'energies', element: <EnergiesPage /> },
  { path: '/comparaison', key: 'comparison', element: <ComparaisonPage /> },
  { path: '/quiz', key: 'challenges', element: <QuizPage /> },
  { path: '/glossaire', aliases: ['/glossary'], key: 'glossaire', element: <GlossairePage /> },
  { path: '/aller-plus-loin', key: 'goFurther', element: <AllerPlusLoinPage /> },
  { path: '/sources', key: 'sources', element: <SourcesPage />, navRight: true },
]
