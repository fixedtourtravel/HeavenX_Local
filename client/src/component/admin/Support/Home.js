import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Ticket from "./Ticket/Ticket";
import style from "./Home.module.css";
import Department from "./Department/Department";
import Status from "./Status/Status";

function Home() {
  return (
    <div className={style.home}>
      <Router>
        <div className={`container-fluid ${style.home}`}>
          <div className={`row ${style.head}`}>
            <NavLink
              exact
              to="/admin/support"
              className={`col ${style.name}`}
              activeClassName={style.color_org}
            >
              Tickets
            </NavLink>
            <NavLink
              to="/admin/support/department"
              className={`col ${style.name}`}
              activeClassName={style.color_org}
            >
              Departments
            </NavLink>
            <NavLink
              to="/admin/support/status"
              className={`col ${style.name}`}
              activeClassName={style.color_org}
            >
              Ticket Status
            </NavLink>
          </div>
        </div>
        <Switch>
          <Route exact path="/admin/support" component={() => <Ticket />} />
          <Route
            path="/admin/support/department"
            component={() => <Department />}
          />
          <Route path="/admin/support/status" component={() => <Status />} />
        </Switch>
      </Router>
    </div>
  );
}

export default Home;
