import mongoose from "mongoose";
import * as bcrypt from "bcrypt";


const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
      },
      password: {
        type: String,
        required: true,
        minlength: 8, // You can adjust the minimum length as needed
      }
});

// Hash the password before saving it to the database
UserSchema.pre('save', async function (next) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(this.password, salt);
      this.password = hashedPassword;
      next();
    } catch (error) {
      next(error);
    }
  });
  
  // Method to compare passwords during login
  UserSchema.methods.comparePassword = async function (candidatePassword) {
    try {
      return await bcrypt.compare(candidatePassword, this.password);
    } catch (error) {
      throw error;
    }
  };
  
  // Static method to find a user by email
  UserSchema.statics.findByUsername = async function (username) {
    try {
      return await this.findOne({ username });
    } catch (error) {
      console.error(err);
      return null;
    }
  };
  

const User = mongoose.model('User', UserSchema);
export default User;