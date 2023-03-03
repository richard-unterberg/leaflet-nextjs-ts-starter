import { useContext } from 'react'

import { MapContext } from './MapContextProvider'

const useMapContext = () => {
  const mapInstance = useContext(MapContext)
  const map = mapInstance?.map
  const setMap = mapInstance?.setMap

  return { map, setMap }
}

export default useMapContext
