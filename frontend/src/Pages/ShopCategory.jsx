import React, { useContext, useState } from 'react';
import { ShopContext } from '../Context/ShopContext';
import Item from '../Components/Item/Item';

const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext);
  const [sortOrder, setSortOrder] = useState('default');
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 12;

  // Filter products by category
  const filteredProducts = all_product.filter(item => item.category === props.category);

  // Sort logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === 'price-low-high') return a.new_price - b.new_price;
    if (sortOrder === 'price-high-low') return b.new_price - a.new_price;
    return 0; // default
  });

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <section className="feature-product" style={{ padding: '80px 0 80px' }}>
      <div className="feature-product__container" style={{ paddingTop: '0' }}>
        
        {/* Banner */}
        <div style={{ marginBottom: '60px', width: '100%' }}>
          <img src={props.banner} alt="category banner" style={{ width: '100%', height: 'auto', borderRadius: '20px' }} />
        </div>

        <div className="feature-product__body" style={{ marginBottom: '40px' }}>
          <div className="header-block">
            <h4 className="header-block__title">
              {props.category} PRODUCTS
            </h4>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#888' }}>
            <p>
              Showing {indexOfFirstProduct + 1}-{Math.min(indexOfLastProduct, filteredProducts.length)} of {filteredProducts.length}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <label htmlFor="sort" style={{ fontSize: '0.9rem' }}>Sort by:</label>
              <select 
                id="sort" 
                value={sortOrder} 
                onChange={(e) => setSortOrder(e.target.value)}
                style={{ padding: '5px 15px', border: '1px solid #eee', borderRadius: '50px', outline: 'none' }}
              >
                <option value="default">Default</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        <div className="feature-product__cards card">
          {currentProducts.map((item, i) => (
            <Item
              key={i}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          ))}
        </div>

        {/* Pagination Controls */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', marginTop: '50px' }}>
          <button
            className="button"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            style={{ padding: '10px 20px', opacity: currentPage === 1 ? 0.5 : 1 }}
          >
            Previous
          </button>
          <span style={{ fontWeight: 'bold' }}>Page {currentPage} of {totalPages}</span>
          <button
            className="button"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            style={{ padding: '10px 20px', opacity: currentPage === totalPages ? 0.5 : 1 }}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default ShopCategory;
