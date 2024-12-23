import { LatLngExpression } from 'leaflet'
import { LocateFixed } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import rc from 'react-classmate'

import { AppConfig } from '#lib/AppConfig'
import { Category } from '#lib/MarkerCategories'
import { CustomMarker } from '#map/LeafletMarker'
import useMapContext from '#map/useMapContext'

const StyledLocateButton = rc.button`
  button
  absolute
  right-3
  top-16
  rounded
  bg-white
  p-2
  text-dark
  shadow-md
`

export const LocateButton = () => {
  const { map } = useMapContext()
  const [userPosition, setUserPosition] = useState<LatLngExpression | undefined>(undefined)

  const handleClick = useCallback(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        setUserPosition([position.coords.latitude, position.coords.longitude])
      })
    } else {
      setUserPosition(undefined)
    }
  }, [])

  useEffect(() => {
    if (userPosition) {
      map?.flyTo(userPosition)
    }
  }, [map, userPosition])

  return (
    <>
      <StyledLocateButton type="button" style={{ zIndex: 400 }} onClick={() => handleClick()}>
        <LocateFixed size={AppConfig.ui.mapIconSize} />
      </StyledLocateButton>
      {userPosition && (
        <CustomMarker
          place={{
            id: 0,
            title: 'Your location',
            address: 'You are here',
            position: userPosition,
            category: Category.LOCATE,
          }}
        />
      )}
    </>
  )
}
