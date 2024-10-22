// IMPORTAR LIBRERÍAS.
import React, { useContext, useEffect, useState } from "react";
import CartContext from "../../context/cart/cartContext"
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../config/axios";

function Cart() {
    const { cart, total, getCart, addToCart, removeFromCart, clearCart } = useContext(CartContext);
    const [success, setSuccess] = useState(false); // Controla el estado del pago.
    const navigate = useNavigate(); // Navegación después del pago.

    // Cargar el carrito al montar el componente.
    useEffect(() => {
        getCart();
    }, [getCart]);

    // Manejar la eliminación de productos del carrito.
    const handleRemove = (itemId) => {
        removeFromCart(itemId);
    };

    // Manejar el incremento de cantidad de productos.
    const handleAdd = (productId) => {
        addToCart(productId, 1);
    };

    // Crear la orden para PayPal.
    const createOrder = async (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: total, // Total del carrito en USD.
                    },
                },
            ],
        });
    };

    // Capturar la orden aprobada.
    const onApprove = async (data, actions) => {
        const order = await actions.order.capture();
        try {
            // Enviar la orden al backend para procesarla.
            await axiosClient.post("/api/payments/execute-payment", {
                orderID: order.id,
            });

            setSuccess(true); // Marcar el pago como exitoso.
            clearCart(); // Vaciar el carrito después del pago.
            navigate("/profile"); // Redirigir al perfil del usuario.
        } catch (error) {
            console.error("Error al ejecutar el pago:", error);
        }
    };

    const onError = (error) => {
        console.error("Error en el pago:", error);
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
                    <p className="text-lg font-medium text-gray-700">
                        Total: ${total}
                    </p>

                    <div className="flex justify-between items-stretch space-x-4 mt-4">
                        <button
                            className="bg-cyan-500 hover:bg-cyan-600 text-white rounded-md transition w-1/2 h-[50px] flex items-center justify-center"
                            onClick={clearCart}
                        >
                            Vaciar Carrito
                        </button>
                        <div className="w-1/2 h-[50px]">
                            <PayPalScriptProvider
                                options={{
                                    "client-id": "ASEK19uOHae68FMmWq2ZgzSvY73yPo4Kq120Alb0o2u80h1CHSfzRLuu9SzFyVpVXTndGQNjDrNF-zp_",
                                    currency: "USD",
                                }}
                            >
                                <div className="w-full max-w-xs flex-grow">
                                    <PayPalButtons
                                        style={{ layout: "horizontal", shape: "rect", height: 50, }}
                                        createOrder={createOrder}
                                        onApprove={onApprove}
                                        onError={onError}
                                    />
                                </div>
                            </PayPalScriptProvider>
                        </div>
                    </div>

                    {success && (
                        <p className="mt-4 text-green-600">
                            ¡Pago realizado con éxito!
                        </p>
                    )}
                </div>
            </div>
        </div >
    );
}

export default Cart;
