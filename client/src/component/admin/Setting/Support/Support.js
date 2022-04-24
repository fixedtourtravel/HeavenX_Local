import React from "react";
import Header from "./Header";
import style from "./Support.module.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Common from "./Common";

function Support() {
  return (
    <div className={style.home}>
      <Router>
        <Header />
        <Switch>
          <Route
            path="/admin/setting/support/priority"
            component={() => <Common name="Priority" />}
          />
          <Route
            path="/admin/setting/support"
            component={() => <Common name="Status" />}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default Support;
