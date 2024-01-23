//imports
import { NavLink } from "react-router-dom";
//styles
import styles from "../styles/sidebar.module.css";
import "../styles/sidebar.module.css";
//icons
import ProfileIcon from "../assets/IconProfile";
import HomeIcon from "../assets/IconHome";

function SidebarComponent() {
	return (
		<div className={styles.sidebarContainer}>
			<nav className={styles.navContainer}>
				<NavLink
					to="/"
					className={({ isActive }) =>
						isActive
							? `${styles.active} ${styles.navLink}`
							: styles.navLink
					}
				>
					<HomeIcon />
				</NavLink>
				<NavLink
					to="profile"
					className={({ isActive }) =>
						isActive
							? `${styles.active} ${styles.navLink}`
							: styles.navLink
					}
				>
					<ProfileIcon />
				</NavLink>
			</nav>
			<div className={styles.themeClicker}>themes</div>
		</div>
	);
}

export default SidebarComponent;
