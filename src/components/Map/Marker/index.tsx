import { Marker } from 'react-leaflet'
import ThemeConfig from 'tailwindcss/defaultTheme'

import { AppConfig } from '@lib/AppConfig'

import useLeafletDivIcon from '../useLeafletDivIcon'
import useMapContext from '../useMapContext'
import MarkerIconWrapper, { CustomMarkerProps } from './MarkerIconWrapper'

export const CustomMarker: React.FC<{
  position: CustomMarkerProps['position']
  icon: CustomMarkerProps['icon']
  color: CustomMarkerProps['color']
}> = ({ position, icon, color }: CustomMarkerProps) => {
  const { map } = useMapContext()
  const { divIcon } = useLeafletDivIcon()

  const handleMarkerClick = () => map?.panTo(position)

  return (
    <Marker
      position={position}
      icon={divIcon({
        source: <MarkerIconWrapper color={color} icon={icon} />,
        anchor: [(AppConfig.ui.markerIconSize + 16) / 2, (AppConfig.ui.markerIconSize + 16) / 2],
      })}
      eventHandlers={{ click: handleMarkerClick }}
    />
  )
}
