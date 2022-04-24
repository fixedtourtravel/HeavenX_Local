import React, { useEffect, useState } from "react";
import { Collapse, Button, Table } from "react-bootstrap";
import AddBoxIcon from "@mui/icons-material/AddBox";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import style from "./Group.module.css";
import MyButton from "../Button/MyButton";
import axios from "axios";
import * as ROUTES from "../../../../constants/routes";
import { TOKEN_ID } from "../../../../utils/constants";
import GroupItem from "./GroupItem";
import Sort from "../../Destination/Sort";

function Group({ name }) {
  const [openGroup, setOpenGroup] = useState(false);
  const [group, setGroup] = useState("");
  const [allgroup, setAllGroup] = useState([]);
  const [edit, setEdit] = useState("false");
  const [getId, setgetId] = useState("");
  const [currentIndex, getcurrentIndex] = useState(-1);
  const [currentGroupUser, setcurrentGroupUser] = useState([]);
  const [user, setUser] = useState([]);
  const [currentname, setcurrentname] = useState("General");
  const [create, setcreate] = useState(true);

  const headers = {
    "Content-type": "application/json",
    "x-auth-token": `${localStorage.getItem(TOKEN_ID)}`,
  };

  const addGroup = async () => {
    if (!create) {
      alert("You are not allowed");
      return;
    }
    if (group === "") {
      alert("Please add Group");
      return;
    }
    if (group.toUpperCase() === "GENERAL" || group.toUpperCase() === "BLOCK") {
      alert("Already added");
      return;
    }
    for (let i = 0; i < allgroup.length; i++) {
      if (allgroup[i].name.toUpperCase() === group.toUpperCase()) {
        alert("Already added");
        return;
      }
    }

    await axios
      .post(
        ROUTES.BASELINK + "/admin/addGroup",
        {
          group: group,
          name: name,
        },
        { headers: headers }
      )
      .then(
        (res) => {
          getGroup();
          setGroup("");
          alert(res.data.message);
        },
        (error) => {
          console.log(error);
          alert(error);
        }
      );
  };

  const getGroup = async () => {
    await axios
      .post(
        ROUTES.BASELINK + "/admin/getGroup",
        {
          name: name,
        },
        { headers: headers }
      )
      .then(
        (res) => {
          setAllGroup(res.data.data);
        },
        (error) => {
          console.log(error);
          alert(error);
        }
      );
  };

  const getClient = async () => {
    axios({
      method: "get",
      url: ROUTES.BASELINK + "/admin/getClient",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => {
        if (res.data.data.length === 0) {
          return;
        }
        setUser(res.data.data);
        setcurrentGroupUser(res.data.data);
      })
      .catch((err) => {
        console.log("error in fetching quries", err);
      });
  };

  const getVendor = async () => {
    axios({
      method: "get",
      url: ROUTES.BASELINK + "/admin/getVendor",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => {
        if (res.data.data.length === 0) {
          return;
        }
        setUser(res.data.data);
        setcurrentGroupUser(res.data.data);
      })
      .catch((err) => {
        console.log("error in fetching quries", err);
      });
  };

  const handleEdit = (data, id) => {
    setEdit(data);
    setgetId(id);
    console.log("cool", edit, data, id);
  };

  const updateHandler = (data) => {
    if (data) {
      getGroup();
    }
    if (name === "Company") {
      getClient();
    } else {
      getVendor();
    }
  };

  const handleCurrentGroup = (name) => {
    if (name === "General") {
      setcurrentGroupUser(user);
      return;
    }
    let c = [];
    for (let i = 0; i < allgroup.length; i++) {
      if (allgroup[i].name === name) {
        let x = allgroup[i].user;
        for (let j = 0; j < x.length; j++) {
          for (let k = 0; k < user.length; k++) {
            if (user[k]._id === x[j]) {
              c.push(user[k]);
              break;
            }
          }
        }
        break;
      }
    }
    setcurrentGroupUser(c);
  };

  useEffect(() => {
    getGroup();
    if (name === "Company") {
      getClient();
    } else {
      getVendor();
    }
  }, []);

  return (
    <div className={`row ${style.home}`}>
      <div className={`col-3 ${style.group}`}>
        <div className={style.sort_search}>
          <p>{name} Group</p>
          <Sort data={allgroup} dataFunction={setAllGroup} />
        </div>
        <div
          onClick={() => setOpenGroup(!openGroup)}
          aria-controls="AddGroup"
          aria-expanded={openGroup}
          className={style.addIcon}
        >
          <AddBoxIcon className={style.coloryellow} />
          Add Group
        </div>
        <Collapse in={openGroup}>
          <div id="AddGroup" className={style.addGroup}>
            <p>Group</p>
            <input
              type="text"
              onChange={(e) => {
                setGroup(e.target.value);
              }}
              value={group}
            ></input>
            <Button variant="warning" onClick={addGroup}>
              Add
            </Button>
          </div>
        </Collapse>

        <div className={style.content}>
          <div className={style.contentDiv}>
            <div className={style.menu}>
              <div
                onClick={() => {
                  handleCurrentGroup("General");
                  setcurrentname("General");
                  getcurrentIndex(-1);
                }}
                className={-1 === currentIndex && `${style.active}`}
              >
                General
              </div>

              <CheckCircleIcon style={{ fontSize: "15px", color: "aqua" }} />
              {/* <MyButton /> */}
            </div>
          </div>
          <div className={style.contentDiv}>
            <div className={style.menu}>
              <div
                onClick={() => {
                  handleCurrentGroup("Block");
                  setcurrentname("Block");
                  getcurrentIndex(-2);
                }}
                className={-2 === currentIndex && `${style.active}`}
              >
                Block{" "}
              </div>
              <CheckCircleIcon style={{ fontSize: "15px", color: "aqua" }} />
              {/* <MyButton /> */}
            </div>{" "}
          </div>
          {allgroup.map((g, i) => {
            if (g.name === "Block") {
              return <></>;
            }
            return (
              <div
                className={
                  edit === "true" && g._id === getId
                    ? `${style.contentEdit} ${style.contentDiv}`
                    : style.contentDiv
                }
              >
                <div className={style.menu}>
                  <div
                    onClick={() => {
                      handleCurrentGroup(g.name);
                      setcurrentname(g.name);
                      getcurrentIndex(i);
                    }}
                    className={i === currentIndex && `${style.active}`}
                    contenteditable={
                      edit === "true" && g._id === getId ? "true" : "false"
                    }
                    onInput={function (e) {
                      g.name = e.target.innerText;
                    }}
                  >
                    {g.name}
                  </div>
                  {g.isActive && (
                    <CheckCircleIcon
                      style={{ fontSize: "15px", color: "aqua" }}
                    />
                  )}
                  {!g.isActive && (
                    <CancelIcon style={{ fontSize: "15px", color: "red" }} />
                  )}
                </div>
                <div>
                  <MyButton
                    data={g}
                    comp="group"
                    updateHandler={updateHandler}
                    name={name}
                    handleEdit={handleEdit}
                    group={allgroup}
                    setcreate={setcreate}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <GroupItem
        data={currentGroupUser}
        name={name}
        groupname={currentname}
        updateHandler={updateHandler}
        group={allgroup}
      />
    </div>
  );
}

export default Group;
