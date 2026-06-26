import express from "express";
import cors from "cors";
import morgan from "morgan";
import errorHandler from "./middleware/errorMiddleware.js";
import authRoutes from "./routes/authRoutes.js";
import testRoutes from "./routes/testRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import path from "path";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import itineraryRoutes from "./routes/itineraryRoutes.js";





const app = express();

app.use(cors());

app.use(express.json());
app.use(morgan("dev"));
app.use(errorHandler);
app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/itinerary", itineraryRoutes);

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Welcome to Trrip AI API"
    });
});

export default app;