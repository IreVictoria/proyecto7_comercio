//IMPORTAR LIBRERIAS Y CONTEXTO. 
import React, { useContext, useEffect, useState } from "react";
import CartContext from "../../context/cart/cartContext";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../config/axios";

//COMPONENTE PRINCIPAL DE CARRITO.
function Cart() {
    const { cart, total, getCart, addToCart, removeFromCart, clearCart } = useContext(CartContext);
    const [success, setSuccess] = useState(false); // CONTROLA EL ESTADO DE PAGO.
    const navigate = useNavigate(); // NAVEGACIÓN DESPUES DEL PAGO. 

    // CARGAR EL CARRITO AL MONTAR EL COMPONENTE.
    useEffect(() => {
        getCart(); // LLAMA AL BACKEND PARA OBTENER EL CARRITO
    }, [getCart]);

    //FUNCIÓN PARA ELMINAR UN PRODUCTO DEL CARRITO.
    const handleRemove = (itemId) => {
        removeFromCart(itemId); // ELIMINA UN PRODUCTO.
    };

    //FUNCIÓN PARA AGREGAR MAS CANTIDAD DE UN PRODUCTO.
    const handleAdd = (productId) => {
        addToCart(productId, 1); // INCREMENTA LA CANTIDAD DEL PRODUCTO.
    };
    //CREAR LA ORDEN PARA PAYPAL.
    const createOrder = async (data, actions) => {
        return actions.order.create({
            purshase_units: [
                {
                    amount: {
                        value: total, // TOTAL DEL CARRITO EN USD.
                    },
                },
            ],
        });
    };
    //CAPTURAR LA ORDEN APROBADA.
    const onApprove = async (data, actions) => {
        const order = await actions.order.capture();
        try {
            //ENVIAR LA ORDEN AL BACKEND PARA PROCESARLA.
            await axiosClient.post("/api/payments/execute-payment", {
                orderID: order.id,
            });
            setSuccess(true); // MARCAR EL PAGO COMO EXITOSO.
            clearCart(); // VACIAR CARRITO DESPUES DEL PAGO.
            navigate("/profile"); // REDIRIGIR AL PERFIL DEL USUARIO.
        } catch (error) {
            console.error("Error al ejecutar el pago", error);
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

                    <div className="mt-6 flex justify-between">
                        <button
                            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md transition"
                            onClick={clearCart}
                        >
                            Vaciar Carrito
                        </button>

                        <PayPalScriptProvider
                            options={{
                                "client-id": `${import.meta.env.VITE_PAYPAL_CLIENT_ID}`,
                                currency: "USD",
                            }}
                        >
                            <PayPalButtons
                                style={{ layout: "horizontal" }}
                                createOrder={(data, actions) => {
                                    return actions.order.create({
                                        purchase_units: [
                                            {
                                                amount: { value: total },
                                            },
                                        ],
                                    });
                                }}
                                onApprove={(data, actions) => {
                                    return actions.order.capture().then((details) => {
                                        alert(`Pago realizado por ${details.payer.name.given_name}`);
                                    });
                                }}
                                onError={(error) => console.error("Error en el pago:", error)}
                            />
                        </PayPalScriptProvider>
                    </div>

                    {success && (
                        <p className="mt-4 text-green-600">
                            ¡Pago realizado con éxito!
                        </p>
                    )}
                </div>
            </div>
        </div>

    );
}

export default Cart; 