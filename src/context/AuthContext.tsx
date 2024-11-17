import { createContext, useEffect, useReducer } from "react";


type InitialState = {
	user: string | null
}
type AuthReducerAction = {
	type:'LOGIN' | 'LOGOUT'
	payload: string
}
type AuthContextProps = InitialState & {
	dispatch: React.Dispatch<AuthReducerAction>
}

export const authReducer = (state:InitialState, action:AuthReducerAction) => {
	switch (action.type) {
		case "LOGIN":
			return { user: action.payload };
		case "LOGOUT":
			return { user: null };
		default:
			return state;
	}
};

const initialState:InitialState = {
	user: null
}

export const AuthContext = createContext<AuthContextProps>({
	user: null,
	dispatch: () => null
});

export const AuthContextProvider = ({ children }:{children:Readonly<React.ReactNode>}) => {
	const [state, dispatch] = useReducer(authReducer, initialState);
	console.log("Current state of Auth Context: ", state);
	useEffect(() => {
		const storedUser = localStorage.getItem("user")
		if (storedUser === null) return
		const user = JSON.parse(storedUser);
		if (user) {
			dispatch({ type: "LOGIN", payload: user });
		}
	}, []);
	
	return (
		<AuthContext.Provider value={{ ...state, dispatch }}>
			{children}
		</AuthContext.Provider>
	);
};
