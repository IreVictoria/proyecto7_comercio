// IMPORTAR.
import React, { useContext, useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import UserContext from "../../context/user/userContext";
import PropTypes from "prop-types";

function AuthRoute({ component: Component, ...props }) {

    const userCtx = useContext(UserContext)
    const { authStatus, verifyToken } = userCtx

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchToken = async () => {
            await verifyToken()
            setLoading(false)
        }; 
        fetchToken(); 

    }, [authStatus, verifyToken])

    return (
        <Route {...props} render={props => {
            if (loading) return null
            return authStatus ?
                (<Redirect to="/" />)
                :
                (<Component {...props} />)

        }

        } />

    ); 

}

AuthRoute.propTypes = {
    component: PropTypes.elementType.isRequired,
};

export default AuthRoute; 




