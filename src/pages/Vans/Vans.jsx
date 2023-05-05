import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { getVans } from '../../api'

const Van = ({name, price, image, type, id, searchParams}) => {
    return (    
    <Link to={id} state={{search: `?${searchParams.toString()}`}} >
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
    const [isLoading, setIsLoading] = useState(false) 
    const [error, setError] = useState(false) 

    const [searchParams, setSearchParams] = useSearchParams()
    const typeFilter = searchParams.get("type")

    useEffect(() => {
        async function loadVans(){
            setIsLoading(true)
            try {
                const data = await getVans()
                setVans(data)    
            } catch (err) {
                console.log("Err found")
                console.log(err)                
            }
                       
            setIsLoading(false)
        }  
                
        loadVans()
    }, [])

    //if there is a type filter, vans that match condition are added to var else add all vans
    const displayedVans = typeFilter ?  vans.filter(van => van.type.toLowerCase() === typeFilter ) : vans

    let vansArray = displayedVans?.map( van => (
        <Van key={van.id} id={van.id} name={van.name} price={van.price} image={van.imageUrl} type={van.type} searchParams={searchParams} />
    ))

  return (
    <div>
        <h1 className='van-header'>Explore our van options</h1>
        <div className="van-list-filter-buttons">
            <button onClick={() => setSearchParams({type : "luxury"})} className={`van-type luxury ${typeFilter === 'luxury' && 'selected'}`}>Luxury</button>
            <button onClick={() => setSearchParams({type : "simple"})} className={`van-type simple ${typeFilter === 'simple' && 'selected'}`} >Simple</button>
            <button onClick={() => setSearchParams({type : "rugged"})} className={`van-type rugged ${typeFilter === 'rugged' && 'selected'}`}>Rugged</button>
            {typeFilter && <button onClick={() => setSearchParams({})} className='van-type clear-filters'>Clear</button>}
        </div>
        {isLoading ? <div className='loader'> <img src="/src/assets/images/clouds-spinner.gif" alt="" /> </div> : <div className="vans">{vansArray}</div> }        
    </div>
  )
}

export default Vans