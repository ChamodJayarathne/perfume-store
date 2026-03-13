import { useState } from 'react';
import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker, HiOutlineClock } from 'react-icons/hi';

const contactInfo = [
  { icon: HiOutlineLocationMarker, label: 'Visit Us', text: '123 Luxury Avenue, New York, NY 10001' },
  { icon: HiOutlineMail, label: 'Email Us', text: 'contact@parfume.com' },
  { icon: HiOutlinePhone, label: 'Call Us', text: '+1 (555) 123-4567' },
  { icon: HiOutlineClock, label: 'Hours', text: 'Mon - Sat: 10:00 AM - 8:00 PM' },
];

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Header */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-dark-400 via-dark-500 to-dark-300" />
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl" />
        <div className="relative section-padding text-center">
          <span className="text-gold-500 text-sm font-medium tracking-widest uppercase">Get in Touch</span>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-gray-100 mt-3 mb-4 animate-slide-up">
            Contact Us
          </h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto animate-slide-up" style={{ animationDelay: '0.2s' }}>
            Have a question about a fragrance? We'd love to hear from you.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="space-y-6">
              {contactInfo.map((info, i) => (
                <div
                  key={i}
                  className="glass rounded-2xl p-6 flex items-start gap-4 card-hover animate-slide-up"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="w-12 h-12 rounded-xl bg-gold-500/10 flex items-center justify-center shrink-0">
                    <info.icon className="w-6 h-6 text-gold-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-100 mb-1">{info.label}</h3>
                    <p className="text-gray-400 text-sm">{info.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="glass rounded-2xl p-8 animate-fade-in">
                <h2 className="font-display text-2xl font-bold text-gray-100 mb-6">Send us a Message</h2>

                {submitted && (
                  <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400 text-sm animate-slide-down">
                    ✓ Message sent successfully! We'll get back to you soon.
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="text-sm text-gray-400 mb-2 block">Your Name</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className="input-field"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-400 mb-2 block">Email Address</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@example.com"
                        className="input-field"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm text-gray-400 mb-2 block">Subject</label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="How can we help?"
                      className="input-field"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm text-gray-400 mb-2 block">Message</label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us more..."
                      rows={5}
                      className="input-field resize-none"
                      required
                    />
                  </div>

                  <button type="submit" className="btn-primary">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
