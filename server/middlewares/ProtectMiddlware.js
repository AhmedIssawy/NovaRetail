const jwt = require('jsonwebtoken');
const User = require('../models/User');

const SECRET = 'a4b7c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3'

exports.protect = async (req, res, next) => {
    let token;

    // Check for token in Authorization header first
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    }
    // Else, check for token in cookies
    else if (req.cookies.access_token) {
        token = req.cookies.access_token;
    }

    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, SECRET);

        // Attach user to the request object (excluding password)
        req.user = await User.findById(decoded.sub).select('-password');

        if(!req.user) {
            return res.status(401).json({ message: 'Not authorized, user not found' });
        }

        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: 'Not authorized, token failed' });
    }
};


exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        // protect middleware must have run first to attach req.user
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({
                message: `Forbidden: Your role (${req.user.role}) is not authorized to access this resource.`,
            });
        }
        next();
    };
};

exports.protectWithSession = (req, res, next) => {
    if (req.session && req.session.user) {
        return next();
    }
    return res.status(401).json({ message: 'Not authorized, no active session.' });
};