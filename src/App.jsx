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
    <Route path='vans/:id' element={<VanDetail />} loader={vanDetailLoader} errorElement={<Error />} />
            
    <Route path='host' element={<HostLayout />} >
      <Route index element={<Dashboard />} loader={async({request}) => await requireAuth(request)}/>
      <Route path="income" element={<Income />} loader={async({request}) => await requireAuth(request)}/>
      <Route path="reviews" element={<Reviews />} loader={async({request}) => await requireAuth(request)}/>
      <Route path="vans" element={<HostVans />} loader={hostVansLoader} errorElement={<Error />}/>

      <Route path="vans/:id" element={<HostVanDetail />} loader={hostVanDetailLoader} errorElement={<Error />}>
        <Route index element={<HostVanInfo />} loader={async({request}) => await requireAuth(request)}/>
        <Route path="pricing" element={<HostVanPricing />} loader={async({request}) => await requireAuth(request)}/>
        <Route path="photos" element={<HostVanPhotos />} loader={async({request}) => await requireAuth(request)}/>
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