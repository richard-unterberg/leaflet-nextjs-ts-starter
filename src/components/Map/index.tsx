import dynamic from 'next/dynamic'
import { useEffect } from 'react'
import rc from 'react-classmate'
import { useResizeDetector } from 'react-resize-detector'

import MapTopBar from '#components/TopBar'
import { AppConfig } from '#lib/AppConfig'
import MarkerCategories, { Category } from '#lib/MarkerCategories'
import { Places } from '#lib/Places'
import LeafleftMapContextProvider from '#map/LeafletMapContextProvider'
import useMapContext from '#map/useMapContext'
import useMarkerData from '#map/useMarkerData'

const LeafletCluster = dynamic(async () => (await import('#map/LeafletCluster')).LeafletCluster(), {
  ssr: false,
})
const CenterToMarkerButton = dynamic(async () => (await import('#map/ui/CenterButton')).CenterButton, {
  ssr: false,
})
const CustomMarker = dynamic(async () => (await import('#map/LeafletMarker')).CustomMarker, {
  ssr: false,
})
const LocateButton = dynamic(async () => (await import('#map/ui/LocateButton')).LocateButton, {
  ssr: false,
})
const LeafletMapContainer = dynamic(
  async () => (await import('#map/LeafletMapContainer')).LeafletMapContainer,
  {
    ssr: false,
  },
)

const StyledMapBase = rc.div`
  absolute
  h-full
  w-full
  left-0
  top-0
`

const StyledMapOuter = rc.extend(StyledMapBase)`
  overflow-hidden
`

const StyledMapInner = rc.extend(StyledMapBase)<{ $isLoading: boolean }>`
  transition-opacity
  ${p => (p.$isLoading ? 'opacity-0' : 'opacity-1')}
`

const LeafletMapInner = () => {
  const { map } = useMapContext()
  const {
    width: viewportWidth,
    height: viewportHeight,
    ref: viewportRef,
  } = useResizeDetector({
    refreshMode: 'debounce',
    refreshRate: 200,
  })

  const { clustersByCategory, allMarkersBoundCenter } = useMarkerData({
    locations: Places,
    map,
    viewportWidth,
    viewportHeight,
  })

  const isLoading = !map || !viewportWidth || !viewportHeight

  /** watch position & zoom of all markers */
  useEffect(() => {
    if (!allMarkersBoundCenter || !map) return

    const moveEnd = () => {
      map.off('moveend', moveEnd)
    }

    map.flyTo(allMarkersBoundCenter.centerPos, allMarkersBoundCenter.minZoom, { animate: false })
    map.once('moveend', moveEnd)
  }, [allMarkersBoundCenter, map])

  return (
    <StyledMapOuter ref={viewportRef}>
      <MapTopBar />
      <StyledMapInner
        $isLoading={isLoading}
        style={{
          top: AppConfig.ui.topBarHeight,
          width: viewportWidth ?? '100%',
          height: viewportHeight ? viewportHeight - AppConfig.ui.topBarHeight : '100%',
        }}
      >
        {allMarkersBoundCenter && clustersByCategory && (
          <LeafletMapContainer
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
                  <LeafletCluster
                    key={item.category}
                    icon={MarkerCategories[item.category as Category].icon}
                    color={MarkerCategories[item.category as Category].color}
                    chunkedLoading
                  >
                    {item.markers.map(marker => (
                      <CustomMarker place={marker} key={marker.id} />
                    ))}
                  </LeafletCluster>
                ))}
              </>
            ) : (
              // we have to spawn at least one element to keep it happy
              // eslint-disable-next-line react/jsx-no-useless-fragment
              <></>
            )}
          </LeafletMapContainer>
        )}
      </StyledMapInner>
    </StyledMapOuter>
  )
}

// pass through to get context in <MapInner>
const Map = () => (
  <LeafleftMapContextProvider>
    <LeafletMapInner />
  </LeafleftMapContextProvider>
)

export default Map
