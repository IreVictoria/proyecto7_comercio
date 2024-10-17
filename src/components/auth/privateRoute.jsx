// IMPORTAR.
import React, {useContext, useEffect, useState} from "react";
import {Route, Redirect} from "react-router-dom"; 
import UserContext from "../../context/user/userContext";


function PrivateRoute ({ component: Component, ...props}) {

    const userCtx = useContext(UserContext)
    const { authStatus, verifyToken} = userCtx
    const [loading, setLoading] = useState(true)

    useEffect(()=> {
        const fetchToken = async () => {
            await verifyToken(); 
            setLoading(false);
        };
        fetchToken();
    }, [authStatus]); 

    if (loading) return null; 

    return (
        <Route 
            {...props}
            render={(props) => 
            authStatus ? (
                <Component {...props} /> // si esta autenticado, renderiza el componente.
            ) : (
                <Redirect to= "/" /> // Si no, redirige a la pagina de inicio.
            )
            }
        />
    ); 

}
export default PrivateRoute; 
