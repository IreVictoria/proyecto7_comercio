import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home/inicio';
import Profile from './components/profile/profile';
import Register from './components/register/register';
import Login from './components/login/login';
import UserState from './context/user/userState';
import Cart from './components/cart/cart';
import ProductState from './context/product/productState';
import CartState from './context/cart/cartState';
import ProductList from './components/pageProducts/productList';
import ProductDetail from './components/pageProducts/productDetail';
import Navbar from './components/layout/navBar';
import Footer from './components/layout/footer';
import './App.css'

function App() {
  return (
    <UserState>
      <ProductState>
        <CartState>

          <Router>
            <Navbar />
            <Routes>
              {/* RUTAS PRIVADAS */}
              <Route path='/profile' element={< Profile />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='/productlist' element={< ProductList />} />
              <Route path='/product/:id' element={< ProductDetail />} />

              {/*RUTAS AUTENTICACIÓN*/}
              <Route path='/register' element={<Register />} />
              <Route path='/login' element={<Login />} />

              {/* RUTAS PUBLICAS*/}
              <Route path='/' element={< Home />} />
            </Routes>
            <Footer/>

          </Router>
        </CartState>
      </ProductState>
    </UserState>

  );
}
export default App






