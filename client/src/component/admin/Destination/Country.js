import React, { useState } from "react";
import { Collapse, Button } from "react-bootstrap";
import AddBoxIcon from "@mui/icons-material/AddBox";
import axios from "axios";
import { TOKEN_ID } from "../../../utils/constants";
import MyButton from "./MyButton";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import City from "./City";
import PublicIcon from "@mui/icons-material/Public";
import * as ROUTES from "../../../constants/routes";
import Sort from "./Sort";

import style from "./Common.module.css";
import Image from "./Image";
import Searching from "./Searching";

function Country({ place, country, changeHandler, allCity, noOfActive }) {
  const [open, setOpen] = useState(false);
  const [con, setCon] = useState("");
  const [currentCountry, setcurrentCountry] = useState("");
  const [currentcity, setcurrentcity] = useState(allCity);
  const [currentIndex, getcurrentIndex] = useState(-1);
  const [currentCityActive, setcurrentCityActive] = useState(0);
  const [edit, setEdit] = useState("false");
  const [getId, setgetId] = useState("");
  const [currCountry, setcurrCountry] = useState(country);
  const [create, setcreate] = useState(true);

  console.log("country", country);
  const addCountry = async () => {
    if (!create) {
      alert("You are not allowed");
      return;
    }
    if (con === "") {
      alert("Please add a Country");
      return;
    }
    const headers = {
      "Content-type": "application/json",
      "x-auth-token": `${localStorage.getItem(TOKEN_ID)}`,
    };
    axios
      .post(
        ROUTES.BASELINK + "/admin/addCountry",
        {
          country: con,
        },
        { headers: headers }
      )
      .then(
        (res) => {
          setCon("");
          changeHandler(true);
          alert(res.data.message);
          // <Snakbar msg={res.data.message} t="true"/>;
        },
        (error) => {
          console.log(error);
          alert(error);
        }
      );
  };

  const handleOption = (country) => {
    console.log("country", country);
    let ans = [];
    for (let i = 0; i < place.length; i++) {
      if (place[i].country.name === country) {
        ans = place[i].city;
        break;
      }
    }
    console.log(ans);
    setcurrentcity(ans);
    console.log(ans);
    let c = 0;
    for (let i = 0; i < ans.length; i++) {
      if (ans[i].active) {
        c++;
      }
    }
    setcurrentCityActive(c);
  };

  const handleEdit = (data, id) => {
    setEdit(data);
    setgetId(id);
    console.log("cool", edit, data, id);
  };

  return (
    <>
      <Button
        style={{ marginLeft: "20px", marginTop: "10px" }}
        variant="danger"
        href="/admin/destination"
      >
        Back to Destination
      </Button>
      <div className={style.home}>
        <div className={style.homeCountry}>
          <div className={style.country}>
            <div className={style.head}>
              <div className={style.headItem}>
                <PublicIcon
                  style={{
                    color: "orangered",
                    fontSize: "40px",
                    marginRight: "10px",
                  }}
                />
                <div className={style.headItemName}>Country</div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div style={{ fontSize: "15px", marginRight: "10px" }}>
                    {noOfActive.countryActive}
                  </div>
                  <CheckCircleIcon
                    style={{ color: "aqua", fontSize: "15px" }}
                  />
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div style={{ fontSize: "15px", marginRight: "10px" }}>
                    {currCountry.length - noOfActive.countryActive}
                  </div>
                  <CancelIcon style={{ color: "red", fontSize: "15px" }} />
                </div>
              </div>
              <div className={style.sort_search}>
                <Sort data={country} dataFunction={setcurrCountry} />
                <Searching data={country} dataFunction={setcurrCountry} />
              </div>
            </div>
            <div
              onClick={() => setOpen(!open)}
              aria-controls="Add"
              aria-expanded={open}
              className={style.addIcon}
            >
              <AddBoxIcon className={style.coloryellow} />
              Add
            </div>
            <Collapse in={open}>
              <div id="Add" className={style.addcountry}>
                <p>Country</p>
                <input
                  type="text"
                  onChange={(e) => {
                    setCon(e.target.value);
                  }}
                  value={con}
                ></input>
                <Button variant="warning" onClick={addCountry}>
                  Add
                </Button>
              </div>
            </Collapse>
            <div className={style.content}>
              {currCountry.map((c, i) => {
                return (
                  <div
                    className={
                      edit === "true" && c._id === getId
                        ? `${style.contentEdit} ${style.contentDiv}`
                        : style.contentDiv
                    }
                  >
                    <div className={style.menu}>
                      <Image path={c.img} />
                      <div
                        onClick={() => {
                          handleOption(c.name);
                          setcurrentCountry(c.name);
                          getcurrentIndex(i);
                          console.log(allCity);
                        }}
                        className={i === currentIndex && `${style.active}`}
                        contenteditable={
                          edit === "true" && c._id === getId ? "true" : "false"
                        }
                        onInput={function (e) {
                          c.name = e.target.innerText;
                        }}
                      >
                        {c.name}
                      </div>
                      {c.active && (
                        <CheckCircleIcon
                          style={{ fontSize: "15px", color: "aqua" }}
                        />
                      )}
                      {!c.active && (
                        <CancelIcon
                          style={{ fontSize: "15px", color: "red" }}
                        />
                      )}
                    </div>
                    <div>
                      <MyButton
                        comp="country"
                        obj={c}
                        changeHandler={changeHandler}
                        handleEdit={handleEdit}
                        setcreate={setcreate}
                      />
                    </div>
                  </div>
                );
              })}
              {place.length === 0 && <p>No Country Found, please add</p>}
            </div>
          </div>
          <City
            currentcity={currentcity}
            changeHandler={changeHandler}
            currentCountry={currentCountry}
            noOfActive={noOfActive}
            currentCityActive={currentCityActive}
            setcurrentcity={setcurrentcity}
          />
        </div>
      </div>
    </>
  );
}

export default Country;
