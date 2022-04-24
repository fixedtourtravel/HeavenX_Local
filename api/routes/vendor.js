const express = require("express");
const isLoggedIn = require("../middleware/isLoggedIn");
const Query = require("../models/Query");
const User = require("../models/User");
const Invoice = require("../models/Invoice");
const InvoiceHistory = require("../models/InvoiceHistory");
const AdminInstruction = require("../models/Instruction");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const sendEmail = require("../utils/emailNotify");

router.get("/order", isLoggedIn, async (req, res) => {
  try {
    let user = await User.findOne({ _id: req.user.id });
    let inquery = user.inquery;
    // console.log("inquery", inquery);
    let ans = new Array();

    //console.log(query);
    for (let i = 0; i < inquery.length; i++) {
      let query = await Query.findById(inquery[i].queryId);
      (query.hold = inquery[i].hold),
        (query.cancel = inquery[i].cancel),
        (query.client_confirm = inquery[i].client_confirm),
        (query.vender_confirm = inquery[i].vender_confirm),
        (query.payment = inquery[i].payment);
      ans.push({ query: query, status: inquery[i].status });
    }
    ans.sort((a, b) =>
      a.query.createdAt < b.query.createdAt
        ? 1
        : b.query.createdAt < a.query.createdAt
        ? -1
        : 0
    );
    return res.send({ success: true, data: ans });
  } catch (err) {
    console.log("Error in vendor.js in /order", err);
    return res.send({ success: false, message: err });
  }
});

router.post("/holdquery", async (req, res) => {
  try {
    const user = await User.findById(req.body.vendorId);
    const query = await Query.findById(req.body.queryId);
    query.hold = true;
    query.cancel = false;
    query.client_confirm = false;
    query.vender_confirm = false;
    query.save();

    let list = user.inquery;
    // console.log(list, req.body);
    for (let i = 0; i < list.length; i++) {
      console.log(list[i].queryId, req.body.queryId);
      if (list[i].queryId == req.body.queryId) {
        user.inquery[i].hold = true;
        user.inquery[i].cancel = false;
        user.inquery[i].vender_confirm = false;
        user.inquery[i].client_confirm = false;
        user.inquery[i].payment = false;
        user.inquery[i].status.push(
          `Hold (${req.body.holdDate} ${req.body.holdHour}:${req.body.holdMin} Hrs)`
        );
        break;
      }
    }
    user.save();
    const invoicehistory = await InvoiceHistory.findOne({
      vendorId: req.body.vendorId,
      queryId: req.body.queryId,
    });

    const history = invoicehistory.history;
    const invoice = await Invoice.findById(history[history.length - 1]);
    invoice.clientStatus.push(
      `Hold (${req.body.holdDate} ${req.body.holdHour}:${req.body.holdMin} Hrs)`
    );
    invoice.save();
    res.send({
      success: true,
      message: "Query Hold",
      data: `Hold (${req.body.holdDate} ${req.body.holdHour}:${req.body.holdMin} Hrs)`,
    });
  } catch (err) {
    console.log("Error in vendor.js in /holdquery", err);
  }
});

router.post("/cancelquery", isLoggedIn, async (req, res) => {
  try {
    const { vendorId, queryId } = req.body;
    const user = await User.findById(vendorId);
    let list = user.inquery;
    for (let i = 0; i < list.length; i++) {
      if (list[i].queryId == req.body.queryId) {
        user.inquery[i].cancel = true;
        user.inquery[i].hold = false;
        user.inquery[i].client_confirm = false;
        user.inquery[i].vender_confirm = false;
        user.inquery[i].status.push("Cancelled");
      }
    }
    user.save();
    console.log("user", user);
    const invoicehistory = await InvoiceHistory.findOne({
      queryId: queryId,
      vendorId: vendorId,
    });
    if (invoicehistory) {
      const history = invoicehistory.history;
      const invoice = await Invoice.findById(history[history.length - 1]);
      invoice.clientStatus.push("Cancelled");
      invoice.save();
      console.log("invoice", invoice);
    }
    res.send({ success: true, message: "Cancelled" });
  } catch (err) {
    console.log("Error in vendor.js in /cancelquery", err);
  }
});

