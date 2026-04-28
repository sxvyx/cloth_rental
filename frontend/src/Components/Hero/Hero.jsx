import React from 'react'

const Hero = () => {
  return (
    <>
      <div className="loader">
        <div className="loader-clip clip-top">
          <div className="marquee">
            <div className="marquee-container">
              <span>Cloth Rental</span>
              <span>Cloth Rental</span>
              <span>Cloth Rental</span>
              <span>Cloth Rental</span>
              <span>Cloth Rental</span>
              <span>Cloth Rental</span>
              <span>Cloth Rental</span>
              <span>Cloth Rental</span>
              <span>Cloth Rental</span>
              <span>Cloth Rental</span>
            </div>
          </div>
        </div>
        <div className="loader-clip clip-bottom">
          <div className="marquee">
            <div className="marquee-container">
              <span>Cloth Rental</span>
              <span>Cloth Rental</span>
              <span>Cloth Rental</span>
              <span>Cloth Rental</span>
              <span>Cloth Rental</span>
              <span>Cloth Rental</span>
              <span>Cloth Rental</span>
              <span>Cloth Rental</span>
              <span>Cloth Rental</span>
              <span>Cloth Rental</span>
            </div>
          </div>
        </div>
        <div className="clip-center">
          <div className="marquee">
            <div className="marquee-container">
              <span>Cloth Rental</span>
              <span>Cloth Rental</span>
              <span>Cloth Rental</span>
              <span>Cloth Rental</span>
              <span>Cloth Rental</span>
              <span>Cloth Rental</span>
              <span>Cloth Rental</span>
              <span>Cloth Rental</span>
              <span>Cloth Rental</span>
              <span>Cloth Rental</span>
            </div>
          </div>
        </div>
      </div>
      <section className="hero">
        <div className="hero__slider swiper-hero swiper">
          <div className="hero__wrapper swiper-hero__wrapper swiper-wrapper">
            <div className="hero__slide hero-slide hero-slide--bg-1 swiper-slide">
              <div className="hero-slide__main-info">
                <h1 className="hero-slide__title">Cloth Rental</h1>
                <div className="hero-slide__year">summer 2026</div>
              </div>
            </div>
            <div className="hero__slide hero-slide hero-slide--bg-2 swiper-slide">
              <div className="hero-slide__main-info">
                <h2 className="hero-slide__title">Cloth Rental</h2>
                <div className="hero-slide__year">summer 2026</div>
              </div>
            </div>
            <div className="hero__slide hero-slide hero-slide--bg-3 swiper-slide">
              <div className="hero-slide__main-info">
                <h2 className="hero-slide__title">Cloth Rental</h2>
                <div className="hero-slide__year">summer 2026</div>
              </div>
            </div>
            <div className="hero__slide hero-slide hero-slide--bg-4 swiper-slide">
              <div className="hero-slide__main-info">
                <h2 className="hero-slide__title">Cloth Rental</h2>
                <div className="hero-slide__year">summer 2026</div>
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
    </>
  )
}

export default Hero