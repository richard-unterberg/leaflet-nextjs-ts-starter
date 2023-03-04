import LatLngLogo from '@components/TopBar/LatLngLogo'

import { NavMenuVariant } from '@lib/AppConfig'

import NavMenu from '../common/NavMenu'

const MapTopBar = () => (
  <div
    className="h-20 absolute w-full left-0 top-0 p-3 shadow bg-dark flex items-center"
    style={{ zIndex: 1000 }}
  >
    <div className="flex justify-between w-full">
      <LatLngLogo />
      <div className="flex flex-col justify-center">
        <NavMenu variant={NavMenuVariant.TOPNAV} />
      </div>
    </div>
  </div>
)

export default MapTopBar
