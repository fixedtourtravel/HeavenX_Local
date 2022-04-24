import React, { useState } from "react";
import { Collapse, Button } from "react-bootstrap";
import AddBoxIcon from "@mui/icons-material/AddBox";
import style from "./Common.module.css";
import axios from "axios";
import { TOKEN_ID } from "../../../utils/constants";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import MyButton from "./MyButton";
import * as ROUTES from "../../../constants/routes";
import Sort from "./Sort";
import Searching from "./Searching";

function Meal({ Meal, changeHandler, noOfActive }) {
  const [open, setOpen] = useState(false);
  const [meal, setMeal] = useState("");
  const [edit, setEdit] = useState("false");
  const [getId, setgetId] = useState("");
  const [currMeal, setcurrMeal] = useState(Meal);
  const [create, setcreate] = useState(true);

  const getMeal = async () => {
    if (!create) {
      alert("You are not allowed");
      return;
    }
    if (meal === "") {
      alert("Please add a Meal");
      return;
    }
    const headers = {
      "Content-type": "application/json",
      "x-auth-token": `${localStorage.getItem(TOKEN_ID)}`,
    };
    axios
      .post(
        ROUTES.BASELINK + "/admin/addMeal",
        {
          meal: meal,
        },
        { headers: headers }
      )
      .then(
        (res) => {
          setMeal("");
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
        <div className={style.head}>
          <div className={style.headItem}>
            <div className={style.headItemName}>Meal Plan</div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ fontSize: "15px", marginRight: "10px" }}>
                {noOfActive.mealActive}
              </div>
              <CheckCircleIcon style={{ color: "aqua", fontSize: "15px" }} />
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ fontSize: "15px", marginRight: "10px" }}>
                {Meal.length - noOfActive.mealActive}
              </div>
              <CancelIcon style={{ color: "red", fontSize: "15px" }} />
            </div>
          </div>
          <div className={style.sort_search}>
            <Sort data={Meal} dataFunction={setcurrMeal} />
            <Searching data={Meal} dataFunction={setcurrMeal} />
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
            <p>Meal</p>
            <input
              type="text"
              onChange={(e) => setMeal(e.target.value)}
              value={meal}
            ></input>
            <Button variant="warning" onClick={getMeal}>
              Add
            </Button>
          </div>
        </Collapse>
        <div className={style.content}>
          {currMeal.map((c, i) => {
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
                    comp="Meal Plan"
                    handleEdit={handleEdit}
                    obj={c}
                    changeHandler={changeHandler}
                    setcreate={setcreate}
                  />
                </div>
              </div>
            );
          })}
          {Meal.length === 0 && <p>No Meal Found, please add</p>}
        </div>
      </div>
    </>
  );
}

export default Meal;
