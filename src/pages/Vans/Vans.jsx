import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getVans } from '../../api'
import Van from './Van'

const Vans = () => {  
    const [vans, setVans] = useState([]) 
    const [isLoading, setIsLoading] = useState(false) 
    const [error, setError] = useState(null) 

    const [searchParams, setSearchParams] = useSearchParams()
    const typeFilter = searchParams.get("type")

    useEffect(() => {
        async function loadVans(){
            setIsLoading(true)
            try {
                const data = await getVans()
                setVans(data)    
            } catch (err) {
                setError(err)                
            }finally{
                setIsLoading(false)
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

    function serverResult(){
        if(isLoading){
            return  <div className='loader'> <img src="/src/assets/images/clouds-spinner.gif" alt="" /> </div>
        }else if(error){
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