import React from "react";
import { Button } from "react-bootstrap";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import * as ROUTES from "../constants/routes";
import Loading from "./Loading";

function VerifyEmail() {
  const [loading, setloading] = React.useState(false);
  const { token } = useParams();
  console.log("token", token);
  const history = useHistory();
  const handleVerify = async () => {
    setloading(true);
    await axios
      .get(ROUTES.BASELINK + `/api/auth/verifyemail/${token}`, {
        "Content-type": "application/json",
      })
      .then((res) => {
        alert(res.data.message);
        if (res.data.success) {
          history.push("/login");
        } else {
          history.push("/signup");
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
        <h2>Please verify your account</h2>
        <Button variant="danger" onClick={handleVerify}>
          Verify
        </Button>
      </div>
      <img className="plane1" src="/images/plane.svg" alt="Plane" />
    </div>
  );
}

export default VerifyEmail;
