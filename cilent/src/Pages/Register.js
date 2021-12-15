import React, { useState, useEffect } from "react";
import "../App.css";
import Axios from "axios";
import { Link } from "react-router-dom";
function Register() {
  const [usernameReg, setUsernameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");

  const [loginStatus, setLoginStatus] = useState("");

  Axios.defaults.withCredentials = true;

  const register = () => {
    Axios.post("http://localhost:3001/register", {
      username: usernameReg,
      password: passwordReg,
    }).then((response) => console.log(response));
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/login").then((response) => {
      if (response.data.loggedIn == true) {
        setLoginStatus(response.data.user[0].username);
      }
    });
  }, []);

  return (
    <div className="main-register">
      <div class="background">
        <div class="shape"></div>
        <div class="shape"></div>
      </div>
      <form className="register-form">
        <div className="register">
          <h1>Registation</h1>
          <input
            type="text"
            className="inputs"
            placeholder="username"
            onChange={(e) => setUsernameReg(e.target.value)}
          />
          <input
            type="text"
            className="inputs"
            placeholder="password"
            onChange={(e) => setPasswordReg(e.target.value)}
          />
          <button className="registerbutton" onClick={register}>
            Register
          </button>
          <h2 className="login">
            Already a member? <Link to="/login">login</Link>
          </h2>
        </div>
      </form>
    </div>
  );
}

export default Register;
