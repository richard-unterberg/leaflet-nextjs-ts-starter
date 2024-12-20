import { Compass, Github, Home } from 'lucide-react'
import rsc from 'react-styled-classnames'

import { AppConfig, NavMenuVariant } from '#lib/AppConfig'

import NavMenuItem from './NavMenuItem'

interface StyledNavListProps extends React.HTMLAttributes<HTMLUListElement> {
  $type: NavMenuVariant
}

const StyledNavList = rsc.ul.variants<StyledNavListProps>({
  base: 'flex',
  variants: {
    $type: {
      horizontal: `
        text-white
        gap-4
        text-lg
        text-white
        text-sm
        md:text-base
      `,
      vertical: `
        flex-col
        justify-between
        gap-1
        w-fit
        text-primary
      `,
    },
  },
})

interface NavMenuProps {
  variant?: NavMenuVariant
}

const NavMenu = ({ variant = NavMenuVariant.INTRO }: NavMenuProps) => {
  const navIconSize =
    variant === NavMenuVariant.TOPNAV ? AppConfig.ui.topBarIconSize : AppConfig.ui.menuIconSize

  return (
    <StyledNavList $type={variant}>
      <NavMenuItem href="/" label="Intro" icon={<Home size={navIconSize} />} />
      <NavMenuItem href="/map" label="Map Example" icon={<Compass size={navIconSize} />} />
      <NavMenuItem
        href="https://github.com/richard-unterberg/typescript-next-leaflet-starter"
        label="Github"
        icon={<Github size={navIconSize} />}
        external
      />
    </StyledNavList>
  )
}

export default NavMenu
