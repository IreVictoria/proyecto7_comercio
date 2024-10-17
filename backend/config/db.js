// Crear conexión a la base de datos.
// Importar Librerias a utilizar.
const mongoose = require(`mongoose`); 
const dotenv = require(`dotenv`); 

dotenv.config(); 

//Función para realizar la conexión a mongo dB.
const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI, {});
        console.log(`Conexión a mongodB Exitosa`); 
    }catch(error) {
        console.error(error);
        process.exit(1); // Detiene por completo la app.
    }
}; 
module.exports = connectDB; 