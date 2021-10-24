import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Button from "react-bootstrap/Button";

function Palette() {
    // TODO Declare Palette vars and setters with useState
    const [baseColor, setBaseColor] = useState("000000");
    const [colorJsonList, setJsonList] = useState([])

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
                console.log("Palette fetched:");
                console.log(data); // for testing purposes
                setBaseColor(data.base_color);
                // Convert to usable list
                setJsonList(JSON.parse(data.palette_list));
            }
        ).catch((error) => {
            console.log("error");
            console.log(error);
            console.log("routing to preferences");
            const s = window.location.href;
            const stuff = s.substring(0, s.lastIndexOf('/'));
            window.location.replace(stuff);
        });
    }

    const BackButton = () => {
        return (
            <Button onClick={() => {
                const s = window.location.href;
                const stuff = s.substring(0, s.lastIndexOf('/'));
                window.location.replace(stuff);
            }} variant="success">Back</Button>
        );
    }

    // Uncomment once Palette backend works 
    useEffect(FetchPalette, []);  // KEEPME, WILL USE ONCE FETCHPALETTE DATA DONE

    // Makes colored container for each color. Temp way to display colors
    const containers = []
    for (const [index, value] of colorJsonList.entries()) {
        containers.push(<Container fluid className="p-3 my-3 align-self-center" style={{ backgroundColor: '#' + value }}></Container>)
    }

    return (
        <Container fluid className="vh-100 p-5 bg-dark text-white text-center">
            <h1>THE PALETTE:</h1>
            <div> Main Color: </div>
            <Container fluid className="p-3 my-3 align-self-center" style={{ backgroundColor: '#' + baseColor }}></Container>
            <div> Generated Colors: </div>
            { containers }
            <BackButton />
        </Container>
    );
}


export default Palette;