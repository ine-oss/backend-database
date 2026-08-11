// A Controller is the brain of your application.
// It acts as the manager that connects what the user wants
// to do with the data stored in your database.
// ni nka chef in restaurant
// model is like recipe book

import User from "../database/models/user.js"; // Bringing user model into controller to interact with database
import bcrypt from 'bcrypt'; // To scramble/hash passwords later

// Get all users
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users); // FIXED: Changed Users to users (lowercase)
        console.log("all users", users);
    } catch (error) {
        res.status(500).json({ // FIXED: Changed status code to 500 for error handling
            error: error.message
        });
    }
};

// Get user by id
export const singleUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id); // FIXED: Changed const User to const user
        if (!user) {
            return res.status(404).json({
                message: 'user not found'
            });
        }
        res.status(200).json({ message: 'user is', user });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

// Create user
export const createUser = async (req, res) => {
    try {
        const {
            password,
            ...userData
        } = req.body;

        const existing = await User.findOne({ where: { email: userData.email } });
        if (existing) {
            return res.status(400).json({ message: "email already used" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            ...userData,
            password: hashedPassword
        });

        res.status(201).json({ message: "user registered successfully", user }); // FIXED: Corrected res.staus to res.status

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update user
export const updateUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "user not found, cannot update user" }); // FIXED: 404 is standard for Not Found
        }

        await user.update(req.body); // FIXED: Updated the fetched user instance directly
        res.status(200).json({ message: "user updated successfully", user });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete user
export const deleteUser = async (req, res) => {
    try {
        const delUser = await User.findByPk(req.params.id);
        if (!delUser) {
            return res.status(404).json({ message: "user not found" });
        }

        await delUser.destroy();
        res.status(200).json({ message: "user deleted successfully" }); // FIXED: Changed req.status to res.status
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};