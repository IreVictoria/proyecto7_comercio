//IMPORTAR 
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate(); // INICIALIZAR USENAGIGATE

  const handleComenzar = () => {
    navigate("/register"); // REDIRIGE A LA PAGINA DE REGISTRO
  };
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: "url(https://res.cloudinary.com/diqqipr3s/image/upload/v1729629521/Optica-y-analisis-de-la-vista_gmrtgp.jpg)",
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">Bienvenidos a nuestra Óptica Online</h1>
          <p className="mb-5">
            Disfruta de poder escoger tus marcos de lentes a tan solo un click desde la comodidad de tu hogar.
          </p>
          <button
            onClick={handleComenzar} // evento de click 
            className="bg-cyan-500 text-white px-6 py-3 rounded-lg font-semibold 
                   hover:bg-cyan-600 transition hover:scale-105 shadow-lg"
          >
            Comenzar
          </button>
        </div>
      </div>
    </div>

  );
}
export default Home; 