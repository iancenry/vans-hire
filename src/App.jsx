import './App.css'
import './server'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { Home, About, Vans, VanDetail, Dashboard, Income, Reviews, HostVans, HostVanDetail, HostVanInfo, HostVanPhotos, HostVanPricing } from './pages'
import { Layout, HostLayout } from './components'


function App() {
  return (
      <Router> 
        <Routes>
          <Route element={<Layout />}>
            <Route path='/' element={<Home />} />
            <Route path='about' element={<About />} />
            <Route path='vans' element={<Vans />} />
            <Route path='vans/:id' element={<VanDetail />} />
            
            <Route path='host' element={<HostLayout />} >
              <Route index element={<Dashboard />} />
              <Route path="income" element={<Income />} />
              <Route path="reviews" element={<Reviews />} />
              <Route path="vans" element={<HostVans />} />

              <Route path="vans/:id" element={<HostVanDetail />} >
                <Route index element={<HostVanInfo />} />
                <Route path="pricing" element={<HostVanPricing />} />
                <Route path="photos" element={<HostVanPhotos />} />
              </Route>
            </Route>
            <Route path="*" element={<h1>Page Not Found</h1>} />
          </Route>
        </Routes>
      </Router>
    
  )
}

export default App