router.post("/personalInfo", isLoggedIn, async (req, res) => {
  try {
    // as admin can also update so if admin is updating we will recieve
    //user as user id in body
    console.log("req", req.body);
    let id = req.body.user;
    let info = req.body.info;
    await User.findByIdAndUpdate(id, info);
    const user = await User.findById(id);
    return res.send({ success: true, data: user });
  } catch (err) {
    console.log("Error in vendor.js in /personalInfo", err);
  }
});

router.post("/businessInfo", isLoggedIn, async (req, res) => {
  try {
    // as admin can also update so if admin is updating we will recieve
    //user as user id in body
    let id = req.body.user;
    let info = req.body.info;
    await User.findByIdAndUpdate(id, info);
    const user = await User.findById(id);
    return res.send({ success: true, data: user });
  } catch (err) {
    console.log("Error in vendor.js in /businessInfo", err);
  }
});

router.post("/businessDocument/:id", async (req, res) => {
  try {
    const id = req.params.id;
    let user = await User.findById(id);
    let document = user.document;
    let newdocument = {
      document: {
        logo: "",
        gstCertificate: "",
        panCard: "",
        shopFrontView: "",
      },
    };

    if (document) {
      newdocument.document = document;
    }

    User.uploadDocument(req, res, async function (err) {
      if (err) {
        console.log("error in multer ", err);
      }

      if (req.files.logo) {
        console.log("logo");
        if (
          newdocument.document.logo &&
          fs.existsSync(path.join(__dirname, "..", newdocument.document.logo))
        ) {
          fs.unlinkSync(path.join(__dirname, "..", newdocument.document.logo));
        }

        newdocument.document.logo =
          User.documentPath + "/" + req.files.logo[0].filename;
      }

      if (req.files.gstCertificate) {
        console.log("gstCertificate");

        if (
          newdocument.document.gstCertificate &&
          fs.existsSync(
            path.join(__dirname, "..", newdocument.document.gstCertificate)
          )
        ) {
          fs.unlinkSync(
            path.join(__dirname, "..", newdocument.document.gstCertificate)
          );
        }
        newdocument.document.gstCertificate =
          User.documentPath + "/" + req.files.gstCertificate[0].filename;
      }
      if (req.files.panCard) {
        console.log("panCard");

        if (
          newdocument.document.panCard &&
          fs.existsSync(
            path.join(__dirname, "..", newdocument.document.panCard)
          )
        ) {
          fs.unlinkSync(
            path.join(__dirname, "..", newdocument.document.panCard)
          );
        }
        newdocument.document.panCard =
          User.documentPath + "/" + req.files.panCard[0].filename;
      }

      if (req.files.shopFrontView) {
        console.log("shopFrontView");

        if (
          newdocument.document.shopFrontView &&
          fs.existsSync(
            path.join(__dirname, "..", newdocument.document.shopFrontView)
          )
        ) {
          fs.unlinkSync(
            path.join(__dirname, "..", newdocument.document.shopFrontView)
          );
        }
        newdocument.document.shopFrontView =
          User.documentPath + "/" + req.files.shopFrontView[0].filename;
      }

      console.log("newdocument", newdocument);
      await User.findByIdAndUpdate(id, newdocument);
      user = await User.findById(id);
      console.log("user.document", user.document);

      return res.send({ success: true, data: user });
    });
  } catch (err) {
    console.log("Error in vendor.js in /businessDocument", err);
  }
});

router.post("/replyDetail", async (req, res) => {
  try {
    const vender = await User.findById(req.body.vendorId);
    const commission = vender.commission;
    const uniqueCode = vender.uniqueCode;
    let inst = await AdminInstruction.find();

    let detailhistory = await InvoiceHistory.findOne({
      queryId: req.body.queryId,
      vendorId: req.body.vendorId,
    });

    let detail;
    if (detailhistory) {
      let history = detailhistory.history;
      let id = history[history.length - 1];
      detail = await Invoice.findById(id);

      return res.send({
        success: true,
        data: { detail: detail, instruction: inst[0], commission, uniqueCode },
      });
    }

    detail = await Invoice.findOne({
      queryId: req.body.queryId,
      vendorId: req.body.vendorId,
    });

    if (detail) {
      return res.send({
        success: true,
        data: {
          detail: detail,
          instruction: inst[0],
          commission: commission,
          uniqueCode,
        },
      });
    } else {
      const query = await Query.findById(req.body.queryId);
      const clientCode = query.queryClientCode;
      const user = await User.findOne({ uniqueCode: clientCode });
      const vendor = await User.findById(req.body.vendorId);
      let ans = {
        queryId: query._id,
        queryNo: query.queryNo,
        guestName: query.queryName,
        queryType: query.queryType,
        clientEmail: user.emailId,
        vendorEmail: vendor.emailId,
        queryCheckIn: query.arraydestination[0].queryCheckIn,
        queryCountry: query.arraydestination[0].queryCountry,
        vendorSend: false,
        clientSend: false,
      };
      return res.send({
        success: false,
        data: {
          detail: ans,
          instruction: inst[0],
          commission: commission,
          uniqueCode,
        },
      });
    }
  } catch (err) {
    console.log("Error in vendor.js in /replyDetail", err);
  }
});

