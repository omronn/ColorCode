import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Switch from "react-switch";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
//npm install tinycolor2 (no import line but you need to run this!)
import { HexColorPicker } from "react-colorful"; // npm install react-colorful
import '../../static/css/index.css'; //this ensures it's included but doesnt help it overwrite. use !important for crucial css

function UserPreferences() {

    ///////////////////////////////////////////////
    ////////////////// VARIABLES //////////////////    
    ///////////////////////////////////////////////

    const [lightDark, setLightDark] = useState(false);
    const [neonPastel, setNeonPastel] = useState(false);
    const [oneManyHues, setOneManyHues] = useState(false);
    const [boldSubtle, setBoldSubtle] = useState(false);
    const [numColors, setNumColors] = useState(1);
    const [baseColor, setBaseColor] = useState("#ad0909"); //this is the default starter hex
    
    // consts beyond this point do NOT need to be passed back to django. 
    // they are solely variables for use within this page 8^)

    //these represent the NUMERIC VALUES of HSV, in order
    const [hueVal, setHueVal] = useState(0);
    const [neonVal, setNeonVal] = useState(.95);
    const [darkVal, setdarkVal] = useState(.68);
    var tinycolor = require("tinycolor2"); //this makes tinycolor work

    const [isCustom, setIsCustom] = useState(false);

    ///////////////////////////////////////////////
    ////// FETCHPREFERENCES AND PREFERENCES ///////    
    ///////////////////////////////////////////////

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
                //UpdateColorAction();
            }
        ).catch((error) => console.log("Fetching Preferences Failed"));
    }
    
    // THE MAIN SUBCOMPONENT
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
                            <ColorPickerHolder></ColorPickerHolder>
                        </Col>
                    </Row>
                    <Row className="p-1 justify-content-center">
                        <Col xs="auto" className="my-auto">
                            <ToggleColorButton></ToggleColorButton>
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

    ///////////////////////////////////////////////
    /// COLOR GENERATION ACTIONS AND USEEFFECTS ///    
    ///////////////////////////////////////////////

    //setVAR is async: a useEffect should update the color whenever it changes

    //changes lightDark
    const LightSwitchAction = () => {
        console.log("lSA: lightDark is currently", lightDark);
        setLightDark(!lightDark); 
        
    }

    //updates the darkVal if lightDark changes
    useEffect(() => {
        console.log("lightDark is now", lightDark, "update the val");
        if (lightDark) {setdarkVal(0.40)}
        else {setdarkVal(0.68)};
    }, [lightDark]);

    //changes neonPastel
    const NeonSwitchAction = () => {
        console.log("nSA: neonPastel is currently", neonPastel);
        setNeonPastel(!neonPastel);
    }

    //updates the neonVal if neonPastel changes
    useEffect(() => {
        console.log("neonPastel is now", neonPastel, "update the val");
        if (neonPastel) { setNeonVal(.40) }
        else { setNeonVal(.95)};
    }, [neonPastel]);

    //calls UpdateColorAction if either neonVal or darkVal change
    useEffect(() => {
        console.log("a Value has updated. NOW we can run UpdateColorAction")
        UpdateColorAction();
    }, [neonVal, darkVal]); 

    //updates the baseColor using tinycolor and the current HSV values
    const UpdateColorAction = () => {      
        //make the new color
        let newColor = "hsv " + hueVal + " " + neonVal + " " + darkVal;
        let tinyBaseColor = tinycolor(newColor);

        //printouts for sanity checking
        console.log("updateColor", newColor, tinyBaseColor.toHexString());
        console.log("neonPastel", neonPastel, ", lightDark,", lightDark );
        setBaseColor(tinyBaseColor.toHexString());
    }

    //when the baseColor is changed, this grabs the hue and saves it. 
    //technically this runs when changing from switches too but no one can click fast enough to mess it up lol
    useEffect(() => {
        console.log("new baseColor: save hue");
        let tinyHueGrab = tinycolor(baseColor);
        console.log(tinyHueGrab.toHsv().h);
        setHueVal(tinyHueGrab.toHsv().h);
    }, [baseColor]);

    ///////////////////////////////////////////////
    /////// BONUS: INFOBUTTON FOR DEBUGGING ///////    
    ///////////////////////////////////////////////

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

    ////////////////////////////////////////////
    /////////////  GENERATE BUTTON /////////////    
    ////////////////////////////////////////////

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

    /////////////////////////////////////////////
    /// COLORPICKER CONSTS AND COLORREFERENCE ///    
    /////////////////////////////////////////////

    //this gives the little reference square with the color as bg
    const ColorReference = () => {
        return (
            <Container className="text-black text-center align-self-center" style={{backgroundColor: baseColor}}>Color: {baseColor}</Container>
        );
    }

    //this lets you choose a color via switches and hue slider
    const SwitchColorPicker = () => {
        return (
            <Container fluid className="p-3 my-3 align-self-center">
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
                    <Row>
                        <Col>
                            <section className="hue-only">
                                <HexColorPicker className="justify-content-center"
                                    color={baseColor} 
                                    onChange={setBaseColor}
                                />
                            </section>
                        </Col>
                    </Row>
                </Form>
            </Container>
        )
    }

    //this lets you choose a custom color via picker or hex input
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
    }

    //this holds EITHER switchColorPicker OR CustomColorPicker and lets you toggle between them
    const ColorPickerHolder = () => {
        if (isCustom) {
            return (
                <Container className="color-input bg-secondary">
                    <CustomColorPicker></CustomColorPicker>
                </Container>
            );
        }
        else {
            return (
                <Container className="color-input bg-secondary">
                    <SwitchColorPicker></SwitchColorPicker>
                </Container>
            );
        }
    }

    //this button switches between the kinds of colorpicker
    const ToggleColorButton = () => {
        let buttonText = "...or input a custom color"
        if (isCustom) { buttonText = "...or use buttons" }
        return (
            <Button onClick={ ToggleColorButtonAction } variant="success">{ buttonText }</Button>
        );
    }

    const ToggleColorButtonAction = () => {
        console.log("switching color selection type");
        setIsCustom(!isCustom);
    }


    /////////////////////////////////////////////
    /////////// PALETTE PICKER CONST ////////////    
    /////////////////////////////////////////////
    
    //this holds the PALETTE generating inputs (numColors, oneManyColors, etc)
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


    //////////////////////////////////////////////
    //////////// PAGE LOAD AND RENDER ////////////    
    //////////////////////////////////////////////

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
