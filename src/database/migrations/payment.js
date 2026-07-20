import sequelize from "../../config/db.js";
import Payment from "../models/payment.js";

export const createPaymentTable = async () => {
    await sequelize.authenticate();
    await Payment.sync({ alter: true, logging: false });
    console.log('payment table created and synced successfully.');
};