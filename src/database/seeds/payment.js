//connecting the tables so the system can know things ordererd and how paymeny will work
import Payment from "../models/payment.js";
import Order from "../models/order.js";
//function help reset the database
export const seedPayments = async () => {
    // try prevents the crashing of the whole project
  try {
    // pulling order created  from database
    //awit tells that the re is sth running plz wait
    const orders = await Order.findAll();
//check if the order is available or exist if not  the payment proces wills hut down
    if (orders.length === 0) {
      console.log("No orders found. Seed orders first!");
      return;
    }
// how payment will be done
    const payments = [//function that will help us
      {
        orderId: orders[0].id,//order being craeated
        amount: orders[0].totalAmount,//amount of the  orders
        paymentMethod: "Credit Card",//paying mode
        status: "completed",//order is paid or deriveld
        transactionId: "TXN_987654321"
      },
      {
        orderId: orders[1].id,
        amount: orders[1].totalAmount,
        paymentMethod: "Mobile Money",
        status: "pending",
        transactionId: "TXN_123456789"
      }
    ];

    //saving the order immeditely in database
    await Payment.bulkCreate(payments, { ignoreDuplicates: true });
    console.log("Payments seeded successfully!");
    //catches the error immeditely  in database and then  shows it in the terminal
  } catch (error) {
    console.error("Error seeding payments:", error);
  }
};