import sequelize from "../../config/db.js";
import Product from "../models/product.js";

export const createProductTable = async () => {
    await sequelize.authenticate();
    await Product.sync({ alter: true, logging: false });
    console.log('product table created and synced successfully.');
};