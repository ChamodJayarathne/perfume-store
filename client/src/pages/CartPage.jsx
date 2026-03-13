import { Link } from 'react-router-dom';
import { HiOutlineTrash, HiArrowRight } from 'react-icons/hi';
import { useCart } from '../context/CartContext';

const CartPage = () => {
  const { cartItems, removeItem, updateQuantity, clearCartItems, totalPrice, totalItems } = useCart();

  const shipping = totalPrice > 100 ? 0 : 15;
  const tax = totalPrice * 0.08;
  const orderTotal = totalPrice + shipping + tax;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <div className="text-7xl mb-6">🛍️</div>
          <h2 className="font-display text-3xl text-gray-200 mb-3">Your Bag is Empty</h2>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">
            Looks like you haven't added any fragrances yet. Explore our collection and find your perfect scent.
          </p>
          <Link to="/shop" className="btn-primary inline-flex items-center gap-2">
            Start Shopping
            <HiArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="section-padding">
        <div className="mb-8">
          <h1 className="font-display text-4xl font-bold text-gray-100 mb-2">Shopping Bag</h1>
          <p className="text-gray-500">{totalItems} item{totalItems !== 1 ? 's' : ''} in your bag</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item, i) => (
              <div
                key={`${item._id}-${item.selectedSize}`}
                className="glass rounded-2xl p-4 md:p-6 flex gap-4 md:gap-6 animate-fade-in"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {/* Image */}
                <Link to={`/product/${item._id}`} className="shrink-0">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden bg-dark-200">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                  </div>
                </Link>

                {/* Info */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-gold-500/70 text-sm tracking-wider uppercase">{item.brand}</p>
                    <Link to={`/product/${item._id}`} className="font-display text-lg font-semibold text-gray-100 hover:text-gold-300 transition-colors">
                      {item.name}
                    </Link>
                    <p className="text-gray-500 text-sm mt-1">{item.selectedSize}ml</p>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    {/* Quantity */}
                    <div className="flex items-center gap-0 rounded-lg overflow-hidden bg-dark-200">
                      <button
                        onClick={() => updateQuantity(item._id, item.selectedSize, item.quantity - 1)}
                        className="px-3 py-1.5 text-gray-400 hover:text-gold-400 transition-colors"
                      >
                        −
                      </button>
                      <span className="px-3 py-1.5 text-gray-100 font-medium text-sm">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item._id, item.selectedSize, item.quantity + 1)}
                        className="px-3 py-1.5 text-gray-400 hover:text-gold-400 transition-colors"
                      >
                        +
                      </button>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="text-gold-400 font-bold text-lg">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                      <button
                        onClick={() => removeItem(item._id, item.selectedSize)}
                        className="p-2 text-gray-500 hover:text-red-400 transition-colors"
                      >
                        <HiOutlineTrash className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <button
              onClick={clearCartItems}
              className="text-sm text-gray-500 hover:text-red-400 transition-colors"
            >
              Clear all items
            </button>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="glass rounded-2xl p-6 sticky top-28">
              <h2 className="font-display text-xl font-semibold text-gray-100 mb-6">Order Summary</h2>

              <div className="space-y-4 text-sm">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? <span className="text-green-400">Free</span> : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <hr className="border-white/10" />
                <div className="flex justify-between text-gray-100 font-semibold text-lg">
                  <span>Total</span>
                  <span className="text-gradient">${orderTotal.toFixed(2)}</span>
                </div>
              </div>

              {totalPrice < 100 && (
                <p className="text-xs text-gray-500 mt-4 p-3 bg-dark-200 rounded-lg">
                  💡 Add ${(100 - totalPrice).toFixed(2)} more for free shipping
                </p>
              )}

              <Link to="/checkout" className="btn-primary w-full mt-6 flex items-center justify-center gap-2">
                Proceed to Checkout
                <HiArrowRight className="w-5 h-5" />
              </Link>

              <Link to="/shop" className="block text-center text-sm text-gold-400 hover:text-gold-300 mt-4 transition-colors">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
