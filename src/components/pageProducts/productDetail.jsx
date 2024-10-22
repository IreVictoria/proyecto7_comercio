// IMPORTAR LIBRERÍAS.
import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductContext from "../../context/product/productContext";

function ProductDetail() {
    const { product, getProduct } = useContext(ProductContext);
    const { id } = useParams(); //CAPTURARA EL ID DE LA URL.

    useEffect(() => {
        getProduct(id);
    }, [id, getProduct]);

    if (!product || !product[0]) {
        return <p className="text-center mt-10"> Cargando producto</p>
    }

    const { name, description, price, imageUrl } = product[0];

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg">
                <img
                    src={imageUrl}
                    alt={name}
                    className="w-full h-64 object-cover rounded-md"
                />
                <div className="mt-6">
                    <h2 className="text-2xl font-semibold text-cyan-600">{name}</h2>
                    <p className="text-gray-500 mt-4">{description}</p>
                    <p className="text-xl font-bold text-black mt-6">${price}</p>
                </div>
            </div>
        </div>
    ); 
}
export default ProductDetail; 