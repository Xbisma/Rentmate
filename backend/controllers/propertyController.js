import Property from "../models/Property.js";

export const addProperty = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILES:", req.files);
    console.log("USER:", req.user);
    
    const ownerId = req.user.id;

    const imageUrls = req.files ? req.files.map(file => file.path) : [];

    const property = await Property.create({
      ...req.body,
      images: imageUrls,
      owner: ownerId
    });

    res.status(201).json({
      message: "Property added",
      property
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find().populate("owner", "name email");

    res.json(properties);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getOwnerProperties = async (req, res) => {
  try {
    const ownerId = req.user.id;
    const properties = await Property.find({ owner: ownerId }).populate("owner", "name email");

    res.json(properties);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate("owner", "name email");

    if (!property) return res.status(404).json({ message: "Not found" });

    res.json(property);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) return res.status(404).json({ message: "Not found" });

    if (property.owner.toString() !== req.user.id)
      return res.status(403).json({ message: "Not allowed" });

    const updated = await Property.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });

    res.json({
      message: "Property updated",
      property: updated
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) return res.status(404).json({ message: "Not found" });

    if (property.owner.toString() !== req.user.id)
      return res.status(403).json({ message: "Not allowed" });

    await property.deleteOne();

    res.json({ message: "Property deleted" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const filterProperties = async (req, res) => {
  try {
    const filters = {};

    // Handle basic filters
    if (req.query.city) filters.city = req.query.city;
    if (req.query.location) filters.location = req.query.location;
    if (req.query.type) filters.type = req.query.type;
    if (req.query.availability) filters.availability = req.query.availability;
    if (req.query.bedrooms) filters.bedrooms = parseInt(req.query.bedrooms);
    if (req.query.bathrooms) filters.bathrooms = parseInt(req.query.bathrooms);

    // Handle price range
    if (req.query.minPrice || req.query.maxPrice) {
      filters.price = {};
      if (req.query.minPrice) filters.price.$gte = parseInt(req.query.minPrice);
      if (req.query.maxPrice) filters.price.$lte = parseInt(req.query.maxPrice);
    }

    const properties = await Property.find(filters).populate("owner", "name email");

    res.json(properties);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
