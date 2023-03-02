import { Compass, Github, Home } from 'lucide-react'

import { AppColor, MapConfig, NavMenuVariant } from '@lib/AppConfig'

import NavMenuItem from './NavMenuItem'

interface NavMenuProps {
  variant?: NavMenuVariant
}

const NavMenu = ({ variant = NavMenuVariant.INTRO }: NavMenuProps) => {
  const navIconSize =
    variant === NavMenuVariant.TOPNAV ? MapConfig.ui.topBarIconSize : MapConfig.ui.menuIconSize

  const listStyle =
    variant === NavMenuVariant.TOPNAV
      ? `flex text-white gap-4 text-lg ${AppColor.white.tw.text} `
      : `flex flex-col justify-between gap-1 w-fit ${AppColor.primary.tw.text}`

  return (
    <ul className={`${listStyle}`}>
      <NavMenuItem href="/" label="Intro" icon={<Home size={navIconSize} />} />
      <NavMenuItem href="/map" label="Map Example" icon={<Compass size={navIconSize} />} />
      <NavMenuItem
        href="https://github.com/richard-unterberg/typescript-next-leaflet-starter"
        label="Github"
        icon={<Github size={navIconSize} />}
        external
      />
    </ul>
  )
}

export default NavMenu
