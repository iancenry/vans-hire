import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const VanDetail = () => {
  const params = useParams()
  const [van, setVan] = useState(null)
  let buttonColor; 
    

  useEffect(() => {
      fetch(`/api/vans/${params.id}`)
          .then(res => res.json())
          .then(data => setVan(data.vans))
  }, [params.id]) 

  if(van?.type === 'luxury') buttonColor = '#161616'
    else if(van?.type === 'simple') buttonColor = '#E17654'
    else if(van?.type === 'rugged') buttonColor = '#115E59'

  return (
      <div className="van-detail-container">
          {van ? (
              <div className="van-detail">
                  <img src={`/src/assets/images/${van.imageUrl}`} />
                  <i className={`van-button`} style={{backgroundColor: buttonColor, color: '#fff'}}>{van.type}</i>
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