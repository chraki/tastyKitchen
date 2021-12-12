import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="failBg2">
    <img
      src="https://i.postimg.cc/kXcrNy1x/Layer-1-1.png"
      className="failImg2"
      alt="not found"
    />
    <h1 className="failHead2">Page Not Found</h1>
    <p className="failPara2">
      we are sorry, the page you requested could not be found
    </p>
    <Link to="/" className="linkBth">
      <button type="button" className="notFoundBtn">
        Home Page
      </button>
    </Link>
  </div>
)

export default NotFound
