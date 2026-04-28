import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

const Item = (props) => {
  const [isVisible, setIsVisible] = useState(false);
  const itemRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (itemRef.current) {
      observer.observe(itemRef.current);
    }

    return () => {
      if (itemRef.current) observer.disconnect();
    };
  }, []);

  return (
    <div className="card__body" ref={itemRef}>
      <div className={`card__image ${isVisible ? '_watcher-view' : ''}`}>
        <Link to={`/product/${props.id}`} onClick={() => window.scrollTo(0, 0)}>
          <img 
            src={props.image} 
            alt={props.name} 
          />
        </Link>
        <div className="shop-btn">
          <div className="shop-btn__row">
            <button className="shop-btn__view product-btn">Quick View</button>
            <button className="shop-btn__add product-btn">Add to cart</button>
            <button className="shop-btn__like product-btn">
              <img src="/img/icons/like-back.svg" alt="like" />
            </button>
          </div>
        </div>
      </div>
      <div className="card__bottom-items">
        <Link to={`/product/${props.id}`} className="card__lable">
          {props.name}
        </Link>
        <div className="card__price">
          Rs.{props.new_price} 
          {props.old_price && (
            <span style={{ textDecoration: 'line-through', color: '#999', fontSize: '0.85em', marginLeft: '10px' }}>
              Rs.{props.old_price}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default Item