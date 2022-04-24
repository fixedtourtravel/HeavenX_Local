import React, { useEffect, useState } from "react";
import axios from "axios";
import * as ROUTES from "../../../constants/routes";

function Image({ path }) {
  const [img, setImg] = useState("");

  const getImage = async () => {
    if (path === "") {
      return;
    }
    await axios({
      method: "POST",
      url: ROUTES.BASELINK + "/admin/download",
      responseType: "blob",
      data: { img: path },
    }).then((res) => {
      console.log(res);
      const imageObjectURL = URL.createObjectURL(res.data);
      setImg(imageObjectURL);
    });
  };

  useEffect(() => {
    if (path) {
      getImage();
    }
  }, path);

  return (
    <div>
      {img !== "" ? (
        <img
          src={img}
          alt="img"
          style={{ width: "40px", height: "30px" }}
        ></img>
      ) : (
        <i class="fa fa-image" style={{ width: "30px", fontSize: "25px" }}></i>
      )}
    </div>
  );
}

export default Image;
