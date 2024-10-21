//IMPORTAR MODELO DE VENTA.
const Order = require("../models/orderModel");
const User= require(`../models/userModel`); 

//A. FUNCIÓN PARA REGISTRAR VENTA.
exports.registerOrder = async (req, res) => {
    const { usuario, monto, payment_id, merchant_order_id}= req.body;

    if (!usuario || !monto || !payment_id || !merchant_order_id) {
        return res.status(400).json({ message: "Usuario y monto son requeridos"});
    }
    try{
        const newOrder = new Order({
            usuario,
            monto,
            payment_id,
            merchant_order_id
        });
        await newOrder.save(); //ALMACENAR NUEVA VENTA EN LA BD.
        res.status(201).json(newOrder);
    }catch (error) {
        console.error(error);
        res.status(500).json({ message: `Error al registrar la venta`});
    }
}; 

//B. FUNCIÓN PARA OBTENER UNA VENTA.
exports.getOrder =async (req, res) => {

    try{
        //BUSCAR ORDEN POR ID DEL USUARIO 
        const orders = await Order.find({ usuario: req.user.id });
        //VERIFICAR SI EL USUARIO TIENE ORDENES 
        if(!orders.length) {
            return res.status(404).json ({ message: `No se encontraron ordenes`});
        }

        res.json({ orders });
    }catch (error) {
        console.error(error);
        res.status(500).json({ message: `Error al obtener las ventas`}); 
    }
}; 