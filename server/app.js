import express from "express";
import productRoute from "./routes/Product.Routes.js";
import authRoutes from "./routes/User.Routes.js";
import CategoryRoute from "./routes/Category.Routes.js";
import StoresRoute from "./routes/Store.Routes.js";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import sessionMiddleware from "./config/session.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sessionMiddleware);

app.use("/products", productRoute);
app.use("/categories", CategoryRoute);
app.use("/stores", StoresRoute);
app.use("/auth", authRoutes);

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
