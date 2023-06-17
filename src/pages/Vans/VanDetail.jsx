import { Await, Link, defer, useLoaderData, useLocation } from "react-router-dom"
import { getVans } from "../../api"
import { Suspense } from "react"

export function vanDetailLoader({params}){
    return defer({ van : getVans(params.id) }) 
}

const VanDetail = () => {
  const vanDetailLoaderPromise  = useLoaderData()

  const location = useLocation() 
  //if search value exists set search to it else set to empty string 
  const search = location.state?.search || ""

  const backText = location.state?.search.split("=")[1] || "all"

  function renderVanDetail(van){
    return (
        <div className="van-detail">
            <Link to={`..${search}`} className="back-button" relative="path">&larr; <span>Back to {backText} vans</span></Link>                  
            <img src={`/src/assets/images/${van.imageUrl}`} />
            <i className={`van-button van-button-${van?.type}`}>{van.type}</i>   
            <h2>{van.name}</h2>
            <p className="van-price"><span>${van.price}</span>/day</p>
            <p>{van.description}</p>
            <button className="link-button">Rent this van</button>
        </div>
    )
  }

  return (
      <div className="van-detail-container">
        <Suspense fallback={ <div className='loader'><img src={`/src/assets/images/clouds-spinner.gif`} alt="loader" /></div>}>
            <Await resolve={vanDetailLoaderPromise.van}>
                {renderVanDetail}
            </Await>
        </Suspense>
              
      </div>
  )
}

export default VanDetail