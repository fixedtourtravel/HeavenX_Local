import React from "react";
import Sidebar from "./Sidebar/Sidebar";
import Destination from "./Destination/Home";
import Dashboard from "./Dashboard/Home";
import Company from "./Company/Home";
import Vendor from "./Vendor/Home";
import Support from "./Support/Home";
import Report from "./Report/Home";
import Navbar from "../../pages/Navbar/Navbar";
import * as ROUTES from "../../constants/routes";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CompanySetting from "./Setting/Company/Company";
import User from "./Setting/User/User";
import Email from "./Setting/Email/Email";
import Finance from "./Setting/Finance/Finance";
import Inquery from "./Setting/Inquery/Inquery";
import Page from "./Setting/Page/Page";
import Security from "./Setting/Security/Security";
import SupportS from "./Setting/Support/Support";
import Guest from "./Setting/Guest/Guest";

import style from "./Home.module.css";

function Home() {
  return (
    <>
      <Navbar />
      <Router>
        <div className={style.home}>
          <Sidebar />
          <Switch>
            <Route
              exact
              path={ROUTES.ADMINHOME}
              component={() => <Dashboard />}
            />
            <Route exact path={ROUTES.HOME} component={() => <Dashboard />} />
            <Route
              path={ROUTES.ADMINDESTINATION}
              component={() => <Destination />}
            />
            <Route path={ROUTES.ADMINCOMPANY} component={() => <Company />} />
            <Route path={ROUTES.ADMINVENDOR} component={() => <Vendor />} />
            <Route path={ROUTES.ADMINREPORT} component={() => <Report />} />
            <Route path={ROUTES.ADMINSUPPORT} component={() => <Support />} />
            <Route
              path={`${ROUTES.ADMINSETTING}/company`}
              component={() => <CompanySetting />}
            />
            <Route
              path={`${ROUTES.ADMINSETTING}/user`}
              component={() => <User />}
            />
            <Route
              path={`${ROUTES.ADMINSETTING}/email`}
              component={() => <Email />}
            />
            <Route
              path={`${ROUTES.ADMINSETTING}/finance`}
              component={() => <Finance />}
            />
            <Route
              path={`${ROUTES.ADMINSETTING}/inquery`}
              component={() => <Inquery />}
            />
            <Route
              path={`${ROUTES.ADMINSETTING}/page`}
              component={() => <Page />}
            />
            <Route
              path={`${ROUTES.ADMINSETTING}/security`}
              component={() => <Security />}
            />
            <Route
              path={`${ROUTES.ADMINSETTING}/guest`}
              component={() => <Guest />}
            />
            <Route
              path={`${ROUTES.ADMINSETTING}/support`}
              component={() => <SupportS />}
            />
            <Route path={ROUTES.ADMINSETTING} component={() => <CompanySetting />} />
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default Home;
