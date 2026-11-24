// import { createBrowserRouter, RouterProvider } from 'react-router'
import Home from './components/ui/Home'
import About from './components/ui/About'

import { createBrowserRouter, RouterProvider } from 'react-router'
import Layout from './components/ui/Layout'


const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout/>,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: 'about',
                element: <About />
            }
        ]
    }
])

function App() {
    return <RouterProvider router={router} />
}

export default App