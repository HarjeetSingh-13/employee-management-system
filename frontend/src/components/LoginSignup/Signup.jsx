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

  const check = () => {
    var a = signupInfo.name;
    if (a == "") {
      alert("Name should not be empty");
      return false;
    } else if (a.length < 5) {
      alert("Length of Name should not be less than 5");
      return false;
    } else if (!isNaN(a)) {
      alert("Name should not be a number");
      return false;
    }
    var email = signupInfo.email;
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email == "") {
      alert("Email should not be empty");
      return false;
    } else if (!emailRegex.test(email)) {
      alert("Email criteria doesnt match");
      return false;
    }
    var pass = signupInfo.password;
    // var passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if (pass == "") {
      alert("Password should not be empty");
      return false;
    } 
    // else if (!passRegex.test(pass)) {
    //   alert("Password criteria doesnt match");
    //   return false;
    // }
    return true;
  };

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
    let f = check();
    if (f) {
      signupMutate.mutate(signupInfo);
    }
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
