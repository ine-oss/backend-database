//models help creaeate table that are needed to go in the  database
// What it means: * DataTypes: Imports built-in database types (numbers, text, true/false switches).
// sequelize: Imports your connection tool to talk to the actual database.
import { DataTypes } from 'sequelize';
import sequelize from '../../config/db.js';
//tells the database to create a table of notification
const Notification = sequelize.define('Notification', {
  // Every notification gets its own unique ID number (1, 2, 3...).
  // Key details: primaryKey: true means no two notifications can share an ID.
  //  autoIncrement: true means the database automatically counts up for every new notification created.
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
    //Stores who should receive the alert.
    // allowNull: false means a notification must belong to a specific customer—you can't send a notification to "nobody."
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false // Who gets this message/alert
  },
  //The actual text shown to the user (e.g., "Your order #102 has shipped!" or "Item in your wishlist is on sale!").
  // allowNull: false ensures every alert actually contains text.
  message: {
    type: DataTypes.STRING,
    allowNull: false // e.g., "Your order has been shipped!"
  },
  // tracks if the customer reads the notification
  isRead: {
    type: DataTypes.BOOLEAN,
    defaultValue: false // Tracks if user clicked/saw the message
  }
});
// What it means: Allows you to import Notification into your controllers

//  (e.g., notificationController.js) so you can create new alerts
//  when an order status updates!
export default Notification;