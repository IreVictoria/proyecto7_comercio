// IMPORTAR HOOKS.
import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../context/user/userContext";
import axiosClient from "../../config/axios";
import { useNavigate } from "react-router-dom";

function Profile() {
  const userCtx = useContext(UserContext);

  const { authStatus, verifyToken, user } = userCtx;
  const navigate = useNavigate(); 

  const [products, setProducts] = useState([]);

  useEffect(() => {
    verifyToken();
    if (!authStatus) {
      navigate("/profile"); // Redirige al login si no está autenticado.
    } else {
      fetchUserProducts(); // Cargar los productos si está autenticado.
    }
  }, [authStatus, verifyToken, navigate]);

  const fetchUserProducts = async () => {
    try {
      const response = await axiosClient.get(`/api/products/getall`);
      setProducts(response.data); 
    }catch (error){
      console.error("Error al obtener los producto;", error)
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12">
      <div className="bg-white p-10 rounded-2xl shadow-xl max-w-lg w-full">
        <h2 className="text-3xl font-bold text-cyan-600 text-center mb-8">
          Perfil de Usuario
        </h2>

        {/* Información del Usuario */}
        <div className="flex items-center mb-8">
          <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-400 transition duration-300">
            <span className="text-3xl text-gray-600">+</span> {/* Ícono de agregar foto */}
          </div>
          <div className="ml-6">
            <p className="text-xl font-semibold text-gray-800">{user?.name}</p>
            <p className="text-sm text-gray-500">{user?.email}</p>
          </div>
        </div>

        {/* Lista de Productos Comprados */}
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Productos Comprados
        </h3>
        {products.length === 0 ? (
          <p className="text-gray-500 text-center mb-6">No has comprado productos aún.</p>
        ) : (
          <ul className="space-y-4">
            {products.map((product) => (
              <li
                key={product.id}
                className="p-4 bg-gray-50 rounded-md shadow-md flex justify-between items-center"
              >
                <span className="text-lg text-gray-700">{product.name}</span>
                <span className="text-md text-gray-500">${product.price}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Botón de Cerrar Sesión */}
        <div className="mt-8">
          <button
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-3 px-4 rounded-md font-medium transition duration-300"
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
