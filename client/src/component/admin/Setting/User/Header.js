import React from "react";
import { NavLink } from "react-router-dom";
import style from "./User.module.css";

function Header() {
  return (
    <div className={`container-fluid`}>
      <div className={`row ${style.head}`}>
        <NavLink
          exact
          to={"/admin/setting/user"}
          className={`col ${style.name}`}
          activeClassName={style.color_org}
        >
          Profile
        </NavLink>
        <NavLink
          to={`/admin/setting/user/department_role`}
          className={`col ${style.name}`}
          activeClassName={style.color_org}
        >
          Department/role
        </NavLink>
      </div>
    </div>
  );
}

export default Header;
