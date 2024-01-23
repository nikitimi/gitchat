import { Link } from "react-router-dom";
import styles from "../styles/registrationLogin.module.css";

function RegisterSuccessComponent() {
	return (
		<div className={styles.mainContainer}>
			<div className={styles.textLabel}>You are now Registered</div>
			<Link to="/login" className=" w-full border flex">
				<button className={styles.btnSubmit}>Return to Login</button>
			</Link>
		</div>
	);
}

export default RegisterSuccessComponent;
