const mongoose = require("mongoose");

const InvoiceHistoryModal = new mongoose.Schema(
  {
    vendorId: {
      type: String,
    },
    queryId: {
      type: String,
    },
    history: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("InvoiceHistory", InvoiceHistoryModal);
