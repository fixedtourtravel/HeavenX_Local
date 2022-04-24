import React, { useEffect, useState } from "react";
import { Button, Collapse } from "react-bootstrap";
import style from "./Role.module.css";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import MyButton from "../MyButton";
import axios from "axios";
import * as ROUTES from "../../../../../constants/routes";
import Sort from "../../../Destination/Sort";
import Searching from "../../../Destination/Searching";

function Role({ currentrole, currentDepartment, changeHandler }) {
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState("false");
  const [getId, setgetId] = useState("");
  const [role, setrole] = useState("");
  const [Role, setRole] = useState(currentrole);

  const handleEdit = (data, id) => {
    setEdit(data);
    setgetId(id);
    console.log("cool", edit, data, id);
  };

  const addRole = async () => {
    if (currentDepartment === "") {
      alert("Please select a Department");
      return;
    }
    if (role === "") {
      alert("Please add a role");
      return;
    }
    for (let i = 0; i < currentrole.length; i++) {
      if (currentrole[i].name.toUpperCase() === role.toUpperCase()) {
        alert("Already Added");
        return;
      }
    }
    const headers = {
      "Content-type": "application/json",
    };
    axios
      .post(
        ROUTES.BASELINK + "/admin/addRole",
        {
          role: role,
          department: currentDepartment,
        },
        { headers: headers }
      )
      .then(
        (res) => {
          alert(res.data.message);
          changeHandler(true);
          setrole("");
          // <Snakbar msg={res.data.message} t="true"/>;
        },
        (error) => {
          console.log(error);
          alert(error);
        }
      );
  };

  useEffect(() => {
    console.log("hrash",currentrole)
    setRole(currentrole);
  }, [currentrole]);

  return (
    <div className={style.role}>
      <div className={style.row1}>
        <div>
          <Button
            onClick={() => setOpen(!open)}
            aria-controls="Add"
            aria-expanded={open}
            className={style.addIcon}
            style={{ margin: "0px", marginRight: "20px", marginTop: "-20px" }}
          >
            New Role
          </Button>
        </div>
        <div className={`${style.headItemName} ${style.active}`}>
          {currentDepartment === "" && <p>All</p>}
          {currentDepartment !== "" && currentDepartment}
        </div>
        <div className={style.sort_search}>
          <Sort data={currentrole} dataFunction={setRole} />
          <Searching data={currentrole} dataFunction={setRole} />
        </div>
      </div>
      <Collapse in={open}>
        <div id="Add" className={style.add}>
          <input
            type="text"
            onChange={(e) => {
              setrole(e.target.value);
            }}
            value={role}
          ></input>
          <Button variant="warning" onClick={addRole}>
            Add
          </Button>
        </div>
      </Collapse>
      <div className={style.content}>
        {Role.map((c, i) => {
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
                  comp="role"
                  obj={c}
                  changeHandler={changeHandler}
                  handleEdit={handleEdit}
                />
              </div>
            </div>
          );
        })}
        {currentDepartment !== "" && currentrole.length === 0 && (
          <p>No Role Found, please add</p>
        )}
      </div>
    </div>
  );
}

export default Role;
