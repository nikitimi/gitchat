//imports
import { Link } from "react-router-dom"
//hooks
import useRegister from "~/hooks/useRegister"
import useValidator from "~/hooks/useValidator"
//styles
import { ChangeEvent, FormEvent, useState } from "react"
import "~/styles/registrationLogin.module.css"
//components
import RegisterSuccessComponent from "~/components/RegisterSuccessComponent"

type UserInfoStateProps = {
  email: string | null
  username: string | null
  password: string | null
}

type RegisterErrorProps = {
  emailMessage: string
  usernameMessage: string
  passwordMessage: string
  message: string
}

function RegisterPage() {
  const { register } = useRegister()
  const [isSuccess, setIsSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const {
    internalError,
    emailErrorMessage,
    validateEmail,
    usernameErrorMessage,
    validateUsername,
    passwordErrorMessage,
    validatePassword,
    serverEmailError,
    serverPasswordError,
    serverUsernameError,
    serverInternalErrorMessage,
  } = useValidator()
  const [userInfo, setUserInfo] = useState<UserInfoStateProps>({
    email: null,
    username: null,
    password: null,
  })

  const handleUserInfoInput = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value
    const typeName = e.target.name as "email" | "username" | "password"

    if (typeName === "email") {
      validateEmail(input)
    } else if (typeName === "username") {
      validateUsername(input)
    } else if (typeName === "password") {
      validatePassword(input)
    }

    setUserInfo((prevState) => ({ ...prevState, [typeName]: input }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setIsLoading(true)
    e.preventDefault()
    if (
      !emailErrorMessage &&
      !usernameErrorMessage &&
      passwordErrorMessage.length === 0
    ) {
      try {
        await register(userInfo)
        setIsSuccess(true)
        setIsLoading(false)
      } catch (err) {
        const error = err as RegisterErrorProps
        serverEmailError(error.emailMessage)
        serverUsernameError(error.usernameMessage)
        serverPasswordError(error.passwordMessage)
        serverInternalErrorMessage(error.message)
        setIsLoading(false)
      }
    }
    setIsLoading(false)
  }

  return (
    <div className="form-container">
      {isSuccess ? (
        <RegisterSuccessComponent />
      ) : (
        <form onSubmit={handleSubmit} className="mainContainer">
          <div className="inputContainer">
            <div className="inputWrapper">
              <input
                type="text"
                name="email"
                className="inputBox"
                onChange={handleUserInfoInput}
                required
              />
              <label className="inputLabel">Email</label>
            </div>
            {/* error message */}
            {emailErrorMessage && (
              <span className="errorText">{emailErrorMessage}</span>
            )}
          </div>
          <div className="inputContainer">
            <div className="inputWrapper">
              <input
                type="text"
                name="username"
                className="inputBox"
                onChange={handleUserInfoInput}
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
                onChange={handleUserInfoInput}
                required
              />
              <label className="inputLabel">Password</label>
            </div>
            {/* error message */}
            {passwordErrorMessage.map((error, index) => (
              <span className="errorText" key={index}>
                {error}
              </span>
            ))}
          </div>
          <button type="submit" className="btnSubmit" disabled={isLoading}>
            Register
          </button>
          <span className="spanText">
            Already have an account?
            <Link to="/login">Login here</Link>
          </span>
          {internalError && <div className="serverErr">{internalError}</div>}
        </form>
      )}
    </div>
  )
}

export default RegisterPage
