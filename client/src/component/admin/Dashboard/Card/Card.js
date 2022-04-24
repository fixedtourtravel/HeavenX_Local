import React from "react";
import style from "./Card.module.css";

function Card(props) {
  let Icon = props.option.icon;
  return (
    <div
      className={style.card}
      style={{ backgroundColor: `${props.option.color}` }}
    >
      <p>{props.option.heading}</p>
      <div className={style.item}>
        <Icon style={{ fontSize: "50", color: "white" }} />
        <p>{props.option.count}</p>
      </div>
    </div>
  );
}

export default Card;
