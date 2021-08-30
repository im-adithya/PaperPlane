import React, { useContext } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Button, Image, Navbar, Nav, NavDropdown } from "react-bootstrap";

import { userLogin } from "../actions/userLogin";
import { userLogout } from "../actions/userLogout";
import { AuthContext } from "../Auth";
import logo from "../assets/logo.svg";
import question from "../assets/question-mark.svg";

const Header = () => {
  const user = useContext(AuthContext).currentUser;
  const setHelper = useContext(AuthContext).helper.setHelper;
  return (
    <header>
      <Navbar
        bg="light"
        variant="light"
        expand="lg"
        className="shadow-sm py-0 zindex1"
        collapseOnSelect
      >
        <LinkContainer to={user ? "/home" : "/"} className="pointer">
          <Image src={logo} width="160px" />
        </LinkContainer>
        <Nav className="ml-auto flex-row align-items-center">
          <div className="py-1 px-3 pointer" onClick={() => setHelper(true)}>
            <Image src={question} width="23px" />
          </div>
          {user ? (
            <NavDropdown
              title={
                <div className="pull-left">
                  <img
                    width="50px"
                    src={user.photoURL}
                    style={{ borderRadius: "25px" }}
                    className="p-2"
                    alt="user pic"
                  />
                </div>
              }
              id="username"
              align="end"
            >
              <LinkContainer to="/fly">
                <NavDropdown.Item>Takeoff! - Fly</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/home">
                <NavDropdown.Item>Home</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/schedule">
                <NavDropdown.Item>My Schedule</NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Item onClick={userLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
          ) : (
            <Button variant="primary" className="m-2" onClick={userLogin}>
              Sign in
            </Button>
          )}
        </Nav>
      </Navbar>
    </header>
  );
};

export default Header;
