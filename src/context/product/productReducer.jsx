const reducer = (globalState, action) => {

    switch (action.type) {

        case "GET_PRODUCTS":
            return {
                ...globalState,
                products: action.payload,
                product: [{
                    _id: "",
                    name: "",
                    price: "",
                    description: "",
                    imageUrl: "",
                    stock: "",
                }]
            }
        case "GET PRODUCT":
            return {
                ...globalState,
                product: [action.payload]
            }
        default:
            return globalState

    }
}

export default reducer; 

