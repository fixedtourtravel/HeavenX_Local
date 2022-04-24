import React, { useEffect, useState } from "react";
import Card from "./Card/Card";
import { menu } from "./Card/Card_Data";
import CircularBar from "react-multicolor-circular-progress-bar";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import style from "./Home.module.css";
import axios from "axios";
import * as ROUTES from "../../../constants/routes";
import Loading from "../../../pages/Loading";
import moment from "moment";

function Home() {
  const [value, onChange] = useState(new Date());
  const [data, setData] = useState(menu);
  const [color, setColor] = useState([]);
  const [angle, setAngle] = useState([]);
  const [ratio, setRatio] = useState([]);
  const [loading, setLoading] = useState([]);
  const [mark, setmark] = useState([]);
  const [month, setMonth] = useState([]);

  const getData = async () => {
    setLoading(true);
    axios({
      method: "get",
      url: ROUTES.BASELINK + "/admin/dashboard",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => {
        initialValue(res.data.data);
      })
      .catch((err) => {
        console.log("error in fetching quries", err);
      });
    setLoading(false);
  };

  function rand(frm, to) {
    return ~~(Math.random() * (to - frm)) + frm;
  }

  const initialValue = (res) => {
    const { information, ratio, date } = res;
    const x = [...data];
    let totalquery = 1;
    for (let i = 0; i < information.length; i++) {
      for (let j = 0; j < x.length; j++) {
        if (information[i].name === x[j].heading) {
          x[j].count = information[i].count;
          break;
        }
        if (information[i].name === "Total Inquery") {
          totalquery = information[i].count;
        }
      }
    }
    setData(x);
    var COLORS = [];
    while (COLORS.length < ratio.length) {
      COLORS.push(`rgb(${rand(0, 255)}, ${rand(0, 255)}, ${rand(0, 255)})`);
    }
    setColor(COLORS);

    let ang = [];
    let rat = [...ratio];
    for (let i = 0; i < rat.length; i++) {
      let a, p;
      if (totalquery !== 0) {
        p = (rat[i].count * 100) / totalquery;
        a = (rat[i].count * 360) / totalquery;
        p = Math.round(p * 100) / 100;
        a = Math.round(a * 100) / 100;
      } else {
        a = 0;
        p = 0;
      }
      rat[i].precent = p;
      if (i !== 0) {
        a += ang[ang.length - 1];
      }
      if (a === 360) {
        a--;
      }
      if (a === 0) a++;
      ang.push(a);
    }

    setAngle(ang);
    setRatio(rat);
    const m = [];
    for (let i = 0; i < date.length; i++) {
      m.push(date[i].substring(0, 10));
    }
    setmark(m);
    const mont = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    let threeMonth = [];
    var d = new Date(),
      y = d.getFullYear(),
      mo = d.getMonth();
    let c1 = ["orange", "whitesmoke"],
      c2 = ["red", "whitesmoke"],
      c3 = ["yellow", "whitesmoke"];
    for (let i = -2; i < 1; i++) {
      var firstDay = new Date(y, mo + i, 1);
      var lastDay = new Date(y, mo + i + 1, 0);
      firstDay = moment(firstDay).format("YYYY-MM-DD");
      lastDay = moment(lastDay).format("YYYY-MM-DD");
      console.log(firstDay, lastDay);
      var mon = mo + i;
      if (mon < 0) {
        mon += 12;
      }
      let count = 0;
      for (let j = 0; j < date.length; j++) {
        if (date[j] >= firstDay && date[j] <= lastDay) {
          count++;
        }
      }
      var angle;
      if (date.length === 0) {
        angle = 0;
        count = 0;
      } else {
        angle = (count * 360) / date.length;
        count = (count * 100) / date.length;
        count = Math.round(count * 100) / 100;
        angle = Math.round(angle * 100) / 100;
      }

      if (angle === 360) angle--;
      if (angle === 0) angle++;

      let x1;
      if (i === -2) {
        x1 = c1;
      } else if (i === -1) {
        x1 = c2;
      } else x1 = c3;
      threeMonth.push({
        month: mont[mon],
        percent: count,
        angle: [angle],
        color: x1,
      });
    }
    console.log(threeMonth);
    setMonth(threeMonth);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className={style.home}>
      <div className={style.card}>
        {data.map((option) => {
          return <Card option={option} />;
        })}
      </div>
      <div className={style.bars}>
        <div className={style.ratio}>
          <p>Travel Booking Ratio</p>
          <div className={style.ratiodiv}>
            <CircularBar
              scale={1.5}
              angleTransition={angle}
              colors={color}
              stroke={{ width: 15 }}
              title={{
                name: "Booking Ratio",
                fontSize: "12",
                fontWeight: "800",
                align: "middle",
              }}
            />
            <div>
              {ratio.map((x, index) => {
                return (
                  <p style={{ color: color[index] }}>
                    {`${x.precent}%`} {x.name}
                  </p>
                );
              })}
            </div>
          </div>
        </div>
        <div className={style.overview}>
          <p> Booking Overview</p>
          <div className={style.overviewdiv}>
            {month.map((m) => {
              return (
                <div>
                  <CircularBar
                    scale={1}
                    angleTransition={m.angle}
                    colors={m.color}
                    stroke={{ width: 15 }}
                    title={{
                      name: `${m.percent}%`,
                      fontSize: "20",
                      fontWeight: "800",
                      align: "middle",
                    }}
                    fontSize="50"
                    showValue="true"
                  />
                  <p>{m.month}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <Calendar
            style={{ height: 500 }}
            onChange={onChange}
            value={value}
            tileClassName={({ date, view }) => {
              if (mark.find((x) => x === moment(date).format("YYYY-MM-DD"))) {
                return `${style.highlightDate}`;
              }
            }}
            tileDisabled={({ date }) => date.getDay() === 0}
          ></Calendar>
        </div>
      </div>
      <Loading Loading={loading} />
    </div>
  );
}

export default Home;
