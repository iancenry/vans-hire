import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <div className="NotFound-page">
        <h1>Sorry, the page you were looking for was not found</h1>
        <Link to="/" className="link-button">Return to home</Link>
    </div>
  )
}

export default NotFound