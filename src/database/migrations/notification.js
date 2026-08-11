//A migration file tells the database how to apply those structural changes step-by-step.
//is like a farther telling his son how to solve some changes at home 
import sequelize from "../../config/db.js";//we import it bcz hold our data base news
import Notification from "../models/notification.js";

export const createNotificationTable = async () => {
    await sequelize.authenticate();//Checks if your database credentials (DB name, password, host, port) are correct and that the database is online. If it fails, execution immediately jumps to a catch block.
    // Notification (The Blueprint): In your code, you defined what a notification looks like (e.g., it has a title, message, isRead status, and userId). But right now, that is just JavaScript code floating in your application's memory—it does not exist in the database yet.
// .sync() (The Builder): When you call .sync(), Sequelize takes that JavaScript blueprint, connects to your SQL database, and runs the actual SQL commands (like CREATE TABLE IF NOT EXISTS notifications...) to build or update the real table.
// alter: true check if the table exist if doesnt it creates one
// logging:false => is an option passed to Sequelize methods to turn off SQL query printing in your conso
    await Notification.sync({ alter: true, logging: false });
    // Outputs a clean message to your terminal confirming that the table setup completed without errors.
    console.log('notification table created and synced successfully.');
};