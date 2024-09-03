import ctrlWrapper from "../decorators/ctrlWrapper.js";
import * as storeServices from "../services/storeServices.js";

const store = async (req, res) => {
  const pharmacies = await storeServices.getAllpharmacies();
  res.status(200).json(pharmacies);
};

export default {
  store: ctrlWrapper(store),
};
