//IMPORTAR LIBRERIAS.
import {Link, NavLink} from "react-router-dom";
import { FaShoppingCart  } from "react-icons/fa"; //icono del carrito.
import { useContext } from "react";
import CartContext from "../../context/cart/cartContext";

function Navbar (){
  const { cart } = useContext(CartContext); // OBTENER LOS PRODUCTOS DEL CARRITO.

  return (
    <nav className="bg-gray-800 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center space-x-4">
                        <Link to="/" className="text-cyan-400 text-2xl font-bold">
                            MiTienda 👓
                        </Link>
                        <div className="hidden md:flex space-x-4">
                            <NavLink
                                to="/productlist"
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-cyan-500 underline"
                                        : "text-gray-300 hover:text-cyan-400 transition"
                                }
                            >
                                Productos
                            </NavLink>
                            <NavLink
                                to="/profile"
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-cyan-500 underline"
                                        : "text-gray-300 hover:text-cyan-400 transition"
                                }
                            >
                                Perfil
                            </NavLink>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <NavLink
                            to="/cart"
                            className="relative text-gray-300 hover:text-cyan-400 transition"
                        >
                            <FaShoppingCart className="text-2xl" />
                            {cart.length > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-sm w-5 h-5 rounded-full flex items-center justify-center">
                                    {cart.length}
                                </span>
                            )}
                        </NavLink>

                        <div className="hidden md:flex space-x-4">
                            <NavLink
                                to="/login"
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-cyan-500 underline"
                                        : "text-gray-300 hover:text-cyan-400 transition"
                                }
                            >
                                Iniciar Sesión
                            </NavLink>
                            <NavLink
                                to="/register"
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-cyan-500 underline"
                                        : "text-gray-300 hover:text-cyan-400 transition"
                                }
                            >
                                Registrarse
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    
  );
}
export default Navbar; 