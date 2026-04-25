import React from 'react'
import './Admin.css'
import Sidebar from '../../Components/Admin/Sidebar/Sidebar'
import { Routes, Route } from 'react-router-dom'
import AddProduct from '../../Components/Admin/AddProduct/AddProduct'
import ListProduct from '../../Components/Admin/ListProduct/ListProduct'
import ManageOrders from '../../Components/Admin/ManageOrders/ManageOrders'

const Admin = () => {
  return (
    <div className='admin'>
        <Sidebar/>
        <Routes>
          <Route path = '/addproduct' element={<AddProduct/>}/>
          <Route path = '/listproduct' element={<ListProduct/>}/>
          <Route path = '/manageorders' element={<ManageOrders/>}/>
        </Routes>
    </div>
  )
}

export default Admin
