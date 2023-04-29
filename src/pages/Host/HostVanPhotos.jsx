import { useOutletContext } from "react-router-dom"

const HostVanPhotos = () => {
  const {currentVan} = useOutletContext()

  return (
    <img src={`/src/assets/images/${currentVan.imageUrl}`} className="host-van-detail-image" alt={currentVan.name} />
  )
}

export default HostVanPhotos