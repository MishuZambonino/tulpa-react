import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import "./App.css";
import {
  LOGIN_PAGE,
  OCUPATION_PAGE,
  FLOOR_PAGE,
  UNIVERSITY_PAGE,
  COUNTRY_PAGE,
} from "./constants/routes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "reflect-metadata";
import Login from "./pages/Login";
import Ocupation from "./pages/administration/Ocupation/Ocupation";
import Floor from "./pages/administration/Floor/Floor";
import University from "./pages/administration/University/University";
import Country from "./pages/administration/Country/Country";

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
            <Route path={FLOOR_PAGE} exact component={Floor} />
            <Route path={UNIVERSITY_PAGE} exact component={University} />
            <Route path={COUNTRY_PAGE} exact component={Country} />
          </Switch>
        </Router>
      </AuthContext.Provider>
      <ToastContainer />
    </>
  );
}
