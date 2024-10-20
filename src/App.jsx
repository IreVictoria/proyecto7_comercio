import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home/inicio';
import Profile from './components/profile/profile';
import Register from './components/register/register';
import Login from './components/login/login';
import './App.css'
import UserState from './context/user/userState';

function App() {
  return (
    <UserState>
      <Router>
        <Routes>
          {/* RUTAS PRIVADAS */}
          <Route path='/profile' element={< Profile />} />
          {/*RUTAS AUTENTICACIÓN*/}
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />

          {/* RUTAS PUBLICAS*/}
          <Route path='/' element={< Home />} />
        </Routes>

      </Router>
    </UserState>

  );
}
export default App






