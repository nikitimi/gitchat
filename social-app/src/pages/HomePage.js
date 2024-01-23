import { Outlet } from "react-router-dom";
import SidebarComponent from "../components/SidebarComponent";

function HomePage() {
	return (
		<div className="home-container">
			<SidebarComponent />
			<div className="main-container">
				<Outlet />
			</div>
		</div>
	);
}

export default HomePage;
