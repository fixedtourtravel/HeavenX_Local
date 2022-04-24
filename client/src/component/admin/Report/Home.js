import React, { useState, useEffect } from "react";
import style from "./Home.module.css";
import OrderCard from "../../client/OrderCard/OrderCard";
import * as ROUTES from "../../../constants/routes";
import axios from "axios";
import { TOKEN_ID } from "../../../utils/constants";
import Sort from "./Sort";
import { Tabs, Tab } from "react-bootstrap";

function Home() {
  const [allorders, setAllOrders] = useState([]);
  const [neworders, setNewOrders] = useState([]);
  const [holdorders, setHoldOrders] = useState([]);
  const [clientconfirmorders, setClientConfirmOrders] = useState([]);
  const [venderconfirmorders, setVenderConfirmOrders] = useState([]);
  const [cancelorders, setcancelOrders] = useState([]);
  const [paymentorders, setPaymentOrders] = useState([]);
  const [all1orders, setAll1Orders] = useState([]);
  const [new1orders, setNew1Orders] = useState([]);
  const [hold1orders, setHold1Orders] = useState([]);
  const [clientconfirm1orders, setClientConfirm1Orders] = useState([]);
  const [venderconfirmo1rders, setVenderConfirm1Orders] = useState([]);
  const [cancel1orders, setcancel1Orders] = useState([]);
  const [payment1orders, setPayment1Orders] = useState([]);

  const getOrders = () => {
    axios({
      method: "get",
      url: ROUTES.BASELINK + "/admin/getQuery",
      headers: {
        "Content-type": "application/json",
        "x-auth-token": `${localStorage.getItem(TOKEN_ID)}`,
      },
    })
      .then((result) => {
        if (result.data.success) {
          initialValue(result.data.data);
          console.log(result.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const initialValue = (data) => {
    setAllOrders(data);
    setAll1Orders(data);
    let newI = [],
      hold = [],
      confV = [],
      confC = [],
      can = [],
      pay = [];

    for (let i = 0; i < data.length; i++) {
      console.log(i,data[i].client_confirm)
      if (data[i].cancel) {
        can.push(data[i]);
      } else if (data[i].vender_confirm) {
        confV.push(data[i]);
      } else if (data[i].hold) {
        hold.push(data[i]);
      } else if (data[i].newInquery) {
        newI.push(data[i]);
      } else if (data[i].client_confirm) {
        confC.push(data[i]);
      }
    }
    
    setNewOrders(newI);
    setHoldOrders(hold);
    setClientConfirmOrders(confC);
    setVenderConfirmOrders(confV);
    setcancelOrders(can);
    setNew1Orders(newI);
    setHold1Orders(hold);
    setClientConfirm1Orders(confC);
    setVenderConfirm1Orders(confV);
    setcancel1Orders(can);
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className={style.home}>
      <Tabs
        defaultActiveKey="allInquery"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="allInquery" title="All Inquery">
          <Sort data={allorders} dataFunction={setAll1Orders} />
          {all1orders.map((order) => (
            <OrderCard order={order} />
          ))}
        </Tab>
        <Tab eventKey="newInquery" title="New Inquery">
          <Sort data={neworders} dataFunction={setNew1Orders} />
          {new1orders.map((order) => (
            <OrderCard order={order} />
          ))}
        </Tab>
        <Tab eventKey="hold" title="On Hold">
          <Sort data={holdorders} dataFunction={setHold1Orders} />
          {hold1orders.map((order) => (
            <OrderCard order={order} />
          ))}
        </Tab>
        <Tab eventKey="cancel" title="Cancel">
          <Sort data={cancelorders} dataFunction={setcancel1Orders} />
          {cancel1orders.map((order) => (
            <OrderCard order={order} />
          ))}
        </Tab>
        <Tab eventKey="Client confirm" title="Client Confirm">
          <Sort data={clientconfirmorders} dataFunction={setClientConfirm1Orders} />
          {clientconfirm1orders.map((order) => (
            <OrderCard order={order} />
          ))}
        </Tab>
        <Tab eventKey="Vender confirm" title="Vender Confirm">
          <Sort data={venderconfirmorders} dataFunction={setVenderConfirm1Orders} />
          {venderconfirmo1rders.map((order) => (
            <OrderCard order={order} />
          ))}
        </Tab>
        <Tab eventKey="payment" title="Payment Due">
          <Sort data={paymentorders} dataFunction={setPayment1Orders} />
          {payment1orders.map((order) => (
            <OrderCard order={order} />
          ))}
        </Tab>
      </Tabs>
    </div>
  );
}

export default Home;
