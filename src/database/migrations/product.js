//importing
import sequelize from "../../config/db.js";//we import it bcs it hold the database msg
import Product from "../models/product.js";

export const createProductTable = async () => {//ceate funcrion of creating the table
    await sequelize.authenticate();//check if there is table about database information and createss it
    await Product.sync({ alter: true, logging: false });// creates the tavle if not there,looging false stops my sql from running
    console.log('product table created and synced successfully.');//msg fo success
};