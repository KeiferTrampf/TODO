import express from "express";
import cors from "cors";
import morgan from "morgan";
import { router } from "./router.js";

export const app = express();

// Configure CORS to allow requests from any origin (adjust as needed)
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(morgan("dev"));
app.use(express.json()); // no longer need body-parser; not needed after Express v4.16
app.use(express.urlencoded({ extended: true }));

// Welcome message
app.get("/", (req, res) => {
  res.send("To-do API");
});

// Use the router for API routes
app.use("/api", router);
