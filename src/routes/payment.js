import express from 'express';
import {
  getPaymentByOrderId,
  processPayment,
  getPaymentStatus
} from '../controllers/paymentController.js';

const paymentRoutes = express.Router();

// Process a payment for an order
paymentRoutes.post('/api/payments', processPayment);

// Get payment details for a specific order
paymentRoutes.get('/api/payments/order/:orderId', getPaymentByOrderId);

// Check payment status by transaction ID
paymentRoutes.get('/api/payments/status/:transactionId', getPaymentStatus);

export default paymentRoutes;