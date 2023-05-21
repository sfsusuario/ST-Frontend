import React from "react";
import { Col, Container, Row } from "reactstrap"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navBar";
import Main from "./pages/main";
import About from "./pages/about";

const App: React.FC = () => {
    return (        
        <Router>
            <Navbar />
            <Container>
                <Row className="mt-5">
                    <Col sm="12">                    
                        <Routes>                
                            <Route path="/products"element={<Main />} />
                            <Route path="/" element={<About />} />            
                        </Routes>
                    </Col>
                </Row>
            </Container>       
        </Router>
    );    
}

export default App;