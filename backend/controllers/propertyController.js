import Property from "../models/Property.js";

/* ===================== ADD PROPERTY ===================== */
export const addProperty = async (req, res) => {
  try {
    console.log("USER:", req.user);
    console.log("BODY:", req.body);

    const ownerId = req.user.id;

    if (!ownerId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const {
      title,
      description,
      city,
      location,
      price,
      bedrooms,
      bathrooms,
      availability,
    } = req.body;

    // 🔴 Required field validation
    if (!title || !city || !location || !price) {
      return res.status(400).json({
        message: "Missing required fields (title, city, location, price)",
      });
    }

    const imageUrls = req.files
      ? req.files.map((file) => file.path)
      : [];

    const property = await Property.create({
      owner: ownerId,
      title,
      description,
      city,
      location,
      price: Number(price),
      bedrooms: bedrooms ? Number(bedrooms) : undefined,
      bathrooms: bathrooms ? Number(bathrooms) : undefined,
      availability: availability ? availability.toLowerCase() : "available",
      images: imageUrls,
    });

    console.log("SAVED PROPERTY:", property);

    res.status(201).json({
      message: "Property added successfully",
      property,
    });
  } catch (err) {
    console.error("Add Property Error:", err);
    res.status(500).json({ message: err.message });
  }
};

/* ===================== GET ALL PROPERTIES ===================== */
export const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find()
      .populate("owner", "name email");

    res.json(properties);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ===================== OWNER PROPERTIES ===================== */
export const getOwnerProperties = async (req, res) => {
  try {
    const properties = await Property.find({ owner: req.user.id })
      .populate("owner", "name email");

    res.json(properties);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ===================== GET PROPERTY BY ID ===================== */
export const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id)
      .populate("owner", "name email");

    if (!property)
      return res.status(404).json({ message: "Property not found" });

    res.json(property);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ===================== UPDATE PROPERTY ===================== */
export const updateProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property)
      return res.status(404).json({ message: "Not found" });

    if (property.owner.toString() !== req.user.id)
      return res.status(403).json({ message: "Not allowed" });

    const uploadedImages = req.files
      ? req.files.map((file) => file.path)
      : [];

    let existingImages = [];
    if (req.body.existingImages) {
      existingImages = JSON.parse(req.body.existingImages);
    }

    const updatedProperty = await Property.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        description: req.body.description,
        city: req.body.city,
        location: req.body.location,
        price: Number(req.body.price),
        bedrooms: Number(req.body.bedrooms),
        bathrooms: Number(req.body.bathrooms),
        availability: req.body.availability?.toLowerCase(),
        images: [...existingImages, ...uploadedImages],
      },
      { new: true }
    );

    res.json({
      message: "Property updated",
      property: updatedProperty,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ===================== DELETE PROPERTY ===================== */
export const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property)
      return res.status(404).json({ message: "Not found" });

    if (property.owner.toString() !== req.user.id)
      return res.status(403).json({ message: "Not allowed" });

    await property.deleteOne();
    res.json({ message: "Property deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ===================== FILTER PROPERTIES ===================== */
export const filterProperties = async (req, res) => {
  try {
    const filters = {};

    if (req.query.city)
      filters.city = new RegExp(`^${req.query.city}$`, "i");

    if (req.query.availability)
      filters.availability = req.query.availability.toLowerCase();

    if (req.query.bedrooms)
      filters.bedrooms = Number(req.query.bedrooms);

    if (req.query.minPrice || req.query.maxPrice) {
      filters.price = {};
      if (req.query.minPrice)
        filters.price.$gte = Number(req.query.minPrice);
      if (req.query.maxPrice)
        filters.price.$lte = Number(req.query.maxPrice);
    }

    const properties = await Property.find(filters)
      .populate("owner", "name email");

    res.json(properties);
  } catch (err) {
    console.error("Filter Error:", err);
    res.status(500).json({ message: err.message });
  }
};
