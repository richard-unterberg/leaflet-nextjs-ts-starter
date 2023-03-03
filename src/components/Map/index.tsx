import dynamic from 'next/dynamic'

import { MapConfig } from '@lib/AppConfig'
import { Coordinates } from '@lib/Coordinates'

import MapContextProvider from '@components/Map/MapContextProvider'

import MapTopBar from '../TopBar'
import CustomMarker from './ui/CustomMarker'

const CenterToMarkerButton = dynamic(
  async () => (await import('./ui/CenterToMarkerButton')).MapCenterToMarkerButton,
  {
    ssr: false,
  },
)
const LeafletMap = dynamic(async () => (await import('./LeafletMap')).LeafletMap, {
  ssr: false,
})

const Map = () => (
  <MapContextProvider>
    <MapTopBar />
    <LeafletMap center={MapConfig.baseCenter} zoom={MapConfig.minZoom}>
      <CenterToMarkerButton center={MapConfig.baseCenter} />
      <>
        {Coordinates.map(item => (
          <CustomMarker key={item.name} position={item.position} />
        ))}
      </>
    </LeafletMap>
  </MapContextProvider>
)

export default Map
