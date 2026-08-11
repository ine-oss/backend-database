// swagger is the tools that helps to create documentation of our backend(apis)
// API ITUMA 2 APPS CAN BE ABLE TO TALK
// PURPOSE OF SWAGGER ITUMA FRONTEND DEVELOPER BE ABLE TO COMMUNICATE WITH YOUR BACKEND

import path from "path"; // IMPORT built in tools from node.js purpose is to help the backend work well with the paths file and folder
import swaggerjsdoc from "swagger-jsdoc"; // imports the external library purpose this tool reads the codes setup and converts it in the swagger document

const swaggerDefinition = { // a js object called the swagger definition its purpose it is a container where u define all basic details rules datatypes web adresses of your api
  openapi: "3.0.0", // version of api u are using how it works tells hei swagger use the version to read and understand the document
  info: { // general info about your document
    title: "dev sale API",
    version: "1.0.0",
  },
  components: { // opens a section for reusable parts of API
    securitySchemes: { // Meaning: This tells Swagger, "Here are the different ways users can authenticate (log in) to access protected parts of our API."
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    schemas: {
      // ---------------- USER SCHEMA ----------------
      User: {//defines how user look in the database
        type: "object",
        properties: {
          id: { type: "string", format: "uuid" },
          fullName: { type: "string" },
          email: { type: "string", format: "email" },
          PhoneNumber: { type: "string" },
          password: { type: "string" },
          role: { type: "string", enum: ["admin", "customer", "seller"] },
          status: { type: "string", enum: ["active", "inactive", "blocked"] },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
      },

      // ---------------- PRODUCT SCHEMA ----------------
      Product: {//defines how products look in the database
        type: "object",
        properties: {
          id: { type: "integer", example: 1 },
          name: { type: "string", example: "Wireless Mouse" },
          description: {
            type: "string",
            example: "Ergonomic wireless mouse with fast response.",
          },
          price: { type: "number", format: "float", example: 199.99 },
          stockQuantity: { type: "integer", example: 50 },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
      },

      // ---------------- ORDER SCHEMA ----------------
      Order: {//defines how order looks in the database
        type: "object",
        properties: {
          id: { type: "integer", example: 1 },
          userId: { type: "integer", example: 5 },
          totalAmount: { type: "number", format: "float", example: 299.98 },
          status: {
            type: "string",
            enum: ["pending", "completed", "cancelled"],
            default: "pending",
            example: "pending",
          },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
      },
    },
  },
  security: [{ bearerAuth: [] }],//applies login protection
  tags: [//organize tha API routes on swagger make th swagger look clean
    { name: "Auth", description: "Authentication endpoints" },
    { name: "Users", description: "API endpoints for users" },
    { name: "Products", description: "API endpoints for managing products" },
    { name: "Orders", description: "API endpoints for managing orders" },
  ],
  paths: {

    "/api/register": {//URL adress for registering
      post: {//means creating new data
        summary: "Registering new user in system",
        tags: ["Auth"],
        security: [], // Makes this public so anyone can register without logging in first.
        // request Bodythe data that is shown on user screen during registration
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  fullName: { type: "string", example: "John Doe" },
                  email: { type: "string", example: "john@example.com" },
                  PhoneNumber: { type: "string", example: "+1234567890" },
                  password: { type: "string", example: "password123" },
                },
                required: ["fullName", "email", "PhoneNumber", "password"],
              },
            },
          },
        },
       //server  response codes
        responses: {
          201: { description: "User registered successfully" },
          400: { description: "Bad request - Invalid payload" },
        },
      },
    },

// 
    "/api/users": {
      // READ: Get all users
      get: {
        description: "List of users fetched successfully",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/User" },
                },
              },
            },
          },
        },
      },
    },

    "/api/users/{id}": {        summary: "Get list of all users",
        tags: ["Users"],
        responses: {
          200: {
    
      // READ: Get single user by ID
      get: {
        summary: "Get user profile by ID",
        tags: ["Users"],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "string", format: "uuid" } },
        ],
        responses: {
          200: {
            description: "User details",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/User" },
              },
            },
          },
          404: { description: "User not found" },
        },
      },
      // UPDATE: Edit user details
      put: {
        summary: "Update user profile info",
        tags: ["Users"],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "string", format: "uuid" } },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  fullName: { type: "string", example: "John Updated" },
                  PhoneNumber: { type: "string", example: "+1987654321" },
                  role: { type: "string", enum: ["admin", "customer", "seller"] },
                  status: { type: "string", enum: ["active", "inactive", "blocked"] },
                },
              },
            },
          },
        },
        responses: {
          200: { description: "User updated successfully" },
          404: { description: "User not found" },
        },
      },
      // DELETE: Delete a user
      delete: {
        summary: "Delete user account",
        tags: ["Users"],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "string", format: "uuid" } },
        ],
        responses: {
          200: { description: "User account deleted successfully" },
          404: { description: "User not found" },
        },
      },
    },

    // =========================================================================
    // 3. PRODUCT ENDPOINTS (CRUD)
    // =========================================================================
    "/api/products": {
      // CREATE: Create a product
      post: {
        summary: "Create a new product",
        tags: ["Products"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: { type: "string", example: "Wireless Mouse" },
                  description: {
                    type: "string",
                    example: "Ergonomic wireless mouse",
                  },
                  price: { type: "number", format: "float", example: 199.99 },
                  stockQuantity: { type: "integer", example: 50 },
                },
                required: ["name", "price"],
              },
            },
          },
        },
        responses: {
          201: {
            description: "Product created successfully",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Product" },
              },
            },
          },
          400: { description: "Bad request" },
        },
      },
      // READ: Get all products
      get: {
        summary: "Get all product items",
        tags: ["Products"],
        security: [], // Public viewing
        responses: {
          200: {
            description: "List of products",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Product" },
                },
              },
            },
          },
        },
      },
    },

    "/api/products/{id}": {
      // READ: Get single product
      get: {
        summary: "Get product by ID",
        tags: ["Products"],
        security: [],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "integer" } },
        ],
        responses: {
          200: {
            description: "Product detail data",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Product" },
              },
            },
          },
          404: { description: "Product not found" },
        },
      },
      // UPDATE: Update a product
      put: {
        summary: "Update existing product",
        tags: ["Products"],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "integer" } },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: { type: "string", example: "Gaming Mouse RGB" },
                  description: { type: "string", example: "Updated description" },
                  price: { type: "number", format: "float", example: 249.99 },
                  stockQuantity: { type: "integer", example: 30 },
                },
              },
            },
          },
        },
        responses: {
          200: { description: "Product updated successfully" },
          404: { description: "Product not found" },
        },
      },
      // DELETE: Delete a product
      delete: {
        summary: "Remove product from store",
        tags: ["Products"],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "integer" } },
        ],
        responses: {
          200: { description: "Product deleted successfully" },
          404: { description: "Product not found" },
        },
      },
    },

    // =========================================================================
    // 4. ORDER ENDPOINTS (CRUD)
    // =========================================================================
    "/api/orders": {
      // CREATE: Create new order
      post: {
        summary: "Create a new order",
        tags: ["Orders"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  userId: { type: "integer", example: 5 },
                  totalAmount: { type: "number", format: "float", example: 299.98 },
                  status: {
                    type: "string",
                    enum: ["pending", "completed", "cancelled"],
                    example: "pending",
                  },
                },
                required: ["userId", "totalAmount"],
              },
            },
          },
        },
        responses: {
          201: {
            description: "Order created successfully",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Order" },
              },
            },
          },
          400: { description: "Bad request" },
          401: { description: "Unauthorized" },
        },
      },
      // READ: Get all orders
      get: {
        summary: "Get all customer orders",
        tags: ["Orders"],
        responses: {
          200: {
            description: "List of orders",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Order" },
                },
              },
            },
          },
          401: { description: "Unauthorized" },
        },
      },
    },

    "/api/orders/{id}": {
      // READ: Get single order
      get: {
        summary: "Get order status by ID",
        tags: ["Orders"],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "integer" } },
        ],
        responses: {
          200: {
            description: "Order details",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Order" },
              },
            },
          },
          404: { description: "Order not found" },
        },
      },
      // UPDATE: Modify order status
      put: {
        summary: "Update order status",
        tags: ["Orders"],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "integer" } },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  status: {
                    type: "string",
                    enum: ["pending", "completed", "cancelled"],
                    example: "completed",
                  },
                },
              },
            },
          },
        },
        responses: {
          200: { description: "Order updated successfully" },
          404: { description: "Order not found" },
        },
      },
      // DELETE: Delete or cancel order
      delete: {
        summary: "Delete or cancel order record",
        tags: ["Orders"],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "integer" } },
        ],
        responses: {
          200: { description: "Order deleted successfully" },
          404: { description: "Order not found" },
        },
      },
    },
  },
};

const swaggerspec = swaggerjsdoc({ definition: swaggerDefinition, apis: [] });
export default swaggerspec;