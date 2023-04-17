import { useEffect, useState } from 'react'
import beachbum from '../assets/images/beach-bum.png'
import { Link } from 'react-router-dom'

const Van = ({name, price, image, type}) => (
        <div className="vans">
            <div className="van-card">
                <img src={`/src/assets/images/${image}`} alt="van image" width='100%'  />
                <div className="van-details">
                    <h2>{name}</h2>
                    <p className='van-price'><span>${price}</span> /day</p>
                </div>
                <Link className="van-button">{type}</Link>
            </div>
        </div>

)

const Vans = () => {  
    const [vans, setVans] = useState([]) 

    useEffect(() => {
        fetch('api/vans')
            .then(res => res.json())
            .then(data => setVans(data.vans))
    }, [])

    let vansAray = vans.map( van => (
        <Van key={van.id} name={van.name} price={van.price} image={van.imageUrl} type={van.type} />
    ))

  return (
    <div>
        <h1>Explore our van options</h1>
        {vansAray}

    </div>
  )
}

export default Vans