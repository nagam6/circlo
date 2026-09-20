const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Item = require("./models/Item");

dotenv.config();

const seedItem = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const item = await Item.create({
      title: "Sony A7 IV Camera",
      description:
        "Professional full-frame mirrorless camera suitable for photography and video projects.",
      category: "Cameras",
      location: "Nazareth",
      pricePerDay: 120,
      images: [
        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=80",
      ],
      rating: 4.9,
      available: true,
    });

    console.log("Item created successfully:");
    console.log(item);

    await mongoose.disconnect();
  } catch (error) {
    console.error("Failed to seed item:", error.message);
  }
};

seedItem();