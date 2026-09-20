
const express = require("express");
const mongoose = require("mongoose");
const ConditionReport = require("../models/ConditionReport");

const router = express.Router();

// POST /api/condition-reports/pre
router.post("/pre", async (req, res) => {
  try {
    const { booking, notes, photos, accessories, creator } = req.body;

    // Check required fields
    if (!booking || !creator) {
      return res.status(400).json({
        message: "booking and creator are required",
      });
    }

    // Check MongoDB ID format
    if (
      !mongoose.isValidObjectId(booking) ||
      !mongoose.isValidObjectId(creator)
    ) {
      return res.status(400).json({
        message: "Invalid booking or creator ID",
      });
    }

    // Validate optional fields
    if (
      (notes !== undefined && typeof notes !== "string") ||
      (photos !== undefined &&
        (!Array.isArray(photos) ||
          !photos.every((photo) => typeof photo === "string"))) ||
      (accessories !== undefined &&
        (!Array.isArray(accessories) ||
          !accessories.every((item) => typeof item === "string")))
    ) {
      return res.status(400).json({
        message: "Invalid report data",
      });
    }

    const report = await ConditionReport.create({
      booking,
      phase: "pre",
      notes: notes ?? "",
      photos: photos ?? [],
      accessories: accessories ?? [],
      creator,
    });

    return res.status(201).json({
      message: "Pre-rental condition report created",
      report,
    });
  } catch (error) {
    console.error("Failed to create condition report:", error);

    return res.status(500).json({
      message: "Failed to create condition report",
    });
  }
});

module.exports = router;