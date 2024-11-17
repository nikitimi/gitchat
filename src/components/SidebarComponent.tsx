//styles
import styles from "@/styles/sidebar.module.css";
import "@/styles/sidebar.module.css";
//icons
import ProfileIcon from "@/assets/IconProfile";
import HomeIcon from "@/assets/IconHome";
import Link from "next/link";

function SidebarComponent() {
	return (
		<div className={styles.sidebarContainer}>
			<nav className={styles.navContainer}>
				<Link
					href="/"
					passHref
					legacyBehavior
					// className={({ isActive }) =>
					// 	isActive
					// 		? `${styles.active} ${styles.navLink}`
					// 		: styles.navLink
					// }
				>
					<HomeIcon />
				</Link>
				<Link
					href="profile"
					passHref
					legacyBehavior
					// className={({ isActive }) =>
					// 	isActive
					// 		? `${styles.active} ${styles.navLink}`
					// 		: styles.navLink
					// }
				>
					<ProfileIcon />
				</Link>
			</nav>
			<div className={styles.themeClicker}>themes</div>
		</div>
	);
}

export default SidebarComponent;
