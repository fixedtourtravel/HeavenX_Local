const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const DOCUMENTS = path.join("/uploads/country");

const Instruct = mongoose.Schema(
  {
    category: [
      {
        name: String,
        active: { type: Boolean, default: true },
      },
    ],
    place: [
      {
        country: {
          name: String,
          active: { type: Boolean, default: true },
          id: {
            type: mongoose.Schema.Types.ObjectId,
            auto: true,
          },
          img: {
            type: String,
          },
        },
        city: [
          {
            name: String,
            active: { type: Boolean, default: true },
          },
        ],
      },
    ],
    meal: [
      {
        name: String,
        active: { type: Boolean, default: true },
      },
    ],
    mode: [
      {
        name: String,
        active: { type: Boolean, default: true },
      },
    ],
    transport: [
      {
        mode: String,
        country: String,
        city: String,
        station: [
          {
            name: String,
            active: { type: Boolean, default: true },
          },
        ],
      },
    ],
    noOfActive: {
      categoryActive: { type: Number, default: 0 },
      countryActive: { type: Number, default: 0 },
      cityActive: { type: Number, default: 0 },
      modeActive: { type: Number, default: 0 },
      stationActive: { type: Number, default: 0 },
      mealActive: { type: Number, default: 0 },
    },
    customerGroup: [
      {
        name: {
          type: String,
        },
        user: [String],
        isActive: { type: Boolean, default: true },
      },
    ],
    venderGroup: [
      {
        name: {
          type: String,
        },
        user: [String],
        isActive: { type: Boolean, default: true },
      },
    ],
    tax: [
      {
        name: {
          type: String,
        },
        percentage: {
          type: String,
        },
        country: [{ label: String }],
        active: {
          type: Boolean,
          default: false,
        },
      },
    ],
    currency: [
      {
        name: {
          type: String,
        },
        symbol: {
          type: String,
        },
        country: [{ label: String }],
        active: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },

  { timestamps: true }
);

//multer storage to store uploads
let storage = multer.diskStorage({
  //path to store files
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", DOCUMENTS));
  },
  //editing file name as filename+date of upload to differentiate with other files
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

//statics methods (global) to access outside also
Instruct.statics.uploadImg = multer({ storage: storage }).fields([
  { name: "country" },
]);

Instruct.statics.documentPath = DOCUMENTS;

module.exports = mongoose.model("AdminInstruction", Instruct);
