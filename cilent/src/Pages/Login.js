import React, { useState, useEffect } from "react";
import "../App.css";
import Axios from "axios";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  let history = useHistory();

  const [loginStatus, setLoginStatus] = useState("");

  Axios.defaults.withCredentials = true;

  const login = () => {
    Axios.post("http://localhost:3001/login", {
      username: username,
      password: password,
    }).then((response) => {
      if (response.data.message) {
        setLoginStatus(response.data.message);
      } else {
        history.push("/main");
        setLoginStatus(response.data[0].username);
      }
    });
  };

  const transaction = () => {
    Axios.post("http://localhost:3001/login", {});
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/login").then((response) => {
      if (response.data.loggedIn == true) {
        Axios.post("http://localhost:3001/create", {
          username: response.data.username,
        });
        window.localStorage.setItem("logStat", 1);
        history.push("/main");
      } else {
        window.localStorage.setItem("logStat", 0);
      }
    });
  }, []);

  return (
    <div className="main-login">
      <div class="background">
        <div class="shape"></div>
        <div class="shape"></div>
      </div>
      <form className="login-form">
        <div className="login">
          <h1>Login</h1>
          <input
            className="inputs"
            type="text"
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="inputs"
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="loginbutton" onClick={login}>
            login
          </button>
          <h2 className="register">
            Not a member? <Link to="/register">Register</Link>
          </h2>
          <h1 className="result">{loginStatus}</h1>
        </div>
      </form>
    </div>
  );
}

export default Login;
