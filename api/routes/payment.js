const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const router = express.Router();
const InvoiceHistory = require("../models/InvoiceHistory");
const Invoice = require("../models/Invoice");
const Query = require("../models/Query");
const User = require("../models/User");

router.post("/order", async function (req, res) {
  try {
    const instance = new Razorpay({
      key_id: process.env.KEY_ID,
      key_secret: process.env.KEY_SECRET,
    });
    const { queryId, venderId } = req.body;
    const history = await InvoiceHistory.findOne({
      queryId,
      venderId,
    });

    let invo = history.history;
    let id = invo[invo.length - 1];
    let invoice = await Invoice.findById(id);

    const amount = invoice.CostDetail.initialPayment;

    const options = {
      amount: 1 * 100,
      currency: "INR",
      receipt: crypto.randomBytes(10).toString("hex"),
    };

    instance.orders.create(options, (error, order) => {
      if (error) {
        console.log("some error in instance", error);
        return res.status(500).json({ message: "Something went wrong" });
      }
      return res.status(200).json({ data: order });
    });
  } catch (err) {
    console.log("error in payment.js in /order", err);
    return res.send({
      success: false,
      message: "Some internal Error can't be added",
    });
  }
});

router.post("/verify", async function (req, res) {
  try {
    console.log(req.body);
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body.razor;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      const { venderId, queryId } = req.body;
      const user = await User.findById(venderId);
      const query = await Query.findById(queryId);
      query.hold = false;
      query.cancel = false;
      query.confirm = false;
      query.payment = false;
      query.save();
      let list = user.inquery;
      for (let i = 0; i < list.length; i++) {
        if (list[i].queryId == queryId) {
          user.inquery[i].hold = false;
          user.inquery[i].cancel = false;
          user.inquery[i].confirm = false;
          user.inquery[i].payment = false;
          user.inquery[i].status.push(`Initial Payment Done`);
          break;
        }
      }
      user.save();

      const invoicehistory = await InvoiceHistory.findOne({
        venderId,
        queryId,
      });

      const history = invoicehistory.history;
      const invoice = await Invoice.findById(history[history.length - 1]);
      invoice.clientStatus.push(`Initial Payment Done`);
      invoice.save();
      return res.status(200).json({ message: "Payment Verified Successfully" });
    } else {
      return res.status(400).json({ message: "Invalid Signature sent!" });
    }
    return res.status(200).json({ data: order });
  } catch (err) {
    console.log("error in payment.js in /verify", err);
    return res.send({
      success: false,
      message: "Some internal Error can't be added",
    });
  }
});

module.exports = router;
