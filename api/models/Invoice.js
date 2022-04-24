const mongoose = require("mongoose");

const PickDrop = new mongoose.Schema({
  pickUp: {
    type: String,
  },
  pickLocation: {
    type: String,
  },
  drop: {
    type: String,
  },
  dropLocation: {
    type: String,
  },
});

const DestinationSchema = new mongoose.Schema({
  hotelName: {
    type: String,
  },
  nights: {
    type: Number,
    default: 0,
  },
  roomType: {
    type: String,
  },
  address: {
    type: String,
  },
  reservationNo: {
    type: String,
  },
  checkIn: {
    type: String,
  },
  checkOut: {
    type: String,
  },
  desremark: {
    type: String,
  },
  contactNo: {
    type: Number,
  },
  confirmation: {
    type: String,
  },
  mealType: {
    type: String,
  },
  country: {
    type: String,
  },
  city: {
    type: String,
  },
});

const Itinerary = new mongoose.Schema({
  location: { type: String },
  time: { type: String },
  details: { type: String },
});

const InvoiceModal = new mongoose.Schema(
  {
    clientEmail: {
      type: String,
    },
    vendorEmail: {
      type: String,
    },
    parentId: {
      type: String,
    },
    queryId: {
      type: String,
    },
    queryNo: {
      type: String,
    },
    vendorId: {
      type: String,
    },
    vendorCode: {
      type: String,
    },
    queryType: {
      type: String,
    },
    guestName: {
      type: String,
    },
    destination: [DestinationSchema],
    roomsDetail: {
      total: {
        type: Number,
        default: 0,
      },
      single: {
        type: Number,
        default: 0,
      },
      double: {
        type: Number,
        default: 0,
      },
      triple: {
        type: Number,
        default: 0,
      },
      extra: {
        type: Number,
        default: 0,
      },
      childWithBed: {
        type: Number,
        default: 0,
      },
      childWithNoBed: {
        type: Number,
        default: 0,
      },
    },
    CostDetail: {
      single: {
        no: { type: Number, default: 0 },
        cost: { type: Number, default: 0 },
      },
      double: {
        no: { type: Number, default: 0 },
        cost: { type: Number, default: 0 },
      },
      triple: {
        no: { type: Number, default: 0 },
        cost: { type: Number, default: 0 },
      },
      extra: {
        no: { type: Number, default: 0 },
        cost: { type: Number, default: 0 },
      },
      childWithBed: {
        no: { type: Number, default: 0 },
        cost: { type: Number, default: 0 },
      },
      childWithNoBed: {
        no: { type: Number, default: 0 },
        cost: { type: Number, default: 0 },
      },
      infant: {
        no: { type: Number, default: 0 },
        cost: { type: Number, default: 0 },
      },
      foc: {
        cost: { type: Number, default: 0 },
      },
      otherCharge: {
        name: String,
        cost: { type: Number, default: 0 },
      },
      tax: {
        name: String,
        taxpercent: { type: Number, default: 0 },
        cost: { type: Number, default: 0 },
      },
      discount: {
        type: Number,
        default: 0,
      },
      discountCost: {
        type: Number,
        default: 0,
      },
      totalCost: {
        type: Number,
        default: 0,
      },
      finalCost: {
        type: Number,
        default: 0,
      },
      ClientfinalCost: {
        type: Number,
        default: 0,
      },
    },
    pickDrop: [PickDrop],
    meal: {
      total: {
        type: String,
      },
      breakFast: { type: String },
      lunch: { type: String },
      dinner: { type: String },
    },
    passenger: {
      total: {
        type: Number,
        default: 0,
      },
      adult: {
        type: Number,
        default: 0,
      },
      child: {
        type: Number,
        default: 0,
      },
      infant: {
        type: Number,
        default: 0,
      },
    },
    inclusion: [{ type: String }],
    exclusion: [{ type: String }],
    importantNote: [{ type: String }],
    termsCondition: [{ type: String }],
    remark: [{ type: String }],
    itinerary: [Itinerary],
    additionalNote: { type: String },
    vendorSend: {
      type: Boolean,
      default: false,
    },
    clientSend: {
      type: Boolean,
      default: false,
    },
    clientStatus: [
      {
        type: String,
      },
    ],
    queryCheckIn: {
      type: String, //to restrict date in checkin
    },
    queryCountry: {
      type: String, // to restrict country
    },
    commission: {
      type: Number, // to show extra cost to client (it is defined for each vender)
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Invoice", InvoiceModal);
