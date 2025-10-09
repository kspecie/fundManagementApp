import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import { pool } from "./db"; // Import the pool from db/index.ts
import fundRoutes from "./routes/fundRoutes";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

//Routes
app.use("/api/funds", fundRoutes);

// Ensure the pool is connected before starting the server
pool
  .connect()
  .then(() => console.log("Database connected"))
  .catch((err) => console.error("Database connection error:", err));

// Unknown route handler
app.use((req: Request, res: Response) => res.sendStatus(404));

// Global error handler
interface CustomError {
  log?: string;
  status?: number;
  message?: { err: string };
}

app.use((err: CustomError, req: Request, res: Response, next: NextFunction) => {
  const defaultErr = {
    log: "Express global error handler caught unknown middleware error",
    status: 500,
    message: { err: "An error occurred" },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server listening on PORT:${PORT}`);
});
