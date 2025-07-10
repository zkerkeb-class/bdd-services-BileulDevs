const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const router = require("./routes/index");
const logger = require("./config/logger.js");
require("dotenv").config();

const app = express();

const init = async () => {
    try {
        // Connexion à MongoDB
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected successfully.");
        logger.log("info", "MongoDB connected successfully.");

        app.use(express.json());
        app.use(cors({
            origin: "*",
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
            allowedHeaders: ['Content-Type', 'Authorization']
        }));

        app.use("/api", router);

        app.listen(process.env.port, () => {
            console.log(`Listening on port: ${process.env.port}`);
            logger.log("info", "Micro Service BDD Started");
        });

    } catch (error) {
        console.error("MongoDB connection error:", error);
        logger.log("error", `MongoDB connection error: ${error.message}`);
        process.exit(1);
    }
}

init();