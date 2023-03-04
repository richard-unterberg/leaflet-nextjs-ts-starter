import { LatLngExpression } from 'leaflet'
import { LocateFixed } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'

import { AppConfig } from '@lib/AppConfig'
import MarkerCategories, { Category } from '@lib/MarkerCategories'

import { CustomMarker } from '../Marker'
import useMapContext from '../useMapContext'

export const LocateButton: React.FC = () => {
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
  }, [map])

  useEffect(() => {
    if (userPosition) {
      map?.flyTo(userPosition)
    }
  }, [userPosition])

  return (
    <>
      <button
        type="button"
        style={{ zIndex: 400 }}
        className="button absolute rounded top-16 right-3 p-2 shadow-md text-dark bg-white"
        onClick={() => handleClick()}
      >
        <LocateFixed size={AppConfig.ui.mapIconSize} />
      </button>
      {userPosition && (
        <CustomMarker
          color={MarkerCategories[Category.LOCATE].color}
          icon={MarkerCategories[Category.LOCATE].icon}
          position={userPosition}
        />
      )}
    </>
  )
}
