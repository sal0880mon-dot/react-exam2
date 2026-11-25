import { Link, Outlet } from 'react-router'

function Layout() {
    return (
        <>
            <Link to="/">Home</Link>
            <Link to="/home">info</Link>
            {/* <Link to="/acyns-crud-with-formik">todo</Link> */}
            <Outlet />
        </>
    )
}

export default Layout