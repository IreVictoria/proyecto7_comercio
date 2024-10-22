//IMPORTAR.
import { useReducer } from "react";
import ProductContext from "./productContext";
import ProductReducer from "./productReducer";
import axiosClient from "../../config/axios";

const ProductState = (props) => {

    const initialState = {
        products:[], // ARRAY VACÍO. 
        product: [{
            _id: "",
            name: "",
            price: "",
            description: "",
            imageUrl: "",

        }]
    }

    const [globalState, dispatch] = useReducer(ProductReducer, initialState);
    const getProduct = async (id) => {
        const res = await axiosClient.get(`http://localhost:3000/api/products/getone/${id}`)
        const product = res.data.product;

        dispatch({
            type: "GET_PRODUCT",
            payload: res.data.product,
        })
        return product;
    }

    const getProducts = async () => {
        try{ 
            const res = await axiosClient.get("/api/products/getall");
            console.log("Productos recibidos:", res.data.products); // verificar respuesta

            if(res.data && res.data.products) {
                dispatch({
                    type: "GET_PRODUCTS",
                    payload: res.data.products || [], //ASEGURAR QUE SEA UN ARRAY
                });

            }else {
                console.error("Error: No se recibieron productos");
            }
            
         } catch (error) {
             console.error("Error obteniendo productos:", error)
         }

    }; 

       

    return (
        <ProductContext.Provider
            value={{
                products: globalState.products,
                product: globalState.product,
                getProduct,
                getProducts,
            }}
        >
            {props.children}

        </ProductContext.Provider>
    )
}

export default ProductState; 