import { Schema, model } from "mongoose";
import * as hooks from "./hooks.js";
import * as userConstants from "../constants/userConstants.js";

const userShema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    phone: {
      type: String,
      match: userConstants.phoneRegepxp,
      required: [true, "Phone is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      match: userConstants.emailRegepxp,
      required: [true, "Email is required"],
      unique: true,
    },

    token: {
      type: String,
      default: null,
    },
    orders: {
      type: [{ type: Schema.Types.ObjectId, ref: "order" }],
      default: [],
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

userShema.post("save", hooks.handleSaveError);
userShema.pre("findOneAndUpdate", hooks.setUpdateSetting);
userShema.post("findOneAndUpdate", hooks.handleSaveError);

const User = model("user", userShema);
export default User;
