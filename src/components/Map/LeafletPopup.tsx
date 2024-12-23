import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import dynamic from 'next/dynamic'
import rc from 'react-classmate'
import { Popup, PopupProps } from 'react-leaflet'

import { AppConfig } from '#lib/AppConfig'
import { MarkerCategoriesValues } from '#lib/MarkerCategories'
import { PlaceValues } from '#lib/Places'

const MarkerIconWrapper = dynamic(() => import('#map/LeafletMarker/MarkerIconWrapper'))
const Button = dynamic(() => import('#components/common/Button'))

const StyledNavButton = rc.extend(Button)`
  gap-2
  text-white
`

const StyledCloseButton = rc.extend(Button)`
  absolute
  right-3
  top-3
  inline-block
  text-dark
`

const IconWrapper = rc.div`
  absolute
  left-0
  top-0
  mt-5
  flex
  w-full
  justify-center
`

interface LeafletPopupProps extends PopupProps {
  handlePopupClose: (active?: boolean) => void
  handleOpenLocation: () => void
  item: PlaceValues
  color: MarkerCategoriesValues['color']
  icon: MarkerCategoriesValues['icon']
}

const LeafletPopup = ({
  handlePopupClose,
  handleOpenLocation,
  color,
  icon,
  item,
  ...props
}: LeafletPopupProps) => {
  const { title, address } = item

  return (
    <Popup {...props}>
      <div
        className="absolute bg-white shadow"
        style={{
          // @todo: overly complicated
          marginLeft: `calc(-150px + ${AppConfig.ui.markerIconSize - 5}px)`,
          marginTop: -1,
        }}
      >
        <div className="flex flex-row justify-center pt-3" style={{ width: '300px' }}>
          <StyledCloseButton
            className="absolute right-3 top-3 inline-block text-dark"
            onClick={() => handlePopupClose(false)}
            small
          >
            <X size={AppConfig.ui.markerIconSize} />
          </StyledCloseButton>
          <IconWrapper>
            <MarkerIconWrapper color={color} icon={icon} />
          </IconWrapper>
          <div
            className="flex w-full flex-col justify-center p-3 pt-6 text-center"
            style={{
              // @todo: overly complicated
              marginTop: AppConfig.ui.markerIconSize * 2 + 8,
            }}
          >
            <h3 className="m-0 text-lg font-bold leading-none">{title}</h3>
            <p className="m-0 text-secondary">{address}</p>
            {/* todo: new component for button group */}
            <div className="mt-6 flex flex-row justify-between gap-2 p-2">
              <StyledNavButton className="bg-secondary" onClick={() => handlePopupClose()} small>
                <ChevronLeft size={AppConfig.ui.menuIconSize} />
                Close
              </StyledNavButton>
              <StyledNavButton className="bg-primary" onClick={() => handleOpenLocation()} small>
                Open
                <ChevronRight size={AppConfig.ui.menuIconSize} />
              </StyledNavButton>
            </div>
          </div>
        </div>
      </div>
    </Popup>
  )
}

export default LeafletPopup
