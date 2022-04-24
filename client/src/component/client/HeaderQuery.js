import React, { useState } from "react";
import { Navbar, Nav, NavItem } from "reactstrap";
import * as ROUTES from "../../constants/routes";
import { Button } from "reactstrap";
import { Link, Redirect } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Search from "./Search";
import "../../styles/header.css";
import { BsFillPersonFill } from "react-icons/bs";
import { BsSearch } from "react-icons/bs";

export default function HeaderQuery() {
  const [menu, setmenu] = useState("home");
  const auth = useAuth();
  return (
    <div>
      {/* <Navbar vertical light color="light"  expand="md" className="header-Menubar"> */}
      <Navbar vertical light color="light" expand="md" className="me-auto">
        <div className="container-fluid">
          <Nav className="ml-auto" navbar>
            <NavItem className="ml-6">
              <BsSearch size="40px" />
            </NavItem>

            <NavItem className="ml-4">
              <Search />
            </NavItem>
            <NavItem className="ml-4">
              {auth.user ? (
                <Link to={ROUTES.MYORDERS}>
                  <Button
                    className="myOrders-Btn"
                    onClick={() => {
                      <Redirect to="/myorders/orders" />;
                    }}
                  >
                    My Orders
                  </Button>
                </Link>
              ) : null}
            </NavItem>
            <NavItem className="ml-4"></NavItem>
            <NavItem className="ml-4"></NavItem>
            <NavItem className="ml-6">
              <BsFillPersonFill size="40px" />
            </NavItem>
          </Nav>
        </div>
      </Navbar>
    </div>
  );
}
