import { LatLngExpression } from 'leaflet'
import { Shrink } from 'lucide-react'
import { useCallback, useState } from 'react'
import rc from 'react-classmate'
import { useMapEvents } from 'react-leaflet'

import { AppConfig } from '#lib/AppConfig'
import useMapContext from '#map/useMapContext'

interface StyledCenterButtonProps {
  $isTouched: boolean
}

const StyledCenterButton = rc.button<StyledCenterButtonProps>`
  ${p => (p.$isTouched ? 'text-dark' : 'text-light')}
  button
  absolute
  right-3
  top-2
  rounded
  bg-white
  p-2
  shadow-md
`

interface CenterButtonProps {
  center: LatLngExpression
  zoom: number
}

export const CenterButton = ({ center, zoom }: CenterButtonProps) => {
  const [isTouched, setIsTouched] = useState(false)
  const { map } = useMapContext()

  const touch = useCallback(() => {
    if (!isTouched && map) {
      setIsTouched(true)
    }
  }, [isTouched, map])

  useMapEvents({
    move() {
      touch()
    },
    zoom() {
      touch()
    },
  })

  const handleClick = useCallback(() => {
    if (!isTouched || !map) return

    map.flyTo(center, zoom)
    map.once('moveend', () => {
      setIsTouched(false)
    })
  }, [map, isTouched, zoom, center])

  return (
    <StyledCenterButton
      type="button"
      style={{ zIndex: 400 }}
      $isTouched={isTouched}
      onClick={() => handleClick()}
    >
      <Shrink size={AppConfig.ui.mapIconSize} />
    </StyledCenterButton>
  )
}
