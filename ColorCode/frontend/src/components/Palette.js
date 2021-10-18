import React, { useState, useEffect } from "react";

function Palette() {
    // TODO Declare Palette vars and setters with useState

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
                // TODO set palette vars here
            }
        ).catch((error) => {
            console.log('routing to preferences')
            const s = window.location.href;
            const stuff = s.substring(0, s.lastIndexOf('/'));
            window.location.replace(stuff);
        });
    }

    //useEffect(FetchPalette(), []); KEEPME, WILL USE ONCE FETCHPALETTE DATA DONE
    return (
        <p>
            This is the Palette Page TODO DISPLAY PALETTE
        </p>
    );
}

export default Palette;