import React, { useState } from "react";
import axios from "axios";
import { Modal } from "react-bootstrap";
import style from "./Cancel.module.css";
import { TOKEN_ID } from "../../../../utils/constants";
import * as ROUTES from "../../../../constants/routes";
import cancel from "../../../../image/delete.png";

function Cancel(props) {
  const [option, setOption] = useState("");
  const [showCancel, setShowCancel] = useState(false);

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
        ROUTES.BASELINK + "/vendor/cancelquery",
        {
          queryId: props.queryId,
          vendorId: props.vendorId,
          cancleReason: option,
        },
        { headers: headers }
      )
      .then((res) => {
        alert(res.data.message);
        if (props.status) {
          props.status("Cancelled");
        }
        setShowCancel(false);
      });
  };

  return (
    <>
      <span className="iconV iconV3" onClick={() => setShowCancel(true)}>
        <p>Cancel</p>
        <img src={cancel} alt="invoice" class="travel-Logo" height="40px" />
      </span>
      <Modal
        show={showCancel}
        onHide={() => setShowCancel(false)}
        centered
        dialogClassName={style.modal}
        backdrop="static"
      >
        <i class="fa fa-times-circle" onClick={() => setShowCancel(false)}></i>
        <div>
          <h2 className={style.modalTitle}>Cancel Booking</h2>
          <small>
            Please Select the option which is best describes your reason for
            Cancellation
          </small>
          <p>Reservation Number : BID-1868106</p>

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
          <button type="submit" onClick={handleSubmit}>
            Cancel Booking
          </button>
        </div>
      </Modal>
    </>
  );
}

export default Cancel;
