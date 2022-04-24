import { Modal } from "react-bootstrap";
import React from "react";
import style from "./Help.module.css";
import help from "../../../../image/help.png";

function Help({ queryId, vendorId, queryNo, disable }) {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <span
        className="iconV iconV1"
        onClick={() => {
          if (!disable) setOpen(true);
          else {
            alert("You have confirmed other order, can not use this option");
          }
        }}
      >
        <p>Help</p>
        <img src={help} alt="invoice" class="travel-Logo" height="30px" />
      </span>
      <Modal
        show={open}
        onHide={() => setOpen(false)}
        centered
        dialogClassName={style.modal}
        backdrop="static"
        keyboard={false}
      >
        <i class="fa fa-times-circle" onClick={() => setOpen(false)}></i>
        <div>
          <h2 className={style.modalTitle}>Help and Support</h2>
          <small>
            To send your queries, please select one of the below sections, write
            your question to the subject and message port and press the enter
            key
          </small>
          <p>
            PLEASE SUBMIT YOUR MESSAGE IN ENGLISH SINCE OUR OPERATOR TEAM GIVES
            SUPPORT ONLY IN ENGLISH
          </p>
          <strong>Reservation Number : {queryNo}</strong>
          <form>
            <p>Category</p>
            <span>
              <select name="category" id="category">
                <option value="" disabled selected hidden>
                  Select a Catogery
                </option>
                <option value="1">Inquery Related</option>
                <option value="2">Modification Request</option>
                <option value="3">Cancellation Request</option>
                <option value="4">Complaint</option>
                <option value="5">Hotel</option>
                <option value="6">Tour/Activity/Sightseeing</option>
              </select>
              <input type="text" placeholder="  Subject"></input>
            </span>
            <textarea rows="5" placeholder="  Message"></textarea>
            <button>Send</button>
          </form>
        </div>
      </Modal>
    </>
  );
}

export default Help;
