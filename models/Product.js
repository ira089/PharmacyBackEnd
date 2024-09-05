import {  Schema, model } from "mongoose";
import * as hooks from './hooks.js'


const productShema = new Schema({
    photo: {
        type: String,
        required: true, 
    },
    name: {
        type: String,
        required: true,
    },
    suppliers: {
        type: String,
        required: true,
    },
    stock: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    
})

productShema.post("save", hooks.handleSaveError);
productShema.pre("findOneAndUpdate", hooks.setUpdateSetting );
productShema.post('findOneAndUpdate', hooks.handleSaveError);


const Product = model("product", productShema);
export default Product;