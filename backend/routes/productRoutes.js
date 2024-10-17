// IMPORTAR LIBRERÍAS. 
const express = require(`express`);

//IMPORTAR EL RUTEADOR
const productRouter = express.Router();

//IMPORTAR CONTROLADOR
const {createProduct, getAllProduct, getProductById, updateProduct, deleteProduct } = require(`../controllers/productController`);

productRouter.post(`/create`, createProduct);
productRouter.get(`/getall`, getAllProduct);
productRouter.get(`/getone/:id`, getProductById);
productRouter.put(`/update/:id`, updateProduct);
productRouter.delete(`/delete/:id`, deleteProduct); 

module.exports = productRouter; 