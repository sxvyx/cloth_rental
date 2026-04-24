import React from 'react'
import './Navbar.css'
import shopping_bag from '../../assets/shopping_bag.svg'
import navProfile from '../../assets/nav-profile.svg'

const Navbar = () => {
  return (
    <div className='navbar'>
        <img src={shopping_bag} alt="" className="nav-logo" />
        <div className="nav-title">ADMIN PANEL</div>
        <img src={navProfile} alt="" className="nav-profile" />
    </div>
  )
}

export default Navbar
