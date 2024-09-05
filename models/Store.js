import { Schema, model } from "mongoose";
import * as hooks from "./hooks.js";

const storeShema = new Schema(
  {
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
  },
  { versionKey: false, timestamps: true }
);

storeShema.post("save", hooks.handleSaveError);
storeShema.pre("findOneAndUpdate", hooks.setUpdateSetting);
storeShema.post("findOneAndUpdate", hooks.handleSaveError);

const Pharmacie = model("pharmacie", storeShema);
export default Pharmacie;
