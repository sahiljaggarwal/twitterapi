import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import User from '../models/User';

class AuthService {
  // Generate OTP
  generateOTP() {
    const otpLength = 6;
    const otp = Math.random().toString().slice(2, 2 + otpLength);
    return otp;
  }

  // Send OTP via Email
  async sendOTP(email, otp) {
    // Create a transporter for sending emails
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'sahiljaggarwal6@gmail.com', // Your email address
            pass: 'psemifmkbjgapcnf', // Your email password
          },
          tls: {
            rejectUnauthorized: false,
          },
    });

    // Define the email content
    const mailOptions = {
      from: 'sahiljaggarwal6l@example.com',
      to: email,
      subject: 'OTP Verification',
      text: `Your OTP for account verification is: ${otp}`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
  }

  // Signup with OTP Verification
  async signupWithOTP(name, email, password) {
    try {
      // Check if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return { error: 'User already exists' };
      }

      // Generate and store the OTP
      const otp = this.generateOTP();
      const user = new User({
        name,
        email,
        password,
        otp: { code: otp, expiresAt: Date.now() + 600000 }, // OTP expires in 10 minutes
      });
      await user.save();

      // Send OTP to the user's email
      await this.sendOTP(email, otp);

      return { message: 'Account created. Please verify your email' };
    } catch (error) {
      console.log(error);
      return { error: 'Internal Server Error' };
    }
  }

  // Verify Account 
  async verifyAccount(email, otp) {
    try {
      const user = await User.findOne({ email });

      if (!user || !user.otp || user.otp.code !== otp || user.otp.expiresAt < Date.now()) {
        throw new Error('Invalid OTP');
      }

      user.isVerified = true;
      user.otp = null;
      await user.save();

      return 'Account verified successfully';
    } catch (error) {
      console.log(error);
      throw new Error('Internal Server Error');
    }
  }
}

export default new AuthService();
