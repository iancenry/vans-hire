import './App.css'
import './server'
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route} from 'react-router-dom'
import { Home, About, Vans, vansLoader, VanDetail, vanDetailLoader, Dashboard, Income, Reviews, HostVans, hostVansLoader, HostVanDetail, hostVanDetailLoader,
   HostVanInfo, HostVanPhotos, HostVanPricing, NotFound, Login, loginLoader, action as loginAction } from './pages' 
import { Layout, HostLayout, Error } from './components'
import { requireAuth } from './utils'

const router = createBrowserRouter(createRoutesFromElements(
  <Route element={<Layout />}>
    <Route path='/' element={<Home />} />
    <Route path="login" element={<Login/>} loader={loginLoader} action={loginAction} />
    <Route path='about' element={<About />} />
    <Route path='vans' element={<Vans />} loader={vansLoader} errorElement={<Error />}/>
    <Route path='vans/:id' element={<VanDetail />} loader={vanDetailLoader} />
            
    <Route path='host' element={<HostLayout />} >
      <Route index element={<Dashboard />} loader={async() => await requireAuth()}/>
      <Route path="income" element={<Income />} loader={async() => await requireAuth()}/>
      <Route path="reviews" element={<Reviews />} loader={async() => await requireAuth()}/>
      <Route path="vans" element={<HostVans />} loader={hostVansLoader}/>

      <Route path="vans/:id" element={<HostVanDetail />} loader={hostVanDetailLoader}>
        <Route index element={<HostVanInfo />} loader={async() => await requireAuth()}/>
        <Route path="pricing" element={<HostVanPricing />} loader={async() => await requireAuth()}/>
        <Route path="photos" element={<HostVanPhotos />} loader={async() => await requireAuth()}/>
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