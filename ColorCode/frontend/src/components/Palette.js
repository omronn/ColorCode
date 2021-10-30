import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FakeSite from './FakeSite';
//import '../static/index.css';

function Palette() {
    const [baseColor, setBaseColor] = useState("000000");
    const [colorJsonList, setJsonList] = useState([]);
    // This is a constant that will change as we implement more fake websites to view
    const [numFakeVersions, setNumFakeVersions] = useState(2);
    const [fakeVersion, setFakeVersion] = useState(1);
    const history = useHistory();

    // NOTE: Needs to remain above ColorList and other functions that utilize 
    // The colorJsonList/baseColor items
    useEffect(() => {
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
            window.location.replace("/");
        });
    }, []);  // KEEPME, WILL USE ONCE FETCHPALETTE DATA DONE

    const BackButton = () => {
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

    const FakeSiteVersions = () => {
        const buttons = [];
        for (let index = 1; index <= numFakeVersions; index++) {
            buttons.push(
                <Col xs="auto" className="align-self-center"> 
                    <Button onClick={() => { setFakeVersion(index) }}> { index } </Button>
                </Col>
            );
        }
        return (
            <Row className="p-1 justify-content-center">
                {buttons}
            </Row>
        );
    }


    // ACTUALLY RUNS WHEN COMPONENT RENDERS
    return (
        <Container fluid className="overflow-auto vh-100 p-5 bg-dark text-white text-center">
            <h1> Example Color Usage:</h1>
            <FakeSite colors={[...colorJsonList]} version={fakeVersion} />
            <FakeSiteVersions />
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