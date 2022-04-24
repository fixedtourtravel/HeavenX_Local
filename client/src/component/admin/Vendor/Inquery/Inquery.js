import React, { useEffect, useState } from "react";
import style from "./Inquery.module.css";
import { Tabs, Tab } from "react-bootstrap";
import Card from "./Card";

function Inquery({ name, data }) {
  const [allorders, setAllOrders] = useState([]);
  const [holdorders, setHoldOrders] = useState([]);
  const [confirmorders, setConfirmOrders] = useState([]);
  const [cancelorders, setcancelOrders] = useState([]);

  const initialValue = (data) => {
    console.log(data);
    setAllOrders(data);
    let newI = [],
      hold = [],
      conf = [],
      can = [];

    for (let i = 0; i < data.length; i++) {
      if (data[i].cancel) {
        can.push(data[i]);
      } else if (data[i].confirm) {
        conf.push(data[i]);
      } else if (data[i].hold) {
        hold.push(data[i]);
      }
    }
    setHoldOrders(hold);
    setConfirmOrders(conf);
    setcancelOrders(can);
  };

  useEffect(() => {
    initialValue(data);
  }, []);

  return (
    <div className={style.inquery}>
      <h4>{name} Inquery</h4>
      <Tabs
        defaultActiveKey="allInquery"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="allInquery" title="All Inquery">
          <Card data={allorders} name={name} />
        </Tab>
        <Tab eventKey="hold" title="Hold">
          <Card data={holdorders} name={name} />
        </Tab>
        <Tab eventKey="confirm" title="Confirm">
          <Card data={confirmorders} name={name} />
        </Tab>
        <Tab eventKey="cancel" title="Cancel">
          <Card data={cancelorders} name={name} />
        </Tab>
      </Tabs>
    </div>
  );
}

export default Inquery;
