//IMPORTAR.
import { useReducer } from "react";
import CartContext from "./cartContext";
import CartReducer from "./cartReducer";
import axiosClient from "../../config/axios";
import axios from "axios";

const CartState = (props) => {
    const initialState = {
        cart: [],
        total: 0
    };

    const [globalState, dispatch] = useReducer(CartReducer, initialState);

    const getCart = async () => {
        const res = await axiosClient.get("/api/cart/get-cart");

        dispatch({
            type: "GET_CART",
            payload: res.data.cart
        });
    };
    const addToCart = async (productId, quantity) => {
        const res = await axiosClient.post("/api/cart/add-cart", {productId, quantity});

        dispatch({
            type: "ADD_TO_CART",
            payload: res.data.cart
        });
    };
    const removeFromCart = async (itemId) => {
        const res = await axiosClient.delete("/api/cart/remove-cart", { data: { itemId } });

        dispatch({
            type: "REMOVE_FROM_CART",
            payload: res.data
        });
    };
    const clearCart = async () => {

        const res = await axiosClient.delete("/api/cart/clear-cart");

        dispatch({
            type: "CLEAR_CART",
            payload: res.data.cart // RESPUESTA DEL BACKEND CON LA INFORMACIÓN DEL CARRITO. 
        });

    };

    return (
        <CartContext.Provider
            value={{
                cart: globalState.cart,
                total: globalState.total,
                getCart,
                addToCart,
                removeFromCart,
                clearCart

            }}
        >
            {props.children}
        </CartContext.Provider>
    );
};

export default CartState; 