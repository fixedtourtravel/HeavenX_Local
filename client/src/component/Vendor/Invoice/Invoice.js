import React, { useEffect, useState } from "react";
import style from "./Invoice.module.css";
import { useParams } from "react-router-dom";
import Loading from "../../../pages/Loading";
import axios from "axios";
import * as ROUTES from "../../../constants/routes";
import { Table } from "react-bootstrap";

function Invoice() {
  const [destination, setDestination] = useState([
    {
      checkIn: "",
      checkOut: "",
      country: "",
      city: "",
      nights: 0,
      hotelName: "",
      roomType: "",
      mealType: "",
      address: "",
      reservationNo: "",
      desremark: "",
      contactNo: "",
      confirmation: "",
    },
  ]);
  const [single, setSingle] = useState("");
  const [double, setDouble] = useState("");
  const [triple, setTriple] = useState("");
  const [childWithBed, setchildWithBed] = useState("");
  const [childWithNoBed, setchildWithNoBed] = useState("");
  const [extra, setExtra] = useState("");
  const [infant, setinfant] = useState("");
  const [otherCharge, setotherCharge] = useState("");
  const [tax, settax] = useState();
  const [discount, setdiscount] = useState();
  const [discountamount, setdiscountamount] = useState();
  const [singlecost, setSinglecost] = useState();
  const [doublecost, setDoublecost] = useState();
  const [triplecost, setTriplecost] = useState();
  const [childWithBedcost, setchildWithBedcost] = useState();
  const [childWithNoBedcost, setchildWithNoBedcost] = useState();
  const [extracost, setExtracost] = useState();
  const [totalCost, setTotalCost] = useState();
  const [grossCost, setgrossCost] = useState();
  const [finalCost, setfinalCost] = useState();
  const [infantcost, setInfantcost] = useState();
  const [singleTotalcost, setSingleTotalcost] = useState();
  const [doubleTotalcost, setDoubleTotalcost] = useState();
  const [tripleTotalcost, setTripleTotalcost] = useState();
  const [childWithBedTotalcost, setchildWithBedTotalcost] = useState();
  const [childWithNoBedTotalcost, setchildWithNoBedTotalcost] = useState();
  const [extraTotalcost, setExtraTotalcost] = useState();
  const [infantTotalcost, setInfantTotalcost] = useState();
  const [focCost, setfocCost] = useState();
  const [taxCost, settaxCost] = useState();
  const [otherChargeCost, setotherChargeCost] = useState();
  const [taxper, settaxper] = useState("");
  const [loading, setLoading] = useState(false);
  const [queryNo, setQueryNo] = useState("");
  const [guestName, setGuestName] = useState("");
  const [logo, setLogo] = useState("");
  const [vendername, setVenderName] = useState("");
  const [venderaddress, setvenderaddress] = useState("");
  const [vendercontact, setvendercontact] = useState("");
  const [clientname, setclientName] = useState("");
  const [clientaddress, setclientaddress] = useState("");
  const [clientcontact, setclientcontact] = useState("");
  const [clientemail, setclientemail] = useState("");
  const [clientpan, setclientpan] = useState("");
  const [clientgst, setclientgst] = useState("");
  const [invoiceDate, setinvoiceDate] = useState("");

  const { user_role, queryId, vendorId } = useParams();
  const getDetails = async () => {
    setLoading(true);
    await axios({
      method: "post",
      url: ROUTES.BASELINK + "/vendor/replyDetail",
      data: {
        queryId: queryId,
        vendorId: vendorId,
      },
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => {
        const { detail, instruction } = res.data.data;
        setQueryNo(detail.queryNo);
        setGuestName(detail.guestName);
        initialValues(detail, instruction);
      })
      .catch((err) => {
        console.log("error in fetching quries", err);
      });
    setLoading(false);
  };

  const initialValues = (detail, instruction) => {
    if (detail.destination) {
      setDestination(detail.destination);
    }
    if (detail.CostDetail) {
      let room = detail.CostDetail;
      setSingle(room.single.no);
      setDouble(room.double.no);
      setTriple(room.triple.no);
      setExtra(room.extra.no);
      setchildWithBed(room.childWithBed.no);
      setchildWithNoBed(room.childWithNoBed.no);
      setinfant(room.infant.no);
      setotherCharge(room.otherCharge.name);
      setdiscount(room.discount);
      settaxper(room.tax.taxpercent);
      settax(room.tax.name);
      settaxCost(room.tax.cost);
      let sC, dC, tC, eC, cC, CnC, iC;
      let com = detail.commission;
      if (user_role === "client") {
        sC = room.single.cost + (room.single.cost * com) / 100;
        dC = room.double.cost + (room.double.cost * com) / 100;
        tC = room.triple.cost + (room.triple.cost * com) / 100;
        eC = room.extra.cost + (room.extra.cost * com) / 100;
        iC = room.infant.cost + (room.infant.cost * com) / 100;
        cC = room.childWithBed.cost + (room.childWithBed.cost * com) / 100;
        CnC = room.childWithNoBed.cost + (room.childWithNoBed.cost * com) / 100;
      } else {
        sC = room.single.cost;
        dC = room.double.cost;
        tC = room.triple.cost;
        eC = room.extra.cost;
        iC = room.infant.cost;
        cC = room.childWithBed.cost;
        CnC = room.childWithNoBed.cost;
      }

      setSinglecost(sC);
      setDoublecost(dC);
      setTriplecost(tC);
      setExtracost(eC);
      setInfantcost(iC);
      setchildWithBedcost(cC);
      setchildWithNoBedcost(CnC);
      setotherChargeCost(room.otherCharge.cost);
      setfocCost(room.foc.cost);
      let grcost = 0;
      grcost += room.single.no * sC;
      grcost += room.double.no * dC;
      grcost += room.triple.no * tC;
      grcost += room.extra.no * eC;
      grcost += room.childWithBed.no * cC;
      grcost += room.childWithNoBed.no * CnC;
      grcost += room.infant.no * iC;
      setgrossCost(grcost);
      grcost -= room.foc.cost;
      setdiscountamount((grcost * discount) / 100);
      grcost -= (grcost * discount) / 100;
      grcost += room.otherCharge.cost;
      setTotalCost(grcost);
      calculateIndividualCost(room.single.no, sC, setSingleTotalcost);
      calculateIndividualCost(room.double.no, dC, setDoubleTotalcost);
      calculateIndividualCost(room.triple.no, tC, setTripleTotalcost);
      calculateIndividualCost(room.extra.no, eC, setExtraTotalcost);
      calculateIndividualCost(
        room.childWithBed.no,
        cC,
        setchildWithBedTotalcost
      );
      calculateIndividualCost(
        room.childWithNoBed.no,
        CnC,
        setchildWithNoBedTotalcost
      );
      calculateIndividualCost(room.infant.no, iC, setInfantTotalcost);
      setfinalCost(room.finalCost);
      setdiscountamount(room.discountCost);
      setTotalCost(room.totalCost);
    }
  };

  const calculateIndividualCost = (no, cost, total) => {
    if (no !== "" && cost !== "") {
      total(no * cost);
    }
  };

  const getCompanyInfo = async () => {
    await axios({
      method: "get",
      url: ROUTES.BASELINK + `/admin/getCompanyInfo`,
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.data.data) {
        console.log(res.data.data);
        const {
          name,
          address,
          city,
          country,
          phone1,
          phone2,
          state,
          email,
          panNo,
          gstNo,
        } = res.data.data;
        let add = address + " , " + city + " " + state + " , " + country;
        if (user_role === "client") {
          setVenderName(name);
          setvenderaddress(add);
          setvendercontact(phone1 + " , " + phone2);
        } else {
          setclientName(name);
          setclientaddress(address);
          setclientcontact(phone1 + " , " + phone2);
          let e = "";
          for (let i = 0; i < email.length; i++) {
            e += email[i];
            if (i + 1 !== email.length) {
              e += " , ";
            }
          }
          setclientemail(e);
          setclientpan(panNo);
          setclientgst(gstNo);
        }
      }
    });
  };

  const getCompanyPic = async () => {
    await axios({
      method: "get",
      url: ROUTES.BASELINK + "/admin/comapanylogoDownload",
      responseType: "blob",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      const imageObjectURL = URL.createObjectURL(res.data);
      setLogo(imageObjectURL);
    });
  };

  const getVender = async () => {
    await axios({
      method: "post",
      url: ROUTES.BASELINK + `/vendor/getVender`,
      data: {
        id: vendorId,
      },
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.data.data) {
        console.log(res.data.data);
        const { companyInfo } = res.data.data;
        if (companyInfo) {
          setVenderName(companyInfo.companyName);
          setvenderaddress(companyInfo.address);
        }
        setvendercontact(res.data.data.mobileNo);
        if (res.data.data.document && res.data.data.document.logo) {
          getVenderPic();
        }
      }
    });
  };

  const getVenderPic = async () => {
    await axios({
      method: "POST",
      url: ROUTES.BASELINK + "/vendor/download",
      responseType: "blob",
      data: {
        userId: vendorId,
        fileName: "logo",
      },
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      console.log(res.data);
      const imageObjectURL = URL.createObjectURL(res.data);
      console.log(imageObjectURL);
      setLogo(imageObjectURL);
      console.log("imageObjectURL", imageObjectURL);
    });
  };

  const calculateGrossCost = () => {
    let cost = 0;
    if (singleTotalcost) {
      cost = cost + singleTotalcost;
    }
    if (doubleTotalcost) {
      cost = cost + doubleTotalcost;
    }
    if (tripleTotalcost) {
      cost = cost + tripleTotalcost;
    }
    if (extraTotalcost) {
      cost = cost + extraTotalcost;
    }
    if (childWithBedTotalcost) {
      cost = cost + childWithBedTotalcost;
    }
    if (childWithNoBedTotalcost) {
      cost = cost + childWithNoBedTotalcost;
    }
    if (infantTotalcost) {
      cost = cost + infantTotalcost;
    }
    setgrossCost(cost);
    return cost;
  };
  const calculateTotalCost = () => {
    let cost = calculateGrossCost();
    if (focCost) {
      cost -= focCost;
    }
    if (discount) {
      setdiscountamount((cost * discount) / 100);
      cost = cost - (cost * discount) / 100;
    }
    if (otherChargeCost) {
      cost = parseInt(cost) + parseInt(otherChargeCost);
    }

    setTotalCost(cost);
    if (taxper) {
      settaxCost((cost * taxper) / 100);
      cost = cost + (cost * taxper) / 100;
    }
    setfinalCost(cost);
  };

  const getClient = async () => {
    await axios({
      method: "post",
      url: ROUTES.BASELINK + `/query/getClient`,
      data: {
        id: queryId,
      },
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.data.data) {
        console.log(res.data.data);
        const { username, address, mobileNo, emailId, panNo, gstNo } =
          res.data.data;
        setclientName(username);
        setclientaddress(address);
        setclientcontact(mobileNo);
        setclientemail(emailId);
        setclientpan(panNo);
        setclientgst(gstNo);
      }
    });
  };

  useEffect(() => {
    getDetails();
    if (user_role === "client") {
      getCompanyPic();
      getClient();
    } else {
      getVender();
    }
    getCompanyInfo();
  }, []);

  useEffect(() => {
    calculateGrossCost();
    calculateTotalCost();
  }, [
    grossCost,
    finalCost,
    totalCost,
    singleTotalcost,
    doubleTotalcost,
    tripleTotalcost,
    childWithBedTotalcost,
    childWithNoBedTotalcost,
    infantTotalcost,
    extraTotalcost,
    focCost,
    taxCost,
    discount,
    otherChargeCost,
  ]);

  return (
    <div className={style.home}>
      <Loading Loading={loading}></Loading>
      <div className={style.head}>
        <div className={style.headleft}>
          {logo !== "" && <img src={logo} alt="logo"></img>}
          <div>
            <h3>{vendername}</h3>
          </div>
        </div>
        <div className={style.headright}>
          <input type="text" readOnly value={vendername}></input>
          <input type="text" readOnly value={venderaddress}></input>
          <input type="text" readOnly value={vendercontact}></input>
        </div>
      </div>
      <div className={style.invoice}>
        <strong>Invoice No: {queryNo}</strong>
        <div>INVOICE</div>
        <strong>{invoiceDate}</strong>
      </div>
      <div className={style.resRow1}>
        <div className={style.resCol}>
          <span className={style.resCol1}>Travel Date</span>
          <span className={style.resCol2}> : </span>
          <span className={style.resCol3}>
            <strong>{destination[0].checkIn} </strong>
          </span>
        </div>
        <div className={`${style.resCol} ${style.org}`}>
          <span className={style.resCol1}>Company Name</span>
          <span className={style.resCol2}> : </span>
          <span className={style.resCol3}>
            <strong>{clientname}</strong>
          </span>
        </div>
        <div className={style.resCol}>
          <span className={style.resCol1}>Address</span>
          <span className={style.resCol2}> : </span>
          <span className={style.resCol3}>
            <strong>{clientaddress}</strong>
          </span>
        </div>
        <div className={`${style.resCol} ${style.org}`}>
          <span className={style.resCol1}>Client Name</span>
          <span className={style.resCol2}> : </span>
          <span className={style.resCol3}>
            <strong>{guestName} </strong>
          </span>
        </div>
        <div className={style.resCol}>
          <span className={style.resCol1}>Email ID</span>
          <span className={style.resCol2}> : </span>
          <span className={style.resCol3}>
            <input type="text" name="desremark" value={clientemail} readOnly />
          </span>
        </div>
        <div className={`${style.resCol} ${style.org}`}>
          <span className={style.resCol1}>Mobile No</span>
          <span className={style.resCol2}> : </span>
          <span className={style.resCol3}>
            <input
              type="text"
              name="desremark"
              readOnly
              value={clientcontact}
            />
          </span>
        </div>
        <div className={style.resCol}>
          <span className={style.resCol1}>GST No</span>
          <span className={style.resCol2}> : </span>
          <span className={style.resCol3}>
            <input type="text" name="desremark" readOnly value={clientgst} />
          </span>
        </div>
        <div className={`${style.resCol} ${style.org}`}>
          <span className={style.resCol1}>PAN No</span>
          <span className={style.resCol2}> : </span>
          <span className={style.resCol3}>
            <input type="text" name="desremark" readOnly value={clientpan} />
          </span>
        </div>
      </div>
      <div className={`row ${style.rowCheck}`}>
        <div className="col">Check In</div>
        <div className="col">Check Out</div>
        <div className="col">Destination</div>
        <div className="col">Passenger Name</div>
      </div>
      {destination.map((data) => {
        return (
          <div className={`row ${style.rowCheckData}`}>
            <div className="col">{data.checkIn}</div>
            <div className="col">{data.checkOut}</div>
            <div className="col">{data.city}</div>
            <div className="col">{guestName}</div>
          </div>
        );
      })}

      <div className={style.costName}>Costing</div>
      <div className={style.costRow}>
        <div className={style.costCol1}>
          <Table bordered>
            <thead>
              <tr className={style.trh}>
                <th className={style.th}>Single</th>
                <th className={style.th}>Double</th>
                <th className={style.th}>Triple</th>
                <th className={style.th}>Extra Bed</th>
                <th className={style.th}>Child with Bed</th>
                <th className={style.th}>Child No Bed</th>
                <th className={style.th}>Infant</th>
              </tr>
            </thead>
            <tbody>
              <tr className={style.tr}>
                <td className={style.td}>
                  <p>{single}</p>
                </td>
                <td className={style.td}>
                  <p>{double}</p>
                </td>
                <td className={style.td}>
                  <p>{triple}</p>
                </td>
                <td className={style.td}>
                  <p>{extra}</p>
                </td>
                <td className={style.td}>
                  <p>{childWithBed}</p>
                </td>
                <td className={style.td}>
                  <p>{childWithNoBed}</p>
                </td>
                <td className={style.td}>
                  <p>{infant}</p>
                </td>
              </tr>
              <tr className={style.tr}>
                <td className={style.td}>
                  <p>{singlecost}</p>
                </td>
                <td className={style.td}>
                  <p>{doublecost}</p>
                </td>
                <td className={style.td}>
                  <p>{triplecost}</p>
                </td>
                <td className={style.td}>
                  <p>{extracost}</p>
                </td>
                <td className={style.td}>
                  <p>{childWithBedcost}</p>
                </td>
                <td className={style.td}>
                  <p>{childWithNoBedcost}</p>
                </td>
                <td className={style.td}>
                  <p>{infantcost}</p>
                </td>
              </tr>
              <tr className={style.tr}>
                <td className={style.td}>
                  <p>{singleTotalcost}</p>
                </td>
                <td className={style.td}>
                  <p>{doubleTotalcost}</p>
                </td>
                <td className={style.td}>
                  <p>{tripleTotalcost}</p>
                </td>
                <td className={style.td}>
                  <p>{extraTotalcost}</p>
                </td>
                <td className={style.td}>
                  <p>{childWithBedTotalcost}</p>
                </td>
                <td className={style.td}>
                  <p>{childWithNoBedTotalcost}</p>
                </td>
                <td className={style.td}>
                  <p>{infantTotalcost}</p>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
        <div className={style.costCol2}>
          <div className={style.costCol2name}>Gross Amount</div>
          <p className={style.gross}>{grossCost}</p>
          <div className={style.othercost}>
            <div className={style.othercostRow}>
              <input type="text" readOnly value="FOC"></input>
              <input
                type="number"
                placeholder="Cost"
                className={style.othercostRowinput}
                value={focCost}
              ></input>
            </div>
            <div className={style.othercostRow}>
              <div className={style.othercostRow1}>
                <input type="text" value="Discount" readOnly></input>
                <input type="number" placeholder="%" value={discount}></input>
              </div>
              <input
                type="number"
                placeholder="Cost"
                className={style.othercostRowinput}
                value={discountamount}
              ></input>
            </div>
            <div className={style.othercostRow}>
              <input
                type="text"
                placeholder="Other Charge Name"
                value={otherCharge}
              ></input>
              <input
                type="number"
                placeholder="Cost"
                className={style.othercostRowinput}
                value={otherChargeCost}
              ></input>
            </div>
            <div className={style.othercostRow}>
              <input type="text" value="Total Amount"></input>
              <input
                type="number"
                placeholder="Cost"
                className={style.othercostRowinput}
                value={totalCost}
              ></input>
            </div>
            <div className={style.othercostRow}>
              <div className={style.othercostRow1}>
                <input type="text" placeholder="Tax Name" value={tax}></input>
                <input type="number" placeholder="%" value={taxper}></input>
              </div>
              <input
                type="number"
                placeholder="Cost"
                value={taxCost}
                className={style.othercostRowinput}
              ></input>
            </div>
            <div className={style.othercostRow}>
              <input type="text" placeholder="Cost" value="Net Payable"></input>
              <input
                type="number"
                placeholder="Cost"
                className={style.othercostRowinput}
                value={finalCost}
                style={{ fontWeight: "700" }}
              ></input>
            </div>
          </div>
        </div>
      </div>
      <div className={style.border}></div>
    </div>
  );
}

export default Invoice;
