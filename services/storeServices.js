import Pharmacie from "../models/Store.js";
export const getAllpharmacies = ()=> Pharmacie.find();
// export const randomSixPharmacies = ( {setting} )=> Pharmacie.find( _, _, setting);
export const randomSixPharmacies = (setting) => {
    return Pharmacie.find({}, null, setting);
};
// export  const totalPharmacies =  Pharmacie.countDocuments();
