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
} from "reactstrap";

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
      <Navbar color="dark" dark expand="md" fixed="">
        <NavbarBrand href="/">Tender Management</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink tag={ReactLink} to="/login">
                Login
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={ReactLink} to="/signup">
                SignUp
              </NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                More
              </DropdownToggle>
              <DropdownMenu end>
                <DropdownItem>Services</DropdownItem>
                <DropdownItem>Contact US</DropdownItem>
                <DropdownItem divider />
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          <Nav navbar>
            {login && (
              <>
                {!isAdmin && (
                  <NavItem>
                    <NavLink tag={ReactLink} to="/user/tender">
                      Apply tenders
                    </NavLink>
                  </NavItem>
                )}
                {isAdmin && (
                  <NavItem>
                    <NavLink tag={ReactLink} to="/user/tenders">
                      ADD TENDERS
                    </NavLink>
                  </NavItem>
                )}
                <NavItem>
                  <NavLink>{user.email}</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink onClick={Logout}>Logout</NavLink>
                </NavItem>
              </>
            )}
            {!login && (
              <NavItem>
                <NavLink tag={ReactLink}>About us</NavLink>
              </NavItem>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default CustomNavbar;
