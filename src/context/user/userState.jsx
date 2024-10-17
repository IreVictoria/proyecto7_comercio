//IMPORTAR.
import React, { useReducer } from "react";
import UserContext from "./userContext";
import UserReducer from "./userReducer"; 
import PropTypes from "prop-types";

import axiosClient from "../../config/axios";

const UserState = (props) => {
    const initialState = {
        user:{
            name: null,
            email:null,
        },
        authStatus: false, // confirma si el usuario esta autenticado o no. 
        loading:true
    }
    const [ globalState, dispatch ] = useReducer(UserReducer, initialState)
    const registerUser = async (dataForm) => {
        try{
            const res = await axiosClient.post(`/api/users/register`, dataForm)
            dispatch({
                type: "REGISTRO_EXITOSO",
                payload: res.data
            })
        }catch (error){
            console.log(error)
        }
    }

    const verifyToken = async () => {
        const token = localStorage.getItem(`token`)
        if(token){
            axiosClient.defaults.headers.common[`x-auth-token`] = token
        } else {
            delete axiosClient.defaults.headers.common[`x-auth-token`]
        }
        try{
            const respuesta = await axiosClient.get(`/api/users/verify-token`)
            dispatch({
                type: "OBTERNER_USUARIO",
                payload: respuesta.data.users
            })
        }catch (error){
            console.log(error)
        }
    }

    const loginUser = async (dataForm) => {
        console.log(`dataForm`, dataForm)
        try {
            const respuesta = await axiosClient.post(`/api/users/login`)
            console.log(respuesta)
            dispatch ({
                type: "LOGIN_EXITOSO",
                payload: respuesta.data
            })
        } catch (error) {
            console.log(error)
        }
    }
    
    const logout = () => {
        dispatch({
            type: "CERRAR_SESION"
        })
    }

    return (
        <UserContext.Provider value={{
            user: globalState.user,
            authStatus: globalState.authStatus,
            loading: globalState.loading,
            registerUser,
            verifyToken,
            loginUser,
            logout
        }}> 
            {props.children}

        </UserContext.Provider>
    )
}

UserState.propTypes = {
    children: PropTypes.node.isRequired,
}; 

export default UserState; 
