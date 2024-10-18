import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components/home/inicio'; 
import Header from './components/layout/header';
import Profile from './components/profile/profile';
import Register from './components/register/register';
import Login from './components/login/login';
import './App.css'

function App() {
  return (
    <>
    <Router>
      <Header />

      {/* RUTAS PRIVADAS */}
      <Route path='/perfil' element={<Profile /> }/>

      {/*RUTAS AUTENTICACIÓN*/}
      <Route path='registro' element={<Register />}/>
      <Route path='iniciar-sesion' element={<Login />}/>

      {/* RUTAS PUBLICAS*/}
      <Route path='/' element={Home}/>
    </Router>

    </>
  );
}
export default App