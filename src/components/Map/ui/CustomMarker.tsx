import Leaflet, { LatLngExpression } from 'leaflet'
import { Leaf } from 'lucide-react'
import { renderToString } from 'react-dom/server'
import { Marker } from 'react-leaflet'

import { AppConfig } from '@lib/AppConfig'

import useMapContext from '../useMapContext'

const MarkerIconElement = () => (
  <div className="p-2 inline-block rounded-full bg-primary text-white">
    <Leaf className="bg-none" size={AppConfig.ui.mapIconSize} />
  </div>
)

interface CustomMarkerProps {
  position: LatLngExpression
}

export const CustomMarker: React.FC<{
  position: CustomMarkerProps['position']
}> = ({ position }: CustomMarkerProps) => {
  const { map } = useMapContext()

  const handleMarkerClick = () => map?.panTo(position)

  return (
    <Marker
      position={position}
      icon={Leaflet?.divIcon({
        html: renderToString(<MarkerIconElement />),
        iconAnchor: [AppConfig.ui.mapIconSize / 2, AppConfig.ui.mapIconSize / 2],
      })}
      eventHandlers={{ click: handleMarkerClick }}
    />
  )
}
