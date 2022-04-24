import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import style from "./Profile.module.css";
import axios from "axios";
import { TOKEN_ID } from "../../../../utils/constants";
import { useAuth } from "../../../../context/AuthContext";
import DeleteIcon from "@mui/icons-material/Delete";
import * as ROUTES from "../../../../constants/routes";
import { Input, Label } from "reactstrap";
import Loading from "../../../../pages/Loading";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Form } from "react-bootstrap";

function Profile({ closeButton, user, updateHandler }) {
  const [newpassword, setNewPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("Mr");
  const [sex, setSex] = useState("Male");
  const [fname, setfname] = useState("");
  const [lname, setlname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [emergencyPhone, setemergencyPhone] = useState("");
  const [places, setPlaces] = useState(["", "", ""]);
  const [uniqueCode, setuniqueCode] = useState("");
  const [commission, setCommission] = useState("");
  const [CountryCity, setCountryCity] = useState([]);
  const [loading, setloading] = useState("");
  const [department, setdepartment] = useState("");
  const [department_role, setdepartment_role] = useState("");
  const [currentCountry, setCurrentCountry] = useState("");
  const [emailsign, setemailsign] = useState("");

  const auth = useAuth();
  const role = auth.user.role;
  const profileRole = user.role;

  const handlePasswordChange = async () => {
    if (newpassword !== confirmpassword) {
      alert("Password and confirm password dont match");
      return;
    }
    setloading(true);
    await axios({
      method: "post",
      url: ROUTES.BASELINK + "/api/auth/changepassword",
      data: {
        user: user._id,
        newpassword: newpassword,
      },
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem(TOKEN_ID),
      },
    }).then((res) => {
      console.log("in res");
      console.log(res);
      updateHandler(true);
      alert("Changed password successfully");
    });
    setloading(false);
  };

  const initialValues = (User) => {
    let name = User.username.split(" ");
    setfname(name[0]);
    let lastname = "";
    for (let i = 1; i < name.length; i++) {
      lastname += name[i];
    }
    setlname(lastname);
    setEmail(User.emailId);
    setPhone(User.mobileNo);
    setdepartment(User.department);
    setdepartment_role(User.departmentRole);
    if (User.gender) {
      setGender(User.gender);
    }
    if (User.sex) {
      setSex(User.sex);
    }
    if (User.emergencyPhone) {
      setemergencyPhone(User.emergencyPhone);
    }
    setuniqueCode(User.uniqueCode);
    setPlaces(User.resisteredPlace);
    setCommission(User.commission);
    setemailsign(User.emailSign);
  };

  const handleSave = async () => {
    if (gender === "") {
      alert("Choose Gender");
      return;
    }
    if (sex === "") {
      alert("Choose sex");
      return;
    }
    if (fname === "") {
      alert("Fill first Name");
      return;
    }
    if (phone === "") {
      alert("Fill Phone No");
      return;
    }
    if (phone.length < 10) {
      alert("Phone No has digit less than 10");
      return;
    }
    if (emergencyPhone !== "" && emergencyPhone.length < 10) {
      alert("emergencyPhone No has digit less than 10");
      return;
    }
    console.log(sex);
    //return;
    setloading(true);

    await axios({
      method: "post",
      url: ROUTES.BASELINK + "/vendor/personalInfo",
      data: {
        user: user._id,
        info: {
          gender: gender,
          sex: sex,
          username: fname + " " + lname,
          mobileNo: phone,
          emergencyPhone: emergencyPhone,
          uniqueCode: uniqueCode,
          commission: commission,
          resisteredPlace: places,
        },
      },
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem(TOKEN_ID),
      },
    }).then((res) => {
      initialValues(res.data.data);
      alert("Saved successfully");
    });
    setloading(false);
  };

  const getCountryandCity = () => {
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
        setCountryCity(res.data.data[0].place);
      })
      .catch((err) => {
        console.log("error in fetching quries", err);
      });
  };

  useEffect(() => {
    getCountryandCity();
    initialValues(user);
  }, [user]);

  const handleAddPlace = () => {
    let list = [...places];
    for (let i = 0; i < list.length; i++) {
      if (currentCountry === list[i]) {
        alert("Already added");
        return;
      }
    }
    list.push(currentCountry);
    setPlaces(list);
  };

  const handleDel = (index) => {
    let list = [...places];
    list.splice(index, 1);
    setPlaces(list);
  };

  return (
    <div className={style.profile}>
      <Loading Loading={loading} />
      <div className={style.profileSection}>
        <h3>Profile</h3>
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
              Gender
            </Label>
            <Input
              className="query-Input"
              name="Gender"
              id="Gender"
              type="select"
              onChange={(e) => setGender(e.target.value)}
              required
            >
              <option value="Mr" selected={gender === "Mr"}>
                Mr
              </option>
              <option value="Mrs" selected={gender === "Mrs"}>
                Mrs
              </option>
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
            <Label className="query-Label" for="queryType">
              Sex
            </Label>
            <Input
              className="query-Input"
              name="Sex"
              id="Sex"
              type="select"
              onChange={(e) => setSex(e.target.value)}
              required
            >
              <option value="Male" selected={sex === "Male"}>
                Male
              </option>
              <option value="Female" selected={sex === "Female"}>
                Female
              </option>
              <option value="Others" selected={sex === "Others"}>
                Others
              </option>
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
            <Label className="query-Label" for="queryNo">
              First Name
            </Label>

            <Input
              className="query-Input"
              value={fname}
              onChange={(e) => setfname(e.target.value)}
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
              Last Name
            </Label>
            <Input
              className="query-Input"
              value={lname}
              onChange={(e) => setlname(e.target.value)}
              required
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
              Email Address
            </Label>
            <Input
              className="query-Input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled
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
            <Label
              className="query-Label"
              for="queryName"
              style={{ marginTop: "-20px" }}
            >
              Mobile
            </Label>
            <PhoneInput
              placeholder="Enter phone number"
              value={phone}
              onChange={(e) => {
                setPhone(e);
              }}
              inputStyle={{
                width: "100%",
              }}
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
              Emergency Phone
            </Label>
            <PhoneInput
              placeholder="Enter phone number"
              value={emergencyPhone}
              onChange={(e) => {
                setemergencyPhone(e);
              }}
              inputStyle={{
                width: "100%",
              }}
            />
          </div>
          {profileRole === "admin" && (
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
                Department
              </Label>
              <Input
                value={department}
                readOnly
              />
            </div>
          )}
          {profileRole === "admin" && (
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
                Role
              </Label>
              <Input
                value={department_role}
                readOnly
              />
            </div>
          )}
          {profileRole === "admin" && (
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
              style={{ marginTop: "20px" }}
            >
              <h5> Email Signature</h5>
              <Form.Control
                as="textarea"
                rows={5}
                className="query-detail"
                name="queryDetail"
                type="text"
                value={emailsign}
                readOnly
              />
            </Form.Group>
          )}
        </div>
      </div>
      {profileRole === "supplier" && (
        <div className={style.profileSection}>
          <h3>Information</h3>
          <div
            className="row mt-4 text-left"
            style={{
              display: "flex",
              justifyContent: "flex-start",
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
                Client Code
              </Label>
              <Input
                className="query-Input"
                required
                value={uniqueCode}
                onChange={(e) => setuniqueCode(e.target.value)}
                type="text"
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
                Commission
              </Label>
              <Input
                className="query-Input"
                value={commission}
                onChange={(e) => setCommission(e.target.value)}
                type="text"
              />
            </div>
          </div>
        </div>
      )}
      {profileRole === "supplier" && (
        <div className={style.profileSection}>
          <h3>Registered Places</h3>
          <div
            className="row mt-4 text-left"
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            {places.map((p, i) => {
              return (
                <div
                  className="col-4"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                  }}
                >
                  <Input
                    className="query-Input"
                    value={p}
                    disabled
                    type="text"
                  />
                  {role === "admin" && (
                    <DeleteIcon
                      style={{
                        fontSize: "30px",
                        color: "red",
                        marginTop: "5px",
                        marginLeft: "10px",
                        cursor: "pointer",
                      }}
                      onClick={() => handleDel(i)}
                    />
                  )}
                </div>
              );
            })}
            {places.length === 0 && <p>No Registered place found</p>}
          </div>
          {role === "admin" && (
            <div className={style.addplace}>
              <Input
                name="Country"
                id="Country"
                type="select"
                onChange={(e) => {
                  //handleCity(e.target.value);
                  setCurrentCountry(e.target.value);
                }}
                style={{ maxWidth: "32%" }}
              >
                <option value="inital" selected disabled hidden>
                  Choose
                </option>
                {CountryCity.map((c, i) => {
                  return (
                    <option value={c.country.name}>{c.country.name}</option>
                  );
                })}
              </Input>
              <Button onClick={handleAddPlace}>Add</Button>
            </div>
          )}
        </div>
      )}
      <div className={style.profileSectionButton}>
        <Button onClick={handleSave}>Save</Button>
        <Button variant="danger" onClick={closeButton}>
          Cancel
        </Button>
      </div>
      <div className={style.profileSection}>
        <h3>Change Password</h3>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
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
              New Password
            </Label>
            <Input
              type="password"
              onChange={(e) => {
                setNewPassword(e.target.value);
              }}
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
              Confirm New Password
            </Label>
            <Input
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
          </div>
          {/* <TextField
            type="password"
            helperText="New Password"
            onChange={(e) => {
              setNewPassword(e.target.value);
            }}
            InputProps={{ className: style.textinput }}
            className={style.textField}
            margin="dense"
          /> */}
          {/* <TextField
            helperText="Confirm New Password"
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            InputProps={{ className: style.textinput }}
            className={style.textField}
            margin="dense"
          /> */}
        </div>
        <div className={style.profileSectionButton}>
          <Button onClick={handlePasswordChange}>Change Password</Button>
          <Button variant="danger" onClick={closeButton}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
