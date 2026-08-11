import express from 'express';
import {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} from '../controllers/product.js';

const productRoutes = express.Router();

productRoutes.get("/api/getAllProducts", getAllProducts);
productRoutes.get("/api/getProduct/:id", getProductById);
productRoutes.post("/api/createProduct", createProduct); // <-- Endpoint path
productRoutes.put("/api/updateProduct/:id", updateProduct);
productRoutes.delete("/api/deleteProduct/:id", deleteProduct);

export default productRoutes;