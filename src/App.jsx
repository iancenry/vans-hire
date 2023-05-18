import './App.css'
import './server'
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route} from 'react-router-dom'
import { Home, About, Vans, loader as vansLoader, VanDetail, loader2 as vanDetailLoader, Dashboard, Income, Reviews, HostVans, HostVanDetail, HostVanInfo, HostVanPhotos, HostVanPricing, NotFound, Login } from './pages'
import { Layout, HostLayout, Error } from './components'

const router = createBrowserRouter(createRoutesFromElements(
  <Route element={<Layout />}>
    <Route path='/' element={<Home />} />
    <Route path="login" element={<Login/>} />
    <Route path='about' element={<About />} />
    <Route path='vans' element={<Vans />} loader={vansLoader} errorElement={<Error />}/>
    <Route path='vans/:id' element={<VanDetail />} loader={vanDetailLoader} />
            
    <Route path='host' element={<HostLayout />} >
      <Route index element={<Dashboard />} loader={async() => {return null}}/>
      <Route path="income" element={<Income />} loader={async() => {return null}}/>
      <Route path="reviews" element={<Reviews />} loader={async() => {return null}}/>
      <Route path="vans" element={<HostVans />} loader={async() => {return null}}/>

      <Route path="vans/:id" element={<HostVanDetail />} loader={async() => {return null}}>
        <Route index element={<HostVanInfo />} loader={async() => {return null}}/>
        <Route path="pricing" element={<HostVanPricing />} loader={async() => {return null}}/>
        <Route path="photos" element={<HostVanPhotos />} loader={async() => {return null}}/>
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