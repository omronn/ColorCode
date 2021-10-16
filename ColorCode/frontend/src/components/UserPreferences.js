import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Switch from "react-switch";
import Row from "react-bootstrap/Row";

function UserPreferences() {
    const [lightDark, setLightDark] = useState(false);
    const [neonPastel, setNeonPastel] = useState(false);
    const [oneManyHues, setOneManyHues] = useState(false);
    const [boldSubtle, setBoldSubtle] = useState(false);
    const [numColors, setNumColors] = useState(1);
    const [mainColor, setMainColor] = useState(0);

    const FetchPreferences = () => {
        // Get preferences (new or old) and save the state
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
        ).catch((error) => console.log("I fucked up"));
    }
    
    // Functions for subcomponents
    const Preferences = () => {
        return (
            <Container fluid className="p-5 my-5 bg-secondary align-self-center">
                <Form>
                    <Row>
                        Light <Switch onChange={() => { setLightDark(!lightDark); } } checked={lightDark}/> Dark
                    </Row>
                    <Row>
                        Neon <Switch onChange={() => { setNeonPastel(!neonPastel); } } checked={neonPastel}/> Pastel
                    </Row>
                    <Row>
                        Bold <Switch onChange={() => { setBoldSubtle(!boldSubtle); } } checked={boldSubtle}/> Subtle
                    </Row>
                    <Row>
                        One Hue <Switch onChange={() => { setOneManyHues(!oneManyHues); } } checked={oneManyHues}/> Many Hues
                    </Row>
                </Form>
            </Container>
        );
    }

    const GenerateButton = () => {
        return (
            <Button onClick={ GenerateButton } variant="success">Generate!</Button>
        );
    }

    // Fetches preferences once, upon page load
    useEffect(FetchPreferences, []);

    // TODO Not sure why oneManyHues is getting sent as true.  
    return (
        <Container fluid className="vh-100 p-5 bg-dark text-white text-center">
            <h1>I Want...</h1>
            <Preferences />
            <GenerateButton />
        </Container>
    );
}

export default UserPreferences;
