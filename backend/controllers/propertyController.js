import Property from "../models/Property.js";

export const addProperty = async (req, res) => {
  try {
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
    const filters = req.query;
    const properties = await Property.find(filters);

    res.json(properties);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
