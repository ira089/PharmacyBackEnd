import ctrlWrapper from "../decorators/ctrlWrapper.js";
import * as productsServices from "../services/productsServices.js";

const productsAll = async (req, res) => {
  const { page = 1, limit = 12, keyword = "", category = "" } = req.query;
  const skip = (page - 1) * limit;
  const queryObject = {};
  if (keyword) {
    queryObject.name = { $regex: keyword, $options: "i" };
  }

  if (category) {
    queryObject.category = category;
  }
  const total = await productsServices.countProducts(queryObject);
  const result = await productsServices.getAllproducts(queryObject, {
    skip,
    limit,
  });
  res.status(200).json({
    result,
    total,
    page,
  });
};

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await productsServices.getProductById(id);
  if (!result) {
    throw HttpError(404, `Product with id=${id} not found`);
  }

  res.json(result);
};

export default {
  productsAll: ctrlWrapper(productsAll),
  getById: ctrlWrapper(getById),
};
