import Leaflet, { PointExpression } from 'leaflet'
import { renderToString } from 'react-dom/server'

interface divIconValues {
  source: JSX.Element
  anchor: PointExpression
}

const LeafletDivIcon = ({ source, anchor }: divIconValues) =>
  Leaflet?.divIcon({
    html: renderToString(source),
    iconAnchor: anchor,
  })

export default LeafletDivIcon
