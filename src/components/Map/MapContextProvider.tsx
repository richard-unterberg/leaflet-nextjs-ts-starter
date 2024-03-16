import Leaflet from 'leaflet'
import { createContext, useState } from 'react'

interface MapContextValues {
  map: Leaflet.Map | undefined
  setMap: (e: Leaflet.Map | undefined) => void
  openPopup: number | undefined
  setOpenPopup: (e: number | undefined) => void
}

export const MapContext = createContext<MapContextValues | undefined>(undefined)

interface MapContextProviderProps {
  children: React.ReactNode
}

const MapContextProvider = ({ children }: MapContextProviderProps) => {
  const [map, setMap] = useState<Leaflet.Map | undefined>(undefined)
  const [openPopup, setOpenPopup] = useState<number | undefined>(undefined)

  return (
    <MapContext.Provider value={{ map, setMap, openPopup, setOpenPopup }}>{children}</MapContext.Provider>
  )
}

export default MapContextProvider
