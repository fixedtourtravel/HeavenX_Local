const express = require("express");
const isLoggedIn = require("../middleware/isLoggedIn");
const Query = require("../models/Query");
const InvoiceHistory = require("../models/InvoiceHistory");
const AdminInstruction = require("../models/Instruction");
const Invoice = require("../models/Invoice");
const User = require("../models/User");
const router = express.Router();
const sendEmail = require("../utils/emailNotify");

router.get("/getOrders", isLoggedIn, async (req, res) => {
  try {
    let user = await User.findOne({ _id: req.user.id });
    let query = await Query.find({
      queryClientCode: user.uniqueCode,
    });

    query.sort((a, b) =>
      a.createdAt < b.createdAt ? 1 : b.createdAt < a.createdAt ? -1 : 0
    );
    return res.send({ success: true, data: query });
  } catch (err) {
    console.log("Error in query.js in /orders", err);
  }
});

router.post("/createQuery", async (req, res) => {
  try {
    const newQuery = new Query(req.body);
    const query = await newQuery.save();

    let user = await User.find({}).populate("inquery");
    for (let i = 0; i < user.length; i++) {
      if (user[i].role === "supplier") {
        let supplierRegisteredPlace = user[i].resisteredPlace;
        let ok = false;
        for (let j = 0; j < supplierRegisteredPlace.length; j++) {
          for (let k = 0; k < query.arraydestination.length; k++) {
            if (
              supplierRegisteredPlace[j].toLowerCase() ===
              query.arraydestination[k].queryCountry.toLowerCase()
            ) {
              user[i].inquery.push({
                queryId: query.id,
                hold: false,
                cancel: false,
                confirm: false,
                status: ["Inquery Recieved"],
              });
              await user[i].save();
              ok = true;
              break;
            }
          }
          if (ok) {
            break;
          }
        }
      }
    }

    return res.send({ success: true, data: query });
  } catch (err) {
    console.log("Error in query.js in /createQuery", err);
    res.status(500).json(err);
  }
});

router.post("/vendorProposal", async (req, res) => {
  try {
    const history = await InvoiceHistory.find({ queryId: req.body.id });
    let ans = [];
    for (let i = 0; i < history.length; i++) {
      let invoice = history[i].history;
      let id = invoice[invoice.length - 1];
      let x = await Invoice.findById(id);
      ans.push(x);
    }
    res.send({ success: true, data: ans });
  } catch (err) {
    console.log("Error in query.js in /vendorProposal", err);
  }
});

router.post("/preData", async (req, res) => {
  try {
    const query = await Query.findById(req.body.id);
    const inst = await AdminInstruction.find();
    console.log("sending preData tp query");
    return res.send({
      success: true,
      data: { details: query, instruct: inst[0] },
    });
  } catch (err) {
    console.log("Error in query.js in /preData", err);
    return res.send({ success: false, message: "Server Error" });
  }
});

router.post("/modifyMaster", async (req, res) => {
  try {
    const id = req.body.id;

    const invoicehistory = await InvoiceHistory.find({ queryId: id });
    for (let i = 0; i < invoicehistory.length; i++) {
      const history = invoicehistory[i].history;
      const invoice = await Invoice.findById(history[history.length - 1]);
      invoice.clientStatus.push("Modified");
      invoice.save();
    }

    const query = await Query.findByIdAndUpdate(id, req.body.details);
    let user = await User.find({}).populate("inquery");
    for (let i = 0; i < user.length; i++) {
      if (user[i].role === "supplier") {
        let supplierRegisteredPlace = user[i].resisteredPlace;
        let ok = false;
        for (let j = 0; j < supplierRegisteredPlace.length; j++) {
          for (let k = 0; k < query.arraydestination.length; k++) {
            if (
              supplierRegisteredPlace[j].toLowerCase() ===
              query.arraydestination[k].queryCountry.toLowerCase()
            ) {
              sendEmail(user[i], 2);
              const inquery = user[i].inquery;
              for (let m = 0; m < inquery.length; m++) {
                if (inquery[m].queryId == id) {
                  inquery[m].status.push("Modified");
                  user[i].save();
                  break;
                }
              }
              break;
            }
          }
          if (ok) {
            break;
          }
        }
      }
    }

    res.send({ success: true, message: "Modified Sucessfully" });
  } catch (err) {
    console.log("Error in query.js in /modifyMaster", err);
    return res.send({ success: false, message: "Server Error" });
  }
});

router.post("/cancel", async (req, res) => {
  try {
    const id = req.body.id;
    const query = await Query.findByIdAndUpdate(id, { cancel: true });
    let user = await User.find({}).populate("inquery");
    for (let i = 0; i < user.length; i++) {
      if (user[i].role === "supplier") {
        let supplierRegisteredPlace = user[i].resisteredPlace;
        let ok = false;
        for (let j = 0; j < supplierRegisteredPlace.length; j++) {
          for (let k = 0; k < query.arraydestination.length; k++) {
            if (
              supplierRegisteredPlace[j].toLowerCase() ===
              query.arraydestination[k].queryCountry.toLowerCase()
            ) {
              const inquery = user[i].inquery;
              for (let m = 0; m < inquery.length; m++) {
                if (inquery[m].queryId == id) {
                  inquery[m].status.push("Cancelled");
                  user[i].save();
                  break;
                }
              }
              break;
            }
          }
          if (ok) {
            break;
          }
        }
      }
    }
    query.save();

    res.send({ success: true, message: "Cancelled" });
  } catch (err) {
    console.log("Error in query.js in /cancel", err);
    return res.send({ success: false, message: "Server Error" });
  }
});

router.post("/detail", async (req, res) => {
  try {
    const query = await Query.findById(req.body.queryId);
    return res.send({ success: true, data: query });
  } catch (err) {
    console.log("Error in query.js in /detail", err);
    return res.send({ success: false, message: "Server Error" });
  }
});

router.post("/getClient", async (req, res) => {
  try {
    const query = await Query.findById(req.body.id);
    const user = await User.findOne({ uniqueCode: query.queryClientCode });
    return res.send({ success: true, data: user });
  } catch (err) {
    console.log("Error in query.js in /getClient", err);
    return res.send({ success: false, message: "Server Error" });
  }
});

router.post("/getQuery", async (req, res) => {
  try {
    const query = await Query.findById(req.body.queryId);
    return res.send({ success: true, data: query });
  } catch (err) {
    console.log("Error in query.js in /getQuery", err);
    return res.send({ success: false, message: "Server Error" });
  }
});

router.post("/paymentDetail", async (req, res) => {
  try {
    const { queryNo, index, details } = req.body;
    let query = await Query.findOne({ queryNo });
    query.payment[index].details = details;
    query.save();
    return res.send({ success: true, message: "Saved" });
  } catch (err) {
    console.log("Error in query.js in /paymentDetail", err);
    return res.send({ success: false, message: "Server Error" });
  }
});

router.post("/paymentApprove", async (req, res) => {
  try {
    const { queryNo, index } = req.body;
    let query = await Query.findOne({ queryNo });
    query.payment[index].status = true;
    query.save();
    return res.send({ success: true, message: "Approved" });
  } catch (err) {
    console.log("Error in query.js in /paymentApprove", err);
    return res.send({ success: false, message: "Server Error" });
  }
});

module.exports = router;
