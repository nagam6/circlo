const mongoose = require("mongoose");

const availabilitySchema = new mongoose.Schema(
  {
    itemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
      required: true,
      index: true,
    },

    startAt: {
      type: Date,
      required: true,
    },

    endAt: {
      type: Date,
      required: true,
    },

    availabilityType: {
      type: String,
      enum: ["available", "blocked"],
      default: "blocked",
      required: true,
    },

    note: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

availabilitySchema.index({
  itemId: 1,
  startAt: 1,
  endAt: 1,
});

module.exports = mongoose.model(
  "Availability",
  availabilitySchema
);