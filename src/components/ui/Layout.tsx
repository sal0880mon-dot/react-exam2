import { Link, Outlet } from 'react-router'

function Layout() {
    return (
        <div className='flex gap-[10px]'>
            <Link to="/">Home</Link>
            <Link to="/home">info</Link>
            <Link to="/ref">ref</Link>
            <Link to="/reducer">reducer</Link>
            <Link to="/memo">go to memo</Link>
            <Outlet />
        </div>
    )
}

export default Layout