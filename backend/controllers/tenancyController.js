import Tenancy from "../models/Tenancy.js";

// Tenant tenancies
export const getTenantTenancies = async (req, res) => {
  try {
    const tenancies = await Tenancy.find({ tenant: req.user.id })
      .populate("property", "title location images price")
      .populate("owner", "name email")
      .sort({ createdAt: -1 });

    res.json(tenancies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Owner tenancies
export const getOwnerTenancies = async (req, res) => {
  try {
    const tenancies = await Tenancy.find({ owner: req.user.id })
      .populate("property", "title location images price")
      .populate("tenant", "name email")
      .sort({ createdAt: -1 });

    res.json(tenancies);
  } catch (err) {
    console.error("Owner tenancy error:", err);
    res.status(500).json({ message: err.message });
  }
};

// Single tenancy
export const getTenancyById = async (req, res) => {
  try {
    const tenancy = await Tenancy.findById(req.params.id)
      .populate("property", "title location images price")
      .populate("owner", "name email")
      .populate("tenant", "name email");

    if (!tenancy) {
      return res.status(404).json({ message: "Tenancy not found" });
    }

    // allow tenant OR owner to view
    if (
      tenancy.tenant.toString() !== req.user.id &&
      tenancy.owner.toString() !== req.user.id
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    res.json(tenancy);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
