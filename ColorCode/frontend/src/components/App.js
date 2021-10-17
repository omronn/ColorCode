import React, { useState } from "react";
import { render } from "react-dom";
import UserPreferences from "./UserPreferences";

function App(props) {
    const path = window.location.href.split("/").at(-1);
    if (path === 'Palette') {
        // Return Palette Page
        return (
            <div>
                TODO Palette results frontend
            </div>
        );
    }
    else {
        // Return home page
        return (
            <div>
                <UserPreferences></UserPreferences>
            </div>
        );
    }
}

export default App;