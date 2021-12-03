import React, { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

// Main function that routes to the correct fake site
function FakeSite(props) {
    const [colors, setColors] = useState(props.colors);
    const [version, setVersion] = useState(props.version);

    // Build colors list out to 6 if not the case
    // Yes they're virtually the same, no there is not a better way
    useEffect(() => {
        const newcolors = props.colors;
        const newnum = props.colors.length;
        for (let i = newnum; i < 6; i++) {
            newcolors.push(props.colors.at(0));
        }
        setVersion(props.version);
        setColors(newcolors);
    }, []);

    // Update local state anytime props changes (palette changes)
    useEffect(() => {
        const newcolors = props.colors;
        const newnum = props.colors.length;
        for (let i = newnum; i < 6; i++) {
            newcolors.push(props.colors.at(0));
        }
        setVersion(props.version);
        setColors(newcolors);
    }, [props]);

    switch (version) {
        case 1:
            return (<Container className="fakesite-box"><FakeSiteOne colors={[...colors]} /></Container>);
            break;
        case 2:
            return (<Container className="fakesite-box"><FakeSiteTwo colors={[...colors]} /></Container>);
            break;
        default:
            return (<Container className="fakesite-box"><FakeSiteOne colors={[...colors]} /></Container>);
            break;
        // Add more cases for each fake site
    }
}

// VVVVVVVVVVVVVVVVVVVVVVVVVVV
// Fake Site Displays go below
// VVVVVVVVVVVVVVVVVVVVVVVVVVV

function FakeSiteOne(props) {
    // TODO: edit this html based on the number of colors included.
    const [colors, setColors] = useState(props.colors);

    //makes the text readable on the given bg
    var tinycolor = require("tinycolor2"); //this makes tinycolor work
    let textcolors = ["#fff", "#fff", "#fff", "#fff", "#fff", "#fff"];
    for (let i = 0; i < colors.length; i++) {
        textcolors[i] = tinycolor.mostReadable(colors[i], ['#000', '#fff']).toHexString();
    }

    

    // First render
    useEffect(() => {
        setColors(props.colors);
        console.log(props.colors);
    }, []);
    // Update local state anytime props changes (palette changes)
    useEffect(() => {
        setColors(props.colors);
    }, [props]);

    return (
        <Container className="palette-box" style={{backgroundColor: '#' + colors.at(1), color: textcolors[1] }}>

            {/* <div>color list: {colors.at(0)} , {colors.at(1)} , {colors.at(2)} , {colors.at(3)} , {colors.at(4)} , {colors.at(5)} , {colors.at(6)}</div> */}
            
            <Row className="fake-header" style={{backgroundColor: '#' + colors.at(4), color: textcolors[4]}}>
                <Col sm className="fake-title">
                    Sample UI #1
                </Col>
                <Col div style={{textAlign: 'center'}}>
                    #{ colors.at(4) }
                </Col>
                <Col>
                    <div style={{textAlign: 'right'}}>Twitter || Facebook || LinkedIn</div>
                </Col>
            </Row>

            <Row className="fake-body" style={{backgroundColor: '#' + colors.at(1), color: textcolors[1] }}>
                <Col> #{ colors.at(1) } </Col>
                <Col lg>
                    <div class="fake-main-window" style={{backgroundColor: '#' + colors.at(0), color: textcolors[0] }}>
                        <div class="fake-alert" style={{backgroundColor: '#' + colors.at(3), color: textcolors[3] }}> #{ colors.at(3) } Alert! Please note that...</div>
                        <div> #{ colors.at(0) } <br/> This is the text in a primary window!<br/>Information goes here.</div>
                        <div class="fake-button" style={{backgroundColor: '#' + colors.at(2), color: textcolors[2] }}> #{ colors.at(2) } Fake Button!</div>
                    </div>
                </Col>
                <Col> #{ colors.at(1) }</Col>
            </Row>
            <Row className="fake-body" style={{backgroundColor: '#' + colors.at(1), color: textcolors[1] }}>
                <Col></Col>
                <Col lg>
                    <div class="fake-secondary-window" style={{backgroundColor: '#' + colors.at(5), color: textcolors[5] }}> #{ colors.at(5) } This is a secondary window with additional info.</div>
                </Col>
                <Col></Col>
            </Row>

            <Row className="fake-header" style={{backgroundColor: '#' + colors.at(4), color: textcolors[4] }}>
                <Col sm>
                Footer. Socmed links. Copyright information
                </Col>
            </Row>
        </Container>
    );
}

function FakeSiteTwo(props) {
    // TODO: edit this html based on the number of colors included.
    const [colors, setColors] = useState(props.colors);

     //makes the text readable on the given bg
     var tinycolor = require("tinycolor2"); //this makes tinycolor work
     let textcolors = ["#fff", "#fff", "#fff", "#fff", "#fff", "#fff"];
     for (let i = 0; i < colors.length; i++) {
         textcolors[i] = tinycolor.mostReadable(colors[i], ['#000', '#fff']).toHexString();
     }

    // First render
    useEffect(() => {
        setColors(props.colors);
        console.log(props.colors);
    }, []);
    // Update local state anytime props changes (palette changes)
    useEffect(() => {
        setColors(props.colors);
    }, [props]);

    return (
        <Container className="palette-box-overflow" style={{backgroundColor: '#' + colors.at(2), color: textcolors[2] }}>
            <Navbar expand="lg" style={{backgroundColor: '#' + colors.at(0), color: textcolors[0] }}>
            <Container>
                <Navbar.Brand>Navigation Bar: Click to Dropdown</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto" style={{backgroundColor: '#' + colors.at(2)}}>
                    <Nav.Link style={{backgroundColor: '#' + colors.at(1), color: textcolors[1] }}>Home (Have at least 2 colors in your palette to alternate colors)</Nav.Link>
                    <Nav.Link style={{backgroundColor: '#' + colors.at(0), color: textcolors[0] }}>Link</Nav.Link>
                    <NavDropdown title="Dropdown" id="basic-nav-dropdown" style={{backgroundColor: '#' + colors.at(1), color: textcolors[1] }}>
                        <NavDropdown.Item style={{backgroundColor: '#' + colors.at(0), color: textcolors[0] }}>Action</NavDropdown.Item>
                        <NavDropdown.Item style={{backgroundColor: '#' + colors.at(1), color: textcolors[1] }}>Another action</NavDropdown.Item>
                        <NavDropdown.Item style={{backgroundColor: '#' + colors.at(0), color: textcolors[0] }}> Something</NavDropdown.Item>
                        <NavDropdown.Divider style={{backgroundColor: '#' + colors.at(0), color: textcolors[0] }}/>
                        <NavDropdown.Item style={{backgroundColor: '#' + colors.at(1), color: textcolors[1] }}>Separated link</NavDropdown.Item>
                    </NavDropdown> 
                </Nav>
                </Navbar.Collapse>
            </Container>
            </Navbar>
    </Container>
    );
}

export default FakeSite;