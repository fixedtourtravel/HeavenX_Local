import React, { useEffect, useState } from "react";
import axios from "axios";
import * as ROUTES from "../../../constants/routes";

function Image({ name }) {
  const [img, setImg] = useState("");

  const getImage = async () => {
    console.log(name);
    await axios({
      method: "POST",
      url: ROUTES.BASELINK + "/vendor/placeImg",
      responseType: "blob",
      data: { name: name },
    }).then((res) => {
      console.log(res);
      const imageObjectURL = URL.createObjectURL(res.data);
      setImg(imageObjectURL);
    });
  };

  useEffect(() => {
    getImage();
  }, []);

  return (
    <>
      {img !== "" ? (
        <img
          src={img}
          alt="img"
          className="float-left booking-img"
          //style={{ width: "200px", height: "150px" }}
        ></img>
      ) : (
        <i
          class="fa fa-image"
          style={{ fontSize: "200px", marginLeft: "8px" }}
        ></i>
      )}
    </>
  );
}

export default Image;
