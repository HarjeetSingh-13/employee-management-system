import { useState } from "react";
import "./LoginSignup.css";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../api/api.js";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const loginMutate = useMutation({
    mutationFn: login,
    onSuccess: () => {
      navigate("/home");
    },
  });

  const check = () => {
    var email = loginInfo.email;
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email == "") {
      alert("Email should not be empty");
      return false;
    } else if (!emailRegex.test(email)) {
      alert("Email criteria doesnt match");
      return false;
    }
    var pass = loginInfo.password;
    // var passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if (pass == "") {
      alert("Password should not be empty");
      return false;
    }
    //  else if (!passRegex.test(pass)) {
    //   alert("Password criteria doesnt match");
    //   return false;
    // }
    return true;
  };

  const handleSubmit = () => {
    let f = check();
    if (f) {
      loginMutate.mutate(loginInfo);
    }
  };
  const handleChange = (e) => {
    setLoginInfo({
      ...loginInfo,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <div></div>
      <div className="login-container">
        <div className="header">
          <div className="text">Login</div>
          <div className="underline"></div>
        </div>
        <div className="inputs">
          <div className="input">
            <span className="material-symbols-outlined">mail</span>
            <input
              type="email"
              placeholder="Email Id"
              onChange={handleChange}
              name="email"
            />
          </div>
          <div className="input">
            <span className="material-symbols-outlined">lock</span>
            <input
              type="Password"
              placeholder="Password"
              onChange={handleChange}
              name="password"
            />
          </div>
        </div>
        <div className="forgot-password">
          Lost Password? <span>Click Here!</span>
        </div>
        <div className="submit-container">
          <div className="submit gray">
            <Link to={"/signup"}>Sign Up</Link>
          </div>
          <div className="submit" onClick={handleSubmit}>
            Login
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
