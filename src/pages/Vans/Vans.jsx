import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

const Van = ({name, price, image, type, id}) => {
    return (    
    <Link to={`/vans/${id}`}>
        <div className="van-card">
            <img src={`/src/assets/images/${image}`} alt={name} width='100%'  />
            <div className="van-details">
                <h2>{name}</h2>
                <p className='van-price'><span>${price}</span> /day</p>
            </div>
            <i className={`van-button van-button-${type}`}>{type}</i>   
        </div>
    </Link>    
)
}

const Vans = () => {  
    const [vans, setVans] = useState([]) 

    const [searchParams, setSearchParams] = useSearchParams()
    const typeFilter = searchParams.get("type")

    useEffect(() => {
        fetch('api/vans')
            .then(res => res.json())
            .then(data => setVans(data.vans))
    }, [])

    //if there is a type filter vans that match condition will be added to variable else add all vans
    const displayedVans = typeFilter ?  vans.filter(van => van.type.toLowerCase() === typeFilter ) : vans

    let vansArray = displayedVans.map( van => (
        <Van key={van.id} id={van.id} name={van.name} price={van.price} image={van.imageUrl} type={van.type} />
    ))

  return (
    <div>
        <h1 className='van-header'>Explore our van options</h1>
        <div className="van-list-filter-buttons">
            <button onClick={() => setSearchParams({type : "luxury"})} className='van-type luxury'>Luxury</button>
            <button onClick={() => setSearchParams({type : "simple"})} className='van-type simple' >Simple</button>
            <button onClick={() => setSearchParams({type : "rugged"})} className='van-type rugged'>Rugged</button>
            <button onClick={() => setSearchParams({})} className='van-type clear-filters'>Clear filter</button>
        </div>
        <div className="vans">{vansArray}</div>
    </div>
  )
}

export default Vans