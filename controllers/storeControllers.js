import ctrlWrapper from "../decorators/ctrlWrapper.js";
import * as storeServices from "../services/storeServices.js";

const store = async (req, res) => {
  const pharmacies = await storeServices.getAllpharmacies();
  res.status(200).json(pharmacies);
};

const storeSix = async (req, res) => {
  const skip = Math.floor(Math.random() * 14);
  console.log(skip);
  const limit = 6;
  const pharmaciesSix = await storeServices.randomSixPharmacies({
    skip,
    limit,
  });
  console.log(pharmaciesSix);
  res.status(200).json(pharmaciesSix);
};

export default {
  store: ctrlWrapper(store),
  storeSix: ctrlWrapper(storeSix),
};
