import rsc from 'react-styled-classnames'

import NavMenu from '#components/common/NavMenu'
import LatLngLogo from '#components/TopBar/LatLngLogo'
import { NavMenuVariant } from '#lib/AppConfig'

const StyledTopBar = rsc.div`
  absolute
  left-0
  top-0
  flex
  h-20
  w-full
  items-center
  bg-dark
  p-3
  shadow
`

const MapTopBar = () => (
  <StyledTopBar style={{ zIndex: 1000 }}>
    <div className="flex w-full justify-between">
      <LatLngLogo />
      <div className="flex flex-col justify-center">
        <NavMenu variant={NavMenuVariant.TOPNAV} />
      </div>
    </div>
  </StyledTopBar>
)

export default MapTopBar
