import { hashPassword, verifyPassword } from "@/common/helper";
import mongoose, { Document } from "mongoose";

interface IUser extends Document {
  first_name: string;
  last_name: string;
  product_count: number;
  has_ever_added_product: boolean;
  email: string;
  password: string;
  confirm_password?: string;
  password_reset_token: string;
  password_reset_expires: Date;
  created_at: Date;
  updated_at: Date;
  delete_at: Date;

  checkPassword: (
    candidatePassword: string,
    userPassword: string
  ) => Promise<boolean>;
}

const userSchema = new mongoose.Schema<IUser>({
  first_name: {
    type: String,
  },
  last_name: {
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
  confirm_password: {
    type: String,
    required: [true, "Enter your confirm password"],
    validate: {
      validator: function (this: IUser, value: string): boolean {
        return value === this.password;
      },
      message: "Password and confirm password should be same!",
    },
  },
  product_count: {
    type: Number,
    default: 0,
  },
  has_ever_added_product: {
    type: Boolean,
    default: false,
  },
  password_reset_token: {
    type: String,
  },
  password_reset_expires: {
    type: Date,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  updated_at: {
    type: Date,
    default: Date.now(),
  },
  delete_at: {
    type: Date,
  },
});

// Convert user's original password to hash
userSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  // Hash the password
  this.password = await hashPassword(this.password);

  // Remove confirm_password field before saving to the database
  this.confirm_password = undefined;
  next();
});

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
  return "111111";
};

userSchema.methods.createpassword_reset_token = function () {
  const otp = generateOtp();

  this.password_reset_token = otp;
  this.password_reset_expires = Date.now() + 10 * 60 * 60 * 1000;

  return otp;
};

// Match entered password and database password are equal or not on user login
userSchema.methods.checkPassword = verifyPassword;
userSchema.index({ email: 1 }, { unique: true });

export const User = mongoose.model<IUser>("User", userSchema);
