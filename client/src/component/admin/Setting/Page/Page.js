import React from "react";
import style from "./Page.module.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./Header";
import Common from "./Common";
function Page() {
  return (
    <div className={style.home}>
      <Router>
        <Header />
        <Switch>
          <Route
            path="/admin/setting/page/customer"
            component={() => <Common name="Customer" />}
          />
          <Route
            path="/admin/setting/page/vender"
            component={() => <Common name="Vender" />}
          />
          <Route
            exact
            path="/admin/setting/page"
            component={() => <Common name="Home" />}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default Page;
