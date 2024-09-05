import ctrlWrapper from "../decorators/ctrlWrapper.js";
import * as productsServices from "../services/productsServices.js"

const productsAll = async (req, res) => {
    const {page =1, limit = 12, keyword = '' , category = ''} = req.query;
    const skip = (page - 1) * limit;
    const queryObject = {};
    if (keyword) {
        queryObject.name = { $regex: keyword, $options: 'i' }; // 'i' делает поиск регистронезависимым
      }
  
      // Если задана категория, добавляем её в условия поиска
      if (category) {
        queryObject.category = category;
      }
      const total = await productsServices.countProducts(queryObject);
  const result = await productsServices.getAllproducts(queryObject, {skip, limit});
  res.status(200).json({
    result,
    total,
    page
  });
};

export default {
    productsAll: ctrlWrapper(productsAll),
   
  };