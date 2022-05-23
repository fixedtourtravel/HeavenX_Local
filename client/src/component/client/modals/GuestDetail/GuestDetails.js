import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../../../context/AuthContext";
import AddBoxIcon from "@mui/icons-material/AddBox";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import { Table } from "react-bootstrap";
import style from "./GuestDetails.module.css";
import Loading from "../../../../pages/Loading";
import * as ROUTES from "../../../../constants/routes";
import { Modal, Button } from "react-bootstrap";
import CancelIcon from "@mui/icons-material/Cancel";
import guest from "../../../../image/guests.png";

function GuestDetails({ queryId, vendorId, disable, buttonRole }) {
  const auth = useAuth();
  const [openGuest, setOpenGuest] = useState(false);
  const [flightcheckBox, setFlightcheckBox] = useState(true);
  const [traincheckBox, setTraincheckBox] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isFill, setisFill] = useState(false);
  const [openConfirm, setOpenConfirm] = React.useState(false);

  const [guestDetails, setguestDetails] = useState([
    {
      title: "",
      firstName: "",
      lastName: "",
      DOB: "",
      gender: "",
      panCard: "",
      aadharCard: "",
      passportNumber: "",
      passportIssue: "",
      passportExpiry: "",
    },
  ]);

  const [flightDetails, setflightDetails] = useState([
    {
      date: "",
      airline: "",
      no: "",
      departure: "",
      departure_hh: "",
      departure_mm: "",
      arrival: "",
      arrival_hh: "",
      arrival_mm: "",
    },
  ]);
  const [trainDetails, settrainDetails] = useState([
    {
      date: "",
      train: "",
      no: "",
      departure: "",
      departure_hh: "",
      departure_mm: "",
      arrival: "",
      arrival_hh: "",
      arrival_mm: "",
    },
  ]);
  const getDetails = async () => {
    setLoading(true);
    await axios
      .post(ROUTES.BASELINK + "/guest/getDetails", { queryId: queryId })
      .then((res) => {
        console.log(res.data);
        if (res.data.success) {
          initialValue(res.data.data);
        }
      })
      .catch((err) => {
        alert("Some Internal Error");
        console.log(err);
      });
    setLoading(false);
  };

  const handleSubmit = async () => {
    let list = [...guestDetails];
    for (let i = 0; i < list.length; i++) {
      if (checkGuest(i)) {
        setOpenConfirm(false);
        return;
      }
    }
    if (isFill) {
      alert("Already filled can't modify");
      setOpenConfirm(false);
      return;
    }
    if (auth.user) {
      setLoading(true);
      await axios
        .post(ROUTES.BASELINK + `/guest/saveDetails`, {
          vendorId: vendorId,
          details: {
            queryId: queryId,
            guestDetails: guestDetails,
            trainDetails: trainDetails,
            flightDetails: flightDetails,
            isFill: true,
          },
        })
        .then((res) => {
          alert("Guest details filled successfully");
          if (res.data.success) {
            initialValue(res.data.data);
          }
        })
        .catch((err) => {
          alert("Server not responding Please try later");
          console.log(err);
        });
      setOpenConfirm(false);
      setLoading(false);
    }
  };

  const initialValue = (data) => {
    setguestDetails(data.guestDetails);
    setflightDetails(data.flightDetails);
    settrainDetails(data.trainDetails);
    setisFill(data.isFill);
  };

  const handleGuest = (e, i) => {
    const { name, value } = e.target;
    console.log(name, value);
    const list = [...guestDetails];
    list[i][name] = value;
    setguestDetails(list);
  };

  const handleguestAdd = () => {
    if(isFill){
      alert("Please visit support");
      return;
    }
    const list = [...guestDetails];
    const i = list.length - 1;
    if (checkGuest(i)) {
      return;
    }

    list.push({
      title: "",
      firstName: "",
      lastName: "",
      DOB: "",
      gender: "",
      panCard: "",
      aadharCard: "",
      passportNumber: "",
      passportIssue: "",
      passportExpiry: "",
    });
    setguestDetails(list);
  };

  const handleguestDelete = () => {
    if(isFill){
      alert("Please visit support");
      return;
    }
    const list = [...guestDetails];
    const i = list.length - 1;
    if (list.length === 1) {
      return;
    }
    list.splice(i, 1);
    setguestDetails(list);
  };

  const checkGuest = (i) => {
    const list = [...guestDetails];

    if (list[i].title === "") {
      alert("Please fill title");
      return true;
    }
    if (list[i].firstName === "") {
      alert("Please fill firstName");
      return true;
    }
    if (list[i].lastName === "") {
      alert("Please fill lastName");
      return true;
    }
    if (list[i].DOB === "") {
      alert("Please fill DOB");
      return true;
    }
    if (list[i].gender === "") {
      alert("Please fill gender");
      return true;
    }
    // if (list[i].panCard === "") {
    //   alert("Please fill panCard");
    //   return true;
    // }
    // if (list[i].aadharCard === "") {
    //   alert("Please fill aadharCard");
    //   return true;
    // }
    // if (list[i].passportNumber === "") {
    //   alert("Please fill passportNumber");
    //   return true;
    // }
    // if (list[i].passportIssue === "") {
    //   alert("Please fill passportIssue");
    //   return true;
    // }
    // if (list[i].passportExpiry === "") {
    //   alert("Please fill passportExpiry");
    //   return true;
    // }
    return false;
  };

  const handleCheckBox = (e, x) => {
    x(e.target.checked);
  };

  const handleFlight = (e, i) => {
    if(isFill){
      alert("Please visit support");
      return;
    }
    const { name, value } = e.target;
    const list = [...flightDetails];
    list[i][name] = value;
    console.log(list);
    setflightDetails(list);
  };

  const handleFlightAdd = () => {
    if(isFill){
      alert("Please visit support");
      return;
    }
    const list = [...flightDetails];
    const i = list.length - 1;
    if (checkFlight(i)) {
      return;
    }
    list.push({
      date: "",
      airline: "",
      no: "",
      departure: "",
      departure_hh: "",
      departure_mm: "",
      arrival: "",
      arrival_hh: "",
      arrival_mm: "",
    });
    setflightDetails(list);
  };

  const handleFlightDelete = (i) => {
    if(isFill){
      alert("Please visit support");
      return;
    }
    const list = [...flightDetails];
    if (list.length === 1) {
      return;
    }
    list.splice(i, 1);
    setflightDetails(list);
  };

  const checkFlight = (i) => {
    const list = [...flightDetails];
    if (list[i].date === "") {
      alert("Please fill date");
      return true;
    }
    if (list[i].airline === "") {
      alert("Please fill airline");
      return true;
    }
    if (list[i].no === "") {
      alert("Please fill no");
      return true;
    }
    if (list[i].departure === "") {
      alert("Please fill departure");
      return true;
    }
    if (list[i].departure_hh === "") {
      alert("Please fill departure hour");
      return true;
    }
    if (list[i].departure_mm === "") {
      alert("Please fill departure min");
      return true;
    }
    if (list[i].arrival === "") {
      alert("Please fill arrival");
      return true;
    }
    if (list[i].arrival_hh === "") {
      alert("Please fill arrival hour");
      return true;
    }
    if (list[i].arrival_mm === "") {
      alert("Please fill arrival min");
      return true;
    }
    return false;
  };

  const handleTrain = (e, i) => {
    if(isFill){
      alert("Please visit support");
      return;
    }
    const { name, value } = e.target;
    const list = [...trainDetails];
    list[i][name] = value;
    settrainDetails(list);
  };

  const handleTrainAdd = () => {
    if(isFill){
      alert("Please visit support");
      return;
    }
    const list = [...flightDetails];
    const i = list.length - 1;
    if (checkTrain(i)) {
      return;
    }
    list.push({
      date: "",
      airline: "",
      no: "",
      departure: "",
      departure_hh: "",
      departure_mm: "",
      arrival: "",
      arrival_hh: "",
      arrival_mm: "",
    });
    setflightDetails(list);
  };

  const handleTrainDelete = (i) => {
    if(isFill){
      alert("Please visit support");
      return;
    }
    const list = [...trainDetails];
    if (list.length === 1) {
      return;
    }
    list.splice(i, 1);
    settrainDetails(list);
  };

  const checkTrain = (i) => {
    const list = [...trainDetails];
    if (list[i].date === "") {
      alert("Please fill date");
      return true;
    }
    if (list[i].train === "") {
      alert("Please fill airline");
      return true;
    }
    if (list[i].no === "") {
      alert("Please fill no");
      return true;
    }
    if (list[i].departure === "") {
      alert("Please fill departure");
      return true;
    }
    if (list[i].departure_hh === "") {
      alert("Please fill departure hour");
      return true;
    }
    if (list[i].departure_mm === "") {
      alert("Please fill departure min");
      return true;
    }
    if (list[i].arrival === "") {
      alert("Please fill arrival");
      return true;
    }
    if (list[i].arrival_hh === "") {
      alert("Please fill arrival hour");
      return true;
    }
    if (list[i].arrival_mm === "") {
      alert("Please fill arrival min");
      return true;
    }
    return false;
  };

  const buttonHandler = () => {
    if (auth.user.role === "client") {
      if (!disable) {
        setOpenGuest(true);
      } else {
        alert("You have confirmed other order can not use");
      }
    } else if (auth.user.role === "admin") {
      if (buttonRole === "client") {
        if (!disable) {
          setOpenGuest(true);
        } else {
          alert("You have confirmed other order can not use");
        }
      } else {
        if (!disable) {
          setOpenGuest(true);
        } else {
          alert("Guest Details Not Found");
        }
      }
    } else {
      if (disable) {
        setOpenGuest(true);
      } else {
        alert("Guest Details Not Found");
      }
    }
  };

  useEffect(() => {
    getDetails();
  }, []);

  return (
    <>
      {/* <p>Guest Payment</p> */}
      <img
        src={guest}
        alt="3"
        class="travel-Logo"
        height={auth.user.role === "client" ? "30px" : "40px"}
        onClick={() => {
          buttonHandler();
        }}
      />
      <Modal
        show={openGuest}
        onHide={() => setOpenGuest(false)}
        centered
        dialogClassName="mymodal"
        backdrop="static"
      >
        <CancelIcon
          style={{
            position: "absolute",
            left: "97%",
            top: "2%",
            cursor: "pointer",
          }}
          onClick={() => setOpenGuest(false)}
        />
        <div className={style.home}>
          <Loading Loading={loading} />
          <p>Guest Details</p>
          {guestDetails.map((data, i) => {
            return (
              <div className={style.row1}>
                <div>
                  <label>Title</label>
                  <select
                    name="title"
                    onChange={(e) => handleGuest(e, i)}
                    id="title"
                    disabled={auth.user.role !== "client" || isFill}
                  >
                    <option selected disabled hidden>
                      Choose
                    </option>
                    <option value="Mr" selected={data.title === "Mr"}>
                      Mr
                    </option>
                    <option value="Mrs" selected={data.title === "Mrs"}>
                      Mrs
                    </option>
                    <option value="Miss" selected={data.title === "Miss"}>
                      Miss
                    </option>
                  </select>
                </div>
                <div>
                  <label>First Name</label>
                  <input
                    readOnly={auth.user.role !== "client" || isFill}
                    onChange={(e) => handleGuest(e, i)}
                    type="text"
                    name="firstName"
                    value={data.firstName}
                  ></input>
                </div>
                <div>
                  <label>Last Name</label>
                  <input
                    readOnly={auth.user.role !== "client" || isFill}
                    onChange={(e) => handleGuest(e, i)}
                    type="text"
                    name="lastName"
                    value={data.lastName}
                  ></input>
                </div>
                <div>
                  <label>DOB</label>
                  <input
                    readOnly={auth.user.role !== "client" || isFill}
                    onChange={(e) => handleGuest(e, i)}
                    type="date"
                    name="DOB"
                    value={data.DOB}
                  ></input>
                </div>
                <div>
                  <label>Gender</label>
                  <select
                    onChange={(e) => handleGuest(e, i)}
                    name="gender"
                    id="gender"
                    disabled={auth.user.role !== "client" || isFill}
                  >
                    <option selected disabled hidden>
                      Choose
                    </option>
                    <option value="Male" selected={data.gender === "Male"}>
                      Male
                    </option>
                    <option value="Female" selected={data.gender === "Female"}>
                      Female
                    </option>
                    <option value="Other" selected={data.gender === "Other"}>
                      Other
                    </option>
                  </select>
                </div>
                <div>
                  <label>Pan Card</label>
                  <input
                    readOnly={auth.user.role !== "client" || isFill}
                    onChange={(e) => handleGuest(e, i)}
                    type="text"
                    name="panCard"
                    value={data.panCard}
                  ></input>
                </div>
                <div>
                  <label>Aadhar Card</label>
                  <input
                    readOnly={auth.user.role !== "client" || isFill}
                    onChange={(e) => handleGuest(e, i)}
                    type="text"
                    name="aadharCard"
                    value={data.aadharCard}
                  ></input>
                </div>
                <div>
                  <label>Passport Number</label>
                  <input
                    readOnly={auth.user.role !== "client" || isFill}
                    onChange={(e) => handleGuest(e, i)}
                    type="text"
                    name="passportNumber"
                    value={data.passportNumber}
                  ></input>
                </div>
                <div>
                  <label>Passport Issue</label>
                  <input
                    readOnly={auth.user.role !== "client" || isFill}
                    onChange={(e) => handleGuest(e, i)}
                    type="date"
                    name="passportIssue"
                    value={data.passportIssue}
                  ></input>
                </div>
                <div>
                  <label>Passport Expiry Date</label>
                  <input
                    readOnly={auth.user.role !== "client" || isFill}
                    onChange={(e) => handleGuest(e, i)}
                    type="date"
                    name="passportExpiry"
                    value={data.passportExpiry}
                  ></input>
                </div>
              </div>
            );
          })}
          <div className={style.row2}>
            {auth.user.role === "client" && (
              <div className={style.row2Ele}>
                <AddBoxIcon
                  style={{ color: "orange", cursor: "pointer" }}
                  onClick={handleguestAdd}
                />
                <div>Add Guest</div>
                <IndeterminateCheckBoxIcon
                  style={{ color: "orange", cursor: "pointer" }}
                  onClick={handleguestDelete}
                />
              </div>
            )}
          </div>
          <div className={style.row3}>
            <div>Flight Details</div>
            <input
              readOnly={auth.user.role !== "client" || isFill}
              type="checkbox"
              id="flight"
              name="flight"
              value="flight"
              checked={flightcheckBox}
              onChange={(e) => handleCheckBox(e, setFlightcheckBox)}
            />
            <div>Train Details</div>
            <input
              readOnly={auth.user.role !== "client" || isFill}
              type="checkbox"
              id="train"
              name="train"
              value="train"
              checked={traincheckBox}
              onChange={(e) => handleCheckBox(e, setTraincheckBox)}
            />
          </div>
          {flightcheckBox && (
            <div className={style.flight}>
              <div className={style.name}>Flight Details</div>
              <Table bordered responsive="md">
                <thead>
                  <tr className={style.trh}>
                    <th className={style.th}>Date</th>
                    <th className={style.th}>Airlines</th>
                    <th className={style.th}>Flight No.</th>
                    <th className={style.th}>Departure </th>
                    <th className={style.th}>Time(hh)</th>
                    <th className={style.th}>Time(mm)</th>
                    <th className={style.th}>Arrival</th>
                    <th className={style.th}>Time(hh)</th>
                    <th className={style.th}>Time(mm)</th>
                    {auth.user.role === "client" && (
                      <th className={style.th}></th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {flightDetails.map((data, i) => {
                    return (
                      <tr className={style.tr}>
                        <td className={`${style.td} ${style.tdinput}`}>
                          <input
                            readOnly={auth.user.role !== "client" || isFill}
                            type="date"
                            name="date"
                            value={data.date}
                            onChange={(e) => handleFlight(e, i)}
                          ></input>
                        </td>
                        <td className={style.td}>
                          <input
                            readOnly={auth.user.role !== "client" || isFill}
                            type="text"
                            name="airline"
                            value={data.airline}
                            onChange={(e) => handleFlight(e, i)}
                          ></input>
                        </td>
                        <td className={style.td}>
                          <input
                            readOnly={auth.user.role !== "client" || isFill}
                            type="text"
                            name="no"
                            value={data.no}
                            onChange={(e) => handleFlight(e, i)}
                          ></input>
                        </td>
                        <td className={style.td}>
                          <input
                            readOnly={auth.user.role !== "client" || isFill}
                            type="text"
                            name="departure"
                            value={data.departure}
                            onChange={(e) => handleFlight(e, i)}
                          ></input>
                        </td>
                        <td className={style.td}>
                          <input
                            readOnly={auth.user.role !== "client" || isFill}
                            type="number"
                            name="departure_hh"
                            value={data.departure_hh}
                            onChange={(e) => handleFlight(e, i)}
                          ></input>
                        </td>
                        <td className={style.td}>
                          <input
                            readOnly={auth.user.role !== "client" || isFill}
                            type="number"
                            name="departure_mm"
                            value={data.departure_mm}
                            onChange={(e) => handleFlight(e, i)}
                          ></input>
                        </td>
                        <td className={style.td}>
                          <input
                            readOnly={auth.user.role !== "client" || isFill}
                            type="text"
                            name="arrival"
                            value={data.arrival}
                            onChange={(e) => handleFlight(e, i)}
                          ></input>
                        </td>
                        <td className={style.td}>
                          <input
                            readOnly={auth.user.role !== "client" || isFill}
                            type="number"
                            name="arrival_hh"
                            value={data.arrival_hh}
                            onChange={(e) => handleFlight(e, i)}
                          ></input>
                        </td>
                        <td className={style.td}>
                          <input
                            readOnly={auth.user.role !== "client" || isFill}
                            type="number"
                            name="arrival_mm"
                            value={data.arrival_mm}
                            onChange={(e) => handleFlight(e, i)}
                          ></input>
                        </td>
                        {auth.user.role === "client" && (
                          <td className={style.td}>
                            {i === flightDetails.length - 1 && (
                              <AddBoxIcon
                                style={{
                                  color: "orange",
                                  cursor: "pointer",
                                }}
                                onClick={handleFlightAdd}
                              />
                            )}
                            <IndeterminateCheckBoxIcon
                              style={{ color: "orange", cursor: "pointer" }}
                              onClick={handleFlightDelete}
                            />
                          </td>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          )}
          {traincheckBox && (
            <div className={style.train}>
              <div className={style.name}>Train Details</div>
              <Table bordered responsive="md">
                <thead>
                  <tr className={style.trh}>
                    <th className={style.th}>Date</th>
                    <th className={style.th}>Train</th>
                    <th className={style.th}>Train No.</th>
                    <th className={style.th}>Departure </th>
                    <th className={style.th}>Time(hh)</th>
                    <th className={style.th}>Time(mm)</th>
                    <th className={style.th}>Arrival</th>
                    <th className={style.th}>Time(hh)</th>
                    <th className={style.th}>Time(mm)</th>
                    <th className={style.th}></th>
                  </tr>
                </thead>
                <tbody>
                  {trainDetails.map((data, i) => {
                    return (
                      <tr className={style.tr}>
                        <td className={`${style.td} ${style.tdinput}`}>
                          <input
                            readOnly={auth.user.role !== "client" || isFill}
                            type="date"
                            name="date"
                            value={data.date}
                            onChange={(e) => handleTrain(e, i)}
                          ></input>
                        </td>
                        <td className={style.td}>
                          <input
                            readOnly={auth.user.role !== "client" || isFill}
                            type="text"
                            name="train"
                            value={data.train}
                            onChange={(e) => handleTrain(e, i)}
                          ></input>
                        </td>
                        <td className={style.td}>
                          <input
                            readOnly={auth.user.role !== "client" || isFill}
                            type="text"
                            name="no"
                            value={data.no}
                            onChange={(e) => handleTrain(e, i)}
                          ></input>
                        </td>
                        <td className={style.td}>
                          <input
                            readOnly={auth.user.role !== "client" || isFill}
                            type="text"
                            name="departure"
                            value={data.departure}
                            onChange={(e) => handleTrain(e, i)}
                          ></input>
                        </td>
                        <td className={style.td}>
                          <input
                            readOnly={auth.user.role !== "client" || isFill}
                            type="number"
                            name="departure_hh"
                            value={data.departure_hh}
                            onChange={(e) => handleTrain(e, i)}
                          ></input>
                        </td>
                        <td className={style.td}>
                          <input
                            readOnly={auth.user.role !== "client" || isFill}
                            type="number"
                            name="departure_mm"
                            value={data.departure_mm}
                            onChange={(e) => handleTrain(e, i)}
                          ></input>
                        </td>
                        <td className={style.td}>
                          <input
                            readOnly={auth.user.role !== "client" || isFill}
                            type="text"
                            name="arrival"
                            value={data.arrival}
                            onChange={(e) => handleTrain(e, i)}
                          ></input>
                        </td>
                        <td className={style.td}>
                          <input
                            readOnly={auth.user.role !== "client" || isFill}
                            type="number"
                            name="arrival_hh"
                            value={data.arrival_hh}
                            onChange={(e) => handleTrain(e, i)}
                          ></input>
                        </td>
                        <td className={style.td}>
                          <input
                            readOnly={auth.user.role !== "client" || isFill}
                            type="number"
                            name="arrival_mm"
                            value={data.arrival_mm}
                            onChange={(e) => handleTrain(e, i)}
                          ></input>
                        </td>
                        <td className={style.td}>
                          {i === trainDetails.length - 1 && (
                            <AddBoxIcon
                              style={{
                                color: "orange",
                                cursor: "pointer",
                              }}
                              onClick={handleTrainAdd}
                            />
                          )}
                          <IndeterminateCheckBoxIcon
                            style={{ color: "orange", cursor: "pointer" }}
                            onClick={handleTrainDelete}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          )}
          {auth.user.role === "client" && (
            <button
              style={{
                backgroundColor: "orange",
                borderRadius: "0.25rem",
                marginTop: "1rem",
                marginLeft: "50%",
                color: "white",
              }}
              onClick={() => setOpenConfirm(true)}
            >
              Save
            </button>
          )}
        </div>
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

          <div style={{ padding: "20px" }}>
            <h6>
              You can save details only one time.
              <br /> Do you want to proceed ?
            </h6>
            <Button onClick={() => handleSubmit()} style={{ marginLeft: "0" }}>
              Proceed
            </Button>
            <Button onClick={() => setOpenConfirm(false)} variant="danger">
              Cancel
            </Button>
          </div>
        </Modal>
      </Modal>
    </>
  );
}

export default GuestDetails;
