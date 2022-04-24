import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PeopleIcon from "@material-ui/icons/People";
import RestaurantIcon from "@material-ui/icons/Restaurant";
import StickyHeadTable from "../StickyHeadTable";
import style from "./orderCard.module.css";
import axios from "axios";
import Loading from "../../../pages/Loading";
import * as ROUTES from "../../../constants/routes";
import Cancel from "../modals/Cancel/Cancel";
import Image from "../../Vendor/Inquery/Image";
import { useAuth } from "../../../context/AuthContext";
import Payment from "../../Vendor/model/payment/Payment";

export default function OrderCard({ order }) {
  const [cardOpen, setCardOpen] = useState(false);
  const [loading, setloading] = useState(false);
  const [data, setData] = useState([]);
  const [cancel, setCancel] = useState(order.cancel);
  const role = useAuth().user.role;

  const getDetails = async () => {
    setloading(true);
    await axios({
      method: "post",
      url: ROUTES.BASELINK + "/query/vendorProposal",
      data: {
        id: order._id,
      },
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        console.log("error in fetching quries", err);
      });
    setloading(false);
  };

  useEffect(() => {
    getDetails();
  }, []);

  return (
    <div className={style.home}>
      <Loading Loading={loading} />
      <div className={style.booking_row}>
        <Image name={order.arraydestination[0].queryCountry} />
        <div className={style.booking_detail}>
          <div className={style.orderId}>
            <strong>Order Id :</strong> {order.queryNo}
            <small style={{ color: "black", fontWeight: "600" }}>
              &nbsp;( {order.createdAt.substring(0, 10)},&nbsp;
              {order.createdAt.substring(11, 19)} )
            </small>
          </div>
          {order.arraydestination.map((x, i) => (
            <div className={style.place}>
              <strong>{x.queryCity}</strong>, {x.queryCountry}
              <small> ({x.queryNights}nights)</small>
            </div>
          ))}
          <div className={style.totalPerson}>
            <span>
              <PeopleIcon /> {order.queryPassengers}
            </span>
            <span>
              <RestaurantIcon />
              {order.queryMeal === "" ? "Meal not required" : order.queryMeal}
            </span>
          </div>
        </div>
        <div className={style.timeline}>
          <div className={style.startDate}>
            {order.arraydestination[0].queryCheckIn.substring(0, 10)}
          </div>
          <div className={style.duration}>{order.queryTotalNights}nights</div>
          <div className={style.endDate}>
            {order.arraydestination[
              order.arraydestination.length - 1
            ].queryCheckOut.substring(0, 10)}
          </div>
        </div>
        <div className={style.but}>
          {role === "admin" && (
            <div>
              <Payment
                queryId={order._id}
                role="admin"
                queryNo={order.queryNo}
                venderId={order.venderId}
                finalCost={order.ClientfinalCost}
              />
            </div>
          )}
          <div>
            <button
              className={style.quotation_Btn}
              onClick={() => {
                setCardOpen(!cardOpen);
              }}
              disabled={cancel}
            >
              <p
                className={
                  data.length > 0 ? `${style.show}` : ` ${style.notShow}`
                }
              >
                {data.length > 0 ? data.length : ""}
              </p>
              Quotation
            </button>
            <Link
              disabled={cancel}
              to={`/query/modification/${order._id}`}
              target="_blank"
            >
              <button class={style.modify_Btn} disabled={cancel}>
                Modify
              </button>
            </Link>
            <Cancel
              queryId={order._id}
              cancel={cancel}
              setCancel={setCancel}
              queryNo={order.queryNo}
              type="query"
            />
          </div>
        </div>
      </div>
      {cardOpen ? (
        <div class={style.quotation}>
          <StickyHeadTable data={data} order={order} />
        </div>
      ) : null}
    </div>
  );
}
