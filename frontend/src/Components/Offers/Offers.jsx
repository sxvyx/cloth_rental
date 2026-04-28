import React from 'react'

const Offers = () => {
  return (
    <section className="collection">
      <div className="collection__container">
        <div className="collection__body">
          <div className="collection__content content">
            <div className="content__lable">exclusive</div>
            <h3 className="content__title">Offers for you</h3>
            <div className="content__text">
              <p>
                ONLY ON BEST SELLER PRODUCTS
              </p>
            </div>
            <a href="#" className="content__btn btn">Check Now <span></span></a>
          </div>
          <div className="collection__image">
            <img src="/img/collection/collection-main.jpg" alt="exclusive-offer" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Offers