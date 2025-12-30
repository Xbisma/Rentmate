import RentalApplication from "../models/RentalApplication.js";
import Property from "../models/Property.js";
import Notification from "../models/Notification.js";
import Tenancy from "../models/Tenancy.js";
import User from "../models/User.js";

/* ================= TENANT APPLIES FOR PROPERTY ================= */
export const applyForProperty = async (req, res) => {
  try {
    const tenantId = req.user.id;
    const { propertyId } = req.body;

    if (!propertyId) {
      return res.status(400).json({ message: "Property ID is required" });
    }

    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    const alreadyApplied = await RentalApplication.findOne({
      tenant: tenantId,
      property: propertyId
    });

    if (alreadyApplied) {
      return res.status(400).json({ message: "Already applied" });
    }

    const application = await RentalApplication.create({
      tenant: tenantId,
      owner: property.owner,
      property: propertyId,
      status: "pending"
    });

    const tenantUser = await User.findById(tenantId);

    await Notification.create({
      user: property.owner,
      message: `New rental application from ${tenantUser?.name || "Tenant"} for "${property.title}"`,
      link: `/owner/applications/${application._id}`
    });

    res.status(201).json(application);
  } catch (err) {
    console.error("applyForProperty error:", err);
    res.status(500).json({ message: "Failed to apply for property" });
  }
};

/* ================= TENANT VIEWS OWN APPLICATIONS ================= */
export const getTenantApplications = async (req, res) => {
  try {
    const applications = await RentalApplication.find({
      tenant: req.user.id
    })
      .populate("property")
      .populate({
        path: "tenancy",
        select: "_id rentAmount rentPaid status",
        options: { strictPopulate: false }
      });

    res.json(applications);
  } catch (err) {
    console.error("getTenantApplications error:", err);
    res.status(500).json({
      message: "Failed to fetch tenant applications"
    });
  }
};

/* ================= OWNER VIEWS ALL APPLICATIONS ================= */
export const getOwnerApplications = async (req, res) => {
  try {
    const applications = await RentalApplication.find({
      owner: req.user.id
    })
      .populate("tenant", "name email")
      .populate("property");

    res.json(applications);
  } catch (err) {
    console.error("getOwnerApplications error:", err);
    res.status(500).json({
      message: "Failed to fetch owner applications"
    });
  }
};

/* ================= OWNER VIEWS SINGLE APPLICATION ================= */
export const getOwnerApplicationById = async (req, res) => {
  try {
    const application = await RentalApplication.findById(req.params.id)
      .populate("tenant", "name email")
      .populate("property");

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    if (application.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    res.json(application);
  } catch (err) {
    console.error("getOwnerApplicationById error:", err);
    res.status(500).json({
      message: "Failed to fetch application"
    });
  }
};

/* ================= OWNER APPROVES / REJECTS ================= */
export const updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const application = await RentalApplication.findById(req.params.id);

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    if (application.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not allowed" });
    }

    application.status = status;

    if (status === "approved") {
      const property = await Property.findById(application.property);
      if (!property) {
        return res.status(404).json({ message: "Property not found" });
      }

      // Prevent duplicate tenancy
      const existingTenancy = await Tenancy.findOne({
        tenant: application.tenant,
        property: application.property
      });

      let tenancy = existingTenancy;

      if (!existingTenancy) {
        tenancy = await Tenancy.create({
          tenant: application.tenant,
          owner: application.owner,
          property: application.property,
          rentAmount: property.price,
          status: "active",
          rentPaid: false
        });
      }

      application.tenancy = tenancy._id;

      await Notification.create({
        user: application.tenant,
        message: "Your rental application has been approved. You can now make payment.",
        link: "/tenant/applications"
      });
    } else {
      await Notification.create({
        user: application.tenant,
        message: "Your rental application has been rejected"
      });
    }

    await application.save();
    res.json(application);
  } catch (err) {
    console.error("updateApplicationStatus error:", err);
    res.status(500).json({
      message: "Failed to update application status"
    });
  }
};
