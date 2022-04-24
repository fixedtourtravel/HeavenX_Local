import React, { useEffect, useState } from "react";
import { Button, Table, Collapse } from "react-bootstrap";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import style from "./Finance.module.css";
import { Input, Label } from "reactstrap";
import * as ROUTES from "../../../../constants/routes";
import axios from "axios";
import MyButton from "./MyButton";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

function Common({ comp, country }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [percentage, setPercentage] = useState("");
  const [data, setdata] = useState([]);
  const [edit, setEdit] = useState("false");

  const handleEdit = (data, id) => {
    setEdit(data);
  };

  const handlesave = async () => {
    if (name === "") {
      alert("please add name");
      return;
    }
    if (comp === "Tax" && percentage === "") {
      alert("please add percentage");
      return;
    }
    if (comp === "Currency" && symbol === "") {
      alert("please add symbol");
      return;
    }
    let x = [...data];
    for (let i = 0; i < x.length; i++) {
      if (x.name === name) {
        alert("Already Added");
        return;
      }
    }
    if (comp === "Tax") {
      x.push({
        name: name,
        percentage: percentage,
        country: [],
        active: false,
      });
    } else {
      x.push({
        name: name,
        symbol: symbol,
        country: [],
        active: false,
      });
    }
    setdata(x);
    await axios({
      method: "post",
      url: ROUTES.BASELINK + "/admin/finance",
      data: {
        name,
        percentage,
        symbol,
        comp: comp,
      },
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => {
        // alert(res.data.message);
        setName("");
        setPercentage("");
        setSymbol("");
        getData()
      })
      .catch((err) => {
        console.log("error in fetching quries", err);
      });
  };

  const getData = async () => {
    await axios({
      method: "get",
      url: ROUTES.BASELINK + "/admin/getfinance",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => {
        const { tax, currency } = res.data.data;
        console.log(res.data.data);
        if (comp === "Tax") {
          setdata(tax);
        } else {
          setdata(currency);
        }
      })
      .catch((err) => {
        console.log("error in fetching quries", err);
      });
  };

  const changeHandler = (data) => {
    if (data) {
      getData();
      setEdit("false");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className={style.common}>
      <p>{comp === "Tax" ? "Tax Rate" : comp}</p>
      <div className={style.row1}>
        <Button
          onClick={() => setOpen(!open)}
          aria-controls="Add"
          aria-expanded={open}
          className={style.addIcon}
        >
          New {comp}
        </Button>
        {/* <div>
          <FilterAltIcon style={{ color: "aqua", fontSize: "30" }} />
          <strong> Sort by</strong>
          <Input type="text" />
        </div> */}
      </div>
      <div>
        <Collapse in={open}>
          <div id="Add">
            <div className={style.menuItem}>
              <div>
                <Label>{comp} Name</Label>
                <Input
                  type="text"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  value={name}
                ></Input>
              </div>
              {comp === "Tax" && (
                <div style={{ marginLeft: "10px" }}>
                  <Label>% Percentage</Label>
                  <Input
                    type="number"
                    onChange={(e) => {
                      setPercentage(e.target.value);
                    }}
                    value={percentage}
                  ></Input>
                </div>
              )}
              {comp === "Currency" && (
                <div style={{ marginLeft: "10px" }}>
                  <Label>Currency Symbol</Label>
                  <Input
                    type="text"
                    onChange={(e) => {
                      setSymbol(e.target.value);
                    }}
                    value={symbol}
                  ></Input>
                </div>
              )}
              <Button variant="warning" onClick={handlesave}>
                Add
              </Button>
            </div>
          </div>
        </Collapse>
      </div>
      <Table striped bordered borderless hover>
        <thead>
          <tr>
            <th className={style.th}>Sr No</th>
            <th className={style.th}>Name</th>
            {comp === "Currency" && <th className={style.th}>Symbol</th>}
            {comp === "Tax" && <th className={style.th}>Percentage</th>}
            <th className={style.th}>Country</th>
            <th className={style.th}>Action</th>
          </tr>
        </thead>

        {data.map((val, i) => {
          return (
            <tbody>
              <tr style={{ backgroundColor: "white" }}>
                <td className={style.td}>{i + 1}</td>
                <td className={style.td}>
                  <div
                    className={edit === "true" && style.edit}
                    contenteditable={edit === "true" ? "true" : "false"}
                    onInput={function (e) {
                      val.name = e.target.innerText;
                    }}
                  >
                    {val.name}&nbsp;&nbsp;&nbsp;
                    {val.active && (
                      <CheckCircleIcon
                        style={{ fontSize: "15px", color: "aqua" }}
                      />
                    )}
                    {!val.active && (
                      <CancelIcon style={{ fontSize: "15px", color: "red" }} />
                    )}
                  </div>
                </td>
                {comp === "Tax" && (
                  <td className={style.td}>
                    <div
                      className={edit === "true" && style.edit}
                      contenteditable={edit === "true" ? "true" : "false"}
                      onInput={function (e) {
                        val.percentage = e.target.innerText;
                      }}
                    >
                      {val.percentage}
                    </div>
                  </td>
                )}
                {comp !== "Tax" && (
                  <td className={style.td}>
                    <div
                      className={edit === "true" && style.edit}
                      contenteditable={edit === "true" ? "true" : "false"}
                      onInput={function (e) {
                        val.symbol = e.target.innerText;
                      }}
                    >
                      {val.symbol}
                    </div>
                  </td>
                )}
                <td className={style.td}>
                  <div className={style.country}>
                    {val.country.map((c, index) => {
                      return (
                        <div>
                          &nbsp;{c.label}{" "}
                          {index < val.country.length - 1 ? "|" : ""}
                        </div>
                      );
                    })}
                  </div>
                </td>
                <td className={style.td}>
                  <MyButton
                    obj={val}
                    comp={comp}
                    changeHandler={changeHandler}
                    country={country}
                    handleEdit={handleEdit}
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

export default Common;
