import { LatLngExpression } from 'leaflet'
import { Shrink } from 'lucide-react'
import { useCallback, useState } from 'react'
import { useMap, useMapEvents } from 'react-leaflet'

import { AppConfig } from '@lib/AppConfig'

interface MapCenterToMarkerButtonProps {
  center: LatLngExpression
}

export const MapCenterToMarkerButton: React.FC<{
  center: MapCenterToMarkerButtonProps['center']
}> = ({ center }: MapCenterToMarkerButtonProps) => {
  const map = useMap()
  const [isTouched, setIsTouched] = useState(false)

  const touch = useCallback(() => {
    if (!isTouched && map) {
      setIsTouched(true)
    }
  }, [map])

  useMapEvents({
    move() {
      touch()
    },
    zoom() {
      touch()
    },
  })

  const handleClick = useCallback(() => {
    if (!isTouched && !map) return

    map.flyTo(center, AppConfig.minZoom)
    map.once('moveend', () => {
      setIsTouched(false)
    })
  }, [map])

  return (
    <button
      type="button"
      style={{ zIndex: 400 }}
      className={`button absolute rounded top-2 right-2 p-2 shadow-md bg-white ${
        isTouched ? 'text-dark' : 'text-light'
      } `}
      onClick={() => handleClick()}
    >
      <Shrink size={AppConfig.ui.mapIconSize} />
    </button>
  )
}
