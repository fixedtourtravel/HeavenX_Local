import React from "react";
import { Table } from "react-bootstrap";
import style from "./Inquery.module.css";

function Card({ data, name }) {
  return (
    <div>
      <Table striped bordered borderless hover>
        <thead>
          <tr>
            <th className={style.th}>Sr No</th>
            <th className={style.th}>Order Id</th>
            {name === "Vender" && <th className={style.th}>Vender Id</th>}{" "}
            <th className={style.th}>
              {name === "Company" ? "Client" : "Vender"}
            </th>
            <th className={style.th}>Country</th>
            <th className={style.th}>City</th>
            <th className={style.th}>Check In</th>
            <th className={style.th}>Check Out</th>
            <th className={style.th}>Nights</th>
          </tr>
        </thead>
        {data.map((info, i) => {
          return (
            <tbody>
              <tr style={{ backgroundColor: "white" }}>
                <td className={style.td}>{i + 1}</td>
                <td className={style.td}>{info.queryNo}</td>
                {name === "Vender" && (
                  <td className={style.td}>{info.uniqueCode}</td>
                )}
                <td className={style.td}>{info.queryName}</td>
                <td className={style.td}>
                  {!info.arraydestination
                    ? ""
                    : info.arraydestination[0].queryCountry}
                </td>
                <td className={style.td}>
                  <div className={style.city}>
                    {info.arraydestination &&
                      info.arraydestination.map((city, i) => {
                        return (
                          <div>
                            {city.queryCity}{" "}
                            {i < info.arraydestination.length - 1 ? "|" : ""}
                            &nbsp;
                          </div>
                        );
                      })}
                  </div>
                </td>
                <td className={style.td}>
                  {" "}
                  {!info.arraydestination
                    ? ""
                    : info.arraydestination[0].queryCheckIn}
                </td>
                <td className={style.td}>
                  {" "}
                  {!info.arraydestination
                    ? ""
                    : info.arraydestination[info.arraydestination.length - 1]
                        .queryCheckOut}
                </td>
                <td className={style.td}>{info.queryTotalNights}</td>
              </tr>
            </tbody>
          );
        })}
      </Table>
    </div>
  );
}

export default Card;
