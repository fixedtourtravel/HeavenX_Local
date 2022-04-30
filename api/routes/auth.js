const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { v4: uuidv4 } = require("uuid");
const sendEmail = require("../utils/email");
const { customAlphabet } = require("nanoid");
const isLoggedIn = require("../middleware/isLoggedIn");
const alphabet = "0123456789";
const nanoid = customAlphabet(alphabet, 7);

router.post("/signup", async (req, res) => {
  const { emailId } = req.body;
  const hashpwd = await bcrypt.hash(req.body.password, 10);
  try {
    let user = await User.findOne({ emailId });

    if (user) {
      return res.send({
        success: false,
        msg: "User already exists.",
      });
    }

    let uniqueCode = nanoid(); //generate unique code
    let token = uuidv4(); //generate unique token for verfication purpose

    req.body.password = hashpwd;
    req.body.uniqueCode = uniqueCode;
    req.body.token = token;
    if (req.body.role == "admin") {
      req.body.isVerifiedBySuperAdmin = true;
      req.body.isVerified = true;
    }

    req.body.companyInfo = { companyName: req.body.companyName };
    user = new User(req.body);
    await user.save();

    sendEmail(token, user, 2);
    return res.send({
      success: true,
      msg: "User registered please check yor mail for verification.",
      uniqueCode: user.uniqueCode,
    });
  } catch (err) {
    console.log(`Error : ${err.message}`);
    return res.send({ success: false, msg: "Server Error" });
  }
});

router.post("/login", async (req, res) => {
  const { emailId, password, uniqueCode, role } = req.body;
  try {
    let user = await User.findOne({ emailId });
    console.log(role);
    if (!user) {
      return res.send({ success: false, msg: "User is not registered." });
    }

    let isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.send({ success: false, msg: "Incorrect Username/Password" });
    }
    let isMatchUniqueCodeUser = await User.findOne({ uniqueCode });
    //console.log(user.uniqueCode);
    //console.log(isMatchUniqueCodeUser);
    if (role == "supplier") {
      if (
        !isMatchUniqueCodeUser ||
        user.uniqueCode !== isMatchUniqueCodeUser.uniqueCode
      ) {
        return res.send({ success: false, msg: "Unique Code is not valid." });
      }
    }
    console.log(user.role, role);
    if (user.role !== role) {
      return res.send({ success: false, msg: "Role is not valid." });
    }

    if (!user.isVerified) {
      return res.send({ success: false, msg: "User is not verified." });
    }
    if (role == "admin" && !user.isVerifiedBySuperAdmin) {
      return res.send({
        success: false,
        msg: "User is not verified by Super Admin.",
      });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "720h",
    });
    res.json({
      success: true,
      msg: "User successfully logged in!",
      data: {
        token: token,
        user: user,
      },
    });
  } catch (err) {
    console.log(`Error : ${err.message}`);
    res.status(500).json({ success: false, msg: "Server Error" });
  }
});

router.get("/user/:token", async (req, res) => {
  try {
    //console.log("get user from token backend");
    const token = jwt.verify(req.params.token, process.env.JWT_SECRET);
    //console.log("token:");
    //console.log(token.user.id);

    if (!token) return res.send({ success: false, data: "No token found." });

    const user = await User.findById(token.user.id);
    //console.log(user);
    if (user) {
      return res.send({ success: true, data: user });
    } else {
      return res.send({ success: false, data: "No token" });
    }
  } catch (err) {
    //console.log("err");
    console.log(err);
    return res.send({ success: false, data: "Server Error", err: err });
  }
});

router.post("/forgotpassword", async (req, res) => {
  try {
    let { email } = req.body;
    let user = await User.findOne({ emailId: email.trim() });
    console.log(user);
    if (user) {
      sendEmail(user.token, user, 1);

      return res.send({
        success: true,
        message: "Check email for reset link",
      });
    } else {
      return res.send({
        success: false,
        message: "Email not registered",
      });
    }
  } catch (err) {
    console.log(`Error : ${err.message}`);
    return res.send({ success: false, message: "Server Error." });
  }
});

