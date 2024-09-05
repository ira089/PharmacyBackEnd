import ctrlWrapper from "../decorators/ctrlWrapper.js";
import * as productsServices from "../services/productsServices.js"

const productsAll = async (req, res) => {
  const products = await productsServices.getAllproducts();
  res.status(200).json(products);
};

export default {
    productsAll: ctrlWrapper(productsAll),
   
  };