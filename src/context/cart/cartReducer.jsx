const CartReducer = (globalState, action) => {

    switch (action.type) {
        case "GET_CART":
            { const { items = [], total=0 } = action.payload || {};
            return {
                ...globalState,
                cart: items, // ACTUALIZA LOS PRODUCTOS DEL CARRITO.
                total: total // ACTUALIZA EL TOTAL ACUMULADO
            }; }
        case "ADD_TO_CART":
            return {
                ...globalState,
                cart: action.payload.items || [], // PRODUCTOS ACTUALIZADOS TRAS AGREGAR
                total: action.payload.total || 0 // TOTAL ACTUALIZADO TRAS AGREGAR
            };
        case "REMOVE_FROM_CART":
            return {
                ...globalState,
                cart: action.payload.items || [], // ASEGURA QUE SIEMPRE HAYA UN ARRAY,  PRODUCTOS RESTANTES TRAS ELIMINAR UN PRODUCTO
                total: action.payload.total || 0 // TOTAL ACTUALIZADO TRAS ELIMINAR UN PRODUCTO 
            };
        case "CLEAR_CART":
            return {
                ...globalState,
                cart: [], // VACIAR CARRITO
                total: 0 // REINICIA EL TOTAL A 0
            };
        default:
            return globalState;
    }
};

export default CartReducer; 