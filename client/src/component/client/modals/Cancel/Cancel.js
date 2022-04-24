import React, { useState } from "react";
import axios from "axios";
import { Modal } from "react-bootstrap";
import style from "./Cancel.module.css";
import { TOKEN_ID } from "../../../../utils/constants";
import * as ROUTES from "../../../../constants/routes";
import Loading from "../../../../pages/Loading";
import cancelimg from "../../../../image/delete.png";

function Cancel({
  queryId,
  vendorId,
  type,
  cancel,
  setCancel,
  queryNo,
  disable,
}) {
  const [show, setShow] = useState(false);
  const [option, setOption] = useState("");
  const [loading, setloading] = useState(false);
  const handleOption = (e) => {
    let x = document.getElementById("category").value;
    setOption(x);
    console.log(x);
  };

  const handleSubmit = async () => {
    if (option === "") {
      alert("Please choose one option");
      return;
    }
    const headers = {
      "Content-type": "application/json",
      "x-auth-token": `${localStorage.getItem(TOKEN_ID)}`,
    };
    await axios
      .post(
        ROUTES.BASELINK + "/vendor/quotation/clientCancel",
        {
          queryId: queryId,
          vendorId: vendorId,
          cancleReason: option,
        },
        { headers: headers }
      )
      .then((res) => {
        alert(res.data.message);
        setShow(false);
      });
  };
  const handleCancel = async () => {
    setCancel(true);
    await axios({
      method: "post",
      url: ROUTES.BASELINK + "/query/cancel",
      data: {
        id: queryId,
      },
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => {
        alert(res.data.message);
        setShow(false);
      })
      .catch((err) => {
        console.log("error in fetching quries", err);
      });
    setloading(false);
  };

  return (
    <>
      {type !== "query" && (
        <span
          className={style.cancelIcon}
          onClick={() => {
            if (!disable) setShow(true);
            else {
              alert("You have confirmed other order, can not use this option");
            }
          }}
        >
          <p>Cancel</p>
          <img src={cancelimg} alt="6" class="travel-Logo" height="30px" />{" "}
        </span>
      )}
      {type === "query" && (
        <button
          className={style.cancel_Btn}
          onClick={() => setShow(true)}
          disabled={cancel}
        >
          {cancel ? "Cancelled" : "Cancel"}
        </button>
      )}
      <Modal
        show={show}
        onHide={() => setShow(false)}
        centered
        dialogClassName={style.modal}
        backdrop="static"
      >
        <i class="fa fa-times-circle" onClick={() => setShow(false)}></i>
        <div>
          <h2 className={style.modalTitle}>Cancel Booking</h2>
          <small>
            Please Select the option which is best describes your reason for
            Cancellation
          </small>
          <p>Query Number : {queryNo}</p>

          <p>Reason For Cancellation</p>
          <select
            name="category"
            id="category"
            onChange={(e) => handleOption(e)}
          >
            <option value="" disabled selected hidden>
              --- Select an Option ---
            </option>
            <option value="Late Reply">Late Reply</option>
            <option value="Requirement Unfulfilled">
              Requirement Unfulfilled
            </option>
            <option value="Found Lower Price">Found Lower Price</option>
          </select>
          <button
            type="submit"
            onClick={type === "query" ? handleCancel : handleSubmit}
          >
            Cancel Booking
          </button>
        </div>
      </Modal>
      <Loading Loading={loading} />
    </>
  );
}

export default Cancel;
