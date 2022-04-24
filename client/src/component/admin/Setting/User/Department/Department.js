import React, { useEffect, useState } from "react";
import { Button, Collapse } from "react-bootstrap";
import style from "../Role/Role.module.css";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import Role from "../Role/Role";
import axios from "axios";
import * as ROUTES from "../../../../../constants/routes";
import MyButton from "../MyButton";
import Sort from "../../../Destination/Sort";
import Searching from "../../../Destination/Searching";

function Department() {
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState("false");
  const [getId, setgetId] = useState("");
  const [department, setdepartment] = useState("");
  const [Department, setDepartment] = useState([]);
  const [currentIndex, getcurrentIndex] = useState(-1);
  const [currentDepartment, setcurrentDepartment] = useState("");
  const [currentrole, setcurrentrole] = useState([]);
  const [departments, setdepartments] = useState([]);

  const headers = {
    "Content-type": "application/json",
  };

  const addDepartment = async () => {
    if (department === "") {
      alert("Please add department");
      return;
    }
    for (let i = 0; i < Department.length; i++) {
      if (Department[i].name.toUpperCase() === department.toUpperCase()) {
        alert("Already Added");
        return;
      }
    }
    axios
      .post(
        ROUTES.BASELINK + "/admin/addDepartment",
        {
          name: department,
        },
        { headers: headers }
      )
      .then(
        (res) => {
          console.log(res);
          alert(res.data.message);
          changeHandler(true);
          setdepartment("");
          // <Snakbar msg={res.data.message} t="true"/>;
        },
        (error) => {
          console.log(error);
          alert(error);
        }
      );
  };

  const getDepartment = async () => {
    axios
      .get(ROUTES.BASELINK + "/admin/getDepartment", { headers: headers })
      .then(
        (res) => {
          console.log(res);
          const depart = res.data.data;
          console.log(depart);
          setDepartment(depart);
          setdepartments(depart);
          let x = [];
          console.log(currentDepartment);
          for (let i = 0; i < depart.length; i++) {
            if (currentDepartment === "") {
              x = [...x, ...depart[i].role];
            } else {
              if (depart[i].name === currentDepartment) {
                x = [...depart[i].role];
                break;
              }
            }
          }
          setcurrentrole(x);
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

  const changeHandler = (data) => {
    if (data) {
      getDepartment();
    }
  };

  useEffect(() => {
    getDepartment();
  }, []);

  return (
    <div className={style.home}>
      <div className={style.department}>
        <div className={style.row1}>
          <Button
            onClick={() => setOpen(!open)}
            aria-controls="Add"
            aria-expanded={open}
            className={style.addIcon}
            style={{ margin: "0px" }}
          >
            New Department
          </Button>
          <div className={style.sort_search}>
            <Sort data={Department} dataFunction={setdepartments} />
            <Searching data={Department} dataFunction={setdepartments} />
          </div>
        </div>
        <Collapse in={open}>
          <div id="Add" className={style.add}>
            <input
              type="text"
              onChange={(e) => {
                setdepartment(e.target.value);
              }}
              value={department}
            ></input>
            <Button variant="warning" onClick={addDepartment}>
              Add
            </Button>
          </div>
        </Collapse>
        <div className={style.content}>
          {departments.map((c, i) => {
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
                      setcurrentDepartment(c.name);
                      getcurrentIndex(i);
                      setcurrentrole(c.role);
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
                    <CancelIcon style={{ fontSize: "15px", color: "red" }} />
                  )}
                </div>
                <div>
                  <MyButton
                    comp="department"
                    obj={c}
                    changeHandler={changeHandler}
                    handleEdit={handleEdit}
                  />
                </div>
              </div>
            );
          })}
          {Department.length === 0 && <p>No Department Found, please add</p>}
        </div>
      </div>
      <Role
        currentrole={currentrole}
        currentDepartment={currentDepartment}
        changeHandler={changeHandler}
      />
    </div>
  );
}

export default Department;
