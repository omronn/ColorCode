import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom"
import UserPreferences from "./UserPreferences";
import Palette from "./Palette";

function App(props) {
    return (
        <Router>
            <Switch>
                <Route exact path='/' component={UserPreferences}></Route>
                <Route path='/Palette' component={Palette}></Route>
            </Switch>
        </Router>
    );
}

export default App;