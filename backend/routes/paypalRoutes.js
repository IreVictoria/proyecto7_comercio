// IMPORTAR LIBRERÍAS. 
const express = require(`express`); 
const auth = require(`../middleware/authorization`); 
const { createPayment,executePayment } = require(`../controllers/paypalController`); 

const paymentRouter = express.Router(); 

paymentRouter.post(`/create-payment`, auth, createPayment);
paymentRouter.post(`/execute-payment`, auth, executePayment); 

module.exports = paymentRouter; 