import { MapOptions } from 'leaflet'
import { ComponentProps, useEffect } from 'react'
import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import rsc, { RscBaseComponent } from 'react-styled-classnames'

import useMapContext from '#map/useMapContext'

type MapContainerType = ComponentProps<typeof MapContainer>
const StyledMapContainer: RscBaseComponent<MapContainerType> = rsc.extend(MapContainer)`
  absolute
  h-full
  w-full
  text-white
  outline-0
`

interface LeafletMapContainerProps extends MapOptions {
  children: JSX.Element | JSX.Element[]
}

// set the Leaflet map
const MapInstanceSetter = () => {
  const map = useMap()
  const { setMap, setLeafletLib } = useMapContext()

  useEffect(() => {
    if (setMap) {
      setMap(map)
    }
  }, [map, setMap])

  useEffect(() => {
    if (setLeafletLib) {
      import('leaflet').then(leaflet => {
        setLeafletLib(leaflet)
      })
    }
  }, [setLeafletLib])

  return null
}

export const LeafletMapContainer = ({ children, ...props }: LeafletMapContainerProps) => (
  <StyledMapContainer {...props}>
    <MapInstanceSetter />
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
      url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
    />
    {children}
  </StyledMapContainer>
)
