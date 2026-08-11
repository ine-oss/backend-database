//connecting the tables so the system can know who bought the thing and things bought
import Order from "../models/order.js";
import User from "../models/user.js";
import Product from "../models/product.js";
//function that help in reset your database for testing called seedorders
export const seedOrders = async () => {
    // try:prevents the crashing of all project
  try {
    // pulls the  customer accounts ,id  and products from database
    // await say that wait a  minute there is sth running
    const users = await User.findAll();
    const products = await Product.findAll();
// checks if the use and the products exist if one is not working stop  executing immeditely the order will stop
    if (users.length === 0 || products.length === 0) {
      console.log("Missing users or products. Seed them first!");
      return;
    }
// function of  creating orders
    const orders = [
      {
        userId: users[0].id, //start bt id
        productId: products[0].id,//product you want
        quantity: 2,//how much things you wanna buy
        totalAmount: products[0].price * 2,//price
        status: "completed"//order is paid or deriveld
      },
      {
        userId: users[1].id,
        productId: products[1].id,
        quantity: 1,
        totalAmount: products[1].price * 1,
        status: "pending"
      }
    ];
    //saving orders in datavase
    await Order.bulkCreate(orders, { ignoreDuplicates: true });
    console.log("Orders seeded successfully!");
    //Catches and prints any database errors directly to your terminal screen 
    // if the process fails.
  } catch (error) {
    console.error("Error seeding orders:", error);
  }
};