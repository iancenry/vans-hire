import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { Home, About } from './pages'


function App() {
  return (
      <Router> 
        <header>
          <Link className="site-logo" to='/'>#VANLIFE</Link>
          <nav>
            <Link to="/about">About</Link>
          </nav>
        </header>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
        </Routes>
      </Router>
    
  )
}

export default App
