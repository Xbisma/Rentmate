import Tenancy from "../models/Tenancy.js";

// Get tenant's current tenancies
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

// Get single tenancy details
export const getTenancyById = async (req, res) => {
  try {
    const tenancy = await Tenancy.findById(req.params.id)
      .populate("property", "title location images price")
      .populate("owner", "name email");

    if (!tenancy) {
      return res.status(404).json({ message: "Tenancy not found" });
    }

    if (tenancy.tenant.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    res.json(tenancy);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};