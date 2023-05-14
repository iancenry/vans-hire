import { useEffect, useState } from 'react'
import { useSearchParams, useLoaderData } from 'react-router-dom'
import { getVans } from '../../api'
import Van from './Van'

export function loader(){
    return getVans()
}

const Vans = () => {  
    const vans = useLoaderData()
    const [error, setError] = useState(null) 
    
    const [searchParams, setSearchParams] = useSearchParams()
    const typeFilter = searchParams.get("type")

    //if there is a type filter, vans that match condition are added to var else add all vans
    const displayedVans = typeFilter ?  vans.filter(van => van.type.toLowerCase() === typeFilter ) : vans

    let vansArray = displayedVans?.map( van => (
        <Van key={van.id} id={van.id} name={van.name} price={van.price} image={van.imageUrl} type={van.type} searchParams={searchParams} />
    ))

    function serverResult(){
        if(error){
            return <div className='loader'> <h1>Server Error, Try Again Later. {error.message}</h1></div>
        }else{
            return <div className="vans">{vansArray}</div> 
        }
    } 

  return (
    <div>
        <h1 className='van-header'>Explore our van options</h1>
        <div className="van-list-filter-buttons">
            <button onClick={() => setSearchParams({type : "luxury"})} className={`van-type luxury ${typeFilter === 'luxury' && 'selected'}`}>Luxury</button>
            <button onClick={() => setSearchParams({type : "simple"})} className={`van-type simple ${typeFilter === 'simple' && 'selected'}`} >Simple</button>
            <button onClick={() => setSearchParams({type : "rugged"})} className={`van-type rugged ${typeFilter === 'rugged' && 'selected'}`}>Rugged</button>
            {typeFilter && <button onClick={() => setSearchParams({})} className='van-type clear-filters'>Clear</button>}
        </div>
        {serverResult()}        
    </div>
  )
}

export default Vans

// TODO apply error and loading to VanDetail, HostVans, HostVanDetail

// if(isLoading){
//     return  <div className='loader'> <img src="/src/assets/images/clouds-spinner.gif" alt="" /> </div>
// }