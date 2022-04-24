import React, { useState } from "react";
import { Table } from "react-bootstrap";
import style from "./Group.module.css";
import MyButton from "../Button/MyButton";

function GroupItem({ data, name, groupname, updateHandler, group }) {
  const [create, setcreate] = useState(true);

  return (
    <div className={`col-9 ${style.groupname}`}>
      <p>{groupname}</p>
      <Table striped bordered borderless hover>
        <thead>
          <tr>
            <th className={style.th}>Sr No</th>
            {name === "Vender" && <th className={style.th}>Vender Id</th>}
            <th className={style.th}>
              {name === "Vender" ? "Vender" : "Client"}
            </th>
            <th className={style.th}>Country</th>
            <th className={style.th}>City</th>
            <th className={style.th}>Status</th>
            <th className={style.th}>Amount</th>
            <th className={style.th}>Option</th>
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
                  {info.companyInfo ? info.companyInfo.country : ""}
                </td>
                <td className={style.td}>
                  {info.companyInfo ? info.companyInfo.city : ""}
                </td>
                <td className={style.td}>
                  {info.isActive ? "Active" : "Deactive"}
                </td>{" "}
                <td className={style.td}>0.00</td>
                <td className={style.td}>
                  <MyButton
                    data={info}
                    comp="account"
                    updateHandler={updateHandler}
                    group={group}
                    name={name === "Vender" ? "Vender" : "Company"}
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

export default GroupItem;
