import React from "react";
import payment from "../../image/payment.png";
import axios from "axios";
import * as ROUTES from "../../constants/routes";

function Payment({ queryId, venderId }) {
  const handlePayment = () => {
    axios({
      method: "post",
      url: ROUTES.BASELINK + "/api/payment/order",
      data: { queryId, venderId },
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => {
        console.log(res.data);
        initPayment(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const initPayment = (val) => {
    console.log("venderId", venderId);
    const options = {
      key: "rzp_test_djB8xGrIlPeUbg",
      amount: val.amount,
      currency: val.currency,
      order_id: val.id,
      description: "Test Transaction",
      handler: async (res) => {
        try {
          const verifyUrl = ROUTES.BASELINK + "/api/payment/verify";
          const { data } = await axios.post(verifyUrl, {
            razor: res,
            queryId,
            venderId,
          });
          console.log(data);
        } catch (err) {
          console.log(err);
        }
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  return (
    <div>
      <p>Payment</p>
      <img
        src={payment}
        alt="payment"
        class="travel-Logo"
        height="30px"
        onClick={handlePayment}
      />
    </div>
  );
}

export default Payment;
