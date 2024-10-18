//IMPORTAR.
import React, { useReducer } from "react";
import UserContext from "./userContext"; // HOOK QUE GESTIONA EL ESTADO DEL COMPONENTE MEDIANTE UN REDUCER.
import UserReducer from "./userReducer"; // FUNCION QUE SE ENCARGA DE CAMBIAR EL ESTADO BASADO EN ACCIONES ESPECIFICAS
import PropTypes from "prop-types"; // IMPORTA PROPTYPES PARA VALIDAR LOS PROPS

import axiosClient from "../../config/axios"; // IMPORTA UNA INSTANCIA CONFIGURADA DE AXIOS PARA HACER PETICIONES HTTP AL BACKEND.

const UserState = (props) => { 
    const initialState = {
        user:{
            name: null, // ESTADO INICIAL NULO 
            email:null,
        },
        authStatus: false, // BOLEANO que confirma si el usuario esta autenticado o no. 
        loading:true // ESTADO PARA SABER SI LA APLICACIÓN ESTA CARGANDO.
    }
    const [ globalState, dispatch ] = useReducer(UserReducer, initialState) // UserReducer FUNCIÓN QUE MANEJARA COMO CAMBIA EL ESTADO. 
    const registerUser = async (dataForm) => {
        try{
            const res = await axiosClient.post(`/api/users/register`, dataForm) // REALIZA UNA PETICION POST PARA REGISTRAR AL USUARIO.
            dispatch({
                type: "REGISTRO_EXITOSO", // ACCION ENVIADA AL REDUCER PARA CAMBIAR EL ESTADO.
                payload: res.data 
            })
        }catch (error){
            console.log(error)
        }
    }

    const verifyToken = async () => {
        const token = localStorage.getItem(`token`) // OBTIENE EL TOKEN ALMACENADO EN EL LOCALSTORAGE
        if(token){
            axiosClient.defaults.headers.common[`x-auth-token`] = token // ESTABLECE EL TOKEN EN LOS ENCABEZADOS DE AXIOS
        } else {
            delete axiosClient.defaults.headers.common[`x-auth-token`] // ELIMINA EL TOKEN DE LOS ENCABEZADOS SI NO EXISTE
        }
        try{
            const respuesta = await axiosClient.get(`/api/users/verify-token`) // VERIFICA SI EL TOKEN ES VALIDO
            dispatch({
                type: "OBTERNER_USUARIO", // ACCION PARA ACTUALIZAR EL ESTADO CON LOS DATOS DEL USUARIO 
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
