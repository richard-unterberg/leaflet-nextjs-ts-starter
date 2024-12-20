import Link, { LinkProps } from 'next/link'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'

type LinkAnchorIntersection = LinkProps & HTMLAnchorElement

interface NavMenuItemProps {
  href: LinkAnchorIntersection['href']
  external?: boolean
  label: string
  icon: ReactNode
}

const NavMenuItem = ({ icon, href, external = false, label }: NavMenuItemProps) => {
  const router = useRouter()

  return (
    <li className={`${router.pathname === (href || '/') ? 'underline underline-offset-1' : ''}`}>
      <Link href={href} target={external ? '_blank' : '_self'} className="flex items-center gap-2">
        {icon} {label}
      </Link>
    </li>
  )
}

export default NavMenuItem