router.post("/reply/saveDraft", async (req, res) => {
  try {
    let { id, details } = req.body;
    let inst = await AdminInstruction.find();

    let invoice;
    let vendorSend = details.vendorSend;
    let clientSend = details.clientSend;
    console.log(vendorSend, clientSend);
    if (!vendorSend && !clientSend) {
      if (id == "") {
        invoice = await new Invoice(details);
        await invoice.save();
        id = invoice._id;
      } else {
        let detail = await Invoice.findById(id);
        await Invoice.findByIdAndUpdate(detail._id, details);
        invoice = await Invoice.findById(detail._id);
      }
    } else if (vendorSend && !clientSend) {
      invoice = await new Invoice(details);
      invoice.vendorSend = false;
      invoice.clientSend = false;
      await invoice.save();
      id = invoice._id;
    }
    console.log("reply Saved", invoice);
    return res.send({
      success: true,
      message: "Saved Successfully",
      data: { detail: invoice, id: id, instruct: inst[0] },
    });
  } catch (err) {
    console.log("Error in vendor.js in /saveDraft", err);
  }
});

router.post("/reply/send", async (req, res) => {
  try {
    const inst = await AdminInstruction.find();

    let { role, replyId, details } = req.body;
    const vendorId = details.vendorId;
    const queryId = details.queryId;
    const query = await Query.findById(queryId);
    if (details.CostDetail && details.CostDetail.ClientfinalCost) {
      query.ClientfinalCost = details.CostDetail.ClientfinalCost;
    }
    query.newInquery = false;
    query.save();
    const vendor = await User.findById(vendorId);
    const inquery = vendor.inquery;
    let index;
    for (let i = 0; i < inquery.length; i++) {
      if (inquery[i].queryId == queryId) {
        index = i;
        break;
      }
    }
    let detail;
    const vendorSend = details.vendorSend;
    const clientSend = details.clientSend;
    if (!clientSend && !vendorSend) {
      if (replyId == "") {
        detail = await new Invoice(details);
        detail.clientStatus.push("Quoted");
        await detail.save();
        replyId = detail._id;
      } else {
        detail = await Invoice.findById(replyId);
        await Invoice.findByIdAndUpdate(detail._id, details);
        detail.clientStatus.push("Revised");
      }
      inquery[index].status.push("Quoted");
      detail.vendorSend = true;
      await detail.save();
    } else if (!clientSend && vendorSend) {
      detail = await new Invoice(details);
      replyId = detail._id;
      detail.vendorSend = false;
      detail.clientSend = true;
      detail.clientStatus.push("Revised");
      await detail.save();
      inquery[index].status.push("Revised");
    } else if (clientSend && !vendorSend) {
      detail = await new Invoice(details);
      replyId = detail._id;
      detail.clientStatus.push("Revised");
      await detail.save();
    }

    await vendor.save();
    let history = await InvoiceHistory.findOne({
      vendorId: detail.vendorId,
      queryId: detail.queryId,
    });

    if (history) {
      history.history.push(replyId);
      history.save();
    } else {
      let h = await new InvoiceHistory({
        vendorId: detail.vendorId,
        queryId: detail.queryId,
        history: [replyId],
      });
      await h.save();
    }
    if (role == "client") {
      const user = await User.findOne({ emailId: detail.vendorEmail });
      sendEmail(user, 2);
    } else {
      const user = await User.findOne({ emailId: detail.clientEmail });
      sendEmail(user, 1);
    }
    console.log("reply send");
    return res.send({
      success: true,
      message: "Successfully sent",
      data: { instruct: inst[0], detail: detail, replyId: replyId },
    });
  } catch (err) {
    console.log("Error in vendor.js in /reply/send", err);
  }
});

