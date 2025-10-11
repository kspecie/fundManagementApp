import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import { pool } from "./db"; // Import the pool from db/index.ts
import fundRoutes from "./routes/fundRoutes";
import investorRoutes from "./routes/investorRoutes";
import { globalErrorHandler } from "./errors/errorHandler";
import { NotFoundError } from "./errors/AppError";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

//Routes
app.use("/api/funds", fundRoutes);
app.use("/api/investors", investorRoutes);

// app.get("/test", (req, res) => {
//   res.send("Test route works");
// });

// Ensure the pool is connected before starting the server
pool
  .connect()
  .then(() => console.log("Database connected"))
  .catch((err) => console.error("Database connection error:", err));

// Unknown route handler
app.use((req: Request, res: Response, next: NextFunction) => {
  throw new NotFoundError("Endpoint", req.path);
});

// Global error handler (must be last)
app.use(globalErrorHandler);

// Start Server
app.listen(PORT, () => {
  console.log(`Server listening on PORT:${PORT}`);
});
