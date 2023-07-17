import express from "express"
import user_router from "./user-routes/user-routes"
const router  = express.Router();

// Routes
router.use('/user', user_router);

export default router;