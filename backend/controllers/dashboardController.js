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

    // Active tenancies (current rental agreements)
    const activeTenancies = await Tenancy.countDocuments({ tenant: tenantId });

    // Pending applications (applications that haven't been approved/rejected)
    const pendingApplications = await RentalApplication.countDocuments({
      tenant: tenantId,
      status: { $in: ['pending', 'under-review'] }
    });

    // Open maintenance requests (not resolved)
    const openRequests = await MaintenanceRequest.countDocuments({
      tenant: tenantId,
      status: { $ne: 'resolved' }
    });

    // Total payments made
    const totalPayments = await Payment.countDocuments({ tenant: tenantId });

    // Pending rent payments (tenancies where rent is not paid)
    const pendingRentPayments = await Tenancy.countDocuments({
      tenant: tenantId,
      rentPaid: false
    });

    // Next payment due date (earliest rent due date)
    const nextTenancy = await Tenancy.findOne({ tenant: tenantId })
      .sort({ rentDueDate: 1 })
      .select('rentDueDate rentAmount');

    res.json({
      activeTenancies,
      pendingApplications,
      openRequests,
      totalPayments,
      pendingRentPayments,
      nextPaymentDue: nextTenancy ? {
        amount: nextTenancy.rentAmount,
        dueDate: nextTenancy.rentDueDate
      } : null
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
