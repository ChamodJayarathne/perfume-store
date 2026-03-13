import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HiArrowRight } from 'react-icons/hi';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import { fetchFeaturedProducts } from '../api';

const categories = [
  { name: 'Eau de Parfum', desc: 'Long-lasting luxury', icon: '✦' },
  { name: 'Eau de Toilette', desc: 'Light & refreshing', icon: '◆' },
  { name: 'For Her', desc: 'Feminine elegance', icon: '❋' },
  { name: 'For Him', desc: 'Bold & masculine', icon: '◈' },
];

const testimonials = [
  {
    name: 'Sophia R.',
    text: 'The collection is extraordinary. I found my signature scent within minutes. The presentation is absolutely stunning.',
    rating: 5,
  },
  {
    name: 'James M.',
    text: 'Premium fragrances with exceptional customer service. Every bottle feels like a curated experience from start to finish.',
    rating: 5,
  },
  {
    name: 'Elena K.',
    text: 'I\'ve been a loyal customer for two years. The quality is unmatched, and the exclusive collections are always spectacular.',
    rating: 5,
  },
];

const HomePage = () => {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await fetchFeaturedProducts();
        setFeatured(data);
      } catch (err) {
        console.error('Failed to load featured products:', err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div>
      <Hero />

      {/* Featured Products */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-dark-500 via-dark-400 to-dark-500" />
        <div className="relative section-padding">
          <div className="text-center mb-16">
            <span className="text-gold-500 text-sm font-medium tracking-widest uppercase">Curated Selection</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-100 mt-3 mb-4">
              Featured Fragrances
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Handpicked masterpieces from the world's most prestigious perfume houses.
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="glass rounded-2xl overflow-hidden animate-pulse">
                  <div className="aspect-square bg-dark-200" />
                  <div className="p-5 space-y-3">
                    <div className="h-3 bg-dark-200 rounded w-1/3" />
                    <div className="h-5 bg-dark-200 rounded w-2/3" />
                    <div className="h-4 bg-dark-200 rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featured.slice(0, 8).map((product, i) => (
                <div key={product._id} className="animate-slide-up" style={{ animationDelay: `${i * 0.1}s` }}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link to="/shop" className="btn-outline inline-flex items-center gap-2">
              View All Fragrances
              <HiArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-24">
        <div className="section-padding">
          <div className="text-center mb-16">
            <span className="text-gold-500 text-sm font-medium tracking-widest uppercase">Browse By</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-100 mt-3">
              Categories
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat, i) => (
              <Link
                to="/shop"
                key={cat.name}
                className="group glass rounded-2xl p-8 text-center card-hover animate-slide-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="text-4xl mb-4 text-gold-400 group-hover:scale-125 transition-transform duration-500">
                  {cat.icon}
                </div>
                <h3 className="font-display text-xl font-semibold text-gray-100 mb-2 group-hover:text-gold-300 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-gray-500 text-sm">{cat.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gradient-to-b from-dark-500 to-dark-400">
        <div className="section-padding">
          <div className="text-center mb-16">
            <span className="text-gold-500 text-sm font-medium tracking-widest uppercase">Client Stories</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-100 mt-3">
              What Our Clients Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="glass rounded-2xl p-8 animate-slide-up"
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }, (_, i) => (
                    <span key={i} className="text-gold-400">★</span>
                  ))}
                </div>
                <p className="text-gray-300 leading-relaxed mb-6 italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center">
                    <span className="text-dark-900 font-bold text-sm">{t.name[0]}</span>
                  </div>
                  <span className="text-gray-400 font-medium">{t.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-24">
        <div className="section-padding">
          <div className="relative glass rounded-3xl p-12 md:p-20 text-center overflow-hidden">
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-gold-500/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-gold-600/5 rounded-full blur-3xl" />
            <div className="relative">
              <h2 className="font-display text-3xl md:text-5xl font-bold text-gradient mb-4">
                Find Your Perfect Match
              </h2>
              <p className="text-gray-400 max-w-lg mx-auto mb-8 text-lg">
                Let our experts guide you to the fragrance that speaks to your soul.
              </p>
              <Link to="/shop" className="btn-primary inline-flex items-center gap-2 text-lg">
                Start Exploring
                <HiArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
