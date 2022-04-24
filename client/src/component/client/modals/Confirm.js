import React from "react";
import { Button, Modal } from "react-bootstrap";
import CancelIcon from "@mui/icons-material/Cancel";
import axios from "axios";
import * as ROUTES from "../../../constants/routes";

function Confirm({ vendorId, queryId, disable, confirm, role }) {
  const [openConfirm, setOpenConfirm] = React.useState(false);
  const handleConfirm = async () => {
    if (role === "client") {
      await axios({
        method: "post",
        url: ROUTES.BASELINK + "/vendor/quotation/clientConfirm",
        data: {
          vendorId: vendorId,
          queryId: queryId,
        },
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((res) => {
          alert(res.data.message);
          setOpenConfirm(false);
        })
        .catch((err) => {
          console.log("error in fetching quries", err);
        });
    }
    
  };
  return (
    <>
      <img
        src="/images/image8.svg"
        alt="4"
        class="travel-Logo"
        height="30px"
        onClick={() => {
          if (!disable) {
            setOpenConfirm(true);
          } else {
            alert("You have confirmed other order can not use");
          }
        }}
      />

      <Modal
        show={openConfirm}
        onHide={() => setOpenConfirm(false)}
        centered
        backdrop="static"
      >
        <CancelIcon
          style={{
            position: "absolute",
            left: "95%",
            top: "2%",
            cursor: "pointer",
          }}
          onClick={() => setOpenConfirm(false)}
        />
        {!confirm && (
          <div style={{ padding: "20px" }}>
            <h6>
              Only one quotation can be confirmed.
              <br /> Do you want to proceed ?
            </h6>
            <Button onClick={() => handleConfirm()} style={{ marginLeft: "0" }}>
              Proceed
            </Button>
            <Button onClick={() => setOpenConfirm(false)} variant="danger">
              Cancel
            </Button>
          </div>
        )}
        {confirm && (
          <div style={{ padding: "20px" }}>
            <h6>You have already confirmed.</h6>
            <Button
              onClick={() => setOpenConfirm(false)}
              style={{ marginLeft: "0" }}
              variant="danger"
            >
              Back
            </Button>
          </div>
        )}
      </Modal>
    </>
  );
}

export default Confirm;
