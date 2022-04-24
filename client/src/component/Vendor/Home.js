import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Inquery from "./Inquery/Inquery";
import Reply from "./Reply/Reply";
import { TOKEN_ID } from "../../utils/constants";
import axios from "axios";
import Navbar from "../../pages/Navbar/Navbar";
import * as ROUTES from "../../constants/routes";

function Home() {
  const [allquery, setAllQuery] = useState([]);
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [holdquery, setHoldQuery] = useState([]);
  const [confirmquery, setConfirmQuery] = useState([]);
  const [cancelquery, setCancelQuery] = useState([]);

  const getuser = () => {
    axios({
      method: "get",
      url: ROUTES.BASELINK + "/vendor/getuser",
      headers: {
        "Content-type": "application/json",
        "x-auth-token": `${localStorage.getItem(TOKEN_ID)}`,
      },
    })
      .then((res) => {
        //console.log("res.data.data", res.data.data);
        setUser(res.data.data);
      })
      .catch((err) => {
        console.log("error in fetching quries", err);
      });
  };

  const getQuery = async () => {
    setLoading(true);
    await axios({
      method: "get",
      url: ROUTES.BASELINK + "/vendor/order",
      headers: {
        "Content-type": "application/json",
        "x-auth-token": `${localStorage.getItem(TOKEN_ID)}`,
      },
    })
      .then((res) => {
        console.log("res", res.data.data);
        let data = res.data.data;
        let hold = [],
          cancel = [],
          confirm = [];
        for (let i = 0; i < data.length; i++) {
          if (data[i].query.hold) {
            hold.push(data[i]);
          } else if (data[i].query.confirm) {
            confirm.push(data[i]);
          } else if (data[i].query.cancel) {
            cancel.push(data[i]);
          }
        }
        setAllQuery(data);
        setHoldQuery(hold);
        setCancelQuery(cancel);
        setConfirmQuery(confirm);
      })
      .catch((err) => {
        console.log("error in fetching quries", err);
      });
    setLoading(false);
  };

  const updateHandler = (data) => {
    if (data) {
      getuser();
      getQuery();
    }
  };

  useEffect(() => {
    getQuery();
    getuser();
  }, []);

  return (
    <div>
      <Router>
        <Navbar />
        <Switch>
          <Route
            exact
            path="/vendor/home"
            component={() => (
              <Inquery
                updateHandler={updateHandler}
                query={allquery}
                user={user}
                loading={loading}
              />
            )}
          />
          <Route
            exact
            path="/"
            component={() => (
              <Inquery
                updateHandler={updateHandler}
                query={allquery}
                user={user}
                loading={loading}
              />
            )}
          />
          <Route
            exact
            path="/invoice/:queryId/:vendorId"
            component={() => <Reply />}
          />
          <Route
            exact
            path="/vendor/confirm"
            component={() => (
              <Inquery
                updateHandler={updateHandler}
                query={confirmquery}
                user={user}
                loading={loading}
              />
            )}
          />
          <Route
            exact
            path="/vendor/hold"
            component={() => (
              <Inquery
                updateHandler={updateHandler}
                query={holdquery}
                user={user}
                loading={loading}
              />
            )}
          />
          <Route
            exact
            path="/vendor/cancel"
            component={() => (
              <Inquery
                updateHandler={updateHandler}
                query={cancelquery}
                user={user}
                loading={loading}
              />
            )}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default Home;
