import { Link, NavLink } from "react-router-dom"
import avatarIcon from "/src/assets/images/avatar-icon.png"

const Header = () => {
  return (
        <header>
          <Link className="site-logo" to='/'>#VANLIFE</Link>
          <nav>
            <NavLink to="/host" className={({isActive}) => isActive ? "active-link" : null}>Host</NavLink>
            <NavLink to="/about" className={({isActive}) => isActive ? "active-link" : null}>About</NavLink>
            <NavLink to="/vans" className={({isActive}) => isActive ? "active-link" : null}>Vans</NavLink>
            <Link to="login" className="login-link"><img src={avatarIcon} className="login-icon" /> </Link>
          </nav>
        </header>
  )
}

export default Header