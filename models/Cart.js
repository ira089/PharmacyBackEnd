import { Schema, model } from "mongoose";
import * as hooks from './hooks.js';
import * as userConstants from "../constants/userConstants.js";

const cartItemSchema = new Schema({
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

const cartShema = new Schema(
    { cart_user: [cartItemSchema],
      
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
      
      owner: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    
   
},
    { versionKey: false, timestamps: true }
  );

cartShema.post("save", hooks.handleSaveError);
cartShema.pre("findOneAndUpdate", hooks.setUpdateSetting );
cartShema.post('findOneAndUpdate', hooks.handleSaveError);


const Cart = model("cart", cartShema);
export default Cart;