import React, { useState } from "react";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { Input } from "reactstrap";
import style from "./Home.module.css";
import { Button } from "react-bootstrap";

function Sort({ data, dataFunction }) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // const newInquery = () => {
  //   let x = [];
  //   for (let i = 0; i < data.length; i++) {
  //     console.log(data[i]);
  //     if (data[i].newInquery === true || data[i].newInquery === "true") {
  //       if (startDate !== "" && endDate !== "") {
  //       } else {
  //         x.push(data[i]);
  //       }
  //     }
  //   }
  //   dataFunction(x);
  // };

  const findFunction = () => {
    if (startDate === "") {
      alert("choose starting date");
      return;
    }
    if (endDate === "") {
      alert("choose end date");
      return;
    }
    console.log(startDate, endDate);
    let x = [];
    for (let i = 0; i < data.length; i++) {
      let date = data[i].createdAt.substring(0, 10);
      if (date >= startDate && date <= endDate) {
        x.push(data[i]);
      }
    }
    dataFunction(x);
  };

  const clearFunction = () => {
    setStartDate("");
    setEndDate("");
    dataFunction(data);
  };

  return (
    <div className={style.sort}>
      <Input
        type="date"
        className={style.sort_select}
        onChange={(e) => setStartDate(e.target.value)}
        value={startDate}
      ></Input>
      <Input
        type="date"
        className={style.sort_select}
        onChange={(e) => setEndDate(e.target.value)}
        value={endDate}
      ></Input>
      <Button variant="warning" onClick={findFunction}>
        Find
      </Button>
      {startDate !== "" && endDate !== "" && (
        <Button variant="danger" onClick={clearFunction}>
          Clear
        </Button>
      )}
    </div>
  );
}

export default Sort;
