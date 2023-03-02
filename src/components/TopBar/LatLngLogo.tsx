import Leaflet from 'leaflet'
import { Compass } from 'lucide-react'
import { useContext, useEffect, useState } from 'react'

import { MapContext } from '@components/Map/MapContextProvider'

const LatLngLogo = () => {
  const mapInstance = useContext(MapContext)
  const map = mapInstance?.map

  const [location, setLocation] = useState<Leaflet.LatLng | undefined>()
  const lat = location?.lat.toFixed(4)
  const lng = location?.lng.toFixed(4)

  useEffect(() => {
    if (!map) return undefined

    setLocation(map.getCenter())

    map?.on('move', () => {
      setLocation(map.getCenter())
    })

    // cleanup
    return () => {
      map.off()
    }
  }, [map])

  return (
    <div className="text-2xl font-black leading-none flex gap-2">
      <Compass size={50} className="text-slate-50" />
      <div className="text-slate-50">
        {lat}
        <br />
        {lng}
      </div>
    </div>
  )
}

export default LatLngLogo
