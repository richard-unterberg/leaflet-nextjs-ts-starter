import Leaflet from 'leaflet'
import { Compass } from 'lucide-react'
import { useEffect, useState } from 'react'

import useMapContext from '#components/Map/useMapContext'

const LatLngLogo = () => {
  const { map } = useMapContext()
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
    <div className="flex gap-2 text-lg font-black leading-none text-white md:text-2xl md:leading-none">
      <div className="flex items-center">
        <Compass size={36} className="text-slate-50 md:hidden" />
        <Compass size={48} className="text-slate-50 hidden md:block" />
      </div>
      <div className="text-slate-50 flex items-center">
        {lat}
        <br />
        {lng}
      </div>
    </div>
  )
}

export default LatLngLogo
