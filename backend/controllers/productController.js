// IMPORTAR MODELO DE PRODUCTOS.
const Product = require (`../models/productModel.js`);
// IMPLEMENTAR PETICIONES CRUD.
//A. FUNCIÓN PARA CREAR UN PRODUCTO
exports.createProduct = async (req, res) => {
    try {
        const { name, price, description, image, stock } = req.body;
        const nuevoProducto = await Product.create({ name, price, description, image, stock });
        res.json(nuevoProducto);
        console.log(nuevoProducto);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: `Error creando un producto` });
    }
};

//B. FUNCIÓN PARA OBTENER TODOS LOS PRODUCTOS.
exports.getAllProduct = async (req, res) => {
    try {
        const products = await Product.find({});
        res.json({ products });
        console.log(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: `Error obteniendo los productos`, error });
    }
};

//C. FUNCIÓN PARA OBTENER UN PRODUCTO POR ID.
exports.getProductById = async (req, res) => {
    try{
        const producto = await Product.findById(req.params.id);
        res.json({ producto });

    }catch (error){
        console.error(error);
        res.status(500).json({ message: `Error obteniendo al producto`});
    }
};

//D. FUNCIÓN PARA ACTUALIZAR UN PRODUCTO.
exports.updateProduct = async (req, res) => {
    try {
        const { name, price, decription, image, stock } = req.body;
        const productoActualizado = await Product.findByIdAndUpdate(req.params.id, { name, price, decription, image, stock }, { new: true });
        res.json(productoActualizado);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: `Error actualizando un producto` });
    }
};

//E. FUNCION PARA ELIMINAR UN PRODUCTO. 
exports.deleteProduct = async (req, res) => {
    try {
        const productoEliminado = await Product.findByIdAndDelete(req.params.id);
        res.json(productoEliminado);

    } catch (error) {
        console.error(error)
        res.status(500).json({ message: `Error eliminando un producto` });


    }
}; 
