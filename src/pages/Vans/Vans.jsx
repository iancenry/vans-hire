import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Van = ({name, price, image, type, id}) => {
    let buttonColor; 
    if(type === 'luxury') buttonColor = '#161616'
    else if(type === 'simple') buttonColor = '#E17654'
    else if(type === 'rugged') buttonColor = '#115E59'

    return (    
    <Link to={`/vans/${id}`}>
        <div className="van-card">
            <img src={`/src/assets/images/${image}`} alt="van image" width='100%'  />
            <div className="van-details">
                <h2>{name}</h2>
                <p className='van-price'><span>${price}</span> /day</p>
            </div>
            <i className="van-button" style={{backgroundColor: buttonColor, color: '#fff'}}>{type}</i>
        </div>
    </Link>    
    

)
}

const Vans = () => {  
    const [vans, setVans] = useState([]) 

    useEffect(() => {
        fetch('api/vans')
            .then(res => res.json())
            .then(data => setVans(data.vans))
    }, [])

    let vansArray = vans.map( van => (
        <Van key={van.id} id={van.id} name={van.name} price={van.price} image={van.imageUrl} type={van.type} />
    ))

  return (
    <div>
        <h1>Explore our van options</h1>
        <div className="vans">{vansArray}</div>
        

    </div>
  )
}

export default Vans