import beachbum from '../assets/images/beach-bum.png'
import { Link } from 'react-router-dom'

const Van = () => (
    <div className="vans">
            <div className="van-card">
                <img src={beachbum} alt="van image" width='100%'  />
                <div className="van-details">
                    <h2>Modest Explorer</h2>
                    <p className='van-price'><span>$60</span> /day</p>
                </div>
                <Link className="van-button">Simple</Link>
            </div>
        </div>

)

const Vans = () => {
  return (
    <div>
        <h1>Explore our van options</h1>
        <Van />

    </div>
  )
}

export default Vans