//IMPORTAR LIBRERÍAS.
import { Link } from "react-router-dom";
import PropTypes  from "prop-types";// importar prop-types para la validación de los props

function ProductItem ({ product }){
    const { _id, name, price, description, imageUrl } = product;

    return (
        <Link to={`/product/${_id}`} className="w-full max-w-sm">
            <div className="bg-white rounded-lg shadow-md p-4 transition-transform transform hover:scale-105">
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
            </div>
        </Link>

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