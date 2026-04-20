import React, { useState } from 'react';
import './NewsLetter.css';

const NewsLetter = () => {
  const [email, setEmail] = useState('');  // State to store the email
  const [isSubscribed, setIsSubscribed] = useState(false);  // State to check subscription status

  // Function to handle the subscription
  const handleSubscribe = () => {
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
    <div className='newletter'>
        <h1>Get Exclusive Offers On Your Email</h1>
        <p>Subscribe to our newsletter and stay updated</p>
        <div>
            <input 
                type="email" 
                placeholder='Your Email Id' 
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Update the email state
            />
            <button onClick={handleSubscribe}>Subscribe</button>
        </div>
        {isSubscribed && <p className="success-message">Thank you for subscribing!</p>}
    </div>
  );
};

export default NewsLetter;
