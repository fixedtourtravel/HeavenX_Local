import React, { useState, useEffect } from "react";
import { Collapse, Button } from "react-bootstrap";
import AddBoxIcon from "@mui/icons-material/AddBox";
import axios from "axios";
import { TOKEN_ID } from "../../../utils/constants";
import ApartmentIcon from "@mui/icons-material/Apartment";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import style from "./Common.module.css";
import MyButton from "./MyButton";
import * as ROUTES from "../../../constants/routes";
import Sort from "./Sort";
import Searching from "./Searching";

function City({
  currentcity,
  changeHandler,
  currentCountry,
  noOfActive,
  currentCityActive,
  setcurrentcity,
}) {
  const [open, setOpen] = useState(false);
  const [city, setCity] = useState("");
  const [edit, setEdit] = useState("false");
  const [getId, setgetId] = useState("");
  const [currCity, setcurrCity] = useState(currentcity);
  const [create, setcreate] = useState(true);

  const addCity = async () => {
    if (!create) {
      alert("You are not allowed");
      return;
    }
    if (currentCountry === "") {
      alert("Please select a Country");
      return;
    }
    if (city === "") {
      alert("Please add a City");
      return;
    }
    const headers = {
      "Content-type": "application/json",
      "x-auth-token": `${localStorage.getItem(TOKEN_ID)}`,
    };
    axios
      .post(
        ROUTES.BASELINK + "/admin/addCity",
        {
          city: city,
          country: currentCountry,
        },
        { headers: headers }
      )
      .then(
        (res) => {
          setCity("");
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
  
  const handleEdit = (data, id) => {
    setEdit(data);
    setgetId(id);
    console.log("cool", edit, data, id);
  };

  useEffect(() => {
    setcurrCity(currentcity);
  }, [currentcity]);

  return (
    <div className={style.city}>
      <div className={style.head}>
        <div className={style.headItem}>
          <ApartmentIcon
            style={{
              color: "orangered",
              fontSize: "40px",
              marginRight: "10px",
            }}
          />
          <div className={style.headItemName}>City</div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ fontSize: "15px", marginRight: "10px" }}>
              {currentCountry === ""
                ? noOfActive.cityActive
                : currentCityActive}
            </div>
            <CheckCircleIcon style={{ color: "aqua", fontSize: "15px" }} />
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ fontSize: "15px", marginRight: "10px" }}>
              {currentCountry === ""
                ? currentcity.length - noOfActive.cityActive
                : currentcity.length - currentCityActive}
            </div>
            <CancelIcon style={{ color: "red", fontSize: "15px" }} />
          </div>
        </div>
        <div className={`${style.headItemName} ${style.active}`}>
          {currentCountry === "" && <p>All</p>}
          {currentCountry !== "" && currentCountry}
        </div>
        <div className={style.sort_search}>
          <Sort data={currentcity} dataFunction={setcurrCity} />
          <Searching data={currentcity} dataFunction={setcurrCity} />
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
        <div id="Add" className={style.add}>
          <p>City</p>
          <input
            type="text"
            onChange={(e) => {
              setCity(e.target.value);
            }}
            value={city}
          ></input>
          <Button variant="warning" onClick={addCity}>
            Add
          </Button>
        </div>
      </Collapse>
      <div className={style.content}>
        {currCity.map((c, i) => {
          return (
            <div className={style.contentDiv}>
              <div className={style.menu}>
                <div
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
                  <CancelIcon style={{ fontSize: "15px", color: "red" }} />
                )}
              </div>
              <div>
                <MyButton
                  comp="city"
                  obj={c}
                  changeHandler={changeHandler}
                  handleEdit={handleEdit}
                  setcreate={setcreate}
                />
              </div>
            </div>
          );
        })}
        {currentCountry !== "" && currentcity.length === 0 && (
          <p>No City Found, please add</p>
        )}
      </div>
    </div>
  );
}

export default City;
