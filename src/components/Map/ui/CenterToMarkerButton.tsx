import { LatLngExpression } from 'leaflet'
import { Shrink } from 'lucide-react'
import { useCallback, useState } from 'react'
import { useMap, useMapEvents } from 'react-leaflet'

import { AppColor, MapConfig } from '@lib/AppConfig'

interface MapCenterToMarkerButtonProps {
  center: LatLngExpression
}

export const MapCenterToMarkerButton: React.FC<{
  center: MapCenterToMarkerButtonProps['center']
}> = ({ center }: MapCenterToMarkerButtonProps) => {
  const map = useMap()
  const [isTouched, setIsTouched] = useState(false)

  const touch = useCallback(() => {
    if (!isTouched) {
      setIsTouched(true)
    }
  }, [])

  useMapEvents({
    move() {
      touch()
    },
    zoom() {
      touch()
    },
  })

  const handleClick = () => {
    if (!isTouched) return

    map.flyTo(center, MapConfig.minZoom)
    map.once('moveend', () => {
      setIsTouched(false)
    })
  }

  return (
    <button
      type="button"
      style={{ zIndex: 400 }}
      className={`button absolute rounded top-2 right-2 p-2 shadow-md ${AppColor.white.tw.bg} ${
        isTouched ? AppColor.dark.tw.text : AppColor.light.tw.text
      } `}
      onClick={() => handleClick()}
    >
      <Shrink size={MapConfig.ui.mapIconSize} />
    </button>
  )
}
