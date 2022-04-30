import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import * as ROUTES from "../constants/routes";
import Loading from "./Loading";

function VerifyEmail() {
  const [loading, setloading] = React.useState(false);
  const { token } = useParams();

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

  useEffect(() => {
    handleVerify();
  }, []);

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
    </div>
  );
}

export default VerifyEmail;
