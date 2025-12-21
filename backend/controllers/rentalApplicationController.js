import RentalApplication from "../models/RentalApplication.js";
import Property from "../models/Property.js";
import Notification from "../models/Notification.js";
import Tenancy from "../models/Tenancy.js";

// Tenant applies for property
export const applyForProperty = async (req, res) => {
  try {
    const tenantId = req.user.id;
    const { propertyId } = req.body;

    const property = await Property.findById(propertyId);
    if (!property)
      return res.status(404).json({ message: "Property not found" });

    const alreadyApplied = await RentalApplication.findOne({
      tenant: tenantId,
      property: propertyId
    });

    if (alreadyApplied)
      return res.status(400).json({ message: "Already applied" });

    const application = await RentalApplication.create({
      tenant: tenantId,
      owner: property.owner,
      property: propertyId
    });

    await Notification.create({
      user: property.owner,
      message: "New rental application received"
    });

    res.status(201).json({
      message: "Application submitted",
      application
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Tenant views own applications
export const getTenantApplications = async (req, res) => {
  try {
    const applications = await RentalApplication.find({
      tenant: req.user.id
    }).populate("property");

    res.json(applications);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Owner views applications on their properties
export const getOwnerApplications = async (req, res) => {
  try {
    const applications = await RentalApplication.find({
      owner: req.user.id
    })
      .populate("tenant", "name email")
      .populate("property");

    res.json(applications);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Owner approves / rejects
export const updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["approved", "rejected"].includes(status))
      return res.status(400).json({ message: "Invalid status" });

    const application = await RentalApplication.findById(req.params.id);

    if (!application)
      return res.status(404).json({ message: "Application not found" });

    if (application.owner.toString() !== req.user.id)
      return res.status(403).json({ message: "Not allowed" });

    application.status = status;
    await application.save();

  const exists = await Tenancy.findOne({ property: application.property });
  if (!exists && status === "approved") {
      await Tenancy.create({
        tenant: application.tenant,
        owner: application.owner,
        property: application.property,
        rentAmount: 50000,          // later make dynamic
        rentDueDate: 15,             // day of month
        leaseEndDate: new Date("2026-12-20")
      });
    }

    await Notification.create({
      user: application.tenant,
      message: `Your rental application has been ${status}`
    });

    res.json({
      message: "Application updated",
      application
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
