import {  Schema, model } from "mongoose";
import * as hooks from './hooks.js'


const productShema = new Schema({
    name: {
        type: String,
        required: true, 
    },
    address: {
        type: String,
    },
    phone: {
        type: String,
    },
    city: {
        type: String,
    },
    rating: {
        type: Number,
    },
    
})

storeShema.post("save", hooks.handleSaveError);
storeShema.pre("findOneAndUpdate", hooks.setUpdateSetting );
storeShema.post('findOneAndUpdate', hooks.handleSaveError);


const Product = model("product", productShema);
export default Product;