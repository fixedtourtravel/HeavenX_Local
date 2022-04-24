import React, { useState } from "react";
import "../styles/login.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import * as ROUTES from "../constants/routes";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Loading from "./Loading";
import { TOKEN_ID } from "../utils/constants";
import Navbar from "./Navbar/Navbar";

export default function Login() {
  const [active, setActive] = useState(true);
  const [loading, setloading] = useState(false);
  const history = useHistory();
  const auth = useAuth();
  const [showPassword, setshowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (obj) => {
    setloading(true);
    const response = await fetch(ROUTES.BASELINK + "/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": `${localStorage.getItem(TOKEN_ID)}`,
      },
      body: JSON.stringify({
        emailId: obj.emailId,
        password: obj.password,
        uniqueCode: obj.code,
        role: active ? "client" : "supplier",
      }),
    });
    const data = await response.json();
    if (data.success) {
      setloading(false);
      auth.login(data.data.user, data.data.token);
      if (data.data.user.role === "supplier") {
        history.push("/vendor/home");
      } else {
        history.push("/query");
      }
    } else {
      alert("Error: " + data.msg);
    }
    setloading(false);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <Navbar />
      <div className="container-fluid loginpage">
        <Loading Loading={loading} />
        <div className="row">
          <div className="col-4 offset-7">
            <div className="container-fluid loginBox">
              <div className="row">
                <div className="col-12 login-header">
                  <h1>Log in</h1>
                  <div className="login-switch">
                    <div
                      className={active ? "loginactive" : "loginnotactive"}
                      onClick={() => setActive(true)}
                    >
                      Client
                    </div>
                    <div
                      className={!active ? "loginactive" : "loginnotactive"}
                      onClick={() => setActive(false)}
                    >
                      Supplier
                    </div>
                  </div>
                </div>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row mt-2">
                  {!active && (
                    <div className="col-12">
                      <TextField
                        fullWidth
                        label="Supplier Code"
                        variant="standard"
                        name="code"
                        id="code"
                        size="medium"
                        inputProps={{ style: { fontSize: 24 } }}
                        InputLabelProps={{
                          style: { fontSize: 24, opacity: 0.5 },
                        }}
                        {...register("code", {
                          required: "This field is required.",
                        })}
                        error={Boolean(errors.code)}
                        helperText={errors.code?.message}
                      />
                    </div>
                  )}
                </div>
                <div className="row mt-3">
                  <div className="col-12">
                    <TextField
                      fullWidth
                      label="Email Id"
                      variant="standard"
                      name="emailId"
                      id="emailId"
                      inputProps={{ style: { fontSize: 24 } }}
                      InputLabelProps={{
                        style: { fontSize: 24, opacity: 0.5 },
                      }}
                      {...register("emailId", {
                        required: "This field is required.",
                        pattern: {
                          value: /\S+@\S+\.\S+/,
                          message: "Invalid Email Id.",
                        },
                      })}
                      error={Boolean(errors.emailId)}
                      helperText={errors.emailId?.message}
                    />
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-12">
                    <TextField
                      fullWidth
                      type={showPassword ? "text" : "password"}
                      label="Password"
                      variant="standard"
                      name="password"
                      id="password"
                      inputProps={{ style: { fontSize: 24 } }}
                      InputLabelProps={{
                        style: { fontSize: 24, opacity: 0.5 },
                      }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() => setshowPassword((prev) => !prev)}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff className="password-visibility-icon" />
                              ) : (
                                <Visibility className="password-visibility-icon" />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      {...register("password", {
                        required: "This field is required.",
                      })}
                      error={Boolean(errors.password)}
                      helperText={errors.password?.message}
                    />
                  </div>
                </div>
                <div className="row pt-3">
                  <div className="col-12">
                    <Button
                      type="submit"
                      className="login-btn"
                      variant="contained"
                      color="success"
                    >
                      <h4 className="login-btn-text">Login</h4>
                    </Button>
                  </div>
                </div>
              </form>
              <div className="row pt-2">
                <div className="col-12">
                  <div className="login-signup-text">
                    Don't have an account?{" "}
                    <Link to={ROUTES.SIGNUP} className="login-signup-link">
                      Sign up
                    </Link>
                  </div>
                </div>
                <div className="col-12">
                  <div className="login-signup-text">
                    <Link
                      to={ROUTES.FORGOTPASSWORD}
                      className="login-signup-link"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
