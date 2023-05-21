import * as React from "react";
import { FaCartPlus, FaHome, FaProductHunt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Card, Col, Row, CardBody, List, ListGroupItem, ListGroup } from "reactstrap";

const About: React.FC = () => {
    return (
        <>
            <Row className="mb-5">
                <Col md={2}></Col>
                <Col md={8}>
                    <Card>
                        <CardBody>
                            <center>
                                <img height={100} src="https://i.imgur.com/TfdIxR1.jpg"/>
                                <h1>ST Genetics Project</h1>
                            </center>
                            <hr/>
                            <p>
                                This application was developed by Samael F.S. (SFSUsuario)
                            </p>
                            <ListGroup>
                                <ListGroupItem>
                                    <Link to="/">
                                        <FaHome/> Home principal
                                    </Link>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <Link to="/products">
                                        <FaCartPlus/> Go to products section
                                    </Link>
                                </ListGroupItem>
                            </ListGroup>
                            <center className="mt-2">
                                <h4>Used technologies</h4>
                            </center>
                            <Row>
                                <Col>
                                    <b>Frontend</b>
                                    <ul>
                                        <li>Typescript / Javascript</li>
                                        <li>React</li>
                                        <li>Redux Saga & Toolkit</li>
                                        <li>HTML / CSS</li>
                                        <li>Bootstrap</li>
                                    </ul>
                                </Col>
                                <Col>
                                    <b>Backend</b>
                                    <ul>
                                        <li>C#</li>
                                        <li>.Net Core</li>
                                        <li>Entity Framework</li>
                                        <li>Razor</li>
                                        <li>SQLite</li>
                                    </ul>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
                <Col md={2}></Col>
            </Row>
        </>
    )
}

export default About;