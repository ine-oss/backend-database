import sequelize from "../../config/db.js";
import Notification from "../models/notification.js";

export const createNotificationTable = async () => {
    await sequelize.authenticate();
    await Notification.sync({ alter: true, logging: false });
    console.log('notification table created and synced successfully.');
};