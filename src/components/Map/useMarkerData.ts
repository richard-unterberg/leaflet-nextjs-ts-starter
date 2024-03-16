import { LatLngExpression, Map } from 'leaflet'
import { useEffect, useMemo, useState } from 'react'

import useMapContext from '#components/Map/useMapContext'
import { AppConfig } from '#lib/AppConfig'
import { PlacesClusterType, PlacesType } from '#lib/Places'

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
  const [allMarkersBoundCenter, setAllMarkersBoundCenter] = useState<allMarkerPosValues>({
    minZoom: AppConfig.minZoom - 5,
    centerPos: AppConfig.baseCenter,
  })
  const { leafletLib } = useMapContext()

  // get bounds of all markers
  const allMarkerBounds = useMemo(() => {
    if (!locations || !leafletLib) return undefined

    const coordsSum: LatLngExpression[] = []
    locations.forEach(item => {
      coordsSum.push(item.position)
    })
    return leafletLib.latLngBounds(coordsSum)
  }, [leafletLib, locations])

  const clustersByCategory = useMemo(() => {
    if (!locations) return undefined
    const groupedLocations = locations.reduce<PlacesClusterType>((acc, location) => {
      const { category } = location
      if (!acc[category]) {
        acc[category] = []
      }
      acc[category].push(location)
      return acc
    }, {})

    const mappedClusters = Object.keys(groupedLocations).map(key => ({
      category: Number(key),
      markers: groupedLocations[key],
    }))

    return mappedClusters
  }, [locations])

  // auto resize map to fit all markers on viewport change
  // it's crucial to set viewport size as dependecy to trigger the map resize
  useEffect(() => {
    if (!allMarkerBounds || !map) return
    if (!viewportWidth || !viewportHeight) return

    map.invalidateSize()
    setAllMarkersBoundCenter({
      minZoom: map.getBoundsZoom(allMarkerBounds),
      centerPos: [allMarkerBounds.getCenter().lat, allMarkerBounds.getCenter().lng],
    })
  }, [allMarkerBounds, map, viewportWidth, viewportHeight])

  return { clustersByCategory, allMarkersBoundCenter }
}

export default useMarkerData
