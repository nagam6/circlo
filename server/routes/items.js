const express = require("express");
const mongoose = require("mongoose");
const Item = require("../models/Item");
const Availability = require("../models/Availability");
const auth = require("../middleware/auth");
const router = express.Router();
// POST /api/items
router.post("/", auth, async (req, res) => {
  try {
    const {
      title,
      description,
      condition,
      category,
      deposit,
      location,
      pricePerDay,
      hourlyPrice,
      images,
    } = req.body;

    const item = new Item({
      title,
      description,
      condition,
      category,
      deposit,
      location,
      pricePerDay,
      hourlyPrice,
      images,
      ownerId: req.user._id,
    });

    await item.save();

    return res.status(201).json(item);
  } catch (error) {
    if (error.name === "ValidationError" || error.name === "CastError") {
      return res.status(400).json({
        message: "Invalid item data.",
        errors: Object.values(error.errors || {}).map(
          (fieldError) => fieldError.message
        ),
      });
    }

    console.error("Error creating item:", error);

    return res.status(500).json({
      message: "Failed to create item.",
    });
  }
});

// GET /api/items/:id/availability
router.get("/:id/availability", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid item ID",
      });
    }

    const availability = await Availability.find({
      itemId: id,
    }).sort({
      startAt: 1,
    });

    return res.status(200).json({
      itemId: id,
      availability,
    });
  } catch (error) {
    console.error("Error fetching item availability:", error);

    return res.status(500).json({
      message: "Failed to fetch item availability",
    });
  }
});

// GET /api/items/:id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid item ID",
      });
    }

    const item = await Item.findById(id);

    if (!item) {
      return res.status(404).json({
        message: "Item not found",
      });
    }

    return res.status(200).json(item);
  } catch (error) {
    console.error("Error fetching item:", error);

    return res.status(500).json({
      message: "Failed to fetch item",
    });
  }
});

module.exports = router;