import React from "react";
import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch,
} from "react-router-dom";
import Login from "./pages/Login";
import "./App.css"
import {LOGIN_PAGE} from "./constants/routes";

export default function () {
    return(
        <Router>
            <Switch>
                <Route exact path="/">
                    <Redirect to={LOGIN_PAGE} />
                </Route>
                <Route path={LOGIN_PAGE} exact component={Login}/>
            </Switch>
        </Router>
    );
}
