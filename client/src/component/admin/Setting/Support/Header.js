import React from "react";
import { NavLink } from "react-router-dom";
import style from "./Support.module.css";

function Header() {
  return (
    <div className={`container-fluid`}>
      <div className={`row ${style.head}`}>
        <NavLink
          exact
          to="/admin/setting/support"
          className={`col ${style.name}`}
          activeClassName={style.color_org}
        >
          Ticket Status
        </NavLink>
        <NavLink
          exact
          to="/admin/setting/support/priority"
          className={`col ${style.name}`}
          activeClassName={style.color_org}
        >
          Ticket Priority
        </NavLink>
      </div>
    </div>
  );
}

export default Header;
