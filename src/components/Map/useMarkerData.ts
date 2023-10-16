import { LatLngExpression, Map } from 'leaflet'
import _ from 'lodash'
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

const useMarkerData = ({ locations, map, viewportWidth, viewportHeight }: useMapDataValues) => {
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

  const clustersByCategory = useMemo(() => {
    const groupedLocations = _.groupBy(locations, 'category')
    const mappedClusters = _.map(groupedLocations, (value, key: Category | string) => ({
      category: key,
      markers: value,
    }))
    return mappedClusters
  }, [locations])

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

export default useMarkerData
