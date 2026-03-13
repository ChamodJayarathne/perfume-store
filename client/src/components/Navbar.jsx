import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HiOutlineShoppingBag, HiOutlineUser, HiOutlineMenu, HiOutlineX } from 'react-icons/hi';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { totalItems } = useCart();
  const { user, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled
        ? 'bg-dark-500/95 backdrop-blur-xl shadow-lg shadow-black/20 py-3'
        : 'bg-transparent py-5'
    }`}>
      <div className="section-padding flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center
                          group-hover:shadow-lg group-hover:shadow-gold-500/30 transition-all duration-300">
            <span className="text-dark-900 font-display font-bold text-lg">P</span>
          </div>
          <span className="font-display text-2xl font-bold text-gradient">Parfumé</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`relative font-medium transition-colors duration-300 ${
                location.pathname === link.path
                  ? 'text-gold-400'
                  : 'text-gray-300 hover:text-gold-400'
              }`}
            >
              {link.name}
              {location.pathname === link.path && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-gold-400 to-gold-600 rounded-full" />
              )}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Link to="/cart" className="relative p-2 text-gray-300 hover:text-gold-400 transition-colors duration-300">
            <HiOutlineShoppingBag className="w-6 h-6" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-gold-500 text-dark-900 text-xs font-bold rounded-full
                             flex items-center justify-center animate-scale-in">
                {totalItems}
              </span>
            )}
          </Link>

          {user ? (
            <div className="hidden md:flex items-center gap-3">
              <span className="text-sm text-gray-400">Hi, {user.name?.split(' ')[0]}</span>
              <button onClick={logout} className="text-sm text-gold-400 hover:text-gold-300 transition-colors">
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="hidden md:flex items-center gap-2 text-gray-300 hover:text-gold-400 transition-colors duration-300">
              <HiOutlineUser className="w-5 h-5" />
              <span className="text-sm font-medium">Login</span>
            </Link>
          )}

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="md:hidden p-2 text-gray-300 hover:text-gold-400 transition-colors"
          >
            {isMobileOpen ? <HiOutlineX className="w-6 h-6" /> : <HiOutlineMenu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileOpen && (
        <div className="md:hidden glass-dark mt-2 mx-4 rounded-2xl p-6 animate-slide-down">
          <div className="flex flex-col gap-4">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-lg font-medium py-2 transition-colors ${
                  location.pathname === link.path ? 'text-gold-400' : 'text-gray-300'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <hr className="border-white/10" />
            {user ? (
              <button onClick={logout} className="text-left text-gold-400 py-2">Logout</button>
            ) : (
              <Link to="/login" className="text-gold-400 py-2 font-medium">Login / Register</Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
