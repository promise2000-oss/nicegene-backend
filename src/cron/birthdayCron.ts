import cron from "node-cron";
import { Staff } from "../models/Staff";
import { sendBirthdayEmail } from "../services/emailService";
export const checkAndSendBirthdayWishes = async (): Promise<void> => {
  try {
    const today = new Date();
    const currentMonth = today.getMonth() + 1; // MongoDB months are 1-12
    const currentDay = today.getDate();
    console.log(`[Cron] Checking for birthdays on Month: ${currentMonth}, Day: ${currentDay}...`);

    // Retrieve active staff members whose birthday is today
    const celebratingStaff = await Staff.find({
      isActive: true,
      $expr: {
        $and: [
          { $eq: [{ $month: '$dateOfBirth' }, currentMonth] },
          { $eq: [{ $dayOfMonth: '$dateOfBirth' }, currentDay] },
        ],
      },
    });

    if (celebratingStaff.length === 0) {
      console.log('[Cron] No birthdays found today.');
      return;
    }

    console.log(`[Cron] Found ${celebratingStaff.length} staff members celebrating today.`);
    for (const member of celebratingStaff) {
      console.log(`[Cron] Sending birthday wish to ${member.name} (${member.email})...`);
      const success = await sendBirthdayEmail(member.email, member.name);
      if (success) {
        console.log(`[Cron] Birthday wish sent to ${member.name} successfully.`);
      } else {
        console.warn(`[Cron] Failed to send birthday wish to ${member.name}.`);
      }
    }
  } catch (error) {
    console.error('[Cron] Error running birthday checks:', error);
  }
};

export const initBirthdayCron = (): void => {
  // Run every day at 9:00 AM (0 9 * * *)
  // Can be configured to run at other times if needed.
  const cronSchedule = process.env.BIRTHDAY_CRON_SCHEDULE || '15 14 * * *';

  cron.schedule(cronSchedule, () => {
    checkAndSendBirthdayWishes();
  });

  console.log(`[Cron] Birthday check job scheduled with: "${cronSchedule}"`);
};
