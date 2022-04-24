const express = require("express");
const isLoggedIn = require("../middleware/isLoggedIn");
const User = require("../models/User");
const Invoice = require("../models/Invoice");
const InvoiceHistory = require("../models/InvoiceHistory");
const Guest = require("../models/Guest");
const router = express.Router();

router.post("/saveDetails", async (req, res) => {
  try {
    const queryId = req.body.details.queryId;
    const vendorId = req.body.vendorId;
    console.log(queryId, vendorId);

    const newGuest = new Guest(req.body.details);
    const guestdetail = await newGuest.save();

    console.log(vendorId, queryId);
    const invoicehistory = await InvoiceHistory.findOne({
      vendorId: vendorId,
      queryId: queryId,
    });

    if (invoicehistory) {
      const history = await invoicehistory.history;
      const invoice = await Invoice.findById(history[history.length - 1]);
      invoice.clientStatus.push("Guest Details Send");
      invoice.save();
    }

    const vendor = await User.findById(vendorId);
    const inquery = vendor.inquery;
    for (let i = 0; i < inquery.length; i++) {
      if (inquery[i].queryId == queryId) {
        inquery[i].status.push("Guest Details Recieved");
        vendor.save();
        break;
      }
    }

    res.send({
      success: true,
      message: "Guest Details Filled Sucessfully",
      data: guestdetail,
    });
  } catch (err) {
    console.log(err);
  }
});

router.post("/getDetails", async (req, res) => {
  try {
    console.log("req.body.queryId", req.body.queryId);
    const guestDetails = await Guest.findOne({ queryId: req.body.queryId });
    if (guestDetails) {
      res.send({ success: true, data: guestDetails });
    } else {
      res.send({ success: false, data: guestDetails });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
