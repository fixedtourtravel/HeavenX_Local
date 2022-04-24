import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button, Table, Form } from "react-bootstrap";
import AddBoxIcon from "@mui/icons-material/AddBox";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import Loading from "../../../pages/Loading";
import style from "./Reply.module.css";
import * as ROUTES from "../../../constants/routes";
import { Input } from "reactstrap";

function Reply() {
  const [replyId, setReplyId] = useState("");
  const [vendorSend, setvendorSend] = useState(false);
  const [clientSend, setclientSend] = useState(false);
  const [clientEmail, setclientEmail] = useState("");
  const [vendorEmail, setvendorEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState([]);
  const [place, setPlace] = useState([]);
  const [transport, setTransport] = useState([]);
  const [meal, setmeal] = useState([]);
  const [mode, setMode] = useState([]);
  const [Tax, setTax] = useState([]);
  const [currTax, setcurrTax] = useState([]);
  const [allCity, setAllCity] = useState([[]]);
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
  const [pickDrop, setPickDrop] = useState([
    {
      pickUp: "",
      pickLocation: "",
      drop: "",
      dropLocation: "",
    },
  ]);
  const [pickStation, setpickStation] = useState([[]]);
  const [dropStation, setdropStation] = useState([[]]);
  const [totalRooms, setTotalRooms] = useState(0);
  const [singleD, setSingleD] = useState(0);
  const [doubleD, setDoubleD] = useState(0);
  const [tripleD, setTripleD] = useState(0);
  const [childWithBedD, setchildWithBedD] = useState(0);
  const [childWithNoBedD, setchildWithNoBedD] = useState(0);
  const [extraD, setExtraD] = useState(0);

  const [totalMeal, setTotalMeal] = useState(0);
  const [lunch, setlunch] = useState(0);
  const [breakfast, setBreakfast] = useState(0);
  const [dinner, setdinner] = useState(0);
  const [totalPassenger, settotalPassenger] = useState(0);
  const [adult, setadult] = useState(0);
  const [child, setchild] = useState(0);
  const [infantPas, setinfantPas] = useState(0);
  const [inclusion, setInclusion] = useState([""]);
  const [exclusion, setExclusion] = useState([""]);
  const [importantNote, setImportantNote] = useState([""]);
  const [termsCondition, setTermsCondition] = useState([""]);
  const [remark, setRemark] = useState([""]);
  const [itinerary, setItinerary] = useState([
    {
      location: "",
      time: "",
      details: "",
    },
  ]);
  const [single, setSingle] = useState("");
  const [double, setDouble] = useState("");
  const [triple, setTriple] = useState("");
  const [childWithBed, setchildWithBed] = useState("");
  const [childWithNoBed, setchildWithNoBed] = useState("");
  const [extra, setExtra] = useState("");
  const [infant, setinfant] = useState("");
  const [foc, setfoc] = useState();
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
  const [additionalNote, setAdditionalNote] = useState();
  const [minDate, setminDate] = useState("");
  const [queryCountry, setqueryCountry] = useState("");
  const [commission, setCommission] = useState(0);
  const [ClientfinalCost, setClientfinalCost] = useState();
  const [vendorCode, setvendorCode] = useState();

  const { user_role, queryId, vendorId } = useParams();

  const getReplyDetails = async () => {
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
        const { detail, instruction, commission, uniqueCode } = res.data.data;
        if (detail._id) {
          setReplyId(detail._id);
        }
        setclientEmail(detail.clientEmail);
        setvendorEmail(detail.vendorEmail);
        initialValues(detail, instruction);
        setDetails(detail);
        setPlace(instruction.place);
        setTransport(instruction.transport);
        setMode(instruction.mode);
        setmeal(instruction.meal);
        setminDate(detail.queryCheckIn);
        setqueryCountry(detail.queryCountry);
        setCommission(commission);
        setTax(instruction.tax);
        setvendorCode(uniqueCode);
      })
      .catch((err) => {
        console.log("error in fetching quries", err);
      });
    setLoading(false);
  };

  const initialValues = (detail, instruction) => {
    if (detail.destination) {
      setDestination(detail.destination);
      let city = [];
      let dest = detail.destination;
      for (let i = 0; i < dest.length; i++) {
        let p = instruction.place;
        for (let j = 0; j < p.length; j++) {
          if (dest[i].country === p[j].country.name) {
            city.push(p[j].city);
            break;
          }
        }
      }
      setAllCity(city);
      let t = [];
      for (let i = 0; i < Tax.length; i++) {
        let c = Tax[i].country;
        for (let j = 0; j < c.length; j++) {
          if (c[j].label.toUpperCase() === dest[0].country.toUpperCase()) {
            t.push(Tax[i]);
            break;
          }
        }
      }
      setcurrTax(t);
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
      setClientfinalCost(room.ClientfinalCost);
    }

    if (detail.roomsDetail) {
      const room = detail.roomsDetail;
      setTotalRooms(room.total);
      setSingleD(room.single);
      setDoubleD(room.double);
      setTripleD(room.triple);
      setExtraD(room.extra);
      setchildWithBedD(room.childWithBed);
      setchildWithNoBedD(room.childWithNoBed);
    }
    if (detail.pickDrop) {
      setPickDrop(detail.pickDrop);
      let ps = [],
        ds = [];
      for (let i = 0; i < detail.pickDrop.length; i++) {
        let mode = detail.pickDrop[i].pickUp;
        let country = detail.destination[i].country;
        let city = detail.destination[i].city;
        let station = instruction.transport;
        for (let j = 0; j < station.length; j++) {
          if (
            station[j].country === country &&
            station[j].mode === mode &&
            station[j].city === city
          ) {
            ps.push(station[j].station);
            break;
          }
        }
        mode = detail.pickDrop[i].drop;
        for (let j = 0; j < station.length; j++) {
          if (
            station[j].country === country &&
            station[j].mode === mode &&
            station[j].city === city
          ) {
            ds.push(station[j].station);
            break;
          }
        }
      }
      setpickStation(ps);
      setdropStation(ds);
    }
    if (detail.meal) {
      let meal = detail.meal;
      setTotalMeal(meal.total);
      setlunch(meal.lunch);
      setdinner(meal.dinner);
      setBreakfast(meal.breakFast);
    }
    if (detail.passenger) {
      let p = detail.passenger;
      settotalPassenger(p.total);
      setadult(p.adult);
      setchild(p.child);
      setinfantPas(p.infant);
    }
    if (detail.inclusion) {
      if (detail.inclusion.length) {
        setInclusion(detail.inclusion);
      }
    }
    if (detail.exclusion) {
      if (detail.exclusion.length) {
        setExclusion(detail.exclusion);
      }
    }
    if (detail.importantNote) {
      if (detail.importantNote.length) {
        setImportantNote(detail.importantNote);
      }
    }
    if (detail.termsCondition) {
      if (detail.termsCondition.length) {
        setTermsCondition(detail.termsCondition);
      }
    }
    if (detail.remark) {
      if (detail.remark.length) {
        setRemark(detail.remark);
      }
    }
    if (detail.itinerary) {
      if (detail.itinerary.length) {
        setItinerary(detail.itinerary);
      }
    }
    if (detail.additionalNote) {
      setAdditionalNote(detail.additionalNote);
    }

    setvendorSend(detail.vendorSend);
    setclientSend(detail.clientSend);
    calculateGrossCost();
    calculateClientCost();
  };

  const refresh = () => {
    setDestination([
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
    document.getElementById("country0").value = "initial";
    document.getElementById("city0").value = "initial";
    document.getElementById("pickUp").value = "initial";
    document.getElementById("drop").value = "initial";

    setAllCity([[]]);
    setSingle("");
    setDouble("");
    setTriple("");
    setExtra("");
    setchildWithBed("");
    setchildWithNoBed("");
    setfoc("");
    setotherCharge("");
    setdiscount("");
    settaxper("");
    settax("");
    settaxCost("");
    setSinglecost("");
    setDoublecost("");
    setTriplecost("");
    setExtracost("");
    setchildWithBedcost("");
    setchildWithNoBedcost("");
    setotherChargeCost("");
    setfocCost("");
    setTotalRooms("");
    setSingleD("");
    setDoubleD("");
    setTripleD("");
    setExtraD("");
    setchildWithBedD("");
    setchildWithNoBedD("");
    setTotalCost("");
    setgrossCost("");
    setPickDrop([
      {
        pickUp: "",
        pickLocation: "",
        drop: "",
        dropLocation: "",
      },
    ]);
    setpickStation([[]]);
    setdropStation([[]]);
    setTotalMeal("");
    setlunch("");
    setdinner("");
    settotalPassenger("");
    setadult("");
    setchild("");
    setinfantPas("");
    setInclusion([""]);
    setExclusion([""]);
    setImportantNote([""]);
    setTermsCondition([""]);
    setRemark([""]);
    setItinerary([
      {
        location: "",
        time: "",
        details: "",
      },
    ]);
    setAdditionalNote("");
    setSingleTotalcost("");
    setDoubleTotalcost("");
    setTripleTotalcost("");
    setExtraTotalcost("");
    setchildWithBedTotalcost("");
    setchildWithNoBedTotalcost("");
    setInfantTotalcost("");
    setfinalCost("");
    setdiscountamount("");
  };

  const handleDestination = (e, i) => {
    let { name, value } = e.target;
    const list = [...destination];
    list[i][name] = value;
    setDestination(list);
    if (list[i]["checkIn"] !== "" && list[i]["checkOut"] !== "") {
      list[i]["nights"] = calculateNight(
        list[i]["checkIn"],
        list[i]["checkOut"]
      );
    }
  };

  function calculateNight(date1, date2) {
    const Date1 = new Date(date1);
    const Date2 = new Date(date2);
    const diffTime = Math.abs(Date1 - Date2);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }

  const handlesetCountry = (e, index) => {
    let id = "country" + index;
    let x = document.getElementById(id).value;
    let ans = [];
    for (let i = 0; i < place.length; i++) {
      if (place[i].country.name === x) {
        ans = place[i].city;
        break;
      }
    }
    document.getElementById(`city${index}`).value = "initial";
    let c = [...allCity];
    c[index] = ans;
    c.push([]);
    setAllCity(c);

    let t = [];
    for (let i = 0; i < Tax.length; i++) {
      let c = Tax[i].country;
      for (let j = 0; j < c.length; j++) {
        if (c[j].label.toUpperCase() === x.toUpperCase()) {
          t.push(Tax[i]);
          break;
        }
      }
    }
    setcurrTax(t);
  };

  const handleAddDesti = (i) => {
    const list = [...destination];
    if (list[i].checkIn === "") {
      alert("Please fill Check In");
      return;
    }
    if (list[i].checkOut === "") {
      alert("Please fill checkOut ");
      return;
    }
    if (list[i].country === "") {
      alert("Please fill country");
      return;
    }
    if (list[i].city === "") {
      alert("Please fill city");
      return;
    }
    if (list[i].hotelName === "") {
      alert("Please fill hotelName");
      return;
    }
    if (list[i].roomType === "") {
      alert("Please fill roomType");
      return;
    }
    if (list[i].mealType === "") {
      alert("Please fill mealType");
      return;
    }
    list.push({
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
      remark: "",
      contactNo: "",
      confirmation: "",
    });
    setAllCity([...allCity, []]);
    setDestination(list);
  };

  const handleRemoveDesti = (i) => {
    let list = [...destination];
    list.splice(i, 1);
    let city = [...allCity];
    city.splice(i, 1);
    setAllCity(city);
    setDestination(list);
  };

  const handlePickDrop = (e, i) => {
    const { name, value } = e.target;
    const list = [...pickDrop];
    list[i][name] = value;
    setPickDrop(list);
  };

  const handlePick = (e, index) => {
    const country = destination[index].country;
    const city = destination[index].city;
    const mode = e.target.value;
    let station = [...pickStation];
    let ok = true;
    for (let i = 0; i < transport.length; i++) {
      if (
        transport[i].country === country &&
        transport[i].city === city &&
        transport[i].mode === mode
      ) {
        station[index] = transport[i].station;
        ok = false;
        break;
      }
    }
    if (ok) {
      station[index] = [];
    }
    document.getElementById(`pickLocation${index}`).value = "initial";
    setpickStation(station);
  };

  const handleDrop = (e, index) => {
    const country = destination[index].country;
    const city = destination[index].city;
    const mode = e.target.value;
    let station = [...dropStation];
    let ok = true;
    for (let i = 0; i < transport.length; i++) {
      if (
        transport[i].country === country &&
        transport[i].city === city &&
        transport[i].mode === mode
      ) {
        station[index] = transport[i].station;
        ok = false;
        break;
      }
    }
    document.getElementById(`dropLocation${index}`).value = "initial";
    if (ok) {
      station[index] = [];
    }
    setdropStation(station);
  };

  const handleAddPickDrop = (i) => {
    if (pickDrop[i].pickUp === "") {
      alert("Please add pickup");
      return;
    }
    if (pickDrop[i].pickLocation === "") {
      alert("Please add pickLocation");
      return;
    }
    if (pickDrop[i].drop === "") {
      alert("Please add drop up");
      return;
    }
    if (pickDrop[i].dropLocation === "") {
      alert("Please add dropLocation");
      return;
    }
    if (destination.length <= i + 1) {
      alert("Add more destination to add more pickup");
      return;
    }
    setPickDrop([
      ...pickDrop,
      {
        pickUp: "",
        pickLocation: "",
        drop: "",
        dropLocation: "",
      },
    ]);

    setpickStation([...pickStation, []]);
    setdropStation([...dropStation, []]);
  };

  const handleDelPickDrop = (i) => {
    if (i === pickStation.length - 1) {
      return;
    }
    let pick = [...pickStation];
    pick.slice(i, 1);

    let drop = [...dropStation];
    drop.slice(i, 1);

    let pickdrop = [...pickDrop];
    pickdrop.slice(i, 1);
  };

  const handleAddTextMultiLine = (e, List, setList) => {
    let c = [...List];
    if (e.key === "Enter") {
      if (c[c.length - 1] === "") {
        alert("please fill 1st then enter for new line");
        return;
      }
      c.push("");
    }
    setList(c);
  };

  const handleTextMultiLine = (e, i, List, setList) => {
    const list = [...List];
    list[i] = e.target.value;
    setList(list);
  };

  const handleItinerary = (e, i) => {
    const { name, value } = e.target;
    let list = [...itinerary];
    list[i][name] = value;
    setItinerary(list);
  };

  const handleAddItinerary = (i) => {
    let list = [...itinerary];
    if (list[i].location === "") {
      alert("Please fill location");
      return;
    }
    if (list[i].time === "") {
      alert("Please fill time");
      return;
    }
    if (list[i].details === "") {
      alert("Please fill detail");
      return;
    }
    list.push({
      location: "",
      time: "",
      details: "",
    });
    setItinerary(list);
  };

  const handleDelItinerary = (i) => {
    let list = [...itinerary];
    list.splice(i, 1);
    setItinerary(list);
  };

  const calculateIndividualCost = (no, cost, total) => {
    if (no !== "" && cost !== "") {
      total(no * cost);
    }
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

  const checkRequiredField = () => {
    for (let i = 0; i < destination.length; i++) {
      if (destination[i].checkIn === "") {
        alert("Please fill checkin");
        return true;
      }
      if (destination[i].checkOut === "") {
        alert("Please fill checkOut");
        return true;
      }
      if (destination[i].country === "") {
        alert("Please fill country");
        return true;
      }
      if (destination[i].city === "") {
        alert("Please fill city");
        return true;
      }
      if (destination[i].hotelName === "") {
        alert("Please fill hotelName");
        return true;
      }
      if (destination[i].roomType === "") {
        alert("Please fill roomType");
        return true;
      }
      if (destination[i].mealType === "") {
        alert("Please fill mealType");
        return true;
      }
      if (destination[i].address === "") {
        alert("Please fill address");
        return true;
      }
      if (destination[i].reservationNo === "") {
        alert("Please fill reservationNo");
        return true;
      }
      if (destination[i].desremark === "") {
        alert("Please fill remark in destination", i);
        return true;
      }
      if (destination[i].contactNo === "") {
        alert("Please fill contactNo");
        return true;
      }
      if (destination[i].confirmation === "") {
        alert("Please fill confirmation");
        return true;
      }
    }
    if (totalRooms === "") {
      alert("Please fill totalRooms");
      return true;
    }

    if (singleD === "") {
      alert("Please fill single room");
      return true;
    }
    if (doubleD === "") {
      alert("Please fill double room");
      return true;
    }
    if (tripleD === "") {
      alert("Please fill triple room");
      return true;
    }
    if (extraD === "") {
      alert("Please fill extra room");
      return true;
    }
    if (childWithBedD === "") {
      alert("Please fill childWithBed room");
      return true;
    }
    if (childWithNoBedD === "") {
      alert("Please fill childWithNoBed room");
      return true;
    }
    if (single === "") {
      alert("Please fill single room in cost section");
      return true;
    }
    if (double === "") {
      alert("Please fill double room in cost section");
      return true;
    }
    if (triple === "") {
      alert("Please fill triple room in cost section");
      return true;
    }
    if (extra === "") {
      alert("Please fill extra room in cost section");
      return true;
    }
    if (childWithBed === "") {
      alert("Please fill childWithBed room in cost section");
      return true;
    }
    if (childWithNoBed === "") {
      alert("Please fill childWithNoBed room in cost section");
      return true;
    }
    if (infant === "") {
      alert("Please fill infant room in cost section");
      return true;
    }
    if (singlecost === "") {
      alert("Please fill cost of single room");
      return true;
    }
    if (doublecost === "") {
      alert("Please fill cost of double room ");
      return true;
    }
    if (triplecost === "") {
      alert("Please fill cost of triple room ");
      return true;
    }
    if (extracost === "") {
      alert("Please fill cost of extra room ");
      return true;
    }
    if (childWithBedcost === "") {
      alert("Please fill cost of childWithBed room");
      return true;
    }
    if (childWithNoBedcost === "") {
      alert("Please fill cost of childWithNoBed room");
      return true;
    }
    if (infantcost === "") {
      alert("Please fill cost of infant room ");
      return true;
    }

    for (let i = 0; i < pickDrop.length; i++) {
      if (pickDrop[i].pickUp === "") {
        alert("please fill pickup ");
        return true;
      }
      if (pickDrop[i].pickLocation === "") {
        alert("please fill pickup Location");
        return true;
      }
      if (pickDrop[i].drop === "") {
        alert("please fill drop in");
        return true;
      }
      if (pickDrop[i].pickUp === "") {
        alert("please fill drop Location");
        return true;
      }
    }
    if (totalMeal === "") {
      alert("please fill total Meal");
      return true;
    }
    if (breakfast === "") {
      alert("please fill breakfast");
      return true;
    }
    if (lunch === "") {
      alert("please fill lunch");
      return true;
    }
    if (dinner === "") {
      alert("please fill dinner");
      return true;
    }
    if (totalPassenger === "") {
      alert("please fill totalPassenger");
      return true;
    }
    if (adult === "") {
      alert("please fill adult");
      return true;
    }
    if (child === "") {
      alert("please fill child");
      return true;
    }
    if (infant === "") {
      alert("please fill infant");
      return true;
    }
    if (inclusion[0].length === 0) {
      alert("please fill inclusion");
      return true;
    }
    if (exclusion[0].length === 0) {
      alert("please fill exclusion");
      return true;
    }
    if (foc === "") {
      alert("please fill FOC");
      return true;
    }
    if (focCost === "") {
      alert("please fill FOC cost");
      return true;
    }
    if (discount === "") {
      alert("please fill discount percentage");
      return true;
    }
    if (otherCharge === "") {
      alert("please fill otherCharge name");
      return true;
    }
    if (otherChargeCost === "") {
      alert("please fill otherCharge cost");
      return true;
    }
    if (tax === "") {
      alert("please fill Tax name");
      return true;
    }
    if (taxper === "") {
      alert("please fill tax percentage");
      return true;
    }
    if (taxCost === "") {
      alert("please fill tax cost");
      return true;
    }

    return false;
  };

  const handleSave = async () => {
    setLoading(true);
    await axios({
      method: "post",
      url: ROUTES.BASELINK + "/vendor/reply/saveDraft",
      data: {
        id: replyId,
        details: {
          clientEmail: clientEmail,
          vendorEmail: vendorEmail,
          vendorCode,
          queryId: queryId,
          queryNo: details.queryNo,
          vendorId: vendorId,
          queryType: details.queryType,
          guestName: details.guestName,
          destination: destination,
          roomsDetail: {
            total: totalRooms,
            single: singleD,
            double: doubleD,
            triple: tripleD,
            extra: extraD,
            childWithBed: childWithBedD,
            childWithNoBed: childWithNoBedD,
          },
          CostDetail: {
            single: { no: single, cost: singlecost },
            double: { no: double, cost: doublecost },
            triple: { no: triple, cost: triplecost },
            extra: { no: extra, cost: extracost },
            childWithBed: { no: childWithBed, cost: childWithBedcost },
            childWithNoBed: { no: childWithNoBed, cost: childWithNoBedcost },
            infant: { no: infant, cost: infantcost },
            foc: { no: foc, cost: focCost },
            otherCharge: { name: otherCharge, cost: otherChargeCost },
            tax: { name: tax, taxpercent: taxper, cost: taxCost },
            discount: discount,
            discountCost: discountamount,
            totalCost: totalCost,
            finalCost: finalCost,
          },
          pickDrop: pickDrop,
          meal: {
            total: totalMeal,
            breakFast: breakfast,
            lunch: lunch,
            dinner: dinner,
          },
          passenger: {
            total: totalPassenger,
            adult: adult,
            child: child,
            infant: infantPas,
          },
          inclusion: inclusion,
          exclusion: exclusion,
          importantNote: importantNote,
          termsCondition: termsCondition,
          remark: remark,
          itinerary: itinerary,
          additionalNote: additionalNote,
          vendorSend: vendorSend,
          clientSend: clientSend,
          queryCountry: queryCountry,
          queryCheckIn: minDate,
          commission: commission,
        },
      },
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => {
        initialValues(res.data.data.detail, res.data.data.instruct);
        setReplyId(res.data.data.id);
        setminDate(res.data.data.detail.queryCheckIn);
        setqueryCountry(res.data.data.detail.queryCountry);
        alert(res.data.message);
      })
      .catch((err) => {
        console.log("error in fetching quries", err);
      });
    setLoading(false);
  };

  const calculateClientCost = () => {
    let sC, dC, tC, eC, cC, CnC, iC;
    let com = parseInt(commission);
    console.log("com", com);
    sC = parseInt(singlecost) + (parseInt(singlecost) * com) / 100;
    dC = parseInt(doublecost) + (parseInt(doublecost) * com) / 100;
    tC = parseInt(triplecost) + (parseInt(triplecost) * com) / 100;
    eC = parseInt(extracost) + (parseInt(extracost) * com) / 100;
    iC = parseInt(infantcost) + (parseInt(infantcost) * com) / 100;
    cC = parseInt(childWithBedcost) + (parseInt(childWithBedcost) * com) / 100;
    CnC =
      parseInt(childWithNoBedcost) + (parseInt(childWithNoBedcost) * com) / 100;

    let grcost = 0;
    grcost += parseInt(single) * sC;
    grcost += parseInt(double) * dC;
    grcost += parseInt(triple) * tC;
    grcost += parseInt(extra) * eC;
    grcost += parseInt(childWithBed) * cC;
    grcost += parseInt(childWithBed) * CnC;
    grcost += parseInt(infant) * iC;
    grcost -= parseInt(focCost);
    grcost -= (parseInt(grcost) * parseInt(discount)) / 100;
    grcost += parseInt(otherChargeCost);
    grcost = grcost + (grcost * parseInt(taxper)) / 100;
    setClientfinalCost(grcost);
    console.log("grcost", grcost);
  };

  const handleSend = async () => {
    if (checkRequiredField()) {
      return;
    }
    setLoading(true);

    await axios({
      method: "post",
      url: ROUTES.BASELINK + "/vendor/reply/send",
      data: {
        replyId: replyId,
        role: user_role,
        details: {
          clientEmail: clientEmail,
          vendorEmail: vendorEmail,
          vendorCode,
          queryId: queryId,
          queryNo: details.queryNo,
          vendorId: vendorId,
          queryType: details.queryType,
          guestName: details.guestName,
          destination: destination,
          roomsDetail: {
            total: totalRooms,
            single: singleD,
            double: doubleD,
            triple: tripleD,
            extra: extraD,
            childWithBed: childWithBedD,
            childWithNoBed: childWithNoBedD,
          },
          CostDetail: {
            single: { no: single, cost: singlecost },
            double: { no: double, cost: doublecost },
            triple: { no: triple, cost: triplecost },
            extra: { no: extra, cost: extracost },
            childWithBed: { no: childWithBed, cost: childWithBedcost },
            childWithNoBed: { no: childWithNoBed, cost: childWithNoBedcost },
            infant: { no: infant, cost: infantcost },
            foc: { no: foc, cost: focCost },
            otherCharge: { name: otherCharge, cost: otherChargeCost },
            tax: { name: tax, taxpercent: taxper, cost: taxCost },
            discount: discount,
            discountCost: discountamount,
            totalCost: totalCost,
            finalCost: finalCost,
            ClientfinalCost: ClientfinalCost,
          },
          pickDrop: pickDrop,
          meal: {
            total: totalMeal,
            breakFast: breakfast,
            lunch: lunch,
            dinner: dinner,
          },
          passenger: {
            total: totalPassenger,
            adult: adult,
            child: child,
            infant: infantPas,
          },
          inclusion: inclusion,
          exclusion: exclusion,
          importantNote: importantNote,
          termsCondition: termsCondition,
          remark: remark,
          itinerary: itinerary,
          additionalNote: additionalNote,
          vendorSend: vendorSend,
          clientSend: clientSend,
          queryCountry: queryCountry,
          queryCheckIn: minDate,
          commission: commission,
        },
      },
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => {
        initialValues(res.data.data.detail, res.data.data.instruct);
        setReplyId(res.data.data.replyId);
        setminDate(res.data.data.detail.queryCheckIn);
        setqueryCountry(res.data.data.detail.queryCountry);
        alert(res.data.message);
      })
      .catch((err) => {
        console.log("error in fetching quries", err);
      });
    setLoading(false);
  };

  const CalTotalRooms = (name, val) => {
    let rooms = 0;
    if (name === "singleD") {
      rooms = parseInt(rooms) + parseInt(val);
      rooms = parseInt(rooms) + parseInt(doubleD);
      rooms = parseInt(rooms) + parseInt(tripleD);
    } else if (name === "doubleD") {
      rooms = parseInt(rooms) + val;
      rooms = parseInt(rooms) + parseInt(singleD);
      rooms = parseInt(rooms) + parseInt(tripleD);
    } else if (name === "tripleD") {
      rooms = parseInt(rooms) + val;
      rooms = parseInt(rooms) + parseInt(singleD);
      rooms = parseInt(rooms) + parseInt(doubleD);
    }
    setTotalRooms(rooms);
  };

  const CaltotalMeal = (name, val) => {
    let meal = 0;
    if (name === "breakfast") {
      meal = parseInt(meal) + parseInt(val);
      meal = parseInt(meal) + parseInt(lunch);
      meal = parseInt(meal) + parseInt(dinner);
    } else if (name === "lunch") {
      meal = parseInt(meal) + parseInt(val);
      meal = parseInt(meal) + parseInt(breakfast);
      meal = parseInt(meal) + parseInt(dinner);
    } else if (name === "dinner") {
      meal = parseInt(meal) + parseInt(val);
      meal = parseInt(meal) + parseInt(lunch);
      meal = parseInt(meal) + parseInt(breakfast);
    }
    setTotalMeal(meal);
  };

  const CaltotalPass = (name, val) => {
    let pass = 0;
    if (name === "adult") {
      pass = parseInt(pass) + parseInt(val);
      pass = parseInt(pass) + parseInt(infantPas);
      pass = parseInt(pass) + parseInt(child);
    } else if (name === "child") {
      pass = parseInt(pass) + parseInt(val);
      pass = parseInt(pass) + parseInt(adult);
      pass = parseInt(pass) + parseInt(infantPas);
    } else if (name === "infant") {
      pass = parseInt(pass) + parseInt(val);
      pass = parseInt(pass) + parseInt(adult);
      pass = parseInt(pass) + parseInt(child);
    }
    settotalPassenger(pass);
  };

  useEffect(() => {
    getReplyDetails();
  }, []);

  useEffect(() => {
    calculateGrossCost();
    calculateTotalCost();
    calculateClientCost();
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
    taxper,
    commission,
  ]);
  return (
    <div className={style.home}>
      {<Loading Loading={loading} />}

      <div className={style.body}>
        <div className={style.heading}>
          <h2>Vendor Reply</h2>
          <Button href={user_role === "client" ? "/myorders" : "/vendor/home"}>
            Back
          </Button>
        </div>
        <div className={style.query}>
          <div>
            <span className={style.name}>Query No</span>
            <input
              disabled
              className={style.id}
              value={details.queryNo}
            ></input>
          </div>
          <div>
            <span className={style.name}>Guest Name</span>
            <input
              disabled
              className={style.id}
              value={details.guestName}
            ></input>
          </div>
          <div>
            <span className={style.name}>Query Type</span>
            <input
              disabled
              className={style.id}
              value={details.queryType}
            ></input>
          </div>
        </div>
        {destination.map((data, i) => {
          return (
            <div className={style.destination}>
              <div className={style.des}>Destination</div>
              <div className={style.table}>
                <Table bordered responsive="md">
                  <thead>
                    <tr className={style.trh}>
                      <th className={style.th}>Check In</th>
                      <th className={style.th}>Check Out</th>
                      <th className={style.th}>Nights</th>
                      <th className={style.th}>Country</th>
                      <th className={style.th}>City</th>
                      <th className={style.th}>Hotel Name</th>
                      <th className={style.th}>Room Type</th>
                      <th className={style.th}>Meal Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className={style.tr}>
                      <td className={style.td}>
                        <input
                          readOnly={user_role === "client"}
                          type="date"
                          value={data.checkIn}
                          name="checkIn"
                          onChange={(e) => {
                            handleDestination(e, i);
                            setminDate(e.target.value);
                          }}
                          min={minDate ? minDate.substring(0, 10) : ""}
                        ></input>
                      </td>
                      <td className={style.td}>
                        <input
                          readOnly={user_role === "client"}
                          type="date"
                          value={data.checkOut}
                          name="checkOut"
                          onChange={(e) => {
                            handleDestination(e, i);
                            setminDate(e.target.value);
                          }}
                          min={minDate ? minDate.substring(0, 10) : ""}
                        ></input>
                      </td>
                      <td className={style.td}>
                        <input
                          type="t"
                          value={data.nights}
                          name="nights"
                          readOnly
                        ></input>
                      </td>
                      <td className={style.td}>
                        <select
                          id={`country${i}`}
                          name="country"
                          onChange={(e) => {
                            handlesetCountry(e, i);
                            handleDestination(e, i);
                          }}
                          disabled={user_role === "client"}
                        >
                          <option selected disabled hidden value="initial">
                            Choose
                          </option>
                          {place.map((c) => {
                            if (
                              c.country.active &&
                              queryCountry === c.country.name
                            ) {
                              return (
                                <option
                                  value={c.country.name}
                                  selected={
                                    c.country.name === destination[i].country
                                  }
                                >
                                  {c.country.name}
                                </option>
                              );
                            }
                            return <></>;
                          })}
                        </select>
                      </td>
                      <td className={style.td}>
                        <select
                          id={`city${i}`}
                          name="city"
                          onChange={(e) => handleDestination(e, i)}
                          disabled={user_role === "client"}
                        >
                          <option selected disabled hidden value="initial">
                            Choose
                          </option>
                          {allCity.length > i &&
                            allCity[i].map((c) => {
                              if (c.active) {
                                return (
                                  <option
                                    value={c.name}
                                    selected={c.name === destination[i].city}
                                  >
                                    {c.name}
                                  </option>
                                );
                              }
                              return <></>;
                            })}
                          {allCity.length > i && allCity[i].length === 0 && (
                            <option>No City Found</option>
                          )}
                        </select>
                      </td>
                      <td className={style.td}>
                        <input
                          readOnly={user_role === "client"}
                          type="text"
                          name="hotelName"
                          value={data.hotelName}
                          onChange={(e) => {
                            handleDestination(e, i);
                          }}
                        />
                      </td>
                      <td className={style.td}>
                        <input
                          readOnly={user_role === "client"}
                          type="text"
                          name="roomType"
                          value={data.roomType}
                          onChange={(e) => handleDestination(e, i)}
                        />
                      </td>
                      <td className={style.td}>
                        <select
                          id={`meal${i}`}
                          name="mealType"
                          onChange={(e) => {
                            handleDestination(e, i);
                          }}
                          disabled={user_role === "client"}
                        >
                          <option selected disabled hidden value="initial">
                            Choose
                          </option>
                          {meal.map((c) => {
                            if (c.active) {
                              return (
                                <option
                                  value={c.name}
                                  selected={c.name === data.mealType}
                                >
                                  {c.name}
                                </option>
                              );
                            }
                            return <></>;
                          })}
                        </select>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
              {user_role !== "client" && (
                <div style={{ display: "flex" }}>
                  <div onClick={() => handleAddDesti(i)}>
                    {i === destination.length - 1 && (
                      <AddBoxIcon
                        style={{
                          color: "orange",
                          marginTop: "45px",
                          cursor: "pointer",
                        }}
                      />
                    )}
                  </div>
                  <div onClick={() => handleRemoveDesti(i)}>
                    {destination.length !== 1 && (
                      <IndeterminateCheckBoxIcon
                        style={{
                          color: "orange",
                          marginTop: "45px",
                          cursor: "pointer",
                        }}
                      />
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
        <div className={style.destination1}>
          <div className={style.des}>Room Details</div>
          <div className={style.table}>
            <Table bordered responsive="md">
              <thead>
                <tr className={style.trh}>
                  <th className={style.th}>SIngle</th>
                  <th className={style.th}>Double</th>
                  <th className={style.th}>Triple</th>
                  <th className={style.th}>Extra Bed</th>
                  <th className={style.th}>Child with Bed</th>
                  <th className={style.th}>Child No Bed</th>
                  <th className={style.th}>Total Rooms</th>
                </tr>
              </thead>
              <tbody>
                <tr className={style.tr}>
                  <td className={style.td}>
                    <input
                      readOnly={user_role === "client"}
                      type="number"
                      min="0"
                      value={singleD}
                      onChange={(e) => {
                        setSingleD(e.target.value);
                        CalTotalRooms("singleD", e.target.value);
                      }}
                    />
                  </td>
                  <td className={style.td}>
                    <input
                      readOnly={user_role === "client"}
                      type="number"
                      min="0"
                      value={doubleD}
                      onChange={(e) => {
                        setDoubleD(e.target.value);
                        CalTotalRooms("doubleD", e.target.value);
                      }}
                    />
                  </td>

                  <td className={style.td}>
                    <input
                      readOnly={user_role === "client"}
                      type="number"
                      min="0"
                      value={tripleD}
                      onChange={(e) => {
                        setTripleD(e.target.value);
                        CalTotalRooms("tripleD", e.target.value);
                      }}
                    />
                  </td>
                  <td className={style.td}>
                    <input
                      readOnly={user_role === "client"}
                      type="number"
                      min="0"
                      value={extraD}
                      onChange={(e) => {
                        setExtraD(e.target.value);
                      }}
                    />
                  </td>
                  <td className={style.td}>
                    <input
                      readOnly={user_role === "client"}
                      type="number"
                      min="0"
                      value={childWithBedD}
                      onChange={(e) => {
                        setchildWithBedD(e.target.value);
                      }}
                    />
                  </td>
                  <td className={style.td}>
                    <input
                      readOnly={user_role === "client"}
                      type="number"
                      min="0"
                      value={childWithNoBedD}
                      onChange={(e) => {
                        setchildWithNoBedD(e.target.value);
                      }}
                    />
                  </td>
                  <td className={style.td}>
                    <input readOnly type="number" min="0" value={totalRooms} />
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
        {pickDrop.map((data, i) => {
          return (
            <div className={style.destination1}>
              <div className={style.des}>Pickup & Drop Details</div>
              <div className={style.table}>
                <Table bordered responsive="md">
                  <thead>
                    <tr className={style.trh}>
                      <th className={style.th}>Pick Up</th>
                      <th className={style.th}>Location</th>
                      <th className={style.th}>Drop Off</th>
                      <th className={style.th}>Location</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className={style.tr}>
                      <td className={style.td}>
                        <select
                          id={`pickUp`}
                          name="pickUp"
                          onChange={(e) => {
                            handlePickDrop(e, i);
                            handlePick(e, i);
                          }}
                          disabled={user_role === "client"}
                        >
                          <option selected disabled hidden value="initial">
                            Choose
                          </option>
                          {mode.map((c) => {
                            if (!c.active) return <></>;
                            return (
                              <option
                                value={c.name}
                                selected={data.pickUp === c.name}
                              >
                                {c.name}
                              </option>
                            );
                          })}
                        </select>
                      </td>
                      <td className={style.td}>
                        <select
                          id={`pickLocation${i}`}
                          name="pickLocation"
                          onChange={(e) => {
                            handlePickDrop(e, i);
                          }}
                          disabled={user_role === "client"}
                        >
                          <option selected disabled hidden value="initial">
                            Choose
                          </option>
                          {pickStation.length > i &&
                            pickStation[i].map((c) => {
                              if (!c.active) return <></>;
                              return (
                                <option
                                  value={c.name}
                                  selected={data.pickLocation === c.name}
                                >
                                  {c.name}
                                </option>
                              );
                            })}
                        </select>
                      </td>
                      <td className={style.td}>
                        <select
                          id={`drop`}
                          name="drop"
                          onChange={(e) => {
                            handlePickDrop(e, i);
                            handleDrop(e, i);
                          }}
                          disabled={user_role === "client"}
                        >
                          <option selected disabled hidden value="initial">
                            Choose
                          </option>
                          {mode.map((c) => {
                            if (!c.active) return <></>;
                            return (
                              <option
                                value={c.name}
                                selected={data.drop === c.name}
                              >
                                {c.name}
                              </option>
                            );
                          })}
                        </select>
                      </td>

                      <td className={style.td}>
                        <select
                          id={`dropLocation${i}`}
                          name="dropLocation"
                          onChange={(e) => {
                            handlePickDrop(e, i);
                          }}
                          disabled={user_role === "client"}
                        >
                          <option selected disabled hidden value="initial">
                            Choose
                          </option>{" "}
                          {dropStation.length > i &&
                            dropStation[i].map((c) => {
                              if (!c.active) return <></>;
                              return (
                                <option
                                  value={c.name}
                                  selected={data.dropLocation === c.name}
                                >
                                  {c.name}
                                </option>
                              );
                            })}
                        </select>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
              {user_role !== "client" && (
                <div style={{ display: "flex" }}>
                  <div onClick={(e) => handleAddPickDrop(i)}>
                    {i === pickDrop.length - 1 && (
                      <AddBoxIcon
                        style={{
                          color: "orange",
                          marginTop: "45px",
                          cursor: "pointer",
                        }}
                      />
                    )}
                  </div>
                  <div onClick={(e) => handleDelPickDrop(i)}>
                    {pickDrop.length !== 1 && (
                      <IndeterminateCheckBoxIcon
                        style={{
                          color: "orange",
                          marginTop: "45px",
                          cursor: "pointer",
                        }}
                      />
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
        <div className={style.destination1}>
          <div className={style.des}>Meal Count</div>
          <div className={style.table}>
            <Table bordered responsive="md">
              <thead>
                <tr className={style.trh}>
                  <th className={style.th}>Breakfast</th>
                  <th className={style.th}>Lunch</th>
                  <th className={style.th}>Dinner</th>
                  <th className={style.th}>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr className={style.tr}>
                  <td className={style.td}>
                    <input
                      readOnly={user_role === "client"}
                      type="number"
                      min="0"
                      value={breakfast}
                      onChange={(e) => {
                        setBreakfast(e.target.value);
                        CaltotalMeal("breakfast", e.target.value);
                      }}
                    />
                  </td>
                  <td className={style.td}>
                    <input
                      readOnly={user_role === "client"}
                      type="number"
                      min="0"
                      value={lunch}
                      onChange={(e) => {
                        setlunch(e.target.value);
                        CaltotalMeal("lunch", e.target.value);
                      }}
                    />
                  </td>
                  <td className={style.td}>
                    <input
                      readOnly={user_role === "client"}
                      type="number"
                      min="0"
                      value={dinner}
                      onChange={(e) => {
                        setdinner(e.target.value);
                        CaltotalMeal("dinner", e.target.value);
                      }}
                    />
                  </td>
                  <td className={style.td}>
                    <input readOnly type="number" min="0" value={totalMeal} />
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
        <div className={style.destination1}>
          <div className={style.des}>Passenger Count</div>
          <div className={style.table}>
            <Table bordered responsive="md">
              <thead>
                <tr className={style.trh}>
                  <th className={style.th}>Adult</th>
                  <th className={style.th}>Child</th>
                  <th className={style.th}>Infant</th>
                  <th className={style.th}>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr className={style.tr}>
                  <td className={style.td}>
                    <input
                      readOnly={user_role === "client"}
                      type="number"
                      min="0"
                      value={adult}
                      onChange={(e) => {
                        setadult(e.target.value);
                        CaltotalPass("adult", e.target.value);
                      }}
                    />
                  </td>
                  <td className={style.td}>
                    <input
                      readOnly={user_role === "client"}
                      type="number"
                      min="0"
                      value={child}
                      onChange={(e) => {
                        setchild(e.target.value);
                        CaltotalPass("child", e.target.value);
                      }}
                    />
                  </td>
                  <td className={style.td}>
                    <input
                      readOnly={user_role === "client"}
                      type="number"
                      min="0"
                      value={infantPas}
                      onChange={(e) => {
                        setinfantPas(e.target.value);
                        CaltotalPass("infant", e.target.value);
                      }}
                    />
                  </td>
                  <td className={style.td}>
                    <input
                      type="number"
                      min="0"
                      value={totalPassenger}
                      readOnly
                    />
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
        <div className={style.resDetail}>
          <div className={style.resName}>Reservation Details : </div>
          {destination.map((data, i) => {
            return (
              <div className={style.row}>
                <div className={style.resRow1}>
                  <div className={style.resCol}>
                    <span className={style.resCol1}>Hotel Name</span>
                    <span className={style.resCol2}> : </span>
                    <span className={style.resCol3}>
                      <strong>{data.hotelName}</strong>
                    </span>
                  </div>
                  <div className={style.resCol}>
                    <span className={style.resCol1}>No of Rooms </span>
                    <span className={style.resCol2}> : </span>
                    <span className={style.resCol3}>
                      <strong>{totalRooms}</strong>
                    </span>
                  </div>
                  <div className={style.resCol}>
                    <span className={style.resCol1}>Address </span>
                    <span className={style.resCol2}> : </span>
                    <span className={style.resCol3}>
                      <input
                        readOnly={user_role === "client"}
                        type="text"
                        value={data.address}
                        name="address"
                        onChange={(e) => handleDestination(e, i)}
                      />
                    </span>
                  </div>
                  <div className={style.resCol}>
                    <span className={style.resCol1}>Contact No</span>
                    <span className={style.resCol2}> : </span>
                    <span className={style.resCol3}>
                      <input
                        readOnly={user_role === "client"}
                        type="number"
                        min="0"
                        value={data.contactNo}
                        name="contactNo"
                        onChange={(e) => handleDestination(e, i)}
                      />
                    </span>
                  </div>
                  <div className={style.resCol}>
                    <span className={style.resCol1}>Check In</span>
                    <span className={style.resCol2}> : </span>
                    <span className={style.resCol3}>
                      <strong>{data.checkIn}</strong>
                    </span>
                  </div>
                  <div className={style.resCol}>
                    <span className={style.resCol1}>Remark</span>
                    <span className={style.resCol2}> : </span>
                    <span className={style.resCol3}>
                      <input
                        readOnly={user_role === "client"}
                        type="text"
                        value={data.desremark}
                        name="desremark"
                        onChange={(e) => handleDestination(e, i)}
                      />
                    </span>
                  </div>
                </div>
                <div className={style.resRow2}>
                  <div className={style.resCol}>
                    <span className={style.resCol1}>Nights</span>
                    <span className={style.resCol2}> : </span>
                    <span className={style.resCol3}>
                      <strong>{data.nights}</strong>
                    </span>
                  </div>
                  <div className={style.resCol}>
                    <span className={style.resCol1}>Room Type</span>
                    <span className={style.resCol2}> : </span>
                    <span className={style.resCol3}>
                      <strong>{data.roomType}</strong>
                    </span>
                  </div>
                  <div className={style.resCol}>
                    <span className={style.resCol1}>Reservation</span>
                    <span className={style.resCol2}> : </span>
                    <span className={style.resCol3}>
                      <input
                        readOnly={user_role === "client"}
                        type="text"
                        name="reservationNo"
                        value={data.reservationNo}
                        onChange={(e) => handleDestination(e, i)}
                      />
                    </span>
                  </div>
                  <div className={style.resCol}>
                    <span className={style.resCol1}>Confirmation</span>
                    <span className={style.resCol2}> : </span>
                    <span className={style.resCol3}>
                      <input
                        readOnly={user_role === "client"}
                        type="text"
                        value={data.confirmation}
                        name="confirmation"
                        onChange={(e) => handleDestination(e, i)}
                      />
                    </span>
                  </div>
                  <div className={style.resCol}>
                    <span className={style.resCol1}>Check Out</span>
                    <span className={style.resCol2}> : </span>
                    <span className={style.resCol3}>
                      <strong>{data.checkOut}</strong>
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {/* <div className={style.resDetail}>
          <div className={style.resName}>Flight Details :</div>
          <div className={style.flightRow}>
            <span>Indigo</span>
            <span>20.01.2021</span>
            <span>CCu</span>
            <span>Kul</span>
            <span>00.20</span>
            <span>00.20</span>
          </div>
        </div> */}
        <div className={style.resDetail}>
          <div className={style.resName}>Inclusion</div>
          <div className={style.inclusion}>
            {inclusion.map((data, i) => {
              return (
                <div className={style.content}>
                  &bull;
                  <input
                    readOnly={user_role === "client"}
                    type="text"
                    value={data}
                    onKeyDown={(e) =>
                      handleAddTextMultiLine(e, inclusion, setInclusion)
                    }
                    onChange={(e) => {
                      handleTextMultiLine(e, i, inclusion, setInclusion);
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className={style.itinerary}>
          <h4>ITINERARY</h4>
          <div className={`row ${style.itineraryRow1}`}>
            <div className={`col-2 ${style.itineraryother}`}>Days</div>
            <div className={`col-2 ${style.itineraryother}`}>Location</div>
            <div className={`col-2 ${style.itineraryother}`}>Time</div>
            <div className={`col-5 ${style.itineraryDetail}`}>Details</div>
          </div>
          {itinerary.map((data, i) => {
            return (
              <div className={`row ${style.itineraryRow2}`}>
                <div className={`col-2 ${style.itineraryother}`}>
                  <input type="text" readOnly value={i + 1}></input>
                </div>
                <div className={`col-2 ${style.itineraryother}`}>
                  <input
                    readOnly={user_role === "client"}
                    type="text"
                    value={data.location}
                    name="location"
                    onChange={(e) => handleItinerary(e, i)}
                  ></input>
                </div>
                <div className={`col-2 ${style.itineraryother}`}>
                  <input
                    readOnly={user_role === "client"}
                    type="text"
                    name="time"
                    value={data.time}
                    onChange={(e) => handleItinerary(e, i)}
                  ></input>
                </div>
                <div className={`col-5 ${style.itineraryDetail}`}>
                  <input
                    readOnly={user_role === "client"}
                    type="text"
                    name="details"
                    value={data.details}
                    onChange={(e) => handleItinerary(e, i)}
                  ></input>
                </div>
                <div className={`col-1 ${style.itineraryBut}`}>
                  {user_role !== "client" && i === itinerary.length - 1 && (
                    <div onClick={() => handleAddItinerary(i)}>
                      <AddBoxIcon
                        style={{ color: "orange", cursor: "pointer" }}
                      />
                    </div>
                  )}
                  {user_role !== "client" && (
                    <div onClick={() => handleDelItinerary(i)}>
                      {itinerary.length !== 1 && (
                        <IndeterminateCheckBoxIcon
                          style={{ color: "orange", cursor: "pointer" }}
                        />
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <div className={style.resDetail}>
          <div className={style.resName}>Exclusion</div>
          <div className={style.inclusion}>
            {exclusion.map((data, i) => {
              return (
                <div className={style.content}>
                  &bull;
                  <input
                    readOnly={user_role === "client"}
                    type="text"
                    value={data}
                    onKeyDown={(e) =>
                      handleAddTextMultiLine(e, exclusion, setExclusion)
                    }
                    onChange={(e) =>
                      handleTextMultiLine(e, i, exclusion, setExclusion)
                    }
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className={style.resDetail}>
          <div className={style.resName}>Important Note</div>
          <div className={style.inclusion}>
            {importantNote.map((data, i) => {
              return (
                <div className={style.content}>
                  &bull;
                  <input
                    readOnly={user_role === "client"}
                    type="text"
                    value={data}
                    onKeyDown={(e) =>
                      handleAddTextMultiLine(e, importantNote, setImportantNote)
                    }
                    onChange={(e) => {
                      handleTextMultiLine(
                        e,
                        i,
                        importantNote,
                        setImportantNote
                      );
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className={style.resDetail}>
          <div className={style.resName}>Terms & Condition</div>
          <div className={style.inclusion}>
            {termsCondition.map((data, i) => {
              return (
                <div className={style.content}>
                  &bull;
                  <input
                    readOnly={user_role === "client"}
                    type="text"
                    value={data}
                    onKeyDown={(e) =>
                      handleAddTextMultiLine(
                        e,
                        termsCondition,
                        setTermsCondition
                      )
                    }
                    onChange={(e) => {
                      handleTextMultiLine(
                        e,
                        i,
                        termsCondition,
                        setTermsCondition
                      );
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className={style.resDetail}>
          <div className={style.resName}>Remark</div>
          <div className={style.inclusion}>
            {remark.map((data, i) => {
              return (
                <div className={style.content}>
                  &bull;
                  <input
                    readOnly={user_role === "client"}
                    type="text"
                    value={data}
                    onKeyDown={(e) =>
                      handleAddTextMultiLine(e, remark, setRemark)
                    }
                    onChange={(e) => {
                      handleTextMultiLine(e, i, remark, setRemark);
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className={style.costName}>Costing</div>
        <div className={style.costRow}>
          <div className={style.costCol1}>
            <Table bordered>
              <thead>
                <tr className={style.trh1}>
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
                    <input
                      readOnly={user_role === "client"}
                      type="number"
                      min="0"
                      placeholder="Number"
                      value={single}
                      onChange={(e) => {
                        calculateIndividualCost(
                          e.target.value,
                          singlecost,
                          setSingleTotalcost
                        );
                        setSingle(e.target.value);
                      }}
                    />
                  </td>
                  <td className={style.td}>
                    <input
                      readOnly={user_role === "client"}
                      type="number"
                      min="0"
                      placeholder="Number"
                      value={double}
                      onChange={(e) => {
                        calculateIndividualCost(
                          e.target.value,
                          doublecost,
                          setDoubleTotalcost
                        );
                        setDouble(e.target.value);
                      }}
                    />
                  </td>
                  <td className={style.td}>
                    <input
                      readOnly={user_role === "client"}
                      type="number"
                      min="0"
                      placeholder="Number"
                      value={triple}
                      onChange={(e) => {
                        calculateIndividualCost(
                          e.target.value,
                          triplecost,
                          setTripleTotalcost
                        );
                        setTriple(e.target.value);
                      }}
                    />
                  </td>

                  <td className={style.td}>
                    <input
                      readOnly={user_role === "client"}
                      type="number"
                      min="0"
                      placeholder="Number"
                      value={extra}
                      onChange={(e) => {
                        calculateIndividualCost(
                          e.target.value,
                          extracost,
                          setExtraTotalcost
                        );
                        setExtra(e.target.value);
                      }}
                    />
                  </td>
                  <td className={style.td}>
                    <input
                      readOnly={user_role === "client"}
                      type="number"
                      min="0"
                      placeholder="Number"
                      value={childWithBed}
                      onChange={(e) => {
                        calculateIndividualCost(
                          e.target.value,
                          childWithBedcost,
                          setchildWithBedTotalcost
                        );
                        setchildWithBed(e.target.value);
                      }}
                    />
                  </td>
                  <td className={style.td}>
                    <input
                      readOnly={user_role === "client"}
                      type="number"
                      min="0"
                      placeholder="Number"
                      value={childWithNoBed}
                      onChange={(e) => {
                        calculateIndividualCost(
                          e.target.value,
                          childWithNoBedcost,
                          setchildWithNoBedTotalcost
                        );
                        setchildWithNoBed(e.target.value);
                      }}
                    />
                  </td>
                  <td className={style.td}>
                    <input
                      readOnly={user_role === "client"}
                      type="number"
                      min="0"
                      placeholder="Number"
                      value={infant}
                      onChange={(e) => {
                        calculateIndividualCost(
                          e.target.value,
                          infantcost,
                          setInfantTotalcost
                        );
                        setinfant(e.target.value);
                      }}
                    />
                  </td>
                </tr>
                <tr className={style.tr}>
                  <td className={style.td}>
                    <input
                      readOnly={user_role === "client"}
                      type="number"
                      min="0"
                      placeholder="Cost"
                      onChange={(e) => {
                        setSinglecost(e.target.value);

                        calculateIndividualCost(
                          single,
                          e.target.value,
                          setSingleTotalcost
                        );
                      }}
                      value={singlecost}
                    />
                  </td>
                  <td className={style.td}>
                    <input
                      readOnly={user_role === "client"}
                      type="number"
                      min="0"
                      placeholder="Cost"
                      onChange={(e) => {
                        calculateIndividualCost(
                          double,
                          e.target.value,
                          setDoubleTotalcost
                        );
                        setDoublecost(e.target.value);
                      }}
                      value={doublecost}
                    />
                  </td>
                  <td className={style.td}>
                    <input
                      readOnly={user_role === "client"}
                      type="number"
                      min="0"
                      placeholder="Cost"
                      onChange={(e) => {
                        calculateIndividualCost(
                          triple,
                          e.target.value,
                          setTripleTotalcost
                        );
                        setTriplecost(e.target.value);
                      }}
                      value={triplecost}
                    />
                  </td>
                  <td className={style.td}>
                    <input
                      readOnly={user_role === "client"}
                      type="number"
                      min="0"
                      placeholder="Cost"
                      onChange={(e) => {
                        calculateIndividualCost(
                          extra,
                          e.target.value,
                          setExtraTotalcost
                        );
                        setExtracost(e.target.value);
                      }}
                      value={extracost}
                    />
                  </td>
                  <td className={style.td}>
                    <input
                      readOnly={user_role === "client"}
                      type="number"
                      min="0"
                      placeholder="Cost"
                      onChange={(e) => {
                        calculateIndividualCost(
                          childWithBed,
                          e.target.value,
                          setchildWithBedTotalcost
                        );
                        setchildWithBedcost(e.target.value);
                      }}
                      value={childWithBedcost}
                    />
                  </td>
                  <td className={style.td}>
                    <input
                      readOnly={user_role === "client"}
                      type="number"
                      min="0"
                      placeholder="Cost"
                      onChange={(e) => {
                        calculateIndividualCost(
                          childWithNoBed,
                          e.target.value,
                          setchildWithNoBedTotalcost
                        );
                        setchildWithNoBedcost(e.target.value);
                      }}
                      value={childWithNoBedcost}
                    />
                  </td>
                  <td className={style.td}>
                    <input
                      readOnly={user_role === "client"}
                      type="number"
                      min="0"
                      placeholder="Cost"
                      onChange={(e) => {
                        calculateIndividualCost(
                          infant,
                          e.target.value,
                          setInfantTotalcost
                        );
                        setInfantcost(e.target.value);
                      }}
                      value={infantcost}
                    />
                  </td>
                </tr>
                <tr className={style.tr}>
                  <td className={style.td}>
                    <input
                      readOnly
                      type="number"
                      min="0"
                      placeholder="Total"
                      value={singleTotalcost}
                    />
                  </td>
                  <td className={style.td}>
                    <input
                      readOnly
                      type="number"
                      min="0"
                      placeholder="Total"
                      value={doubleTotalcost}
                    />
                  </td>
                  <td className={style.td}>
                    <input
                      readOnly
                      type="number"
                      min="0"
                      placeholder="Total"
                      value={tripleTotalcost}
                    />
                  </td>
                  <td className={style.td}>
                    <input
                      readOnly
                      type="number"
                      min="0"
                      placeholder="Total"
                      value={extraTotalcost}
                    />
                  </td>
                  <td className={style.td}>
                    <input
                      readOnly
                      type="number"
                      min="0"
                      placeholder="Total"
                      value={childWithBedTotalcost}
                    />
                  </td>
                  <td className={style.td}>
                    <input
                      readOnly
                      type="number"
                      min="0"
                      placeholder="Total"
                      value={childWithNoBedTotalcost}
                    />
                  </td>
                  <td className={style.td}>
                    <input
                      readOnly
                      type="number"
                      min="0"
                      placeholder="Total"
                      value={infantTotalcost}
                    />
                  </td>
                </tr>
              </tbody>
            </Table>
            <div className={style.costCol12}>
              <div className={style.textarea}>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>Additional Notes</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    onChange={(e) => {
                      setAdditionalNote(e.target.value);
                    }}
                    value={additionalNote}
                  />
                </Form.Group>
              </div>
              <div className={style.othername}>
                <div>
                  <strong>Less : </strong>FOC
                </div>
                <div>
                  <strong>Less : </strong>Discount
                </div>
                <div>
                  <strong>Add : </strong>
                </div>
                <div>
                  <strong> </strong>
                </div>
                <div>
                  <strong>Add : </strong>
                </div>
              </div>
            </div>
          </div>
          <div className={style.costCol2}>
            <div className={style.costCol2name}>Gross Amount</div>
            <input
              type="number"
              min="0"
              placeholder="Amount"
              readOnly
              value={grossCost}
            ></input>
            <div className={style.cal}></div>
            <div className={style.othercost}>
              <div className={style.othercostRow}>
                <input
                  readOnly={user_role === "client"}
                  type="number"
                  min="0"
                  placeholder="Number"
                  value={foc}
                  onChange={(e) => setfoc(e.target.value)}
                ></input>
                <input
                  readOnly={user_role === "client"}
                  type="number"
                  min="0"
                  placeholder="Cost"
                  className={style.othercostRowinput}
                  value={focCost}
                  onChange={(e) => {
                    setfocCost(e.target.value);
                  }}
                ></input>
              </div>
              <div className={style.othercostRow}>
                <input
                  readOnly={user_role === "client"}
                  type="number"
                  min="0"
                  placeholder="%"
                  value={discount}
                  onChange={(e) => {
                    setdiscount(e.target.value);
                  }}
                ></input>
                <input
                  readOnly
                  type="number"
                  min="0"
                  placeholder="Cost"
                  className={style.othercostRowinput}
                  value={discountamount}
                ></input>
              </div>
              <div className={style.othercostRow}>
                <input
                  readOnly={user_role === "client"}
                  type="text"
                  placeholder="Other Charge Name"
                  value={otherCharge}
                  onChange={(e) => setotherCharge(e.target.value)}
                ></input>
                <input
                  readOnly={user_role === "client"}
                  type="number"
                  min="0"
                  placeholder="Cost"
                  className={style.othercostRowinput}
                  value={otherChargeCost}
                  onChange={(e) => setotherChargeCost(e.target.value)}
                ></input>
              </div>
              <div className={style.othercostRow}>
                <input type="text" readOnly value="Total Amount"></input>
                <input
                  type="number"
                  min="0"
                  placeholder="Cost"
                  className={style.othercostRowinput}
                  readOnly
                  value={totalCost}
                ></input>
              </div>
              <div className={style.othercostRow}>
                <div className={style.othercostRow1}>
                  <Input
                    readOnly={user_role === "client"}
                    type="select"
                    placeholder="Tax Name"
                    value={tax}
                    onChange={(e) => {
                      settax(e.target.value);
                      for (let i = 0; i < currTax.length; i++) {
                        if (currTax[i].name === e.target.value) {
                          settaxper(currTax[i].percentage);
                          calculateTotalCost();
                          break;
                        }
                      }
                    }}
                    disabled={user_role === "client"}
                    style={{
                      maxWidth: "50%",
                      maxHeight: "30px",
                      paddingTop: "0",
                      paddingBottom: "0",
                    }}
                  >
                    <option selected disabled hidden value="initial">
                      Choose
                    </option>
                    {currTax.map((c) => {
                      if (c.active) {
                        return (
                          <option value={c.name} selected={c.name === tax}>
                            {c.name}
                          </option>
                        );
                      }
                      return <></>;
                    })}{" "}
                  </Input>
                  <input
                    readOnly
                    type="number"
                    min="0"
                    placeholder="%"
                    value={taxper}
                  ></input>
                </div>
                <input
                  readOnly
                  type="number"
                  min="0"
                  placeholder="Cost"
                  value={taxCost}
                  className={style.othercostRowinput}
                ></input>
              </div>
              <div className={style.othercostRow}>
                <input
                  type="text"
                  placeholder="Cost"
                  value="Net Payable"
                  readOnly
                ></input>
                <input
                  type="number"
                  min="0"
                  placeholder="Cost"
                  className={style.othercostRowinput}
                  readOnly
                  value={finalCost}
                ></input>
              </div>
            </div>
            <div className={style.cal1}>
              {/* <button onClick={calculateTotalCost}>Calculate Final Cost</button> */}
            </div>
          </div>
        </div>
        <div className={style.but}>
          {user_role !== "client" && <Button onClick={refresh}>Refresh</Button>}
          {user_role !== "client" && (
            <Button onClick={handleSave}>Save Draft</Button>
          )}
          {user_role === "client" && (
            <div style={{ fontSize: "20px", fontWeight: "600" }}>
              Note* : If u want some changes then write in text box and send
              else no need to send
            </div>
          )}
          <Button onClick={handleSend}>Send</Button>
        </div>
      </div>
    </div>
  );
}

export default Reply;
