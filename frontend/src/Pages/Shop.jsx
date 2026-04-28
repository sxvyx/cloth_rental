import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Item from '../Components/Item/Item';

const Shop = () => {
  // To ensure Swiper and the preloader script works, we might need to reload or re-init app.min.js
  // But for now we just dump the HTML identically to the template.
  
  return (
    <main className="page">
      <div className="loader">
        <div className="loader-clip clip-top">
          <div className="marquee">
            <div className="marquee-container">
              <span>Rentie</span><span>Rentie</span><span>Rentie</span><span>Rentie</span><span>Rentie</span><span>Rentie</span><span>Rentie</span><span>Rentie</span><span>Rentie</span><span>Rentie</span>
            </div>
          </div>
        </div>
        <div className="loader-clip clip-bottom">
          <div className="marquee">
            <div className="marquee-container">
              <span>Rentie</span><span>Rentie</span><span>Rentie</span><span>Rentie</span><span>Rentie</span><span>Rentie</span><span>Rentie</span><span>Rentie</span><span>Rentie</span><span>Rentie</span>
            </div>
          </div>
        </div>
        <div className="clip-center">
          <div className="marquee">
            <div className="marquee-container">
              <span>Rentie</span><span>Rentie</span><span>Rentie</span><span>Rentie</span><span>Rentie</span><span>Rentie</span><span>Rentie</span><span>Rentie</span><span>Rentie</span><span>Rentie</span>
            </div>
          </div>
        </div>
      </div>
      
      <section className="hero">
        <div className="hero__slider swiper-hero swiper">
          <div className="hero__wrapper swiper-hero__wrapper swiper-wrapper">
            <div className="hero__slide hero-slide hero-slide--bg-1 swiper-slide">
              <div className="hero-slide__main-info">
                <h1 className="hero-slide__title">Rentie</h1>
                <div className="hero-slide__year">summer 2026</div>
              </div>
            </div>
            <div className="hero__slide hero-slide hero-slide--bg-2 swiper-slide">
              <div className="hero-slide__main-info">
                <h2 className="hero-slide__title">Rentie</h2>
                <div className="hero-slide__year">summer 2025</div>
              </div>
            </div>
            <div className="hero__slide hero-slide hero-slide--bg-3 swiper-slide">
              <div className="hero-slide__main-info">
                <h2 className="hero-slide__title">Rentie</h2>
                <div className="hero-slide__year">summer 2024</div>
              </div>
            </div>
            <div className="hero__slide hero-slide hero-slide--bg-4 swiper-slide">
              <div className="hero-slide__main-info">
                <h2 className="hero-slide__title">Rentie</h2>
                <div className="hero-slide__year">summer 2023</div>
              </div>
            </div>
          </div>
          <div className="hero-swiper-pagination"></div>
        </div>
        <div className="hero__brand brand-logo">
          <img className="brand-logo__item brand-logo__item--1" src="/img/icons/Doroshie.svg" alt="logo" />
          <img className="brand-logo__item brand-logo__item--2" src="/img/icons/MARTAN.svg" alt="logo" />
          <img className="brand-logo__item brand-logo__item--3" src="/img/icons/CasinPasin.svg" alt="logo" />
          <img className="brand-logo__item brand-logo__item--4" src="/img/icons/Wooford-remix.svg" alt="logo" />
          <img className="brand-logo__item brand-logo__item--5" src="/img/icons/KG91.svg" alt="logo" />
        </div>
      </section>

      <section className="feature">
        <div className="feature__container">
          <div className="feature__body">
            <div className="feature__header-block header-block">
              <h3 className="feature__title header-block__title">Featured products</h3>
              <Link className="feature__view-all header-block__view-all" to="/womens"><span>View all products</span></Link>
            </div>
            <div className="feature__slider-wrapper">
              <div className="feature__slider feature-swiper swiper">
                <div className="feature__wrapper feature-swiper-wrapper swiper-wrapper">
                  
                  {[1, 2, 3, 4, 5, 1, 2, 3, 4, 5].map((imgNum, idx) => (
                    <div key={idx} className="feature__slide feature-slide swiper-slide">
                      <div className="feature-slide__body">
                        <div className="feature-slide__top">
                          <div className="feature-slide__image _watcher-view" style={{ position: 'relative', overflow: 'hidden' }}>
                            <img src={`/img/features/product-${imgNum}.png`} alt="product" />
                            <div className="feature-slide__shop-btn shop-btn">
                              <div className="shop-btn__row">
                                <button className="shop-btn__view product-btn">Quick View</button>
                                <button className="shop-btn__add product-btn">Add to cart</button>
                                <button className="shop-btn__like product-btn">
                                  <img src="/img/icons/like-back.svg" alt="like" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="feature-slide__bottom">
                          <a href="#" className="feature-slide__lable">Designer Evening Gown</a>
                          <span className="feature-slide__price">Rs.2500.00</span>
                        </div>
                      </div>
                    </div>
                  ))}

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="collection">
        <div className="collection__container">
          <div className="collection__body">
            <div className="collection__content content">
              <div className="content__lable">designer’s</div>
              <h3 className="content__title">2026 Collection</h3>
              <div className="content__text">
                <p>Discover the elegance of sustainable luxury. Our 2026 collection features handcrafted designs tailored for your most memorable moments. Rent the look, own the night.</p>
              </div>
              <Link to="/womens" className="content__btn btn">Shop Collection <span></span></Link>
            </div>
            <div className="collection__image">
              <img src="/img/collection/collection-main.jpg" alt="main-img" />
            </div>
          </div>
        </div>
      </section>

      <section className="feature-product">
        <div className="feature-product__container">
          <div className="feature-product__body">
            <div className="feature-product__header-block header-block">
              <h4 className="feature-product__title header-block__title">Featured products</h4>
              <Link className="feature-product__view-all header-block__view-all" to="/mens"><span>View all products</span></Link>
            </div>
          </div>
          <div className="feature-product__cards card">
            {[1, 2, 3, 4, 5].map((imgNum, idx) => (
              <Item 
                key={idx}
                id={idx}
                name="Premium Silk Saree"
                image={`/img/feature-product/feature-product-${imgNum}.jpg`}
                new_price="1250.00"
              />
            ))}
          </div>
        </div>
      </section>

      <section className="clothes">
        <div className="clothes__container">
          <div className="clothes__body">
            <div className="clothes__col col">
              <div className="col__body col__body--1">
                <div className="col__items">
                  <h5 className="col__title">Womens</h5>
                  <Link to="/womens" className="col__btn btn">Shop Collection <span></span></Link>
                </div>
              </div>
              <div className="col__body col__body--2">
                <div className="col__items">
                  <h5 className="col__title">Kids</h5>
                  <Link to="/kids" className="col__btn btn">Shop Collection <span></span></Link>
                </div>
              </div>
              <div className="col__body col__body--3">
                <div className="col__items">
                  <h5 className="col__title">Mens</h5>
                  <Link to="/mens" className="col__btn btn">Shop Collection <span></span></Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="quote">
        <div className="quote__container">
          <div className="quote__slider quote-swiper swiper">
            <div className="quote__wrapper quote-wrapper swiper-wrapper">
              {[
                { name: "Savy", text: "Rentie has completely changed how I think about my wardrobe. I can wear luxury outfits for every event without the high cost of buying." },
                { name: "Abhinav Kumar", text: "The quality of the clothes and the seamless delivery process make Rentie my go-to for all formal events. Truly a premium experience." },
                { name: "Ayush", text: "Sustainable fashion never looked so good. I love being able to wear designer labels while reducing my environmental footprint." }
              ].map((testimonial, idx) => (
                <div key={idx} className="quote__slide quote-slide swiper-slide">
                  <div className="quote-slide__body">
                    <div className="quote-slide__image">
                      <img src="/img/icons/quote.svg" alt="quote" />
                    </div>
                    <div className="quote-slide__inner inner">
                      <div className="inner__text">
                        <p>“{testimonial.text}”</p>
                        <a href="#" className="inner__name">By {testimonial.name}</a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="quote__arrows">
              <button type="button" className="swiper-button-prev"><img src="/img/icons/arrow-slider.svg" alt="arrow" /></button>
              <button type="button" className="swiper-button-next"><img src="/img/icons/arrow-slider.svg" alt="arrow" /></button>
            </div>
          </div>
        </div>
      </div>

      <section className="jornal">
        <div className="jornal__container">
          <div className="jornal__header-block header-block">
            <h6 className="jornal__title header-block__title">OUR JOURNAL</h6>
            <Link className="jornal__view-all header-block__view-all" to="/womens"><span>View all products</span></Link>
          </div>
          <div className="jornal__cards card-jornal">
            <div className="card-jornal__body">
              <a href="#" className="card-jornal__image"><img src="/img/jornal/jornal-1.jpg" alt="girl" /></a>
              <div className="card-jornal__content">
                <div className="card-jornal__lable">sustainable living</div>
                <a href="#" className="card-jornal__link">Why renting is the smartest way to upgrade your wardrobe</a>
              </div>
            </div>
            <div className="card-jornal__body">
              <a href="#" className="card-jornal__image"><img src="/img/jornal/jornal-2.jpg" alt="girl" /></a>
              <div className="card-jornal__content">
                <div className="card-jornal__lable">fashion community</div>
                <a href="#" className="card-jornal__link">Creating your happy place with premium curated fashion</a>
              </div>
            </div>
            <div className="card-jornal__body">
              <a href="#" className="card-jornal__image"><img src="/img/jornal/jornal-3.jpg" alt="girl" /></a>
              <div className="card-jornal__content">
                <div className="card-jornal__lable">exclusive styling</div>
                <a href="#" className="card-jornal__link">Book your appointment with our expert celebrity stylists</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="subscribe">
        <div className="subscribe__container">
          <div className="subscribe__info info">
            <div className="info__lable">Get 25% off Discount Coupons</div>
            <div className="info__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
          </div>
          <form className="subscribe__form">
            <input data-required="email" type="text" name="form[email]" data-error="Error" placeholder="Enter your email address " className="input" />
            <button type="button" className="button">Subscribe now</button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Shop;