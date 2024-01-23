import React from "react";
import styles from "../styles/sidebar.module.css";
function IconProfile() {
	return (
		<svg
			viewBox="0 0 24 24"
			className={`${styles.navIcons}`}
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
			<g
				id="SVGRepo_tracerCarrier"
				strokeLinecap="round"
				strokeLinejoin="round"
			></g>
			<g id="SVGRepo_iconCarrier">
				<circle
					cx="12"
					cy="9"
					r="3"
					stroke="#1C274C"
					strokeWidth="1.9200000000000004"
				></circle>
				<circle
					cx="12"
					cy="12"
					r="10"
					stroke="#1C274C"
					strokeWidth="1.9200000000000004"
				></circle>
				<path
					d="M17.9691 20C17.81 17.1085 16.9247 15 11.9999 15C7.07521 15 6.18991 17.1085 6.03076 20"
					stroke="#1C274C"
					strokeWidth="1.9200000000000004"
					strokeLinecap="round"
				></path>
			</g>
		</svg>
	);
}

export default IconProfile;
