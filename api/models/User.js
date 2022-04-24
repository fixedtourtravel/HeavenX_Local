const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const DOCUMENTS = path.join("/uploads/vendor/documents");

const QueryRefSchema = mongoose.Schema({
  queryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Query",
    required: true,
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
  payment: {
    type: Boolean,
    default: false,
  },
  status: [
    {
      type: String,
    },
  ],
});

const UserSchema = mongoose.Schema(
  {
    uniqueCode: {
      type: String,
      // Not for admin registration
    },
    isVerifiedBySuperAdmin: {
      type: Boolean,
      default: false,
      // For admin registration only
    },
    isActive: {
      //only for vendor
      type: Boolean,
      default: false,
    },
    isBlock: {
      //only for vendor
      type: Boolean,
      default: false,
    },
    username: {
      type: String,
    },
    emailId: {
      type: String,
      required: true,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
    },
    company: {
      type: String,
    },
    mobileNo: {
      type: String,
    },
    emergencyPhone: {
      type: String,
    },
    resisteredPlace: [
      {
        type: String,
        required: true,
      },
    ],
    DOB: {
      type: String,
    },
    gender: {
      type: String,
    },
    sex: {
      type: String,
    },
    commission: {
      //only for vendor
      type: Number,
    },
    inquery: [QueryRefSchema],
    token: { type: String }, //verify token not jwt token
    isVerified: { type: Boolean, default: false },
    isApproved: { type: Boolean, default: false },
    companyInfo: {
      businessName: {
        type: String,
      },
      companyName: {
        type: String,
      },
      businessType: {
        type: String,
      },
      natureOfBusiness: {
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
      zipCode: {
        type: String,
      },
      landMark: {
        type: String,
      },
    },
    taxInfo: {
      registrationNo: {
        type: String,
      },
      panNo: {
        type: String,
      },
      gstNo: {
        type: String,
      },
    },
    bankInfo: {
      accountName: {
        type: String,
      },
      bankName: {
        type: String,
      },
      Bankaddress: {
        type: String,
      },
      branch: {
        type: String,
      },
      accountNo: {
        type: String,
      },
      ifsc: {
        type: String,
      },
    },
    document: {
      logo: {
        type: String,
      },
      gstCertificate: {
        type: String,
      },
      panCard: {
        type: String,
      },
      shopFrontView: {
        type: String,
      },
      contactPersonDetails: {
        type: String,
      },
    },
    emailSign: {
      type: String,
    },
    department: {
      type: String,
    },
    departmentRole: {
      type: String,
    },
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
UserSchema.statics.uploadDocument = multer({ storage: storage }).fields([
  { name: "logo" },
  { name: "gstCertificate" },
  { name: "panCard" },
  { name: "shopFrontView" },
  { name: "contactPersonDetails" },
]);

UserSchema.statics.documentPath = DOCUMENTS;

module.exports = mongoose.model("user", UserSchema);
