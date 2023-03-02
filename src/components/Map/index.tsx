import dynamic from 'next/dynamic'

import { MapConfig } from '@lib/AppConfig'

import MapContextProvider from '@components/Map/MapContextProvider'

import MapTopBar from '../TopBar'

export const CenterToMarkerButton = dynamic(
  async () => (await import('./ui/CenterToMarkerButton')).MapCenterToMarkerButton,
  {
    ssr: false,
  },
)
export const LeafletMap = dynamic(async () => (await import('./LeafletMap')).LeafletMap, {
  ssr: false,
})
export const LeafletMarker = dynamic(async () => (await import('react-leaflet')).Marker, {
  ssr: false,
})

const Map = () => (
  <MapContextProvider>
    <MapTopBar />
    <LeafletMap center={MapConfig.baseCenter} zoom={MapConfig.minZoom}>
      <LeafletMarker position={MapConfig.baseCenter} />
      <CenterToMarkerButton center={MapConfig.baseCenter} />
    </LeafletMap>
  </MapContextProvider>
)

export default Map
