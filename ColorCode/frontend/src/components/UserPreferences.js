import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Switch from "react-switch";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { HuePicker } from 'react-color';

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
        ).catch((error) => console.log("Fetching Preferences Failed"));
    }
    
    // Functions for subcomponents
    const Preferences = () => {
        return (
            <Container fluid className="p-3 my-3 bg-secondary align-self-center">
                <Form className="my-auto">
                    <Row className="p-1 justify-content-center">
                        <Col md="auto">
                            Light <Switch onChange={() => { setLightDark(!lightDark); } } checked={lightDark}/> Dark
                        </Col>
                    </Row>
                    <Row className="p-1 justify-content-center">
                        <Col md="auto">
                            Neon <Switch onChange={() => { setNeonPastel(!neonPastel); } } checked={neonPastel}/> Pastel
                        </Col>
                    </Row>
                    <Row className="p-1 justify-content-center">
                        <Col md="auto">
                            One Hue <Switch onChange={() => { setOneManyHues(!oneManyHues); } } checked={oneManyHues}/> Many Hues
                        </Col> 
                    </Row>
                    <Row className="p-1 justify-content-center">
                        <Col md="auto">
                            Bold <Switch onChange={() => { setBoldSubtle(!boldSubtle); } } checked={boldSubtle}/> Subtle
                        </Col>
                    </Row>
                    <Row className="p-1 justify-content-center">
                        Number of Colors: {numColors}
                    </Row>
                    <Row className="p-1 justify-content-center">
                        <Col lg="auto">
                            <Form.Range value={numColors} onChange={(e) => { setNumColors(e.target.value); }} min='1' max='10' step='1'/>
                        </Col>
                    </Row>
                    <Row className="p-1 justify-content-center">
                        Main Color: {mainColor}. HuePicker will be what we use for this, but it gives colors in rgb format. Will have to change model or modify that.
                    </Row>
                    <Row className="p-1 justify-content-center">
                        <Col lg="auto">
                            <Form.Range value={mainColor} onChange={(e) => { setMainColor(e.target.value); }} min='0' max='360' step='1'/>
                        </Col>
                    </Row>
                </Form>
            </Container>
        );
    }

    const GenerateButtonAction = () => {
        // Get preferences (new or old) and save the state
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                light_dark: lightDark,
                neon_pastel: neonPastel,
                one_many_hues: oneManyHues,
                bold_subtle: boldSubtle,
                num_colors: numColors,
                main_color: mainColor,
            }),
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
        ).catch((error) => console.log("Posting Preferences Failed"));

        // Forward to Palette Page
        window.location.replace(window.location.href+"Palette");
    }

    const GenerateButton = () => {
        return (
            <Button onClick={ GenerateButtonAction } variant="success">Generate!</Button>
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
