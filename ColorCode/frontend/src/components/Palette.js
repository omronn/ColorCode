import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";


function Palette() {
    // TODO Declare Palette vars and setters with useState
    const [baseColor, setBaseColor] = useState("000000");
    const [colorJsonList, setJsonList] = useState("{}")

    const FetchPalette = () => {
        // Get preferences (new or old) and save the state
        const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        };

        fetch("/api/Palette", requestOptions).then(
            (response) => {
                if (!response.ok) throw Error(response.statusText);
                return response.json();
            }
        ).then(
            (data) => {
                console.log("Palette fetched:")
                console.log(data) // for testing purposes
                setBaseColor(data.base_color)
                setJsonList(data.palette_list)

            }
        ).catch((error) => {
            console.log('error')
            console.log(error)
            console.log('routing to preferences')
            const s = window.location.href;
            const stuff = s.substring(0, s.lastIndexOf('/'));
            window.location.replace(stuff);
        });
    }

    useEffect(FetchPalette(), []);  // KEEPME, WILL USE ONCE FETCHPALETTE DATA DONE
    return (
        <p>
            <h1>THE PALETTE:</h1>
            <p> { baseColor } </p>
            <p> { colorJsonList } </p>
            <p> return to preferences page button </p>
        </p>
    );
}

export default Palette;