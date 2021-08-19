import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Login from "./pages/Login";
import Ocupation from "./pages/administration/Ocupation/Ocupation";
import "./App.css";
import { LOGIN_PAGE, OCUPATION_PAGE } from "./constants/routes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "reflect-metadata";

export const AuthContext = React.createContext(null);
export default function () {
  const [user, setUser] = useState("");
  const contextValue = { user, setUser };
  return (
    <>
      <AuthContext.Provider value={contextValue}>
        <Router>
          <Switch>
            <Route exact path="/">
              <Redirect to={LOGIN_PAGE} />
            </Route>
            <Route path={LOGIN_PAGE} exact component={Login} />
            <Route path={OCUPATION_PAGE} exact component={Ocupation} />
          </Switch>
        </Router>
      </AuthContext.Provider>
      <ToastContainer />
    </>
  );
}
