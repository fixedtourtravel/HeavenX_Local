import React, { useEffect, useState } from "react";
import style from "./Inquery.module.css";
import { Tabs, Tab } from "react-bootstrap";
import Card from "./Card";

function Inquery({ name, data }) {
  const [allorders, setAllOrders] = useState([]);
  const [holdorders, setHoldOrders] = useState([]);
  const [client_confirmorders, setclient_confirmorders] = useState([]);
  const [vender_confirm, setvender_confirm] = useState([]);

  const [cancelorders, setcancelOrders] = useState([]);

  const initialValue = (data) => {
    console.log(data);
    setAllOrders(data.all);
    setHoldOrders(data.hold);
    setclient_confirmorders(data.client_confirm);
    setvender_confirm(data.vender_confirm);
    setcancelOrders(data.cancel);
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
        <Tab eventKey="client_confirm" title="Client Confirm">
          <Card data={client_confirmorders} name={name} />
        </Tab>
        <Tab eventKey="vender_confirm" title="Vender Confirm">
          <Card data={vender_confirm} name={name} />
        </Tab>
        <Tab eventKey="cancel" title="Cancel">
          <Card data={cancelorders} name={name} />
        </Tab>
      </Tabs>
    </div>
  );
}

export default Inquery;
