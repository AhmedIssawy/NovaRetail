// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Import bcrypt for password hashing
const jwt = require('jsonwebtoken')

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

userSchema.pre('save', async function(next) {
    // Only hash the password if it has been modified (or is new)
    if (!this.isModified('password')) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10); // Generate a salt
        this.password = await bcrypt.hash(this.password, salt); // Hash the password
        next(); // Proceed to save
    } catch (error) {
        next(error); // Pass any error to the next middleware
    }
});

// Method to generate JWT for a user instance

userSchema.methods.generateAuthToken = function() {
    // Ensure JWT_SECRET is defined in your environment variables for security
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined in environment variables.');
    }
    return jwt.sign(
        {
            userId: this._id,      // The user's unique MongoDB _id
            username: this.username, // The user's username
            role: this.role        // The user's role
        },
        process.env.JWT_SECRET, // Use environment variable for the secret key
        { expiresIn: '1d' } // Token expires in 1 day
    );
};
// Method to compare candidate password with hashed password
userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

// Create a static method to find user by email (as discussed previously)
userSchema.statics.findUserByEmail = async function (email) {
    // Ensure email is lowercased for consistent lookup
    return this.findOne({ email: email.toLowerCase() });
};


const User = mongoose.model("User", userSchema);

module.exports = User; // CommonJS export