import { Link,  Outlet, NavLink, useLoaderData } from "react-router-dom"
import { getHostVans } from "../../api"
import  { requireAuth } from "../../utils"

export async function hostVanDetailLoader({params}){
  await requireAuth()
  return getHostVans(params.id)
}

const HostVanDetail = () => {
  const currentVan= useLoaderData()

  return (
    <section>
      <Link to=".." className="back-button" relative="path">&larr; <span>Back to all vans</span></Link>
      <div className="host-van-detail-layout-container">
        <div className="host-van-detail">
          <img src={`/src/assets/images/${currentVan.imageUrl}`} alt={currentVan.name}/>  
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
    </section>
  )
}

export default HostVanDetail