router.post("/quotation/clientConfirm", async (req, res) => {
  try {
    const { queryId, vendorId } = req.body;
    const invoicehistory = await InvoiceHistory.findOne({
      queryId: queryId,
      vendorId: vendorId,
    });
    const history = invoicehistory.history;
    console.log(history);
    const invoiceId = history[history.length - 1];
    const invoice = await Invoice.findById(invoiceId);
    invoice.clientStatus.push("Waiting for vendor confirmation");
    await invoice.save();

    const vendor = await User.findById(vendorId);
    const inquery = vendor.inquery;
    for (let i = 0; i < inquery.length; i++) {
      if (inquery[i].queryId == queryId) {
        inquery[i].status.push("Client Confirmed");
        break;
      }
    }
    await vendor.save();
    let query = await Query.findById(queryId);
    // console.log(query);
    query.client_confirm = true;
    query.vender_confirm = false;
    query.hold = false;
    query.cancel = false;
    query.newInquery = false;
    query.venderId = vendorId;
    await query.save();
    return res.send({ success: true, message: "Confirmed" });
  } catch (err) {
    console.log("Error in vendor.js in /quotation/clientConfirm", err);
  }
});

router.post("/guestRequest", async (req, res) => {
  try {
    const { queryId, vendorId } = req.body;
    const invoicehistory = await InvoiceHistory.findOne({
      queryId: queryId,
      vendorId: vendorId,
    });

    const history = invoicehistory.history;
    const invoiceId = history[history.length - 1];
    const invoice = await Invoice.findById(invoiceId);
    invoice.clientStatus.push("Please send Guest Details");
    await invoice.save();

    const vendor = await User.findById(vendorId);
    const inquery = vendor.inquery;
    for (let i = 0; i < inquery.length; i++) {
      if (inquery[i].queryId == queryId) {
        inquery[i].status.push("Guest Request send");
        break;
      }
    }
    await vendor.save();
    return res.send({ success: true, message: "Guest Request send" });
  } catch (err) {
    console.log("Error in vendor.js in /guestRequest", err);
  }
});

router.post("/quotation/clientCancel", async (req, res) => {
  try {
    const { queryId, vendorId } = req.body;
    const invoicehistory = await InvoiceHistory.findOne({
      queryId: queryId,
      vendorId: vendorId,
    });

    const history = invoicehistory.history;
    const invoiceId = history[history.length - 1];
    const invoice = await Invoice.findById(invoiceId);
    invoice.clientStatus.push("Cancelled");
    await invoice.save();

    const vendor = await User.findById(vendorId);
    const inquery = vendor.inquery;
    for (let i = 0; i < inquery.length; i++) {
      if (inquery[i].queryId == queryId) {
        inquery[i].status.push("Client Cancelled");
        break;
      }
    }
    await vendor.save();
    return res.send({ success: true, message: "Cancelled" });
  } catch (err) {
    console.log("Error in vendor.js in /quotation/clientCancel", err);
  }
});

router.post("/download", async (req, res) => {
  try {
    const { userId, fileName } = req.body;
    const user = await User.findById(userId);
    if (fileName === "logo" && user.document && user.document.logo) {
      let logo = user.document.logo;
      let x = "";
      for (let i = 0; i < logo.length; i++) {
        if (logo[i] == "\\") {
          x += "/";
        } else {
          x += logo[i];
        }
      }
      res.download(path.join(__dirname, "..", x));
    } else if (
      fileName == "shopFrontView" &&
      user.document &&
      user.document.shopFrontView
    ) {
      let logo = user.document.shopFrontView;
      let x = "";
      for (let i = 0; i < logo.length; i++) {
        if (logo[i] == "\\") {
          x += "/";
        } else {
          x += logo[i];
        }
      }
      res.download(path.join(__dirname, "..", x));
    } else if (
      fileName == "panCard" &&
      user.document &&
      user.document.panCard
    ) {
      let logo = user.document.panCard;
      let x = "";
      for (let i = 0; i < logo.length; i++) {
        if (logo[i] == "\\") {
          x += "/";
        } else {
          x += logo[i];
        }
      }
      res.download(path.join(__dirname, "..", x));
    } else if (
      fileName == "gstCertificate" &&
      user.document &&
      user.document.gstCertificate
    ) {
      let logo = user.document.gstCertificate;
      let x = "";
      for (let i = 0; i < logo.length; i++) {
        if (logo[i] == "\\") {
          x += "/";
        } else {
          x += logo[i];
        }
      }
      res.download(path.join(__dirname, "..", x));
    } else {
      res.send({ success: "false" });
    }
  } catch (err) {
    console.log("Error in vendor.js in /download", err);
  }
});

