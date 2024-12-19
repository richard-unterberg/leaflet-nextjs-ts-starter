import { LucideProps } from 'lucide-react'
import { FunctionComponent, useMemo } from 'react'
import rsc from 'react-styled-classnames'

import { AppConfig } from '#lib/AppConfig'

export interface MarkerIconWrapperProps {
  icon?: FunctionComponent<LucideProps>
  color: string
  label?: string
}

const MarkerOuter = rsc.div`
  relative m-0 inline-flex p-0
`

const MarkerLabelColorBg = rsc.span`
  absolute -inset-2 rounded-full opacity-40
`

const MarkerInner = rsc.div`
  relative
  inline-block
  rounded-full
  bg-primary
  p-2
  text-white
`

const MarkerBadge = rsc.span`
  absolute
  -right-2
  -top-2
  flex
  h-7
  w-7
  text-center
  flex-col
  rounded-full
  border-2
  border-white
  bg-error
  pt-1
  text-xs
`

const LabelShadow = rsc.span<{ $label: boolean }>`
  ${p => (p.$label ? '-inset-2' : '-inset-1')}
  absolute
  rounded-full
  shadow-md
`

const MarkerIconWrapper = ({ icon, color, label }: MarkerIconWrapperProps) => {
  const IconFC = useMemo(() => icon ?? null, [icon])

  return (
    <MarkerOuter>
      {label && <MarkerLabelColorBg style={{ backgroundColor: color }} />}
      <MarkerInner style={{ backgroundColor: color }}>
        {IconFC && <IconFC size={AppConfig.ui.markerIconSize} />}
        {label && <MarkerBadge>{label}</MarkerBadge>}
      </MarkerInner>
      <LabelShadow $label={!!label} />
    </MarkerOuter>
  )
}

export default MarkerIconWrapper
