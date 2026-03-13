import { Link } from 'react-router-dom';
import { HiArrowRight as ArrowIcon } from 'react-icons/hi';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-500 to-dark-300" />
        {/* Animated orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gold-600/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-amber-500/3 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />
        {/* Decorative lines */}
        <div className="absolute top-0 left-1/2 w-px h-40 bg-gradient-to-b from-transparent to-gold-500/20" />
        <div className="absolute bottom-0 left-1/2 w-px h-40 bg-gradient-to-t from-transparent to-gold-500/20" />
      </div>

      <div className="relative section-padding text-center py-32 md:py-0">
        {/* Top Label */}
        <div className="inline-flex items-center gap-3 glass rounded-full px-6 py-2 mb-8 animate-fade-in">
          <span className="w-2 h-2 bg-gold-400 rounded-full animate-pulse" />
          <span className="text-sm text-gold-300 font-medium tracking-wider uppercase">Luxury Fragrance Collection</span>
        </div>

        {/* Main Heading */}
        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6 animate-slide-up">
          <span className="text-gray-100">Discover Your</span>
          <br />
          <span className="text-gradient">Signature Scent</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed animate-slide-up"
           style={{ animationDelay: '0.2s' }}>
          Explore our curated collection of the world's most exquisite fragrances. 
          From timeless classics to modern masterpieces.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up"
             style={{ animationDelay: '0.4s' }}>
          <Link to="/shop" className="btn-primary flex items-center gap-2 text-lg">
            Explore Collection
            <ArrowIcon className="w-5 h-5" />
          </Link>
          <Link to="/about" className="btn-outline">
            Our Story
          </Link>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-center gap-8 md:gap-16 mt-16 pt-16 border-t border-white/5 animate-fade-in"
             style={{ animationDelay: '0.6s' }}>
          {[
            { number: '200+', label: 'Fragrances' },
            { number: '50+', label: 'Luxury Brands' },
            { number: '10K+', label: 'Happy Clients' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="font-display text-3xl md:text-4xl font-bold text-gradient">{stat.number}</div>
              <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
