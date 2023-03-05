import { LatLngExpression, Map } from 'leaflet'
import { chain } from 'lodash'
import { useEffect, useMemo, useState } from 'react'

import useLeafletWindow from '@components/Map/useLeafletWindow'

import { AppConfig } from '@lib/AppConfig'
import { Category } from '@lib/MarkerCategories'
import { PlacesType } from '@lib/Places'

interface useMapDataValues {
  locations?: PlacesType
  map?: Map
  viewportWidth?: number
  viewportHeight?: number
}

interface allMarkerPosValues {
  minZoom: number
  centerPos: LatLngExpression
}

const useMarker = ({ locations, map, viewportWidth, viewportHeight }: useMapDataValues) => {
  const leafletWindow = useLeafletWindow()

  const [allMarkersBoundCenter, setAllMarkersBoundCenter] = useState<allMarkerPosValues>({
    minZoom: AppConfig.minZoom - 1,
    centerPos: AppConfig.baseCenter,
  })

  // get bounds of all markers
  const allMarkerBounds = useMemo(() => {
    if (!leafletWindow || !locations) return undefined

    const coordsSum: LatLngExpression[] = []
    locations.forEach(item => {
      coordsSum.push(item.position)
    })
    return leafletWindow.latLngBounds(coordsSum)
  }, [leafletWindow, locations])

  const clustersByCategory = useMemo(
    () =>
      chain(locations)
        .groupBy('category')
        .map((value, key: Category | string) => ({ category: key, markers: value }))
        .value(),
    [locations],
  )

  // useMemo will not work here, because we need to update the map size after the viewport size changes
  useEffect(() => {
    if (!allMarkerBounds || !leafletWindow || !map) return

    map.invalidateSize()
    setAllMarkersBoundCenter({
      minZoom: map.getBoundsZoom(allMarkerBounds),
      centerPos: [allMarkerBounds.getCenter().lat, allMarkerBounds.getCenter().lng],
    })
  }, [allMarkerBounds, viewportWidth, viewportHeight])

  return { clustersByCategory, allMarkersBoundCenter }
}

export default useMarker
