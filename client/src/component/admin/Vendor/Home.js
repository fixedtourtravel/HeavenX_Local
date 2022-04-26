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
  const [reply, setreply] = useState([]);

  const getVendor = async () => {
    axios({
      method: "get",
      url: ROUTES.BASELINK + "/admin/getVendor",
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
        name: "Vender",
      })
      .then(
        (res) => {
          setAllGroup(res.data.data);
        },
        (error) => {
          console.log(error);
          alert(error);
        }
      );
  };

  const getReply = async () => {
    axios({
      method: "get",
      url: ROUTES.BASELINK + "/admin/getReply",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => {
        console.log("res.data.data", res.data.data);

        if (res.data.data.length === 0) {
          return;
        }
        setreply(res.data.data);
      })
      .catch((err) => {
        console.log("error in fetching quries", err);
      });
  };

  const updateHandler = (data) => {
    if (data) {
      getVendor();
      getGroup();
      getReply();
    }
  };

  useEffect(() => {
    getVendor();
    getGroup();
    getReply();
  }, []);

  return (
    <div className={style.home}>
      <Router>
        <Header name="Vender" link="vendor" />
        <Switch>
          <Route
            path="/admin/vendor/vendor-account"
            component={() => (
              <Account
                name="Vender"
                data={data}
                updateHandler={updateHandler}
                group={allgroup}
              />
            )}
          />
          <Route
            path="/admin/vendor/vendor-inquery"
            component={() => (
              <Inquery
                name="Vender"
                data={reply}
                updateHandler={updateHandler}
              />
            )}
          />
          <Route
            path="/admin/vendor"
            component={() => (
              <Group name="Vender" data={data} updateHandler={updateHandler} />
            )}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default Home;
