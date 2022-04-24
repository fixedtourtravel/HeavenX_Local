import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import style from "./Profile.module.css";
import axios from "axios";
import { TOKEN_ID } from "../../../../utils/constants";
import { useAuth } from "../../../../context/AuthContext";
import * as ROUTES from "../../../../constants/routes";
import { Input, Label } from "reactstrap";
import FileDownload from "js-file-download";
import { Autocomplete, TextField } from "@mui/material";
import { data } from "../../../../countryCityPin";

function Profile({ closeButton, user, updateHandler }) {
  const [businessName, setbusinessName] = useState("");
  const [companyName, setcompanyName] = useState("");
  const [natureOfBusiness, setnatureOfBusiness] = useState("");
  const [businessType, setbusinessType] = useState("");
  const [address, setaddress] = useState("");
  const [country, setcountry] = useState("");
  const [state, setstate] = useState("");
  const [city, setcity] = useState("");
  const [zipCode, setzipCode] = useState("");
  const [Country, setCountry] = useState([]);
  const [State, setState] = useState([]);
  const [City, setCity] = useState([]);
  const [Pin, setPin] = useState([]);
  const [landMark, setlandMark] = useState("");
  const [registrationNo, setregistrationNo] = useState("");
  const [panNo, setpanNo] = useState("");
  const [gstNo, setgstNo] = useState("");
  const [accountName, setaccountName] = useState("");
  const [bankName, setbankName] = useState("");
  const [Bankaddress, setBankaddress] = useState("");
  const [branch, setbranch] = useState("");
  const [accountNo, setaccountNo] = useState("");
  const [ifsc, setifsc] = useState("");
  const [logo, setlogo] = useState("");
  const [gstCertificate, setgstCertificate] = useState("");
  const [panCard, setpanCard] = useState("");
  const [shopFrontView, setshopFrontView] = useState("");
  const auth = useAuth();
  const role = auth.user.role;
  const disable = role === "supplier" || role === "client";

  const CompanyInfo = (User) => {
    const company = User.companyInfo;
    if (company) {
      setbusinessName(company.businessName);
      setcompanyName(company.companyName);
      setnatureOfBusiness(company.natureOfBusiness);
      setbusinessType(company.businessType);
      setaddress(company.address);
      setcountry(company.country);
      setstate(company.state);
      setcity(company.city);
      setzipCode(company.zipCode);
      setlandMark(company.landMark);
    }
  };

  const taxInfo = (User) => {
    const tax = User.taxInfo;
    if (tax) {
      setregistrationNo(tax.registrationNo);
      setgstNo(tax.gstNo);
      setpanNo(tax.panNo);
    }
  };

  const BankInfo = (User) => {
    const bank = User.bankInfo;
    if (bank) {
      setaccountName(bank.accountName);
      setbankName(bank.bankName);
      setaccountNo(bank.accountNo);
      setBankaddress(bank.Bankaddress);
      setbranch(bank.branch);
      setifsc(bank.ifsc);
    }
  };

  const handleSave = async () => {
    await axios({
      method: "post",
      url: ROUTES.BASELINK + "/vendor/businessInfo",
      data: {
        user: user._id,
        info: {
          companyInfo: {
            businessName: businessName,
            businessType: businessType,
            natureOfBusiness: natureOfBusiness,
            address: address,
            country: country,
            state: state,
            city: city,
            zipCode: zipCode,
            landMark: landMark,
            companyName: companyName,
          },
          taxInfo: {
            registrationNo: registrationNo,
            panNo: panNo,
            gstNo: gstNo,
          },
          bankInfo: {
            accountName: accountName,
            bankName: bankName,
            Bankaddress: Bankaddress,
            branch: branch,
            accountNo: accountNo,
            ifsc: ifsc,
          },
        },
      },
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem(TOKEN_ID),
      },
    }).then((res) => {
      CompanyInfo(res.data.data);
      BankInfo(res.data.data);
      taxInfo(res.data.data);
      alert("Saved successfully");
    });
  };

  const handleSaveDocument = async () => {
    const formData = new FormData();
    formData.append("logo", logo);
    formData.append("gstCertificate", gstCertificate);
    formData.append("panCard", panCard);
    formData.append("shopFrontView", shopFrontView);

    await axios({
      method: "post",
      url: ROUTES.BASELINK + `/vendor/businessDocument/${user._id}`,
      data: formData,
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem(TOKEN_ID),
      },
    }).then((res) => {
      console.log(res.data.data);
      alert("Saved successfully");
    });
  };

  const handleApprove = async () => {
    await axios({
      method: "post",
      url: ROUTES.BASELINK + "/admin/approve",
      data: { user: user._id },
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      alert(res.data.message);
    });
  };

  const downloadFile = async (file) => {
    await axios({
      method: "POST",
      url: ROUTES.BASELINK + "/vendor/download",
      responseType: "blob",
      data: {
        userId: user._id,
        fileName: file,
      },
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      console.log(res);
      if (file === "logo") {
        file = file + ".png";
      } else {
        file = file + ".pdf";
      }

      FileDownload(res.data, file);
    });
  };

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

  useEffect(() => {
    console.log(user);
    CompanyInfo(user);
    BankInfo(user);
    taxInfo(user);
    CountryStateCityPin();
  }, [user]);

  return (
    <div className={style.profile}>
      <div className={style.profileSection}>
        <h3>Company Information</h3>
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
            <Label className="query-Label" for="queryType">
              Business Name
            </Label>
            <Input
              readOnly={
                disable &&
                user.companyInfo &&
                user.companyInfo.businessName !== ""
              }
              className="query-Input"
              type="text"
              onChange={(e) => setbusinessName(e.target.value)}
              value={businessName}
              required
            ></Input>
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
            <Label className="query-Label" for="queryNo">
              Company Name
            </Label>

            <Input
              readOnly={
                disable &&
                user.companyInfo &&
                user.companyInfo.companyName !== ""
              }
              className="query-Input"
              onChange={(e) => setcompanyName(e.target.value)}
              value={companyName}
              required
              type="text"
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
              Business type
            </Label>
            <Input
              type="select"
              disabled={
                disable &&
                user.companyInfo &&
                user.companyInfo.businessType !== ""
              }
              className="query-Input"
              onChange={(e) => setbusinessType(e.target.value)}
              value={businessType}
              required
            >
              <option selected disabled hidden value="initial">
                Choose a option
              </option>
              <option
                value="B2B Agency"
                selected={businessType === "B2B Agency"}
              >
                B2B Agency
              </option>
              <option
                value="Travel Agency"
                selected={businessType === "Travel Agency"}
              >
                Travel Agency
              </option>
              <option
                value="Tour Operator"
                selected={businessType === "Tour Operator"}
              >
                Tour Operator
              </option>
              <option value="DMC" selected={businessType === "DMC"}>
                DMC
              </option>
              <option value="Others" selected={businessType === "Others"}>
                Others
              </option>
            </Input>
          </div>
          {role === "client" && (
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
                Nature of Business
              </Label>
              <Input
                readOnly={
                  disable &&
                  user.companyInfo &&
                  user.companyInfo.natureOfBusiness !== ""
                }
                className="query-Input"
                onChange={(e) => setnatureOfBusiness(e.target.value)}
                value={natureOfBusiness}
              />
            </div>
          )}
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
              Registered address
            </Label>
            <Input
              readOnly={
                disable && user.companyInfo && user.companyInfo.address !== ""
              }
              className="query-Input"
              onChange={(e) => setaddress(e.target.value)}
              value={address}
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
              Country
            </Label>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={Country}
              className="query-Input"
              renderInput={(params) => <TextField {...params} size="small" />}
              disabled={
                disable && user.companyInfo && user.companyInfo.country !== ""
              }
              value={country}
              onChange={(e) => setcountry(e.target.innerText)}
            />

            {/* <Input
              readOnly={disable&&country !== ""}
              className="query-Input"
              onChange={(e) => setcountry(e.target.value)}
              value={country}
              required
            /> */}
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
              State
            </Label>
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
              disabled={
                disable && user.companyInfo && user.companyInfo.state !== ""
              }
              value={state}
            />
            {/* <Input
              readOnly={disable&&state !== ""}
              className="query-Input"
              onChange={(e) => setstate(e.target.value)}
              value={state}
            /> */}
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
              City
            </Label>
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
              disabled={
                disable && user.companyInfo && user.companyInfo.city !== ""
              }
            />
            {/* <Input
              readOnly={disable&&city !== ""}
              className="query-Input"
              onChange={(e) => setcity(e.target.value)}
              value={city}
              required
            /> */}
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
              ZipCode/Postal Code
            </Label>
            <Autocomplete
              className="query-Input"
              disablePortal
              id="combo-box-demo"
              options={Pin}
              renderInput={(params) => <TextField {...params} size="small" />}
              onChange={(e) => {
                setzipCode(e.target.innerText);
              }}
              disabled={
                disable && user.companyInfo && user.companyInfo.zipCode !== ""
              }
              value={zipCode}
            />
            {/* <Input
              readOnly={disable&&zipCode !== ""}
              className="query-Input"
              onChange={(e) => setzipCode(e.target.value)}
              value={zipCode}
              required
            /> */}
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
              Land Mark
            </Label>
            <Input
              readOnly={
                disable && user.companyInfo && user.companyInfo.landMark !== ""
              }
              className="query-Input"
              onChange={(e) => setlandMark(e.target.value)}
              value={landMark}
              required
            />
          </div>
        </div>
      </div>
      <div className={style.profileSection}>
        <h3>Tax Information</h3>
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
            <Label className="query-Label" for="queryType">
              Registration No
            </Label>
            <Input
              readOnly={
                disable && user.taxInfo && user.taxInfo.registrationNo !== ""
              }
              className="query-Input"
              type="text"
              onChange={(e) => setregistrationNo(e.target.value)}
              value={registrationNo}
            ></Input>
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
              Pan No
            </Label>
            <Input
              readOnly={disable && user.taxInfo && user.taxInfo.panNo !== ""}
              className="query-Input"
              type="text"
              onChange={(e) => setpanNo(e.target.value)}
              value={panNo}
            ></Input>
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
              GST No
            </Label>
            <Input
              readOnly={disable && user.taxInfo && user.taxInfo.gstNo !== ""}
              className="query-Input"
              type="text"
              onChange={(e) => setgstNo(e.target.value)}
              value={gstNo}
            ></Input>
          </div>
        </div>
      </div>
      <div className={style.profileSection}>
        <h3>Bank Details</h3>
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
            <Label className="query-Label" for="queryType">
              Account Name
            </Label>
            <Input
              readOnly={
                disable && user.taxInfo && user.taxInfo.accountName !== ""
              }
              className="query-Input"
              type="text"
              onChange={(e) => setaccountName(e.target.value)}
              value={accountName}
            ></Input>
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
              Bank Name
            </Label>
            <Input
              readOnly={
                disable && user.bankInfo && user.bankInfo.bankName !== ""
              }
              className="query-Input"
              type="text"
              onChange={(e) => setbankName(e.target.value)}
              value={bankName}
            ></Input>
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
              Bank Address
            </Label>
            <Input
              readOnly={
                disable && user.bankInfo && user.bankInfo.Bankaddress !== ""
              }
              className="query-Input"
              type="text"
              onChange={(e) => setBankaddress(e.target.value)}
              value={Bankaddress}
            ></Input>
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
              Bank Branch
            </Label>
            <Input
              readOnly={disable && user.bankInfo && user.bankInfo.branch !== ""}
              className="query-Input"
              type="text"
              onChange={(e) => setbranch(e.target.value)}
              value={branch}
            ></Input>
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
              Account No
            </Label>
            <Input
              readOnly={
                disable && user.bankInfo && user.bankInfo.accountNo !== ""
              }
              className="query-Input"
              type="text"
              onChange={(e) => setaccountNo(e.target.value)}
              value={accountNo}
            ></Input>
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
              IFSC
            </Label>
            <Input
              readOnly={disable && user.bankInfo && user.bankInfo.ifsc !== ""}
              className="query-Input"
              type="text"
              onChange={(e) => setifsc(e.target.value)}
              value={ifsc}
            ></Input>
          </div>
        </div>
      </div>
      <div className={style.but}>
        <Button className={style.save} onClick={handleSave}>
          Save
        </Button>
        <Button variant="danger" onClick={closeButton}>
          Cancel
        </Button>
      </div>
      <div className={style.attachment}>
        <h3>Attached Document</h3>
        <div className={style.attachment_div}>
          <Form.Group
            controlId="formFile"
            className={`mb-3 ${style.formgroup}`}
          >
            <Form.Label>Company Logo</Form.Label>
            <Form.Control
              type="file"
              name="logo"
              accept="image/*"
              onChange={(e) => {
                setlogo(e.target.files[0]);
              }}
            />
            {user.document && user.document.logo && (
              <>
                <Button
                  variant="danger"
                  style={{ marginLeft: "0" }}
                  onClick={() => downloadFile("logo")}
                >
                  Download and Preview
                </Button>
              </>
            )}
          </Form.Group>
          <Form.Group
            controlId="formFile"
            className={`mb-3 ${style.formgroup}`}
          >
            <Form.Label>GST Certificate</Form.Label>
            <Form.Control
              type="file"
              name="gstCertificate"
              onChange={(e) => {
                setgstCertificate(e.target.files[0]);
              }}
              accept=".pdf,.doc"
              disabled={
                disable && user.document && user.document.gstCertificate
              }
            />
            {user.document && user.document.gstCertificate && (
              <Button
                variant="danger"
                style={{ marginLeft: "0" }}
                onClick={() => downloadFile("gstCertificate")}
              >
                Download and Preview
              </Button>
            )}
          </Form.Group>
          <Form.Group
            controlId="formFile"
            className={`mb-3 ${style.formgroup}`}
          >
            <Form.Label>Pan Card</Form.Label>
            <Form.Control
              type="file"
              name="panCard"
              onChange={(e) => {
                setpanCard(e.target.files[0]);
              }}
              accept=".pdf,.doc"
              disabled={disable && user.document && user.document.panCard}
            />
            {user.document && user.document.panCard && (
              <Button
                variant="danger"
                style={{ marginLeft: "0" }}
                onClick={() => downloadFile("panCard")}
              >
                Download and Preview
              </Button>
            )}
          </Form.Group>
          <Form.Group
            controlId="formFile"
            className={`mb-3 ${style.formgroup}`}
          >
            <Form.Label>Front View Shop/Business</Form.Label>
            <Form.Control
              type="file"
              name="shopFrontView"
              onChange={(e) => {
                setshopFrontView(e.target.files[0]);
              }}
              accept=".pdf,.doc"
            />
            {user.document && user.document.shopFrontView && (
              <Button
                variant="danger"
                style={{ marginLeft: "0" }}
                onClick={() => downloadFile("shopFrontView")}
              >
                Download and Preview
              </Button>
            )}
          </Form.Group>
        </div>
        <span className={style.but}>
          <Button
            className={style.save}
            onClick={() => {
              handleSaveDocument();
            }}
          >
            Save
          </Button>
          <Button variant="danger" onClick={closeButton}>
            Cancel
          </Button>
        </span>
      </div>
      {role === "admin" && (
        <Button
          className={style.approve}
          onClick={() => {
            handleApprove();
          }}
        >
          Approve
        </Button>
      )}
    </div>
  );
}

export default Profile;
