import React, { useState } from "react";
import { Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavLink } from "reactstrap";
import { FaShoppingCart } from "react-icons/fa";

const NavBar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <Navbar color="light" light expand="md">
            <NavbarBrand href="/">ST Genetics</NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <NavLink href="/">Main</NavLink>
                    </NavItem>          
                    <NavItem>
                        <NavLink href="/Products">Products</NavLink>
                    </NavItem>          
                </Nav>
            </Collapse>
        </Navbar>
    );
};

export default NavBar;