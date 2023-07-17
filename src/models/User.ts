import { Schema, model } from "mongoose";
import bcryptjs from "bcryptjs";
import { IUser } from "../interfaces/IUser";
import { IUserModel } from "interfaces/IUserMethod";

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required!"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required!"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [/\S+@\S+\.\S+/, "Email is invalid!"],
    },
    password: {
      type: String,
      required: [true, "Password is required!"],
    },
    createdAt: {
      type: Date,
      default: new Date(),
    },
    type: {
      type: String,
      enum: ["user", "admin"],
      default: "user"
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
);

UserSchema.static("encryptPassword", async (password: string) => {
  const salt = await bcryptjs.genSalt(12);
  return await bcryptjs.hash(password, salt);
});

UserSchema.static(
  "comparePassword",
  async (password: string, receivedPassword: string) => {
    return await bcryptjs.compare(password, receivedPassword);
  }
);
export const User = model<IUser, IUserModel>("User", UserSchema);
