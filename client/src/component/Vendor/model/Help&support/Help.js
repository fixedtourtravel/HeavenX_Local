import { Modal } from "react-bootstrap";
import React from "react";
import style from "./Help.module.css";

function Help(props) {
  return (
    <>
      <Modal
        show={props.show}
        onHide={() => props.Hide(false)}
        centered
        dialogClassName={style.modal}
        backdrop="static"
        keyboard={false}
      >
        <i class="fa fa-times-circle" onClick={() => props.Hide(false)}></i>
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
          {props.queryNo && (
            <strong>Reservation Number : {props.queryNo} </strong>
          )}
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
            <button type="submit">Send</button>
          </form>
        </div>
      </Modal>
    </>
  );
}

export default Help;
