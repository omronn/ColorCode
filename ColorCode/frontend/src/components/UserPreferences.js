import React, { useState } from "react";
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from "react-bootstrap/ToggleButton";
import Button from "react-bootstrap/Button";

function UserPreferences(props) {
    const [lightDark, setLightDark] = useState(false);
    const [neonPastel, setNeonPastel] = useState(false);
    const [oneManyHues, setOneManyHues] = useState(false);
    const [boldSubtle, setBoldSubtle] = useState(false);
    const [numColors, setNumColors] = useState(1);
    const [mainColor, setMainColor] = useState(0);

    const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    };

    fetch("/api/UserPreferences", requestOptions).then(
        (response) => {
            if (!response.ok) throw Error(response.statusText);
            return response.json();
        }
    ).then(
        (data) => {
            setLightDark(data.light_dark);
            setNeonPastel(data.neon_pastel);
            setOneManyHues(data.one_many_hues);
            setBoldSubtle(data.bold_subtle);
            setNumColors(data.num_colors);
            setMainColor(data.main_color);
        }
    ).catch((error) => console.log(error));

    return (
        <Container fluid className="vh-100 p-5 bg-dark text-white text-center">
            <h1>I Want...</h1>
            <Preferences lightDark={lightDark} neonPastel={neonPastel}
                oneManyHues={oneManyHues} boldSubtle={boldSubtle}
                numColors={numColors} mainColor={mainColor}/>
        </Container>
    );
}

function Preferences(props) {
    return (
        <> 
            <Container fluid className="p-5 my-5 bg-secondary align-self-center">
                <h1>Buttons Go Here</h1>
            </Container>
            <Button variant="success">Generate!</Button>{''}    
        </>
    );
}

function GenerateButton(props) {
    return (
        <div></div>
    );
}

export default UserPreferences;
