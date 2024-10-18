// IMPORTAR HOOKS. 
import React, { useState, useContext } from "react";
import UserContext from "../../context/user/userContext";

function Register() {
  const userCtx = useContext(UserContext)
  const {
    registerUser
  } = userCtx
  const [data, setData] = useState({
    name: "", // LAS " " ES UNA CADENA VACÍA, NO HAY CONTENIDO INICIAL EN ESOS CAMPOS. 
    email: "",
    password: "",
  })

  const handleChange = (event) => {
    event.preventDefault()
    setData({
      ...data,
      [event.target.name]: event.target.value
    })
  }
  const sendData = (event) => {
    event.preventDefault()
    registerUser(data)
  }
  return (
    <>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-center text-cyan-600 mb-6">
          Crear cuenta
        </h2>
        <form onSubmit={sendData} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Nombre de usuario
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
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
              required
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-cyan-500 text-white py-2 px-4 rounded-md hover:bg-cyan-600 transition duration-300"
            >
              Registrarme
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
  );
}

export default Register; 



