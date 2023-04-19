import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { Home, About, Vans, VanDetail, Dashboard, Income, Reviews } from './pages'
import './server'
import { Layout, HostLayout } from './components'


function App() {
  return (
      <Router> 
        <Routes>
          <Route element={<Layout />}>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/vans' element={<Vans />} />
            <Route path='/vans/:id' element={<VanDetail />} />
            
            <Route path='/host' element={<HostLayout />} >
              <Route path="/host/income" element={<Income />} />
              <Route path="/host/reviews" element={<Reviews />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    
  )
}

export default App