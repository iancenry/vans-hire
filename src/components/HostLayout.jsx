import { Outlet, NavLink } from "react-router-dom"

const HostLayout = () => {
  const activeStyle = {
    fontWeight: 'bold',
    textDecoration: 'underline',
    color: '#161616'
  }

  return (
    <>
        <nav className="host-nav">
            <NavLink to="/host">Dashboard</NavLink>
            <NavLink to="/host/income" style={({isActive}) => isActive ? activeStyle : null}>Income</NavLink>
            <NavLink to="/host/reviews" style={({isActive}) => isActive ? activeStyle : null}>reviews</NavLink>
        </nav>
        <Outlet />
    </>
  )
}

export default HostLayout