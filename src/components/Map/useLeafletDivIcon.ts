import Leaflet, { PointExpression } from 'leaflet'
import { renderToString } from 'react-dom/server'

interface divIconValues {
  source: JSX.Element
  anchor: PointExpression
}

const useLeafletDivIcon = () => {
  const divIcon = ({ source, anchor }: divIconValues) =>
    Leaflet?.divIcon({
      html: renderToString(source),
      iconAnchor: anchor,
    })

  return { divIcon }
}

export default useLeafletDivIcon
