import React, { useEffect, useState } from "react";
import axios from "axios";
import * as ROUTES from "../constants/routes";

function Image({ path }) {
  const [img, setImg] = useState("");

  const getImage = async () => {
    console.log(path)
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
console.log("image",path)
  useEffect(() => {
    if (path) {
      getImage();
    }
  }, [path]);

  return (
    <>
      {img !== " " && (
        <img src={img} alt="img" className="sliderimg"></img>
      )}
    </>
  );
}

export default Image;
