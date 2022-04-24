import React, { useState } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BusinessIcon from "@mui/icons-material/Business";
import StoreIcon from "@mui/icons-material/Store";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import BarChartIcon from "@mui/icons-material/BarChart";
import SettingsIcon from "@mui/icons-material/Settings";
import style from "./Sidebar.module.css";
import { NavLink } from "react-router-dom";
import * as ROUTES from "../../../constants/routes";

function Sidebar() {
  const [showSubSetting, setshowSubSetting] = useState(false);

  return (
    <div className={style.sidebar}>
      <NavLink
        exact
        to={ROUTES.ADMINHOME}
        className={style.row}
        activeClassName={style.active}
      >
        <div className={style.colorblue}>
          <DashboardIcon />
        </div>
        <div>Dashboard</div>
      </NavLink>
      <NavLink
        to={ROUTES.ADMINDESTINATION}
        className={style.row}
        activeClassName={style.active}
      >
        <div className={style.colorblue}>
          <LocationOnIcon />
        </div>
        <div>Destination</div>
      </NavLink>
      <NavLink
        to={ROUTES.ADMINCOMPANY}
        className={style.row}
        activeClassName={style.active}
      >
        <div className={style.colorblue}>
          <BusinessIcon />
        </div>
        <div>Company</div>
      </NavLink>
      <NavLink
        to={ROUTES.ADMINVENDOR}
        className={style.row}
        activeClassName={style.active}
      >
        <div className={style.colorblue}>
          <StoreIcon />
        </div>
        <div>Vendor</div>
      </NavLink>
      <NavLink
        to={ROUTES.ADMINREPORT}
        className={style.row}
        activeClassName={style.active}
      >
        <div className={style.colorblue}>
          <BarChartIcon />
        </div>
        <div>Sales Report</div>
      </NavLink>
      <NavLink
        to={ROUTES.ADMINSUPPORT}
        className={style.row}
        activeClassName={style.active}
      >
        <div className={style.colorblue}>
          <SupportAgentIcon />
        </div>
        <div>Support</div>
      </NavLink>
      <NavLink
        to={ROUTES.ADMINSETTING}
        className={style.row}
        activeClassName={style.active}
        onClick={() => setshowSubSetting(!showSubSetting)}
      >
        <div className={style.colorblue}>
          <SettingsIcon />
        </div>
        <div>Setting</div>
      </NavLink>
      {showSubSetting && (
        <div className={style.subSetting}>
          <NavLink
            to={`${ROUTES.ADMINSETTING}/company`}
            className={style.row1}
            activeClassName={style.active}
          >
            Company SetUp
          </NavLink>
          <NavLink
            to={`${ROUTES.ADMINSETTING}/user`}
            className={style.row1}
            activeClassName={style.active}
          >
            User SetUp
          </NavLink>
          {/* <NavLink
            to={`${ROUTES.ADMINSETTING}/email`}
            className={style.row1}
            activeClassName={style.active}
          >
            Email SetUp
          </NavLink> */}
          <NavLink
            to={`${ROUTES.ADMINSETTING}/finance`}
            className={style.row1}
            activeClassName={style.active}
          >
            Finance SetUp
          </NavLink>
          {/* <NavLink
            to={`${ROUTES.ADMINSETTING}/inquery`}
            className={style.row1}
            activeClassName={style.active}
          >
            Inquery SetUp
          </NavLink> */}
          <NavLink
            to={`${ROUTES.ADMINSETTING}/support`}
            className={style.row1}
            activeClassName={style.active}
          >
            Support SetUp
          </NavLink>
          <NavLink
            to={`${ROUTES.ADMINSETTING}/page`}
            className={style.row1}
            activeClassName={style.active}
          >
            Page SetUp
          </NavLink>
          <NavLink
            to={`${ROUTES.ADMINSETTING}/guest`}
            className={style.row1}
            activeClassName={style.active}
          >
            Guest List
          </NavLink>
          <NavLink
            to={`${ROUTES.ADMINSETTING}/security`}
            className={style.row1}
            activeClassName={style.active}
          >
            Security
          </NavLink>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
