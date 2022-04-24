import React, { useEffect, useState } from "react";
import "./Inquery.css";
import "../Commonstyle.css";
import Booking from "./Booking";
import background from "../../../image/background.jpg";
import Verify from "../model/Verify/Verify";
import Loading from "../../../pages/Loading";
import { NavLink } from "react-router-dom";

function Inquery({ user, loading, updateHandler, query }) {
  const [showAll, setshowAll] = useState(false);
  const [show, setShow] = useState(false);

  const handleSetShowAll = () => {
    setshowAll(!showAll);
  };

  useEffect(() => {
    if (!user.isApproved) {
      setShow(true);
    }
  }, [showAll]);

  return (
    <div>
      {!user.isApproved && (
        <Verify
          show={show}
          Hide={setShow}
          user={user}
          updateHandler={updateHandler}
        />
      )}
      {user.isApproved && (
        <div className={`home`}>
          <div className="container-fluid">
            <div className="homeHeading">
              <div>
                <NavLink
                  to="/vendor/home"
                  activeClassName="active"
                  className="heading"
                >
                  Inquery
                </NavLink>
                <NavLink
                  to="/vendor/hold"
                  activeClassName="active"
                  className="heading"
                >
                  Hold
                </NavLink>
                <NavLink
                  to="/vendor/confirm"
                  activeClassName="active"
                  className="heading"
                >
                  Confirm
                </NavLink>
                <NavLink
                  to="/vendor/cancel"
                  activeClassName="active"
                  className="heading"
                >
                  Cancel
                </NavLink>
              </div>

              <button onClick={handleSetShowAll} className="showAll">
                {showAll ? "Hide" : "Show All"}
              </button>
            </div>
            <div className="header">
              <div className="float-center bold col-org query">Query</div>
              <div className="bold float-right col-org payment">Payment</div>
              <div className="float-center bold col-org status">Status</div>
              <div className="float-center bold col-org action">Action</div>
            </div>
            <div className="booking">
              {loading && <Loading Loading={Loading} />}
              {!loading && query.length === 0 && (
                <p
                  style={{
                    fontSize: "40px",
                    fontWeight: "650",
                    color: "white",
                    marginTop: "20vh",
                  }}
                >
                  No Inquery
                </p>
              )}
              {!loading &&
                query.map((data, index) => {
                  if (index < 3) {
                    return (
                      <Booking
                        data={data.query}
                        status={data.status}
                        showAll={showAll}
                        updateHandler={updateHandler}
                      />
                    );
                  } else if (index >= 3 && showAll) {
                    return (
                      <Booking
                        data={data.query}
                        status={data.status}
                        showAll={showAll}
                        updateHandler={updateHandler}
                      />
                    );
                  } else {
                    return <></>;
                  }
                })}
            </div>
          </div>
        </div>
      )}
      <img src={background} alt="background" className="backgroundSvg"></img>
    </div>
  );
}

export default Inquery;
