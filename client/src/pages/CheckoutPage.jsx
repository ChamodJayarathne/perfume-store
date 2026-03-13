import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { createPaymentIntent } from '../api';
import CheckoutForm from '../components/CheckoutForm';

// Initialize Stripe outside of component
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const CheckoutPage = () => {
  const [clientSecret, setClientSecret] = useState('');
  const { cartItems, totalPrice } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const shipping = totalPrice > 100 ? 0 : 15;
  const tax = totalPrice * 0.08;
  const orderTotal = totalPrice + shipping + tax;

  useEffect(() => {
    // Redirect if cart is empty or user is not logged in
    if (cartItems.length === 0) {
      navigate('/cart');
      return;
    }
    
    if (!user) {
      navigate('/login?redirect=checkout');
      return;
    }

    // Create PaymentIntent as soon as the page loads
    const fetchPaymentIntent = async () => {
      try {
        const { data } = await createPaymentIntent({ amount: orderTotal });
        setClientSecret(data.clientSecret);
      } catch (error) {
        console.error('Error creating payment intent:', error);
      }
    };

    fetchPaymentIntent();
  }, [cartItems, navigate, orderTotal, user]);

  const appearance = {
    theme: 'night',
    variables: {
      colorPrimary: '#D4AF37', // Gold
      colorBackground: '#1A1A1A',
      colorText: '#F3F4F6',
      colorDanger: '#EF4444',
      fontFamily: 'Inter, system-ui, sans-serif',
    },
  };

  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="section-padding max-w-3xl mx-auto">
        <h1 className="font-display text-4xl font-bold text-gray-100 mb-8">Secure Checkout</h1>
        
        <div className="glass rounded-2xl p-6 md:p-8 animate-fade-in">
          {clientSecret ? (
            <Elements options={options} stripe={stripePromise}>
              <CheckoutForm orderTotal={orderTotal} />
            </Elements>
          ) : (
            <div className="flex justify-center py-12">
              <div className="w-12 h-12 border-4 border-gold-500/30 border-t-gold-500 rounded-full animate-spin"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