router.get("/getuser", isLoggedIn, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    return res.send({ success: true, data: user });
  } catch (err) {
    console.log("Error in vendor.js in /getuser", err);
  }
});

router.post("/placeImg", async (req, res) => {
  try {
    const { name } = req.body;
    const instruct = await AdminInstruction.find();
    const place = instruct[0].place;
    let img;
    for (let i = 0; i < place.length; i++) {
      if (place[i].country.name == name) {
        img = place[i].country.img;
        break;
      }
    }
    res.download(path.join(__dirname, "..", img));
  } catch (err) {
    console.log("Error in vendor.js in /placeImg", err);
  }
});

router.post("/getVender", async (req, res) => {
  try {
    const user = await User.findById(req.body.id);
    return res.send({ success: true, data: user });
  } catch (err) {
    console.log("Error in vendor.js in /getuser", err);
  }
});

router.post("/requestPayment", async (req, res) => {
  try {
    const { venderId, queryId, payment } = req.body;
    const user = await User.findById(venderId);
    const query = await Query.findById(queryId);
    query.hold = false;
    query.cancel = false;
    query.client_confirm = false;
    query.vender_confirm = false;
    query.payment = payment;
    query.save();
    let list = user.inquery;
    for (let i = 0; i < list.length; i++) {
      if (list[i].queryId == queryId) {
        user.inquery[i].hold = false;
        user.inquery[i].cancel = false;
        user.inquery[i].client_confirm = false;
        user.inquery[i].vender_confirm = false;
        user.inquery[i].payment = false;
        user.inquery[i].status.push(`Payment Requested`);
        break;
      }
    }
    user.save();

    const invoicehistory = await InvoiceHistory.findOne({
      vendorId: venderId,
      queryId: queryId,
    });

    const history = invoicehistory.history;
    const invoice = await Invoice.findById(history[history.length - 1]);
    invoice.clientStatus.push(
      `Advance Payment Due Date ${payment[payment.length - 1].dueDate}`
    );
    invoice.save();
    res.send({
      success: true,
      message: "Payment Requested",
      data: `Payment Requested`,
    });
    //console.log(user.inquery);
  } catch (err) {
    console.log("Error in vendor.js in /requestPayment", err);
  }
});

router.post("/VenderConfirm", async (req, res) => {
  try {
    const { venderId, queryId } = req.body;
    console.log(venderId, queryId);
    const user = await User.findById(venderId);
    const query = await Query.findById(queryId);
    query.hold = false;
    query.cancel = false;
    query.client_confirm = false;
    query.vender_confirm = true;
    query.save();

    let list = user.inquery;
    for (let i = 0; i < list.length; i++) {
      if (list[i].queryId == queryId) {
        list[i].hold = false;
        list[i].cancel = false;
        list[i].client_confirm = false;
        list[i].vender_confirm = true;
        list[i].payment = false;
        list[i].status.push(`Vender Confirmed`);
        break;
      }
    }
    user.save();

    const invoicehistory = await InvoiceHistory.findOne({
      vendorId: venderId,
      queryId: queryId,
    });

    const history = invoicehistory.history;
    const invoice = await Invoice.findById(history[history.length - 1]);
    invoice.clientStatus.push(`Vender Confirmed`);
    invoice.save();
    res.send({
      success: true,
      message: "Vender Confirmed",
    });
    //console.log(user.inquery);
  } catch (err) {
    console.log("Error in vendor.js in /VenderConfirm", err);
  }
});

module.exports = router;
