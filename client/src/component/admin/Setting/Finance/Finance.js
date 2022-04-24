import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./Header";
import Common from "./Common";
import style from "./Finance.module.css";
import * as ROUTES from "../../../../constants/routes";
import axios from "axios";

function Finance() {
  const [country, setcountry] = useState([]);

  const getData = () => {
    axios({
      method: "get",
      url: ROUTES.BASELINK + "/admin/destinataionData",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => {
        if (res.data.data.length === 0) {
          return;
        }

        let p = res.data.data[0].place;
        let c = [];
        for (let i = 0; i < p.length; i++) {
          c.push({ label: p[i].country.name });
        }
        console.log(c);
        setcountry(c);
      })
      .catch((err) => {
        console.log("error in fetching quries", err);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className={style.home}>
      <Router>
        <Header />
        <Switch>
          <Route
            path="/admin/setting/finance/currency"
            component={() => <Common comp="Currency" country={country} />}
          />
          <Route
            path="/admin/setting/finance/payment"
            component={() => <Common comp="Payment" />}
          />
          <Route
            path="/admin/setting/finance"
            component={() => <Common comp="Tax" country={country} />}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default Finance;
