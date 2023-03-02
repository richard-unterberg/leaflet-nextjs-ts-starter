import Leaflet, { LatLngExpression, MapOptions } from 'leaflet'
import { useContext, useEffect } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'

import { AppColor, MapConfig } from '@lib/AppConfig'

import { MapContext } from '@components/Map/MapContextProvider'

export const LeafletMap: React.FC<
  {
    center: LatLngExpression
    children: JSX.Element | JSX.Element[]
    zoom: number
  } & MapOptions
> = ({ ...options }) => {
  const mapInstance = useContext(MapContext)
  const setMap = mapInstance?.setMap

  // setup marker icons
  useEffect(() => {
    async function init() {
      await Leaflet.Icon.Default.mergeOptions({
        iconRetinaUrl: 'leaflet/images/marker-icon-2x.png',
        iconUrl: 'leaflet/images/marker-icon.png',
        shadowUrl: 'leaflet/images/marker-shadow.png',
      })
    }
    init()
  }, [])

  return (
    <div
      className="relative"
      style={{
        marginTop: `${MapConfig.ui.topBarHeight}px`,
        height: `calc(100vh - ${MapConfig.ui.topBarHeight}px)`,
      }}
    >
      <MapContainer
        ref={e => setMap && setMap(e || undefined)}
        className={`w-full h-full absolute outline-0 ${AppColor.white.tw.bg}`}
        minZoom={MapConfig.minZoom}
        maxZoom={MapConfig.maxZoom}
        {...options}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        {options.children}
      </MapContainer>
    </div>
  )
}
