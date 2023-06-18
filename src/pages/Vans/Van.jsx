import { Link } from "react-router-dom"

const Van = ({name, price, image, type, id, searchParams}) => {
    return (    
    <Link to={id} state={{search: `?${searchParams.toString()}`}} >
        <div className="van-card">
            <img src={image} alt={name} width='100%'  />
            <div className="van-details">
                <h2>{name}</h2>
                <p className='van-price'><span>${price}</span> /day</p>
            </div>
            <i className={`van-button van-button-${type}`}>{type}</i>   
        </div>
    </Link>    
)
}

export default Van


