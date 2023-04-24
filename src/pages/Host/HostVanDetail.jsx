import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const HostVanDetail = () => {
  const {id} = useParams()
  const [currentVan, setCurrentVan] = useState([])
  
  useEffect(()=>{
    fetch(`/api/host/vans/${id}`)
      .then(res => res.json())
      .then(data => setCurrentVan(data.vans))
  }, [])

  //TODO replace with an actual loading state; this is a shortcut
  if(!currentVan) return <h1>Loading...</h1>

  return (
    <div>
      <img src={`/src/assets/images/${currentVan.imageUrl}`} alt={currentVan.name} width={150} />   
      <h2>{currentVan.name}</h2>         
      <p>${currentVan.price}</p>         
      <p>{currentVan.type}</p>         
    </div>
  )
}

export default HostVanDetail