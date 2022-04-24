import React, { useState, useEffect } from "react";
import { Dropdown, Button, Modal } from "react-bootstrap";
import style from "./MyButton.module.css";
import Profile from "../../../Vendor/Profile/Home";
import axios from "axios";
import { TOKEN_ID } from "../../../../utils/constants";
import * as ROUTES from "../../../../constants/routes";
import { Autocomplete, TextField } from "@mui/material";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../../../context/AuthContext";

function MyButton({
  data,
  updateHandler,
  comp,
  name,
  handleEdit,
  group,
  setcreate,
}) {
  const [showProfile, setShowProfile] = useState(false);
  const [edit, setEdit] = useState(false);
  const [openGroup, setopenGroup] = useState(false);
  const [Group, setGroup] = useState([]);
  const [selectedGroup, setselectedGroup] = useState("");
  const [transfer, setTransfer] = useState(false);
  const [transferMessage, setTransferMessage] = useState("");
  const [view_own, setView_own] = useState(true);
  const [view_all, setView_all] = useState(true);
  const [Edit, setedit] = useState(true);
  const [delet, setdelete] = useState(true);
  const [active_deactive, setactive_deactive] = useState(true);
  const user = useAuth().user;
  const auth = useAuth();
  const history = useHistory();

  const handleSetProfile = () => {
    setShowProfile(!showProfile);
  };

  const headers = {
    "Content-type": "application/json",
    "x-auth-token": `${localStorage.getItem(TOKEN_ID)}`,
  };

  const handleDelete = async () => {
    if (!delet) {
      alert("You are not allowed");
      return;
    }
    let info;
    if (comp === "account") {
      info = {
        user: data._id,
        comp: comp,
      };
    } else if (comp === "group") {
      info = {
        group: data.name,
        comp: comp,
        name: name,
      };
    }
    await axios
      .post(`${ROUTES.BASELINK}/admin/user/delete`, info, { headers: headers })
      .then(
        (res) => {
          alert(res.data.message);
          updateHandler(true);
        },
        (error) => {
          console.log(error);
          alert(error);
        }
      );
  };

  const handleActiveDeactive = async () => {
    if (!active_deactive) {
      alert("You are not allowed");
      return;
    }
    let info;
    if (comp === "account") {
      info = {
        user: data._id,
        comp: comp,
      };
    } else if (comp === "group") {
      info = {
        group: data.name,
        comp: comp,
        name: name,
      };
    }

    await axios
      .post(`${ROUTES.BASELINK}/admin/user/activedeactive`, info, {
        headers: headers,
      })
      .then(
        (res) => {
          alert(res.data.message);
          updateHandler(true);
        },
        (error) => {
          console.log(error);
          alert(error);
        }
      );
  };

  const handleBlock = async () => {
    await axios
      .post(
        ROUTES.BASELINK + "/admin/user/block",
        {
          user: data._id,
        },
        { headers: headers }
      )
      .then(
        (res) => {
          alert(res.data.message);
          updateHandler(true);
        },
        (error) => {
          console.log(error);
          alert(error);
        }
      );
  };

  const handlerEdit = () => {
    handleEdit("true", data._id);
    setEdit(true);
  };

  const handleEditCancel = () => {
    handleEdit("false", "");
    setEdit(false);
    updateHandler(true);
  };

  const handleEditSave = async () => {
    if (!Edit) {
      alert("You are not allowed");
      return;
    }
    await axios
      .post(
        ROUTES.BASELINK + "/admin/group/edit",
        {
          id: data._id,
          name: name,
          newName: data.name,
        },
        { headers: headers }
      )
      .then(
        (res) => {
          updateHandler(true);
          setEdit(false);
          alert(res.data.message);
        },
        (error) => {
          console.log(error);
          alert(error);
        }
      );
  };

  const handleGroup = () => {
    let c = [];
    for (let i = 0; i < group.length; i++) {
      c.push({ label: group[i].name });
    }
    setGroup(c);
  };

  const handleAddGroup = async () => {
    console.log(group, data._id);
    for (let i = 0; i < group.length; i++) {
      let x = group[i].user;
      for (let j = 0; j < x.length; j++) {
        if (x[j] === data._id) {
          setopenGroup(false);
          setTransferMessage(`Already present in ${group[i].name}`);
          setTransfer(true);
          return;
        }
      }
    }
    await axios
      .post(
        ROUTES.BASELINK + "/admin/user/addGroup",
        {
          id: data._id,
          group: selectedGroup,
        },
        { headers: headers }
      )
      .then(
        (res) => {
          updateHandler(true);
          alert(res.data.message);
          setopenGroup(false);
        },
        (error) => {
          console.log(error);
          alert(error);
        }
      );
  };

  const handleTransferGroup = async () => {
    await axios
      .post(
        ROUTES.BASELINK + "/admin/user/transferGroup",
        {
          id: data._id,
          group: selectedGroup,
        },
        { headers: headers }
      )
      .then(
        (res) => {
          updateHandler(true);
          alert(res.data.message);
          setTransfer(false);
        },
        (error) => {
          console.log(error);
          alert(error);
        }
      );
  };

  const HandleLoginAsVender = async (obj) => {
    const response = await fetch(ROUTES.BASELINK + "/api/auth/login/asVender", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": `${localStorage.getItem(TOKEN_ID)}`,
      },
      body: JSON.stringify({
        emailId: data.emailId,
      }),
    });
    const res = await response.json();
    if (res.success) {
      auth.login(res.data.user, res.data.token);
      history.push("/vendor/home");
      window.location.reload();
    } else {
      alert("Error: " + data.msg);
    }
  };

  const handlegetPermission = async () => {
    if (user.isSuperAdmin) {
      return;
    }
    await axios
      .post(
        ROUTES.BASELINK + "/admin/getPermission",
        {
          depart: user.department,
          role: user.departmentRole,
        },
        { headers: headers }
      )
      .then(
        (res) => {
          handlePermission(res.data.data);
        },
        (error) => {
          console.log(error);
          alert(error);
        }
      );
  };

  const handlePermission = (per) => {
    let s = name + " " + comp;
    console.log(s);
    if (per) {
      for (let i = 0; i < per.length; i++) {
        if (per[i].name.toUpperCase() === s.toUpperCase()) {
          console.log("YEs", per[i]);
          setView_own(per[i].value[0]);
          setView_all(per[i].value[1]);
          setcreate(per[i].value[2]);
          setedit(per[i].value[3]);
          setactive_deactive(per[i].value[4]);
          setdelete(per[i].value[5]);
          break;
        }
      }
    }
  };

  useEffect(() => {
    handlegetPermission();
    handleGroup();
  }, []);

  return (
    <div className={style.button}>
      {!edit && (
        <Dropdown
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.005)",
          }}
        >
          <Dropdown.Toggle
            variant="danger"
            className="nav-dropdownToogle"
            style={{ textAlign: "center", marginTop: "0px", marginLeft: "0px" }}
          ></Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item
              onClick={comp === "account" ? handleSetProfile : handlerEdit}
            >
              View/Edit
            </Dropdown.Item>
            {name === "Vender" && comp === "account" && (
              <Dropdown.Item onClick={HandleLoginAsVender}>
                Login as Vender
              </Dropdown.Item>
            )}
            {comp !== "group" && <Dropdown.Item>Transition</Dropdown.Item>}
            {data.isActive && (
              <Dropdown.Item onClick={handleActiveDeactive}>
                Deactivate
              </Dropdown.Item>
            )}
            {!data.isActive && (
              <Dropdown.Item onClick={handleActiveDeactive}>
                Activate
              </Dropdown.Item>
            )}
            {comp !== "group" && !data.isBlock && (
              <Dropdown.Item onClick={handleBlock}>Block</Dropdown.Item>
            )}
            {comp !== "group" && data.isBlock && (
              <Dropdown.Item onClick={handleBlock}>Unblock</Dropdown.Item>
            )}
            {comp !== "group" && (
              <Dropdown.Item onClick={() => setopenGroup(true)}>
                Add to Group
              </Dropdown.Item>
            )}
            <Dropdown.Item onClick={handleDelete}>Delete</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      )}
      {edit && (
        <div>
          <Button onClick={handleEditSave} style={{ marginTop: "0px" }}>
            Save
          </Button>
          <Button
            variant="danger"
            onClick={handleEditCancel}
            style={{ marginTop: "0px" }}
          >
            Cancel
          </Button>
        </div>
      )}
      <Profile
        show={showProfile}
        Hide={setShowProfile}
        user={data}
        updateHandler={updateHandler}
      />
      <Modal
        show={openGroup}
        onHide={() => setopenGroup(false)}
        centered
        dialogClassName={style.modal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>Select a Group</Modal.Title>
        </Modal.Header>
        <Autocomplete
          className={style.autocomplete}
          disablePortal
          id="combo-box-demo"
          options={Group}
          renderInput={(params) => <TextField {...params} size="small" />}
          onChange={(e) => {
            setselectedGroup(e.target.innerText);
          }}
          //value={state}
        />
        <div className={style.but}>
          <Button variant="danger" onClick={() => setopenGroup(false)}>
            Cancel
          </Button>
          <Button variant="warning" onClick={handleAddGroup}>
            Add
          </Button>
        </div>
      </Modal>
      <Modal
        show={transfer}
        onHide={() => setopenGroup(false)}
        centered
        dialogClassName={style.modal}
        backdrop="static"
        keyboard={false}
      >
        <p>
          {transferMessage} <br /> Do you want to Transfer?{" "}
        </p>
        <div className={style.but}>
          <Button variant="danger" onClick={() => setTransfer(false)}>
            Cancel
          </Button>
          <Button variant="warning" onClick={handleTransferGroup}>
            Transfer
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default MyButton;
