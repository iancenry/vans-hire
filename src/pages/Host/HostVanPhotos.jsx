import { useOutletContext } from "react-router-dom"

const HostVanPhotos = () => {
  const {currentVan} = useOutletContext()
  return (
    <div>HostVanPhotos</div>
  )
}

export default HostVanPhotos