import { hashPassword, verifyPassword } from "@/common/helper";
import mongoose, { Document } from "mongoose";

interface IUser extends Document {
  firstName: string;
  lastName: string;
  productCount: number;
  hasEverAddedProduct: boolean;
  email: string;
  password: string;
  confirmPassword?: string;
  passwordResetToken: string;
  passwordResetExpires: Date;
}

const userSchema = new mongoose.Schema<IUser>({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    select: false,
    required: true,
  },
  confirmPassword: {
    type: String,
    required: [true, "Enter your confirm password"],
    validate: {
      validator: function (this: IUser, value: string): boolean {
        return value === this.password;
      },
      message: "Password and confirm password should be same!",
    },
  },
  productCount: {
    type: Number,
    default: 0,
  },
  hasEverAddedProduct: {
    type: Boolean,
    default: false,
  },
  passwordResetToken: String,
  passwordResetExpires: Date,
});

// Convert user's original password to hash
userSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  // Hash the password
  this.password = await hashPassword(this.password);

  // Remove confirmPassword field before saving to the database
  this.confirmPassword = undefined;
  next();
});

// Generate token on forget password
// userSchema.methods.createPasswordResetToken = function () {
//   const resetToken = crypto.randomBytes(32).toString('hex')

//   this.passwordResetToken = crypto
//     .createHash('sha256')
//     .update(resetToken)
//     .digest('hex')

//   this.passwordResetExpires = Date.now() + 10 * 60 * 60 * 1000

//   return resetToken
// }

const generateOtp = () => {
//   const types = {
//     alphanumeric: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ",
//     numeric: "0123456789",
//     alpha: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
//   };

//   const otpType = config.otp.type;
//   const otpLength = config.otp.length;

//   const str = types[otpType];

//   let OTP = "";

//   for (let i = 0; i < otpLength; i++) {
//     OTP += str[Math.floor(Math.random() * otpLength)];
//   }
  return '111111';
};

userSchema.methods.createPasswordResetToken = function () {
  const otp = generateOtp();

  this.passwordResetToken = otp;
  this.passwordResetExpires = Date.now() + 10 * 60 * 60 * 1000;

  return otp;
};

// Match entered password and database password are equal or not on user login
userSchema.methods.checkPassword = verifyPassword;
userSchema.index({ email: 1 }, { unique: true });

export default mongoose.model<IUser>("User", userSchema);
