import dynamic from 'next/dynamic'
import { useEffect } from 'react'

import { Places } from '@root/src/lib/Places'
import useLeafletWindow from '@root/src/lib/hooks/useLeafletWindow'

import MapTopBar from '@components/TopBar'

import MapContextProvider from './MapContextProvider'
import useMapContext from './useMapContext'
import useMarker from './useMarker'

const CenterToMarkerButton = dynamic(async () => (await import('./ui/CenterButton')).CenterButton, {
  ssr: false,
})
const CustomMarker = dynamic(async () => (await import('./ui/CustomMarker')).CustomMarker, {
  ssr: false,
})
const LeafletMap = dynamic(async () => (await import('./LeafletMap')).LeafletMap, {
  ssr: false,
})

const MapInner = () => {
  const { map } = useMapContext()
  const leafletWindow = useLeafletWindow()
  const { markerCenterPos, markerMinZoom } = useMarker({
    locations: Places,
    map,
  })
  const isLoading = !map || !leafletWindow

  // center/zoom map based on markers locations if everythings
  useEffect(() => {
    if (map && leafletWindow) {
      map.flyTo(markerCenterPos, markerMinZoom, { animate: false })
    }
  }, [map, leafletWindow])

  return (
    <>
      <MapTopBar />
      <LeafletMap center={markerCenterPos} zoom={markerMinZoom} minZoom={markerMinZoom}>
        {!isLoading ? (
          <>
            <CenterToMarkerButton center={markerCenterPos} zoom={markerMinZoom} />
            {Places.map(item => (
              <CustomMarker key={(item.position as number[]).join('')} position={item.position} />
            ))}
          </>
        ) : (
          <>l</>
        )}
      </LeafletMap>
    </>
  )
}

const Map = () => (
  <MapContextProvider>
    <MapInner />
  </MapContextProvider>
)

export default Map
