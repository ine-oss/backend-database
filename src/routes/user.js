import express from 'express';
import bcrypt from 'bcrypt';

import {
    getAllUsers,
    singleUser,
    createUser,
    updateUser,
    deleteUser,

} from '../controllers/user.js';
import {Protect , AllowedRoles} from '../middleware/auth.js';
const userRoutes = express.Router();
userRoutes.get("/api/getAllUsers",  getAllUsers);
userRoutes.get("/api/getUser/:id", singleUser);
userRoutes.put("/api/updateUser/:id", updateUser);
userRoutes.post("/api/createUser", createUser);
userRoutes.delete("/api/deleteUser/:id", deleteUser);

export default userRoutes;