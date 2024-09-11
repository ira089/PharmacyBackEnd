import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRouter from "./routes/authRouter.js";
import storesRouter from "./routes/storesRouter.js";
import reviewsRouter from "./routes/reviewsRouter.js";
import productsRouter from "./routes/productsRouter.js";
import orderItemsRouter from "./routes/orderItemsRouter.js";
import orderRouter from "./routes/orderRouter.js";

dotenv.config();
const { DB_HOST, PORT = 3000 } = process.env;

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use("/api/users", authRouter);
app.use("/api/pharmacies", storesRouter);
app.use("/api/reviews", reviewsRouter);
app.use("/api/products", productsRouter);
app.use("/api/order", orderRouter);
app.use("/api/orderitems", orderItemsRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log("Database connection successful");
    });
  })
  .catch((error) => {
    console.error(error.message);
    process.exit(1);
  });

export default app;
