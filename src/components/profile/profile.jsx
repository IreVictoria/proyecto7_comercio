// IMPORTAR HOOKS.
import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../context/user/userContext";
import axiosClient from "../../config/axios";
import { useNavigate } from "react-router-dom";

function Profile() {
  const userCtx = useContext(UserContext);
  const { authStatus, verifytoken, user } = userCtx;
  const navigate = useNavigate(); 

  const [products, setProducts] = useState([]);

  useEffect(() => {
    verifytoken();
    if (!authStatus) {
      navigate("/login"); // Redirige al login si no está autenticado.
    } else {
      fetchUserProducts(); // Cargar los productos si está autenticado.
    }
  }, [authStatus, verifytoken, navigate]);

  const fetchUserProducts = async () => {
    try {
      const response = await axiosClient.get(`/api/products/getall`);
      setProducts(response.data); 
    }catch (error){
      console.error("Error al obtener los producto;", error)
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-2xl font-bold text-cyan-600 text-center mb-6">
          Perfil de Usuario
        </h2>

        {/* Información del Usuario */}
        <div className="flex items-center mb-6">
          <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center cursor-pointer">
            <span className="text-2xl text-gray-500">+</span> {/* Ícono de agregar foto */}
          </div>
          <div className="ml-4">
            <p className="text-lg font-medium text-gray-700">{user?.name}</p>
            <p className="text-sm text-gray-500">{user?.email}</p>
          </div>
        </div>

        {/* Lista de Productos Comprados */}
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Productos Comprados
        </h3>
        <ul className="space-y-3">
          {products.map((product) => (
            <li
              key={product.id}
              className="p-4 bg-gray-50 rounded-md shadow-sm flex justify-between items-center"
            >
              <span className="text-gray-700">{product.name}</span>
              <span className="text-gray-500">${product.price}</span>
            </li>
          ))}
        </ul>

        {/* Botón de Cerrar Sesión */}
        <div className="mt-6">
          <button
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-2 px-4 rounded-md transition duration-300"
            onClick={() => navigate("/login")}
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  );
}


export default Profile;
