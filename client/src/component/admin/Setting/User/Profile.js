import React, { useEffect, useState } from "react";
import { Button, Table, Modal } from "react-bootstrap";
import axios from "axios";
import * as ROUTES from "../../../../constants/routes";
import style from "./User.module.css";
import NewProfile from "./NewProfile";
import Toogle from "./Toogle";
import UserInfo from "./UserInfo";

function Profile() {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);

  const getUser = async () => {
    await axios({
      method: "get",
      url: ROUTES.BASELINK + `/admin/getAdmin`,
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      setData(res.data.data);
      console.log(res.data.data);
    });
  };

  const changeHandler = (val) => {
    if (val) {
      getUser();
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className={style.profile}>
      <Button onClick={() => setOpen(true)} style={{ margin: "0px" }}>
        Add New Profile
      </Button>
      <div className={style.profileItem}>
        <Table striped bordered borderless hover>
          <thead>
            <tr>
              <th className={style.th}>Sr No</th>
              <th className={style.th}>Full Name</th>
              <th className={style.th}>Email</th>
              <th className={style.th}>Department</th>
              <th className={style.th}>Role</th>
              <th className={style.th}>Active</th>
            </tr>
          </thead>

          {data.map((val, i) => {
            return (
              <tbody>
                <tr style={{ backgroundColor: "white" }}>
                  <td className={style.td}>{i + 1}</td>
                  <td className={style.td}>
                    <UserInfo val={val} changeHandler={changeHandler} />
                  </td>
                  <td className={style.td}>{val.emailId} </td>
                  <td className={style.td}>{val.department} </td>
                  <td className={style.td}>{val.departmentRole} </td>
                  <td className={style.td}>
                    <Toogle active={val.isActive} id={val._id} />
                  </td>
                </tr>
              </tbody>
            );
          })}
        </Table>
      </div>
      <Modal
        show={open}
        centered
        dialogClassName={style.modal}
        backdrop="static"
        keyboard={false}
      >
        <NewProfile
          setOpen={setOpen}
          changeHandler={changeHandler}
          comp="profile"
        />
      </Modal>
    </div>
  );
}

export default Profile;
