import Leaflet, { LatLngExpression } from 'leaflet'
import { LucideProps } from 'lucide-react'
import { FunctionComponent, useMemo } from 'react'
import { renderToString } from 'react-dom/server'
import { Marker } from 'react-leaflet'

import { AppConfig } from '@lib/AppConfig'

import useMapContext from '../useMapContext'

interface CustomMarkerProps {
  position: LatLngExpression
  icon?: FunctionComponent<LucideProps>
  color: string
}

export const CustomMarker: React.FC<{
  position: CustomMarkerProps['position']
  icon: CustomMarkerProps['icon']
  color: CustomMarkerProps['color']
}> = ({ position, icon, color }: CustomMarkerProps) => {
  const { map } = useMapContext()

  const Icon = useMemo(() => icon ?? null, [icon])

  const handleMarkerClick = () => map?.panTo(position)

  return (
    <Marker
      position={position}
      icon={Leaflet?.divIcon({
        html: renderToString(
          <div
            className="p-2 inline-block rounded-full bg-primary text-white"
            style={{ backgroundColor: color }}
          >
            {Icon && <Icon />}
          </div>,
        ),
        iconAnchor: [AppConfig.ui.mapIconSize / 2, AppConfig.ui.mapIconSize / 2],
      })}
      eventHandlers={{ click: handleMarkerClick }}
    />
  )
}
