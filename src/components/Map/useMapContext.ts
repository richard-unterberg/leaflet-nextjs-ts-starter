import { useContext } from 'react'

import { MapContext } from './LeafletMapContextProvider'

const useMapContext = () => {
  const mapInstance = useContext(MapContext)
  const map = mapInstance?.map
  const setMap = mapInstance?.setMap
  const leafletLib = mapInstance?.leafletLib
  const setLeafletLib = mapInstance?.setLeafletLib

  return { map, setMap, leafletLib, setLeafletLib }
}

export default useMapContext
