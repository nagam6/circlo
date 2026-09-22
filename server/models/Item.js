const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
      enum: ["Cameras", "Lighting", "Audio & Recording"],
    },

    ownerId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  required: true,
  index: true,
},

deposit: {
 
  type: Number,
  default: 0,
  min: [0, "Deposit cannot be negative"],
  validate: {
    validator: Number.isFinite,
    message: "Deposit must be a valid number",
  },

},

    location: {
      type: String,
      required: true,
    },

    pricePerDay: {
     
  type: Number,
  required: [true, "Price per day is required"],
  min: [0, "Price per day cannot be negative"],
  validate: {
    validator: Number.isFinite,
    message: "Price per day must be a valid number",
  
},
    },

    images: {
      type: [String],
      default: [],
    },

    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    available: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Item", itemSchema);