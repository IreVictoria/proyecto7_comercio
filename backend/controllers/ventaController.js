//IMPORTAR MODELO DE VENTA.
const Venta = require(`../models/ventaModel`); 
const User= require(`../models/userModel`); 

//A. FUNCIÓN PARA REGISTRAR VENTA.
exports.registrarVenta = async (req, res) => {
    const { usuario, monto, payment_id, merchant_order_id}= req.body;
    try{
        const nuevaVenta = new Venta({
            usuario,
            monto,
            payment_id,
            merchant_order_id
        });
        await nuevaVenta.save(); //ALMACENAR NUEVA VENTA EN LA BD.
        res.status(201).json(nuevaVenta);
    }catch (error) {
        console.error(error);
        res.status(500).json({ message: `Error al registrar la venta`});
    }
}; 

//B. FUNCIÓN PARA OBTENER UNA VENTA.
exports.obtenerVenta =async (req, res) => {
    //OBTENER EMAIL DEL QUERY.
    const {email} =req.query; 
    try{
        //BUSCAR USUARIO POR EMAIL
        const user = await User.findOne({email});
        //VERIFICAR SI EL USUARIO EXISTE.
        if(!user){
            return res.status(404).json({message: `Usuario no encontrado`});
        }
        //BUSCAR VENTAS ASOCIADAS AL USUARIO.
        const ventas = await Venta.find({ usuario: user._id});
        res.json({ventas});
    }catch (error) {
        console.error(error);
        res.status(500).json({ message: `Error al obtener las ventas`}); 
    }
}; 