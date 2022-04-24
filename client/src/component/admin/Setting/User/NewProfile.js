import React, { useEffect, useState } from "react";
import style from "./User.module.css";
import { Input } from "reactstrap";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import * as ROUTES from "../../../../constants/routes";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

function NewProfile({ setOpen, changeHandler, val, comp }) {
  const [Department, setDepartment] = useState([]);
  const [currentrole, setcurrentrole] = useState([]);
  const [logo, setLogo] = useState("");
  const [image, setimage] = useState("");
  const [fname, setFName] = useState("");
  const [lname, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setphone] = useState("");
  const [emerPhone, setEmerPhone] = useState("");
  const [sign, setsign] = useState("");
  const [password, setpassword] = useState("");
  const [role, setRole] = useState("");
  const [department, setdepartment] = useState("");
  const [permission, setpermission] = useState([]);

  const headers = {
    "Content-type": "application/json",
  };

  const getDepartment = async () => {
    axios
      .get(ROUTES.BASELINK + "/admin/getDepartment", { headers: headers })
      .then(
        (res) => {
          const depart = res.data.data;
          setDepartment(depart);
          initialValues(res.data.data);
        },
        (error) => {
          console.log(error);
          alert(error);
        }
      );
  };

  const handleRole = (value, depart) => {
    for (let i = 0; i < Department.length; i++) {
      if (Department[i].name === value) {
        setcurrentrole(Department[i].role);
        break;
      }
    }
    for (let i = 0; i < depart.length; i++) {
      if (depart[i].name === value) {
        setcurrentrole(depart[i].role);
        break;
      }
    }
    setdepartment(value);
  };

  const handleSave = async () => {
    if (fname === "") {
      alert("Please add First Name");
      return;
    }
    if (email === "") {
      alert("Please add email");
      return;
    }
    if (phone === "") {
      alert("Please add phone");
      return;
    }
    if (emerPhone === "") {
      alert("Please add Emergency Contact");
      return;
    }
    if (sign === "") {
      alert("Please add sign");
      return;
    }
    if (department === "") {
      alert("Please add department");
      return;
    }
    if (role === "") {
      alert("Please add role");
      return;
    }
    if (password === "") {
      alert("Please add password");
      return;
    }

    await axios({
      method: "post",
      url: ROUTES.BASELINK + "/api/auth/signup",
      headers: {
        "Content-type": "application/json",
      },
      data: {
        username: fname + " " + lname,
        emailId: email,
        password: password,
        role: "admin",
        mobileNo: phone,
        emergencyPhone: emerPhone,
        emailSign: sign,
        department: department,
        departmentRole: role,
        permissions: permission,
      },
    })
      .then((res) => {
        handleLogo();
        changeHandler(true);
        alert(res.data.msg);
        setOpen(false);
      })
      .catch((err) => {
        console.log("error in fetching quries", err);
      });
  };

  const handleUpdate = async () => {
    if (fname === "") {
      alert("Please add First Name");
      return;
    }
    if (email === "") {
      alert("Please add email");
      return;
    }
    if (phone === "") {
      alert("Please add phone");
      return;
    }
    if (emerPhone === "") {
      alert("Please add Emergency Contact");
      return;
    }
    if (sign === "") {
      alert("Please add sign");
      return;
    }
    if (department === "") {
      alert("Please add department");
      return;
    }
    if (role === "") {
      alert("Please add role");
      return;
    }
    if (password === "") {
      alert("Please add password");
      return;
    }

    await axios({
      method: "post",
      url: ROUTES.BASELINK + "/api/auth/updateUser",
      headers: {
        "Content-type": "application/json",
      },
      data: {
        id: val._id,
        data: {
          username: fname + " " + lname,
          emailId: email,
          password: password,
          role: "admin",
          mobileNo: phone,
          emergencyPhone: emerPhone,
          emailSign: sign,
          department: department,
          departmentRole: role,
          permissions: permission,
        },
      },
    })
      .then((res) => {
        handleLogo();
        changeHandler(true);
        alert(res.data.msg);
        setOpen(false);
      })
      .catch((err) => {
        console.log("error in fetching quries", err);
      });
  };
  const handleLogo = async () => {
    if (logo === "") return;
    const formData = new FormData();
    formData.append("logo", logo);

    await axios({
      method: "post",
      url: ROUTES.BASELINK + `/admin/adminProfilePic/${val._id}`,
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

  const initialValues = (depart) => {
    if (val) {
      console.log(val);
      getImage();
      if (val.username) {
        let i = 0;
        let f = "",
          l = "";
        while (i < val.username.length && val.username[i] !== " ") {
          f += val.username[i];
          i++;
        }
        while (i < val.username.length) {
          l += val.username[i];
          i++;
        }
        setLName(l);
        setFName(f);
      }
      if (val.emailId) {
        setEmail(val.emailId);
      }
      if (val.mobileNo) {
        setphone(val.mobileNo);
      }
      if (val.emergencyPhone) {
        setEmerPhone(val.emergencyPhone);
      }
      if (val.password) {
        setpassword(val.password);
      }
      if (val.department) {
        setdepartment(val.department);
        handleRole(val.department, depart);
      }
      if (val.departmentRole) {
        setRole(val.departmentRole);
      }
      if (val.emailSign) {
        setsign(val.emailSign);
      }
      if (val.permissions) {
        setpermission(val.permissions);
      }
    }
  };

  const getImage = async () => {
    console.log(val)
    if (val.document && val.document.logo) {
      await axios({
        method: "POST",
        url: ROUTES.BASELINK + "/admin/download",
        responseType: "blob",
        data: { img: val.document.logo },
      }).then((res) => {
        console.log(res);
        const imageObjectURL = URL.createObjectURL(res.data);
        setimage(imageObjectURL);
      });
    }
  };

  const handlepermission = (role, val) => {
    console.log("perm");
    for (let i = 0; i < role.length; i++) {
      if (role[i].name === val) {
        console.log(role[i].permissions);
        setpermission(role[i].permissions);
        break;
      }
    }
  };

  useEffect(() => {
    getDepartment();
  }, []);

  return (
    <div className={style.profile}>
      <div className={style.profilebody}>
        <div className={style.Logo}>
          <div>
            <h5>Profile Image</h5>
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
          <div>
            {image !== "" && (
              <img src={image} alt={logo} className={style.img}></img>
            )}
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ flexGrow: "1", marginRight: "10px" }}>
            <h5>First Name </h5>
            <Input
              type="text"
              value={fname}
              onChange={(e) => setFName(e.target.value)}
            ></Input>
          </div>
          <div style={{ flexGrow: "1" }}>
            <h5>Last Name </h5>
            <Input
              type="text"
              value={lname}
              onChange={(e) => setLName(e.target.value)}
            ></Input>
          </div>
        </div>
        <h5>Email</h5>
        <Input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></Input>
        <div className={style.phone}>
          <div className={style.phone1}>
            <h5>Phone </h5>
            <PhoneInput
              placeholder="Enter phone number"
              value={phone}
              onChange={(e) => {
                setphone(e);
              }}
              inputStyle={{
                width: "100%",
              }}
            />
          </div>
          <div className={style.phone2}>
            <h5>Emergency Contact </h5>
            <PhoneInput
              placeholder="Enter phone number"
              value={emerPhone}
              onChange={(e) => {
                setEmerPhone(e);
              }}
              inputStyle={{
                width: "100%",
              }}
            />
          </div>
        </div>
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
            value={sign}
            onChange={(e) => setsign(e.target.value)}
          />
        </Form.Group>
        <h5>Choose Departments </h5>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Input
            type="select"
            id="Department"
            name="Department"
            onChange={(e) => {
              handleRole(e.target.value, []);
            }}
            style={{ marginRight: "10px" }}
          >
            <option selected disabled hidden value="initial">
              Choose Department
            </option>
            {Department.map((data) => {
              return (
                <option value={data.name} selected={data.name === department}>
                  {data.name}
                </option>
              );
            })}
            {Department.length === 0 && (
              <option disabled>No Department found</option>
            )}
          </Input>
          <Input
            type="select"
            id="Role"
            name="Role"
            onChange={(e) => {
              console.log("iside");
              setRole(e.target.value);
              handlepermission(currentrole, e.target.value);
            }}
          >
            <option selected disabled hidden value="initial">
              Choose Role
            </option>
            setcurrentrole
            {currentrole.map((data) => {
              return (
                <option value={data.name} selected={data.name === role}>
                  {data.name}
                </option>
              );
            })}
            {currentrole.length === 0 && (
              <option disabled>No Role found</option>
            )}
          </Input>
        </div>
        <h5>Password</h5>
        <Input
          type="text"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
        ></Input>
        <Button onClick={comp === "userInfo" ? handleUpdate : handleSave}>
          Save
        </Button>
        <Button variant="danger" onClick={() => setOpen(false)}>
          Cancel
        </Button>
      </div>
    </div>
  );
}

export default NewProfile;
