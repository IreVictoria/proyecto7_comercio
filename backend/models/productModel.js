// ESQUEMA MODELO DE PRODUCTOS.
//IMPORTAR LIBRERÍAS.
const mongoose= require(`mongoose`);
const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        description: {
            type: String,
            required: false,
        },
        imageUrl: {
            type: String,
            required: false,
        },
        stock: {
            type: Number,
            required: true,
        }
    },
    {
        timestamps:true
      
    }
); 

const Product = mongoose.model(`Product`, productSchema);
module.exports = Product; 