import React, { useState } from "react";
import axios from "axios";
import * as ROUTES from "../../../../constants/routes";
import { Dropdown } from "react-bootstrap";
import { Button, Modal } from "react-bootstrap";
import style from "./Finance.module.css";
import { Autocomplete, TextField } from "@mui/material";

function MyButton({ comp, obj, changeHandler, handleEdit, id, country }) {
  const [edit, setEdit] = useState(false);
  const [open, setopen] = useState(false);
  const [defaultCountry, setDefaultCountry] = useState(obj.country);

  const headers = {
    "Content-type": "application/json",
  };

  console.log(obj);

  const handlerActivate = async () => {
    console.log(comp, id, obj._id);
    await axios
      .post(
        ROUTES.BASELINK + "/admin/activeDeactive_curr_tax",
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
        ROUTES.BASELINK + "/admin/delete_curr_tax",
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
    handleEdit("true");
    setEdit(true);
  };

  const handleEditCancel = () => {
    handleEdit("false", "");
    setEdit(false);
    changeHandler(true);
  };

  const handleEditSave = async () => {
    console.log(obj);
    let number;
    if (comp === "Tax") {
      number = obj.percentage;
    } else {
      number = obj.symbol;
    }
    await axios
      .post(
        ROUTES.BASELINK + "/admin/edit_curr_tax",
        {
          id: obj._id,
          name: obj.name,
          number: number,
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

  const handleAssign = async () => {
    console.log(obj);
    await axios
      .post(
        ROUTES.BASELINK + "/admin/assign_curr_tax",
        {
          id: obj._id,
          comp: comp,
          country: defaultCountry,
        },
        { headers: headers }
      )
      .then(
        (res) => {
          alert(res.data.message);
          changeHandler(true);
          setopen(false);
        },
        (error) => {
          console.log(error);
          alert(error);
        }
      );
  };

  return (
    <div className={style.button}>
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
              <Dropdown.Item onClick={() => setopen(true)}>
                Assign Country
              </Dropdown.Item>
              <Dropdown.Item onClick={handlerDelete}>Delete</Dropdown.Item>
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
        <div className={style.modalDiv}>
          <i
            class="fa fa-times-circle"
            onClick={() => setopen(false)}
            style={{ float: "right", fontSize: "30px", cursor: "pointer" }}
          ></i>
          <h4>Choose Country</h4>
          <div style={{ marginTop: "20px" }}>
            <Autocomplete
              multiple
              id="tags-outlined"
              options={country}
              // getOptionLabel={(option) => option.title}
              defaultValue={defaultCountry}
              filterSelectedOptions
              renderInput={(params) => <TextField {...params} />}
              onChange={(event, value) => setDefaultCountry(value)}
            />
          </div>
          <Button
            variant="primary"
            onClick={handleAssign}
            style={{ float: "right" }}
          >
            Save
          </Button>
          <Button
            variant="danger"
            onClick={() => setopen(false)}
            style={{ float: "right" }}
          >
            Cancel
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default MyButton;
