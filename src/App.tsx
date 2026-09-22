import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import VideoShowcase from './components/VideoShowcase';
import Services from './components/Services';
import Process from './components/Process';
import Testimonials from './components/Testimonials';
import BookingForm from './components/BookingForm';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import FloatingContact from './components/WhatsAppButton';
import { motion, useScroll, useSpring } from 'motion/react';

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="relative min-h-screen selection:bg-red-600 selection:text-white">
      <CustomCursor />
      <FloatingContact />
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-red-600 z-[60] origin-left"
        style={{ scaleX }}
      />

      <Navbar />
      
      <main>
        <Hero />
        
        {/* Stats Section - Refined */}
        <section className="py-24 px-6 bg-black relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.05)_0%,transparent_70%)]" />
          <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
            {[
              { label: 'Projects Done', value: '150+' },
              { label: 'Happy Clients', value: '600+' },
              { label: 'Awards Won', value: '12' },
              { label: 'Years Experience', value: '8+' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center group"
              >
                <h3 className="text-5xl md:text-7xl font-serif font-bold text-white mb-2 group-hover:text-red-600 transition-colors duration-500">
                  {stat.value}
                </h3>
                <p className="text-zinc-600 text-[10px] uppercase tracking-[0.4em] font-bold">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* About Section - Refined */}
        <section id="about" className="py-32 px-6 bg-[#0a0a0a] relative overflow-hidden">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://res.cloudinary.com/dpskjlq9m/image/upload/q_auto,f_auto,w_1200/v1790012649/NNP_6167rrrrrr.jpg_oouwdh.jpg"
                  alt="Vick Photographer"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 transform hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-red-600/20 blur-[80px] rounded-full pointer-events-none" />
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-red-600/10 blur-[80px] rounded-full pointer-events-none" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-red-600 uppercase tracking-[0.4em] text-[10px] font-bold mb-4 block">The Storyteller</span>
              <h2 className="text-5xl md:text-7xl font-serif mb-8 leading-tight tracking-tight">
                Crafting <br />
                <span className="italic text-red-600">Timeless Memories</span>
              </h2>
              <p className="text-zinc-400 text-lg font-light leading-relaxed mb-8">
                Based in the heart of Kenya, I believe every frame should tell a story that resonates across generations. My approach combines technical precision with a deep understanding of human connection, ensuring that your most precious moments are preserved with the elegance they deserve.
              </p>
              <div className="grid grid-cols-2 gap-8 mb-12">
                <div>
                  <h4 className="text-white font-serif text-xl mb-2 italic">Authenticity</h4>
                  <p className="text-zinc-500 text-sm">Capturing raw, unscripted emotions as they happen.</p>
                </div>
                <div>
                  <h4 className="text-white font-serif text-xl mb-2 italic">Excellence</h4>
                  <p className="text-zinc-500 text-sm">Delivering high-end, professional results every time.</p>
                </div>
              </div>
              <a
                href="#book"
                className="inline-block px-12 py-5 bg-red-600 text-white font-bold uppercase tracking-[0.2em] text-xs rounded-full hover:bg-white hover:text-black transition-all duration-500 shadow-lg shadow-red-600/20"
              >
                Let's Create Together
              </a>
            </motion.div>
          </div>
        </section>

        <Gallery />
        <VideoShowcase />
        <Process />
        <Services />
        <Testimonials />
        <BookingForm />
      </main>

      <Footer />
    </div>
  );
}
