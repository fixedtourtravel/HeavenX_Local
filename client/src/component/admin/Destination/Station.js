import React, { useState, useEffect } from "react";
import { Collapse, Button } from "react-bootstrap";
import AddBoxIcon from "@mui/icons-material/AddBox";
import style from "./Common.module.css";
import axios from "axios";
import { TOKEN_ID } from "../../../utils/constants";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import EvStationIcon from "@mui/icons-material/EvStation";
import MyButton from "./MyButton";
import * as ROUTES from "../../../constants/routes";
import Searching from "./Searching";
import Sort from "./Sort";

function Stations({
  transport,
  place,
  allStation,
  currentmode,
  changeHandler,
  noOfActive,
}) {
  const [open, setOpen] = useState(false);
  const [mode, setmode] = useState("");
  const [country, setcountry] = useState("");
  const [city, setcity] = useState("");
  const [allCity, setAllCity] = useState([]);
  const [station, setStation] = useState("");
  const [currentStation, setcurrentStation] = useState([]);
  const [edit, setEdit] = useState("false");
  const [getId, setgetId] = useState("");
  const [totalActive, setTotalActive] = useState(noOfActive.stationActive);
  const [currStation, setcurrStation] = useState([]);
  const [create, setcreate] = useState(true);

  const initial = () => {
    if (country === "" && city === "" && currentmode === "") {
      setcurrentStation(allStation);
      setcurrStation(allStation);
    }
  };
  const handleEdit = (data, id) => {
    setEdit(data);
    setgetId(id);
    console.log("cool", edit, data, id);
  };

  const handlemode = () => {
    let ans = [];
    let c = 0;
    if (country === "" && city === "") {
      for (let i = 0; i < transport.length; i++) {
        if (transport[i].mode === currentmode) {
          let y = transport[i].station;
          for (let j = 0; j < y.length; j++) {
            if (y[j].active) {
              c++;
            }
            ans.push(y[j]);
          }
        }
      }
    } else if (country !== "" && city === "") {
      for (let i = 0; i < transport.length; i++) {
        if (
          transport[i].mode === currentmode &&
          transport[i].country === country
        ) {
          let y = transport[i].station;
          for (let j = 0; j < y.length; j++) {
            if (y[j].active) {
              c++;
            }
            ans.push(y[j]);
          }
        }
      }
    } else {
      for (let i = 0; i < transport.length; i++) {
        if (
          transport[i].mode === currentmode &&
          transport[i].country === country &&
          transport[i].city === city
        ) {
          let y = transport[i].station;
          for (let j = 0; j < y.length; j++) {
            if (y[j].active) {
              c++;
            }
            ans.push(y[j]);
          }
        }
      }
    }
    setcurrentStation(ans);
    setcurrStation(ans);
    setmode(currentmode);
    setTotalActive(c);
  };

  if (mode !== currentmode) {
    handlemode();
  }

  const handleCountry = () => {
    let x = document.getElementById("category2").value;
    setcountry(x);
    let ans = [];
    let c = 0;
    if (currentmode === "") {
      if (city === "") {
        for (let i = 0; i < transport.length; i++) {
          if (transport[i].country === x) {
            let y = transport[i].station;
            for (let j = 0; j < y.length; j++) {
              if (y[j].active) {
                c++;
              }
              ans.push(y[j]);
            }
          }
        }
      } else {
        for (let i = 0; i < transport.length; i++) {
          if (transport[i].country === x && transport[i].city === city) {
            let y = transport[i].station;
            for (let j = 0; j < y.length; j++) {
              if (y[j].active) {
                c++;
              }
              ans.push(y[j]);
            }
          }
        }
      }
    } else {
      if (city === "") {
        for (let i = 0; i < transport.length; i++) {
          if (transport[i].country === x && currentmode === transport[i].mode) {
            let y = transport[i].station;
            for (let j = 0; j < y.length; j++) {
              if (y[j].active) {
                c++;
              }
              ans.push(y[j]);
            }
          }
        }
      } else {
        for (let i = 0; i < transport.length; i++) {
          if (
            transport[i].country === x &&
            transport[i].city === city &&
            currentmode === transport[i].mode
          ) {
            let y = transport[i].station;
            for (let j = 0; j < y.length; j++) {
              if (y[j].active) {
                c++;
              }
              ans.push(y[j]);
            }
          }
        }
      }
    }

    for (let i = 0; i < place.length; i++) {
      if (place[i].country.name === x) {
        setAllCity(place[i].city);
        break;
      }
    }
    setTotalActive(c);
    setcurrentStation(ans);
    setcurrStation(ans);
    // handleSetcurrentStation(x, 2);
  };

  const handlecity = () => {
    let x = document.getElementById("category3").value;
    setcity(x);
    let ans = [];
    let c = 0;
    if (currentmode === "") {
      for (let i = 0; i < transport.length; i++) {
        if (transport[i].country === country && transport[i].city === x) {
          let y = transport[i].station;
          for (let j = 0; j < y.length; j++) {
            ans.push(y[j]);
            if (y[j].active) {
              c++;
            }
          }
        }
      }
    } else {
      for (let i = 0; i < transport.length; i++) {
        if (
          transport[i].country === country &&
          transport[i].city === x &&
          currentmode === transport[i].mode
        ) {
          let y = transport[i].station;
          for (let j = 0; j < y.length; j++) {
            ans.push(y[j]);
            if (y[j].active) {
              c++;
            }
          }
        }
      }
    }
    setcurrentStation(ans);
    setcurrStation(ans);
    setTotalActive(c);
  };

  const addStation = async () => {
    if (!create) {
      alert("You are not allowed");
      return;
    }
    if (currentmode === "") {
      alert("Please add a Mode");
      return;
    }
    if (country === "") {
      alert("Please add a Country");
      return;
    }
    if (city === "") {
      alert("Please add a City");
      return;
    }
    if (station === "") {
      alert("Please add a Station");
      return;
    }
    const headers = {
      "Content-type": "application/json",
      "x-auth-token": `${localStorage.getItem(TOKEN_ID)}`,
    };
    axios
      .post(
        ROUTES.BASELINK + "/admin/addStation",
        {
          mode: currentmode,
          country: country,
          city: city,
          station: station,
        },
        { headers: headers }
      )
      .then(
        (res) => {
          setStation("");
          alert(res.data.message);
          changeHandler(true);
          // <Snakbar msg={res.data.message} t="true"/>;
        },
        (error) => {
          console.log(error);
          alert(error);
        }
      );
  };
  useEffect(() => {
    initial();
    console.log("usefeeadfasd");
  }, []);

  return (
    <div className={style.city}>
      <div className={style.head}>
        <div className={style.headItem}>
          <EvStationIcon
            style={{
              color: "orangered",
              fontSize: "40px",
              marginRight: "10px",
            }}
          />
          <div className={style.headItemName}>Station</div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ fontSize: "15px", marginRight: "10px" }}>
              {totalActive}
            </div>
            <CheckCircleIcon style={{ color: "aqua", fontSize: "15px" }} />
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ fontSize: "15px", marginRight: "10px" }}>
              {currentStation.length - totalActive}
            </div>
            <CancelIcon style={{ color: "red", fontSize: "15px" }} />
          </div>
        </div>
        <div className={`${style.headItemName} ${style.active}`}>
          {currentmode === "" && <p>All</p>}
          {currentmode !== "" && <p>{currentmode}</p>}
        </div>
        <div className={style.sort_search}>
          <Sort data={currentStation} dataFunction={setcurrStation} />
          <Searching data={currentStation} dataFunction={setcurrStation} />
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
        <div id="Add">
          <div className={style.addStation}>
            <select
              name="category2"
              id="category2"
              onChange={(e) => handleCountry()}
            >
              <option value="" disabled selected hidden>
                Select a Country
              </option>
              {place.map((c, i) => {
                return <option value={c.country.name}>{c.country.name}</option>;
              })}
              {place.length === 0 && (
                <option value="" disabled>
                  Please Add a Country First
                </option>
              )}
            </select>
            <select
              name="category3"
              id="category3"
              onChange={(e) => handlecity()}
            >
              <option value="" disabled selected hidden>
                Select a City
              </option>

              {allCity.map((c, i) => {
                return <option value={c.name}>{c.name}</option>;
              })}
              {country === "" && (
                <option value="" disabled>
                  Please Select Country First
                </option>
              )}
              {allCity.length === 0 && country !== "" && (
                <option value="" disabled>
                  No City Found Please add
                </option>
              )}
            </select>
            <input
              type="text"
              onChange={(e) => setStation(e.target.value)}
              value={station}
              placeholder=" Station"
            ></input>
            <Button variant="warning" onClick={addStation}>
              Add
            </Button>
          </div>
        </div>
      </Collapse>
      <div className={style.content}>
        {currStation.map((s, i) => {
          return (
            <div
              className={
                edit === "true" && s._id === getId
                  ? `${style.contentEdit} ${style.contentDiv}`
                  : style.contentDiv
              }
            >
              <div className={style.menu}>
                <div
                  contenteditable={
                    edit === "true" && s._id === getId ? "true" : "false"
                  }
                  onInput={function (e) {
                    s.name = e.target.innerText;
                  }}
                >
                  {s.name}
                </div>
                {s.active && (
                  <CheckCircleIcon
                    style={{ fontSize: "15px", color: "aqua" }}
                  />
                )}
                {!s.active && (
                  <CancelIcon style={{ fontSize: "15px", color: "red" }} />
                )}
              </div>
              <div>
                <MyButton
                  comp="station"
                  obj={s}
                  changeHandler={changeHandler}
                  handleEdit={handleEdit}
                  setcreate={setcreate}
                />
              </div>
            </div>
          );
        })}
        {currStation.length === 0 &&
          currentmode !== "" &&
          country !== "" &&
          city !== "" && <p>No Station Found, please add</p>}
      </div>
    </div>
  );
}

export default Stations;
