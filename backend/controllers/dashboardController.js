import Property from "../models/Property.js";
import RentalApplication from "../models/RentalApplication.js";
import Tenancy from "../models/Tenancy.js";
import MaintenanceRequest from "../models/MaintenanceRequest.js";
import Payment from "../models/Payment.js";
import User from "../models/User.js";

// TENANT DASHBOARD
export const tenantDashboard = async (req, res) => {
  try {
    const tenantId = req.user.id;

    const activeTenancies = await Tenancy.countDocuments({ tenant: tenantId });
    const applications = await RentalApplication.countDocuments({ tenant: tenantId });
    const maintenanceRequests = await MaintenanceRequest.countDocuments({ tenant: tenantId });
    const payments = await Payment.countDocuments({ tenant: tenantId });

    // Get pending rent payments (tenancies where rent is not paid for current month)
    const currentMonth = new Date().toLocaleString("default", { month: "long", year: "numeric" });
    const pendingPayments = await Tenancy.countDocuments({
      tenant: tenantId,
      rentPaid: false
    });

    res.json({
      activeTenancies,
      applications,
      maintenanceRequests,
      payments,
      pendingPayments
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// OWNER DASHBOARD
export const ownerDashboard = async (req, res) => {
  try {
    const ownerId = req.user.id;

    const properties = await Property.countDocuments({ owner: ownerId });
    const tenancies = await Tenancy.countDocuments({ owner: ownerId });
    const applications = await RentalApplication.countDocuments({ owner: ownerId });
    const maintenanceRequests = await MaintenanceRequest.countDocuments({ owner: ownerId });

    const earnings = await Payment.aggregate([
      { $match: { owner: ownerId } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

    res.json({
      properties,
      tenancies,
      applications,
      maintenanceRequests,
      totalEarnings: earnings[0]?.total || 0
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ADMIN DASHBOARD
export const adminDashboard = async (req, res) => {
  try {
    const users = await User.countDocuments();
    const properties = await Property.countDocuments();
    const tenancies = await Tenancy.countDocuments();
    const maintenanceRequests = await MaintenanceRequest.countDocuments();

    res.json({
      users,
      properties,
      tenancies,
      maintenanceRequests
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
