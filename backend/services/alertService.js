import Tenancy from "../models/Tenancy.js";
import Notification from "../models/Notification.js";

export const checkRentAlerts = async () => {
  const today = new Date().getDate();

  const tenancies = await Tenancy.find({ rentPaid: false });

  for (let tenancy of tenancies) {
    if (tenancy.rentDueDate === today) {

      // Tenant alert
      await Notification.create({
        user: tenancy.tenant,
        message: "Rent is due today. Please pay."
      });

      // Owner alert
      await Notification.create({
        user: tenancy.owner,
        message: "Tenant rent is pending for your property."
      });
    }
  }
};

export const checkLeaseAlerts = async () => {
  const today = new Date();
  const threshold = new Date();
  threshold.setDate(today.getDate() + 7); // 7 days before expiry

  const tenancies = await Tenancy.find({
    leaseEndDate: { $lte: threshold }
  });

  for (let tenancy of tenancies) {

    await Notification.create({
      user: tenancy.tenant,
      message: "Your lease is expiring soon."
    });

    await Notification.create({
      user: tenancy.owner,
      message: "A property lease is expiring soon."
    });
  }
};
