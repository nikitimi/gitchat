//imports
import { Link } from "react-router-dom"
import { ChangeEvent, FormEvent, useState } from "react"
//hooks
import useValidator from "~/hooks/useValidator"
import useLogin from "~/hooks/useLogin"
//styles
import styles from "~/styles/registrationLogin.module.css"

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
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit} className={styles.mainContainer}>
        <div className={styles.inputContainer}>
          <div className={styles.inputWrapper}>
            <input
              type="text"
              name="username"
              className={styles.inputBox}
              onChange={handleUsernameInput}
              required
            />
            <label className={styles.inputLabel}>Username</label>
          </div>
          {/* error message */}
          {usernameErrorMessage && (
            <span className={styles.errorText}>{usernameErrorMessage}</span>
          )}
        </div>
        <div className={styles.inputContainer}>
          <div className={styles.inputWrapper}>
            <input
              type="password"
              name="password"
              className={styles.inputBox}
              onChange={handlePasswordInput}
              required
            />
            <label className={styles.inputLabel}>Password</label>
          </div>
          {/* error message */}
          {passwordErrorMessage && (
            <span className={styles.errorText}>{passwordErrorMessage}</span>
          )}
        </div>
        <button className={styles.btnSubmit}>Login</button>
        <span className={styles.spanText}>
          Don't have an account?
          <Link to="/register">Register here</Link>
        </span>
        {internalError && (
          <div className={styles.serverErr}>{internalError}</div>
        )}
      </form>
    </div>
  )
}

export default LoginPage
//loader
