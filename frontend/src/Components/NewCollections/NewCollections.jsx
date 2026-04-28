import React, {useEffect, useState}from 'react'
import Item from '../Item/Item'
import API_URL from '../../config';

const NewCollections = () => {

  const [new_collection, setNew_collection] = useState([]);

  useEffect(()=>{
      fetch(`${API_URL}/newcollection`)
      .then((response)=>response.json())
      .then((data)=> setNew_collection(data));
  }, [])

  return (
    <section className="feature-product">
      <div className="feature-product__container">
        <div className="feature-product__body">
          <div className="feature-product__header-block header-block">
            <h4 className="feature-product__title header-block__title">
              NEW COLLECTIONS
            </h4>
          </div>
        </div>
        <div className="feature-product__cards card">
          {new_collection.map((item, i) => (
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
  )
}

export default NewCollections