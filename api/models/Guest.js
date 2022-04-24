const mongoose = require("mongoose");

const GuestDetails = mongoose.Schema({
  title: {
    type: String,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  DOB: {
    type: String,
  },
  gender: {
    type: String,
  },
  panCard: {
    type: String,
  },
  aadharCard: {
    type: String,
  },
  passportNumber: {
    type: String,
  },
  passportIssue: {
    type: String,
  },
  passportExpiry: {
    type: String,
  },
});

const flightDetails = mongoose.Schema({
  date: {
    type: String,
  },
  airline: {
    type: String,
  },
  no: {
    type: String,
  },
  departure: {
    type: String,
  },
  departure_hh: {
    type: String,
  },
  departure_mm: {
    type: String,
  },
  arrival: {
    type: String,
  },
  arrival_hh: {
    type: String,
  },
  arrival_mm: {
    type: String,
  },
});

const trainDetails = mongoose.Schema({
  date: {
    type: String,
  },
  airline: {
    type: String,
  },
  no: {
    type: String,
  },
  departure: {
    type: String,
  },
  departure_hh: {
    type: String,
  },
  departure_mm: {
    type: String,
  },
  arrival: {
    type: String,
  },
  arrival_hh: {
    type: String,
  },
  arrival_mm: {
    type: String,
  },
});

const GuestSchema = mongoose.Schema({
  queryId: {
    type: String,
  },
  guestDetails: [GuestDetails],
  trainDetails: [trainDetails],
  flightDetails: [flightDetails],
  isFill: {
    type: Boolean,//make true once filled after that can't modify
    default: false,
  },
});

module.exports = mongoose.model("guest", GuestSchema);
