import mongoose from "mongoose";

const rentalApplicationSchema = new mongoose.Schema(
  {
    tenant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      required: true
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending"
    },

    // ✅ THIS FIELD WAS MISSING (CAUSE OF 500 ERROR)
    tenancy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tenancy",
      default: null
    }
  },
  { timestamps: true }
);

export default mongoose.model("RentalApplication", rentalApplicationSchema);
