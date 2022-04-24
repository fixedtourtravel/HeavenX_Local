import React, { useState } from "react";
import "../styles/signup.css";
import AdminSignUp from "../component/client/AdminSignUp";
import Navbar from "./Navbar/Navbar";

export default function SignUp() {
  const [menu, setmenu] = useState("admin");
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
                <div className="col-4">
                  <div
                    className={
                      menu === "admin"
                        ? "signupMenu-btn active"
                        : "signupMenu-btn"
                    }
                    onClick={() => setmenu("admin")}
                  >
                    Admin
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <AdminSignUp />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
