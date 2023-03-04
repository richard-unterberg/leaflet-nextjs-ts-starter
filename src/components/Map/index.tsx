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
  const { clustersByCategory, markerCenterPos, markerMinZoom } = useMarker({
    locations: Places,
    map,
  })

  const {
    width: viewportWidth,
    height: viewportHeight,
    ref: viewportRef,
  } = useResizeDetector({
    refreshMode: 'debounce',
    refreshRate: 400,
  })

  const isLoading = !map || !leafletWindow || !viewportWidth

  // resize: invalidate size if viewport changed
  useEffect(() => {
    if (map && (viewportWidth || viewportHeight)) {
      map.invalidateSize()
    }
  }, [map, viewportWidth, viewportHeight])

  // init: center / zoom map based on markers locations
  useEffect(() => {
    if (map && leafletWindow) {
      map.flyTo(markerCenterPos, markerMinZoom, { animate: false })
      map.setMinZoom(markerMinZoom)
    }
  }, [map, leafletWindow])

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
        <LeafletMap center={markerCenterPos} zoom={markerMinZoom} maxZoom={AppConfig.maxZoom}>
          {!isLoading ? (
            <>
              <CenterToMarkerButton center={markerCenterPos} zoom={markerMinZoom} />
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
            <>l</>
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
