import React from "react";
import { Button, Table } from "react-bootstrap";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import style from "./Support.module.css";

function Common({ name }) {
  return (
    <div className={style.common}>
      <p>Ticket {name}</p>
      <div className={style.row1}>
        <div>
          <Button>New Status</Button>
        </div>
        <div>
          <FilterAltIcon style={{ color: "aqua", fontSize: "30" }} />
          <strong> Sort by</strong>
          <input type="text" />
        </div>
      </div>
      <div className={style.row3}>
        <input type="number"></input>
        <p>Export</p>
        <AutorenewIcon />
      </div>
      <Table striped bordered borderless hover>
        <thead>
          <tr>
            <th className={style.th}>#</th>
            <th className={style.th}>Name</th>
          </tr>
        </thead>

        <tbody>
          <tr style={{ backgroundColor: "white" }}>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default Common;
