import { useState } from "react";
import "./LoginSignup.css";

function LoginSignup() {

    const [action,setAction] = useState("Sign Up");

  return (
    <>
      <div></div>
      <div className="login-container">
        <div className="header">
          <div className="text">{action}</div>
          <div className="underline"></div>
        </div>
        <div className="inputs">
            {action === "Login" ?<div></div>:<div className="input">
            <span class="material-symbols-outlined">person</span>
            <input type="text" placeholder="Name" name="" id="" />
          </div>}
          <div className="input">
            <span class="material-symbols-outlined">mail</span>
            <input type="email" placeholder="Email Id" name="" id="" />
          </div>
          <div className="input">
            <span class="material-symbols-outlined">lock</span>
            <input type="Password" placeholder="Password" name="" id="" />
          </div>
        </div>
        {action === "Login"?<div className="forgot-password">Lost Password? <span>Click Here!</span></div>:<div></div>} 
        <div className="submit-container">
            <div className={action==="Login"?"submit gray":"submit"} onClick={()=>{setAction("Sign Up")}}>Sign Up</div>
            <div className={action==="Sign Up"?"submit gray":"submit"} onClick={()=>{setAction("Login")}}>Login</div>
        </div>
      </div>
    </>
  );
}

export default LoginSignup;
