import { useRouter } from 'next/router'
import rc from 'react-classmate'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  small?: boolean
  border?: boolean
  link?: string
  noGutter?: boolean
  noBorderRadius?: boolean
}

interface StyledButtonProps extends ButtonProps {
  $noGutter?: boolean
  $size: 'small' | 'medium'
  $border?: boolean
}

const StyledButton = rc.button.variants<StyledButtonProps>({
  base: p => `
    ${p.$noGutter ? '!p-0' : ''}
    ${p.border ? 'border' : ''}
    flex
    items-center
    justify-center
    gap-1`,
  variants: {
    $size: {
      small: 'px-2 py-2',
      medium: 'px-3 py-2',
    },
  },
})

const Button = ({ children, small = false, border, onClick, link, noGutter, ...props }: ButtonProps) => {
  const router = useRouter()

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault()
    if (!link) return

    router.push(link)
  }

  return link ? (
    <a href={link} className="inline-flex" onClick={handleLinkClick}>
      {children}
    </a>
  ) : (
    <StyledButton
      onClick={onClick}
      $border={border}
      $noGutter={noGutter}
      $size={small ? 'small' : 'medium'}
      {...props}
    >
      {children}
    </StyledButton>
  )
}

export default Button
