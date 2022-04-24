import React, { useState } from "react";
import style from "./User.module.css";
import axios from "axios";
import * as ROUTES from "../../../../constants/routes";
import { Button, Modal } from "react-bootstrap";

function Toogle({ active, id }) {
  const [on, setOn] = useState(active);
  const [open, setOpen] = useState(false);

  const headers = {
    "Content-type": "application/json",
  };
  const handleActiveDeactive = async () => {
    setOn(!on);
    let info;
    info = {
      user: id,
      comp: "account",
    };
    setOn(!on);
    await axios
      .post(`${ROUTES.BASELINK}/admin/user/activedeactive`, info, {
        headers: headers,
      })
      .then(
        (res) => {
          alert(res.data.message);
          setOpen(false);
        },
        (error) => {
          console.log(error);
          alert(error);
        }
      );
  };

  return (
    <div className={`form-check form-switch ${style.toogle}`}>
      <input
        class="form-check-input"
        type="checkbox"
        role="switch"
        id="flexSwitchCheckDefault"
        checked={on}
        onChange={(e) => {
          setOpen(true);
        }}
      />
      <Modal show={open} centered backdrop="static" keyboard={false}>
        <h4 style={{ margin: "20px", textAlign: "center" }}>
          Do you want to continue?
        </h4>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            onClick={handleActiveDeactive}
            style={{ margin: "20px", maxWidth: "20%" }}
          >
            Yes
          </Button>
          <Button
            onClick={() => {
              setOpen(false);
              setOn(on);
            }}
            variant="danger"
            style={{ margin: "20px", maxWidth: "20%" }}
          >
            No
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default Toogle;
