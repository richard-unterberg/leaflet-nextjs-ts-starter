import dynamic from 'next/dynamic'
import { useEffect } from 'react'
import { useResizeDetector } from 'react-resize-detector'

import MapTopBar from '@components/TopBar'

import { AppConfig } from '@lib/AppConfig'
import MarkerCategories, { Category } from '@lib/MarkerCategories'
import { Places } from '@lib/Places'

import MapContextProvider from './MapContextProvider'
import useLeafletWindow from './useLeafletWindow'
import useMapContext from './useMapContext'
import useMarker from './useMarker'

const Cluster = dynamic(async () => (await import('./Marker/ClusterGroup')).MarkerClusterGroup(), {
  ssr: false,
})
const CenterToMarkerButton = dynamic(async () => (await import('./ui/CenterButton')).CenterButton, {
  ssr: false,
})
const CustomMarker = dynamic(async () => (await import('./Marker')).CustomMarker, {
  ssr: false,
})
const LocateButton = dynamic(async () => (await import('./ui/LocateButton')).LocateButton, {
  ssr: false,
})
const LeafletMap = dynamic(async () => (await import('./LeafletMap')).LeafletMap, {
  ssr: false,
})

const MapInner = () => {
  const { map } = useMapContext()
  const leafletWindow = useLeafletWindow()

  const {
    width: viewportWidth,
    height: viewportHeight,
    ref: viewportRef,
  } = useResizeDetector({
    refreshMode: 'debounce',
    refreshRate: 200,
  })

  const { clustersByCategory, allMarkersBoundCenter } = useMarker({
    locations: Places,
    map,
    viewportWidth,
    viewportHeight,
  })

  const isLoading = !map || !leafletWindow || !viewportWidth || !viewportHeight

  /** watch position & zoom of all markers */
  useEffect(() => {
    if (!allMarkersBoundCenter || !map) return

    const moveEnd = () => {
      map.setMinZoom(allMarkersBoundCenter.minZoom - 1)
      map.off('moveend', moveEnd)
    }

    map.setMinZoom(0)
    map.flyTo(allMarkersBoundCenter.centerPos, allMarkersBoundCenter.minZoom, { animate: false })
    map.once('moveend', moveEnd)
  }, [allMarkersBoundCenter])

  return (
    <div className="h-full w-full absolute overflow-hidden" ref={viewportRef}>
      <MapTopBar />
      <div
        className={`absolute w-full left-0 transition-opacity ${isLoading ? 'opacity-0' : 'opacity-1 '}`}
        style={{
          top: AppConfig.ui.topBarHeight,
          width: viewportWidth ?? '100%',
          height: viewportHeight ? viewportHeight - AppConfig.ui.topBarHeight : '100%',
        }}
      >
        <LeafletMap
          center={allMarkersBoundCenter.centerPos}
          zoom={allMarkersBoundCenter.minZoom}
          maxZoom={AppConfig.maxZoom}
          minZoom={AppConfig.minZoom}
        >
          {!isLoading ? (
            <>
              <CenterToMarkerButton
                center={allMarkersBoundCenter.centerPos}
                zoom={allMarkersBoundCenter.minZoom}
              />
              <LocateButton />
              {Object.values(clustersByCategory).map(item => (
                <Cluster
                  key={item.category}
                  icon={MarkerCategories[item.category as Category].icon}
                  color={MarkerCategories[item.category as Category].color}
                  chunkedLoading
                >
                  {item.markers.map(marker => (
                    <CustomMarker
                      icon={MarkerCategories[marker.category].icon}
                      color={MarkerCategories[marker.category].color}
                      key={(marker.position as number[]).join('')}
                      position={marker.position}
                    />
                  ))}
                </Cluster>
              ))}
            </>
          ) : (
            <></>
          )}
        </LeafletMap>
      </div>
    </div>
  )
}

// pass through to get context in <MapInner>
const Map = () => (
  <MapContextProvider>
    <MapInner />
  </MapContextProvider>
)

export default Map
