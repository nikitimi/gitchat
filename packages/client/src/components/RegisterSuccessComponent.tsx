import { Link } from "react-router-dom"
import "~/styles/registrationLogin.module.css"

function RegisterSuccessComponent() {
  return (
    <div className="mainContainer">
      <div className="textLabel">You are now Registered</div>
      <Link to="/login" className=" w-full border flex">
        <button className="btnSubmit">Return to Login</button>
      </Link>
    </div>
  )
}

export default RegisterSuccessComponent
