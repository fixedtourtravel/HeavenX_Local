import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";
import { TOKEN_ID } from "../../../../utils/constants";
import * as ROUTES from "../../../../constants/routes";
import paymentimg from "../../../../image/payment.png";
import style from "./Payment.module.css";
import { Input } from "reactstrap";
import { Table } from "react-bootstrap";
import AddBoxIcon from "@mui/icons-material/AddBox";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import PaymentDetails from "./PaymentDetails";

function Payment({
  queryId,
  venderId,
  status,
  isConfirm,
  queryNo,
  finalCost,
  role,
  disabled,
}) {
  const [show, setshow] = useState(false);
  const [disable, setDisable] = useState(false);

  const [payment, setPayment] = useState([
    {
      name: "Payment",
      percent: "",
      dueDate: "",
    },
  ]);
  const headers = {
    "Content-type": "application/json",
    "x-auth-token": `${localStorage.getItem(TOKEN_ID)}`,
  };

  const handleSubmit = async () => {
    if (!isConfirm) {
      alert("Can reqest after Client Confirm");
      return;
    }
    if (!check()) {
      return;
    }
    if (disable) return;

    await axios
      .post(
        ROUTES.BASELINK + "/vendor/requestPayment",
        {
          queryId,
          venderId,
          payment,
        },
        { headers: headers }
      )
      .then((res) => {
        alert(res.data.message);
        if (status) {
          status(res.data.data);
        }
        setshow(false);
      });
  };

  const getPaymentDetails = async () => {
    await axios
      .post(
        ROUTES.BASELINK + "/query/getQuery",
        {
          queryId,
        },
        { headers: headers }
      )
      .then((res) => {
        console.log("yess", res.data.data, res.data.data.payment);
        if (
          res.data.data &&
          res.data.data.payment &&
          res.data.data.payment.length > 0
        ) {
          setPayment(res.data.data.payment);
          if (role !== "admin") {
            setDisable(true);
          }
        }
      });
  };

  const check = () => {
    let x = [...payment];
    console.log(x);
    let per = 0;
    for (let i = 0; i < x.length; i++) {
      if (x[i].percent === "") {
        alert(`Please fill Payment ${i + 1} amount percentage`);
        return false;
      }
      if (parseInt(x[i].percent) < 0) {
        alert(`Payment ${i + 1} amount percentage cannot be negative`);
        return false;
      }
      if (parseInt(per) + parseInt(x[i].percent) > 100) {
        alert(`Payment ${i + 1} amount percentage cannot exceed ${100 - per}`);
        return false;
      }
      if (x[i].dueDate === "") {
        alert(`Please fill Payment ${i + 1} due date`);
        return false;
      }
      if (i > 0 && x[i].dueDate < x[i - 1].dueDate) {
        alert(`Due date of Payment ${i + 1} cannot be before Payment ${i}`);
        return false;
      }
      per = parseInt(per) + parseInt(x[i].percent);
    }
    return true;
  };

  const handleAdd = () => {
    if (!check()) return;
    if (disable) return;
    let x = [...payment];
    x.push({
      name: "Payment",
      percent: "",
      dueDate: "",
    });
    setPayment(x);
  };

  const handleDelete = (index) => {
    if (disable) return;
    let x = [...payment];
    if (x.length === 1) return;
    x.splice(index, 1);
    for (let i = 0; i < x.length; i++) {
      x[i].name = `Payment ${i + 1}`;
    }
    setPayment(x);
  };

  const handleInput = (e, index) => {
    const { name, value } = e.target;
    console.log(name, value);
    let x = [...payment];
    x[index].name = `Payment ${index + 1}`;
    if (name === "percent") {
      x[index].percent = value;
    }
    if (name === "dueDate") {
      x[index].dueDate = value;
    }
    setPayment(x);
  };

  const changeHandler = (data) => {
    if (data) {
      getPaymentDetails();
    }
  };

  useEffect(() => {
    getPaymentDetails();
    if (role === "client") {
      setDisable(true);
    }
  }, []);

  return (
    <>
      {role === "admin" && (
        <button className={style.payment_btn} onClick={() => setshow(true)}>
          Payment Details
        </button>
      )}

      {role !== "admin" && (
        <>
          <p>{role === "client" ? "Payment" : "Payment Request"} </p>
          <img
            src={paymentimg}
            alt="paymentimg"
            class="travel-Logo"
            height="40px"
            onClick={() => {
              if (!disabled) {
                setshow(true);
              }
            }}
          />
        </>
      )}
      <Modal
        show={show}
        onHide={() => setshow(false)}
        centered
        dialogClassName={style.modal}
        backdrop="static"
      >
        <i class="fa fa-times-circle" onClick={() => setshow(false)}></i>
        <div>
          <h2 className={style.modalTitle}>Request Payment</h2>
          <h5>
            Total Payment for OrderId {queryNo} - <strong>{finalCost}</strong>
          </h5>
          <Table bordered responsive="md">
            <thead>
              <tr className={style.trh}>
                <th className={style.th}>Name</th>
                <th className={style.th}>Percent(%)</th>
                <th className={style.th}>Amount</th>
                <th className={style.th}>Due Date</th>
                <th className={style.th}>Status</th>
                <th className={style.th}>Option</th>
              </tr>
            </thead>
            {payment.map((val, i) => {
              return (
                <tbody>
                  <tr className={style.tr}>
                    <td className={style.td}>
                      <Input
                        type="text"
                        value={val.name}
                        name="name"
                        disabled={disable}
                      ></Input>
                    </td>
                    <td className={style.td}>
                      <Input
                        type="number"
                        onChange={(e) => handleInput(e, i)}
                        value={val.percent}
                        name="percent"
                        disabled={disable}
                      />
                    </td>
                    <td className={style.td}>
                      <Input
                        type="number"
                        onChange={(e) => handleInput(e, i)}
                        value={Math.round((finalCost * val.percent) / 100)}
                        name="amount"
                        disabled={disable}
                      />
                    </td>
                    <td className={style.td}>
                      <Input
                        type="date"
                        name="dueDate"
                        onChange={(e) => handleInput(e, i)}
                        value={val.dueDate}
                        disabled={disable}
                      ></Input>
                    </td>
                    <td className={style.td}>
                      <Input
                        type="text"
                        value={val.status === true ? "Approved" : "Pending"}
                        name="status"
                        disabled={disable}
                      />
                    </td>
                    <td className={style.td}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        {role !== "client" && payment.length - 1 === i && (
                          <AddBoxIcon
                            style={{
                              color: "#58e0e0",
                              cursor: "pointer",
                              // marginLeft: "5px",
                              // marginRight: "20px",
                            }}
                            onClick={handleAdd}
                          />
                        )}
                        {role !== "client" && (
                          <IndeterminateCheckBoxIcon
                            style={{
                              color: "#58e0e0",
                              cursor: "pointer",
                              // marginLeft: "5px",
                              // marginRight: "5px",
                            }}
                            onClick={() => handleDelete(i)}
                          />
                        )}
                        {role !== "vender" && (
                          <PaymentDetails
                            role={role}
                            index={i}
                            queryNo={queryNo}
                            payment={payment}
                            changeHandler={changeHandler}
                          />
                        )}
                      </div>
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </Table>

          {role !== "client" && (
            <div className={style.buttons}>
              <Button type="submit" onClick={handleSubmit}>
                Request
              </Button>
              <Button
                type="submit"
                onClick={() => setshow(false)}
                variant="danger"
              >
                Cancel
              </Button>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
}

export default Payment;
