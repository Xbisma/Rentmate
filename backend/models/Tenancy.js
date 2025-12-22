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
    rentDueDate: {
      type: Number, // day of month (e.g. 5th)
      required: true
    },
    leaseEndDate: {
      type: Date,
      required: true
    },
    rentPaid: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

export default mongoose.model("Tenancy", tenancySchema);
