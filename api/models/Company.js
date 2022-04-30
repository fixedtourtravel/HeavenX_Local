const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const DOCUMENTS = path.join("/uploads/company");

const CompanySchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: [
      {
        type: String,
      },
    ],
    logo: {
      type: String,
    },
    tagline: {
      type: String,
    },
    address: {
      type: String,
    },
    country: {
      type: String,
    },
    state: {
      type: String,
    },
    city: {
      type: String,
    },
    pin: {
      type: String,
    },
    phone1: {
      type: String,
    },
    phone2: {
      type: String,
    },
    gstNo: {
      type: String,
    },
    panNo: {
      type: String,
    },
    department: [
      {
        name: {
          type: String,
        },
        active: {
          type: Boolean,
          default: false,
        },
        role: [
          {
            name: {
              type: String,
            },
            permissions: [
              {
                name: String,
                value: [Boolean],
              },
            ],
            active: {
              type: Boolean,
              default: false,
            },
          },
        ],
      },
    ],
  },
  {
    timestamps: true,
  }
);
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
CompanySchema.statics.uploadDocument = multer({ storage: storage }).fields([
  { name: "logo" },
]);

CompanySchema.statics.documentPath = DOCUMENTS;

module.exports = mongoose.model("CompanyDetail", CompanySchema);
