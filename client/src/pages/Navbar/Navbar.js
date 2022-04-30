import React, { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import Help from "../../component/Vendor/model/Help&support/Help";
import profilepic from "../../image/profilepic.png";
import { useAuth } from "../../context/AuthContext";
import "./Navbar.css";
import "../../component/Vendor/Commonstyle.css";
import axios from "axios";
import * as ROUTES from "../../constants/routes";
import Profile from "../../component/Vendor/Profile/Home";
import { NavLink } from "react-router-dom";

function Navbar() {
  const [img, setImg] = useState("");
  const [showHelp, setShowHelp] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [logo, setLogo] = useState("");
  const [name, setName] = useState("");
  const [tagline, settagline] = useState("");

  const auth = useAuth();

  const handleSetHelp = () => {
    setShowHelp(!showHelp);
  };

  const handleSetProfile = () => {
    setShowProfile(!showProfile);
  };

  const getCompanyInfo = async () => {
    await axios({
      method: "get",
      url: ROUTES.BASELINK + `/admin/getCompanyInfo`,
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.data.data && res.data.data.name) {
        setName(res.data.data.name);
        settagline(res.data.data.tagline);
      }
    });
  };

  const CompanyPic = async () => {
    await axios({
      method: "get",
      url: ROUTES.BASELINK + "/admin/comapanylogoDownload",
      responseType: "blob",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      const imageObjectURL = URL.createObjectURL(res.data);
      setLogo(imageObjectURL);
    });
  };

  const profilePic = async () => {
    await axios({
      method: "POST",
      url: ROUTES.BASELINK + "/vendor/download",
      responseType: "blob",
      data: {
        userId: auth.user._id,
        fileName: "logo",
      },
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      const imageObjectURL = URL.createObjectURL(res.data);
      setImg(imageObjectURL);
      console.log("imageObjectURL", imageObjectURL);
    });
  };

  useEffect(() => {
    getCompanyInfo();
    CompanyPic();
    if (auth.user) {
      profilePic();
    }
  }, []);

  return (
    <>
      <div className="headnav">
        <div className="nav-left">
          <img src={logo} alt="logo" />
          <div className="title">
            <div className={`title-name bold`}>{name}</div>
            <div className="title-tagline">{tagline}</div>
          </div>
        </div>
        <div className="nav-right">
          {!auth.user && (
            <NavLink
              to={`/`}
              exact
              className={`bold inquery`}
              activeClassName="col-org"
              style={{ textDecoration: "none" }}
            >
              Home
            </NavLink>
          )}
          {!auth.user && (
            <NavLink
              to={`/about`}
              className={`bold inquery`}
              activeClassName="col-org"
              style={{ textDecoration: "none" }}
            >
              About Us
            </NavLink>
          )}
          {!auth.user && (
            <NavLink
              to={`/signup`}
              className={`bold inquery`}
              activeClassName="col-org"
              style={{ textDecoration: "none" }}
            >
              Sign Up
            </NavLink>
          )}

          {!auth.user && (
            <NavLink
              to={`/login`}
              className={`bold inquery`}
              activeClassName="col-org"
              style={{ textDecoration: "none" }}
            >
              Login
            </NavLink>
          )}
          {auth.user && auth.user.role === "client" && (
            <NavLink
              to={`/query` || "/"}
              className={`bold inquery`}
              activeClassName="col-org"
              style={{ textDecoration: "none" }}
            >
              My Inquery
            </NavLink>
          )}
          {auth.user && auth.user.role === "client" && (
            <NavLink
              to={`/myorders`}
              className={`bold order`}
              activeClassName="col-org"
              style={{ textDecoration: "none" }}
            >
              My Orders
            </NavLink>
          )}
          {auth.user && (
            <div className="bold username">{auth.user.username} </div>
          )}
          {auth.user && (
            <div className="bold drop">
              <div>
                <Dropdown>
                  <Dropdown.Toggle
                    variant="danger"
                    className="nav-dropdownToogle"
                  >
                    {auth.user.document && auth.user.document.logo ? (
                      <img
                        src={img}
                        alt="profilepic"
                        style={{
                          width: "30px",
                          height: "30px",
                          borderRadius: "50%",
                        }}
                      ></img>
                    ) : (
                      <img
                        src={profilepic}
                        alt="profilepic"
                        style={{ width: "30px" }}
                      ></img>
                    )}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={handleSetProfile}>
                      My Profile
                    </Dropdown.Item>
                    <Dropdown.Item onClick={handleSetHelp}>
                      Help And Support
                    </Dropdown.Item>
                    <Dropdown.Item onClick={auth.logout}>Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
          )}
        </div>
      </div>
      <Help show={showHelp} Hide={setShowHelp}></Help>
      <Profile
        show={showProfile}
        Hide={setShowProfile}
        user={auth.user}
      ></Profile>
    </>
  );
}

export default Navbar;
