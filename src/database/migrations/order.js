import sequelize from "../../config/db.js";
import Order from "../models/order.js";

export const createOrderTable = async () => {
    await sequelize.authenticate();
    await Order.sync({ alter: true, logging: false });
    console.log('order table created and synced successfully.');
};