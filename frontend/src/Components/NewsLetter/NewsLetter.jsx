import React, { useState } from 'react';

const NewsLetter = () => {
  const [email, setEmail] = useState('');  // State to store the email
  const [isSubscribed, setIsSubscribed] = useState(false);  // State to check subscription status

  // Function to handle the subscription
  const handleSubscribe = (e) => {
    e.preventDefault();
    // Simple email validation
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    
    if (emailPattern.test(email)) {
      setIsSubscribed(true);  // Set subscription status to true
      alert('Subscription successful! You will receive exclusive offers soon.');
    } else {
      alert('Please enter a valid email address.');
    }
  };

  return (
    <div className="subscribe">
      <div className="subscribe__container">
        <div className="subscribe__info info">
          <div className="info__lable">Get Exclusive Offers On Your Email</div>
          <div className="info__text">
            Subscribe to our newsletter and stay updated
          </div>
        </div>
        <form className="subscribe__form" onSubmit={handleSubscribe}>
          <input 
            type="email" 
            placeholder="Your Email Id" 
            className="input" 
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Update the email state
          />
          <button type="submit" className="button">Subscribe now</button>
        </form>
      </div>
    </div>
  );
};

export default NewsLetter;
