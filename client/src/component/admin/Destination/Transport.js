import React, { useState } from "react";
import { Collapse, Button } from "react-bootstrap";
import AddBoxIcon from "@mui/icons-material/AddBox";
import style from "./Common.module.css";
import axios from "axios";
import { TOKEN_ID } from "../../../utils/constants";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import EmojiTransportationIcon from "@mui/icons-material/EmojiTransportation";
import * as ROUTES from "../../../constants/routes";
import Station from "./Station";
import MyButton from "./MyButton";
import Sort from "./Sort";
import Searching from "./Searching";

function Transport({
  mode,
  transport,
  place,
  changeHandler,
  allStation,
  noOfActive,
}) {
  const [open, setOpen] = useState(false);
  const [trans, setTrans] = useState("");
  const [currentIndex, getcurrentIndex] = useState(-1);
  const [currentmode, getcurrentmode] = useState("");
  const [currentmodeStation, getcurrentmodeStation] = useState("");
  const [edit, setEdit] = useState("false");
  const [getId, setgetId] = useState("");
  const [currMode, setcurrMode] = useState(mode);
  const [create, setcreate] = useState(true);

  const handleEdit = (data, id) => {
    setEdit(data);
    setgetId(id);
    console.log("cool", edit, data, id);
  };

  const addTrans = async () => {
    if (!create) {
      alert("You are not allowed");
      return;
    }
    if (trans === "") {
      alert("Please add a Transport");
      return;
    }
    const headers = {
      "Content-type": "application/json",
      "x-auth-token": `${localStorage.getItem(TOKEN_ID)}`,
    };
    axios
      .post(
        ROUTES.BASELINK + "/admin/addTransport",
        {
          mode: trans,
        },
        { headers: headers }
      )
      .then(
        (res) => {
          setTrans("");
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

  const handleCurrModeStation = (mode) => {
    let c = [];
    for (let i = 0; i < transport.length; i++) {
      if (transport[i].mode === mode) {
        let y = transport[i].station;
        for (let j = 0; j < y.length; j++) {
          c.push(y[j]);
        }
      }
    }
    getcurrentmodeStation(c);
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
                <EmojiTransportationIcon
                  style={{
                    color: "orangered",
                    fontSize: "40px",
                    marginRight: "10px",
                  }}
                />
                <div className={style.headItemName}>Transport</div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div style={{ fontSize: "15px", marginRight: "10px" }}>
                    {noOfActive.modeActive}
                  </div>
                  <CheckCircleIcon
                    style={{ color: "aqua", fontSize: "15px" }}
                  />
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div style={{ fontSize: "15px", marginRight: "10px" }}>
                    {mode.length - noOfActive.modeActive}
                  </div>
                  <CancelIcon style={{ color: "red", fontSize: "15px" }} />
                </div>
              </div>
              <div className={style.sort_search}>
                <Sort data={mode} dataFunction={setcurrMode} />
                <Searching data={mode} dataFunction={setcurrMode} />
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
                <p>Transport</p>
                <input
                  type="text"
                  onChange={(e) => setTrans(e.target.value)}
                  value={trans}
                ></input>
                <Button variant="warning" onClick={addTrans}>
                  Add
                </Button>
              </div>
            </Collapse>
            <div className={style.content}>
              {currMode.map((c, i) => {
                return (
                  <div
                    className={
                      edit === "true" && c._id === getId
                        ? `${style.contentEdit} ${style.contentDiv}`
                        : style.contentDiv
                    }
                  >
                    <div className={style.menu}>
                      <div
                        onClick={() => {
                          getcurrentIndex(i);
                          getcurrentmode(c.name);
                          handleCurrModeStation(c.name);
                        }}
                        className={currentIndex === i && `${style.active}`}
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
                        comp="transport"
                        obj={c}
                        changeHandler={changeHandler}
                        handleEdit={handleEdit}
                        setcreate={setcreate}
                      />
                    </div>
                  </div>
                );
              })}
              {mode.length === 0 && <p>No Transport Found, please add</p>}
            </div>
          </div>
          <Station
            place={place}
            transport={transport}
            changeHandler={changeHandler}
            allStation={allStation}
            currentmode={currentmode}
            currentmodeStation={currentmodeStation}
            noOfActive={noOfActive}
          />
        </div>
      </div>
    </>
  );
}

export default Transport;
