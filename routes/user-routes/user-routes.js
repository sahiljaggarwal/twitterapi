import express from "express"
import { userController } from "../../controllers";
const user_router  = express.Router();


// SignUp With OTP
user_router.post("/signup", userController.signupWithOTP)

// Verify Account With OTP
user_router.post("/verify-account", userController.verifyAccount)


export default router;