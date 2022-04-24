import React from "react";
import { NavLink } from "react-router-dom";
import style from "./Header.module.css";

function Header({ name, link }) {
  return (
    <div className={`container-fluid`}>
      <div className={`row ${style.head}`}>
        <NavLink
          exact
          to={`/admin/${link}`}
          className={`col ${style.name}`}
          activeClassName={style.color_org}
        >
          {name} Group 
        </NavLink>
        <NavLink
          to={`/admin/${link}/${link}-account`}
          className={`col ${style.name}`}
          activeClassName={style.color_org}
        >
          {name} Account
        </NavLink>
        <NavLink
          to={`/admin/${link}/${link}-inquery`}
          className={`col ${style.name}`}
          activeClassName={style.color_org}
        >
          {name} Inquery
        </NavLink>
      </div>
    </div>
  );
}

export default Header;
