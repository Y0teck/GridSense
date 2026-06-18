import SimulateurPage from './pages/SimulateurPage'
import ComparaisonPage from './pages/ComparaisonPage'
import SourcesPage from './pages/SourcesPage'
import AllerPlusLoinPage from './pages/AllerPlusLoinPage'
import QuizPage from './pages/QuizPage'

export const ROUTES = [
  { path: '/', key: 'simulator', element: <SimulateurPage /> },
  { path: '/comparaison', key: 'comparison', element: <ComparaisonPage /> },
  { path: '/quiz', key: 'challenges', element: <QuizPage /> },
  { path: '/sources', key: 'sources', element: <SourcesPage /> },
  { path: '/aller-plus-loin', key: 'goFurther', element: <AllerPlusLoinPage /> },
]
