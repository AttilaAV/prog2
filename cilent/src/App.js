import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import "./App.css";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Protected from "./Pages/Protected";
import Main from "./Pages/Main";
import React, { useEffect, useState } from "react";
import Axios from "axios";

function App(props) {
  var isAuth = window.localStorage.getItem("logStat");
  console.log(isAuth);
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={Login}></Route>
        <Route exact path="/register" component={Register}></Route>
      </Switch>

      <Protected path="/main" component={Main} isAuth={isAuth} />
    </Router>
  );
}

export default App;
