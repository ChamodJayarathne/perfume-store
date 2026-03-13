import { Link } from 'react-router-dom';
import { HiOutlineStar, HiStar, HiOutlineShoppingBag } from 'react-icons/hi';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addItem } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const defaultSize = product.sizes?.[0]?.ml || 50;
    addItem(product, defaultSize);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      i < Math.floor(rating)
        ? <HiStar key={i} className="w-4 h-4 text-gold-400" />
        : <HiOutlineStar key={i} className="w-4 h-4 text-gold-400/40" />
    ));
  };

  return (
    <Link to={`/product/${product._id}`} className="group block">
      <div className="glass rounded-2xl overflow-hidden card-hover">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-dark-200">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {/* Overlay on Hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 via-transparent to-transparent
                          opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Quick Add Button */}
          <button
            onClick={handleAddToCart}
            className="absolute bottom-4 left-4 right-4 py-3 bg-gold-500/90 backdrop-blur-sm text-dark-900
                       font-semibold rounded-xl flex items-center justify-center gap-2
                       translate-y-full group-hover:translate-y-0 transition-transform duration-500
                       hover:bg-gold-400"
          >
            <HiOutlineShoppingBag className="w-5 h-5" />
            Add to Bag
          </button>

          {/* Featured Badge */}
          {product.featured && (
            <div className="absolute top-3 left-3 px-3 py-1 bg-gold-500 text-dark-900 text-xs font-bold rounded-full uppercase tracking-wider">
              Featured
            </div>
          )}

          {/* Gender Badge */}
          <div className="absolute top-3 right-3 px-3 py-1 glass text-xs text-gray-300 rounded-full">
            {product.gender}
          </div>
        </div>

        {/* Info */}
        <div className="p-5">
          <p className="text-gold-500/70 text-sm font-medium tracking-wider uppercase mb-1">
            {product.brand}
          </p>
          <h3 className="font-display text-lg font-semibold text-gray-100 mb-2 group-hover:text-gold-300 transition-colors">
            {product.name}
          </h3>

          <div className="flex items-center gap-1 mb-3">
            {renderStars(product.rating)}
            <span className="text-gray-500 text-sm ml-1">({product.numReviews})</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-1">
              <span className="text-gold-400 text-xl font-bold">${product.price}</span>
              {product.sizes?.length > 1 && (
                <span className="text-gray-600 text-xs">from</span>
              )}
            </div>
            <span className="text-gray-600 text-sm">
              {product.sizes?.[0]?.ml || 50}ml
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
