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

export default function SupplierSignUp() {
  const [showPassword, setshowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  const onSubmit = async (obj) => {
    console.log(obj);
    const response = await fetch(ROUTES.BASELINK+ "/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        emailId: obj.supplierEmailId,
        password: obj.supplierPassword,
        role: "supplier",
        username: obj.supplierUserName,
        mobileNo: obj.supplierMobileNo,
        companyName: obj.companyName,
      }),
    });
    console.log("response : ", response);
    const data = await response.json();
    console.log("response json : ", data);
    if (data.success) {
      alert(
        `Successfully registered as supplier ,verification mail sent on email.`
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
      <div className="">
        <TextField
          fullWidth
          id="companyName"
          name="companyName"
          label="Company Name"
          variant="standard"
          size="medium"
          inputProps={{ style: { fontSize: 24 } }}
          InputLabelProps={{ style: { fontSize: 24, opacity: 0.5 } }}
          control={control}
          {...register("companyName", {
            required: "This field is required.",
            minLength: { value: 3, message: "Minimum 3 characters required." },
          })}
          error={Boolean(errors.companyName)}
          helperText={errors.companyName?.message}
        />
      </div>
      <div className="">
        <TextField
          fullWidth
          id="supplierUserName"
          name="supplierUserName"
          label="User Name"
          variant="standard"
          size="medium"
          inputProps={{ style: { fontSize: 24 } }}
          InputLabelProps={{ style: { fontSize: 24, opacity: 0.5 } }}
          control={control}
          {...register("supplierUserName", {
            required: "This field is required.",
            minLength: { value: 3, message: "Minimum 3 characters required." },
          })}
          error={Boolean(errors.supplierUserName)}
          helperText={errors.supplierUserName?.message}
        />
      </div>
      <div className="">
        <TextField
          type="number"
          fullWidth
          id="supplierMobileNo"
          name="supplierMobileNo"
          label="Mobile No."
          variant="standard"
          size="medium"
          inputProps={{ style: { fontSize: 24 } }}
          InputLabelProps={{ style: { fontSize: 24, opacity: 0.5 } }}
          control={control}
          {...register("supplierMobileNo", {
            required: "This field is required.",
            minLength: { value: 9, message: "Invalid Phone No." },
          })}
          error={Boolean(errors.supplierMobileNo)}
          helperText={errors.supplierMobileNo?.message}
        />
      </div>
      <div className="">
        <TextField
          type="text"
          fullWidth
          id="supplierEmailId"
          name="supplierEmailId"
          label="Email Id"
          variant="standard"
          size="medium"
          inputProps={{ style: { fontSize: 24 } }}
          InputLabelProps={{ style: { fontSize: 24, opacity: 0.5 } }}
          control={control}
          {...register("supplierEmailId", {
            required: "This field is required.",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Invalid Email Id.",
            },
          })}
          error={Boolean(errors.supplierEmailId)}
          helperText={errors.supplierEmailId?.message}
        />
      </div>
      <div className="">
        <TextField
          type={showPassword ? "text" : "password"}
          fullWidth
          id="supplierPassword"
          name="supplierPassword"
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
          {...register("supplierPassword", {
            required: "This field is required.",
            minLength: { value: 6, message: "Password too short." },
          })}
          error={Boolean(errors.supplierPassword)}
          helperText={errors.supplierPassword?.message}
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
          <Link to={ROUTES.LOGIN} className="signup-login-link">
            Log In
          </Link>
        </div>
      </div>
      <div className="mt-2">
        <div className="signup-login-text">
          Resend Verification Link?
          <Link to={ROUTES.REVERIFY} className="signup-login-link">
            Reverify
          </Link>
        </div>
      </div>
    </form>
  );
}
