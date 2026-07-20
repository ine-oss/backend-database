import sequelize from "../config/db.js";
import "../database/index.js";
import { createUserTable } from "../database/migrations/user.js";
import { createNotificationTable } from "../database/migrations/notification.js";
import { createOrderTable } from "../database/migrations/order.js";
import { createPaymentTable } from "../database/migrations/payment.js";
import { createProductTable } from "../database/migrations/product.js";

const syncDatabase = async () => {
    try {
        console.log("starting database sync...");

        await sequelize.authenticate();
        console.log("database connection is successful");

        await createUserTable();
        await createNotificationTable();
        await createOrderTable();
        await createPaymentTable();
        await createProductTable();

        await sequelize.sync({ alter: true, logging: false });
        console.log("database synced successfully");

        process.exit(0);
    } catch (error) {
        console.error("database sync failed", error);
        process.exit(1);
    }
};

syncDatabase();