const mongoose = require("mongoose");

const DestinationSchema = new mongoose.Schema({
  queryCheckIn: {
    type: String,
  },
  queryCheckOut: {
    type: String,
  },
  queryCountry: {
    type: String,
  },
  queryCity: {
    type: String,
  },
  queryNights: {
    type: Number,
  },
  queryHotelRating: {
    type: Number,
  },
});

const QuerySchema = new mongoose.Schema(
  {
    queryName: {
      type: String,
      required: true,
      min: 3,
    },
    queryType: {
      type: String,
      default: "Service",
    },
    queryNationality: {
      type: String,
      default: "Indian",
    },
    queryResidence: {
      type: String,
    },
    queryClientCode: {
      type: String,
    },
    queryTotalNights: {
      type: Number,
      default: 0,
    },
    arraydestination: [DestinationSchema],
    queryNo: {
      type: String,
    },
    queryPassengers: {
      type: Number,
    },
    queryAdult: {
      type: Number,
    },
    queryChild: {
      type: Number,
    },
    queryInfant: {
      type: Number,
    },
    queryRooms: {
      type: Number,
    },
    querySingle: {
      type: Number,
    },
    queryDouble: {
      type: Number,
    },
    queryTriple: {
      type: Number,
    },
    queryExtra: {
      type: Number,
    },
    queryNoBed: {
      type: Number,
    },
    queryMeal: {
      type: String,
    },
    queryDetail: {
      type: String,
    },
    newInquery: {
      type: Boolean,
      default: true,
    },
    hold: {
      type: Boolean,
      default: false,
    },
    cancel: {
      type: Boolean,
      default: false,
    },
    client_confirm: {
      type: Boolean,
      default: false,
    },
    vender_confirm: {
      type: Boolean,
      default: false,
    },
    payment: [
      {
        name: String,
        percent: Number,
        dueDate: String,
        details: String,
        status: {
          type: Boolean,
        },
      },
    ],
    ClientfinalCost: {
      type: Number,
      default: 0,
    },
    venderId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Query", QuerySchema);
