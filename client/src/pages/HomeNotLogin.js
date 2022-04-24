import React from "react";
import ImageSlider from "./ImageSlider";
import "../styles/home.css";
import Footer from "./Footer";
import axios from "axios";
import { useState } from "react";
import * as ROUTES from "../constants/routes";
import Navbar from "./Navbar/Navbar";

export default function Home() {
  //for newsletter
  const [email, setEmail] = useState("");
  function handleSubscribe() {
    if (email === "") {
      alert("Please fill the email field");
      return;
    }
    axios
      .post(ROUTES.BASELINK + "/", {
        email: email,
      })
      .then(() => {
        alert("Subscribed Successfully");
        window.location.reload();
      })
      .catch(() => {
        alert("Error subscribing to newsletter");
      });
  }

  return (
    <>
      <Navbar />
      <div className="container-fluid homepage">
        <div className="row mainBannerRow">
          <img className="buddhaImg" src="/images/buddha(1).svg" alt="buddha" />
          <img
            className="buildingsImg"
            src="/images/buildings(1).svg"
            alt="buildings"
          />
          <img className="plane" src="/images/plane.svg" alt="Plane" />

          <img
            className="cloud1 cloud-shadow"
            src="/images/cloud.svg"
            alt="Cloud"
            height="90.26"
            width="250"
          />
          <img
            className="cloud2 cloud-shadow"
            src="/images/cloud.svg"
            alt="Cloud"
            height="90.26"
            width="250"
          />

          <img
            className="sun"
            src="/images/sunsvg.svg"
            alt="Sun"
            height="100"
            width="100"
          />

          <img
            className="cloud3 cloud-shadow"
            src="/images/cloud.svg"
            alt="Cloud"
            height="90.26"
            width="250"
          />

          <img
            className="hotairballoon one"
            src="/images/hotairballoon.svg"
            alt="hotAirBalloon"
          />
          <img
            className="hotairballoon two"
            src="/images/hotairballoon.svg"
            alt="hotAirBalloon"
            width="110px"
            height="110px"
          />

          {/* <div className="mainText">Main Text ...</div> */}

          <div className="ui">
            <img src="/images/ui.png" alt="ui" />
          </div>
        </div>
        <div className="row banner1">
          <div className="col-12">
            <div className="home-header">LATEST TRAVEL UPDATES</div>
            <div className="home-subheader">
              Explore amazing deals, Hotel Bookings and Holiday Packages!
            </div>
          </div>
        </div>
        <div className="row imageSliderRow">
          <div className="col-12 imageSlider">
            <ImageSlider />
          </div>
        </div>
        <div className="banner2">
          <div className="banner2-item1">
            <div className="home-header2">Stay in touch!</div>
            <div className="home-subheader2">
              Subscribe our newsletter and get our updates
            </div>
          </div>
          <div className="banner2-item2">
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="home-input"
            />
          </div>
          <div className="banner2-item3">
            <div onClick={handleSubscribe} className="subscribe-btn  mx-auto">
              Subscribe Now
            </div>
          </div>
        </div>
        <div className="row banner1">
          <div className="col-12 home-header">WHY BOOK WITH US?</div>
        </div>
        <div className="row content">
          <div className="col-3">
            <div className="container-fluid">
              <div className="row">
                <div className="col-4">
                  <div className="feature-icon">
                    <img
                      src="/images/g1.png"
                      alt="g1"
                      className="feature-icon-position one"
                    />
                  </div>
                </div>
                <div className="col-8 my-auto feature-text text-left">
                  Assured Best Fares
                </div>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="container-fluid">
              <div className="row">
                <div className="col-4">
                  <div className="feature-icon">
                    <img
                      src="/images/g2.png"
                      alt="g2"
                      className="feature-icon-position two"
                    />
                  </div>
                </div>
                <div className="col-8 my-auto feature-text text-left">
                  24x7 Customer Support
                </div>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="container-fluid">
              <div className="row">
                <div className="col-4">
                  <div className="feature-icon">
                    <img
                      src="/images/g3.png"
                      alt="g3"
                      className="feature-icon-position three"
                    />
                  </div>
                </div>
                <div className="col-8 my-auto feature-text text-left">
                  One Stop for All Travel Services
                </div>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="container-fluid">
              <div className="row">
                <div className="col-4">
                  <div className="feature-icon">
                    <img
                      src="/images/g4.png"
                      alt="g4"
                      className="feature-icon-position four"
                    />
                  </div>
                </div>
                <div className="col-8 my-auto feature-text text-left">
                  Instant Deals on Flights & Holidays
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row banner3">
          <div className="col-12 home-header2">Our Other Products</div>
        </div>
        <div className="row content"></div>
      </div>
      <Footer />
    </>
  );
}
