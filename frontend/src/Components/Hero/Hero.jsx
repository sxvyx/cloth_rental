import React from 'react'
import './Hero.css'
// import hand_icon from '../Assets/hand_icon.png'
// import arrow_icon from '../Assets/arrow_icon.png'
import hero_image from '../Assets/hero_image.jpg'
const Hero = () => {
  return (
    <div className='hero'>
        <div className="hero-left">
            <h2>Don’t Buy It, Borrow It – Fashion Made Easy.</h2>
            <div>
                <p>TRUST US</p>
                <p>ON YOUR BIG DAY!</p>
                
            </div>
        </div>
        
        <div className="hero-right">
            <img src= {hero_image} alt="" />
        </div>
    </div>
  )
}

export default Hero