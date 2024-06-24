import { useEffect, useState } from 'react';
import './App.css';
import Header from "./components/layout/Header/Header.js"
import { BrowserRouter as Router,Route, Routes,  } from 'react-router-dom';
import webFont from "webfontloader"
import Footer from './components/layout/Footer/Footer.js';
import Home from './components/Home/Home.js';
import { Toaster } from "react-hot-toast";
import ProductDetails from "./components/Product/ProductDetails.js";
import Products from "./components/Product/Products.js";
import Search from "./components/Product/Search.js"
import LoginSignUp from './components/User/LoginSignUp.js';
import store from "./store.js";
import { loadUser } from "./actions/userAction.js";
import UserOptions from "./components/layout/Header/UserOptions.js"
import { useSelector } from 'react-redux';
import Profile from "./components/User/Profile.js";
import ProtectedRoute from './components/Route/ProtectedRoute.js';
import UpdateProfile from "./components/User/UpdateProfile.js";
import UpdatePassword from "./components/User/UpdatePassword.js";
import ForgotPassword from "./components/User/ForgotPassword.js";
import ResetPassword from "./components/User/ResetPassword.js";
import Cart from "./components/Cart/Cart.js";
import Shipping from "./components/Cart/Shipping.js";
import ConfirmOrder from "./components/Cart/ConfirmOrder.js"
import axios from 'axios';
import Payment from "./components/Cart/Payment.js";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import OrderSuccess from "./components/Cart/OrderSuccess.js";
import MyOrders from "./components/Order/MyOrders.js";
import OrderDetails from "./components/Order/OrderDetails.js";
import Dashboard from "./components/Admin/Dashboard.js";
import ProductList from "./components/Admin/ProductList.js";
import NewProduct from "./components/Admin/NewProduct.js";
import UpdateProduct from "./components/Admin/UpdateProduct.js";
import OrderList from "./components/Admin/OrderList.js";
import ProcessOrder from "./components/Admin/ProcessOrder.js";
import UsersList from "./components/Admin/UsersList.js";
import UpdateUser from "./components/Admin/UpdateUser.js";
import ProductReviews from "./components/Admin/ProductReviews.js";
import NotFound from "./components/layout/Not Found/NotFound.js";
import About from "./components/layout/About/About.js";
import  Contact from "./components/layout/Contact/Contact.js"






function App() {

 const { isAuthenticated, user } = useSelector((state) => state.user)

 const [stripeApiKey, setStripeApiKey] = useState("");

 async function getStripeApiKey(){
   const { data } = await axios.get("/api/v1/stripeapikey")
    setStripeApiKey(data.stripeApiKey)
 }

  useEffect(() => {
  
    webFont.load({
     google:{
       families:["Roboto","Droid Sans","Chilanka"]
     }
    })

    store.dispatch(loadUser());

    getStripeApiKey();
   
   }, []);


  window.addEventListener("contextmenu", (e) => e.preventDefault());


  return (
       <>
    <Router>
    <Header />
    {isAuthenticated && <UserOptions  user={ user } />}
    <Routes>
    <Route exact path='/' Component={ Home } />
    <Route exact path='/product/:id' Component={ ProductDetails } />
    <Route exact path='/products' Component={ Products } />
    <Route  path='/products/:keyword' Component={ Products } />
    <Route exact path='/search' Component={ Search } />


    <Route path='/account' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
    <Route path='/me/update' element={<ProtectedRoute><UpdateProfile /></ProtectedRoute>} />
    <Route path='/password/update' element={<ProtectedRoute><UpdatePassword /></ProtectedRoute>} />
    <Route path='/shipping' element={<ProtectedRoute><Shipping /></ProtectedRoute>} />
    <Route path='/order/confirm' element={<ProtectedRoute><ConfirmOrder /></ProtectedRoute>} />

    {stripeApiKey && 
    <Route path='/process/payment' element={<ProtectedRoute><Elements stripe={loadStripe( stripeApiKey )}><Payment /></Elements></ProtectedRoute>} />
    }

    <Route path='/success' element={<ProtectedRoute><OrderSuccess /></ProtectedRoute>} />
    <Route path='/orders' element={<ProtectedRoute><MyOrders /></ProtectedRoute>} />
    <Route path='/order/:id' element={<ProtectedRoute><OrderDetails /></ProtectedRoute>} />


    <Route path='/admin/dashboard' element={<ProtectedRoute isAdmin={true} ><Dashboard /></ProtectedRoute>} />

    <Route path='/admin/products' element={<ProtectedRoute isAdmin={true} ><ProductList /></ProtectedRoute>} />

    <Route path='/admin/product' element={<ProtectedRoute isAdmin={true} ><NewProduct /></ProtectedRoute>} />


    <Route path='/admin/product/:id' element={<ProtectedRoute isAdmin={true} ><UpdateProduct /></ProtectedRoute>} />


    <Route path='/admin/orders' element={<ProtectedRoute isAdmin={true} ><OrderList /></ProtectedRoute>} />


    <Route path='/admin/order/:id' element={<ProtectedRoute isAdmin={true} ><ProcessOrder /></ProtectedRoute>} />


    <Route path='/admin/users' element={<ProtectedRoute isAdmin={true} ><UsersList /></ProtectedRoute>} />

    <Route path='/admin/user/:id' element={<ProtectedRoute isAdmin={true} ><UpdateUser /></ProtectedRoute>} />

    <Route path='/admin/reviews' element={<ProtectedRoute isAdmin={true} ><ProductReviews /></ProtectedRoute>} />


   


    <Route path='/password/forgot' element={<ForgotPassword />} />
    <Route path='/password/reset/:token' element={<ResetPassword />} />
    <Route path='/cart' element={<Cart />} />
    
    <Route exact path='/login' Component={ LoginSignUp } />

    <Route path='*' Component={NotFound} />
    <Route path='/about' Component={About} />
    <Route path='contact' Component={Contact} />
    </Routes>

     <Toaster />
    <Footer />
    </Router>
   
    
       </>
  );
}

export default App;
