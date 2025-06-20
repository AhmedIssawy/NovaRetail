
const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {

    const { username, email, password, phoneNumber } = req.body;

    if (!username || !email || !password || !phoneNumber)
    {
        return res.status(400).json({ message: 'Username, email, password, and phone number are required.' });
    }

    try {
        const existingUser = await User.findOne({ email: email.toLowerCase() }); // Use .toLowerCase() for consistency
        if (existingUser) {
            return res.status(409).json({ message: 'User with that email already exists.' });
        }


        const newUser = new User({ username, email, password, phoneNumber });
        const token = newUser.generateAuthToken();
        req.cookies = token
        await newUser.save();



        // The client will need this token for authenticating future requests.
        res.status(201).json({
            message: 'Registration successful!',
            token: token,
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email
            }
        });

    } catch (error) {
        console.error('Registration Error:', error);

    }
};


exports.login = async (req, res) => {
    const { email, password } = req.body;

    // --- Input Validation ---
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }

    try {

        const user = await User.findUserByEmail(email);
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        // --- User is Authenticated. Create JWT. ---
        // Use the instance method defined in the User model
        const token = user.generateAuthToken();

        // --- Store User ID in the Session ---
        // This marks the user as logged in for this server session.

        // --- Send Response ---
        res.status(200).json({
            message: 'Login successful.',
            user: { // Send a subset of user data
                id: user._id,
                username: user.username,
                email: user.email,
                phoneNumber: user.phoneNumber,
                role: user.role,
            },
            token: token, // Send the token for client-side storage
        });

    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ message: 'An internal server error occurred.' });
    }
};

/*

exports.logout  = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Session destruction error:', err);
            return res.status(500).json({ message: 'Could not log out, please try again.' });
        }
        // Clears the session cookie from the client's browser
        res.clearCookie('connect.sid'); // The default session cookie name for express-session
        res.status(200).json({ message: 'Logout successful.' });
    });
};


exports.getSession= async (req, res) => { // Made async to fetch user data
    if (req.session.userId) {
        try {
            // Fetch the user data from the database using the stored ID
            const user = await User.findById(req.session.userId).select('-password'); // Exclude password
            if (user) {
                res.status(200).json({
                    isLoggedIn: true,
                    user: {
                        id: user._id,
                        username: user.username,
                        email: user.email,
                        phoneNumber: user.phoneNumber,
                        role: user.role,
                    }
                });
            } else {
                // Session ID exists but user not found in DB (e.g., user deleted)
                req.session.destroy(() => { // Clear invalid session
                    res.clearCookie('connect.sid');
                    res.status(200).json({ isLoggedIn: false, message: 'Invalid session.' });
                });
            }
        } catch (error) {
            console.error('Error fetching user for session:', error);
            res.status(500).json({ message: 'An internal server error occurred while retrieving session.' });
        }
    } else {
        // No user ID in session
        res.status(200).json({ isLoggedIn: false });
    }
};
*/
