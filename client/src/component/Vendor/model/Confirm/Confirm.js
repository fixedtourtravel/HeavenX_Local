import React, { useState } from "react";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";
import style from "./Confirm.module.css";
import * as ROUTES from "../../../../constants/routes";

function Confirm({ queryId, venderId, status }) {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleConfirm = async () => {
    await axios({
      method: "post",
      url: ROUTES.BASELINK + "/vendor/VenderConfirm",
      data: {
        venderId: venderId,
        queryId: queryId,
      },
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => {
        alert(res.data.message);
        setShowConfirm(false);
        if (status) {
          status(res.data.message);
        }
      })
      .catch((err) => {
        console.log("error in fetching quries", err);
      });
  };

  return (
    <>
      <button className="con-but" onClick={() => setShowConfirm(true)}>
        Confirm
      </button>
      <Modal
        show={showConfirm}
        onHide={() => setShowConfirm(false)}
        centered
        dialogClassName={style.modal}
        backdrop="static"
      >
        <i class="fa fa-times-circle" onClick={() => setShowConfirm(false)}></i>
        <div>
          <h6>Do you want to confirm ?</h6>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <Button
              onClick={() => handleConfirm()}
              style={{ marginLeft: "-20px" }}
            >
              Confirm
            </Button>
            <Button onClick={() => setShowConfirm(false)} variant="danger">
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default Confirm;
