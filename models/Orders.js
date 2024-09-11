import { Schema, model } from "mongoose";
import * as hooks from './hooks.js';
import * as userConstants from "../constants/userConstants.js";

const orderShema = new Schema(
    {
      name: {
        type: String,
        default: '',
      },
      email: {
        type: String,
        match: userConstants.emailRegepxp,
        default: '',
      },
      phone: {
        type: String,
        default: '',
      },
      address: {
        type: String,
        default: '',
      },
      paymentMethod: {
        type: String,
        enum: userConstants.paymentMethodList,
      },
      total: {
        type: String,
        match: userConstants.priceRegepxp,
        required: true,
      },
      totalQuantity: {
        type: String,
        match: userConstants.quantityRegepxp,
        required: true,
      },
      status: {
        type: String,
        enum: userConstants.orderStatusList,
        required: true,
      },
      owner: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
},
    { versionKey: false, timestamps: true }
  );

orderShema.post("save", hooks.handleSaveError);
orderShema.pre("findOneAndUpdate", hooks.setUpdateSetting );
orderShema.post('findOneAndUpdate', hooks.handleSaveError);


const Order = model("order", orderShema);
export default Order;