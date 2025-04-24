import './App.css';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './components/Home';
import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import {ToastContainer} from "react-toastify";
import ProductDetail from './components/Product/ProductDetail';
import Searchproduct from './components/Product/searchProduct';
import Login from './components/layout/login';
import Signup from './components/layout/signUp';
import Changepassword from "./components/layout/changepassword"
import ForgetPassword from './components/layout/forgetpassword';
import Cart from './components/layout/cartitems';
import Shipping from './components/layout/shipping';
import ConfirmOrder from './components/layout/confirmorder';
import PlaceOrder from './components/layout/pleaceorder';
import Modelreview from './components/layout/reviewModel';
import { ThemeProvider } from '@material-tailwind/react';
import Model from './components/layout/reviewModel';
import MyOrder from './components/layout/myOrder';
function App() {
  return (
    <Router>
       <div>
       <HelmetProvider>
        <ThemeProvider>
        <ToastContainer theme='dark' position='bottom-center' />
          <Header/>
                <Routes>
                  <Route path='/' element={<Home />}/> 
                  <Route path='/Search/:keyword' element={<Searchproduct/>}/>
                  <Route path='/product/:id' element={<ProductDetail/>}/>
                  <Route path='/Login' element={<Login/>}/>
                  <Route path='/Sign-Up'element={<Signup/>}/>
                  <Route path='/ChangePassword' element={<Changepassword/>}/>
                  <Route path='/ForgetPassword' element={<ForgetPassword/>}></Route>
                  <Route path='/AddToCart' element={<Cart/>}></Route>
                  <Route path='/Shipping' element={<Shipping/>}></Route>
                  <Route path='Order/Confirm' element={<ConfirmOrder/>}></Route>
                  <Route path='Placed-Order' element={<PlaceOrder/>}></Route>
                  <Route path='Submit-Review' element={<Model/>}></Route>
                  <Route path='My-Order' element={<MyOrder/>}></Route>
                </Routes>
          <Footer/>
          </ThemeProvider>
         </HelmetProvider>
      </div>
    </Router>
  );
}

export default App;
