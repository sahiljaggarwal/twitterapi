import mongoose  from "mongoose"

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
      },
    otp: {
        code: {
          type: String,
          default: null,
        },
        expiresAt: {
          type: Date,
          default: null,
        },
      },
    isPrivate: {
        type: Boolean,
        default: false
    },
    joinedDate: {
        type: Date,
        default: Date.now,
      },
},{timestamps: true})

export default mongoose.model('User', userSchema);
