import React, { useEffect } from 'react';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import Shop from './Pages/Shop'; 
import Cart from './Pages/Cart'; 
import LoginSignup from './Pages/LoginSignup';
import ResetPassword from './Pages/ResetPassword'; 
import Footer from './Components/Footer/Footer';
import men_banner from './Components/Assets/banner_mens.png';
import women_banner from './Components/Assets/banner_women.png';
import kid_banner from './Components/Assets/banner_kids.png';
import HowToRent from './Pages/HowToRent';

// Correct imports for User Dashboard components
import UserDashboard from './Components/UserDashboard/UserDashboard'; 
import Profile from './Components/UserDashboard/Profile';
import OrderHistory from './Components/UserDashboard/OrderHistory';
import Wishlist from './Components/UserDashboard/Wishlist';
import AccountSettings from './Components/UserDashboard/AccountSettings';
import Notifications from './Components/UserDashboard/Notifications';
import Admin from './Pages/Admin/Admin';
import ProtectedRoute from './Components/ProtectedRoute';

function App() {
  useEffect(() => {
    // Dynamically inject app.min.js after React has mounted the components
    const script = document.createElement('script');
    script.src = "/js/app.min.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup script when component unmounts if necessary
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="wrapper">
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* Main Routes */}
          <Route path="/" element={<Shop />} />
          
          {/* Shop Categories Routes with dynamic banners */}
          <Route path="/mens" element={<ShopCategory banner={men_banner} category="men" />} />
          <Route path="/womens" element={<ShopCategory banner={women_banner} category="women" />} />
          <Route path="/kids" element={<ShopCategory banner={kid_banner} category="kids" />} />

          {/* Product Route */}
          <Route path="/product/:productId" element={<Product />} />
          
          {/* Cart & Auth Routes */}
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<LoginSignup />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/how-to-rent" element={<HowToRent />} />
          
          {/* User Dashboard Routes */}
          <Route path="/dashboard" element={<UserDashboard />}>
            <Route path="profile" element={<Profile />} />
            <Route path="orders" element={<OrderHistory />} />
            <Route path="wishlist" element={<Wishlist />} />
            <Route path="settings" element={<AccountSettings />} />
            <Route path="notifications" element={<Notifications />} />
          </Route>

          {/* Admin Routes (Protected) */}
          <Route 
            path="/admin/*" 
            element={
              <ProtectedRoute isAdmin={true}>
                <Admin />
              </ProtectedRoute>
            } 
          />
          {/* Internal sub-routes like /admin/addproduct are handled within Admin.jsx */}
          
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
