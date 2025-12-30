import Payment from "../models/Payment.js";
import Tenancy from "../models/Tenancy.js";
import Notification from "../models/Notification.js";
import User from "../models/User.js";
import Property from "../models/Property.js";

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
      month: new Date().toLocaleString("default", {
        month: "long",
        year: "numeric"
      })
    });

    tenancy.rentPaid = true;
    await tenancy.save();

    // Notify OWNER
    const tenantUser = await User.findById(tenancy.tenant);
    const property = await Property.findById(tenancy.property);

    await Notification.create({
      user: tenancy.owner,
      message: `Rent PKR ${tenancy.rentAmount.toLocaleString()} paid by ${tenantUser?.name || "tenant"} for "${property?.title || "property"}".`,
      link: `/owner/tenancies/${tenancy._id}`
    });

    // Notify TENANT
    await Notification.create({
      user: tenancy.tenant,
      message: `Payment received for "${property?.title || "your tenancy"}".`,
      link: `/tenant/tenancies/${tenancy._id}`
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
