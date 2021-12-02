import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Switch from "react-switch";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
//import { HuePicker } from 'react-color';
// import tinycolor2 from 'tinycolor2';
import { HexColorPicker } from "react-colorful"; // npm install react-colorful

function UserPreferences() {
    const [lightDark, setLightDark] = useState(false);
    const [neonPastel, setNeonPastel] = useState(false);
    const [oneManyHues, setOneManyHues] = useState(false);
    const [boldSubtle, setBoldSubtle] = useState(false);
    const [numColors, setNumColors] = useState(1);
    const [baseColor, setBaseColor] = useState("#ffffff");
    
    // consts beyond this point do NOT need to be passed back to django. 
    // they are solely variables for use within this page 8^)
    const [hueVal, setHueVal] = useState(0);
    const [neonVal, setNeonVal] = useState(.95);
    const [darkVal, setdarkVal] = useState(.68);
    var tinycolor = require("tinycolor2");

    const UpdateColorAction = () => {      
        //make the new color
        let newColor = "hsv " + hueVal + " " + neonVal + " " + darkVal;
        let tinyBaseColor = tinycolor(newColor);

        //printouts for sanity checking
        console.log("updateColor", newColor, tinyBaseColor.toHexString());
        console.log("neonPastel", neonPastel, ", lightDark,", lightDark );
        setBaseColor(tinyBaseColor.toHexString());
    }

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
                setBaseColor(data.main_color);
                UpdateColorAction();
            }
        ).catch((error) => console.log("Fetching Preferences Failed"));
    }
    
    // Functions for subcomponents
    const Preferences = () => {
        return (
            <Container fluid className="p-3 my-3 align-self-center">
                <Form className="my-auto">
                    <Row className="p-1 justify-content-center">
                        <Col xs="auto" className="my-auto">
                            <ColorReference></ColorReference>
                        </Col>
                    </Row>
                    <Row className="p-1 justify-content-center">
                        <Col xs="auto" className="my-auto">
                            <SwitchColorPicker></SwitchColorPicker>
                        </Col>
                    </Row>
                    <Row className="p-1 justify-content-center">
                        <Col xs="auto" className="my-auto">
                            <CustomColorPicker></CustomColorPicker>
                        </Col>
                    </Row>
                    <Row className="p-1 justify-content-center">
                        <Col xs="auto" className="my-auto">
                            <SwitchPalettePicker></SwitchPalettePicker>
                        </Col>
                    </Row>
                </Form>
            </Container>
        );
    }

    //setVAR is async: useEffect should update the color whenver it changes
    const LightSwitchAction = () => {
        console.log("lSA: lightDark is currently", lightDark);
        setLightDark(!lightDark); 
        
    }

    useEffect(() => {
        console.log("lightDark is now", lightDark, "update the val");
        if (lightDark) {setdarkVal(0.40)}
        else {setdarkVal(0.68)};
    }, [lightDark]);

    const NeonSwitchAction = () => {
        console.log("nSA: neonPastel is currently", neonPastel);
        setNeonPastel(!neonPastel);
    }

    useEffect(() => {
        console.log("neonPastel is now", neonPastel, "update the val");
        if (neonPastel) { setNeonVal(.40) }
        else { setNeonVal(.95)};
    }, [neonPastel]);

    useEffect(() => {
        console.log("a Value has updated. NOW we can run UpdateColorAction")
        UpdateColorAction();
    }, [neonVal, darkVal]); 



    // this is for debugging . print whatever you want to console.log!!
    const InfoButtonAction = () => {
        console.log("INFOBUTTON:");
        console.log("neonPastel is currently", neonPastel);
        console.log("lightDark is currently", lightDark);
        console.log("hsv " + hueVal + " " + neonVal + " " + darkVal);
    }

    const InfoButton = () => {
        return (
            <Button onClick={ InfoButtonAction } variant="success">console.log</Button>
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
                main_color: baseColor,
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
                setBaseColor(data.main_color);
            }
        ).then(
            () => {
                // Forward to Palette Page
                window.location.replace("/Palette");
            }
        ).catch((error) => console.log("Posting Preferences Failed"));
    }

    const GenerateButton = () => {
        return (
            <Button onClick={ GenerateButtonAction } variant="success">Generate?!</Button>
        );
    }

    const ColorReference = () => {
        return (
            <Container className="text-black text-center align-self-center" style={{backgroundColor: baseColor}}>Color: {baseColor}</Container>
        );
    }

    const SwitchColorPicker = () => {
        return (
            <Container fluid className="p-3 my-3 bg-secondary align-self-center">
                <Form className="my-auto">
                    <Row className="p-1 justify-content-center">
                        <Col xs="auto" className="align-self-center"> 
                            Light
                        </Col>
                        <Col xs="auto" className="align-self-center">
                            <Switch onChange={() => { LightSwitchAction(); } } checked={lightDark} checkedIcon="" uncheckedIcon=""/> 
                        </Col>
                        <Col xs="auto" className="align-self-center"> 
                            Dark
                        </Col>
                    </Row>
                    <Row className="p-1 justify-content-center">
                        <Col xs="auto" className="align-self-center"> 
                            Neon
                        </Col>
                        <Col xs="auto" className="my-auto">
                            <Switch onChange={() => { NeonSwitchAction(); } } checked={neonPastel} checkedIcon="" uncheckedIcon=""/>
                        </Col>
                        <Col xs="auto" className="align-self-center"> 
                            Pastel
                        </Col>
                    </Row>
                </Form>
            </Container>
        )
    }

    const SwitchPalettePicker = () => {
        return (
            <Container fluid className="p-3 my-3 bg-secondary align-self-center">
                <Form className="my-auto">
                    <Row className="p-1 justify-content-center">
                        <Col xs="auto" className="align-self-center"> 
                            Monochrome
                        </Col>
                        <Col xs="auto" className="my-auto">
                            <Switch onChange={() => { setOneManyHues(!oneManyHues); } } checked={oneManyHues} checkedIcon="" uncheckedIcon=""/>
                        </Col>
                        <Col xs="auto" className="align-self-center"> 
                            Multiple Colors
                        </Col>
                    </Row>
                    <Row className="p-1 justify-content-center">
                        <Col xs="auto" className="align-self-center"> 
                            Bold
                        </Col>
                        <Col xs="auto" className="my-auto">
                            <Switch onChange={() => { setBoldSubtle(!boldSubtle); } } checked={boldSubtle} checkedIcon="" uncheckedIcon=""/>
                        </Col>
                        <Col xs="auto" className="align-self-center"> 
                            Subtle
                        </Col>
                    </Row>
                    <Row className="p-1 justify-content-center">
                        Number of Colors: {numColors}
                    </Row>
                    <Row className="p-1 justify-content-center">
                        <Col xs="auto" className="my-auto">
                            <Form.Range value={numColors} onChange={(e) => { setNumColors(e.target.value); }} min='1' max='6' step='1'/>
                        </Col>
                    </Row>
                </Form>
            </Container>
        );
    }


    const CustomColorPicker = () => {
        return (
            <Container className="customPicker">
              <HexColorPicker className="justify-content-center"
                  color={baseColor} 
                  onChange={setBaseColor}
                />
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Hexcode Input (Optional):</Form.Label>
                        <Form.Control type="text" placeholder={baseColor} onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                setBaseColor(e.target.value);
                            }
                        }} />
                    </Form.Group>
                </Form>
            </Container>
          );
    } // this will be the final version once i figure out the bad hook

    //when the baseColor is changed, this grabs the hue and saves it. 
    //technically this runs when changing from switches too but i wasnt sure how to specify
    //do NOT then run updateColor or it might infinite loop? unclear but you dont need to
    //because this is just holding on in CASE user changes things later
    //and no one can click fast enough to mess it up lol
    useEffect(() => {
        console.log("new baseColor: save hue");
        let tinyHueGrab = tinycolor(baseColor);
        console.log(tinyHueGrab.toHsv().h);
        setHueVal(tinyHueGrab.toHsv().h);
    }, [baseColor]);

    // Fetches preferences once, upon page load
    useEffect(FetchPreferences, []);

    return (
        <Container fluid className="overflow-auto vh-100 p-5 bg-dark text-white text-center">
            <h1>I Want...</h1>
            <InfoButton />
            <Preferences />
            <GenerateButton />
        </Container>
    );
}

export default UserPreferences;
