import { DataTypes } from 'sequelize';
import sequelize from '../../config/db.js';

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false // Product must have a name
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true // Optional longer text for item details
  },
  price: {
    type: DataTypes.DECIMAL(10, 2), // Stores numbers like 199.99 cleanly
    allowNull: false
  },
  stockQuantity: {
    type: DataTypes.INTEGER,
    defaultValue: 0 // Default to 0 items available
  }
});

export default Product;