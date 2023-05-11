import './App.css'
import './server'
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route} from 'react-router-dom'
import { Home, About, Vans, VanDetail, Dashboard, Income, Reviews, HostVans, HostVanDetail, HostVanInfo, HostVanPhotos, HostVanPricing, NotFound } from './pages'
import { Layout, HostLayout } from './components'

const router = createBrowserRouter(createRoutesFromElements(
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
    <Route path="*" element={<NotFound />} />
  </Route> 

))

function App() {
  return (
      <RouterProvider router={router} />    
  )
}

export default App