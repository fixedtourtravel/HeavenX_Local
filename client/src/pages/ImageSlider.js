import React, { useEffect, useState } from "react";
import ItemsCarousel from "react-items-carousel";
import * as ROUTES from "../constants/routes";
import axios from "axios";
import Image from "./Image";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";

export default function Crousel() {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const chevronWidth = 80;
  const [place, setPlace] = useState([]);

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
        setPlace(res.data.data[0].place.reverse());
      })
      .catch((err) => {
        console.log("error in fetching quries", err);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div style={{ padding: `0 ${chevronWidth}px` }}>
      <ItemsCarousel
        requestToChangeActive={setActiveItemIndex}
        activeItemIndex={activeItemIndex}
        numberOfCards={3}
        gutter={80}
        leftChevron={
          <button
            style={{
              backgroundColor: "#ff9f1c",
              borderRadius: "10px",
              marginTop: "-30px",
            }}
          >
            <ArrowBackIosNewRoundedIcon
              style={{ color: "white", fontSize: "30px" }}
            />
          </button>
        }
        rightChevron={
          <button
            style={{
              backgroundColor: "#ff9f1c",
              borderRadius: "10px",
              marginTop: "-30px",
            }}
          >
            <ArrowForwardIosRoundedIcon
              style={{ color: "white", fontSize: "30px" }}
            />
          </button>
        }
        outsideChevron
        chevronWidth={chevronWidth}
        infiniteLoop={true}
      >
        {place.map((data) => {
          return (
            <div style={{ height: 250 }}>
              {data.country.img && <Image path={data.country.img} />}
            </div>
          );
        })}
      </ItemsCarousel>
    </div>
  );
}
