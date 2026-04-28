import React, { useState } from 'react'
import './AddProduct.css'
import upload_area from '../../Assets/upload_area.svg'
import API_URL from '../../../config';

const AddProduct = () => {

    const[image, setImage] = useState(false);
    const [productDetails, setProductDetails] = useState({
        name: "",
        description: "",
        image:"",
        category:"women",
        sizes: ["S", "M", "L", "XL", "XXL"],
        new_price: "",
        old_price:"",
        stock: 1
    })

    const imageHandler = (e)=>{
        setImage(e.target.files[0]);
    }

    const changeHandler = (e)=>{
        setProductDetails({...productDetails, [e.target.name]:e.target.value})
    }

    const sizeHandler = (size) => {
        setProductDetails((prev) => {
            const sizes = prev.sizes.includes(size)
                ? prev.sizes.filter(s => s !== size)
                : [...prev.sizes, size];
            return { ...prev, sizes };
        });
    }

    const Add_Product = async()=>{
        console.log(productDetails);
        let responseData;
        let product = productDetails;

        let formData = new FormData();
        formData.append('product', image);

        await fetch(`${API_URL}/upload`,{
            method: 'POST',
            headers: {
                Accept: 'application/json',
            },
            body: formData,
        }).then((resp)=> resp.json()).then((data)=>{responseData = data});


        if(responseData.success){
            product.image = responseData.image_url;
            console.log(product);
            await fetch(`${API_URL}/products/addproduct`,{
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...product,
                    stock: Number(product.stock)
                }),
            }).then((resp)=>resp.json()).then((data)=>{
                data.success?alert("Product added"):alert("Failed")
            })
        }
    }

  return (
    <div className='add-product'>
        <div className="addproduct-itemfield">
            <p>Product Title</p>
            <input value={productDetails.name} onChange={changeHandler} type="text" name="name" placeholder='Enter product name' />
        </div>

        <div className="addproduct-itemfield">
            <p>Product Description</p>
            <textarea value={productDetails.description} onChange={changeHandler} name="description" placeholder='Describe the product features and details...' rows="4" />
        </div>

        <div className="addproduct-price">
            <div className="addproduct-itemfield">
                <p>Standard Price (Rs.)</p>
                <input value={productDetails.old_price} onChange={changeHandler} type="text" name="old_price" placeholder='Original price' />
            </div>
            
            <div className="addproduct-itemfield">
                <p>Rental Price per Day (Rs.)</p>
                <input value={productDetails.new_price} onChange={changeHandler} type="text" name="new_price" placeholder='Daily rental rate' />
            </div>
        </div>

        <div className="addproduct-price">
            <div className="addproduct-itemfield">
                <p>Product Category</p>
                <select value={productDetails.category} onChange={changeHandler} name="category" className='add-product-selector'>
                    <option value="women">Women</option>
                    <option value="men">Men</option>
                    <option value="kids">Kids</option>
                </select>
            </div>

            <div className="addproduct-itemfield">
                <p>Initial Stock</p>
                <input value={productDetails.stock} onChange={changeHandler} type="number" name="stock" placeholder='Quantity' />
            </div>
        </div>

        <div className="addproduct-itemfield">
            <p>Available Sizes</p>
            <div className="size-container" style={{display: 'flex', gap: '12px', flexWrap: 'wrap'}}>
                {["S", "M", "L", "XL", "XXL"].map((size) => (
                    <div
                        key={size}
                        onClick={() => sizeHandler(size)}
                        className={`size-box ${productDetails.sizes.includes(size) ? 'selected' : ''}`}
                    >
                        {size}
                    </div>
                ))}
            </div>
        </div>

        <div className="addproduct-itemfield">
            <p>Product Thumbnail</p>
            <label htmlFor="file-input">
                <img src={image?URL.createObjectURL(image):upload_area} className = 'addproduct-thumbnail-img' alt="Upload Area" />
            </label>
            <input onChange={imageHandler} type="file" name='image' id='file-input' hidden/>
        </div>
        
        <button onClick={()=>{Add_Product()}} className='addproduct-btn'>Publish Product</button>
    </div>
  )
}

export default AddProduct
