//imports
import { Link } from "react-router-dom"
import { ChangeEvent, FormEvent, useState } from "react"
//hooks
import useValidator from "~/hooks/useValidator"
import useLogin from "~/hooks/useLogin"
//styles
import "~/styles/registrationLogin.module.css"

type UserInfoStateProps = {
  username: string | null
  password: string | null
}

type LoginErrorProps = {
  passwordMessage: string
  usernameMessage: string
  message: string
}

function LoginPage() {
  const { login } = useLogin()

  const [userInfo, setUserInfo] = useState<UserInfoStateProps>({
    username: null,
    password: null,
  })
  const {
    usernameErrorMessage,
    passwordErrorMessage,
    internalError,
    serverUsernameError,
    serverPasswordError,
    serverInternalErrorMessage,
  } = useValidator()

  const handleUsernameInput = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value
    setUserInfo({
      ...userInfo,
      username: input,
    })
  }
  const handlePasswordInput = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value
    setUserInfo({
      ...userInfo,
      password: input,
    })
  }
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await login(userInfo)
    } catch (err) {
      const error = err as LoginErrorProps
      serverPasswordError(error.passwordMessage)
      serverUsernameError(error.usernameMessage)
      serverInternalErrorMessage(error.message)
    }
  }

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="mainContainer">
        <div className="inputContainer">
          <div className="inputWrapper">
            <input
              type="text"
              name="username"
              className="inputBox"
              onChange={handleUsernameInput}
              required
            />
            <label className="inputLabel">Username</label>
          </div>
          {/* error message */}
          {usernameErrorMessage && (
            <span className="errorText">{usernameErrorMessage}</span>
          )}
        </div>
        <div className="inputContainer">
          <div className="inputWrapper">
            <input
              type="password"
              name="password"
              className="inputBox"
              onChange={handlePasswordInput}
              required
            />
            <label className="inputLabel">Password</label>
          </div>
          {/* error message */}
          {passwordErrorMessage && (
            <span className="errorText">{passwordErrorMessage}</span>
          )}
        </div>
        <button className="btnSubmit">Login</button>
        <span className="spanText">
          Don't have an account?
          <Link to="/register">Register here</Link>
        </span>
        {internalError && <div className="serverErr">{internalError}</div>}
      </form>
    </div>
  )
}

export default LoginPage
//loader
