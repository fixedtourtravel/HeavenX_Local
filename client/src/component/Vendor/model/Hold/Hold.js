import axios from "axios";
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import style from "./Hold.module.css";
import { TOKEN_ID } from "../../../../utils/constants";
import * as ROUTES from "../../../../constants/routes";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";

function Hold({ queryId, vendorId, status, isConfirm, queryNo, comp }) {
  const [date, setDate] = useState("");
  const [hour, setHour] = useState("");
  const [min, setMin] = useState("");
  const [showHold, setShowHold] = useState(false);

  const handleOnChange = (e) => {
    if (e.target.name === "date") {
      setDate(e.target.value);
      console.log(date);
    }
    if (e.target.name === "hr") {
      setHour(e.target.value);
      console.log(hour);
    }
    if (e.target.name === "mm") {
      setMin(e.target.value);
      console.log(min);
    }
  };

  const submitHandler = async () => {
    if (date === "") {
      alert("Please choose the date");
      return;
    }
    if (hour === "") {
      alert("Please choose the hour");
      return;
    }
    if (min === "") {
      alert("Please choose the min");
      return;
    }
    const headers = {
      "Content-type": "application/json",
      "x-auth-token": `${localStorage.getItem(TOKEN_ID)}`,
    };
    await axios
      .post(
        ROUTES.BASELINK + "/vendor/holdquery",
        {
          queryId: queryId,
          vendorId: vendorId,
          holdDate: date,
          holdHour: hour,
          holdMin: min,
        },
        { headers: headers }
      )
      .then((res) => {
        alert(res.data.message);
        if (status) {
          status(res.data.data);
        }
        setShowHold(false);
      });
  };

  return (
    <>
      {comp === "vender" && (
        <button
          className="hold-but"
          onClick={() => {
            if (!isConfirm) {
              alert("Can hold once Client Confirm");
              return;
            }
            setShowHold(true);
          }}
        >
          Hold
        </button>
      )}
      {comp !== "vender" && (
        <div
          onClick={() => {
            if (!isConfirm) {
              alert("Can hold once Client Confirm");
              return;
            }
            setShowHold(true);
          }}
        >
          <p>Hold</p>
          <PauseCircleIcon
            style={{
              fontSize: "40px",
              color: "rgb(4, 168, 4)",
            }}
          />
        </div>
      )}
      <Modal
        show={showHold}
        onHide={() => setShowHold(false)}
        centered
        dialogClassName={style.modal}
        backdrop="static"
        keyboard={false}
      >
        <i class="fa fa-times-circle" onClick={() => setShowHold(false)}></i>
        <div>
          <h4 className={style.modalTitle}>
            <strong>Order Id :</strong> {queryNo}
          </h4>
          <input
            type="date"
            name="date"
            onChange={(e) => handleOnChange(e)}
          ></input>
          <span>
            <input
              type="number"
              placeholder="hh"
              name="hr"
              onChange={(e) => handleOnChange(e)}
            ></input>
            <input
              type="number"
              placeholder="mm"
              name="mm"
              onChange={(e) => handleOnChange(e)}
            ></input>
          </span>
          <button onClick={submitHandler}>Hold Booking</button>
        </div>
      </Modal>
    </>
  );
}

export default Hold;
