import { useEffect, useState } from "react"
import { useParams, Link, useLocation } from "react-router-dom"

const VanDetail = () => {
  const params = useParams()
  const [van, setVan] = useState(null)  

  const location = useLocation() 
  //if search value exists set search to it else set to empty string 
  const search = location.state?.search || ""

  const backText = location.state?.search.split("=")[1] || "all"

  useEffect(() => {
      fetch(`/api/vans/${params.id}`)
          .then(res => res.json())
          .then(data => setVan(data.vans))
  }, [params.id]) 

  return (
      <div className="van-detail-container">
          {van ? (
              <div className="van-detail">
                  <Link to={`..${search}`} className="back-button" relative="path">&larr; <span>Back to {backText} vans</span></Link>                  
                  <img src={`/src/assets/images/${van.imageUrl}`} />
                  <i className={`van-button van-button-${van?.type}`}>{van.type}</i>   
                  <h2>{van.name}</h2>
                  <p className="van-price"><span>${van.price}</span>/day</p>
                  <p>{van.description}</p>
                  <button className="link-button">Rent this van</button>
              </div>
          ) : <h2>Loading...</h2>}
      </div>
  )
}

export default VanDetail