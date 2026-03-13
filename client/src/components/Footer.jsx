import { Link } from 'react-router-dom';
import { HiOutlineMail } from 'react-icons/hi';
import { FaInstagram, FaFacebookF, FaTwitter, FaPinterestP } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-dark-400 border-t border-white/5">
      {/* Newsletter Bar */}
      <div className="bg-gradient-to-r from-dark-300 via-dark-200 to-dark-300 py-12">
        <div className="section-padding text-center">
          <h3 className="font-display text-2xl md:text-3xl font-bold text-gradient mb-3">
            Join Our Exclusive List
          </h3>
          <p className="text-gray-400 mb-6 max-w-lg mx-auto">
            Be the first to discover new fragrances, exclusive offers, and the art of perfumery.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <div className="relative flex-1">
              <HiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
              <input
                type="email"
                placeholder="Enter your email"
                className="input-field pl-12 rounded-full"
              />
            </div>
            <button className="btn-primary whitespace-nowrap">Subscribe</button>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="section-padding py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center">
                <span className="text-dark-900 font-display font-bold">P</span>
              </div>
              <span className="font-display text-xl font-bold text-gradient">Parfumé</span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Curating the world's finest fragrances since 2020. Each scent is a journey, each bottle a masterpiece.
            </p>
            <div className="flex gap-3">
              {[FaInstagram, FaFacebookF, FaTwitter, FaPinterestP].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center
                   text-gray-400 hover:text-gold-400 hover:border-gold-500/30 transition-all duration-300">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold text-gray-100 mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {['Home', 'Shop', 'About Us', 'Contact'].map(link => (
                <li key={link}>
                  <Link to={`/${link === 'Home' ? '' : link.toLowerCase().replace(' ', '')}`}
                    className="text-gray-500 hover:text-gold-400 transition-colors duration-300 text-sm">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-display text-lg font-semibold text-gray-100 mb-5">Categories</h4>
            <ul className="space-y-3">
              {['Eau de Parfum', 'Eau de Toilette', 'For Men', 'For Women', 'Unisex'].map(cat => (
                <li key={cat}>
                  <Link to="/shop" className="text-gray-500 hover:text-gold-400 transition-colors duration-300 text-sm">
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg font-semibold text-gray-100 mb-5">Contact Us</h4>
            <ul className="space-y-3 text-sm text-gray-500">
              <li>123 Luxury Avenue</li>
              <li>New York, NY 10001</li>
              <li className="text-gold-400">contact@parfume.com</li>
              <li>+1 (555) 123-4567</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/5 py-6">
        <div className="section-padding flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-sm">
            © 2026 Parfumé. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-600">
            <a href="#" className="hover:text-gray-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-400 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
