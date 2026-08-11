import Product from "../models/product.js";

export const seedProducts = async () => {
  try {
    const products = [
      {
        name: "Wireless Mouse",
        description: "Ergonomic wireless optical mouse",
        price: 25.99,
        stock: 50
      },
      {
        name: "Mechanical Keyboard",
        description: "RGB mechanical gaming keyboard",
        price: 89.99,
        stock: 30
      },
      {
        name: "HD Monitor 27 inch",
        description: "1080p 144Hz gaming monitor",
        price: 199.99,
        stock: 15
      }
    ];

    await Product.bulkCreate(products, { ignoreDuplicates: true });
    console.log("Products seeded successfully!");
  } catch (error) {
    console.error("Error seeding products:", error);
  }
};