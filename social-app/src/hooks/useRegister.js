const useRegister = () => {
	const register = async (data) => {
		const response = await fetch("http://localhost:3001/api/users/create", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});
		if (response.ok) {
			const data = await response.json();
			return data;
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
	return { register };
};

export default useRegister;
