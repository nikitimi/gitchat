import { Outlet } from "react-router-dom"
import SidebarComponent from "~/components/SidebarComponent"

function HomePage() {
  return (
    <div className="homeContainer">
      <SidebarComponent />
      <div className="mainContainer">
        <Outlet />
      </div>
    </div>
  )
}

export default HomePage
