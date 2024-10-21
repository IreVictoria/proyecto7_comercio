//IMPORTAR LIBRERÍAS.
const express = require(`express`);
const auth = require(`../middleware/authorization`);
const {registerOrder, getOrder} = require(`../controllers/orderController`);

const orderRouter = express.Router();

orderRouter.post(`/register-order`, auth, registerOrder);
orderRouter.get(`/get-order`, auth, getOrder);

module.exports= orderRouter; 