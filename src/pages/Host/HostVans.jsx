import { Await, Link, defer, useLoaderData } from "react-router-dom"
import { getHostVans } from "../../api"
import  { requireAuth } from "../../utils"
import { Suspense } from "react"

export async function hostVansLoader({request}) {
  //ensure that it runs completely before we get the list of vans
  await requireAuth(request)
  return defer({hostvans : getHostVans()})
}

const HostVans = () => {
  const hostvansLoaderPromise = useLoaderData() 

  function renderHostVans(hostvans) {
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
     <div className="host-vans-list">
       <section>{hostVansEls}</section>
     </div>              
   )
 } 

  return (
    <section>
      <h1 className="host-vans-title">Your listed vans</h1>
      <Suspense fallback={ <div className='loader'><img src={`/src/assets/images/clouds-spinner.gif`} alt="loader" /></div>}>
        <Await resolve={hostvansLoaderPromise.hostvans}>
          {renderHostVans}
        </Await>
      </Suspense>
    </section>
  )
}

export default HostVans