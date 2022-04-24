import React, { useEffect, useState } from "react";
import PeopleIcon from "@material-ui/icons/People";
import Help from "../model/Help&support/Help";
import Cancel from "../model/Cancel/Cancel";
import Hold from "../model/Hold/Hold";
import { useAuth } from "../../../context/AuthContext";
import "./Booking.css";
import { Link, NavLink } from "react-router-dom";
import axios from "axios";
import { TOKEN_ID } from "../../../utils/constants";
import * as ROUTES from "../../../constants/routes";
import Loading from "../../../pages/Loading";
import mealLogo from "../../../image/meal.png";
import help from "../../../image/help.png";
import invoice from "../../../image/invoice.png";
import voucher from "../../../image/voucher.png";
import feedback from "../../../image/feedback.png";
import guest1 from "../../../image/guest-list.svg";
import GuestDetails from "../../client/modals/GuestDetail/GuestDetails";
import Image from "./Image";
import Payment from "../model/payment/Payment";

// import guest from "../../../image/guests.png";

function Booking({ data, status, updateHandler }) {
  const [showHelp, setShowHelp] = useState(false);
  const [Status, setStatus] = useState(status[status.length - 1]);
  const [isConfirm, setIsConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showGuest, setShowGuest] = useState(false);
  const [reqGuest, setReqGuest] = useState(false);
  const [finalCost, setfinalCost] = useState(0);

  const auth = useAuth();

  const handleGuest = async () => {
    if (reqGuest) {
      alert("Already asked for Details");
      return;
    }
    if (isConfirm && isConfirm === false) {
      alert("Can request guest details once client confirms");
      return;
    }
    setLoading(true);

    const headers = {
      "Content-type": "application/json",
      "x-auth-token": `${localStorage.getItem(TOKEN_ID)}`,
    };
    await axios
      .post(
        ROUTES.BASELINK + "/vendor/guestRequest",
        {
          queryId: data._id,
          vendorId: auth.user._id,
        },
        { headers: headers }
      )
      .then((res) => {
        alert(res.data.message);
      });
    setLoading(false);
  };

  const getDetails = async () => {
    setLoading(true);
    await axios({
      method: "post",
      url: ROUTES.BASELINK + "/vendor/replyDetail",
      data: {
        queryId: data._id,
        vendorId: auth.user._id,
      },
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => {
        const { detail } = res.data.data;
        let x = detail.CostDetail;
        if (x && x.finalCost) {
          setfinalCost(x.finalCost);
        }
        // if (x && x.initialPayment) {
        //   setInitialPaymentValue(x.initialPayment);
        // }
      })
      .catch((err) => {
        console.log("error in fetching quries", err);
      });
    setLoading(false);
  };

  useEffect(() => {
    getDetails();
    for (let i = 0; i < status.length; i++) {
      if (status[i] === "Client Confirmed") {
        setIsConfirm(true);
      }
      if (status[i] === "Guest Details Recieved") {
        setShowGuest(true);
      }
      if (status[i] === "Guest Request send") {
        setReqGuest(true);
      }
      // if (status[i].includes("Payment Requested")) {
      //   setInitialPayment(true);
      // }
    }
  }, []);
  return (
    <div className="booking-row">
      <Image name={data.arraydestination[0].queryCountry} />
      <div className="booking-detail">
        <NavLink
          to={`/query/modification/${data._id}`}
          target="_blank"
          style={{ textDecoration: "none" }}
        >
          <div className="orderId">
            <strong>Order Id :</strong> {data.queryNo}
            <small style={{ color: "black", fontWeight: "600" }}>
              &nbsp;( {data.createdAt.substring(0, 10)},&nbsp;
              {data.createdAt.substring(11, 19)} )
            </small>
          </div>
        </NavLink>
        {data.arraydestination.map((val, i) => {
          return (
            <div className="place">
              <strong>{val.queryCity}</strong>, {val.queryCountry}
              <small> ({val.queryNights}nights)</small>
            </div>
          );
        })}
        <div className="totalPerson">
          <span>
            <PeopleIcon /> {data.queryPassengers}
          </span>
          <span>
            <img src={mealLogo} alt="meal"></img> {data.queryMeal}
          </span>
        </div>
      </div>
      <div className=" timeline">
        <div className="startDate">
          {data.arraydestination[0].queryCheckIn.substring(0, 10)}
        </div>
        <div className="duration">{data.queryTotalNights}nights</div>
        <div className="endDate">
          {data.arraydestination[
            data.arraydestination.length - 1
          ].queryCheckOut.substring(0, 10)}
        </div>
      </div>
      <div className=" booking-payment">
        <small>&#8377;{finalCost}</small>
        {/* <div>Initial Payment</div>
        <span>
          <i class="fa fa-inr"></i>
          {initialPaymentValue}
        </span> */}
      </div>
      <div className=" booking-price float-center status">
        <span className="col-org">{Status}</span>
      </div>
      <div className=" actionRow">
        <div className="actionRow1">
          <NavLink
            to={`/voucher/${data._id}/${auth.user._id}`}
            target="_blank"
            style={{ textDecoration: "none" }}
            className="iconV icon iconV4"
          >
            <p>Voucher</p>
            <img src={voucher} alt="7" class="travel-Logo" height="40px" />
          </NavLink>
          <NavLink
            to={`/invoice/vender/${data._id}/${auth.user._id}`}
            target="_blank"
            className="iconV icon iconV3"
          >
            <p>Invoice</p>
            <img
              src={invoice}
              alt="invoice"
              class="travel-Logo"
              height="40px"
            />
          </NavLink>
          <Cancel
            queryId={data._id}
            vendorId={auth.user._id}
            status={setStatus}
            isConfirm={isConfirm}
          ></Cancel>
          <span
            className="iconV icon iconV1"
            onClick={() => setShowHelp(!showHelp)}
          >
            <p>Help</p>
            <img src={help} alt="invoice" class="travel-Logo" height="40px" />
          </span>
        </div>
        <div className="actionRow2">
          <Link
            to={`/reply/vender/${data._id}/${auth.user._id}`}
            target="_blank"
          >
            <button className="repbut">
              Reply <i class="fa fa-play"></i>
            </button>
          </Link>
          <Hold
            queryId={data._id}
            queryNo={data.queryNo}
            status={setStatus}
            isConfirm={isConfirm}
            vendorId={auth.user._id}
            comp="vender"
          ></Hold>
          <button className="con-but">Confirm</button>
        </div>
        <div className="actionRow3">
          <span className="iconV icon iconV2" onClick={handleGuest}>
            <p>Request Guest Details</p>
            <img src={guest1} alt="guest1" class="travel-Logo" height="40px" />
          </span>
          <span className="iconV icon iconV2">
            <p>View Guest Details</p>
            <GuestDetails queryId={data._id} disable={showGuest} />
          </span>
          <span className="iconV icon iconV2">
            <Payment
              queryId={data._id}
              queryNo={data.queryNo}
              status={setStatus}
              isConfirm={isConfirm}
              venderId={auth.user._id}
              role="vender"
              finalCost={finalCost}
            />
          </span>
          <span className="iconV icon iconV4">
            <p>Feedback</p>
            <img
              src={feedback}
              alt="payment"
              class="travel-Logo"
              height="40px"
            />
          </span>
        </div>
      </div>
      <Help show={showHelp} Hide={setShowHelp}></Help>
      <Loading Loading={loading} />
    </div>
  );
}

export default Booking;
