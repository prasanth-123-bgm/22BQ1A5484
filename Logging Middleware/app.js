// app.js
import express from 'express';
import { Log } from './logMiddleware.js';

const app = express();
app.use(express.json());

// Middleware logs every request
app.use(async (req, res, next) => {
  await Log("backend", "info", "request", `${req.method} ${req.url}`);
  next();
});

app.get("/", async (req, res) => {
  await Log("backend", "info", "root", "Accessed homepage");
  res.send("Hello from Logging App");
});

app.get("/error", async (req, res) => {
  try {
    throw new Error("Intentional error for logging test");
  } catch (err) {
    await Log("backend", "error", "handler", err.message);
    res.status(500).send("Error occurred");
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
