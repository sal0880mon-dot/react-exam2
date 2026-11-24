import { Link, Outlet } from 'react-router'

function Layout() {
    return (
        <>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>

            <Outlet />
        </>
    )
}

export default Layout