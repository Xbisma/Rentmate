import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
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
  tenancy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tenancy",
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  month: {
    type: String, // e.g. "March 2025"
    required: true
  },
  status: {
    type: String,
    enum: ["paid", "pending"],
    default: "paid"
  },
  paidAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Payment", paymentSchema);
