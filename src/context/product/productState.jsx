//IMPORTAR.
import { useReducer } from "react";
import ProductContext from "./productContext";
import ProductReducer from "./productReducer";
import axiosClient from "../../config/axios";

const ProductState = (props) => {

    const initialState = {
        products: [],
        product: [{
            _id: "",
            name: "",
            price: "",
            description: "",
            imageUrl: "",
            stock: ""

        }]
    }

    const [globalState, dispatch] = useReducer(ProductReducer, initialState);
    const getProduct = async (id) => {
        const res = await axiosClient.get(`/api/products/getone/${id}`)
        const product = res.data.product;

        dispatch({
            type: "GET_PRODUCT",
            payload: product
        })
        return product;
    }

    const getProducts = async () => {
        const res = await axiosClient.get("/api/products/getall");

        dispatch({
            type: "GET_PRODUCTS",
            payload: res.data.products
        });
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