import Leaflet from 'leaflet'
import { createContext, useState } from 'react'

interface MapContextValues {
  map: Leaflet.Map | undefined
  setMap: (e: Leaflet.Map | undefined) => void
}

export const MapContext = createContext<MapContextValues | undefined>(undefined)

interface MapContextProviderProps {
  children: React.ReactNode
}

const LeafleftMapContextProvider = ({ children }: MapContextProviderProps) => {
  const [map, setMap] = useState<Leaflet.Map | undefined>(undefined)

  return <MapContext.Provider value={{ map, setMap }}>{children}</MapContext.Provider>
}

export default LeafleftMapContextProvider
