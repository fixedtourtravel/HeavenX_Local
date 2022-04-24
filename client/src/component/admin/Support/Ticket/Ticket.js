import React from "react";
import BarChartIcon from "@mui/icons-material/BarChart";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { Button, Table } from "react-bootstrap";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import style from "./Ticket.module.css";

function Ticket() {
  return (
    <div className={style.home}>
      <p>Tickets</p>
      <div className={style.row1}>
        <div>
          <Button>New Ticket</Button>
          <BarChartIcon style={{ marginTop: "15", fontSize: "30" }} />
        </div>
        <div>
          <FilterAltIcon style={{ color: "aqua", fontSize: "30" }} />
          <strong> Sort by</strong>
          <input type="text" />
        </div>
      </div>
      <div className={style.row2}>
        <p>Ticket Summary</p>
        <div className={style.row2Item}>
          <div>
            <p>0</p>
            <p style={{color:"purple"}}>Open</p>
          </div>
          <div className={style.border}></div>
          <div>
            <p>0</p>
            <p style={{color:"blue"}}>In Progress</p>
          </div>
          <div className={style.border}></div>
          <div>
            <p>0</p>
            <p style={{color:"orange"}}>Answered</p>
          </div>
          <div className={style.border}></div>
          <div>
            <p>0</p>
            <p style={{color:"red"}}>On Hold</p>
          </div>
          <div className={style.border}></div>
          <div>
            <p>0</p>
            <p style={{color:"pink"}}>Closed</p>
          </div>
        </div>
      </div>
      <div className={style.row3}>
        <input type="number"></input>
        <p>Export</p>
        <p>Bulk Action</p>
        <AutorenewIcon />
      </div>
      <Table striped bordered borderless hover>
        <thead>
          <tr>
            <th className={style.th}>#</th>
            <th className={style.th}>Subject</th>
            <th className={style.th}>Tags</th>
            <th className={style.th}>Department</th>
            <th className={style.th}>Service</th>
            <th className={style.th}>Contact</th>
            <th className={style.th}>Priority</th>
            <th className={style.th}>Status</th>
            <th className={style.th}>Last Reply</th>
            <th className={style.th}>Created</th>
          </tr>
        </thead>

        <tbody>
          <tr style={{ backgroundColor: "white" }}>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default Ticket;
