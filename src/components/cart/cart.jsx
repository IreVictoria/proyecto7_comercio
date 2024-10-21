//IMPORTAR LIBRERIAS Y CONTEXTO. 
import React, { useContext, useEffect} from "react";
import CartContext from "../../context/cart/cartContext";

//COMPONENTE PRINCIPAL DE CARRITO.
function Cart () {
    const { cart, total, getCart, addToCart, removeFromCart, clearCart } = useContext(CartContext);

    // CARGAR EL CARRITO AL MONTAR EL COMPONENTE.
    useEffect (() => {
        getCart(); // LLAMA AL BACKEND PARA OBTENER EL CARRITO
    },[getCart]); 

    //FUNCIÓN PARA ELMINAR UN PRODUCTO DEL CARRITO.
    const handleRemove = (itemId) => {
        removeFromCart(itemId); // ELIMINA UN PRODUCTO.
    };

    //FUNCIÓN PARA AGREGAR MAS CANTIDAD DE UN PRODUCTO.
    const handleAdd = (productId) => {
        addToCart(productId, 1); // INCREMENTA LA CANTIDAD DEL PRODUCTO.
    }; 

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full">
                <h2 className="text-2xl font-bold text-cyan-600 text-center mb-6">
                    Carrito de Compras
                </h2>

                {cart.length === 0 ? (
                    <p className="text-center text-gray-500">Tu carrito está vacío.</p>
                ) : (
                    <ul className="space-y-3">
                        {cart.map((item) => (
                            <li
                                key={item.product._id}
                                className="p-4 bg-gray-50 rounded-md shadow-sm flex justify-between items-center"
                            >
                                <div className="flex items-center space-x-4">
                                    <img
                                        src={item.product.imageUrl}
                                        alt={item.product.name}
                                        className="w-16 h-16 object-cover rounded"
                                    />
                                    <div>
                                        <p className="text-gray-700 font-medium">
                                            {item.product.name}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            ${item.product.price} x {item.quantity}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={() => handleAdd(item.product._id)}
                                        className="bg-cyan-500 hover:bg-cyan-600 text-white px-2 py-1 rounded-md transition"
                                    >
                                        + 
                                    </button>
                                    <button
                                        onClick={() => handleRemove(item._id)}
                                        className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-md transition"
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}

                <div className="mt-6 text-center">
                    <p className="text-lg font-medium text-gray-700">Total: ${total}</p>

                    <div className="mt-6 flex justify-between">
                        <button
                            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md transition"
                            onClick={clearCart}  // Limpia el carrito.
                        >
                            Vaciar Carrito
                        </button>
                        <button
                            className="bg-cyan-500 hover:bg-cyan-600 text-white py-2 px-4 rounded-md transition"
                            onClick={() => alert("Compra realizada con éxito")}  // Simula la compra.
                        >
                            Finalizar Compra
                        </button>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Cart; 