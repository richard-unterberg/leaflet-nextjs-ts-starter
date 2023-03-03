import { LatLngExpression } from 'leaflet'
import { Leaf } from 'lucide-react'
import dynamic from 'next/dynamic'
import { useContext } from 'react'
import { renderToString } from 'react-dom/server'

import { AppColor, MapConfig } from '@lib/AppConfig'
import useLeafletWindow from '@lib/hooks/useLeafletWindow'

import { MapContext } from '../MapContextProvider'

const LeafletMarker = dynamic(async () => (await import('react-leaflet')).Marker, {
  ssr: false,
})

const MarkerComponent = () => (
  <div className={`p-2 inline-block rounded-full ${AppColor.primary.tw.bg}`}>
    <Leaf className="bg-none" size={MapConfig.ui.mapIconSize} color={AppColor.white.hex} />
  </div>
)

interface CustomMarkerProps {
  position: LatLngExpression
}

const CustomMarker = ({ position }: CustomMarkerProps) => {
  const { LeafletWindow } = useLeafletWindow()
  const mapInstance = useContext(MapContext)
  const map = mapInstance?.map

  const handleMarkerClick = () => {
    if (!map) return
    map.panTo(position)
  }

  return (
    <LeafletMarker
      position={position}
      icon={LeafletWindow.divIcon({
        html: renderToString(<MarkerComponent />),
        iconAnchor: [MapConfig.ui.mapIconSize / 2, MapConfig.ui.mapIconSize / 2],
      })}
      eventHandlers={{ click: handleMarkerClick }}
    />
  )
}

export default CustomMarker
