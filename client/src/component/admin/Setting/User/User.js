import React from "react";
import Header from "./Header";
import style from "./User.module.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Profile from "./Profile";
import Role from "./Role/Role";
import Department from "./Department/Department";
import Permission from "./Permission/Permission";
import Email from "./Email";

function User() {
  return (
    <div className={style.home}>
      <Router>
        <Header />
        <Switch>
          <Route
            path="/admin/setting/user/department_role"
            component={() => <Department />}
          />
          <Route path="/admin/setting/user" component={() => <Profile />} />
        </Switch>
      </Router>
    </div>
  );
}

export default User;
