
import { createBrowserRouter, RouterProvider } from 'react-router'
import Layout from './components/ui/Layout'
import { lazy, Suspense } from 'react'
import PracticeWithRef from './components/ui/PracticeWithRef'
import { PracticeWithUseReducer } from './components/ui/PracticeWithUseReducer'
import { ThemeProvider } from './components/ui/ThemeContext'
import PracticeMemo from './components/ui/PracticeMemo'

const Home = lazy(() => import('./components/ui/Home'))
const About = lazy(() => import('./components/ui/About'))

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <About />
            },
            {
                path: 'home',
                element: <Home />
            },
            {
                path: 'ref',
                element: <PracticeWithRef />
            },
            {
                path: 'reducer',
                element: <PracticeWithUseReducer />
            },
            {
                path: 'memo',
                element: <PracticeMemo/>
            },
        ]
    }
])


function App() {
    return (
        <ThemeProvider>
            <Suspense fallback={<h1>Loading...</h1>} >
                <RouterProvider router={router} />
            </Suspense>
        </ThemeProvider>

    )
}

export default App