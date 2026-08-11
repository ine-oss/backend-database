// the server: "When a user visits this specific URL, run this specific Controller function."
import express from 'express';//Imports the Express framework so we can use its built-in router.
import {
    getAllOrders,
    getUserOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder
} from '../controllers/order.js';//Imports all the controller functions you built earlier. These contain the actual database logic.
//CREATING ROUTES
//Imports all the controller functions you built earlier. These contain the actual database logic.
const orderRoutes = express.Router();

orderRoutes.get("/api/getAllOrders", getAllOrders);//What it does: When someone navigates to /api/getAllOrders, Express calls the getAllOrders controller function to send back a list of every order in the system.
orderRoutes.get("/api/getUserOrders/:userId", getUserOrders);//What it does: Fetches orders for one specific customer (e.g., /api/getUserOrders/45 passes 45 to req.params.userId).
orderRoutes.get("/api/getOrder/:id", getOrderById);//Fetches full receipt/invoice details for a single specific order (e.g., /api/getOrder/101).
orderRoutes.post("/api/createOrder", createOrder);//createOrder when a user submits a checkout form, creating a brand new row in your Orders table.
orderRoutes.put("/api/updateOrder/:id", updateOrder);//Updates details or the status of an existing order matching :id.
orderRoutes.delete("/api/deleteOrder/:id", deleteOrder);// CALLSdeleteOrder to remove or cancel order :id from the database.

export default orderRoutes;//Exports orderRoutes so you can import it into your main server file