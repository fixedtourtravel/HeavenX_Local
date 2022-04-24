import React, { useState } from "react";
import { Collapse, Button } from "react-bootstrap";
import AddBoxIcon from "@mui/icons-material/AddBox";
import axios from "axios";
import { TOKEN_ID } from "../../../utils/constants";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import GridViewIcon from "@mui/icons-material/GridView";
import Sort from "./Sort";
import style from "./Common.module.css";
import MyButton from "./MyButton";
import * as ROUTES from "../../../constants/routes";
import Searching from "./Searching";

function Category({ category, changeHandler, noOfActive }) {
  const [open, setOpen] = useState(false);
  const [cat, setCat] = useState("");
  const [edit, setEdit] = useState("false");
  const [getId, setgetId] = useState("");
  const [currentCat, setCurrentCat] = useState(category);
  const [create, setcreate] = useState(true);

  const addCat = async () => {
    if (!create) {
      alert("You are not allowed");
      return;
    }
    if (cat === "") {
      alert("Please add a Category");
      return;
    }
    const headers = {
      "Content-type": "application/json",
      "x-auth-token": `${localStorage.getItem(TOKEN_ID)}`,
    };
    axios
      .post(
        ROUTES.BASELINK + "/admin/addCategory",
        {
          category: cat,
        },
        { headers: headers }
      )
      .then(
        (res) => {
          setCat("");
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
            <GridViewIcon
              style={{
                color: "orangered",
                fontSize: "40px",
                marginRight: "10px",
              }}
            />
            <div className={style.headItemName}>Category</div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ fontSize: "15px", marginRight: "10px" }}>
                {noOfActive.categoryActive}
              </div>
              <CheckCircleIcon
                style={{ color: "aqua", fontSize: "15px", marginRight: "10px" }}
              />
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ fontSize: "15px", marginRight: "10px" }}>
                {category.length - noOfActive.categoryActive}
              </div>
              <CancelIcon style={{ color: "red", fontSize: "15px" }} />
            </div>
          </div>
          <div className={style.sort_search}>
            <Sort data={category} dataFunction={setCurrentCat} />
            <Searching data={category} dataFunction={setCurrentCat} />
          </div>
        </div>
        <div
          onClick={() => setOpen(!open)}
          aria-controls="Add"
          aria-expanded={open}
          className={style.addIcon}
        >
          <AddBoxIcon className={style.coloryellow} />
          Add Category
        </div>
        <Collapse in={open}>
          <div id="Add" className={style.add}>
            <p>Category</p>
            <input
              type="text"
              onChange={(e) => {
                console.log(e.target.value);
                setCat(e.target.value);
              }}
              value={cat}
            ></input>
            <Button variant="warning" onClick={addCat}>
              Add
            </Button>
          </div>
        </Collapse>
        <div className={style.content}>
          {currentCat.map((c, i) => {
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
                    comp="category"
                    obj={c}
                    changeHandler={changeHandler}
                    handleEdit={handleEdit}
                    setcreate={setcreate}
                  />
                </div>
              </div>
            );
          })}
        </div>
        {category.length === 0 && <p>No Category Found, please add</p>}
      </div>
    </>
  );
}

export default Category;
