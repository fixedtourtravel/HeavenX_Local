import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import style from "./Home.module.css";
import Header from "../Common/Header/Header";
import Account from "../Common/Account/Account";
import Group from "../Common/Group/Group";
import Inquery from "./Inquery/Inquery";
import axios from "axios";
import * as ROUTES from "../../../constants/routes";

function Home() {
  const [data, setData] = useState([]);
  const [allgroup, setAllGroup] = useState([]);
  const [query, setquery] = useState([]);

  const getClient = async () => {
    axios({
      method: "get",
      url: ROUTES.BASELINK + "/admin/getClient",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => {
        if (res.data.data.length === 0) {
          return;
        }
        setData(res.data.data);
      })
      .catch((err) => {
        console.log("error in fetching quries", err);
      });
  };
  const getGroup = async () => {
    await axios
      .post(ROUTES.BASELINK + "/admin/getGroup", {
        name: "Company",
      })
      .then(
        (res) => {
          console.log(res.data.data);
          setAllGroup(res.data.data);
        },
        (error) => {
          console.log(error);
          alert(error);
        }
      );
  };
  const getQuery = async () => {
    axios({
      method: "get",
      url: ROUTES.BASELINK + "/admin/getQuery",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => {
        if (res.data.data.length === 0) {
          return;
        }
        console.log("res.data.data", res.data.data);
        setquery(res.data.data);
      })
      .catch((err) => {
        console.log("error in fetching quries", err);
      });
  };
  const updateHandler = (data) => {
    if (data) {
      getClient();
      getGroup();
    }
  };

  useEffect(() => {
    getClient();
    getGroup();
    getQuery();
  }, []);
  return (
    <div className={style.home}>
      <Router>
        <Header name="Company" link="company" />
        <Switch>
          <Route
            path="/admin/company/company-account"
            component={() => (
              <Account
                name="Company"
                data={data}
                updateHandler={updateHandler}
                group={allgroup}
              />
            )}
          />
          <Route
            path="/admin/company/company-inquery"
            component={() => (
              <Inquery
                name="Company"
                updateHandler={updateHandler}
                data={query}
              />
            )}
          />
          <Route
            path="/admin/company"
            component={() => (
              <Group name="Company" data={data} updateHandler={updateHandler} />
            )}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default Home;
