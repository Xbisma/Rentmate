import Notification from "../models/Notification.js";

// Get logged-in user's notifications
export const getNotifications = async (req, res) => {
  try {
    let notifications = await Notification.find({
      user: req.user.id
    }).sort({ createdAt: -1 });

    // Filter notifications based on user role to ensure proper separation
    if (req.user.role === 'tenant') {
      // Tenants should only see tenant-related notifications
      notifications = notifications.filter(notification => {
        const message = notification.message.toLowerCase();
        return message.includes('your') ||
               message.includes('rent due') ||
               message.includes('lease expires') ||
               message.includes('maintenance request status') ||
               message.includes('rental application has been');
      });
    } else if (req.user.role === 'owner') {
      // Owners should only see owner-related notifications
      notifications = notifications.filter(notification => {
        const message = notification.message.toLowerCase();
        return message.includes('new maintenance') ||
               message.includes('new rental application') ||
               message.includes('rent has been paid') ||
               message.includes('rent pending') ||
               message.includes('lease expiring soon');
      });
    }

    res.json(notifications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Mark notification as read
export const markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);

    if (!notification)
      return res.status(404).json({ message: "Notification not found" });

    if (notification.user.toString() !== req.user.id)
      return res.status(403).json({ message: "Not allowed" });

    notification.isRead = true;
    await notification.save();

    res.json({
      message: "Notification marked as read",
      notification
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
