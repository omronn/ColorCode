import React, { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from 'react-bootstrap/Container';

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
            return (<FakeSiteOne colors={[...colors]} />);
            break;
        case 2:
            return (<FakeSiteTwo colors={[...colors]} />);
            break;
        default:
            return (<FakeSiteOne colors={[...colors]} />);
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

    // First render
    useEffect(() => {
        setColors(props.colors);
    }, []);
    // Update local state anytime props changes (palette changes)
    useEffect(() => {
        setColors(props.colors);
    }, [props]);

    return (
        <Container className="palette-box" style={{backgroundColor: '#' + colors.at(1)}}>

            {/* <div>color list: {colors.at(0)} , {colors.at(1)} , {colors.at(2)} , {colors.at(3)} , {colors.at(4)} , {colors.at(5)} , {colors.at(6)}</div> */}
            
            <Row className="fake-header" style={{backgroundColor: '#' + colors.at(4)}}>
                <Col sm className="fake-title">
                    Sample UI #1
                </Col>
                <Col>
                    <div style={{textAlign: 'right'}}>Twitter || Facebook || LinkedIn</div>
                </Col>
            </Row>

            <Row className="fake-body" style={{backgroundColor: '#' + colors.at(1)}}>
                <Col></Col>
                <Col lg>
                    <div class="fake-main-window" style={{backgroundColor: '#' + colors.at(0)}}>
                        <div class="fake-alert" style={{backgroundColor: '#' + colors.at(3)}}>Alert! Please note that...</div>
                        <div>This is the text in a primary window! Information goes here.</div>
                        <div class="fake-button" style={{backgroundColor: '#' + colors.at(2)}}>Click here!</div>
                    </div>
                </Col>
                <Col></Col>
            </Row>
            <Row className="fake-body" style={{backgroundColor: '#' + colors.at(1)}}>
                <Col></Col>
                <Col lg>
                    <div class="fake-secondary-window" style={{backgroundColor: '#' + colors.at(5)}}>This is a secondary window with additional info.</div>
                </Col>
                <Col></Col>
            </Row>

            <Row className="fake-header" style={{backgroundColor: '#' + colors.at(4)}}>
                <Col sm>
                Footer. Socmed links. Copyright information
                </Col>
            </Row>
        </Container>
    );
}

function FakeSiteTwo(props) {
    // TODO: edit this html based on the number of colors included.
    const [colors, setColors] = useState([]);
    const [numColors, setNumColors] = useState(6);

    // Update local state anytime props changes (palette changes)
    useEffect(() => {
        setColors(props.colors);
    }, [props]);

    return (
        <Container className="palette-box">
            
            <Row className="fake-header">
                <Col sm>
                    Title: FakeSiteTwo
                </Col>
                <Col>
                    Nav buttons
                </Col>
            </Row>

            <Row className="fake-body">
                <Col></Col>
                <Col lg>
                    <div class="fake-main-window">
                        <div class="fake-alert">Alert! Please note that...</div>
                        <div>This is the text in a primary window! Information goes here.</div>
                        <div class="fake-button">Click here!</div>
                    </div>
                </Col>
                <Col></Col>
            </Row>
            <Row className="fake-body">
                <Col></Col>
                <Col lg>
                    <div class="fake-secondary-window">This is a secondary window with additional info.</div>
                </Col>
                <Col></Col>
            </Row>

            <Row className="fake-header">
                <Col sm>
                Footer. Socmed links. Copyright information
                </Col>
            </Row>
            
        
        </Container>
    );
}

export default FakeSite;