import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";
import authRoute from "./routes/authRoute.js";
import mealRoute from "./routes/mealRoute.js";

dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/server/api/auth",authRoute);
app.use("/server/api/meal",mealRoute);

app.get("/", async(req, res) => {
    res.send("Food Order Backend");
});

app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`)
});