import './App.css';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './components/Home';
import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import {ToastContainer} from "react-toastify"
import ProductDetail from './components/Product/ProductDetail';
import SearchProduct from './components/Product/searchProduct';
function App() {
  return (
    <Router>
       <div>
       <HelmetProvider>
        <ToastContainer theme='dark' />
          <Header/>
                <Routes>
                  <Route path='/' element={<Home />}/> 
                  <Route path='/search/:keyword' element={<SearchProduct/>}/>
                  <Route path='/product/:id' element={<ProductDetail/>}/>
                </Routes>
          <Footer/>
         </HelmetProvider>
      </div>
    </Router>
  );
}

export default App;
