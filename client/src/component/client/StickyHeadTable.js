import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import GuestDetails from "./modals/GuestDetail/GuestDetails";
import { Link } from "react-router-dom";
import "../../styles/home.css";
import Confirm from "./modals/Confirm";
import Cancel from "./modals/Cancel/Cancel";
import CancelVender from "../Vendor/model/Cancel/Cancel";
import Help from "./modals/Help&support/Help";
import invoice from "../../image/invoice.png";
import voucher from "../../image/voucher.png";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import guest1 from "../../image/guest-list.svg";
import axios from "axios";
import { TOKEN_ID } from "../../utils/constants";
import * as ROUTES from "../../constants/routes";
import Hold from "../Vendor/model/Hold/Hold";
import Payment from "../Vendor/model/payment/Payment";

const columns = [
  { id: "vendorCode", label: "Vender Id", minWidth: 100, align: "center" },
  { id: "time", label: "Time", minWidth: 100, align: "center" },
  {
    id: "name",
    label: "Name",
    minWidth: 100,
    align: "center",
  },
  {
    id: "price",
    label: "Price",
    minWidth: 100,
    align: "center",
  },
  {
    id: "status",
    label: "Status",
    minWidth: 100,
    align: "center",
  },
];

export default function StickyHeadTable({ data, order }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = useState([]);
  const [confirmIndex, setconfirmIndex] = useState(-1);
  const [confirm, setconfirm] = useState(false);

  const auth = useAuth();

  function createData(
    vendorCode,
    time,
    name,
    price,
    status,
    queryId,
    queryNo,
    isConfirm,
    venderPrice,
    venderId
  ) {
    return {
      vendorCode,
      time,
      name,
      price,
      status,
      queryId,
      queryNo,
      isConfirm,
      venderPrice,
      venderId,
    };
  }

  const createRow = () => {
    let ans = [];
    for (let i = 0; i < data.length; i++) {
      const s = data[i].clientStatus;
      let conf = false;
      for (let j = 0; j < s.length; j++) {
        if (s[j] === "Waiting for vendor confirmation") {
          setconfirmIndex(i);
          setconfirm(true);
          conf = true;
          break;
        }
      }
      let date = `${data[i].createdAt.substring(0, 10)} ( ${data[
        i
      ].createdAt.substring(11, 19)} )`;

      ans.push(
        createData(
          data[i].vendorCode,
          date,
          "vendor",
          data[i].CostDetail.ClientfinalCost,
          data[i].clientStatus[data[i].clientStatus.length - 1],
          data[i].queryId,
          data[i].queryNo,
          conf,
          data[i].CostDetail.finalCost,
          data[i].vendorId
        )
      );
    }
    console.log(ans);
    setRows(ans);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleGuest = async (queryId, venderId) => {
    // if (reqGuest) {
    //   alert("Already asked for Details");
    //   return;
    // }
    // if (!isConfirm) {
    //   alert("Can request guest details, once client confirms");
    //   return;
    // }

    const headers = {
      "Content-type": "application/json",
      "x-auth-token": `${localStorage.getItem(TOKEN_ID)}`,
    };
    await axios
      .post(
        ROUTES.BASELINK + "/vendor/guestRequest",
        {
          queryId: queryId,
          vendorId: venderId,
        },
        { headers: headers }
      )
      .then((res) => {
        alert(res.data.message);
      });
  };

  useEffect(() => {
    createRow();
  }, []);

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    backgroundColor: "green",
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
              <TableCell
                align="center"
                style={{
                  minWidth: "20%",
                  backgroundColor: "green",
                }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, i) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                    <TableCell
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                      }}
                    >
                      {auth.user.role === "admin" && (
                        <TableRow
                          align="center"
                          style={{
                            borderRight: "1px solid black",
                            minHeight: "fit-content",
                            padding: "10px",
                          }}
                        >
                          Client
                        </TableRow>
                      )}
                      <span className="iconV iconV2">
                        <p>View Reply</p>
                        <Link
                          to={`/reply/client/${row.queryId}/${row.venderId}`}
                          target="_blank"
                        >
                          <img
                            src="/images/image4.svg"
                            alt="1"
                            class="travel-Logo"
                            height="30px"
                          />
                        </Link>
                      </span>
                      <span className="iconV iconV2">
                        <p>Guest Details</p>
                        <GuestDetails
                          queryId={row.queryId}
                          vendorId={row.venderId}
                          disable={confirmIndex !== -1 && confirmIndex !== i}
                          buttonRole="client"
                        />
                      </span>
                      <span className="iconV iconV3">
                        <p>Confirm</p>
                        <Confirm
                          queryId={row.queryId}
                          vendorId={row.venderId}
                          disable={confirmIndex !== -1 && confirmIndex !== i}
                          confirm={confirm}
                          role="client"
                        />
                      </span>
                      <span className="iconV iconV4">
                        <Payment
                          queryId={row.queryId}
                          venderId={row.venderId}
                          role="client"
                          queryNo={row.queryNo}
                          finalCost={row.price}
                          disabled={confirmIndex !== -1 && confirmIndex !== i}
                        />
                      </span>
                      <Cancel
                        queryId={row.queryId}
                        vendorId={row.venderId}
                        queryNo={order.queryNo}
                        disable={confirmIndex !== -1 && confirmIndex !== i}
                      />
                      <NavLink
                        to={`/voucher/${row.queryId}/${row.venderId}`}
                        target="_blank"
                        style={{ textDecoration: "none" }}
                        className="iconV iconV4"
                        onClick={(e) => {
                          if (confirmIndex !== -1 && confirmIndex !== i) {
                            alert(
                              "You have confirmed other order, can not use this option"
                            );
                            e.preventDefault();
                          }
                        }}
                      >
                        <p>Voucher</p>
                        <img
                          src={voucher}
                          alt="7"
                          class="travel-Logo"
                          height="30px"
                        />
                      </NavLink>
                      <NavLink
                        to={`/invoice/client/${row.queryId}/${row.venderId}`}
                        target="_blank"
                        className="iconV iconV3"
                        onClick={(e) => {
                          if (confirmIndex !== -1 && confirmIndex !== i) {
                            alert(
                              "You have confirmed other order, can not use this option"
                            );
                            e.preventDefault();
                          }
                        }}
                      >
                        <p>Invoice</p>
                        <img
                          src={invoice}
                          alt="invoice"
                          class="travel-Logo"
                          height="30px"
                        />
                      </NavLink>
                      <Help
                        queryNo={order.queryNo}
                        disable={confirmIndex !== -1 && confirmIndex !== i}
                      />
                    </TableCell>
                    {auth.user.role === "admin" && (
                      <TableCell
                        style={{
                          display: "flex",
                          justifyContent: "space-around",
                        }}
                      >
                        <TableRow
                          align="center"
                          style={{
                            borderRight: "1px solid black",
                            minHeight: "fit-content",
                            padding: "10px",
                          }}
                        >
                          Vender
                        </TableRow>
                        <span className="iconV iconV3">
                          <p>Reply</p>
                          <Link
                            to={`/reply/vender/${row.queryId}/${row.venderId}`}
                            target="_blank"
                          >
                            <img
                              src="/images/image4.svg"
                              alt="1"
                              class="travel-Logo"
                              height="30px"
                            />
                          </Link>
                        </span>
                        <span
                          className="iconV iconV2"
                          onClick={() => handleGuest(row.queryId, row.venderId)}
                        >
                          <p>Request Guest Details</p>
                          <img
                            src={guest1}
                            alt="guest"
                            class="travel-Logo"
                            height="40px"
                          />
                        </span>
                        <span className="iconV iconV2">
                          <p>Guest Details</p>
                          <GuestDetails
                            queryId={row.queryId}
                            vendorId={row.venderId}
                            disable={confirmIndex !== -1 && confirmIndex !== i}
                            buttonRole="vender"
                          />
                        </span>
                        <span className="iconV iconV3">
                          <Hold
                            queryId={row.queryId}
                            vendorId={row.venderId}
                            queryNo={row.queryNo}
                            isConfirm={row.isConfirm}
                            comp="admin"
                          />
                        </span>
                        <span className="iconV iconV3">
                          <p>Confirm</p>
                          <Confirm
                            queryId={row.queryId}
                            vendorId={row.venderId}
                            confirm={confirm}
                            role="vender"
                          />
                        </span>
                        <span className="iconV iconV2">
                          <Payment
                            queryId={row.queryId}
                            venderId={row.venderId}
                            role="vender"
                            queryNo={row.queryNo}
                            finalCost={row.venderPrice}
                            disabled={confirmIndex !== -1 && confirmIndex !== i}
                          />
                        </span>
                        <CancelVender
                          queryId={row.queryId}
                          vendorId={row.venderId}
                          queryNo={order.queryNo}
                        />
                        <NavLink
                          to={`/voucher/${row.queryId}/${row.venderId}`}
                          target="_blank"
                          style={{ textDecoration: "none" }}
                          className="iconV iconV4"
                        >
                          <p>Voucher</p>
                          <img
                            src={voucher}
                            alt="7"
                            class="travel-Logo"
                            height="30px"
                          />
                        </NavLink>
                        <NavLink
                          to={`/invoice/vender/${row.queryId}/${row.venderId}`}
                          target="_blank"
                          className="iconV iconV3"
                        >
                          <p>Invoice</p>
                          <img
                            src={invoice}
                            alt="invoice"
                            class="travel-Logo"
                            height="30px"
                          />
                        </NavLink>
                        <Help queryNo={order.queryNo} />
                      </TableCell>
                    )}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
