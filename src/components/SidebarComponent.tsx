//styles
import styles from "@/styles/sidebar.module.css";
import "@/styles/sidebar.module.css";
//icons
import ProfileIcon from "@/assets/IconProfile";
import HomeIcon from "@/assets/IconHome";
import Link from "next/link";
import { headers } from "next/headers";
import { HEADER_KEYS } from "@/utils/constants";

export default async function SidebarComponent() {
  const routes = [
    { routeName: "/", RouteIcon: () => <HomeIcon /> },
    { routeName: "/profile", RouteIcon: () => <ProfileIcon /> },
  ] as const;
  const heads = await headers();
  const currentRoute = heads.get(HEADER_KEYS.pathname);

  console.log({ currentRoute });

  return (
    <div className={styles.sidebarContainer}>
      <nav className={styles.navContainer}>
        {routes.map(({ routeName, RouteIcon }) => (
          <Link key={routeName} href={routeName} passHref legacyBehavior>
            <button
              className={
                currentRoute === routeName
                  ? `${styles.active} ${styles.navLink}`
                  : styles.navLink
              }
            >
              <RouteIcon />
            </button>
          </Link>
        ))}
      </nav>
      <div className={styles.themeClicker}>themes</div>
    </div>
  );
}
