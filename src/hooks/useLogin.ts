import useAuthContext from "./useAuthContext";
function useLogin() {
	const { dispatch } = useAuthContext();
	const login = async (data:Record<string, string>) => {
		const response = await fetch("http://localhost:3001/api/users/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});
		if (response.ok) {
			const data = await response.json();
			localStorage.setItem("user", JSON.stringify(data));
			dispatch({ type: "LOGIN", payload: JSON.stringify(data) });
			return;
		}
		if (response.status === 400) {
			const error = await response.json();
			throw error;
		} else {
			const error = {
				error: true,
				message: "Internal Server Error. Please try again later",
			};
			throw error;
		}
	};

	return { login };
}

export default useLogin;
