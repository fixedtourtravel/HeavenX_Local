import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import style from "./Inquery.module.css";

function Card({ data }) {
  const [nights, setNights] = useState([]);

  const calNight = () => {
    let nig = [];
    for (let i = 0; i < data.length; i++) {
      let x = data[i].destination;
      let n = 0;
      for (let j = 0; j < x.length; j++) {
        n += x[j].nights;
      }
      nig.push(n);
    }
    setNights(nig);
  };

  useEffect(() => {
    calNight();
  }, []);
  return (
    <div>
      <Table striped bordered borderless hover>
        <thead>
          <tr>
            <th className={style.th}>Sr No</th>
            <th className={style.th}>Order Id</th>
            <th className={style.th}>Vender Id</th>
            <th className={style.th}>Country</th>
            <th className={style.th}>City</th>
            <th className={style.th}>Check In</th>
            <th className={style.th}>Check Out</th>
            <th className={style.th}>Nights</th>
            <th className={style.th}>Gross Amount</th>
            <th className={style.th}>Tax</th>
            <th className={style.th}>Amount</th>
            {/* <th className={style.th}>Action</th> */}
          </tr>
        </thead>
        {data.map((info, i) => {
          return (
            <tbody>
              <tr style={{ backgroundColor: "white" }}>
                <td className={style.td}>{i + 1}</td>
                <td className={style.td}>{info.queryNo}</td>
                <td className={style.td}>{info.vendorId}</td>
                <td className={style.td}>{info.queryCountry}</td>
                <td className={style.td}>
                  <div className={style.city}>
                    {info.destination &&
                      info.destination.map((city, j) => {
                        return (
                          <div>
                            {city.city} &nbsp;
                            {j < info.destination.length - 1 ? "|" : ""}
                            &nbsp;
                          </div>
                        );
                      })}
                  </div>
                </td>
                <td className={style.td}>{info.destination[0].checkIn}</td>
                <td className={style.td}>
                  {info.destination[info.destination.length - 1].checkOut}
                </td>
                <td className={style.td}>{nights[i]}</td>
                <td className={style.td}>{info.CostDetail.totalCost} </td>
                <td className={style.td}>{info.CostDetail.tax.cost} </td>
                <td className={style.td}>{info.CostDetail.finalCost} </td>

                {/* <td className={style.td}>
              {/* <MyButton
                data={info}
                updateHandler={updateHandler}
                comp="account"
                group={group}
              /> 
            </td> */}
              </tr>
            </tbody>
          );
        })}
      </Table>
    </div>
  );
}

export default Card;
