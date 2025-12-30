import MaintenanceRequest from "../models/MaintenanceRequest.js";
import Property from "../models/Property.js";
import Notification from "../models/Notification.js";
import User from "../models/User.js";

// Tenant creates request
export const createMaintenanceRequest = async (req, res) => {
  try {
    const tenantId = req.user.id;
    const { propertyId, issue } = req.body;

    const property = await Property.findById(propertyId);
    if (!property)
      return res.status(404).json({ message: "Property not found" });

    const request = await MaintenanceRequest.create({
      tenant: tenantId,
      owner: property.owner,
      property: propertyId,
      issue
    });

    const tenantUser = await User.findById(tenantId);
    const notification = await Notification.create({
      user: property.owner,
      message: `New maintenance request: ${tenantUser ? tenantUser.name : 'A tenant'} reported "${issue}" for "${property.title || property.location || property._id}"`,
      link: `/owner/requests`
    });



    res.status(201).json({
      message: "Maintenance request created",
      request,
      notification
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Tenant views own requests
export const getTenantRequests = async (req, res) => {
  try {
    const requests = await MaintenanceRequest.find({
      tenant: req.user.id
    }).populate("property");

    res.json(requests);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Owner views requests
export const getOwnerRequests = async (req, res) => {
  try {
    const requests = await MaintenanceRequest.find({
      owner: req.user.id
    })
      .populate("tenant", "name email")
      .populate("property");

    res.json(requests);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Owner updates status
export const updateRequestStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["pending", "in-progress", "resolved"].includes(status))
      return res.status(400).json({ message: "Invalid status" });

    const request = await MaintenanceRequest.findById(req.params.id);

    if (!request)
      return res.status(404).json({ message: "Request not found" });

    if (request.owner.toString() !== req.user.id)
      return res.status(403).json({ message: "Not allowed" });

    request.status = status;
    await request.save();

    res.json({
      message: "Status updated",
      request
    });

    await Notification.create({
      user: request.tenant,
      message: `Maintenance request status updated to ${status}`
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
