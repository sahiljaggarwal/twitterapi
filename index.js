import express from "express"
import dotenv from "dotenv"
import morgan from "morgan"
import connectDB from "./db/connect.js"
import config from "./config/default.js"

// Load environment variables from .env file
dotenv.config()

// ExpressJs App
const app = express();

// Middlewares
app.use(morgan("combined"))
app.use(express.json())

// Routes

// Controllers

// Database Connections
connectDB()

// Start Server
const{ host, port} =  config
app.listen(port, () =>{
    console.log(`server is running on http://${host}:${port}`)
    
})