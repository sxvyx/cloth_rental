import React, { useContext, useState } from 'react';
import './CartItems.css';
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../Assets/cart_cross_icon.png';
import API_URL from '../../config';

const CartItems = () => {
    const {
        getTotalCartAmount,
        all_product,
        cartItems,
        removeFromCart,
    } = useContext(ShopContext);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [confirmMessage, setConfirmMessage] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [paymentError, setPaymentError] = useState('');

    const totalAmount = getTotalCartAmount();

    const handleCheckout = () => {
        if (cartItems.length === 0) {
            alert('Your cart is empty. Please add items before proceeding to checkout.');
        } else {
            setIsModalOpen(true);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setConfirmMessage('');
        setPaymentMethod('');
        setPaymentError('');
    };

    const confirmPurchase = () => {
        if (!paymentMethod) {
            setPaymentError('Please select a payment method before confirming.');
            return;
        }

        if (paymentMethod === 'Razorpay') {
            handleRazorpayPayment();
            return;
        }

        fetch(`${API_URL}/orders/placeorder`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'auth-token': `${localStorage.getItem('auth-token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                products: cartItems,
                totalAmount: totalAmount
            }),
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                fetch(`${API_URL}/payments/createpayment`, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'auth-token': `${localStorage.getItem('auth-token')}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        orderId: data.orderId,
                        amount: totalAmount,
                        method: paymentMethod
                    }),
                })
                .then((payRes) => payRes.json())
                .then((payData) => {
                    if (payData.success) {
                        setConfirmMessage(`Rental confirmed! Order ID: ${data.orderId}. Transaction: ${payData.transactionId}. Thank you!`);
                    } else {
                        setConfirmMessage(`Order placed! Order ID: ${data.orderId}. Payment pending.`);
                    }
                    setTimeout(() => {
                        closeModal();
                        window.location.reload();
                    }, 3000);
                });
            } else {
                setPaymentError("Error placing order. Please try again.");
            }
        });
    };

    const handleRazorpayPayment = async () => {
        try {
            const orderRes = await fetch(`${API_URL}/orders/placeorder`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    products: cartItems,
                    totalAmount: totalAmount
                }),
            });
            const orderData = await orderRes.json();
            
            if (!orderData.success) {
                setPaymentError("Error placing order. Please try again.");
                return;
            }

            const rzpOrderRes = await fetch(`${API_URL}/payments/create-order`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: totalAmount * 100,
                    currency: "INR",
                    receipt: `receipt_${orderData.orderId}`
                }),
            });
            const rzpOrderData = await rzpOrderRes.json();

            if (!rzpOrderData.success) {
                setPaymentError("Error initiating Razorpay payment.");
                return;
            }

            const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;
            if (!razorpayKey) {
                setPaymentError("Razorpay Key ID is missing. Please check environment variables.");
                return;
            }

            const options = {
                key: razorpayKey, 
                amount: rzpOrderData.amount,
                currency: rzpOrderData.currency,
                name: "Rentie",
                description: "Rental Booking Payment",
                order_id: rzpOrderData.order_id,
                handler: async function (response) {
                    const verifyRes = await fetch(`${API_URL}/payments/verify-payment`, {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'auth-token': `${localStorage.getItem('auth-token')}`,
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_signature: response.razorpay_signature,
                            orderId: orderData.orderId
                        }),
                    });
                    const verifyData = await verifyRes.json();
                    
                    if (verifyData.success) {
                        setConfirmMessage(`Payment verified! Order ID: ${orderData.orderId}. Thank you!`);
                        setTimeout(() => {
                            closeModal();
                            window.location.reload();
                        }, 3000);
                    } else {
                        setPaymentError("Payment verification failed.");
                    }
                },
                prefill: {
                    name: "Customer",
                    email: "customer@example.com",
                    contact: "9999999999"
                },
                theme: {
                    color: "#9e1b20"
                },
                modal: {
                    ondismiss: function() {
                        setPaymentError("Payment cancelled by user.");
                    }
                }
            };

            const rzp1 = new window.Razorpay(options);
            rzp1.on('payment.failed', function (response){
                setPaymentError(response.error.description || "Payment failed");
            });
            rzp1.open();

        } catch (error) {
            console.error("Payment error:", error);
            setPaymentError("An error occurred during payment.");
        }
    };

    return (
        <div className='cart-container'>
            <div className="cart-header">
                <h1>Your Shopping Bag</h1>
                <p>Manage your rental selections and proceed to checkout.</p>
            </div>

            <div className="cart-content">
                <div className="cart-items-section">
                    <div className="cart-items-list">
                        {Array.isArray(cartItems) && cartItems.length > 0 ? (
                            cartItems.map((item, index) => {
                                const product = all_product.find((p) => p.id === Number(item.productId));
                                if (!product) return null;
                                
                                const days = (item.startDate && item.endDate) 
                                    ? Math.max(1, Math.ceil((new Date(item.endDate) - new Date(item.startDate)) / (1000 * 60 * 60 * 24)))
                                    : 1;

                                return (
                                    <div key={index} className="cart-item-card">
                                        <div className="cart-item-image">
                                            <img src={product.image} alt={product.name} />
                                        </div>
                                        <div className="cart-item-details">
                                            <div className="cart-item-main-info">
                                                <h3 className="cart-item-title">{product.name}</h3>
                                                <p className="cart-item-price">Rs. {product.new_price} <span>/ day</span></p>
                                            </div>
                                            <div className="cart-item-rent-info">
                                                <div className="rent-badge">
                                                    <span className="badge-icon">📅</span>
                                                    <span className="badge-text">{new Date(item.startDate).toLocaleDateString()} - {new Date(item.endDate).toLocaleDateString()}</span>
                                                </div>
                                                <div className="duration-badge">
                                                    {days} {days === 1 ? 'Day' : 'Days'}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="cart-item-total">
                                            <p className="total-label">Total</p>
                                            <p className="total-value">Rs. {product.new_price * days * item.quantity}</p>
                                        </div>
                                        <button className='cart-remove-btn' onClick={() => removeFromCart(item.productId)}>
                                            <img src={remove_icon} alt="Remove" />
                                        </button>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="empty-cart-message">
                                <h3>Your bag is empty</h3>
                                <p>Looks like you haven't added anything to your rental bag yet.</p>
                                <button className="start-shopping-btn" onClick={() => window.location.replace('/')}>Start Shopping</button>
                            </div>
                        )}
                    </div>
                </div>

                <div className="cart-summary-section">
                    <div className="summary-card">
                        <h2>Order Summary</h2>
                        <div className="summary-details">
                            <div className="summary-row">
                                <span>Sub-total</span>
                                <span>Rs. {totalAmount}</span>
                            </div>
                            <div className="summary-row">
                                <span>Shipping Fee</span>
                                <span className="free-shipping">FREE</span>
                            </div>
                            <div className="promo-input-row">
                                <input type="text" placeholder="Promo Code" />
                                <button>Apply</button>
                            </div>
                            <div className="summary-divider"></div>
                            <div className="summary-row total-row">
                                <span>Total Amount</span>
                                <span className="final-total">Rs. {totalAmount}</span>
                            </div>
                        </div>
                        <button className="checkout-btn" onClick={handleCheckout}>
                            Proceed to Checkout
                        </button>
                        <div className="security-notice">
                            <span className="shield-icon">🛡️</span>
                            <span>Secure checkout powered by Razorpay</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Checkout Modal */}
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="premium-modal">
                        <div className="modal-header">
                            <h2>Checkout Details</h2>
                            <button className="modal-close" onClick={closeModal}>&times;</button>
                        </div>
                        <div className="modal-body">
                            <div className="checkout-summary-mini">
                                <h3>Order Details</h3>
                                <div className="mini-items-list">
                                    {Array.isArray(cartItems) && cartItems.map((item, idx) => {
                                        const p = all_product.find((product) => product.id === Number(item.productId));
                                        return (
                                            <div key={idx} className="mini-item">
                                                <span>{p ? p.name : "Item"}</span>
                                                <span>Rs. {p ? p.new_price : 0}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className="mini-total">
                                    <span>Total Payable</span>
                                    <span>Rs. {totalAmount}</span>
                                </div>
                            </div>

                            <div className="payment-selection">
                                <h3>Select Payment Method</h3>
                                <div className="payment-options">
                                    <label className={`payment-option ${paymentMethod === 'Razorpay' ? 'active' : ''}`}>
                                        <input type="radio" name="payment" value="Razorpay" onChange={(e) => setPaymentMethod(e.target.value)} />
                                        <span className="option-content">
                                            <span className="option-name">Online / UPI / Card</span>
                                            <span className="option-desc">Powered by Razorpay</span>
                                        </span>
                                    </label>
                                    <label className={`payment-option ${paymentMethod === 'Cash on Delivery' ? 'active' : ''}`}>
                                        <input type="radio" name="payment" value="Cash on Delivery" onChange={(e) => setPaymentMethod(e.target.value)} />
                                        <span className="option-content">
                                            <span className="option-name">Cash on Delivery</span>
                                            <span className="option-desc">Pay when you receive</span>
                                        </span>
                                    </label>
                                </div>
                            </div>

                            {paymentError && <div className="modal-error">{paymentError}</div>}
                            {confirmMessage && <div className="modal-success">{confirmMessage}</div>}
                        </div>
                        <div className="modal-footer">
                            <button className="secondary-btn" onClick={closeModal}>Cancel</button>
                            <button className="primary-btn" onClick={confirmPurchase}>Confirm Rental</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartItems;


