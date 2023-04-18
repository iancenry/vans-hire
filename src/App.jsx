import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { Home, About, Vans, VanDetail } from './pages'
import './server'


function App() {
  return (
      <Router> 
        <header>
          <Link className="site-logo" to='/'>#VANLIFE</Link>
          <nav>
            <Link to="/about">About</Link>
            <Link to="/vans">Vans</Link>
          </nav>
        </header>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/vans' element={<Vans />} />
          <Route path='/vans/:id' element={<VanDetail />} />


          <Route path='/host' element={<Host />} >
            <Route path='/host/income' element={<HostIncome />} />
            <Route path='/host/reviews' element={<HostReviews />} />
            <Route path='/host/vans' element={<HostVans />} />
            <Route path='/host/vans/:id' element={<HostVan />} />
            <Route path='/host/vans/:id/pricing' element={<Pricing />} />
            <Route path='/host/vans/:id/photos' element={<Photos />} />
          </ Route>
        </Routes>

        {/* <footer>
          <span>&copy; #VANLIFE</span>
        </footer> */}
      </Router>
    
  )
}

export default App
