import Pharmacie from "../models/Store.js";

export const getAllpharmacies = () => Pharmacie.find();

export const randomSixPharmacies = (setting) => {
  return Pharmacie.find({}, null, setting);
};
