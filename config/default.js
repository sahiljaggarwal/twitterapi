import dotenv from "dotenv"
dotenv.config()

const config = {
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || 6000,
    MONGODB_URL: 'mongodb+srv://haruki:haruki1717@cluster0.bd5satz.mongodb.net/',
    secretKey: 'mysecretkey',
  };
export default config;