import React, { useEffect, useState } from 'react';
import Item from '../Item/Item';
import API_URL from '../../config';

const Popular = () => {
  const [popularProducts, setPopularProducts] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/popularinwomen`)
      .then((response) => response.json())
      .then((data) => setPopularProducts(data));
  }, []);

  return (
    <section className="feature-product">
      <div className="feature-product__container">
        <div className="feature-product__body">
          <div className="feature-product__header-block header-block">
            <h4 className="feature-product__title header-block__title">
              POPULAR IN WOMEN
            </h4>
          </div>
        </div>
        <div className="feature-product__cards card">
          {popularProducts.map((item, i) => (
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
      </div>
    </section>
  );
};

export default Popular;