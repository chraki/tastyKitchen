import {useState} from 'react'
import Cookies from 'js-cookie'
import {Link, withRouter} from 'react-router-dom'

import './index.css'

const Header = props => {
  const {history} = props

  const [isHomeActive, setHomeActive] = useState(false)
  const [isCartActive, setCartActive] = useState(false)

  const onLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  //   const activeHomeStatus = () => {
  //     setHomeActive(true)
  //   }

  //   const activeCartStatus = () => {
  //     setCartActive(!isCartActive)
  //   }

  const homeClass = isHomeActive ? 'selectedHeader' : 'unSelectedHeader'
  const cartClass = isCartActive ? 'selectedHeader' : 'unSelectedHeader'

  return (
    <nav className="navBg">
      <div className="headerLogoContainer">
        <Link
          to="/"
          className="linkStyle headerLogoContainer"
          //   onClick={homeClick}
        >
          <img
            src="https://i.postimg.cc/q77SwTfk/Company-Logo.png"
            className="HeaderLogo"
            alt="website logo"
          />
          <h1 className="HeaderlogoName">Tasty Kitchens</h1>
        </Link>
      </div>
      <ul className="headerUl">
        <li className={`eachHeaderItem ${homeClass}`}>
          <Link to="/" className={`eachHeaderItem ${homeClass}`}>
            <span>Home</span>
          </Link>
        </li>
        <li className={`eachHeaderItem ${cartClass}`}>
          <Link to="/cart" className={`eachHeaderItem ${cartClass}`}>
            <span>Cart</span>
          </Link>
        </li>
        <li className="eachHeaderItem">
          <button className="logoutButton" onClick={onLogout} type="button">
            Logout
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default withRouter(Header)
