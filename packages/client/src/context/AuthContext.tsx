import { ReactNode, createContext, useEffect, useReducer } from "react"

// Define the types for state and dispatch actions
type User = {
  // Define the structure of your user object
  // For example, you might have properties like id, name, email, etc.
  // Update this type definition according to your actual user object structure
  id: string
  name: string
  email: string
}

type State = {
  user: User | null
}

type Action = {
  type: "LOGIN" | "LOGOUT"
  payload: User | null
}

// Create the context with default values
export const AuthContext = createContext<{
  state: State
  dispatch: React.Dispatch<Action>
}>({
  state: { user: null },
  dispatch: () => null,
})

// Define the reducer function
const authReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload }
    case "LOGOUT":
      return { user: null }
    default:
      return state
  }
}

// Define the AuthContextProvider component
export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  // Initialize state using useReducer
  const [state, dispatch] = useReducer(authReducer, { user: null })

  // Load user from localStorage on component mount
  useEffect(() => {
    const userFromLocalStorage = localStorage.getItem("user")
    if (userFromLocalStorage) {
      const user: User = JSON.parse(userFromLocalStorage)
      dispatch({ type: "LOGIN", payload: user })
    }
  }, [])

  // Render the AuthContext.Provider with the current state and dispatch function
  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}
