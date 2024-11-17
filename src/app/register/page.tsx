'use client'
//imports
import Link from "next/link";
//hooks
import useValidator from "@/hooks/useValidator";
import useRegister from "@/hooks/useRegister";
//styles
import styles from "@/styles/registrationLogin.module.css";
import { type ChangeEvent,type FormEvent, useState } from "react";
//components
import RegisterSuccessComponent from "@/components/RegisterSuccessComponent";
import type { UserInfoWithValues } from "@/utils/types/userInfo";

function RegisterPage() {
  const { register } = useRegister();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
  } = useValidator();
  const [userInfo, setUserInfo] = useState<{
    email: string | null,
    username: string | null,
    password: string | null,
  }>({
    email: null,
    username: null,
    password: null,
  });
  const handleEmailInput = (e:ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    validateEmail(input);
    setUserInfo({
      ...userInfo,
      email: input,
    });
  };
  const handleUsernameInput = (e:ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    validateUsername(input);
    setUserInfo({
      ...userInfo,
      username: input,
    });
  };
  const handlePasswordInput = (e:ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    validatePassword(input);
    setUserInfo({
      ...userInfo,
      password: input,
    });
  };
  const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();
    if (
      !emailErrorMessage &&
      !usernameErrorMessage &&
      passwordErrorMessage.length === 0
    ) {
      try {
        if (Object.values(userInfo).includes(null)) return
        await register(userInfo as UserInfoWithValues);
        setIsSuccess(true);
        setIsLoading(false);
      } catch (error) {
        serverEmailError((error as Error).message);
        serverUsernameError((error as Error).message);
        serverPasswordError((error as Error).message);
        serverInternalErrorMessage((error as Error).message);
        setIsLoading(false);
      }
    }
    setIsLoading(false);
  };

  return (
    <div className="form-container">
      {isSuccess ? (
        <RegisterSuccessComponent />
      ) : (
        <form onSubmit={handleSubmit} className={styles.mainContainer}>
          <div className={styles.inputContainer}>
            <div className={styles.inputWrapper}>
              <input
                type="text"
                name="email"
                className={styles.inputBox}
                onChange={handleEmailInput}
                required
              />
              <label className={styles.inputLabel}>Email</label>
            </div>
            {/* error message */}
            {emailErrorMessage && (
              <span className={styles.errorText}>{emailErrorMessage}</span>
            )}
          </div>
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
            {passwordErrorMessage.map((error, index) => (
              <span className={styles.errorText} key={index}>
                {error}
              </span>
            ))}
          </div>
          <button
            type="submit"
            className={styles.btnSubmit}
            disabled={isLoading}
          >
            Register
          </button>
          <span className={styles.spanText}>
            Already have an account?
            <Link href="/login" passHref legacyBehavior>Login here</Link>
          </span>
          {internalError && (
            <div className={styles.serverErr}>{internalError}</div>
          )}
        </form>
      )}
    </div>
  );
}

export default RegisterPage;
