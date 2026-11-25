import { Link, Outlet } from 'react-router'

function Layout() {
    return (
        <>
            <Link to="/">Home</Link>
            <Link to="/home">info</Link>
            <Outlet />
        </>
    )
}

export default Layout