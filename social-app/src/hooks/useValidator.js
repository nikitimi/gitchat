import { useState } from "react";

function useErrorMessage() {
	const [emailErrorMessage, setEmailErrorMessage] = useState("");
	const [usernameErrorMessage, setUsernameErrorMessage] = useState("");
	const [passwordErrorMessage, setPasswordErrorMessage] = useState([]);
	const [internalError, setInternalError] = useState("");

	//validate email input
	const validateEmail = (input) => {
		if (input === "") {
			return setEmailErrorMessage("Email cannot be empty");
		}
		const pattern = /^[\w]+@[\w]+\.[\w][\w]+$/;
		const validate = pattern.test(input);
		if (!validate) {
			return setEmailErrorMessage("Email is not a valid address");
		}
		return setEmailErrorMessage("");
	};

	//validate username input
	const validateUsername = (input) => {
		if (input === "") {
			return setUsernameErrorMessage("Username cannot be empty");
		}
		if (!/^[A-Za-z0-9]+$/.test(input)) {
			return setUsernameErrorMessage(
				"Username must not contain spaces or special characters"
			);
		}
		if (!/^[A-Za-z][A-Za-z0-9]*$/.test(input)) {
			return setUsernameErrorMessage(
				"Username must not start with numbers"
			);
		}
		return setUsernameErrorMessage("");
	};

	//validate password input
	const validatePassword = (input) => {
		const errors = [];
		if (input === "") {
			return setPasswordErrorMessage(["Password cannot be empty"]);
		}
		if (!input.length > 7) {
			errors.push("Passwords must contain 8 or more characters");
		}
		if (!/(?=.*?[A-Z])/.test(input)) {
			errors.push("Password must contain at least 1 uppercase letter");
		}
		if (!/(?=.*?[a-z])/.test(input)) {
			errors.push("Password must contain at least 1 lowercase letter");
		}
		if (!/(?=.*?[0-9])/.test(input)) {
			errors.push("Password must contain at least 1 number");
		}
		if (!/(?=.*?[#?!@$%^&*-])/.test(input)) {
			errors.push("Password must contain at least 1 special character");
		}
		if (!/^[a-zA-Z\d#?!@$%^&*()-]+$/.test(input)) {
			return setPasswordErrorMessage(["Invalid character input"]);
		}
		return setPasswordErrorMessage(errors);
	};

	const serverUsernameError = (response) => {
		if (response) {
			return setUsernameErrorMessage(response);
		}
		return setUsernameErrorMessage("");
	};
	const serverEmailError = (response) => {
		if (response) {
			return setEmailErrorMessage(response);
		}
		return setEmailErrorMessage("");
	};
	const serverPasswordError = (response) => {
		if (response) {
			return setPasswordErrorMessage([response]);
		}
		return setPasswordErrorMessage([]);
	};
	const serverInternalErrorMessage = (response) => {
		if (response) {
			return setInternalError(response);
		}
		return setInternalError("");
	};

	return {
		internalError,
		emailErrorMessage,
		validateEmail,
		usernameErrorMessage,
		validateUsername,
		passwordErrorMessage,
		validatePassword,
		serverUsernameError,
		serverEmailError,
		serverPasswordError,
		serverInternalErrorMessage,
	};
}

export default useErrorMessage;
