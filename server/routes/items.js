const express = require("express");
const mongoose = require("mongoose");
const Item = require("../models/Item");

const router = express.Router();

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