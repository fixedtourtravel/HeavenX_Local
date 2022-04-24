import axios from "axios";
import React from "react";
import { useParams, useHistory } from "react-router-dom";
import * as ROUTES from "../constants/routes";
import { Button } from "react-bootstrap";
import Loading from "./Loading";

function ResetPassword() {
  const [loading, setloading] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [confirm, setConfirmPassword] = React.useState("");
  const { token } = useParams();
  const history = useHistory();
  const handleSubmit = () => {
    if (confirm !== password) {
      alert("Confirm and password not match");
      return;
    }
    setloading(true);
    axios({
      method: "post",
      url: ROUTES.BASELINK + `/api/auth/resetpassword/${token}`,
      data: {
        password: password,
      },
    })
      .then((res) => {
        if (res.data.success) {
          alert(res.data.message);
          history.push("/login");
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
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
        <h2>Change Your Password</h2>
        <div>
          <input
            type="password"
            placeholder="New Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></input>
          <input
            type="password"
            placeholder="Confirm Password"
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          ></input>
          <Button variant="danger" onClick={handleSubmit}>
            Change
          </Button>
        </div>
      </div>
      <img className="plane1" src="/images/plane.svg" alt="Plane" />
    </div>
  );
}

export default ResetPassword;
