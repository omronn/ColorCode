import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
//import '../static/index.css';

function Palette() {
    // TODO Declare Palette vars and setters with useState
    const [baseColor, setBaseColor] = useState("000000");
    const [colorJsonList, setJsonList] = useState([]);

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
                //assign colors to css classes

                
            }
        ).catch((error) => {
            console.log("error");
            console.log(error);
            console.log("routing to preferences");
            let history = useHistory();
            history.push('/');
        });
    }
    // NOTE: Needs to remain above ColorList and other functions that utilize 
    // The colorJsonList/baseColor items
    useEffect(FetchPalette, []);  // KEEPME, WILL USE ONCE FETCHPALETTE DATA DONE

    const BackButton = () => {
        let history = useHistory();
        return (
            <Button onClick={() => {
                history.push('/');
            }} variant="success">Back</Button>
        );
    }

    const ExportButton = () => {
        const ExportButtonClick = () => {
            let link = document.createElement('a');
            link.download = 'Palette.txt'

            const color_list = []
            for (const [index, value] of colorJsonList.entries()) {
                color_list.push('#' + value);
            }

            const color_string = color_list.toString().split(',').join('\n');

            let blob = new Blob([color_string], { type: 'text/plain' });

            link.href = URL.createObjectURL(blob);

            link.click();

            URL.revokeObjectURL(link.href);
        }
        return (
            <Button onClick={ExportButtonClick} variant="success">Export!</Button>
        );
    }

    const FakeSite = () => {
        // TODO: edit this html based on the number of colors included.

        return (
            <Container className="palette_box">
                
                <Row className="fake-header">
                    <Col sm>
                        Title
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
                <Row class="fake-body">
                    <Col></Col>
                    <Col lg>
                        <div class="fake-secondary-window">This is a secondary window with additional info.</div>
                    </Col>
                    <Col></Col>
                </Row>

                <Row class="fake-header">
                    <Col sm>
                    Footer. Socmed links. Copyright information
                    </Col>
                </Row>
                
            
            </Container>
        );
    }

    
    const ColorList = () => {
        const color_list = []
        for (const [index, value] of colorJsonList.entries()) {
            color_list.push(
                <Container className="sm p-1 my-1 text-white text-center align-self-center" style={{ backgroundColor: '#' + value }}>Color: #{value}</Container>
            );
        }

        return (
            <Container className="sm p-1 my-1 text-white text-center align-self-center">
                {color_list}
            </Container>
        );
    }



    // ACTUALLY RUNS WHEN COMPONENT RENDERS
    return (
        <Container fluid className="overflow-auto vh-100 p-5 bg-dark text-white text-center">
            <h1> Example Color Usage:</h1>
            <FakeSite />
            <h1>THE PALETTE:</h1>
            <ColorList />
            <Row className="p-1 justify-content-center">
                <Col md="auto">  
                    <BackButton />
                </Col>
                <Col md="auto">  
                    <ExportButton />
                </Col>
            </Row>
            
        </Container>
    );
}


export default Palette;