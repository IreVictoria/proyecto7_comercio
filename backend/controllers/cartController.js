// IMPORTAR MODELO DE CART Y PRODUCT.
const Cart = require(`../models/cartModel`);
const Product= require(`../models/productModel`);

// A. AGREGAR PRODUCTOS AL CARRITO.
exports.addCart = async (req, res) => {
    const {productId, quantity} = req.body;
    try{
        const product = await Product.findById(productId);
        if(!product) {
            return res.status(404).json({ message: `Producto no encontrado`});   
        }
        if (product.stock < quantity) {
            return res.status(400).json({ message: "Stock insuficiente"});
        }
        
        let cart = await Cart.findOne({ user: req.user.id});
        if(cart){
            //el carrito ya existe, verificar si el producto ya esta en el carrito.
            const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
            if (itemIndex > -1) {
                // Producto ya existe en el carrito, actulizar la cantidad.
                cart.items[itemIndex].quantity += quantity;      
            } else {
                //producto no existe en el carrito, agregar nuevo.
                cart.items.push({ product: productId, quantity});
            }
            cart.total += product.price * quantity;
        }else {
            // no hay carrito, crear uno nuevo.
            cart = new Cart ({
                user: req.user.id,
                items: [{product: productId, quantity}],
                total: product.price * quantity
            });
        }
        await cart.save();
        res.status(201).json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: `Error en el servidor`});
    }
 
};

//B. FUNCIÓN PARA ELMINAR UN PRODUCTO DEL CARRO.
exports.removeFromCart = async (req, res) => {
    const {itemId} = req.body;
    try{
        const cart = await Cart.findOne({user: req.user.id}).populate("items.product"); //buscar el carrito del usuario.
        if(!cart) {
            return res.status(404).json({ message: `Carrito no encontrado`});
        }
        const itemIndex = cart.items.findIndex(item => item._id.toString() === itemId );
        if (itemIndex > -1) {
            const item = cart.items[itemIndex];
            cart.total -= item.product.price * item.quantity; //actualizar el total de los productos en el carrito.
            cart.items.splice(itemIndex, 1); //eliminar el producto del carrito. 
            await cart.save(); // guardar el carrito actualizado con sus productos 
            res.status(200).json(cart);// devolver el carrito actualizado. 
        }else {
            res.status(404).json({ message: `Producto no encontrado en el carrito`});
        }
    }catch (error) {
        console.error(error);
        res.status(500).json({ message: `Error en el servidor`});
    }
};

//C. FUNCIÓN PARA RETORNAR LOS DETALLES DEL CARRITO DE UN USUARIO (LISTA DE PRODUCTOS, CANTIDADES, Y TOTAL DEL CARRITO).
exports.getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user.id}).populate(`items.product`);
        if (!cart) {
            return res.status(404).json({ message: `Carrito no encontrado`});
        }
        res.status(200).json(cart); // devolver el producto con sus productos y detalles. 
    }catch (error) {
        console.error(error);
        res.status(500).json({ message: `Error en el servidor`});
    }
}; 

//C. FUNCIÓN PARA LIMPIAR EL CARRITO DE COMPRAS.
exports.clearCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user.id });
        if(!cart) {
            return res.status(404).json({ message: "Carrito no encontrado" });
        }
        cart.items = []; // LIMPIAR LOS PRODUCTOS DEL CARRITO.
        cart.total = 0; //REINICIAR EL TOTAL A 0.
        await cart.save(); //GUARDAR LOS CAMBIOS EN LA BASE DE DATOS.
        res.status(200).json({ message: "Carrito limpiado con éxito" });
    }catch (error) {
        console.error(error);
        res.status(500).json({ message: " Error al limpiar el carrito" }); 
    }
}; 

//populate es una función de mongoose que se utiliza para reemplazar IDs referenciados en un documento con los detalles completos del objeto relacionado.
//mongoose busca el documento completo del producto correspodiente a ese id en la colección de productos.
//en lugar de solo devolver los IDs de los productos, devuelve todos los campos del producto como el nombre, precio etc. 