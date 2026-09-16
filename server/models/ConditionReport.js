const mongoose = require("mongoose");

const conditionReportSchema = new mongoose.Schema({
  booking: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking",
    required: true
  },

  phase: {
    type: String,
    enum: ["pre", "post"],
    required: true
  },

  notes: {
    type: String,
    default: ""
  },

  photos: {
    type: [String],
    default: []
  },

  accessories: {
    type: [String],
    default: []
  },

  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  timestamp: {
    type: Date,
    default: Date.now
  }
});

const ConditionReport = mongoose.model(
  "ConditionReport",
  conditionReportSchema
);

module.exports = ConditionReport;