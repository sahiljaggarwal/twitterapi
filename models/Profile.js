import mongoose from "mongoose"

const profileSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    bannerImage: {
      type: String,
      validate: {
        validator: function (value) {
          // Check file extension
          const allowedExtensions = ['.jpg', '.jpeg', '.png'];
          const ext = value.substr(value.lastIndexOf('.')).toLowerCase();
          if (!allowedExtensions.includes(ext)) {
            return false;
          }
  
          // Check file size (in bytes)
          const maxSizeInBytes = 5 * 1024 * 1024; // 5MB
          const fileSize = fs.statSync(path.join(__dirname, '..', value)).size;
          if (fileSize > maxSizeInBytes) {
            return false;
          }
  
          return true;
        },
        message: 'Invalid profile image format or size',
      },
    },
    profileImage: {
      type: String,
      validate: {
        validator: function (value) {
          // Check file extension
          const allowedExtensions = ['.jpg', '.jpeg', '.png'];
          const ext = value.substr(value.lastIndexOf('.')).toLowerCase();
          if (!allowedExtensions.includes(ext)) {
            return false;
          }
  
          // Check file size (in bytes)
          const maxSizeInBytes = 5 * 1024 * 1024; // 5MB
          const fileSize = fs.statSync(path.join(__dirname, '..', value)).size;
          if (fileSize > maxSizeInBytes) {
            return false;
          }
  
          return true;
        },
        message: 'Invalid profile image format or size',
      },
    },
    followers: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],
    following: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],
    bio: {
      type: String,
      maxlength: 160
    },
    location: {
      type: String,
      maxlength: 30
    },
    website: {
      type: String,
      validate: {
        validator: function (value) {
          // Regular expression to validate URL format
          const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
          return urlRegex.test(value);
        },
        message: 'Invalid website URL'
      }
    },
    birthdate: {
      type: Date,
      validate: {
        validator: function (value) {
          // Get the current date
          const currentDate = new Date();
  
          // Set the minimum and maximum birthdate values
          const minDate = new Date('1900-01-01');
          const maxDate = currentDate;
  
          // Perform the validation
          return value >= minDate && value <= maxDate;
        },
        message: 'Invalid birthdate',
      },
    },
    category: {
      type: String,
      enum:['gamer', 'politician', 'coder', 'doctor', 'singer', 'teacher', 'actor', 'creator', 'student',]
    },
    username: {
      type: String,
      required: true,
      unique: true
    },
    joinedDate: {
        type: Date,
        default: function () {
            return this.model('User').findOne({ _id: this.userId }).select('joinedDate').exec();
          },
      },
  },{timestamps:true});

  export default mongoose.model('Profile', profileSchema);