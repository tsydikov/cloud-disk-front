import React, { useEffect } from "react";
import Navbar from "./navbar/Navbar";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import "./app.css";
import Registration from "./authorization/Registration";
import Login from "./authorization/Login";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../actions/user";
import Disk from "./disk/Disk";
import Profile from "./navbar/profile/Profile";

function App() {
  const isAuth = useSelector((state) => state.user.isAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(auth());
    // eslint-disable-next-line
  }, []);
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <div className="wrap">
          {!isAuth ? (
            <Switch>
              <Route path="/registration" component={Registration} />
              <Route path="/login" component={Login} />
              <Redirect to="/login" />
            </Switch>
          ) : (
            <Switch>
              <Route exact path="/" component={Disk} />
              <Route exact path="/profile" component={Profile} />
              <Redirect to="/" />
            </Switch>
          )}
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
