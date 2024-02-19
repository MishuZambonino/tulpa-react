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
  TEACHER_PAGE,
  SCHEDULE_PAGE,
  BALANCE_PAGE,
  STUDENT_PAGE,
} from "./constants/routes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "reflect-metadata";
import Login from "./pages/Login";
import Teacher from "./pages/administration/Teacher/Teacher";
import Schedule from "./pages/administration/Schedule/Schedule";
import Balance from "./pages/administration/Blance/Balance";
import Student from "./pages/administration/Student/Student";

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
            <Route path={TEACHER_PAGE} exact component={Teacher} />
            <Route path={SCHEDULE_PAGE} exact component={Schedule} />
            <Route path={BALANCE_PAGE} exact component={Balance} />
            <Route path={STUDENT_PAGE} exact component={Student} />
          </Switch>
        </Router>
      </AuthContext.Provider>
      <ToastContainer />
    </>
  );
}
