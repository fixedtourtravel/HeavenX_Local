import React from "react";
import GridViewIcon from "@mui/icons-material/GridView";
import PublicIcon from "@mui/icons-material/Public";
// import ApartmentIcon from "@mui/icons-material/Apartment";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import EmojiTransportationIcon from "@mui/icons-material/EmojiTransportation";
import { NavLink } from "react-router-dom";

import style from "./HomePage.module.css";

function HomePage() {
  return (
    <div className={style.home}>
      <NavLink to="/admin/destination/category" className={style.box}>
        <GridViewIcon style={{ color: "orangered", fontSize: "60px" }} />
        Category
      </NavLink>
      <NavLink to="/admin/destination/country" className={style.box}>
        <PublicIcon style={{ color: "orangered", fontSize: "60px" }} />
        Country
      </NavLink>
      {/* <NavLink className={style.box}>
        <ApartmentIcon style={{ color: "orangered", fontSize: "60px" }} />
        City
      </NavLink> */}
      <NavLink to="/admin/destination/meal" className={style.box}>
        <LocalDiningIcon style={{ color: "orangered", fontSize: "60px" }} />
        Meal Plan
      </NavLink>
      <NavLink to="/admin/destination/transport" className={style.box}>
        <EmojiTransportationIcon
          style={{ color: "orangered", fontSize: "60px" }}
        />
        Transport
      </NavLink>
    </div>
  );
}

export default HomePage;
