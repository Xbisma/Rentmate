import Payment from "../models/Payment.js";
import Tenancy from "../models/Tenancy.js";
import Notification from "../models/Notification.js";

// Tenant pays rent
export const payRent = async (req, res) => {
  try {
    const tenantId = req.user.id;
    const { tenancyId } = req.body;

    const tenancy = await Tenancy.findById(tenancyId);
    if (!tenancy)
      return res.status(404).json({ message: "Tenancy not found" });

    if (tenancy.tenant.toString() !== tenantId)
      return res.status(403).json({ message: "Not allowed" });

    const payment = await Payment.create({
      tenant: tenancy.tenant,
      owner: tenancy.owner,
      property: tenancy.property,
      tenancy: tenancy._id,
      amount: tenancy.rentAmount,
      month: new Date().toLocaleString("default", { month: "long", year: "numeric" })
    });

    tenancy.rentPaid = true;
    await tenancy.save();

    await Notification.create({
      user: tenancy.owner,
      message: "Rent has been paid by tenant."
    });

    res.status(201).json({
      message: "Rent paid successfully",
      payment
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Tenant payment history
export const getTenantPayments = async (req, res) => {
  const payments = await Payment.find({ tenant: req.user.id })
    .populate("property", "title");

  res.json(payments);
};

// Owner payment history
export const getOwnerPayments = async (req, res) => {
  const payments = await Payment.find({ owner: req.user.id })
    .populate("property", "title");

  res.json(payments);
};
