import { useContext } from 'react'

import { MapContext } from './MapContextProvider'

const useMapContext = () => {
  const mapInstance = useContext(MapContext)
  const map = mapInstance?.map
  const setMap = mapInstance?.setMap
  const openPopup = mapInstance?.openPopup
  const setOpenPopup = mapInstance?.setOpenPopup

  return { map, setMap, openPopup, setOpenPopup }
}

export default useMapContext
