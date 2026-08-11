// so controller is a waiter that does all the work that rensponse the user

//This is an Order Controller for an e-commerce platform (like Amazon). It manages the shopping cart checkout, order history, status updates, and order cancellations.
import Order from "../database/models/order.js";//open access to order table and product table to 
import Product from "../database/models/product.js";//to be able to acces product and see what they order

//2. Get All Orders for a User (getUserOrders)
export const getUserOrders = async (req, res) => {//create function that begin working when the user makes an order
  try {//prevents crashing for the product
    const { userId } = req.params;//fetches url of order ans stores it
    const orders = await Order.findAll({//find all the orders
      where: { userId },//the order created
      order: [["createdAt", "DESC"]]// Step C: Sort by newest first
    });

    return res.status(200).json(orders);//return: Instantly stops this function from running any further. Once the job is done, execution stops right here.
  } catch (error) { //if there is the error execute it
    return res.status(500).json({ error: error.message });//show the  error
  }
};
//3. Get Details of One Order (getOrderById)
export const getOrderById = async (req, res) => {//function to run when  the order is called
  try {//prevents crashing of the project
    const { id } = req.params;//fetch the url of order
    // seches the database amtching tour id
    const order = await Order.findByPk(id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.status(200).json(order);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Create a new order
export const createOrder = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    // Check if product exists and calculate total
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const totalAmount = product.price * quantity;

    const newOrder = await Order.create({
      userId,
      productId,
      quantity,
      totalAmount,
      status: "pending"
    });

    return res.status(201).json(newOrder);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Update order status (e.g. pending -> completed)
export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = status;
    await order.save();

    return res.status(200).json({
      message: "Order status updated",
      order
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Delete / Cancel an order
export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findByPk(id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    await order.destroy();

    return res.status(200).json({ message: "Order cancelled and deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Get single order details
export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findByPk(id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.status(200).json(order);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Create a new order
export const createOrder = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const totalAmount = product.price * quantity;

    const newOrder = await Order.create({
      userId,
      productId,
      quantity,
      totalAmount,
      status: "pending",
    });

    return res.status(201).json({
      message: "Order placed successfully",
      order: newOrder,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Update order details / status
export const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findByPk(id);

    if (!order) {
      return res.status(404).json({ message: "Order not found, cannot update order" });
    }

    await order.update(req.body);

    return res.status(200).json({
      message: "Order updated successfully",
      order,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Delete / Cancel an order
export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findByPk(id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    await order.destroy();

    return res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};