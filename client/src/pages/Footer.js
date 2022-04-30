import React, { useEffect, useState } from "react";
import ".././styles/footer.css";
// import InstagramIcon from "@mui/icons-material/Instagram";
// import FacebookIcon from "@mui/icons-material/Facebook";
// import TwitterIcon from "@mui/icons-material/Twitter";
// import LinkedInIcon from "@mui/icons-material/LinkedIn";
// import YouTubeIcon from "@mui/icons-material/YouTube";
// import { Button } from "reactstrap";
// import { Link } from "react-router-dom";
import axios from "axios";
import * as ROUTES from "../constants/routes";
import { Link } from "react-router-dom";

export default function Footer() {
  const [name, setName] = useState("");
  const [tagline, settagline] = useState("");

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

  useEffect(() => {
    getCompanyInfo();
  }, []);
  return (
    <div className="container-fluid footer">
      <div className="row row-padding">
        <div className="col-4 text-left">
          <h1>{name}</h1>
          <div>{tagline}</div>
        </div>
        {/* <div className="col-6 ml-auto text-right">
          <span className="footer-social-text">Get Social</span>&nbsp;&nbsp;{" "}
          <InstagramIcon className="material-icon footer-social" />{" "}
          <FacebookIcon className="material-icon footer-social" />{" "}
          <TwitterIcon className="material-icon footer-social" />{" "}
          <LinkedInIcon className="material-icon footer-social" />{" "}
          <YouTubeIcon className="material-icon footer-social" />
        </div> */}
        <div
          className="col-8"
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <div>Career Cards &#38; Refunds</div>
          <div>
            All Rights Reserved |
            <Link to="/term_condition"> General Terms and Conditions </Link>|
            Disclaimer |<Link to="/private_policy"> Privacy Policy</Link>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="line"></div>
      </div>
      {/* <div className="row row-padding">
        <div className="col-2">
          <Link to="/admin/login">
            <Button className="footer-registration-btn">ADMIN</Button>
          </Link>
        </div>
      </div> */}
    </div>
  );
}
