// models/User.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'; // Import bcrypt for password hashing
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true, // Ensure usernames are unique
        trim: true,
    },
    email: { // --- ADDED: Email field ---
        type: String,
        required: true,
        unique: true, // Ensure emails are unique
        lowercase: true, // Store emails in lowercase for consistent lookups
        trim: true,
    },

    password: {
        type: String,
        required: true,
        minlength: 6, // --- ADDED: Minimum password length ---
    },
    phoneNumber: {
        type: String, // Changed to String as numbers can have leading zeros and be too long for Number type
        required: true,
        unique: true, // Assuming phone numbers should be unique too
    },
    role: {
        type: String,
        enum: ['App-admin', 'Store-admin', 'Sales','Customer'],
        default: 'Store-admin', // Corrected default to match enum value case
    }
}, { timestamps: true });





const User = mongoose.model("User", userSchema);

export default User;