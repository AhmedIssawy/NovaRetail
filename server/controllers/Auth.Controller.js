import User from "../models/User.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { username, email, password, phoneNumber } = req.body;

  if (!username || !email || !password || !phoneNumber) {
    return res.status(400).json({
      message: "Username, email, password, and phone number are required.",
    });
  }

  try {
    const existingUser = await User.findOne({ email: email.toLowerCase() });

    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User with that email already exists." });
    }
    // console.log("Password received:", password, "Type:", typeof password);

    const hashedPassword = await bcrypt.hash(String(password), 10);

    const newUser = new User({
      username,
      email: email.toLowerCase(),
      password: hashedPassword, // use 'password' not 'hashedPassword' for consistency
      phoneNumber,
    });

    await newUser.save();

    const payload = {
      id: newUser._id,
      email: newUser.email,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "7d", // 1 week
    });

    req.session.userId = user._id;

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        phoneNumber: newUser.phoneNumber,
      },
      token,
    });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  // --- Input Validation ---
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required." });
  }

  try {
    // --- Find User by Email ---
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    // --- Compare Password ---
    const isPasswordValid = await bcrypt.compare(
      String(password),
      user.password
    );

    // --- Store user ID in session (Session-based auth) ---
    req.session.userId = user._id;

    // --- Optional: Create JWT (if you're using token-based auth on frontend) ---
    const payload = {
      id: user._id,
      email: user.email,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // --- Send Response ---
    res.status(200).json({
      message: "Login successful.",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
      },
      token, // Optional: if you're using JWT in client (you can remove if using only sessions)
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "An internal server error occurred." });
  }
};

/*

export const logout  = (req, res) => {
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


export const getSession= async (req, res) => { // Made async to fetch user data
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
