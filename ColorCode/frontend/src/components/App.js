import React, { useState } from "react";
import { render } from "react-dom";
import UserPreferences from "./UserPreferences";

function App(props) {
    return (
        <div>
            <UserPreferences></UserPreferences>
        </div>
    );
}

export default App;