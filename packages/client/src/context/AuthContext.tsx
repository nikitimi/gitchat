import { ReactNode, createContext, useEffect, useReducer } from "react"

export const AuthContext = createContext()

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload }
    case "LOGOUT":
      return { user: null }
    default:
      return state
  }
}

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  })
  console.log("Current state of Auth Context: ", state)
  
  useEffect(() => {
    const userFromLocalStorage = localStorage.getItem("user")
    if (userFromLocalStorage === null) return

    const user = JSON.parse(userFromLocalStorage)
    if (user) {
      dispatch({ type: "LOGIN", payload: user })
    }
  }, [])

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}
