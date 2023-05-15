import { Link, NavLink } from "react-router-dom"

const Header = () => {
  return (
        <header>
          <Link className="site-logo" to='/'>#VANLIFE</Link>
          <nav>
            <NavLink to="/host" className={({isActive}) => isActive ? "active-link" : null}>Host</NavLink>
            <NavLink to="/about" className={({isActive}) => isActive ? "active-link" : null}>About</NavLink>
            <NavLink to="/vans" className={({isActive}) => isActive ? "active-link" : null}>Vans</NavLink>
            <Link to="login" className="login-link"><img src="/src/assets/images/avatar-icon.png" className="login-icon" /> </Link>
          </nav>
        </header>
  )
}

export default Header