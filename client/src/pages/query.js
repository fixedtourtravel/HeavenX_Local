import React, { useState, useEffect } from "react";
import "../styles/query.css";
import { FormGroup, Input, Label } from "reactstrap";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useParams } from "react-router-dom";
import * as ROUTES from "../constants/routes";
//import moment from "moment";
//import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Form } from "react-bootstrap";
import Loading from "./Loading";
import { useHistory } from "react-router-dom";
import Navbar from "./Navbar/Navbar";

const { customAlphabet } = require("nanoid");

export default function Query() {
  const alphabet = "0123456789";
  const nanoid = customAlphabet(alphabet, 7);
  const auth = useAuth();
  const [queryNo, setQueryNo] = useState(nanoid());
  const [queryType, setQueryType] = useState("");
  const [queryName, setQueryName] = useState("");
  // const [queryNationality, setQueryNationality] = useState("");
  // const [queryResidence, setQueryResidence] = useState("");
  // const [queryClientCode, setQueryClientCode] = useState("");
  const [queryPassengers, setQueryPassengers] = useState("2");
  const [queryAdult, setQueryAdult] = useState("2");
  const [queryChild, setQueryChild] = useState("0");
  const [queryInfant, setQueryInfant] = useState("0");
  const [queryRooms, setQueryRooms] = useState("0");
  const [querySingle, setQuerySingle] = useState("0");
  const [queryDouble, setQueryDouble] = useState("0");
  const [queryTriple, setQueryTriple] = useState("0");
  const [queryMealType, setQueryMealType] = useState("");
  const [queryDetail, setQueryDetail] = useState("");
  const [queryNoBed, setQueryNoBed] = useState("0");
  const [queryExtra, setQueryExtra] = useState("0");
  const [individualNights, setindividualNights] = useState([0]);
  const [totalNights, setTotalNights] = useState(0);
  const [place, setPlace] = useState([]);
  const [category, setCategory] = useState([]);
  const [Meal, setMeal] = useState([]);
  const [inputList, setInputList] = useState([
    {
      queryCheckIn: "",
      queryCheckOut: "",
      queryCountry: "",
      queryCity: "",
      queryNights: 0,
      queryHotelRating: 0,
    },
  ]);
  const [allCity, setAllCity] = useState([[]]);
  const [minDate, setMinDate] = useState(new Date().toISOString().slice(0, 10));
  const [loading, setLoading] = useState(false);

  const history = useHistory();
  const { id, vendorId } = useParams();

  const getInstruction = () => {
    setLoading(true);
    axios({
      method: "get",
      url: ROUTES.BASELINK + "/admin/destinataionData",
      headers: {
        "Content-type": "application/json",
        // "x-auth-token": `${localStorage.getItem(TOKEN_ID)}`,
      },
    })
      .then((res) => {
        if (res.data.data.length === 0) {
          return;
        }
        setPlace(res.data.data[0].place);
        setCategory(res.data.data[0].category);
        setMeal(res.data.data[0].meal);
      })
      .catch((err) => {
        console.log("error in fetching instruction", err);
      });
    setLoading(false);
  };

  const getData = () => {
    if (id) {
      setLoading(true);
      axios({
        method: "post",
        url: ROUTES.BASELINK + "/query/preData",
        data: {
          id: id,
        },
        headers: {
          "Content-type": "application/json",
          // "x-auth-token": `${localStorage.getItem(TOKEN_ID)}`,
        },
      })
        .then((res) => {
          initialValues(res.data.data.details, res.data.data.instruct);
        })
        .catch((err) => {
          console.log("error in fetching pre filled data", err);
        });
      setLoading(false);
    }
  };

  const initialValues = (data, instruct) => {
    setTotalNights(data.queryTotalNights);
    setQueryType(data.queryType);
    setQueryName(data.queryName);
    //setQueryNationality(data.queryNationality);
    //setQueryResidence(data.queryResidence);
    //setQueryClientCode(data.queryClientCode);
    setQueryNo(data.queryNo);
    setQueryPassengers(data.queryPassengers);
    setQueryAdult(data.queryAdult);
    setQueryChild(data.queryChild);
    setQueryInfant(data.queryInfant);
    setQueryRooms(data.queryRooms);
    setQuerySingle(data.querySingle);
    setQueryDouble(data.queryDouble);
    setQueryTriple(data.queryTriple);
    setQueryDetail(data.queryDetail);
    setQueryNoBed(data.queryNoBed);
    setQueryExtra(data.queryExtra);
    setQueryMealType(data.queryMeal);
    calculateTotalNights(data.arraydestination);
    let c = [];
    for (let i = 0; i < data.arraydestination.length; i++) {
      let country = data.arraydestination[i].queryCountry;
      let p = instruct.place;
      for (let j = 0; j < p.length; j++) {
        if (country === p[j].country.name) {
          c.push(p[j].city);
          break;
        }
      }
      // data.arraydestination[i].queryCheckIn = new Date(
      //   data.arraydestination[i].queryCheckIn
      // );
      // data.arraydestination[i].queryCheckOut = new Date(
      //   data.arraydestination[i].queryCheckOut
      // );
    }
    setInputList(data.arraydestination);
    setAllCity(c);
  };

  useEffect(() => {
    getInstruction();
    getData();
  }, []);

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;

    const list = [...inputList];

    list[index][name] = value;
    let id = name + index;
    if (name === "queryCity") {
      document.getElementById(id).value = value;
    }
    if (
      list[index]["queryCheckIn"] !== "" &&
      list[index]["queryCheckOut"] !== ""
    ) {
      calculateTotalNights(list);
      const date1 = new Date(list[index].queryCheckIn);
      const date2 = new Date(list[index].queryCheckOut);
      const diffTime = Math.abs(date1 - date2);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      list[index]["queryNights"] = diffDays;
    }
    console.log(list);

    setInputList(list);
  };

  // const handleDate = (name, value, index) => {
  //   console.log("harshu", value);
  //   const list = [...inputList];
  //   list[index][name] = value;
  //   if (
  //     list[index]["queryCheckIn"] !== "" &&
  //     list[index]["queryCheckOut"] !== ""
  //   ) {
  //     calculateTotalNights(list);

  //   }
  //   setInputList(list);
  // };

  const handlesetCountry = (e, index) => {
    let id = "queryCountry" + index;
    let x = document.getElementById(id).value;
    let ans = [];
    for (let i = 0; i < place.length; i++) {
      if (place[i].country.name === x) {
        ans = place[i].city;
        break;
      }
    }
    let c = [...allCity];
    c[index] = ans;
    c.push([]);
    setAllCity(c);
    handleInputChange(e, index);
  };

  function calculateTotalNights(list) {
    //const list = [...inputList];
    const nightlist = [];
    let tot = 0;
    for (let i = 0; i < list.length; i++) {
      if (list[i].queryCheckIn === "") {
        continue;
      }
      const date1 = new Date(list[i].queryCheckIn);
      const date2 = new Date(list[i].queryCheckOut);
      const diffTime = Math.abs(date1 - date2);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      nightlist[i] = diffDays;
      tot += diffDays;
    }
    nightlist.push(0);
    setTotalNights(tot);
    setindividualNights(nightlist);
  }

  function checkFields() {
    for (let i = 0; i < inputList.length; i++) {
      if (
        inputList[i].queryCheckIn === "" ||
        inputList[i].queryCheckOut === "" ||
        inputList[i].queryCountry === "" ||
        inputList[i].queryCity === ""
      ) {
        return 0;
      }
    }
    return 1;
  }

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    if (list[list.length - 1].queryCheckIn !== "") {
      setMinDate(list[list.length - 1].queryCheckIn);
    } else if (list.length - 2 >= 0) {
      setMinDate(list[list.length - 2].queryCheckIn);
    }

    setInputList(list);
    calculateTotalNights(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    // console.log(inputList);

    if (checkFields() === 0) {
      alert("Please fill all fields.");
      return;
    }

    let list = [...inputList];
    setMinDate(list[list.length - 1].queryCheckOut);
    // not suppose to run
    setInputList([
      ...inputList,
      {
        queryCheckIn: "",
        queryCheckOut: "",
        queryCountry: "",
        queryCity: "",
        queryNights: 0,
        queryHotelRating: 0,
      },
    ]);
  };

  const refresh = () => {
    setTotalNights(0);
    setQueryType("");
    setQueryName("");
    // setQueryNationality("");
    // setQueryResidence("");
    // setQueryClientCode("");
    setQueryPassengers("2");
    setQueryAdult("2");
    setQueryChild("0");
    setQueryInfant("0");
    setQueryRooms("0");
    setQuerySingle("0");
    setQueryDouble("0");
    setQueryTriple("0");
    setQueryDetail("");
    setQueryNoBed("0");
    setQueryExtra("0");
    setInputList([
      {
        queryCheckIn: "",
        queryCheckOut: "",
        queryCountry: "",
        queryCity: "",
        queryNights: 0,
        queryHotelRating: 0,
      },
    ]);
    for (let i = 0; i < Meal.length; i++) {
      var radio = document.getElementById(`meal${i}`);
      if (radio) {
        radio.checked = false;
      }
    }

    document.getElementById("queryCountry0").value = "initial";
    document.getElementById("queryCity0").value = "initial";
    document.getElementById("queryType").value = "initial";

    setindividualNights([0]);
  };

  const checkRequiredField = () => {
    if (queryName === "") {
      alert("Please fill the queryName");
      return true;
    }
    if (queryType === "") {
      alert("Please select a queryType");
      return true;
    }
    // if (queryNationality === "") {
    //   alert("Please select a queryNationality");
    //   return true;
    // }
    // if (queryResidence === "") {
    //   alert("Please select a queryResidence");
    //   return true;
    // }
    // if (queryClientCode === "") {
    //   alert("Please fill the queryClientCode");
    //   return true;
    // }
    // if (auth.user.uniqueCode !== queryClientCode) {
    //   alert("Client code doesn't match, Please use correct code");
    //   return true;
    // }
    if (queryPassengers === "") {
      alert("Please fill the queryPassengers");
      return true;
    }
    for (let i = 0; i < inputList.length; i++) {
      if (inputList[i].queryCheckIn === "") {
        alert("Please fill the queryCheckIn");
        return true;
      }
      if (inputList[i].queryCheckOut === "") {
        alert("Please fill the queryCheckOut");
        return true;
      }
      if (inputList[i].queryCountry === "") {
        alert("Please fill the queryCountry");
        return true;
      }
      if (inputList[i].queryCity === "") {
        alert("Please fill the queryCity");
        return true;
      }
    }
    return false;
  };

  const handleSubmitA = async () => {
    if (checkRequiredField()) {
      return;
    }
    const list = [...inputList];

    let x = list.length - 1;
    if (
      list[x].queryCheckIn === "" &&
      list[x].queryCheckOut === "" &&
      list[x].queryCountry === "" &&
      list[x].queryCity === ""
    ) {
      list.splice(list.length - 1, 1);
    }

    console.log("listlist", list);
    setLoading(true);

    if (auth.user) {
      await axios
        .post(ROUTES.BASELINK + "/query/createQuery", {
          queryNo: queryNo,
          queryName: queryName,
          queryType: queryType,
          // queryNationality: queryNationality,
          // queryResidence: queryResidence,
          queryClientCode: auth.user.uniqueCode,
          arraydestination: list,
          queryPassengers: queryPassengers,
          queryAdult: queryAdult,
          queryChild: queryChild,
          queryInfant: queryInfant,
          queryRooms: queryRooms,
          querySingle: querySingle,
          queryDouble: queryDouble,
          queryTriple: queryTriple,
          queryNoBed: queryNoBed,
          queryExtra: queryExtra,
          queryDetail: queryDetail,
          queryTotalNights: totalNights,
          queryMeal: queryMealType,
        })
        .then((res) => {
          console.log(res);
          alert("Query filled successfully");
          if (auth.user.role === "client") {
            history.push("/myorders");
          }
        });
    }
    setLoading(false);
  };

  const handleSubmitB = async () => {
    if (checkRequiredField()) {
      return;
    }
    const list = [...inputList];
    let x = list.length - 1;
    if (
      list[x].queryCheckIn === "" &&
      list[x].queryCheckOut === "" &&
      list[x].queryCountry === "" &&
      list[x].queryCity === ""
    ) {
      list.splice(list.length - 1, 1);
    }
    setLoading(true);

    await axios
      .post(ROUTES.BASELINK + "/query/modifyMaster", {
        id: id,
        details: {
          queryNo: queryNo,
          queryName: queryName,
          queryType: queryType,
          // queryNationality: queryNationality,
          // queryResidence: queryResidence,
          queryClientCode: auth.user.uniqueCode,
          arraydestination: list,
          queryPassengers: queryPassengers,
          queryAdult: queryAdult,
          queryChild: queryChild,
          queryInfant: queryInfant,
          queryRooms: queryRooms,
          querySingle: querySingle,
          queryDouble: queryDouble,
          queryTriple: queryTriple,
          queryNoBed: queryNoBed,
          queryExtra: queryExtra,
          queryDetail: queryDetail,
          queryTotalNights: totalNights,
          queryMeal: queryMealType,
        },
      })
      .then((res) => {
        alert(res.data.message);
        if (auth.user.role === "client") {
          history.push("/myorders");
        }
      });
    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <div className="container-fluid queryPage">
        {<Loading Loading={loading} />}
        <div className="row">
          <div className="col-12">
            <div className="container queryBox">
              <div className="row">
                <div className="col-12 text-left">
                  <div className="query-Header">Query</div>
                </div>
              </div>
              <div
                className="row mt-4 text-left"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div
                  className="col-4"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <Label className="query-Label" for="queryNo">
                    Query No
                  </Label>

                  <Input
                    className="query-Input"
                    id="queryNo"
                    name="queryNo"
                    value={queryNo}
                    readOnly="true"
                    type="number"
                  />
                </div>

                <div
                  className="col-4"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <Label className="query-Label" for="queryName">
                    Guest Name
                  </Label>
                  <Input
                    readOnly={auth.user.role === "supplier"}
                    className="query-Input"
                    id="queryName"
                    name="queryName"
                    type="text"
                    value={queryName}
                    onChange={({ target }) => setQueryName(target.value)}
                  />
                </div>

                <div
                  className="col-4"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <Label className="query-Label" for="queryType">
                    Query Type
                  </Label>
                  <Input
                    className="query-Input"
                    id="queryType"
                    name="queryType"
                    type="select"
                    onChange={({ target }) => {
                      setQueryType(target.value);
                    }}
                    disabled={auth.user.role === "supplier"}
                  >
                    <option selected disabled hidden value="initial">
                      Choose a option
                    </option>
                    {category.map((c, i) => {
                      if (c.active) {
                        return (
                          <option
                            value={c.name}
                            selected={c.name === queryType}
                          >
                            {c.name}
                          </option>
                        );
                      }
                      return <></>;
                    })}
                  </Input>
                </div>
              </div>
              {/* <div className="row mt-4 text-left">
                <div className="col-4">
                  <Label className="query-Label" for="queryNationality">
                    Nationality
                  </Label>
                        <Input               readOnly={auth.user.role!=="client"}

                    className="query-Input"
                    id="queryNationality"
                    name="queryNationality"
                    type="text"
                    value={queryNationality}
                    onChange={({ target }) => setQueryNationality(target.value)}
                  ></Input>
                </div>
                <div className="col-4">
                  <Label className="query-Label" for="queryResidence">
                    Residency
                  </Label>
                        <Input               readOnly={auth.user.role!=="client"}

                    className="query-Input"
                    id="queryResidence"
                    name="queryResidence"
                    type="text"
                    value={queryResidence}
                    onChange={({ target }) => setQueryResidence(target.value)}
                  ></Input>
                </div>
                <div className="col-4">
                  <Label className="query-Label" for="queryClientCode">
                    Client Code
                  </Label>
                        <Input               readOnly={auth.user.role!=="client"}

                    className="query-Input"
                    id="queryClientCode"
                    name="queryClientCode"
                    type="text"
                    value={queryClientCode}
                    onChange={({ target }) => setQueryClientCode(target.value)}
                    // readOnly
                  />
                </div>
              </div> */}
              <hr />
              <div className="add-destination">
                {inputList.map((x, i) => {
                  return (
                    <div className="box">
                      <div class="row text-left">
                        <div
                          className="col-4"
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                          }}
                        >
                          <Label className="query-Label" for="queryCheckIn">
                            Check In
                          </Label>
                          {/* <DatePicker
                            placeholderText="dd-mm-yyyy"
                            minDate={minDate}
                            name="queryCheckIn"
                            className="ml10 query-date"
                            id={`queryCheckIn${i}`}
                            onChange={(val) => {
                              handleDate("queryCheckIn", val, i);
                              setMinDate(val);
                            }}
                            selected={inputList[i].queryCheckIn}
                            disabled={auth.user.role === "supplier"}
                          /> */}

                          <input
                            readOnly={auth.user.role === "supplier"}
                            type="date"
                            name="queryCheckIn"
                            className="ml10 query-Input"
                            id={`queryCheckIn${i}`}
                            placeholder="Check In"
                            value={x.queryCheckIn}
                            onChange={(e) => {
                              handleInputChange(e, i);
                            }}
                            min={minDate}
                            style={{ minHeight: "38px" }}
                          />
                        </div>
                        <div
                          className="col-4"
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                          }}
                        >
                          <Label className="query-Label" for="queryCheckOut">
                            Check Out
                          </Label>
                          {/* <DatePicker
                            placeholderText="dd-mm-yyyy"
                            minDate={minDate}
                            name="queryCheckOut"
                            className="ml10 query-date"
                            id={`queryCheckOut${i}`}
                            onChange={(val) => {
                              handleDate("queryCheckOut", val, i);
                              setMinDate(val);
                            }}
                            selected={inputList[i].queryCheckOut}
                            disabled={auth.user.role === "supplier"}
                          /> */}
                          <input
                            readOnly={auth.user.role === "supplier"}
                            type="date"
                            className="ml10 query-Input"
                            name="queryCheckOut"
                            id={`queryCheckOut${i}`}
                            placeholder="Check Out"
                            value={x.queryCheckOut}
                            onChange={(e) => {
                              handleInputChange(e, i);
                            }}
                            style={{ minHeight: "38px" }}
                            min={minDate}
                          />
                        </div>
                        <div
                          className="col-4"
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                          }}
                        >
                          <Label className="query-Label" for="querynights">
                            Nights
                          </Label>
                          <Input
                            className="ml10 query-Input"
                            name="queryNights"
                            value={individualNights[i]}
                            readOnly
                          />
                        </div>

                        <div
                          className="col-4"
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                          }}
                        >
                          <Label className="query-Label" for="queryCountry">
                            Country
                          </Label>
                          <Input
                            disabled={auth.user.role === "supplier"}
                            type="select"
                            className="ml10 query-Input"
                            name="queryCountry"
                            id={`queryCountry${i}`}
                            onChange={(e) => handlesetCountry(e, i)}
                          >
                            <option selected disabled hidden value="initial">
                              Choose a option
                            </option>
                            {place.map((c) => {
                              if (
                                i > 0 &&
                                inputList[0].queryCountry !== c.country.name
                              ) {
                                return <></>;
                              }
                              if (c.country.active) {
                                return (
                                  <option
                                    value={c.country.name}
                                    selected={c.country.name === x.queryCountry}
                                  >
                                    {c.country.name}
                                  </option>
                                );
                              }
                              return <></>;
                            })}
                          </Input>
                        </div>
                        <div
                          className="col-4"
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                          }}
                        >
                          <Label className="query-Label ml-4" for="queryCity">
                            City
                          </Label>
                          <Input
                            disabled={auth.user.role === "supplier"}
                            type="select"
                            className="ml10 query-Input"
                            name="queryCity"
                            id={`queryCity${i}`}
                            onChange={(e) => handleInputChange(e, i)}
                          >
                            <option selected disabled hidden value="initial">
                              Choose a option
                            </option>
                            {allCity &&
                              allCity.length > i &&
                              allCity[i].map((c) => {
                                if (c.active) {
                                  return (
                                    <option
                                      value={c.name}
                                      selected={c.name === x.queryCity}
                                    >
                                      {c.name}
                                    </option>
                                  );
                                }
                                return <></>;
                              })}
                            {allCity &&
                              allCity.length > i &&
                              allCity[i].length === 0 && (
                                <option disabled>No City Found</option>
                              )}
                          </Input>
                        </div>
                        <div
                          className="col-4"
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                          }}
                        >
                          <Label
                            className="query-Label query-Label ml-4"
                            for="queryCountry"
                          >
                            Hotel Rating
                          </Label>
                          <div style={{ marginTop: "-15px" }}>
                            <Rating
                              className="rating"
                              name="queryHotelRating"
                              size="large"
                              onChange={(e, newValue) => {
                                handleInputChange(e, i);
                              }}
                              value={inputList[i].queryHotelRating}
                              disabled={auth.user.role === "supplier"}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="btn-box">
                        {inputList.length !== 1 && auth.user.role === "client" && (
                          <Button
                            className="ml-auto query-btn submit mr10"
                            variant="contained"
                            onClick={() => handleRemoveClick(i)}
                            style={{
                              marginRight: "20px",
                              marginBottom: "20px",
                            }}
                          >
                            Remove
                          </Button>
                        )}

                        {inputList.length - 1 === i &&
                          auth.user.role === "client" && (
                            <Button
                              onClick={handleAddClick}
                              className="ml-auto query-btn submit mr10"
                              variant="contained"
                              style={{
                                marginRight: "20px",
                                marginBottom: "20px",
                              }}
                            >
                              Add Destination
                            </Button>
                          )}
                      </div>
                    </div>
                  );
                })}
                <div className="total-nights">
                  <div className="row-text-left">
                    <div className="col-3">
                      <Label className="query-Label" for="queryNights">
                        Total Nights
                      </Label>
                      <Input
                        className="ml10"
                        name="queryNights"
                        value={totalNights}
                        readOnly
                      />
                    </div>
                  </div>
                </div>
                <hr />
              </div>

              <div className="row mt-4 text-left">
                <div className="col-12">
                  <Label className="query-Label1" for="queryPassengers">
                    Passengers
                  </Label>
                  <Input
                    readOnly={auth.user.role === "supplier"}
                    className="query-Input small"
                    id="queryPassengers"
                    name="queryPassengers"
                    type="number"
                    value={queryPassengers}
                    onChange={({ target }) => setQueryPassengers(target.value)}
                  />
                  <Label className="query-Label1 ml-4" for="queryAdult">
                    Adult
                  </Label>
                  <Input
                    readOnly={auth.user.role === "supplier"}
                    className="query-Input small"
                    id="queryAdult"
                    name="queryAdult"
                    type="number"
                    value={queryAdult}
                    onChange={({ target }) => setQueryAdult(target.value)}
                  />
                  <Label className="query-Label1 ml-4" for="queryChild">
                    Child
                  </Label>
                  <Input
                    readOnly={auth.user.role === "supplier"}
                    className="query-Input small"
                    id="queryChild"
                    name="queryChild"
                    type="number"
                    value={queryChild}
                    onChange={({ target }) => setQueryChild(target.value)}
                  />
                  <Label className="query-Label1 ml-4" for="queryInfant">
                    Infant
                  </Label>
                  <Input
                    readOnly={auth.user.role === "supplier"}
                    className="query-Input small"
                    id="queryInfant"
                    name="queryInfant"
                    type="number"
                    value={queryInfant}
                    onChange={({ target }) => setQueryInfant(target.value)}
                  />
                </div>
              </div>
              <div className="row mt-4 text-left">
                <div className="col-12">
                  <Label className="query-Label1" for="queryPassengers">
                    Rooms
                  </Label>
                  <Input
                    readOnly={auth.user.role === "supplier"}
                    className="query-Input small"
                    id="queryRooms"
                    name="queryRooms"
                    type="number"
                    value={queryRooms}
                    onChange={({ target }) => setQueryRooms(target.value)}
                  />
                  <Label className="query-Label1 ml-4" for="querySingle">
                    Single
                  </Label>
                  <Input
                    readOnly={auth.user.role === "supplier"}
                    className="query-Input small"
                    id="querySingle"
                    name="querySingle"
                    type="number"
                    value={querySingle}
                    onChange={({ target }) => setQuerySingle(target.value)}
                  />
                  <Label className="query-Label1 ml-4" for="queryDouble">
                    Double
                  </Label>
                  <Input
                    readOnly={auth.user.role === "supplier"}
                    className="query-Input small"
                    id="queryDouble"
                    name="queryDouble"
                    type="number"
                    value={queryDouble}
                    onChange={({ target }) => setQueryDouble(target.value)}
                  />
                  <Label className="query-Label1 ml-4" for="queryTriple">
                    Triple
                  </Label>
                  <Input
                    readOnly={auth.user.role === "supplier"}
                    className="query-Input small"
                    id="queryTriple"
                    name="queryTriple"
                    type="number"
                    value={queryTriple}
                    onChange={({ target }) => setQueryTriple(target.value)}
                  />
                  <Label className="query-Label1 ml-4" for="queryExtra">
                    Extra
                  </Label>
                  <Input
                    readOnly={auth.user.role === "supplier"}
                    className="query-Input small"
                    id="queryExtra"
                    name="queryExtra"
                    type="number"
                    value={queryExtra}
                    onChange={({ target }) => setQueryExtra(target.value)}
                  />
                  <Label className="query-Label1 ml-4" for="queryNoBed">
                    NoBed
                  </Label>
                  <Input
                    readOnly={auth.user.role === "supplier"}
                    className="query-Input small"
                    id="queryNoBed"
                    name="queryNoBed"
                    type="number"
                    value={queryNoBed}
                    onChange={({ target }) => setQueryNoBed(target.value)}
                  />
                </div>
              </div>

              <div className="row mt-4 text-left">
                <div className="col-12">
                  <Label className="query-Label" for="queryMealType">
                    Meal Type:
                  </Label>
                  {Meal.map((m, i) => {
                    if (m.active) {
                      return (
                        <FormGroup check inline>
                          <Label check className="ml-4" for={m}>
                            <strong>{m.name}</strong>
                          </Label>
                          <Input
                            disabled={auth.user.role === "supplier"}
                            value={m.name}
                            className="ml-2"
                            type="radio"
                            id={`meal${i}`}
                            name="meal"
                            checked={m.name === queryMealType}
                            onChange={(e) => {
                              setQueryMealType(e.target.value);
                            }}
                          />
                        </FormGroup>
                      );
                    }
                    return <></>;
                  })}
                </div>
              </div>
              <div className="row mt-4 text-left">
                <div className="col-8">
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                  >
                    <Form.Label className="query-Label"> Details :</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={5}
                      className="query-detail"
                      name="queryDetail"
                      type="text"
                      value={queryDetail}
                      onChange={({ target }) => {
                        setQueryDetail(target.value);
                      }}
                      readOnly={auth.user.role === "supplier"}
                    />
                  </Form.Group>
                </div>
              </div>

              <div className="row mt-4">
                <div className="col-12 d-flex justify-content-right">
                  {auth.user.role !== "supplier" && (
                    <Button
                      className="ml-auto query-btn refresh"
                      onClick={refresh}
                      variant="contained"
                    >
                      Refresh
                    </Button>
                  )}
                  {auth.user.role !== "supplier" && (
                    <Button
                      type="submit"
                      onClick={!id ? handleSubmitA : handleSubmitB}
                      className="ml-4 query-btn submit"
                      variant="contained"
                    >
                      Submit
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
