import { useOutletContext } from "react-router-dom"

const HostVanInfo = () => {
  const {currentVan} = useOutletContext();

  return (
    <div>HostVanInfo</div>
  )
}

export default HostVanInfo