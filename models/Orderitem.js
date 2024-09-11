import { Schema, model } from "mongoose";
import * as hooks from "./hooks.js";
import * as userConstants from "../constants/userConstants.js";

const orderItemSchema = new Schema(
  {
    idProduct: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    quantity: {
      type: String,
      match: userConstants.quantityRegepxp,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "order",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

orderItemSchema.post("save", hooks.handleSaveError);
orderItemSchema.pre("findOneAndUpdate", hooks.setUpdateSetting);
orderItemSchema.post("findOneAndUpdate", hooks.handleSaveError);

const Orderitem = model("orderitem", orderItemSchema);
export default Orderitem;
