// IMPORTAR HOOKS. 
import React, { useState, useContext } from "react";
import UserContext from "../../context/user/userContext";
import Logo from "../../assets/logo.png"
import { Link } from "react-router-dom";

function Register() {
  const userCtx = useContext(UserContext) // ACCEDE AL CONTEXTO 


  const {
    registerUser
  } = userCtx;
  const [data, setData] = useState({
    name: "", // LAS " " ES UNA CADENA VACÍA, NO HAY CONTENIDO INICIAL EN ESOS CAMPOS. 
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    event.preventDefault()
    setData({
      ...data,
      [event.target.name]: event.target.value
    })
  };

  const sendData = (event) => {
    event.preventDefault()
    registerUser(data); //LLAMA A LA FUNCIÓN DEL CONTEXTO
  }

  //RENDER CONDICIONAL: DESPUES DE LLAMAR A LOS HOOKS.
  if (!userCtx) {
    return <div> Cargando... </div>
  }

  return (
    <>
      <div className="bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img className="mx-auto h-12 w-auto" src={Logo} alt="Glases" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Crea tu cuenta
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            ¿Ya tienes cuenta? &nbsp;
            <Link
              to="/login"
              className="font-medium text-cyan-500 hover:text-cyan-700"
            >
              Inicia sesión.
            </Link>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow-lg rounded-lg sm:px-10">
            <form onSubmit={sendData} className="space-y-6">
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nombre de usuario
                </label>
                <div className="mt-1">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Ingresa tu nombre de usuario"
                    required
                    onChange={handleChange}
                    className="appearance-none block w-full h-12 text-center px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Tu correo electrónico
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Ingresa tu correo"
                    autoComplete="email"
                    required
                    onChange={handleChange}
                    className="appearance-none block w-full h-12 text-center px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Contraseña
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Ingresa tu contraseña"
                    required
                    onChange={handleChange}
                    className="appearance-none block w-full h-12 text-center px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="confirm-password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirmar contraseña
                </label>
                <div className="mt-1">
                  <input
                    id="confirm-password"
                    name="confirm-password"
                    type="password"
                    placeholder="Confirma tu contraseña"
                    required
                    onChange={handleChange}
                    className="appearance-none block w-full h-12 text-center px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-500 hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition duration-300"
                >
                  Crear cuenta
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;



