import React from "react";
import { Input } from "reactstrap";
import style from "./Common.module.css";

function Searching({ data, dataFunction }) {
  const searchFunction = (e) => {
    const { value } = e.target;
    const filtered = data.filter((ele) => {
      return ele.name.toLowerCase().includes(value.toLowerCase());
    });
    dataFunction(filtered);
  };

  return (
    <Input
      type="text"
      onChange={(e) => searchFunction(e)}
      className={style.search}
      placeholder="Search"
    />
  );
}

export default Searching;
