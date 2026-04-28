import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__top footer-top">
          <div className="footer-top__secvices">
            <div data-one-spoller data-spollers="768" className="spollers">
              <details className="spollers__item">
                <summary className="spollers__title">Quick Links</summary>
                <div className="spollers__body">
                  <a className="spollers__link" href="#">About us</a>
                  <a className="spollers__link" href="#">Conditions</a>
                  <a className="spollers__link" href="#">Our Journals</a>
                  <a className="spollers__link" href="#">Careers</a>
                  <a className="spollers__link" href="#">Affiliate Programme</a>
                  <a className="spollers__link" href="#">Press</a>
                </div>
              </details>
              <details className="spollers__item">
                <summary className="spollers__title">Customer service</summary>
                <div className="spollers__body">
                  <a className="spollers__link" href="#">FAQ</a>
                  <a className="spollers__link" href="#">Contact</a>
                  <a className="spollers__link" href="#">Privacy policy</a>
                  <a className="spollers__link" href="#">Returns & Refunds</a>
                  <a className="spollers__link" href="#">Cookie guidelines</a>
                  <a className="spollers__link" href="#">Delivery information</a>
                </div>
              </details>
              <details className="spollers__item">
                <summary className="spollers__title">Contact us</summary>
                <div className="spollers__body">
                  <div className="spollers__row-item">
                    <span>Do you have any questions or suggestions?</span>
                    <a className="spollers__link" href="mailto:ourservices@rentie.com">ourservices@rentie.com</a>
                  </div>
                  <div className="spollers__row-item">
                    <span>Do you need assistance? Give us a call.</span>
                    <a className="spollers__link" href="tel:57444110035">+91 6969696969</a>
                  </div>
                </div>
              </details>
              <details className="spollers__item">
                <summary className="spollers__title">Rentie</summary>
                <div className="spollers__body">
                  <p>Cras mattis sit ornare in metus eu amet adipiscing enim. Ullamcorper in orci, ultrices integer eget arcu. Consectetur leo dignissim lacus, lacus sagittis dictumst.</p>
                </div>
              </details>
            </div>
          </div>
          <div className="footer__social social">
            <a href="#" className="social__item _icon-facebook"></a>
            <a href="#" className="social__item _icon-instagram"></a>
            <a href="#" className="social__item _icon-linkedin"></a>
            <a href="#" className="social__item _icon-twitter"></a>
            <a href="#" className="social__item _icon-bao"></a>
          </div>
        </div>
      </div>
      <div className="footer__bottom footer-bottom">
        <div className="footer-bottom__container">
          <div className="footer-bottom__copy">© Copyrights 2026 Rentie. All rights reserved.</div>
          <div className="footer-bottom__payment-option payment-option">
            <div className="payment-option__lable">Payment options :</div>
            <div className="payment-option__paycards">
              <img src="/img/icons/card1.svg" alt="card" />
              <img src="/img/icons/card2.svg" alt="card" />
              <img src="/img/icons/card3.svg" alt="card" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;