// IMPORTAR LIBRERÍAS. 
const mongoose = require(`mongoose`);
const ventaSchema = new mongoose.Schema(
    {
        usuario: {
            type: mongoose.Schema.Types.ObjectId,
            ref: `User`,
            required: true
        },
        monto: {
            type: Number,
            required: true
        },
        paymend_id: {
            type: String,
            required: true
        },
        merchant_order_id: {  // sirve para almacenar un identificador único asociado con la orden de compra que se crea en el sistema de un comerciante o en la pasarela de pago. 
            type: String,
            required: true
        },

    },
    {
        timestamps:true
    }
);
    
const Venta = mongoose.model(`Venta`, ventaSchema);
module.exports= Venta; 