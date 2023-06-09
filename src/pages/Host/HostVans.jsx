import { Link, useLoaderData } from "react-router-dom"
import { getHostVans } from "../../api"
import  { requireAuth } from "../../utils"

export async function hostVansLoader({request}) {
  //ensure that it runs completely before we get the list of vans
  await requireAuth(request)
  return getHostVans()
}

const HostVans = () => {
  const hostvans = useLoaderData() 

  const hostVansEls = hostvans.map(van => (
    <Link to={van.id}  key={van.id} className="host-van-link-wrapper">
      <div className="host-van-single"  key={van.id}>
        <img src={`/src/assets/images/${van.imageUrl}`} alt={van.name} />
        <div className="host-van-info">
          <h3>{van.name}</h3>
          <p>${van.price}/day</p>
        </div>
      </div>
    </Link>
  ))

  return (
    <section>
      <h1 className="host-vans-title">Your listed vans</h1>
      <div className="host-vans-list">
         <section>{hostVansEls}</section>
      </div>
    </section>
  )
}

export default HostVans