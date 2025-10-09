import "dotenv/config";
import express, { Request, Response } from "express";
import { pool } from "./db"; // Import the pool from db/index.ts

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Ensure the pool is connected before starting the server
pool
  .connect()
  .then(() => console.log("Database connected"))
  .catch((err) => console.error("Database connection error:", err));

//Routes
app.use('/api/funds', fundsRoutes);

// Unknown route handler
app.use((req, res) => res.sendStatus(404));

// Global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});


// Start Server
app.listen(PORT, () => {
  console.log(`Server listening on PORT:${PORT}`);
});
