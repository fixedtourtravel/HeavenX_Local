import React, { useState } from "react";
import axios from "axios";
import * as ROUTES from "../../../../constants/routes";
import { Dropdown } from "react-bootstrap";
import { Button, Modal } from "react-bootstrap";
import style from "./User.module.css";
import Permission from "./Permission/Permission";

function MyButton({ comp, obj, changeHandler, handleEdit, id }) {
  const [edit, setEdit] = useState(false);
  const [open, setopen] = useState(false);

  const headers = {
    "Content-type": "application/json",
  };

  const handlerActivate = async () => {
    console.log(comp, id, obj._id);
    await axios
      .post(
        ROUTES.BASELINK + "/admin/activeDeactive_depart_role",
        {
          id: obj._id,
          comp: comp,
        },
        { headers: headers }
      )
      .then(
        (res) => {
          alert(res.data.message);
          changeHandler(true);
        },
        (error) => {
          console.log(error);
          alert(error);
        }
      );
  };

  const handlerDelete = async () => {
    await axios
      .post(
        ROUTES.BASELINK + "/admin/delete_depart_role",
        {
          id: obj._id,
          comp: comp,
        },
        { headers: headers }
      )
      .then(
        (res) => {
          alert(res.data.message);
          changeHandler(true);
        },
        (error) => {
          console.log(error);
          alert(error);
        }
      );
  };

  const handlerEdit = () => {
    handleEdit("true", obj._id);
    setEdit(true);
  };

  const handleEditCancel = () => {
    handleEdit("false", "");
    setEdit(false);
    changeHandler(true);
  };

  const handleEditSave = async () => {
    console.log(obj);
    await axios
      .post(
        ROUTES.BASELINK + "/admin/edit_depart_role",
        {
          id:obj._id,
          name: obj.name,
          comp: comp,
        },
        { headers: headers }
      )
      .then(
        (res) => {
          alert(res.data.message);
          changeHandler(true);
          setEdit(false);
        },
        (error) => {
          console.log(error);
          alert(error);
        }
      );
  };

  return (
    <div>
      {!edit && (
        <>
          <Dropdown>
            <Dropdown.Toggle
              variant="danger"
              className="nav-dropdownToogle"
              style={{ marginTop: "0px" }}
            ></Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={handlerEdit}>Edit</Dropdown.Item>
              {!obj.active && (
                <Dropdown.Item onClick={handlerActivate}>
                  Activate
                </Dropdown.Item>
              )}
              {obj.active && (
                <Dropdown.Item onClick={handlerActivate}>
                  Deactivate
                </Dropdown.Item>
              )}
              <Dropdown.Item onClick={handlerDelete}>Delete</Dropdown.Item>
              {comp === "role" && (
                <Dropdown.Item onClick={() => setopen(true)}>
                  Assign Permission
                </Dropdown.Item>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </>
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
      <Modal
        show={open}
        centered
        dialogClassName={style.modal}
        backdrop="static"
        keyboard={false}
      >
        <Permission obj={obj} setopen={setopen} changeHandler={changeHandler} />
      </Modal>
    </div>
  );
}

export default MyButton;
