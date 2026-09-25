const express = require("express");
const mongoose = require("mongoose");

const Booking = require("../models/Booking");
const Item = require("../models/Item");
const ItemRequirement = require("../models/ItemRequirement");

const auth = require("../middleware/auth");

const calculateRentalPrice =
  require("../utils/calculateRentalPrice");

const validateRentalRequirements =
  require("../utils/validateRentalRequirements");

const router = express.Router();

// POST /api/bookings
router.post("/", auth, async (req, res) => {
  try {
    const {
      itemId,
      startAt,
      endAt,
    } = req.body;

    // 1. Required fields
    if (!itemId || !startAt || !endAt) {
      return res.status(400).json({
        message:
          "Item, start date, and end date are required.",
      });
    }

    // 2. Valid MongoDB ID
    if (!mongoose.Types.ObjectId.isValid(itemId)) {
      return res.status(400).json({
        message: "Invalid item ID.",
      });
    }

    // 3. Validate dates
    const start = new Date(startAt);
    const end = new Date(endAt);

    if (
      Number.isNaN(start.getTime()) ||
      Number.isNaN(end.getTime())
    ) {
      return res.status(400).json({
        message: "Invalid rental dates.",
      });
    }

    if (end <= start) {
      return res.status(400).json({
        message:
          "End date must be after start date.",
      });
    }

    // 4. Find item
    const item = await Item.findById(itemId);

    if (!item) {
      return res.status(404).json({
        message: "Item not found.",
      });
    }

    if (!item.available) {
      return res.status(409).json({
        message:
          "This item is currently unavailable.",
      });
    }

    // 5. Check item rental requirements
    const requirement =
      await ItemRequirement.findOne({
        itemId: item._id,
      });

    const requirementCheck =
      validateRentalRequirements({
        requirement,
        renter: req.user,
        startAt: start,
        endAt: end,
      });

    if (!requirementCheck.valid) {
      return res.status(400).json({
        message:
          "Rental requirements are not satisfied.",
        errors: requirementCheck.errors,
      });
    }

    // 6. Check booking overlap
    const hasOverlap =
      await Booking.hasOverlap(
        item._id,
        start,
        end
      );

    if (hasOverlap) {
      return res.status(409).json({
        message:
          "This item is already booked during the selected period.",
      });
    }

    // 7. Calculate canonical price
    const serviceFeeRate =
      Number(
        process.env.SERVICE_FEE_RATE ?? 0.1
      );

    const priceSummary =
      calculateRentalPrice(
        item.pricePerDay,
        start,
        end,
        item.deposit || 0,
        serviceFeeRate
      );

    // 8. Create booking
    const booking = await Booking.create({
      itemId: item._id,

      renterId: req.user._id,

      ownerId: item.ownerId,

      startAt: start,
      endAt: end,

      status: "pending",

      subtotal: priceSummary.subtotal,
      serviceFee:
        priceSummary.serviceFee,
      deposit:
        priceSummary.deposit,
      total:
        priceSummary.total,
    });

    return res.status(201).json({
      message:
        "Booking request created successfully.",

      booking,

      priceSummary,
    });
  } catch (error) {
    console.error(
      "Create booking error:",
      error
    );

    return res.status(500).json({
      message:
        "Failed to create booking request.",
    });
  }
});

// GET /api/bookings/my-rentals
router.get("/my-rentals", auth, async (req, res) => {
  try {
    const bookings = await Booking.find({
      renterId: req.user._id,
    })
      .populate(
        "itemId",
        "title images location category pricePerDay"
      )
      .populate(
        "ownerId",
        "name email rating"
      )
      .sort({
        createdAt: -1,
      });

    const currentStatuses = [
      "pending",
      "accepted",
      "ready_for_pickup",
      "active",
      "returned",
      "inspection",
    ];

    const current = bookings.filter((booking) =>
      currentStatuses.includes(booking.status)
    );

    const past = bookings.filter((booking) =>
      ["completed", "rejected", "cancelled"].includes(
        booking.status
      )
    );

    return res.status(200).json({
      current,
      past,
      total: bookings.length,
    });
  } catch (error) {
    console.error(
      "Get my rentals error:",
      error
    );

    return res.status(500).json({
      message: "Failed to load rentals.",
    });
  }
});

// GET /api/bookings/:id
router.get("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid booking ID.",
      });
    }

    const booking = await Booking.findById(id)
      .populate(
        "itemId",
        "title description images location category pricePerDay deposit"
      )
      .populate(
        "ownerId",
        "name email rating"
      )
      .populate(
        "renterId",
        "name email rating"
      );

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found.",
      });
    }

    const userId = req.user._id.toString();

    const isRenter =
      booking.renterId?._id?.toString() === userId;

    const isOwner =
      booking.ownerId?._id?.toString() === userId;

    if (!isRenter && !isOwner) {
      return res.status(403).json({
        message:
          "You are not authorized to view this booking.",
      });
    }

    return res.status(200).json({
      booking,
    });
  } catch (error) {
    console.error(
      "Get booking details error:",
      error
    );

    return res.status(500).json({
      message:
        "Failed to load booking details.",
    });
  }
});

module.exports = router;