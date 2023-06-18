import { Link,  Outlet, NavLink, useLoaderData, defer, Await } from "react-router-dom"
import { getVan } from "../../api"
import  { requireAuth } from "../../utils"
import { Suspense } from "react"

export async function hostVanDetailLoader({params, request}){
  await requireAuth(request)
  return defer({hostVan : getVan(params.id)})
}

const HostVanDetail = () => {
  const hostVanDetailLoaderPromise = useLoaderData()

  function renderHostVan(currentVan){
    return (
      <div className="host-van-detail-layout-container">
      <div className="host-van-detail">
        <img src={currentVan.imageUrl} alt={currentVan.name}/>  
        <div className="host-van-detail-info-text">
        <i className={`van-button van-button-${currentVan?.type}`}>{currentVan.type}</i>         
        <h3>{currentVan.name}</h3>
        <h4>${currentVan.price}/day</h4>
        </div>
      </div>

      <nav className="host-van-detail-nav">
        <NavLink end to="." className={({isActive}) => isActive ? "active-link" : null}>Info</NavLink>
        <NavLink to="pricing" className={({isActive}) => isActive ? "active-link" : null}>Pricing</NavLink>
        <NavLink to="photos" className={({isActive}) => isActive ? "active-link" : null}>Photos</NavLink>
      </nav>
      <Outlet context={{currentVan}} />          
    </div>  

    )
  }

  return (
    <section>
      <Link to=".." className="back-button" relative="path">&larr; <span>Back to all vans</span></Link>
      <Suspense fallback={ <div className='loader'><img src={`/src/assets/images/clouds-spinner.gif`} alt="loader" /></div>}>
        <Await resolve={hostVanDetailLoaderPromise.hostVan}>
          {renderHostVan}
        </Await>
      </Suspense>      
    </section>
  )
}

export default HostVanDetail