import React, { useEffect, useState } from "react";
import style from "./Voucher.module.css";
import { useParams } from "react-router-dom";
import Loading from "../../../pages/Loading";
import axios from "axios";
import * as ROUTES from "../../../constants/routes";

function Voucher() {
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
  const [inclusion, setInclusion] = useState([""]);
  const [exclusion, setExclusion] = useState([""]);
  const [importantNote, setImportantNote] = useState([""]);
  const [termsCondition, setTermsCondition] = useState([""]);
  const [guestDetail, setGuestDetail] = useState([]);
  const [flightDetail, setFlightDetail] = useState([]);
  const [itinerary, setItinerary] = useState([
    {
      location: "",
      time: "",
      details: "",
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
  const [totalRooms, setTotalRooms] = useState("");
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const { queryId, vendorId } = useParams();
  const [logo, setLogo] = useState("");
  const [name, setName] = useState("");
  const [address, setaddress] = useState("");
  const [contact, setcontact] = useState("");

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
        console.log("detaildetail", detail);

        initialValues(detail, instruction);
      })
      .catch((err) => {
        console.log("error in fetching quries", err);
      });
    setLoading(false);
  };

  const getQueryDetail = async () => {
    setLoading(true);
    await axios({
      method: "post",
      url: ROUTES.BASELINK + "/query/detail",
      data: {
        queryId: queryId,
      },
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => {
        const query = res.data.data;
        console.log("query", query);
        setQuery(query);
      })
      .catch((err) => {
        console.log("error in fetching quries", err);
      });
    setLoading(false);
  };

  const getGuestDetails = async () => {
    setLoading(true);
    await axios
      .post(ROUTES.BASELINK + "/guest/getDetails", { queryId: queryId })
      .then((res) => {
        const { guestDetails, flightDetails } = res.data.data;
        console.log("res.datares.data", guestDetails, flightDetails);
        setGuestDetail(guestDetails);
        setFlightDetail(flightDetails);
      })
      .catch((err) => {
        console.log(err);
      });
    setLoading(false);
  };

  const initialValues = (detail, instruction) => {
    if (detail.destination) {
      setDestination(detail.destination);
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
    // if (detail.remark) {
    //   if (detail.remark.length) {
    //     setRemark(detail.remark);
    //   }
    // }
    if (detail.itinerary) {
      if (detail.itinerary.length) {
        setItinerary(detail.itinerary);
      }
    }
    if (detail.roomsDetail) {
      setTotalRooms(detail.roomsDetail.total);
    }
    if (detail.pickDrop) {
      setPickDrop(detail.pickDrop);
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
        const { name, address, city, country, phone1, phone2, state } =
          res.data.data;
        setName(name);
        let add = address + " , " + city + " " + state + " , " + country;
        setaddress(add);
        setcontact(phone1 + " , " + phone2);
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

  useEffect(() => {
    getCompanyInfo();
    getCompanyPic();
    getQueryDetail();
    getDetails();
    getGuestDetails();
  }, []);

  return (
    <div>
      <Loading Loading={loading}></Loading>
      <div className={style.head}>
        <div className={style.headleft}>
          <img src={logo} alt="logo"></img>
          <div>
            <h3>{name}</h3>
            <p>Tag line...</p>
          </div>
        </div>
        <div className={style.headright}>
          <input type="text" value={name} readOnly></input>
          <input readOnly value={address}></input>
          <input type="text" readOnly value={contact}></input>
        </div>
      </div>
      <div className={style.wel}>
        <h3> Welcome</h3>
        <div className={style.row}>
          <div className={style.resRow1}>
            <div className={style.resCol}>
              <span className={style.resCol1}>Inquery No</span>
              <span className={style.resCol2}> : </span>
              <span className={style.resCol3}>
                <input readOnly type="text" value={query.queryNo} />
              </span>
            </div>
            <div className={style.resCol}>
              <span className={style.resCol1}>Country</span>
              <span className={style.resCol2}> : </span>
              <span className={style.resCol3}>
                <input
                  readOnly
                  type="text"
                  value={query ? query.arraydestination[0].queryCountry : ""}
                />
              </span>
            </div>
            <div className={style.resCol}>
              <span className={style.resCol1}>City</span>
              <span className={style.resCol2}> : </span>
              <span className={style.resCol3}>
                {query &&
                  query.arraydestination.map((city, index) => {
                    return (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "flex-start",
                          marginLeft: "5px",
                          maxWidth: "fit-content",
                          flexWrap: "wrap",
                        }}
                      >
                        <p>
                          {" "}
                          {city.queryCity}{" "}
                          {query.arraydestination.length !== index + 1
                            ? "|"
                            : ""}
                        </p>
                      </div>
                    );
                  })}
              </span>
            </div>
            <div className={style.resCol}>
              <span className={style.resCol1}>CheckIn</span>
              <span className={style.resCol2}> : </span>
              <span className={style.resCol3}>
                <input
                  readOnly
                  type="text"
                  value={
                    query
                      ? query.arraydestination[0].queryCheckIn.substring(0, 10)
                      : ""
                  }
                />
              </span>
            </div>
            <div className={style.resCol}>
              <span className={style.resCol1}>Total Nights</span>
              <span className={style.resCol2}> : </span>
              <span className={style.resCol3}>
                <input readOnly type="text" value={query.queryTotalNights} />
              </span>
            </div>
            <div className={style.resCol}>
              <span className={style.resCol1}>Lead Passenger</span>
              <span className={style.resCol2}> : </span>
              <span className={style.resCol3}>
                <input readOnly type="text" value={query.queryName} />
              </span>
            </div>
          </div>
          <div className={style.resRow2}>
            <div className={style.resCol}>
              <span className={style.resCol1}>Booking Type</span>
              <span className={style.resCol2}> : </span>
              <span className={style.resCol3}>
                <input readOnly type="text" value={query.queryType} />
              </span>
            </div>
            <div className={style.resCol}>
              <span className={style.resCol1}>CheckOut</span>
              <span className={style.resCol2}> : </span>
              <span className={style.resCol3}>
                <input
                  readOnly
                  type="text"
                  value={
                    query
                      ? query.arraydestination[
                          query.arraydestination.length - 1
                        ].queryCheckOut.substring(0, 10)
                      : ""
                  }
                />
              </span>
            </div>
            <div className={style.resCol}>
              <span className={style.resCol1}>Adult</span>
              <span className={style.resCol2}> : </span>
              <span className={style.resCol3}>
                <input readOnly type="text" value={query.queryAdult} />
              </span>
            </div>
            <div className={style.resCol}>
              <span className={style.resCol1}>Child</span>
              <span className={style.resCol2}> : </span>
              <span className={style.resCol3}>
                <input readOnly type="text" value={query.queryChild} />
              </span>
            </div>
            <div className={style.resCol}>
              <span className={style.resCol1}>Infant</span>
              <span className={style.resCol2}> : </span>
              <span className={style.resCol3}>
                <input readOnly type="text" value={query.queryInfant} />
              </span>
            </div>
            <div className={style.resCol}>
              <span className={style.resCol1}>Total Passenger</span>
              <span className={style.resCol2}> : </span>
              <span className={style.resCol3}>
                <input readOnly type="text" value={query.queryPassengers} />
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className={style.resDetail}>
        <div className={style.resName}>Reservation Details</div>
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
                      readOnly
                      type="text"
                      value={data.address}
                      name="address"
                    />
                  </span>
                </div>
                <div className={style.resCol}>
                  <span className={style.resCol1}>Contact No</span>
                  <span className={style.resCol2}> : </span>
                  <span className={style.resCol3}>
                    <input readOnly type="text" value={data.contactNo} />
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
                      readOnly
                      type="text"
                      value={data.desremark}
                      name="desremark"
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
                      readOnly
                      type="text"
                      name="reservationNo"
                      value={data.reservationNo}
                    />
                  </span>
                </div>
                <div className={style.resCol}>
                  <span className={style.resCol1}>Confirmation</span>
                  <span className={style.resCol2}> : </span>
                  <span className={style.resCol3}>
                    <input
                      readOnly
                      type="text"
                      value={data.confirmation}
                      name="confirmation"
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
      <div className={style.itinerary}>
        <h4>Pick Up & Drop</h4>
        <div className={`row ${style.itineraryRow1}`}>
          <div className={`col ${style.itineraryother}`}>Pick Up</div>
          <div className={`col ${style.itineraryother}`}>Pick Up Location</div>
          <div className={`col ${style.itineraryother}`}>Drop</div>
          <div className={`col ${style.itineraryDetail}`}>Drop Location</div>
        </div>
        {pickDrop.map((data, i) => {
          return (
            <div className={`row ${style.itineraryRow2}`}>
              <div className={`col ${style.itineraryother}`}>
                <input
                  readOnly
                  type="text"
                  name="time"
                  value={data.pickUp}
                ></input>
              </div>
              <div className={`col ${style.itineraryDetail}`}>
                <input
                  readOnly
                  type="text"
                  name="details"
                  value={data.pickLocation}
                ></input>
              </div>
              <div className={`col ${style.itineraryother}`}>
                <input type="text" readOnly value={data.drop}></input>
              </div>
              <div className={`col ${style.itineraryother}`}>
                <input
                  readOnly
                  type="text"
                  value={data.dropLocation}
                  name="location"
                ></input>
              </div>
            </div>
          );
        })}
      </div>
      <div className={style.resDetail}>
        <div className={style.resName}>Guest Details</div>
        <div className={style.flight}>
          {guestDetail.map((data, i) => {
            return (
              <div className={`row ${style.flightRow}`}>
                <span className="col">{i + 1}</span>
                <span className={`col`}>
                  {data.title} {data.firstName} {data.lastName}
                </span>
                <span className="col">{data.gender}</span>
              </div>
            );
          })}
        </div>
      </div>
      <div className={style.resDetail}>
        <div className={style.resName}>Flight Details</div>
        <div className={style.flight}>
          {flightDetail.map((data) => {
            return (
              <div className={`row ${style.flightRow}`}>
                <span className={`col`}>{data.airline}</span>
                <span className="col">{data.date}</span>
                <span className="col">{data.departure}</span>
                <span className="col">{data.arrival}</span>
                <span className="col">
                  {data.departure_hh}.{data.departure_mm}
                </span>
                <span className="col">
                  {data.arrival_hh}.{data.arrival_mm}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      <div className={style.resDetail}>
        <div className={style.resName}>Inclusion</div>
        <div className={style.inclusion}>
          {inclusion.map((data, i) => {
            return (
              <div className={style.content}>
                &bull;
                <input readOnly type="text" value={data} />
              </div>
            );
          })}
        </div>
      </div>
      <div className={style.itinerary}>
        <h4>Itinerary</h4>
        <div className={`row ${style.itineraryRow1}`}>
          <div className={`col-2 ${style.itineraryother}`}>Days</div>
          <div className={`col-2 ${style.itineraryother}`}>Location</div>
          <div className={`col-2 ${style.itineraryother}`}>Time</div>
          <div className={`col-6 ${style.itineraryDetail}`}>Details</div>
        </div>
        {itinerary.map((data, i) => {
          return (
            <div className={`row ${style.itineraryRow2}`}>
              <div className={`col-2 ${style.itineraryother}`}>
                <input type="text" readOnly value={i + 1}></input>
              </div>
              <div className={`col-2 ${style.itineraryother}`}>
                <input
                  readOnly
                  type="text"
                  value={data.location}
                  name="location"
                ></input>
              </div>
              <div className={`col-2 ${style.itineraryother}`}>
                <input
                  readOnly
                  type="text"
                  name="time"
                  value={data.time}
                ></input>
              </div>
              <div className={`col-6 ${style.itineraryDetail}`}>
                <input
                  readOnly
                  type="text"
                  name="details"
                  value={data.details}
                ></input>
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
                <input readOnly type="text" value={data} />
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
                <input readOnly type="text" value={data} />
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
                <input readOnly type="text" value={data} />
              </div>
            );
          })}
        </div>
      </div>
      <div className={style.img}>
        <img src="/images/ui1.png" alt=""></img>
      </div>
    </div>
  );
}

export default Voucher;
