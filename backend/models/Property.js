import mongoose from "mongoose";

const propertySchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  title: {
    type: String,
    required: true
  },

  description: String,

  city: {
    type: String,
    required: true
  },

  location: {
    type: String,
    required: true
  },

  price: {
    type: Number,
    required: true
  },

  bedrooms: Number,
  bathrooms: Number,

  availability: {
    type: String,
    enum: ["available", "rented"],
    default: "available"
  },

  images: {
    type: [String],
    default: []
  },

}, { timestamps: true });

export default mongoose.model("Property", propertySchema);
