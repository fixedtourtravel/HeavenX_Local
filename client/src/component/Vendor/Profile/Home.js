import React, { useState } from "react";
import Profile from "./My Profile/Profile";
import BusProfile from "./Business Profile/Profile";
import SideBar from "./SideBar/SideBar";
import { Modal } from "react-bootstrap";

import style from "./Home.module.css";

function Home({ show, Hide, user, updateHandler }) {
  const [showProfile, setShowProfile] = useState(true);
  const [showBusProfile, setShowBusProfile] = useState(false);

  const defaultProfile = () => {
    setShowProfile(true);
    setShowBusProfile(false);
  };

  const closeButton = () => {
    Hide(false);
    defaultProfile();
  };

  return (
    <>
      <Modal
        show={show}
        onHide={() => Hide(false)}
        centered
        dialogClassName={style.modal}
        backdrop="static"
        keyboard={false}
      >
        <small className={style.Cancel}>
          <i class="fa fa-times-circle" onClick={closeButton}></i>
        </small>
        <div className={style.home}>
          <SideBar
            setShowProfile={setShowProfile}
            setShowBusProfile={setShowBusProfile}
            showProfile={showProfile}
            showBusProfile={showBusProfile}
            user={user}
          ></SideBar>
          {showProfile && (
            <Profile
              closeButton={closeButton}
              user={user}
              updateHandler={updateHandler}
            ></Profile>
          )}
          {showBusProfile && (
            <BusProfile
              closeButton={closeButton}
              user={user}
              updateHandler={updateHandler}
            ></BusProfile>
          )}
        </div>
      </Modal>
    </>
  );
}

export default Home;
