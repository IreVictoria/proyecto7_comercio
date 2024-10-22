// IMPORTAR LIBRERÍAS.
import React, { useContext, useEffect, useState } from "react";
import ProductContext from "../../context/product/productContext";
import ProductItem from "./productItem";

function ProductList() {
    const { products, getProducts } = useContext(ProductContext);
    const [ loading, setLoading ] = useState(true) // ESTADO PARA MANEJAR LA CARGA.

    //OBTENER PRODUCTOS AL MONTAR EL COMPONENTE.
    useEffect(() => {
        const fetchProducts = async () => {
            await getProducts(); // ASEGURAR QUE SE COMPLETE LA CARGA.
            setLoading(false); //DESACTIVAR ESTADO DE CARGA.
        };
        fetchProducts();
    }, [getProducts]);

    //MOSTRAR MENSAJE MIENTRAS SE CARGAN LOS PRODUCTOS. 
    if(loading) {
        return <p className="text-center mt-10"> Cargando productos... </p>
    }

    if (products.length === 0) {
        return <p className="text-center mt-10" > No hay productos disponibles </p>
    }

    return (
        <div className="min-h-screen bg-gray-100 py-12">
            <div className="max-w-7xl mx-auto grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {products.map((product) => (
                    <ProductItem key={product._id} product={product} />
                ))}
            </div>
        </div>
    );
}
export default ProductList; 