import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import style from "./Verify.module.css";
import Profile from "../../Profile/Home";
import { useAuth } from "../../../../context/AuthContext";

function Verify({ show, Hide, user, updateHandler }) {
  const [showProfile, setShowProfile] = useState(false);

  const auth = useAuth();

  const handleSetProfile = () => {
    setShowProfile(!showProfile);
  };

  return (
    <div>
      <Modal
        show={show}
        centered
        dialogClassName={style.modal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>Message From Admin</Modal.Title>
        </Modal.Header>
        <p>
          Your Account is not verified, Please fill the details and wait till it
          is verified.
        </p>
        <strong>Note: If already verified please wait or refresh!! </strong>
        <div>
          <Button variant="warning" onClick={handleSetProfile}>
            Fill details
          </Button>
          <Button variant="danger" onClick={auth.logout}>
            Logout
          </Button>
        </div>
      </Modal>
      <Profile
        show={showProfile}
        Hide={setShowProfile}
        user={user}
        updateHandler={updateHandler}
      ></Profile>
    </div>
  );
}

export default Verify;
