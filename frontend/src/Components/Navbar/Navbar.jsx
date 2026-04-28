import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const userRole = localStorage.getItem('user-role');
  const isAdmin = userRole === 'admin';

  const handleLogout = () => {
    localStorage.removeItem('auth-token');
    localStorage.removeItem('user-role');
    window.location.replace('/');
  };

  return (
    <header className="header">
      <div className="header__container">
        <Link 
          to={isAdmin ? "/admin" : (localStorage.getItem('auth-token') ? "/dashboard/profile" : "/")} 
          className="header__logo"
        >
          <img src="/img/logo.png" alt="Rentie Logo" style={{ height: '50px', width: 'auto', objectFit: 'contain' }} />
        </Link>
        <div className="header__menu menu">
          <nav className="menu__body">
            <ul className="menu__list">
              {isAdmin ? (
                <>
                  <li className="menu__item"><Link to="/admin" className="menu__link">DASHBOARD</Link></li>
                  <li className="menu__item"><Link to="/admin/addproduct" className="menu__link">ADD PRODUCT</Link></li>
                  <li className="menu__item"><Link to="/admin/listproduct" className="menu__link">PRODUCT LIST</Link></li>
                  <li className="menu__item"><Link to="/admin/manageorders" className="menu__link">ORDERS</Link></li>
                  <li className="menu__item"><Link to="/admin/users" className="menu__link">USERS</Link></li>
                </>
              ) : (
                <>
                  <li className="menu__item"><Link to="/womens" className="menu__link">WOMEN</Link></li>
                  <li className="menu__item"><Link to="/mens" className="menu__link">MEN</Link></li>
                  <li className="menu__item"><Link to="/kids" className="menu__link">KIDS</Link></li>
                  <li className="menu__item"><Link to="/" className="menu__link">SALE</Link></li>
                  <li className="menu__item"><Link to="/how-to-rent" className="menu__link">BLOG</Link></li>
                </>
              )}
            </ul>
          </nav>
        </div>
        <div className="header__actions action-header">
          <div className="action-header__link-ico link-ico">
            
            {localStorage.getItem('auth-token') ? (
              <button 
                onClick={handleLogout} 
                className="logout-btn"
              >
                LOGOUT
              </button>
            ) : (
              <Link className="link-ico__item" to="/login"><img src="/img/icons/profile.svg" alt="profile" /></Link>
            )}
            
            {!isAdmin && (
              <>
                <Link className="link-ico__item" to="/"><img src="/img/icons/like.svg" alt="like" /></Link>
                <Link className="link-ico__item" to="/cart"><img src="/img/icons/shop.svg" alt="shop" /></Link>
              </>
            )}
          </div>
          <button type="button" className="menu__icon icon-menu">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
