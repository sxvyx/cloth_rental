import React from 'react';

const Wishlist = () => {
  const wishlistItems = [
    { id: 1, name: 'Leather Jacket', price: 90, img: 'item_image_url.jpg' },
    { id: 2, name: 'Running Shoes', price: 60, img: 'item_image_url.jpg' },
  ];

  return (
    <div className="wishlist">
      <h2>Your Wishlist</h2>
      <div className="wishlist-items">
        {wishlistItems.map(item => (
          <div key={item.id} className="wishlist-item">
            <img src={item.img} alt={item.name} />
            <p>{item.name}</p>
            <p>${item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
