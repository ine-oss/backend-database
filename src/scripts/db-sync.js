//In simple terms, a script is a small computer program written to perform a specific task automatically.
// Think of your main server code as the factory that runs 24/7 to serve users. A script, on the other hand, is like a special tool you pull out of the toolbox, run once to perform a job, and then put away.
//Runs only when executed, performs a specific job, and then shuts off immediately
//1. IMPORT THE SETUP
import sequelize from "../config/db.js";//IMPORTING YOUR DATABASE INFORMATION 
import "../database/index.js";

// Migrations
import { createUserTable } from "../database/migrations/user.js";
import { createNotificationTable } from "../database/migrations/notification.js";
import { createOrderTable } from "../database/migrations/order.js";
import { createPaymentTable } from "../database/migrations/payment.js";
import { createProductTable } from "../database/migrations/product.js";

// Seeders
import { seedUsers } from "../database/seeds/user.js";
import { seedNotification } from "../database/seeds/notification.js";
import { seedProducts } from "../database/seeds/product.js";
import { seedOrders } from "../database/seeds/order.js";
import { seedPayments } from "../database/seeds/payment.js";
//The purpose of syncDatabase is to act as the master controller for your setup script. It ensures your database is connected, built, and populated with data in the correct order before automatically shutting down.
const syncDatabase = async () => {//CREATE A S FUNCTION REQUIRED TO RUN
    try {
        console.log("starting database sync...");

        await sequelize.authenticate();
        console.log("database connection is successful");

        // 1. Create all tables IN database
        await createUserTable();
        await createNotificationTable();
        await createOrderTable();
        await createPaymentTable();
        await createProductTable();

        // 2. Sync Sequelize models with DB
        // This line acts as the safety check and alignment step between your JavaScript models and your actual SQL database.
        //  sequelize.sync:Scans all the Sequelize models registered in your application
        //  alter: true:Why it matters: If you decide to add a new column to your model (for example, adding phoneNumber to the User model), setting alter: true tells Sequelize: "Look at the database, see that the phoneNumber column is missing, and alter the table to add it, but keep all existing users intact.
        //  logging: false=> Why it matters: By default, Sequelize prints every CREATE TABLE and ALTER TABLE SQL query to your console. Setting logging: false keeps your terminal output clean so you only see your custom console.log messages.
        await sequelize.sync({ alter: true, logging: false });

        // 3. Seed data in correct dependency order:
        //    a. Independent tables (Users, Products)
        //    b. Dependent on Users/Products (Notifications, Orders)
        //    c. Dependent on Orders (Payments)
        //this help in testing if the are working smoothly
        await seedUsers();//Inserts fake user accounts (e.g., test customers and admins with names, emails, and hashed passwords).
        await seedProducts();//Inserts fake products
        await seedNotification();//Inserts fakenotification
        await seedOrders();//Inserts fakeorders
        await seedPayments();//Inserts fake payment

        console.log("database synced and all tables seeded successfully!");

        process.exit(0);//task is finished with zero errors
    } catch (error) {
        console.error("database sync failed", error);
        process.exit(1);//telling system an error ocured
    }
};

syncDatabase();//Calls the function to execute the whole process.