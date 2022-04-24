import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Category from "./Category";
import Country from "./Country";
import Transport from "./Transport";
import Meal from "./Meal";
import style from "./Home.module.css";
import axios from "axios";
import HomePage from "./HomePage";
import * as ROUTES from "../../../constants/routes";

function Home() {
  const [place, setPlace] = useState([]);
  const [category, setCategory] = useState([]);
  const [country, setcountry] = useState([]);
  const [transport, setTransport] = useState([]);
  const [meal, setMeal] = useState([]);
  const [mode, setMode] = useState([]);
  const [allCity, setallCity] = useState([]);
  const [allStation, setallStation] = useState([]);
  const [noOfActive, setnoOfActive] = useState({
    categoryActive: 0,
    cityActive: 0,
    countryActive: 0,
    stationActive: 0,
    modeActive: 0,
    mealActive: 0,
  });

  const getData = () => {
    axios({
      method: "get",
      url: ROUTES.BASELINK + "/admin/destinataionData",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => {
        if (res.data.data.length === 0) {
          return;
        }
        console.log("res.data.data", res.data.data);

        let p = res.data.data[0].place;
        let c = [];
        for (let i = 0; i < p.length; i++) {
          p[i].city.reverse();
          c.push(p[i].country);
        }

        setcountry(c.reverse());
        let station = res.data.data[0].transport;
        for (let i = 0; i < station.length; i++) {
          station[i].station.reverse();
        }
        setPlace(res.data.data[0].place.reverse());
        setCategory(res.data.data[0].category.reverse());
        setTransport(res.data.data[0].transport.reverse());
        setMode(res.data.data[0].mode.reverse());
        setMeal(res.data.data[0].meal.reverse());
        setnoOfActive(res.data.data[0].noOfActive);
        AllCity(res.data.data[0]);
        AllStation(res.data.data[0]);
        console.log(res.data.data[0].noOfActive);
      })
      .catch((err) => {
        console.log("error in fetching quries", err);
      });
  };

  const changeHandler = (data) => {
    if (data) {
      getData();
    }
  };

  const AllCity = async (data) => {
    let c = [];
    let x = data.place;
    console.log(x);
    if (x) {
      for (let i = 0; i < x.length; i++) {
        let cty = x[i].city;
        for (let j = 0; j < cty.length; j++) {
          c.push(cty[j]);
        }
      }
    }
    setallCity(c);
  };

  const AllStation = async (data) => {
    let c = [];
    let x = data.transport;
    console.log(x);
    if (x) {
      for (let i = 0; i < x.length; i++) {
        let station = x[i].station;
        for (let j = 0; j < station.length; j++) {
          c.push(station[j]);
        }
      }
    }
    setallStation(c);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className={style.home}>
      <Router>
        <Switch>
          <Route
            exact
            path="/admin/destination"
            component={() => <HomePage />}
          />
          <Route
            exact
            path="/admin/destination/category"
            component={() => (
              <Category
                category={category}
                changeHandler={changeHandler}
                noOfActive={noOfActive}
              />
            )}
          />
          <Route
            exact
            path="/admin/destination/country"
            component={() => (
              <Country
                place={place}
                country={country}
                changeHandler={changeHandler}
                allCity={allCity}
                noOfActive={noOfActive}
              />
            )}
          />
          <Route
            exact
            path="/admin/destination/transport"
            component={() => (
              <Transport
                mode={mode}
                transport={transport}
                place={place}
                allStation={allStation}
                changeHandler={changeHandler}
                noOfActive={noOfActive}
              />
            )}
          />
          <Route
            exact
            path="/admin/destination/meal"
            component={() => (
              <Meal
                Meal={meal}
                changeHandler={changeHandler}
                noOfActive={noOfActive}
              />
            )}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default Home;
