import React from "react";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import style from "./Common.module.css";
import { Input } from "reactstrap";

function Sort({ data, dataFunction }) {
  const decreasingFunction = (a, b) => {
    if (a.name >= b.name) {
      return 1;
    }
    return -1;
  };
  const increasingFunction = (a, b) => {
    if (a.name <= b.name) {
      return 1;
    }
    return -1;
  };
  const activeFunction = () => {
    let temp = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].active || data[i].isActive) {
        temp.push(data[i]);
      }
    }
    dataFunction(temp);
  };

  const deactiveFunction = () => {
    let temp = [];
    for (let i = 0; i < data.length; i++) {
      if (!data[i].active && !data[i].isActive) {
        temp.push(data[i]);
      }
    }
    dataFunction(temp);
  };

  const sortFunction = (e) => {
    const { value } = e.target;
    const x = [...data];
    console.log(x);
    console.log(value);
    if (value === "1") {
      dataFunction(x);
    } else if (value === "2") {
      x.reverse();
      dataFunction(x);
    } else if (value === "3") {
      x.sort(decreasingFunction);
      dataFunction(x);
    } else if (value === "4") {
      x.sort(increasingFunction);
      dataFunction(x);
    } else if (value === "5") {
      activeFunction();
    } else if (value === "6") {
      deactiveFunction();
    }
  };
  return (
    <div className={style.sort}>
      <FilterAltIcon style={{ color: "aqua", fontSize: "30" }} />
      <Input
        type="select"
        className={style.sort_select}
        onChange={(e) => sortFunction(e)}
      >
        <option value="1">Newest</option>
        <option value="2">Oldest</option>
        <option value="3">A - Z</option>
        <option value="4">Z - A</option>
        <option value="5">Only Active</option>
        <option value="6">Only Deactive</option>
      </Input>
    </div>
  );
}

export default Sort;
