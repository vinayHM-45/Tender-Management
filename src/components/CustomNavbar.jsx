import React, { useEffect, useState } from "react";
import { NavLink as ReactLink } from "react-router-dom";
import { doLogout, getCurrentUserDetail, isLoggedIn } from "../storage";
import { useNavigate } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faSignOutAlt,
  faPlus,
  faFileAlt,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";

function CustomNavbar({ isAdmin }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const [login, setLogin] = useState(false);
  const [user, setUser] = useState(undefined);
  useEffect(() => {
    setLogin(isLoggedIn());
    setUser(getCurrentUserDetail());
    console.log("Login status:", login);
    console.log("User details:", user);
    console.log("User email:", email);
  }, []);
  const email = user?.email;

  const Logout = () => {
    doLogout(() => {
      setLogin(false);
      navigate("/login");
    });
  };

  return (
    <div>
      <Navbar color="dark" dark expand="md" className="py-3 shadow">
        <NavbarBrand href="/" className="ms-3 fs-4 fw-bold">
          <FontAwesomeIcon icon={faFileAlt} className="me-2" />
          Tender Management
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            {!login && (
              <>
                <NavItem>
                  <NavLink tag={ReactLink} to="/login" className="mx-2">
                    <Button color="outline-light" size="sm">
                      <FontAwesomeIcon icon={faUser} className="me-2" />
                      Login
                    </Button>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={ReactLink} to="/signup" className="mx-2">
                    <Button color="outline-light" size="sm">
                      <FontAwesomeIcon icon={faUser} className="me-2" />
                      SignUp
                    </Button>
                  </NavLink>
                </NavItem>
              </>
            )}
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret className="text-light">
                More
              </DropdownToggle>
              <DropdownMenu end>
                <DropdownItem>Services</DropdownItem>
                <DropdownItem>Contact Us</DropdownItem>
                <DropdownItem divider />
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          <Nav navbar>
            {login && (
              <>
                {!isAdmin && (
                  <NavItem>
                    <NavLink
                      tag={ReactLink}
                      to="/user/tender"
                      className="text-light"
                    >
                      <FontAwesomeIcon icon={faFileAlt} className="me-2" />
                      Apply Tenders
                    </NavLink>
                  </NavItem>
                )}
                {isAdmin && (
                  <NavItem>
                    <NavLink
                      tag={ReactLink}
                      to="/user/tenders"
                      className="text-light"
                    >
                      <FontAwesomeIcon icon={faPlus} className="me-2" />
                      Add Tenders
                    </NavLink>
                  </NavItem>
                )}
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret className="text-light">
                    <FontAwesomeIcon icon={faUser} className="me-2" />
                    {user.email}
                  </DropdownToggle>
                  <DropdownMenu end>
                    <DropdownItem onClick={Logout}>
                      <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />
                      Logout
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </>
            )}
            {!login && (
              <NavItem>
                <NavLink tag={ReactLink} className="text-light">
                  <FontAwesomeIcon icon={faInfoCircle} className="me-2" />
                  About Us
                </NavLink>
              </NavItem>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default CustomNavbar;
