import React, { useEffect, useState } from "react";
import { Input } from "reactstrap";
import style from "./Permission.module.css";

function CheckBox({ data, index, setPermission, permission }) {
  const [chk, setChk] = useState([false, false, false, false, false,false]);
  const handleRadio = (i) => {
    let y = [...chk];
    y[i] = !y[i];

    setChk(y);
    let x = [...permission];
    x[index].name = data.name;
    x[index].value = y;
    console.log(x);
    setPermission(x);
  };
  useEffect(() => {
    // console.log(permission)
    // return
    if (permission[index] && permission[index].value) {
      setChk(permission[index].value);
      console.log(permission[index].value);
    }
  }, [permission]);

  return (
    <div className="row">
      <div className={`col ${style.radioname}`}> {data.name}</div>
      <div className={`col ${style.radioname1}`}>
        <Input
          type="checkbox"
          className={style.radio}
          id="view_own"
          value="view_own"
          checked={chk[0]}
          onChange={(e) => {
            handleRadio(0);
          }}
        />
        <label className={style.label} for="view_own">
          View(Own)
        </label>
        <br />
        <Input
          type="checkbox"
          className={style.radio}
          id="view_all"
          value="view_all"
          checked={chk[1]}
          onChange={(e) => {
            handleRadio(1);
          }}
        />
        <label className={style.label} for="view_global">
          View(All)
        </label>
        <br />

        <Input
          type="checkbox"
          className={style.radio}
          id="create"
          value="create"
          checked={chk[2]}
          onChange={(e) => {
            handleRadio(2);
          }}
        />
        <label className={style.label} for="create">
          Create
        </label>
        <br />

        <Input
          type="checkbox"
          className={style.radio}
          id="edit"
          value="edit"
          checked={chk[3]}
          onChange={(e) => {
            handleRadio(3);
          }}
        />
        <label className={style.label} for="edit">
          Edit
        </label>
        <br />
        <Input
          type="checkbox"
          className={style.radio}
          id="active_deactive"
          value="active_deactive"
          checked={chk[4]}
          onChange={(e) => {
            handleRadio(4);
          }}
        />
        <label className={style.label} for="active_deactive">
          Active/Deactivate
        </label>
        <br />
        <Input
          type="checkbox"
          className={style.radio}
          id="delete"
          value="delete"
          checked={chk[5]}
          onChange={(e) => {
            handleRadio(5);
          }}
        />
        <label className={style.label} for="delete">
          Delete
        </label>
        <br />
      </div>
    </div>
  );
}

export default CheckBox;
