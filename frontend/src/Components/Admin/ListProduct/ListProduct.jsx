import React, { useEffect, useState } from 'react'
import './ListProduct.css'
import cross_icon from '../../Assets/cross_icon.png'
import API_URL from '../../../config';


const ListProduct = () => {

  const [allproducts, setAllProducts] = useState([]);

  const [editProduct, setEditProduct] = useState(null);

  const fetchInfo = async()=>{
    await fetch(`${API_URL}/products/allproducts`)
    .then((res)=>res.json())
    .then((data)=>{setAllProducts(data)});
  }

  useEffect(()=>{
    fetchInfo();
  }, [])

  const remove_product = async(id)=>{
    if(window.confirm("Are you sure you want to remove this product?")) {
      await fetch(`${API_URL}/products/removeproduct`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({id:id})
      })
      await fetchInfo();
    }
  }

  const handleUpdate = async () => {
    await fetch(`${API_URL}/products/updateproduct`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(editProduct),
    }).then((res) => res.json())
    .then((data) => {
        if (data.success) {
            alert("Product Updated Successfully");
            setEditProduct(null);
            fetchInfo();
        } else {
            alert("Update Failed");
        }
    });
  }

  return (
    <div className='list-product'>
      <h1>Availability & Inventory Management</h1>
      <div className="listproduct-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Category</p>
        <p>Price</p>
        <p>Stock</p>
        <p>Status</p>
        <p>Action</p>
      </div>

      <div className="listproduct-allproducts">
        <hr />
        {allproducts.map((product, index)=>{
            return <div key={index}>
                <div className="listproduct-format-main listproduct-format">
                <img src={product.image} alt="" className="listproduct-product-icon" />
                <p>{product.name}</p>
                <p>{product.category}</p>
                <p>Rs. {product.new_price}</p>
                <p style={{ fontWeight: 'bold', color: product.stock < 3 ? 'red' : 'inherit' }}>{product.stock}</p>
                <p style={{ color: product.available ? 'green' : 'red', fontWeight: '600' }}>
                    {product.available ? "Available" : "Unavailable"}
                </p>
                <div className="listproduct-actions">
                    <button className="edit-btn" onClick={() => setEditProduct(product)}>Edit</button>
                    <img onClick={()=>{remove_product(product.id)}} src={cross_icon} alt="" className="listproduct-remove-icon" />
                </div>
            </div>
            <hr />
            </div>
        })}
      </div>

      {/* Edit Modal */}
      {editProduct && (
        <div className="edit-modal-overlay">
            <div className="edit-modal">
                <h2>Edit Product Availability</h2>
                <div className="edit-field">
                    <p>Product Name</p>
                    <input type="text" value={editProduct.name} onChange={(e) => setEditProduct({...editProduct, name: e.target.value})} />
                </div>
                <div className="edit-field">
                    <p>Stock Quantity</p>
                    <input type="number" value={editProduct.stock} onChange={(e) => setEditProduct({...editProduct, stock: Number(e.target.value)})} />
                </div>
                <div className="edit-field">
                    <p>Offer Price (Rs.)</p>
                    <input type="number" value={editProduct.new_price} onChange={(e) => setEditProduct({...editProduct, new_price: Number(e.target.value)})} />
                </div>
                <div className="edit-field">
                    <p>Status</p>
                    <select value={editProduct.available} onChange={(e) => setEditProduct({...editProduct, available: e.target.value === "true"})}>
                        <option value="true">Available</option>
                        <option value="false">Unavailable</option>
                    </select>
                </div>
                <div className="modal-actions">
                    <button className="save-btn" onClick={handleUpdate}>Save Changes</button>
                    <button className="close-btn" onClick={() => setEditProduct(null)}>Cancel</button>
                </div>
            </div>
        </div>
      )}
    </div>
  )
}

export default ListProduct