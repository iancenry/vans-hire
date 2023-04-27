import { useEffect, useState } from "react"
import { Link, useParams, Outlet, NavLink } from "react-router-dom"

const HostVanDetail = () => {
  const {id} = useParams()
  const [currentVan, setCurrentVan] = useState([])
  
  useEffect(()=>{
    fetch(`/api/host/vans/${id}`)
      .then(res => res.json())
      .then(data => setCurrentVan(data.vans))
  }, [])

  //TODO replace with an actual loading state
  if(!currentVan) return <h1>Loading...</h1>

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
        <Outlet />          
      </div>     
    </section>
  )
}

export default HostVanDetail