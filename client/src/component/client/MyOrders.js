import React, { useState, useEffect } from "react";
import "../../styles/home.css";
import OrderCard from "./OrderCard/OrderCard";
import { useLocation } from "react-router-dom";
import Navbar from "../../pages/Navbar/Navbar";
import axios from "axios";
import { TOKEN_ID } from "../../utils/constants";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import Sort from "../admin/Report/Sort";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [orders1, setOrders1] = useState([]);

  const location = useLocation();
  console.log(location.pathname);
  const getOrders = () => {
    axios({
      method: "get",
      url: ROUTES.BASELINK + "/query/getOrders",
      headers: {
        "Content-type": "application/json",
        "x-auth-token": `${localStorage.getItem(TOKEN_ID)}`,
      },
    })
      .then((result) => {
        if (result.data.success) {
          setOrders(result.data.data);
          setOrders1(result.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getOrders();
  }, []);

  return (
    <>
      <Navbar />
      <div class="orders">
        <div className="order_head">
          <div className="headingOrders">My Orders</div>
          <Sort data={orders} dataFunction={setOrders1} />
        </div>
        <div className="placesCardContainer">
          {orders1.length ? (
            orders1.map((order) => <OrderCard order={order} />)
          ) : (
            <div>
              No orders yet.
              <Link to="/query">
                <button>Create Query?</button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
