import { useState } from "react";
import "./LoginSignup.css";
import { useMutation } from "@tanstack/react-query";
import { register } from "../../api/api";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const signupMutate = useMutation({
    mutationFn: register,
    onSuccess: () => {
      navigate("/home");
      console.log("signedup");
    },
  });
  const handleChange = (e) => {
    setSignupInfo({
      ...signupInfo,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    signupMutate.mutate(signupInfo);
  };

  return (
    <>
      <div></div>
      <div className="login-container">
        <div className="header">
          <div className="text">Sign Up</div>
          <div className="underline"></div>
        </div>
        <div className="inputs">
          <div className="input">
            <span className="material-symbols-outlined">person</span>
            <input
              type="text"
              placeholder="Name"
              name="name"
              onChange={handleChange}
            />
          </div>
          <div className="input">
            <span className="material-symbols-outlined">mail</span>
            <input
              type="email"
              placeholder="Email Id"
              name="email"
              onChange={handleChange}
            />
          </div>
          <div className="input">
            <span className="material-symbols-outlined">lock</span>
            <input
              type="Password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="submit-container">
          <div className="submit" onClick={handleSubmit}>
            Sign Up
          </div>
          <div className="submit gray">
            <Link to={"/"}>Login</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
