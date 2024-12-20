import Leaflet from 'leaflet'
import { Compass } from 'lucide-react'
import { useEffect, useState } from 'react'
import rsc from 'react-styled-classnames'

import useMapContext from '#map/useMapContext'

const StyledLogo = rsc.div`
  flex
  gap-2
  font-black
  leading-none
  text-white
  text-lg
  md:text-2xl
  md:leading-none
`

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
    <StyledLogo>
      <div className="flex items-center">
        <Compass size={36} className="text-slate-50 md:hidden" />
        <Compass size={48} className="text-slate-50 hidden md:block" />
      </div>
      <div className="text-slate-50 flex items-center">
        {lat}
        <br />
        {lng}
      </div>
    </StyledLogo>
  )
}

export default LatLngLogo
