import { DataTypes } from 'sequelize';
import sequelize from '../../config/db.js';

const Notification = sequelize.define('Notification', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false // Who gets this message/alert
  },
  message: {
    type: DataTypes.STRING,
    allowNull: false // e.g., "Your order has been shipped!"
  },
  isRead: {
    type: DataTypes.BOOLEAN,
    defaultValue: false // Tracks if user clicked/saw the message
  }
});

export default Notification;