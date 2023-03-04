import { LatLngExpression } from 'leaflet'
import { LucideProps } from 'lucide-react'
import { FunctionComponent, useMemo } from 'react'

import { AppConfig } from '@lib/AppConfig'

export interface CustomMarkerProps {
  position: LatLngExpression
  icon?: FunctionComponent<LucideProps>
  color: string
}

const MarkerIconWrapper = ({ icon, color }: Partial<CustomMarkerProps>) => {
  const IconFC = useMemo(() => icon ?? null, [icon])

  return (
    <div className="p-2 inline-block rounded-full bg-primary text-white" style={{ backgroundColor: color }}>
      {IconFC && <IconFC size={AppConfig.ui.markerIconSize} />}
    </div>
  )
}

export default MarkerIconWrapper
