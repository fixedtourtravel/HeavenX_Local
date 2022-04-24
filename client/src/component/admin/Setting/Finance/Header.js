import React from "react";
import { NavLink } from "react-router-dom";
import style from "./Finance.module.css";

function Header() {
  return (
    <div className={`container-fluid`}>
      <div className={`row ${style.head}`}>
        <NavLink
          exact
          to="/admin/setting/finance"
          className={`col ${style.name}`}
          activeClassName={style.color_org}
        >
          Tax Rate
        </NavLink>
        <NavLink
          exact
          to="/admin/setting/finance/currency"
          className={`col ${style.name}`}
          activeClassName={style.color_org}
        >
          Currency
        </NavLink>
        <NavLink
          exact
          to="/admin/setting/finance/payment"
          className={`col ${style.name}`}
          activeClassName={style.color_org}
        >
          Payment Mode
        </NavLink>
      </div>
    </div>
  );
}

export default Header;
