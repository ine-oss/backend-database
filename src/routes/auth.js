import express from "express";
import { register,login } from "../controllers/auth.js";

const AuthRoutes = express.Router();
/**
 * @swagger
 * /api/register:
 * post:
 *     summary: register new user
 *      tags :[Auth]
 *       requestBody:
 *       require:true
 *         content:
 *          application/json:
 *            schema:
 *          type:object
 *            properties:
 *           fullName:
 *            type:string
 *              email:
 *              type: string
 *                 phoneNumber
 *                   type: string
 *                       password:
 *                        type: string
 *                         required:
 *                       fullName
 *                       email
 *                        phoneNumber
 *                           password
 *                            response:
 *                              201
 *             description: user registered succesfully
 *  401
 * description: Bad request
 * 
 */


AuthRoutes.post("/api/register",register);
AuthRoutes.post("/api/login", login);

export default  AuthRoutes
