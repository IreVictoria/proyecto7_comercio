//IMPORTAR LIBRERÍAS.
import { Link } from "react-router-dom";
import PropTypes  from "prop-types";// importar prop-types para la validación de los props
import { useContext } from "react";
import CartContext from "../../context/cart/cartContext"; // IMPORTAR CONTEXTO
import { PayPalButtons } from "@paypal/react-paypal-js"; // IMPORTAR BOTON DE PAYPAL 

function ProductItem ({ product }){
    const { _id, name, price, description, imageUrl } = product;
    const { addToCart } = useContext(CartContext); // OBTENER FUNCIÓN DEL CARRITO.

    const handleClick = () => {
        addToCart(product, 1); //AGREGAR EL PRODUCTO CON CANTIDAD 1.
    }

    return (
        <div className="w-full max-w-sm bg-white rounded-lg shadow-md p-4 transition-transform transform hover:scale-105">
            <Link to={`/product/${_id}`}>
                <img
                    src={imageUrl}
                    alt={name}
                    className="w-full h-48 object-cover rounded-md"
                />
                <div className="mt-4">
                    <h3 className="text-lg font-semibold text-cyan-600">{name}</h3>
                    <p className="text-gray-500 mt-2">{description}</p>
                    <p className="text-xl font-bold text-black mt-4">${price}</p>
                </div>
            </Link>
            
            {/* Botón de añadir al carrito */}
            <button
                onClick={handleClick}
                className="bg-cyan-500 text-white px-4 py-2 mt-4 rounded-md hover:bg-cyan-600 transition"
            >
                Añadir al Carrito
            </button>

            {/* Botón de PayPal */}
            <div className="mt-4">
                <PayPalButtons
                    style={{ layout: "horizontal" }}
                    createOrder={(data, actions) => {
                        return actions.order.create({
                            purchase_units: [
                                {
                                    amount: {
                                        value: price, // Precio del producto
                                    },
                                },
                            ],
                        });
                    }}
                    onApprove={(data, actions) => {
                        return actions.order.capture().then((details) => {
                            alert(`Pago realizado por ${details.payer.name.given_name}`);
                        });
                    }}
                />
            </div>
        </div>
    );
}
//DEFINIR LAS PROPTYPES PARA VALIDAR LAS PROPS QUE RECIBE EL COMPONENTE
ProductItem.propTypes = {
    product: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        description: PropTypes.string,
        imageUrl: PropTypes.string,
    }).isRequired,
}; 
export default ProductItem; 