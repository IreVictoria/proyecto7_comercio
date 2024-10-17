//IMPORTAR LIBRERÍAS. 
const express = require(`express`);
const auth =require(`../middleware/authorization`);
const { getCart, addCart, removeFromCart }= require(`../controllers/cartController`);

const cartRouter= express.Router(); 

//DEFINIR RUTAS.
cartRouter.post(`/add-cart`, auth, addCart); 
cartRouter.get(`/get-cart`, auth, getCart);
cartRouter.delete(`/remove-cart`, auth, removeFromCart); 

module.exports= cartRouter; 