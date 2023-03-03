import { LatLngExpression, Map } from 'leaflet'
import { useMemo } from 'react'

import useLeafletWindow from '@components/Map/useLeafletWindow'

import { AppConfig } from '@lib/AppConfig'
import { PlacesType } from '@lib/Places'

interface useMapDataValues {
  locations?: PlacesType
  map?: Map
}

const useMarker = ({ locations, map }: useMapDataValues) => {
  const leafletWindow = useLeafletWindow()

  // get bounds of all markers
  const allMarkerBounds = useMemo(() => {
    if (!leafletWindow || !locations) return undefined

    const coordsSum: LatLngExpression[] = []
    locations.forEach(item => {
      coordsSum.push(item.position)
    })
    return leafletWindow.latLngBounds(coordsSum)
  }, [leafletWindow, locations])

  // calc center from marker bounds
  const markerCenterPos: LatLngExpression | undefined = useMemo(() => {
    if (!leafletWindow || !allMarkerBounds) return AppConfig.baseCenter

    const bounds = allMarkerBounds
    return [bounds.getCenter().lat, bounds.getCenter().lng] as LatLngExpression
  }, [allMarkerBounds, leafletWindow])

  // calc minimum fit zoom
  const markerMinZoom = useMemo(() => {
    if (!allMarkerBounds || !leafletWindow || !map) return 0

    return map?.getBoundsZoom(allMarkerBounds)
  }, [leafletWindow, map, allMarkerBounds])

  return { markerCenterPos, markerMinZoom }
}

export default useMarker
