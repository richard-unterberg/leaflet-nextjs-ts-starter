import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import dynamic from 'next/dynamic'
import { Popup, PopupProps } from 'react-leaflet'

import { AppConfig } from '@lib/AppConfig'
import { MarkerCategoriesValues } from '@lib/MarkerCategories'
import { PlaceValues } from '@lib/Places'

const MarkerIconWrapper = dynamic(() => import('@components/Map/LeafletMarker/MarkerIconWrapper'))
const Button = dynamic(() => import('@components/common/Button'))

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
          // todo: rework the offsets at some point
          marginLeft: `calc(-150px + ${AppConfig.ui.markerIconSize - 5}px)`,

          // todo: some offest to align with the marker icon
          marginTop: -1,
        }}
      >
        <div className="flex flex-row justify-center pt-3" style={{ width: '300px' }}>
          <Button
            className="absolute right-3 top-3 text-dark inline-block"
            onClick={() => handlePopupClose(false)}
            small
          >
            <X size={AppConfig.ui.markerIconSize} />
          </Button>
          <div className="absolute left-0 top-0 w-full flex justify-center mt-5">
            <MarkerIconWrapper color={color} icon={icon} />
          </div>
          <div
            className="flex flex-col justify-center p-3 pt-6 text-center w-full"
            style={{ marginTop: AppConfig.ui.markerIconSize * 2 + 8 }}
          >
            <h3 className="text-lg font-bold leading-none m-0">{title}</h3>
            <p className="text-secondary m-0">{address}</p>
            {/* todo: new component for button group */}
            <div className="flex flex-row justify-between gap-2 mt-6 p-2">
              <Button className="bg-secondary text-white gap-2" onClick={() => handlePopupClose()} small>
                <ChevronLeft size={AppConfig.ui.menuIconSize} />
                Close
              </Button>
              <Button className="bg-primary text-white gap-2" onClick={() => handleOpenLocation()} small>
                Open
                <ChevronRight size={AppConfig.ui.menuIconSize} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Popup>
  )
}

export default LeafletPopup
