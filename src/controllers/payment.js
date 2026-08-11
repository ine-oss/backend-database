import Payment from "../database/models/payment.js";
import Order from "../database/models/order.js";

// Process a payment
export const processPayment = async (req, res) => {
  try {
    const { orderId, paymentMethod } = req.body;

    // Make sure order exists
    const order = await Order.findByPk(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Generate fake unique transaction ID
    const transactionId = `TXN_${Date.now()}`;

    const newPayment = await Payment.create({
      orderId,
      amount: order.totalAmount,
      paymentMethod,
      status: "completed",
      transactionId
    });

    // Automatically mark the order as completed
    order.status = "completed";
    await order.save();

    return res.status(201).json({
      message: "Payment processed successfully",
      payment: newPayment
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Get payment receipt by Order ID
export const getPaymentByOrderId = async (req, res) => {
  try {
    const { orderId } = req.params;
    const payment = await Payment.findOne({ where: { orderId } });

    if (!payment) {
      return res.status(404).json({ message: "No payment record found for this order" });
    }

    return res.status(200).json(payment);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Get payment status by Transaction ID
export const getPaymentStatus = async (req, res) => {
  try {
    const { transactionId } = req.params;
    const payment = await Payment.findOne({ where: { transactionId } });

    if (!payment) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    return res.status(200).json({
      transactionId: payment.transactionId,
      status: payment.status,
      amount: payment.amount
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};