import express from "express";
import cors from "cors";
import sequelize from "./src/config/db.js";
import "dotenv/config";
import userRoutes from "./src/routes/user.js";
import AuthRoutes from "./src/routes/auth.js";
import productRoutes from "./src/routes/product.js"; // Import product routes

const app = express();

app.use(
  cors(
    {
        origin:["http://localhost:5173", "http://localhost:5174" ],
        methods:["GET", "POST","PUT", "DELETE"]
    }
));
app.use(express.json());

// Register Routes directly
app.use(userRoutes);
app.use(AuthRoutes);
app.use(productRoutes); // <-- Mounts /api/createProduct directly!

const PORT = process.env.PORT || 5000;

sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected successfully");
    return sequelize.sync();
  })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server running on port ${PORT}`)
    )
  )
  .catch((err) => {
    console.error("Unable to connect:", err);
  });

export default app;