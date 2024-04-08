import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "./middlewares/cors";
import router from "./routes";

dotenv.config();

const app = express();

// middleware
app.use(cors);

app.use(bodyParser.json());

app.use("/api", router);

app.all("*", (_req, res) => {
  res.status(404).json({
    error: "NOT FOUND",
    message: "The requested resource was not found",
  });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Assignment Service is running on port ${PORT}`);
});
