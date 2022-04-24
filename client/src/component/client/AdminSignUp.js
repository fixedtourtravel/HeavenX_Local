import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import * as ROUTES from "../../constants/routes";
import { useForm } from "react-hook-form";

export default function ClientSignUp() {
  const [showPassword, setshowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  const onSubmit = async (obj) => {
    const response = await fetch(ROUTES.BASELINK+"/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        emailId: obj.emailId,
        password: obj.password,
        role: "admin",
        username: obj.username,
        mobileNo: obj.mobileNo,
      }),
    });
    const data = await response.json();
    if (data.success) {
      alert(
        `Successfully registered as admin, verification mail sent on email.You will be verified by Super Admin as well`
      );
    } else {
      alert("Error: " + data.msg);
    }
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mt-2">
        <TextField
          fullWidth
          id="username"
          name="username"
          label="User Name"
          variant="standard"
          size="medium"
          inputProps={{ style: { fontSize: 24 } }}
          InputLabelProps={{ style: { fontSize: 24, opacity: 0.5 } }}
          control={control}
          {...register("username", {
            required: "This field is required.",
            minLength: { value: 3, message: "Minimum 3 characters required." },
          })}
          error={Boolean(errors.username)}
          helperText={errors.username?.message}
        />
      </div>
      <div className="mt-2">
        <TextField
          type="number"
          fullWidth
          id="mobileNo"
          name="mobileNo"
          label="Mobile No."
          variant="standard"
          size="medium"
          inputProps={{ style: { fontSize: 24 } }}
          InputLabelProps={{ style: { fontSize: 24, opacity: 0.5 } }}
          control={control}
          {...register("mobileNo", {
            required: "This field is required.",
            minLength: { value: 9, message: "Invalid Phone No." },
          })}
          error={Boolean(errors.mobileNo)}
          helperText={errors.mobileNo?.message}
        />
      </div>
      <div className="mt-2">
        <TextField
          type="text"
          fullWidth
          id="emailId"
          name="emailId"
          label="Email Id"
          variant="standard"
          size="medium"
          inputProps={{ style: { fontSize: 24 } }}
          InputLabelProps={{ style: { fontSize: 24, opacity: 0.5 } }}
          control={control}
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
      <div className="mt-2">
        <TextField
          type={showPassword ? "text" : "password"}
          fullWidth
          id="password"
          name="password"
          label="Password"
          variant="standard"
          size="medium"
          inputProps={{ style: { fontSize: 24 } }}
          InputLabelProps={{ style: { fontSize: 24, opacity: 0.5 } }}
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
          control={control}
          {...register("password", {
            required: "This field is required.",
            minLength: { value: 6, message: "Password too short." },
          })}
          error={Boolean(errors.password)}
          helperText={errors.password?.message}
        />
      </div>
      <div className="mt-4">
        <Button
          type="submit"
          className="signup-btn"
          variant="contained"
          color="success"
        >
          <div className="signup-btn-text">Create Account</div>
        </Button>
      </div>
      <div className="mt-2">
        <div className="signup-login-text">
          Already have an account?{" "}
          <Link to={ROUTES.ADMINLOGIN} className="signup-login-link">
            Log In
          </Link>
        </div>
      </div>
    </form>
  );
}
