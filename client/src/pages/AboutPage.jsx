import { Link } from 'react-router-dom';
import { HiArrowRight } from 'react-icons/hi';

const values = [
  {
    icon: '✦',
    title: 'Artisan Craftsmanship',
    desc: 'Each fragrance in our collection is meticulously crafted by master perfumers with decades of experience.',
  },
  {
    icon: '◆',
    title: 'Premium Ingredients',
    desc: 'We source only the finest raw materials from the most prestigious regions around the world.',
  },
  {
    icon: '❋',
    title: 'Timeless Elegance',
    desc: 'Our curation celebrates both classic masterpieces and innovative modern compositions.',
  },
  {
    icon: '◈',
    title: 'Exclusive Experience',
    desc: 'From packaging to delivery, every touchpoint is designed to be extraordinary.',
  },
];

const AboutPage = () => {
  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-dark-400 via-dark-500 to-dark-300" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl animate-float" />

        <div className="relative section-padding text-center">
          <span className="text-gold-500 text-sm font-medium tracking-widest uppercase">Our Story</span>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-gray-100 mt-3 mb-6 animate-slide-up">
            The Art of
            <br />
            <span className="text-gradient">Fine Fragrance</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: '0.2s' }}>
            Founded in 2020, Parfumé was born from a passion for exceptional scents and a desire
            to make the world's finest fragrances accessible to discerning collectors everywhere.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24">
        <div className="section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-gold-500 text-sm font-medium tracking-widest uppercase">Our Mission</span>
              <h2 className="font-display text-4xl font-bold text-gray-100 mt-3 mb-6">
                Redefining the Fragrance Experience
              </h2>
              <div className="space-y-4 text-gray-400 leading-relaxed">
                <p>
                  At Parfumé, we believe that a fragrance is more than a scent — it's an expression of identity,
                  a memory captured in a bottle, and a statement of personal luxury.
                </p>
                <p>
                  Our team of fragrance experts travels the globe to discover and curate the most exceptional
                  perfumes from legendary houses and emerging artisan creators. We seek out compositions that
                  tell a story, evoke emotion, and stand the test of time.
                </p>
                <p>
                  Every fragrance in our collection has been carefully evaluated for quality, longevity,
                  and the ability to captivate the senses. We don't just sell perfume — we deliver an experience.
                </p>
              </div>
            </div>

            <div className="glass rounded-3xl p-1 animate-glow">
              <img
                src="https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=600"
                alt="Luxury perfume bottles"
                className="w-full h-96 object-cover rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-gradient-to-b from-dark-500 to-dark-400">
        <div className="section-padding">
          <div className="text-center mb-16">
            <span className="text-gold-500 text-sm font-medium tracking-widest uppercase">What We Stand For</span>
            <h2 className="font-display text-4xl font-bold text-gray-100 mt-3">Our Values</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <div
                key={i}
                className="glass rounded-2xl p-8 text-center card-hover animate-slide-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="text-4xl mb-4 text-gold-400">{v.icon}</div>
                <h3 className="font-display text-lg font-semibold text-gray-100 mb-3">{v.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="section-padding text-center">
          <h2 className="font-display text-4xl font-bold text-gradient mb-4">
            Ready to Discover Your Scent?
          </h2>
          <p className="text-gray-400 max-w-lg mx-auto mb-8">
            Explore our curated collection and find the fragrance that speaks to your soul.
          </p>
          <Link to="/shop" className="btn-primary inline-flex items-center gap-2 text-lg">
            Explore Collection
            <HiArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
