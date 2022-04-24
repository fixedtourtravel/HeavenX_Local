import React, { useState } from "react";
import "../styles/signup.css";
import ClientSignUp from "../component/client/ClientSignUp";
import SupplierSignUp from "../component/client/SupplierSignUp";
import Navbar from "./Navbar/Navbar";

export default function SignUp() {
  const [menu, setmenu] = useState("client");
  return (
    <>
      <Navbar />
      <div className="container-fluid signupPage">
        <img
          className="signup-Logo"
          src="/images/SignupPageImg.png"
          alt="logo"
        />
        <div className="row">
          <div className="col-12">
            <div className="container-fluid signupBox">
              <div className="row">
                <div className="col-12 text-left">
                  <div className="signup-Header">Sign Up</div>
                </div>
              </div>
              <div className="row signupMenuBar">
                <div className="col-4" style={{ textAlign: "center" }}>
                  <div
                    className={
                      menu === "client"
                        ? "signupMenu-btn active"
                        : "signupMenu-btn"
                    }
                    onClick={() => setmenu("client")}
                  >
                    Client
                  </div>
                </div>
                <div className="col-4" style={{ textAlign: "center" }}>
                  <div className="signupMenu-OR">-OR-</div>
                </div>
                <div className="col-4" style={{ textAlign: "center" }}>
                  <div
                    className={
                      menu === "supplier"
                        ? "signupMenu-btn active"
                        : "signupMenu-btn"
                    }
                    onClick={() => setmenu("supplier")}
                  >
                    Supplier
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  {menu === "client" ? <ClientSignUp /> : <SupplierSignUp />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
