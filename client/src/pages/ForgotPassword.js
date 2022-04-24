import React from "react";
import axios from "axios";
import * as ROUTES from "../constants/routes";
import { Button } from "react-bootstrap";
import Loading from "./Loading";
import { useHistory } from "react-router-dom";

function ForgotPassword() {
  const [loading, setloading] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const history = useHistory();

  const handleForgotPassword = () => {
    setloading(true);
    axios({
      method: "post",
      url: ROUTES.BASELINK + "/api/auth/forgotpassword",
      data: {
        email: email,
      },
    })
      .then((result) => {
        console.log(result);
        if (result.data.success) {
          console.log(result.data);
          alert(result.data.message);
          history.push("/login");
        } else {
          alert(result.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    setloading(false);
  };
  return (
    <div className="verifyemail">
      <Loading Loading={loading} />
      <img
        className="hotairballoon three"
        src="/images/hotairballoon.svg"
        alt="hotAirBalloon"
        width="200px"
        height="200px"
      />
      <div className="verifyemail-content">
        <h2>Please Enter your registered Email Id</h2>
        <input
          type="text"
          placeholder="Email Id"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          style={{ width: "27%" }}
        ></input>
        <Button variant="danger" onClick={handleForgotPassword}>
          Submit
        </Button>
      </div>
      <img className="plane1" src="/images/plane.svg" alt="Plane" />
    </div>
  );
}

export default ForgotPassword;
