import { fileURLToPath } from "url";
import path from "path";
import { seedUsers } from "./user.js";
import User from "../models/user.js";
import Notification from "../models/notification.js";

export const seedNotification = async () => {
  try {
    const users = await User.findAll();

    if (users.length === 0) {
      console.log("No users found. Seed users first!");
      return;
    }

    const notifications = [
      {
        userId: users[0].id,
        message: "Welcome to Dev-Axis! Your account is ready.",
        isRead: false,
      },
      {
        userId: users[1]?.id || users[0].id,
        message: "Your latest order is being processed.",
        isRead: false,
      },
    ];

    await Notification.bulkCreate(notifications, { ignoreDuplicates: true });
    console.log("Notifications seeded successfully!");
  } catch (error) {
    console.error("Error seeding notifications:", error);
  }
};

const runSeeds = async () => {
  const startTime = Date.now();
  console.log("🌱 Starting database seeding process...\n");

  try {
    console.log("⏳ Seeding users...");
    await seedUsers();
    console.log("✅ Users seeded successfully.\n");

    console.log("⏳ Seeding notifications...");
    await seedNotification();
    console.log("✅ Notifications seeded successfully.\n");

    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log(`🎉 All seeding completed in ${duration}s!`);
  } catch (error) {
    console.error("❌ Seeding failed with an error:", error);
    process.exitCode = 1;
  } finally {
    console.log("👋 Exiting process.");
    process.exit(process.exitCode || 0);
  }
};

const isDirectRun = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isDirectRun) {
  runSeeds();
}