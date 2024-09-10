import { Schema, model } from "mongoose";
import * as hooks from './hooks.js';
import * as userConstants from "../constants/userConstants.js";

const orderItemSchema = new Schema({
    product: {
      type: Schema.Types.ObjectId, 
      ref: 'product', 
      required: true,
    },
    quantity: {
        type: String,
        default: '0',
        match: userConstants.quantityRegepxp,
    }
  });

const orderShema = new Schema(
    {
      name: {
        type: String,
        required: [true, "Name is required"],
      },
      email: {
        type: String,
        match: userConstants.emailRegepxp,
        required: [true, "Email is required"],
      },
      phone: {
        type: String,
        required: [true, "Phone is required"],
      },
      address: {
        type: String,
        required: [true, "Address is required"],
      },
      paymentMethod: {
        type: String,
        default: 'cash',
      },
      price: {
        type: String,
        default: '0.00',
        match: userConstants.priceRegepxp,
      },
      products: {
        type: String,
        default: '0',
        match: userConstants.quantityRegepxp,
      },
      status: {
        type: String,
        default: "Pending",
      },
      owner: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    order_date: {
        type: Date,
        default: Date.now,
      },
    
    cart: [orderItemSchema]
},
    { versionKey: false, timestamps: true }
  );

orderShema.post("save", hooks.handleSaveError);
orderShema.pre("findOneAndUpdate", hooks.setUpdateSetting );
orderShema.post('findOneAndUpdate', hooks.handleSaveError);


const Order = model("order", orderShema);
export default Order;