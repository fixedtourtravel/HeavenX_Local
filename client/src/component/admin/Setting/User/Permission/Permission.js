import React, { useEffect, useState } from "react";
import style from "./Permission.module.css";
import CheckBox from "./CheckBox";
import { data } from "./Data";
import { Button } from "react-bootstrap";
import axios from "axios";
import * as ROUTES from "../../../../../constants/routes";

function Permission({ obj, setopen, changeHandler }) {
  const [permission, setPermission] = useState([]);

  const headers = {
    "Content-type": "application/json",
  };
  console.log(obj);
  const handleSave = async () => {
    await axios
      .post(
        ROUTES.BASELINK + "/admin/addpermission",
        {
          id: obj._id,
          permission: permission,
        },
        { headers: headers }
      )
      .then(
        (res) => {
          alert(res.data.message);
          changeHandler(true);
          setopen(false);
        },
        (error) => {
          console.log(error);
          alert(error);
        }
      );
  };

  const initialValues = () => {
    let x = [];
    for (let i = 0; i < data.length; i++) {
      if (obj.permissions[i]) {
        x.push(obj.permissions[i]);
      } else {
        x.push({
          name: "",
          value: [false, false, false, false, false, false],
        });
      }
    }
    setPermission(x);
  };

  useEffect(() => {
    initialValues();
  }, []);

  return (
    <div className={style.permission}>
      <i
        class="fa fa-times-circle"
        onClick={() => setopen(false)}
        style={{ float: "right", fontSize: "40px", cursor: "pointer" }}
      ></i>
      <h4>Permissions</h4>
      <div className={style.radioDiv}>
        <div className="row">
          <div className={`col ${style.radioHeading1}`}>Feature</div>
          <div className={`col ${style.radioHeading2}`}>Capabilities</div>
        </div>
        {data.map((value, i) => {
          return (
            <CheckBox
              data={value}
              index={i}
              setPermission={setPermission}
              permission={permission}
            />
          );
        })}
      </div>
      <Button variant="primary" onClick={handleSave} style={{ float: "right" }}>
        Save
      </Button>
      <Button
        variant="danger"
        onClick={() => setopen(false)}
        style={{ float: "right" }}
      >
        Cancel
      </Button>
    </div>
  );
}

export default Permission;
