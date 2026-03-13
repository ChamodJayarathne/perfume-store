import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { HiArrowLeft, HiStar, HiOutlineStar, HiOutlineShoppingBag, HiCheck } from 'react-icons/hi';
import { fetchProduct } from '../api';
import { useCart } from '../context/CartContext';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await fetchProduct(id);
        setProduct(data);
        if (data.sizes?.length) setSelectedSize(data.sizes[0]);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const handleAddToCart = () => {
    if (product && selectedSize) {
      addItem(product, selectedSize.ml, quantity);
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-16">
        <div className="section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 animate-pulse">
            <div className="aspect-square bg-dark-200 rounded-3xl" />
            <div className="space-y-6 py-8">
              <div className="h-4 bg-dark-200 rounded w-1/4" />
              <div className="h-10 bg-dark-200 rounded w-3/4" />
              <div className="h-20 bg-dark-200 rounded" />
              <div className="h-8 bg-dark-200 rounded w-1/3" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😢</div>
          <h2 className="font-display text-2xl text-gray-300 mb-4">Product Not Found</h2>
          <Link to="/shop" className="btn-primary">Back to Shop</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="section-padding">
        {/* Breadcrumb */}
        <Link to="/shop" className="inline-flex items-center gap-2 text-gray-400 hover:text-gold-400 transition-colors mb-8">
          <HiArrowLeft className="w-5 h-5" />
          Back to Shop
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Image */}
          <div className="animate-fade-in">
            <div className="relative glass rounded-3xl overflow-hidden aspect-square">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.featured && (
                <div className="absolute top-4 left-4 px-4 py-2 bg-gold-500 text-dark-900 text-sm font-bold rounded-full uppercase tracking-wider">
                  Featured
                </div>
              )}
            </div>
          </div>

          {/* Details */}
          <div className="animate-slide-up py-4">
            <p className="text-gold-500 text-sm font-medium tracking-widest uppercase mb-2">
              {product.brand}
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-gray-100 mb-4">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }, (_, i) => (
                  i < Math.floor(product.rating)
                    ? <HiStar key={i} className="w-5 h-5 text-gold-400" />
                    : <HiOutlineStar key={i} className="w-5 h-5 text-gold-400/40" />
                ))}
              </div>
              <span className="text-gray-400 text-sm">
                {product.rating} ({product.numReviews} reviews)
              </span>
            </div>

            {/* Category & Gender */}
            <div className="flex gap-3 mb-6">
              <span className="px-4 py-1.5 glass rounded-full text-sm text-gray-300">
                {product.category}
              </span>
              <span className="px-4 py-1.5 glass rounded-full text-sm text-gray-300">
                {product.gender}
              </span>
            </div>

            <p className="text-gray-400 leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Fragrance Notes */}
            {product.notes && (
              <div className="glass rounded-2xl p-6 mb-8">
                <h3 className="font-display text-lg font-semibold text-gray-200 mb-4">Fragrance Notes</h3>
                <div className="grid grid-cols-3 gap-4">
                  {['top', 'middle', 'base'].map(type => (
                    product.notes[type]?.length > 0 && (
                      <div key={type}>
                        <p className="text-gold-400 text-xs font-semibold tracking-widest uppercase mb-2">
                          {type}
                        </p>
                        <div className="space-y-1">
                          {product.notes[type].map((note, i) => (
                            <p key={i} className="text-gray-400 text-sm">{note}</p>
                          ))}
                        </div>
                      </div>
                    )
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {product.sizes?.length > 0 && (
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-gray-300 mb-3 tracking-wider uppercase">Select Size</h3>
                <div className="flex gap-3">
                  {product.sizes.map(size => (
                    <button
                      key={size.ml}
                      onClick={() => setSelectedSize(size)}
                      className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                        selectedSize?.ml === size.ml
                          ? 'bg-gold-500 text-dark-900 shadow-lg shadow-gold-500/25'
                          : 'glass text-gray-300 hover:border-gold-500/30'
                      }`}
                    >
                      {size.ml}ml — ${size.price}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Price */}
            <div className="mb-8">
              <span className="text-3xl font-bold text-gradient">
                ${selectedSize?.price || product.price}
              </span>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center glass rounded-xl overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-3 text-gray-400 hover:text-gold-400 transition-colors text-xl"
                >
                  −
                </button>
                <span className="px-6 py-3 text-gray-100 font-semibold min-w-[60px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-3 text-gray-400 hover:text-gold-400 transition-colors text-xl"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={added}
                className={`flex-1 flex items-center justify-center gap-3 py-3 px-8 rounded-xl font-semibold text-lg
                  transition-all duration-300 ${
                    added
                      ? 'bg-green-500 text-white'
                      : 'bg-gradient-to-r from-gold-500 to-gold-600 text-dark-900 hover:from-gold-400 hover:to-gold-500 hover:shadow-lg hover:shadow-gold-500/25'
                  }`}
              >
                {added ? (
                  <>
                    <HiCheck className="w-6 h-6" />
                    Added to Bag!
                  </>
                ) : (
                  <>
                    <HiOutlineShoppingBag className="w-6 h-6" />
                    Add to Bag
                  </>
                )}
              </button>
            </div>

            {/* Stock */}
            <p className={`mt-4 text-sm ${product.stock > 10 ? 'text-green-400' : product.stock > 0 ? 'text-yellow-400' : 'text-red-400'}`}>
              {product.stock > 10 ? '✓ In Stock' : product.stock > 0 ? `Only ${product.stock} left` : '✗ Out of Stock'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
