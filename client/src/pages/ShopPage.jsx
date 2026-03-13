import { useState, useEffect } from 'react';
import { HiOutlineSearch, HiOutlineFilter, HiOutlineX } from 'react-icons/hi';
import ProductCard from '../components/ProductCard';
import { fetchProducts } from '../api';

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({ category: '', gender: '', brand: '', sort: '' });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const params = { ...filters, search: search || undefined };
        Object.keys(params).forEach(key => !params[key] && delete params[key]);
        const { data } = await fetchProducts(params);
        setProducts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    const debounce = setTimeout(load, 300);
    return () => clearTimeout(debounce);
  }, [search, filters]);

  const clearFilters = () => {
    setFilters({ category: '', gender: '', brand: '', sort: '' });
    setSearch('');
  };

  const hasActiveFilters = Object.values(filters).some(v => v) || search;

  const categories = ['Eau de Parfum', 'Eau de Toilette', 'Eau de Cologne', 'Parfum', 'Body Mist'];
  const genders = ['Men', 'Women', 'Unisex'];
  const sortOptions = [
    { value: '', label: 'Newest' },
    { value: 'price_asc', label: 'Price: Low to High' },
    { value: 'price_desc', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'name', label: 'Name A-Z' },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="section-padding">
        {/* Header */}
        <div className="mb-12">
          <span className="text-gold-500 text-sm font-medium tracking-widest uppercase">Collection</span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-gray-100 mt-2 mb-4">
            Our Fragrances
          </h1>
          <p className="text-gray-500 max-w-xl">
            Discover the perfect scent from our curated collection of world-class perfumes.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <HiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
            <input
              type="text"
              placeholder="Search fragrances, brands..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-field pl-12 rounded-xl"
            />
          </div>

          <select
            value={filters.sort}
            onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
            className="input-field rounded-xl md:w-52 cursor-pointer"
          >
            {sortOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`btn-outline flex items-center gap-2 md:w-auto ${showFilters ? 'border-gold-400 text-gold-400' : ''}`}
          >
            <HiOutlineFilter className="w-5 h-5" />
            Filters
          </button>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="glass rounded-2xl p-6 mb-8 animate-slide-down">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="text-sm text-gray-400 block mb-2 font-medium">Category</label>
                <div className="flex flex-wrap gap-2">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setFilters({ ...filters, category: filters.category === cat ? '' : cat })}
                      className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                        filters.category === cat
                          ? 'bg-gold-500 text-dark-900 font-semibold'
                          : 'bg-dark-200 text-gray-400 hover:bg-dark-100 hover:text-gray-200'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-400 block mb-2 font-medium">Gender</label>
                <div className="flex flex-wrap gap-2">
                  {genders.map(g => (
                    <button
                      key={g}
                      onClick={() => setFilters({ ...filters, gender: filters.gender === g ? '' : g })}
                      className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                        filters.gender === g
                          ? 'bg-gold-500 text-dark-900 font-semibold'
                          : 'bg-dark-200 text-gray-400 hover:bg-dark-100 hover:text-gray-200'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-end">
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="flex items-center gap-2 text-gold-400 hover:text-gold-300 text-sm transition-colors"
                  >
                    <HiOutlineX className="w-4 h-4" />
                    Clear all filters
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-500 text-sm">
            {loading ? 'Loading...' : `${products.length} fragrance${products.length !== 1 ? 's' : ''} found`}
          </p>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
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
        ) : products.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="font-display text-2xl text-gray-300 mb-2">No fragrances found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your filters or search terms.</p>
            <button onClick={clearFilters} className="btn-primary">Clear Filters</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product, i) => (
              <div key={product._id} className="animate-fade-in" style={{ animationDelay: `${i * 0.05}s` }}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopPage;
