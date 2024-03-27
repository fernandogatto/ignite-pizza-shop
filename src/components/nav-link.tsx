import { Link, LinkProps, useLocation } from 'react-router-dom'

export type NavLinkProps = LinkProps

export function NavLink(props: NavLinkProps) {
  const { pathname } = useLocation()

  const isActive = pathname === props.to

  return (
    <Link
      data-active={isActive}
      className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground data-[active=true]:text-foreground"
      {...props}
    />
  )
}
