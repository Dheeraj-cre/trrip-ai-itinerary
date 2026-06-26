
import express from "express";
import cors from "cors";
import morgan from "morgan";

import authRoutes from "./routes/authRoutes.js";
import testRoutes from "./routes/testRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import itineraryRoutes from "./routes/itineraryRoutes.js";

import errorHandler from "./middleware/errorMiddleware.js";

const app = express();

/* -----------------------------
   Middlewares
------------------------------ */

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://trrip-ai-itinerary.vercel.app/login",
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));

/* -----------------------------
   Static Files
------------------------------ */

app.use("/uploads", express.static("uploads"));

/* -----------------------------
   Routes
------------------------------ */

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to Trrip AI API ",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/itinerary", itineraryRoutes);

/* -----------------------------
   Error Handler (Always Last)
------------------------------ */

app.use(errorHandler);

export default app;
