import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { Home, About, Vans, VanDetail } from './pages'
import './server'
import Layout from './components/Layout'


function App() {
  return (
      <Router> 
        <Routes>
          <Route element={<Layout />}>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/vans' element={<Vans />} />
            <Route path='/vans/:id' element={<VanDetail />} />
          </Route>
        </Routes>
      </Router>
    
  )
}

export default App