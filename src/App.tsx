// import { createBrowserRouter, RouterProvider } from 'react-router'
import Home from './components/ui/Home'
import About from './components/ui/About'

import { createBrowserRouter, RouterProvider } from 'react-router'
import Layout from './components/ui/Layout'
import AsyncCrudWithFormik from './components/ui/AsyncCrudWithFormik'


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
            },
            {
                path: 'acyns-crud-with-formik',
                element: <AsyncCrudWithFormik/>
            },
        ]
    }
])

function App() {
    return <RouterProvider router={router} />
}

export default App