// IMPORTAR LIBRERÍAS A UTILIZAR. 
const express= require(`express`); 
const cors = require(`cors`); 
const dotenv =require(`dotenv`);
const connectDB =require(`./config/db`);
const authRouter = require("./routes/useRoutes");
const productRouter = require("./routes/productRoutes");
const orderRouter = require(`./routes/orderRoutes`);
const cartRouter = require("./routes/cartRoutes");
const paymentRouter = require("./routes/paypalRoutes");

//CARGAMOS VARIABLE DE ENTORNO.
dotenv.config(); 

//CREAR INSTANCIA DE EXPRESS.
const app = express(); 

//MIDDLEWARE PARA PARSEAR JSON Y HABILITAR CORS.
app.use(express.json());
//app.use(cors()); 
app.use(cors({
    origin: "http://localhost:5173",   
    methods: "GET,POST,PUT,DELETE",     
    credentials: true, 
}));

//IMPORTAR FUNCIÓN PARA LA CONEXIÓN DE BAS DE DATOS. 
connectDB(); 

//IMPORTAR GESTIÓN DE RUTAS. 
app.use(`/api/users`, authRouter); 
app.use(`/api/products`, productRouter);
app.use(`/api/order`, orderRouter); 
app.use(`/api/cart`, cartRouter); 
app.use(`/api/payment`, paymentRouter);

//DEFINIR PUERTO DESDE LA VARIABLE DE ENTORNO.
const PORT = process.env.PORT || 5000;

//INICIAR SERVIDOR. 
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
}); 