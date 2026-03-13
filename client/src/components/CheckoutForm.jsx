import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  PaymentElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { createOrder } from '../api';

const CheckoutForm = ({ orderTotal }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [address, setAddress] = useState({
    address: '',
    city: '',
    postalCode: '',
    country: ''
  });

  const { cartItems, clearCartItems } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    // Basic validation
    if (!address.address || !address.city || !address.postalCode) {
      setMessage('Please fill in all shipping details');
      return;
    }

    setIsLoading(true);

    // Confirm the payment with Stripe
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // We will handle redirect ourselves instead of Stripe redirecting
      },
      redirect: 'if_required'
    });

    if (error) {
      setMessage(error.message);
      setIsLoading(false);
      return;
    }

    if (paymentIntent && paymentIntent.status === 'succeeded') {
      // Payment succeeded, now create the order in our database
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`,
          },
        };

        const tax = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0) * 0.08;
        const shipping = orderTotal > 100 ? 0 : 15;
        const itemsPrice = orderTotal - tax - shipping;

        // Transform cart items to match order schema
        const orderItems = cartItems.map(item => ({
          product: item._id,
          name: item.name,
          image: item.image,
          price: item.price,
          quantity: item.quantity,
          size: item.selectedSize
        }));

        const { data } = await createOrder({
          items: orderItems,
          shippingAddress: address,
          paymentMethod: 'Stripe',
          itemsPrice,
          taxPrice: tax,
          shippingPrice: shipping,
          totalPrice: orderTotal,
        });

        // Clear cart and redirect to success
        clearCartItems();
        // For now, redirect to home with success state
        alert('Payment successful! Your order has been placed.');
        navigate('/');
      } catch (err) {
        console.error('Error creating order:', err);
        setMessage('Payment succeeded but order creation failed. Please contact support.');
      }
    } else {
      setMessage('An unexpected error occurred.');
    }

    setIsLoading(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit} className="space-y-8">
      {/* Shipping details */}
      <div>
        <h3 className="text-xl font-display text-gray-100 mb-4 border-b border-white/10 pb-2">Shipping Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm text-gray-400 mb-1">Street Address</label>
            <input
              type="text"
              required
              value={address.address}
              onChange={(e) => setAddress({ ...address, address: e.target.value })}
              className="w-full bg-dark-200 border border-white/10 rounded-lg px-4 py-2 text-gray-100 focus:outline-none focus:border-gold-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">City</label>
            <input
              type="text"
              required
              value={address.city}
              onChange={(e) => setAddress({ ...address, city: e.target.value })}
              className="w-full bg-dark-200 border border-white/10 rounded-lg px-4 py-2 text-gray-100 focus:outline-none focus:border-gold-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Postal Code</label>
            <input
              type="text"
              required
              value={address.postalCode}
              onChange={(e) => setAddress({ ...address, postalCode: e.target.value })}
              className="w-full bg-dark-200 border border-white/10 rounded-lg px-4 py-2 text-gray-100 focus:outline-none focus:border-gold-500"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm text-gray-400 mb-1">Country</label>
            <input
              type="text"
              required
              value={address.country}
              onChange={(e) => setAddress({ ...address, country: e.target.value })}
              className="w-full bg-dark-200 border border-white/10 rounded-lg px-4 py-2 text-gray-100 focus:outline-none focus:border-gold-500"
            />
          </div>
        </div>
      </div>

      {/* Payment details */}
      <div>
        <h3 className="text-xl font-display text-gray-100 mb-4 border-b border-white/10 pb-2">Payment Details</h3>
        <PaymentElement id="payment-element" />
      </div>

      <button
        disabled={isLoading || !stripe || !elements}
        id="submit"
        className="btn-primary w-full py-4 text-lg font-bold flex justify-center items-center"
      >
        <span id="button-text">
          {isLoading ? (
            <div className="w-6 h-6 border-2 border-dark-300 border-t-white rounded-full animate-spin"></div>
          ) : (
            `Pay $${orderTotal.toFixed(2)}`
          )}
        </span>
      </button>

      {/* Show any error or success messages */}
      {message && (
        <div id="payment-message" className="text-red-400 text-sm text-center p-3 bg-red-400/10 rounded-lg border border-red-400/20">
          {message}
        </div>
      )}
    </form>
  );
};

export default CheckoutForm;
