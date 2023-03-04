import { LatLngExpression, MapOptions } from 'leaflet'
import { MapContainer, TileLayer } from 'react-leaflet'

import useMapContext from './useMapContext'

export const LeafletMap: React.FC<
  {
    center: LatLngExpression
    children: JSX.Element | JSX.Element[]
    zoom: number
  } & MapOptions
> = ({ ...options }) => {
  const { setMap } = useMapContext()

  return (
    <MapContainer
      ref={e => setMap && setMap(e || undefined)}
      className="w-full h-full absolute outline-0 text-white"
      {...options}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
      />
      {options.children}
    </MapContainer>
  )
}
