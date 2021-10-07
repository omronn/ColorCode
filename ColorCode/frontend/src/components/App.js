import React, { Component } from "react";
import { render } from "react-dom";

function App(props) {
    return (<h1>Welcome to the homepage</h1>);
}

const appDiv = document.getElementById("app");
const element = <App />
render(
    element,
    appDiv
);

export default App;