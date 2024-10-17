// IMPORTAR.
import React, {useContext, useEffect, useState} from "react";
import { Route, Redirect } from "react-router-dom";
import UserContext from "../../context/user/userContext";

function AuthRoute ({ component: Component, ...props }) {

    const userCtx = useContext(UserContext)
    const { authStatus, verifyToken } = userCtx

    const [loading, setLoading]

}