import React, { useState } from "react";
import style from "./User.module.css";
import NewProfile from "./NewProfile";
import { Modal } from "react-bootstrap";

function UserInfo({ val, changeHandler }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div onClick={() => setOpen(true)} className={style.username}>
        {val.username}
      </div>
      <Modal
        show={open}
        centered
        dialogClassName={style.modal}
        backdrop="static"
        keyboard={false}
      >
        <NewProfile
          setOpen={setOpen}
          changeHandler={changeHandler}
          val={val}
          comp="userInfo"
        />
      </Modal>
    </div>
  );
}

export default UserInfo;
