import React, { useEffect, useState } from "react";
import axios from "axios";
import { TOKEN_ID } from "../../../utils/constants";
import * as ROUTES from "../../../constants/routes";
import { Dropdown } from "react-bootstrap";
import { Button, Modal, Form } from "react-bootstrap";
import style from "./Common.module.css";
import { useAuth } from "../../../context/AuthContext";

function MyButton({ comp, obj, changeHandler, handleEdit, setcreate }) {
  const [edit, setEdit] = useState(false);
  const [upload, setUpload] = useState(false);
  const [img, setImg] = useState(false);
  const [view_own, setView_own] = useState(true);
  const [view_all, setView_all] = useState(true);
  const [Edit, setedit] = useState(true);
  const [delet, setdelete] = useState(true);
  const [active_deactive, setactive_deactive] = useState(true);
  const user = useAuth().user;

  const headers = {
    "Content-type": "application/json",
    "x-auth-token": `${localStorage.getItem(TOKEN_ID)}`,
  };
  const handlerActivate = async () => {
    if (!active_deactive) {
      alert("You are not allowed");
      return;
    }
    await axios
      .post(
        ROUTES.BASELINK + "/admin/activeDeactive",
        {
          obj: obj,
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
    if (!delet) {
      alert("You are not allowed");
      return;
    }
    await axios
      .post(
        ROUTES.BASELINK + "/admin/delete",
        {
          obj: obj,
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
    if (!Edit) {
      alert("You are not allowed");
      return;
    }
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
        ROUTES.BASELINK + "/admin/edit",
        {
          obj: obj,
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

  const handleUpload = async () => {
    if (!Edit) {
      alert("You are not allowed");
      return;
    }
    const formData = new FormData();
    formData.append("country", img);

    await axios({
      method: "post",
      url: ROUTES.BASELINK + `/admin/upload/${obj.name}`,
      data: formData,
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem(TOKEN_ID),
      },
    }).then((res) => {
      console.log(res);
      changeHandler(true);
      alert(res.data.message);
      setUpload(false);
    });
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
          console.log(res.data);
          handlePermission(res.data.data);
        },
        (error) => {
          console.log(error);
          alert(error);
        }
      );
  };

  const handlePermission = (per) => {
    if (per) {
      for (let i = 0; i < per.length; i++) {
        if (per[i].name.toUpperCase() === comp.toUpperCase()) {
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
  }, []);

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
              {comp === "country" && (
                <Dropdown.Item onClick={() => setUpload(true)}>
                  Upload Image
                </Dropdown.Item>
              )}

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
        show={upload}
        centered
        dialogClassName={style.modal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>Upload Image</Modal.Title>
        </Modal.Header>
        <Form.Group controlId="formFile" className={`mb-3`}>
          <Form.Control
            type="file"
            name="logo"
            accept="image/*"
            onChange={(e) => {
              setImg(e.target.files[0]);
            }}
          />
        </Form.Group>
        <div>
          <Button variant="danger" onClick={() => setUpload(false)}>
            Cancel
          </Button>
          <Button variant="warning" onClick={() => handleUpload()}>
            Upload
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default MyButton;
