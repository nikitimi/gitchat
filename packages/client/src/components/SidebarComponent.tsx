//imports
import { NavLink } from "react-router-dom"
//icons
import ProfileIcon from "~/assets/Profile.svg?react"
import HomeIcon from "~/assets/Home.svg?react"
import { ReactNode } from "react"
// import "sidebar.module.css"

const navLink =
  "w-16 h-16 text-white flex items-center justify-center fill-none"

function SidebarComponent() {
  return (
    <div className="absolute top-0 -left-16 rounded-sm bg-black shadow-md capitalize">
      <nav className="grid grid-flow-row">
        <CustomNavLink to="/">
          <HomeIcon />
        </CustomNavLink>
        <CustomNavLink to="profile">
          <ProfileIcon />
        </CustomNavLink>
      </nav>
      <div className={navLink}>themes</div>
    </div>
  )
}

type CustomNavLinkProps = {
  children: ReactNode
  to: string
}

const CustomNavLink = ({ children, ...rest }: CustomNavLinkProps) => {
  const activeAfterClasses =
    "after:content-[''] after:absolute after:top-full after:h-1/2 after:w-1/2 after:right-0 after:rounded-tr-xl after:shadow-sm"
  const activeBaseClasses = "bg-white rounded-tl-md rounded-tr-md rounded-bl-md"
  return (
    <NavLink
      {...rest}
      className={`${({ isActive }: { isActive: boolean }) =>
        isActive
          ? `${activeBaseClasses} ${activeAfterClasses}`
          : ""} ${navLink}`}
    >
      {children}
    </NavLink>
  )
}

export default SidebarComponent