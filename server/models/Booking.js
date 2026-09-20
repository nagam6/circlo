const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    itemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
      required: true,
      index: true,
    },

    renterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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

    status: {
      type: String,
      enum: [
        "pending",
        "accepted",
        "ready_for_pickup",
        "active",
        "returned",
        "inspection",
        "completed",
        "rejected",
        "cancelled",
      ],
      default: "pending",
      index: true,
    },

    subtotal: {
      type: Number,
      required: true,
      min: 0,
    },

    serviceFee: {
      type: Number,
      default: 0,
      min: 0,
    },

    deposit: {
      type: Number,
      default: 0,
      min: 0,
    },

    total: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

bookingSchema.index({
  itemId: 1,
  startAt: 1,
  endAt: 1,
  status: 1,
});

bookingSchema.index({
  renterId: 1,
  createdAt: -1,
});

bookingSchema.index({
  ownerId: 1,
  createdAt: -1,
});

module.exports = mongoose.model("Booking", bookingSchema);