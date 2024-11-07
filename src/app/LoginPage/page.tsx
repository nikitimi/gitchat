//imports
import Link from "next/link";
import { useState } from "react";
//hooks
import useValidator from "@/hooks/useValidator";
import useLogin from "@/hooks/useLogin";
//styles
import styles from "../styles/registrationLogin.module.css";

function LoginPage() {
  const { login } = useLogin();

  const [userInfo, setUserInfo] = useState({
    username: null,
    password: null,
  });
  const {
    usernameErrorMessage,
    passwordErrorMessage,
    internalError,
    serverUsernameError,
    serverPasswordError,
    serverInternalErrorMessage,
  } = useValidator();

  const handleUsernameInput = (e) => {
    const input = e.target.value;
    setUserInfo({
      ...userInfo,
      username: input,
    });
  };
  const handlePasswordInput = (e) => {
    const input = e.target.value;
    setUserInfo({
      ...userInfo,
      password: input,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(userInfo);
    } catch (error) {
      serverPasswordError(error.passwordMessage);
      serverUsernameError(error.usernameMessage);
      serverInternalErrorMessage(error.message);
    }
  };

  return (
    <div className="form-container">
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
  );
}

export default LoginPage;
//loader
