import { Schema, model, models } from "mongoose";
const userSchema = new Schema(
  {
    name: {
      type: String,
    },
    image: {
      type: String,
    },
    email: {
      type: String,
      unique: [true, "Email already exists!"],
      required: [true, "Email is required!"],
    },
    password: {
      type: String,
      required: [true, "Password is required!"],
    },
    phone: {
      type: String,
    },
    streetAddress: {
      type: String,
    },
    city: {
      type: String,
    },
    country: {
      type: String,
    },
    postalCode: {
      type: String,
    },
    admin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = models.User || model("User", userSchema);

export default User;
