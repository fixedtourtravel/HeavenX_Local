import React from "react";
import { NavLink } from "react-router-dom";
import style from "./Page.module.css";

function Header() {
  return (
    <div className={`container-fluid`}>
      <div className={`row ${style.head}`}>
        <NavLink
          exact
          to="/admin/setting/page"
          className={`col ${style.name}`}
          activeClassName={style.color_org}
        >
          Home Page
        </NavLink>
        <NavLink
          exact
          to="/admin/setting/page/customer"
          className={`col ${style.name}`}
          activeClassName={style.color_org}
        >
          Customer Page
        </NavLink>
        <NavLink
          to="/admin/setting/page/vender"
          className={`col ${style.name}`}
          activeClassName={style.color_org}
        >
          Vender Page
        </NavLink>
      </div>
    </div>
  );
}

export default Header;
