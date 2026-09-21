const mongoose = require("mongoose");

const itemRequirementSchema = new mongoose.Schema(
  {
    itemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
      required: true,
      index: true,
    },

    requireId: {
      type: Boolean,
      default: false,
    },

    minimumRating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },

    minimumAge: {
      type: Number,
      min: 18,
      default: 18,
    },

    depositRequired: {
      type: Boolean,
      default: true,
    },

    maxRentalDays: {
      type: Number,
      min: 1,
      default: 7,
    },

    usageRestriction: {
      type: String,
      trim: true,
      default: "",
    },

    additionalNotes: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

itemRequirementSchema.index({
  itemId: 1,
});

module.exports = mongoose.model(
  "ItemRequirement",
  itemRequirementSchema
);