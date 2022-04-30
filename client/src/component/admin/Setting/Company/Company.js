import React, { useEffect, useState } from "react";
import style from "./Company.module.css";
import { Input } from "reactstrap";
import * as ROUTES from "../../../../constants/routes";
import axios from "axios";
import { data } from "../../../../countryCityPin";
import { Autocomplete, TextField } from "@mui/material";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

function Company() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [logo, setLogo] = useState("");
  const [image, setimage] = useState("");
  const [address, setaddress] = useState("");
  const [country, setcountry] = useState("");
  const [state, setstate] = useState("");
  const [city, setcity] = useState("");
  const [pin, setpin] = useState("");
  const [Country, setCountry] = useState("");
  const [State, setState] = useState("");
  const [City, setCity] = useState("");
  const [Pin, setPin] = useState("");
  const [phone1, setphone1] = useState("");
  const [phone2, setphone2] = useState("");
  const [gstNo, setgstNo] = useState("");
  const [panNo, setpanNo] = useState("");
  const [emails, setEmails] = useState([]);
  const [tagline, setTagline] = useState("");

  const CountryStateCityPin = () => {
    let co = [],
      st = [];
    let coS = new Set(),
      sS = new Set();
    for (let i = 0; i < data.length; i++) {
      coS.add(data[i].country.toUpperCase());
      sS.add(data[i].state.toUpperCase());
    }
    for (let item of coS) {
      co.push({ label: item });
    }

    for (let item of sS) {
      st.push({ label: item });
    }
    setCountry(co);
    setState(st);
  };

  const handleCity = (country, state) => {
    console.log(country, state);
    let ci = [];
    let ciS = new Set();
    for (let i = 0; i < data.length; i++) {
      if (data[i].country === country && data[i].state === state) {
        ciS.add(data[i].city.toUpperCase());
      }
    }
    for (let item of ciS) {
      ci.push({ label: item });
    }
    setCity(ci);
  };

  const handlePin = (country, state, city) => {
    let p = [];
    let pS = new Set();
    for (let i = 0; i < data.length; i++) {
      if (
        data[i].country === country &&
        data[i].state === state &&
        data[i].city === city
      ) {
        pS.add(data[i].pincode.toString());
      }
    }
    for (let item of pS) {
      p.push({ label: item });
    }
    console.log(p);
    setPin(p);
  };

  const handlesave = async () => {
    if (name === "") {
      alert("please fill company name");
      return;
    }
    if (email === "") {
      alert("please fill company email");
      return;
    }
    if (logo === "") {
      alert("please fill company logo");
      return;
    }
    if (address === "") {
      alert("please fill company address");
      return;
    }
    if (country === "") {
      alert("please fill company country");
      return;
    }
    if (city === "") {
      alert("please fill company city");
      return;
    }
    if (pin === "") {
      alert("please fill company pin");
      return;
    }
    if (phone1 === "") {
      alert("please fill company phone1");
      return;
    }
    if (phone2 === "") {
      alert("please fill company phone2");
      return;
    }
    if (gstNo === "") {
      alert("please fill company gstNo");
      return;
    }
    if (panNo === "") {
      alert("please fill company panNo");
      return;
    }
    let i = 0;
    let em = [];
    while (i < email.length) {
      if (email[i] === " " || email[i] === ",") {
        i++;
        continue;
      }
      let e = "";
      while (i < email.length && email[i] !== " " && email[i] !== ",") {
        e += email[i];
        i++;
      }
      em.push(e);
    }
    setEmails(em);
    await axios({
      method: "post",
      url: ROUTES.BASELINK + "/admin/companyDetail",
      data: {
        name: name,
        email: em,
        address: address,
        country: country,
        state: state,
        city: city,
        pin: pin,
        phone1: phone1,
        phone2: phone2,
        gstNo: gstNo,
        panNo: panNo,
        tagline: tagline,
      },
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => {
        console.log(res);
        if (res.data.success) {
          handleImg();
          alert("Saved");
        }
      })
      .catch((err) => {
        console.log("error in fetching quries", err);
      });
  };

  const handleImg = async () => {
    const formData = new FormData();
    formData.append("logo", logo);

    await axios({
      method: "post",
      url: ROUTES.BASELINK + `/admin/companyLogo/`,
      data: formData,
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (!res.data.success) {
        alert("Error in saving logo");
      }
    });
  };

  const getData = async () => {
    await axios({
      method: "get",
      url: ROUTES.BASELINK + `/admin/getCompanyInfo`,
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      initialValues(res.data.data);
    });
  };

  const CompanyPic = async () => {
    await axios({
      method: "get",
      url: ROUTES.BASELINK + "/admin/comapanylogoDownload",
      responseType: "blob",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      console.log(res);
      if (res.data) {
        setLogo(res.data);
        const imageObjectURL = URL.createObjectURL(res.data);
        setimage(imageObjectURL);
      }
    });
  };

  const initialValues = (data) => {
    console.log(data);
    if (data) {
      setName(data.name);
      setcity(data.city);
      setcountry(data.country);
      setpin(data.pin);
      setstate(data.state);
      setphone1(data.phone1);
      setphone2(data.phone2);
      setpanNo(data.panNo);
      setgstNo(data.gstNo);
      setaddress(data.address);
      setTagline(data.tagline);
      if (data.email) {
        let e = "";
        for (let i = 0; i < data.email.length; i++) {
          e += data.email[i];
          if (i < data.email.length - 1) {
            e += " ";
            e += ",";
            e += " ";
          }
        }
        setEmail(e);
        CountryStateCityPin();
        handleCity(data.country, data.state);
        handlePin(data.country, data.state, data.city);
      }
    }
  };

  useEffect(() => {
    getData();
    CompanyPic();
    CountryStateCityPin();
  }, []);

  return (
    <div className={style.home}>
      <div className={style.head}>Company Information</div>
      <div className={style.body}>
        <p>
          These Information will be displayed on invoices/payment and other PDF
          documents where company info is required
        </p>
        <div className={style.company}>
          <div className={style.comLogo}>
            <h5>Company name</h5>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            ></Input>
          </div>
          <div className={style.comLogo}>
            <h5>Company Logo</h5>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const imageObjectURL = URL.createObjectURL(e.target.files[0]);
                setimage(imageObjectURL);
                setLogo(e.target.files[0]);
              }}
            ></Input>
          </div>

          <div className={style.compre}>
            {image && image !== "" && (
              <img src={image} alt={logo} className={style.logo}></img>
            )}
          </div>
        </div>
        <h5>Tagline </h5>
        <Input
          type="text"
          value={tagline}
          onChange={(e) => setTagline(e.target.value)}
        ></Input>
        <h5>
          Email Id (Multiple emails must be seperated by comma or white space)
        </h5>
        <Input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></Input>
        <h5>Address</h5>
        <Input
          type="text"
          value={address}
          onChange={(e) => setaddress(e.target.value)}
        ></Input>
        <div className={style.country}>
          <div>
            <h5>Country</h5>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={Country}
              className="query-Input"
              renderInput={(params) => <TextField {...params} size="small" />}
              value={country}
              onChange={(e) => setcountry(e.target.innerText)}
            />
          </div>
          <div>
            <h5>State</h5>
            <Autocomplete
              className="query-Input"
              disablePortal
              id="combo-box-demo"
              options={State}
              renderInput={(params) => <TextField {...params} size="small" />}
              onChange={(e) => {
                setstate(e.target.innerText);
                handleCity(country, e.target.innerText);
              }}
              value={state}
            />
          </div>
          <div>
            <h5>City</h5>
            <Autocomplete
              disablePortal
              className="query-Input"
              id="combo-box-demo"
              options={City}
              renderInput={(params) => <TextField {...params} size="small" />}
              onChange={(e) => {
                setcity(e.target.innerText);
                handlePin(country, state, e.target.innerText);
              }}
              value={city}
            />
          </div>
          <div>
            <h5>ZipCode/Postal Code</h5>
            <Autocomplete
              className="query-Input"
              disablePortal
              id="combo-box-demo"
              options={Pin}
              renderInput={(params) => <TextField {...params} size="small" />}
              onChange={(e) => {
                setpin(e.target.innerText);
              }}
              value={pin}
            />
          </div>
        </div>
        <div className={style.phone}>
          <div className={style.phone1}>
            <h5>Phone 1 </h5>
            <PhoneInput
              placeholder="Enter phone number"
              value={phone1}
              onChange={(e) => {
                setphone1(e);
              }}
            />
          </div>
          <div className={style.phone2}>
            <h5>Phone 2 </h5>
            <PhoneInput
              placeholder="Enter phone number"
              value={phone2}
              onChange={(e) => {
                setphone2(e);
              }}
            />
          </div>
        </div>
        <div className={style.country}>
          <div>
            <h5>Pan Number </h5>
            <Input
              type="text"
              value={panNo}
              onChange={(e) => setpanNo(e.target.value)}
            ></Input>
          </div>
          <div>
            <h5>GST Number </h5>
            <Input
              type="text"
              value={gstNo}
              onChange={(e) => setgstNo(e.target.value)}
            ></Input>
          </div>
        </div>
        <button className={style.button} onClick={handlesave}>
          Save Settings
        </button>
      </div>
    </div>
  );
}

export default Company;
