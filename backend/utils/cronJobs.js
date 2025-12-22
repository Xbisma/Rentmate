import cron from "node-cron";
import Tenancy from "../models/Tenancy.js";
import Notification from "../models/Notification.js";

export const startCronJobs = () => {

  // Runs every day at midnight
  cron.schedule("0 0 * * *", async () => {
    const today = new Date();
    const todayDate = today.getDate();

    const tenancies = await Tenancy.find().populate("property");

    for (const tenancy of tenancies) {

      // RENT ALERT
      if (tenancy.rentDueDate === todayDate && !tenancy.rentPaid) {

        await Notification.create({
          user: tenancy.tenant,
          message: `Rent due today for ${tenancy.property.title}`
        });

        await Notification.create({
          user: tenancy.owner,
          message: `Rent pending for ${tenancy.property.title}`
        });
      }

      // LEASE ALERT (7 days before expiry)
      const diffDays =
        (tenancy.leaseEndDate - today) / (1000 * 60 * 60 * 24);

      if (diffDays <= 7 && diffDays > 6) {
        await Notification.create({
          user: tenancy.tenant,
          message: `Your lease expires in 7 days`
        });

        await Notification.create({
          user: tenancy.owner,
          message: `Lease expiring soon for ${tenancy.property.title}`
        });
      }
    }
  });
};
