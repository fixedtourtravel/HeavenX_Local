import React, { useState, useEffect } from "react";
import style from "./Home.module.css";
import OrderCard from "../../client/OrderCard/OrderCard";
import * as ROUTES from "../../../constants/routes";
import axios from "axios";
import { TOKEN_ID } from "../../../utils/constants";
import Sort from "./Sort";
import { Tabs, Tab } from "react-bootstrap";
import TablePagination from "@mui/material/TablePagination";

function Home() {
  const [allorders, setAllOrders] = useState([]);
  const [neworders, setNewOrders] = useState([]);
  const [holdorders, setHoldOrders] = useState([]);
  const [clientconfirmorders, setClientConfirmOrders] = useState([]);
  const [venderconfirmorders, setVenderConfirmOrders] = useState([]);
  const [cancelorders, setcancelOrders] = useState([]);
  const [paymentorders, setPaymentOrders] = useState([]);
  const [all1orders, setAll1Orders] = useState([]);
  const [new1orders, setNew1Orders] = useState([]);
  const [hold1orders, setHold1Orders] = useState([]);
  const [clientconfirm1orders, setClientConfirm1Orders] = useState([]);
  const [venderconfirmo1rders, setVenderConfirm1Orders] = useState([]);
  const [cancel1orders, setcancel1Orders] = useState([]);
  const [payment1orders, setPayment1Orders] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState([5, 5, 5, 5, 5, 5, 5]);
  const [page, setPage] = useState([0, 0, 0, 0, 0, 0, 0]);

  const getOrders = () => {
    axios({
      method: "get",
      url: ROUTES.BASELINK + "/admin/getQuery",
      headers: {
        "Content-type": "application/json",
        "x-auth-token": `${localStorage.getItem(TOKEN_ID)}`,
      },
    })
      .then((result) => {
        if (result.data.success) {
          initialValue(result.data.data);
          console.log(result.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const initialValue = (data) => {
    setAllOrders(data);
    setAll1Orders(data);
    let newI = [],
      hold = [],
      confV = [],
      confC = [],
      can = [],
      pay = [];

    for (let i = 0; i < data.length; i++) {
      console.log(i, data[i].client_confirm);
      if (data[i].cancel) {
        can.push(data[i]);
      } else if (data[i].vender_confirm) {
        confV.push(data[i]);
      } else if (data[i].hold) {
        hold.push(data[i]);
      } else if (data[i].newInquery) {
        newI.push(data[i]);
      } else if (data[i].client_confirm) {
        confC.push(data[i]);
      }
    }

    setNewOrders(newI);
    setHoldOrders(hold);
    setClientConfirmOrders(confC);
    setVenderConfirmOrders(confV);
    setcancelOrders(can);
    setNew1Orders(newI);
    setHold1Orders(hold);
    setClientConfirm1Orders(confC);
    setVenderConfirm1Orders(confV);
    setcancel1Orders(can);
  };

  const handleChangePage = (event, newPage, i) => {
    let x = [...page];
    console.log(x);
    x[i] = newPage;
    console.log(x);
    setPage(x);
  };

  const handleChangeRowsPerPage = (event, i) => {
    let x = [...rowsPerPage];
    x[i] = event.target.value;
    setRowsPerPage(x);
    setPage([0, 0, 0, 0, 0, 0, 0]);
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className={style.home}>
      <Tabs
        defaultActiveKey="allInquery"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="allInquery" title="All Inquery">
          <Sort data={allorders} dataFunction={setAll1Orders} />
          {all1orders
            .slice(
              page[0] * rowsPerPage[0],
              page[0] * rowsPerPage[0] + rowsPerPage[0]
            )
            .map((order, i) => (
              <OrderCard order={order} index={i + 1} />
            ))}
          <TablePagination
            rowsPerPageOptions={[1, 2, 5, 10, 15, 25, 50, 100]}
            component="div"
            count={all1orders.length}
            rowsPerPage={rowsPerPage[0]}
            page={page[0]}
            onPageChange={(event, newPage) =>
              handleChangePage(event, newPage, 0)
            }
            onRowsPerPageChange={(event, newPage) =>
              handleChangeRowsPerPage(event, 0)
            }
          />
        </Tab>
        <Tab eventKey="newInquery" title="New Inquery">
          <Sort data={neworders} dataFunction={setNew1Orders} />
          {new1orders
            .slice(
              page[1] * rowsPerPage[1],
              page[1] * rowsPerPage[1] + rowsPerPage[1]
            )
            .map((order, i) => (
              <OrderCard order={order} index={i + 1} />
            ))}
          <TablePagination
            rowsPerPageOptions={[1, 2, 5, 10, 15, 25, 50, 100]}
            component="div"
            count={new1orders.length}
            rowsPerPage={rowsPerPage[1]}
            page={page[1]}
            onPageChange={(event, newPage) =>
              handleChangePage(event, newPage, 1)
            }
            onRowsPerPageChange={(event, newPage) =>
              handleChangeRowsPerPage(event, 1)
            }
          />
        </Tab>
        <Tab eventKey="hold" title="On Hold">
          <Sort data={holdorders} dataFunction={setHold1Orders} />
          {hold1orders
            .slice(
              page[2] * rowsPerPage[2],
              page[2] * rowsPerPage[2] + rowsPerPage[2]
            )
            .map((order, i) => (
              <OrderCard order={order} index={i + 1} />
            ))}
          <TablePagination
            rowsPerPageOptions={[1, 2, 5, 10, 15, 25, 50, 100]}
            component="div"
            count={hold1orders.length}
            rowsPerPage={rowsPerPage[2]}
            page={page[2]}
            onPageChange={(event, newPage) =>
              handleChangePage(event, newPage, 2)
            }
            onRowsPerPageChange={(event, newPage) =>
              handleChangeRowsPerPage(event, 2)
            }
          />
        </Tab>
        <Tab eventKey="cancel" title="Cancel">
          <Sort data={cancelorders} dataFunction={setcancel1Orders} />
          {cancel1orders
            .slice(
              page[3] * rowsPerPage[3],
              page[3] * rowsPerPage[3] + rowsPerPage[3]
            )
            .map((order, i) => (
              <OrderCard order={order} index={i + 1} />
            ))}
          <TablePagination
            rowsPerPageOptions={[1, 2, 5, 10, 15, 25, 50, 100]}
            component="div"
            count={cancel1orders.length}
            rowsPerPage={rowsPerPage[3]}
            page={page[3]}
            onPageChange={(event, newPage) =>
              handleChangePage(event, newPage, 3)
            }
            onRowsPerPageChange={(event, newPage) =>
              handleChangeRowsPerPage(event, 3)
            }
          />
        </Tab>
        <Tab eventKey="Client confirm" title="Client Confirm">
          <Sort
            data={clientconfirmorders}
            dataFunction={setClientConfirm1Orders}
          />
          {clientconfirm1orders
            .slice(
              page[4] * rowsPerPage[4],
              page[4] * rowsPerPage[4] + rowsPerPage[4]
            )
            .map((order, i) => (
              <OrderCard order={order} index={i + 1} />
            ))}
          <TablePagination
            rowsPerPageOptions={[1, 2, 5, 10, 15, 25, 50, 100]}
            component="div"
            count={clientconfirm1orders.length}
            rowsPerPage={rowsPerPage[4]}
            page={page[4]}
            onPageChange={(event, newPage) =>
              handleChangePage(event, newPage, 4)
            }
            onRowsPerPageChange={(event, newPage) =>
              handleChangeRowsPerPage(event, 4)
            }
          />
        </Tab>
        <Tab eventKey="Vender confirm" title="Vender Confirm">
          <Sort
            data={venderconfirmorders}
            dataFunction={setVenderConfirm1Orders}
          />
          {venderconfirmo1rders
            .slice(
              page[5] * rowsPerPage[5],
              page[5] * rowsPerPage[5] + rowsPerPage[5]
            )
            .map((order, i) => (
              <OrderCard order={order} index={i + 1} />
            ))}
          <TablePagination
            rowsPerPageOptions={[1, 2, 5, 10, 15, 25, 50, 100]}
            component="div"
            count={venderconfirmo1rders.length}
            rowsPerPage={rowsPerPage[5]}
            page={page[5]}
            onPageChange={(event, newPage) =>
              handleChangePage(event, newPage, 5)
            }
            onRowsPerPageChange={(event, newPage) =>
              handleChangeRowsPerPage(event, 5)
            }
          />
        </Tab>
        <Tab eventKey="payment" title="Payment Due">
          <Sort data={paymentorders} dataFunction={setPayment1Orders} />
          {payment1orders
            .slice(
              page[6] * rowsPerPage[6],
              page[6] * rowsPerPage[6] + rowsPerPage[6]
            )
            .map((order, i) => (
              <OrderCard order={order} index={i + 1} />
            ))}
          <TablePagination
            rowsPerPageOptions={[1, 2, 5, 10, 15, 25, 50, 100]}
            component="div"
            count={payment1orders.length}
            rowsPerPage={rowsPerPage[6]}
            page={page[6]}
            onPageChange={(event, newPage) =>
              handleChangePage(event, newPage, 6)
            }
            onRowsPerPageChange={(event, newPage) =>
              handleChangeRowsPerPage(event, 6)
            }
          />
        </Tab>
      </Tabs>
    </div>
  );
}

export default Home;
