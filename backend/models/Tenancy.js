import mongoose from "mongoose";

const tenancySchema = new mongoose.Schema(
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

    rentAmount: {
      type: Number,
      required: true
    },

    status: {
      type: String,
      enum: ["active", "ended"],
      default: "active"
    },

    rentPaid: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

export default mongoose.model("Tenancy", tenancySchema);
