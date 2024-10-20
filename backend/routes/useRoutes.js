//IMPORTAR LIBRERÍAS.
const express = require(`express`); 
//IMPORTAR RUTEADOR.
const authRouter = express.Router(); 
//IMPORTAR MIDDLEWARE.
const auth = require(`../middleware/authorization`);
//IMPORTAR FUNCIONES DEL CONTROLADOR. 
const { registerUser, loginUser, verifyToken, getUserById, updateUser  } = require(`../controllers/userController`);

authRouter.post(`/register`, registerUser);
authRouter.post(`/login`, loginUser);
authRouter.get(`/verify-token`, auth, verifyToken);
authRouter.get(`/:id`, getUserById); 
authRouter.get(`/update/:id`, updateUser); 

module.exports = authRouter; 


