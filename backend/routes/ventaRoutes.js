//IMPORTAR LIBRERÍAS.
const express = require(`express`);
const auth = require(`../middleware/authorization`);
const {registrarVenta, obtenerVenta} = require(`../controllers/ventaController`);

const ventaRouter = express.Router();

ventaRouter.post(`/registrar-venta`, auth, registrarVenta);
ventaRouter.get(`/obtener-venta`, auth, obtenerVenta);

module.exports= ventaRouter; 