// IMPORTAR HOOKS.
import React, { useState, useEffect, useContext } from "react";
import UserContext from "../../context/user/userContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const userCtx = useContext(UserContext)
  const navigate = useNavigate(); 

  const {
    loginUser,
    authStatus,
    verifytoken,
  } = userCtx

  const [data, setData] = useState({
    email: "",
    password: ""
  })

  useEffect(() => {
    verifytoken()
    if (authStatus) {
     navigate("/perfil")
    }
  }, [authStatus, verifytoken, navigate]);

  if (authStatus) return null

  const handleChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value
    })
  }
  const sendData = (event) => {
    event.preventDefault()
    loginUser(data)
  }

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-2xl font-bold text-cyan-600 text-center mb-6">
            Iniciar sesión
          </h2>
          <form onSubmit={sendData} className="space-y-4">
            <div>
              <label
                htmlFor="email-address"
                className="block text-sm font-medium text-gray-700"
              >
                Tu correo
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="Tu correo"
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                placeholder="Password"
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-2 px-4 rounded-md transition duration-300"
              >
                Comenzar
              </button>
            </div>
          </form>
        </div>
      </div>

    </>

  );
}


export default Login; 