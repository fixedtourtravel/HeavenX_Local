import React, { useEffect, useState } from "react";
import style from "./SideBar.module.css";
import axios from "axios";
import * as ROUTES from "../../../../constants/routes";
import profilepic from "../../../../image/profilepic.png";
import { useAuth } from "../../../../context/AuthContext";

function SideBar(props) {
  const [name, setName] = useState("");
  const [clientCode, setClientCode] = useState("");
  const [img, setImg] = useState("");
  const user = useAuth().user;

  const handleSetProfile = () => {
    if (!props.showProfile) {
      props.setShowProfile(!props.showProfile);
      props.setShowBusProfile(!props.showBusProfile);
    }
  };

  const handleSetBusProfile = () => {
    if (!props.showBusProfile) {
      props.setShowBusProfile(!props.showBusProfile);
      props.setShowProfile(!props.showProfile);
    }
  };

  const profilePic = async () => {
    await axios({
      method: "POST",
      url: ROUTES.BASELINK + "/vendor/download",
      responseType: "blob",
      data: {
        userId: props.user._id,
        fileName: "logo",
      },
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      const imageObjectURL = URL.createObjectURL(res.data);
      setImg(imageObjectURL);
      console.log("imageObjectURL", imageObjectURL);
    });
  };

  useEffect(() => {
    setName(props.user.username);
    setClientCode(props.user.uniqueCode);
    profilePic();
  }, []);

  return (
    <div>
      <div className={style.sidebar}>
        <div className={style.name}>
          <div className={style.profilepic}>
            <span>Company logo</span>
            <div>
              {props.user.document && props.user.document.logo ? (
                <img
                  src={img}
                  alt="profilepic"
                  style={{ width: "80px", height: "80px", borderRadius: "50%" }}
                ></img>
              ) : (
                <img
                  src={profilepic}
                  alt="profilepic"
                  style={{ width: "80px", height: "80px", borderRadius: "50%" }}
                ></img>
              )}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
              alignItems: "flex-start",
            }}
          >
            <div style={{ maxWidth: "fit-content" }}>{name}</div>
            {props.user.role === "supplier" && <div>{clientCode} </div>}
          </div>
        </div>
        <div
          onClick={handleSetProfile}
          className={props.showProfile ? style.active : style.profile}
        >
          Profile
        </div>
        {props.user.role !== "admin" && (
          <div
            onClick={handleSetBusProfile}
            className={props.showBusProfile ? style.active : style.profile}
          >
            Businness
          </div>
        )}
      </div>
    </div>
  );
}

export default SideBar;
