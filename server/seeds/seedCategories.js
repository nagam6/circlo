
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const Category = require("../models/Category");

dotenv.config({ path: path.join(__dirname, "../.env") });

const categories = [
  {
    name: "Cameras",
    description: "Cameras and photography equipment",
  },
  {
    name: "Lighting",
    description: "Lighting equipment for photography and video",
  },
  {
    name: "Audio & Recording",
    description: "Microphones and audio recording equipment",
  },
];

async function seedCategories() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is missing from the .env file");
    }

    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    for (const category of categories) {
      await Category.updateOne(
        { name: category.name },
        { $setOnInsert: category },
        { upsert: true }
      );

      console.log(`Category ready: ${category.name}`);
    }

    console.log("Category seeding completed successfully");
  } catch (error) {
    console.error("Category seeding failed:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seedCategories();