import React, { useState } from "react";
//import AddBoxIcon from "@mui/icons-material/AddBox";
import { Table } from "react-bootstrap";
import style from "./Account.module.css";
import MyButton from "../Button/MyButton";

function Account({ name, data, updateHandler, group }) {
  //  const [open, setOpen] = useState(false);
  const [create, setcreate] = useState(true);

  return (
    <div className={style.account}>
      <h4>{name} Account</h4>
      {/* <div
        onClick={() => setOpen(!open)}
        aria-controls="Add"
        aria-expanded={open}
        className={style.addIcon}
      >
        <AddBoxIcon className={style.coloryellow} />
        Add Client
      </div>
      <Collapse in={open}>
        <div id="Add">
          <div className={style.add}>
            <div>
              <p>Client Id</p>
              <input type="text"></input>
            </div>
            <div>
              <p>Clients</p>
              <input type="text"></input>
            </div>
            <div>
              <p>Country</p>
              <input type="text"></input>
            </div>
            <div>
              <p>City</p>
              <input type="text"></input>
            </div>
            <div>
              <p>Address</p>
              <input type="text"></input>
            </div>
            <div>
              <p>Email Id</p>
              <input type="email"></input>
            </div>
            <div>
              <p>Phone No</p>
              <input type="number"></input>
            </div>
            <div>
              <p>Status</p>
              <input type="text"></input>
            </div>
            <div>
              <p>Amount</p>
              <input type="text"></input>
            </div>
          </div>
          <Button>Add</Button>
        </div>
      </Collapse> */}
      <Table striped bordered borderless hover>
        <thead>
          <tr>
            <th className={style.th}>Sr No</th>
            {name === "Vender" && <th className={style.th}>Vender Id</th>}{" "}
            <th className={style.th}>
              {name === "Company" ? "Client" : "Vender"}
            </th>
            <th className={style.th}>Country</th>
            <th className={style.th}>City</th>
            <th className={style.th}>Email</th>
            <th className={style.th}>Phone No.</th>
            <th className={style.th}>Status</th>
            <th className={style.th}>Approve</th>
            <th className={style.th}>Amount</th>
            <th className={style.th}></th>
          </tr>
        </thead>
        {data.map((info, i) => {
          return (
            <tbody>
              <tr style={{ backgroundColor: "white" }}>
                <td className={style.td}>{i + 1}</td>
                {name === "Vender" && (
                  <td className={style.td}>{info.uniqueCode}</td>
                )}
                <td className={style.td}>{info.username}</td>
                <td className={style.td}>
                  {!info.companyInfo ? "" : info.companyInfo.country}
                </td>
                <td className={style.td}>
                  {info.companyInfo ? info.companyInfo.city : ""}
                </td>
                <td className={style.td}>{info.emailId}</td>
                <td className={style.td}>{info.mobileNo}</td>
                <td className={style.td}>
                  {info.isActive ? "Active" : "Deactive"}
                </td>
                <td className={style.td}>{info.isApproved ? "Yes" : "No"}</td>
                <td className={style.td}>0.0</td>
                <td className={style.td}>
                  <MyButton
                    data={info}
                    updateHandler={updateHandler}
                    comp="account"
                    group={group}
                    name={name}
                    setcreate={setcreate}
                  />
                </td>
              </tr>
            </tbody>
          );
        })}
      </Table>
    </div>
  );
}

export default Account;
