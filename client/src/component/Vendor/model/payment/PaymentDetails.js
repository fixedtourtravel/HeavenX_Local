import React, { useEffect, useState } from "react";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import { Button, Modal, Form } from "react-bootstrap";
import style from "./Payment.module.css";
import { Input, Label } from "reactstrap";
import * as ROUTES from "../../../../constants/routes";
import axios from "axios";

function PaymentDetails({ changeHandler, role, queryNo, payment, index }) {
  const [show, setshow] = useState(false);
  const [details, setdetails] = useState("");

  const headers = {
    "Content-type": "application/json",
  };

  const handleSave = async () => {
    await axios
      .post(
        ROUTES.BASELINK + "/query/paymentDetail",
        {
          queryNo,
          details,
          index,
        },
        { headers: headers }
      )
      .then((res) => {
        changeHandler(true);
        alert(res.data.message);
      });
  };

  const handleApprove = async () => {
    await axios
      .post(
        ROUTES.BASELINK + "/query/paymentApprove",
        {
          queryNo,
          index,
        },
        { headers: headers }
      )
      .then((res) => {
        changeHandler(true);
        alert(res.data.message);
      });
  };

  useEffect(() => {
    setdetails(payment[index].details);
  }, []);

  return (
    <div>
      <FileCopyIcon
        style={{
          color: "#58e0e0",
          cursor: "pointer",
          marginLeft: "-15px",
        }}
        onClick={() => setshow(true)}
      />
      ]
      <Modal
        show={show}
        onHide={() => setshow(false)}
        centered
        dialogClassName={style.modal1}
        backdrop="static"
        keyboard={false}
      >
        <i class="fa fa-times-circle" onClick={() => setshow(false)}></i>
        <div>
          <h4 className={style.modalTitle}>
            <strong>Payment Details</strong>
          </h4>
          <div className={style.details}>
            <Label>Account No</Label>
            <Input
              type="text"
              name="account"
              as="textarea"
              //onChange={(e) => handleOnChange(e)}
            ></Input>
            <Label>Payment Details</Label>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
              style={{ width: "100%", margin: "0" }}
            >
              <Form.Control
                as="textarea"
                rows={10}
                onChange={(e) => {
                  setdetails(e.target.value);
                }}
                value={details}
              />
            </Form.Group>

            <div className={style.buttons1}>
              <Button
                type="submit"
                onClick={role === "client" ? handleSave : handleApprove}
              >
                {role === "client" ? "Save" : "Approve"}
              </Button>
              <Button
                type="submit"
                onClick={() => setshow(false)}
                variant="danger"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default PaymentDetails;