router.post("/changepassword", isLoggedIn, async (req, res) => {
  try {
    let id = req.user.id;
    // Admin can also change vendor password so sending user id of vendor
    // in req.body if admin has reqested for password change for vendor
    if (req.body.user) {
      id = req.body.user;
    }
    let user = await User.findById(id);

    if (user) {
      let hashpwd = await bcrypt.hash(req.body.newpassword, 10);
      user.password = hashpwd;
      await user.save();
      // res.redirect("http://localhost:3000/login");
      return res.send({
        success: true,
        data: "Password changed successfully",
      });
    } else {
      return res.send({ success: false, data: "User doesnt exist" });
    }
  } catch (err) {
    return res.send({ success: false, msg: "Server Error" });
  }
});

router.post("/resetpassword/:token", async (req, res) => {
  try {
    let urltoken = req.params.token;
    const hashpwd = await bcrypt.hash(req.body.password, 10);
    let user = await User.findOne({ token: urltoken });
    console.log(user);
    if (user) {
      //reset token and take in new password and set new password in db
      user.token = uuidv4(); //we dont want user to beable to use same reset link again
      user.password = hashpwd;

      await user.save();
      return res.send({
        success: true,
        message: "Password Reset successful",
      });
    } else {
      return res.send({
        success: false,
        message: "Something went wrong on your end",
      });
    }
  } catch (err) {
    console.log(err);
    return res.send({ success: false, message: "Server Error" });
  }
});

// Not used
router.post("/reverify", async (req, res) => {
  try {
    const user = await User.findOne({ emailId: req.body.email.trim() });
    console.log("user in reverify");
    console.log(user);
    if (user) {
      sendEmail(user.token, user, 2);
      return res.send({
        success: true,
        message: "Verification link is sent on your email",
      });
    } else {
      return res.send({
        success: false,
        message: "User is not registered, please signup",
      });
    }
  } catch (err) {
    console.log(`Error : ${err.message}`);
    res.status(500).json({ success: false, msg: "Server Error." });
  }
});
// Not used
router.get("/verifyemail/:token", async (req, res) => {
  //console.log("verify email");
  try {
    let compareToken = req.params.token;
    //console.log(compareToken);

    let user = await User.findOne({ token: compareToken });
    //console.log(user);

    if (user) {
      await User.updateOne(
        { token: compareToken },
        { $set: { isVerified: true, token: uuidv4() } }
      );

      //console.log("User Verified and token reset")
      // res.redirect("http://localhost:3000/login");
      return res.send({
        success: true,
        message: "Congratulation, Email is Verified",
      });
    } else {
      return res.send({
        success: false,
        message: "Link expired, try to reverify",
      });
    }
  } catch (err) {
    console.log(err);
    return res.send({ success: false, message: "Server Error" });
  }
});

router.post("/login/asVender", isLoggedIn, async (req, res) => {
  const { emailId } = req.body;
  try {
    // admin can login as vender so check if requested user is loggedin and it is supperadmin
    let reqUserId, reqUser;
    reqUserId = req.user.id;
    reqUser = await User.findById(reqUserId);
    let user = await User.findOne({ emailId });

    if (reqUser.isVerifiedBySuperAdmin) {
      if (!user.isVerified) {
        return res.send({
          success: false,
          msg: "User is not verified, can't login.To Login please verify through email",
        });
      }
    } else {
      return res.send({
        success: false,
        msg: "You are not verified Admin, So can't login in vender account.",
      });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "720h",
    });
    res.json({
      success: true,
      msg: "User successfully logged in!",
      data: {
        token: token,
        user: user,
      },
    });
  } catch (err) {
    console.log(`Error : ${err.message}`);
    res.status(500).json({ success: false, msg: "Server Error" });
  }
});

router.post("/updateUser", async (req, res) => {
  try {
    const { id, data } = req.body;
    console.log(id, data);
    const hashpwd = await bcrypt.hash(data.password, 10);
    data.password = hashpwd;

    const user = await User.findByIdAndUpdate(id, data);
    console.log(user);

    res.json({
      success: true,
      msg: "User Updated",
    });
  } catch (err) {
    console.log(`Error : ${err.message}`);
    res.status(500).json({ success: false, msg: "Server Error" });
  }
});

module.exports = router;
