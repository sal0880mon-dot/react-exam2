
import { createBrowserRouter, RouterProvider } from 'react-router'
import Layout from './components/ui/Layout'
import { lazy, Suspense } from 'react'

const Home=lazy(()=> import('./components/ui/Home'))
const About=lazy(()=> import('./components/ui/About'))

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout/>,
        children: [
            {
                index: true,
                element: <About />
            },
            {
                path: 'home',
                element: <Home />
            }
        ]
    }
])

function App() {
    return (
        <Suspense fallback={<h1>Loading...</h1>}>
            <RouterProvider router={router} />
        </Suspense>
    )
}

export default App