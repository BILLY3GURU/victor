import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useRef } from 'react';

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section ref={ref} className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background Image */}
      <motion.div 
        style={{ y }}
        className="absolute inset-0 z-0"
      >
        <img
          src="https://res.cloudinary.com/dpskjlq9m/image/upload/q_auto,f_auto,w_1920/v1790012739/DSC_8623.JPG_jyeuwq.jpg"
          alt="Vick Photography Hero"
          className="w-full h-full object-cover scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[#0a0a0a]" />
      </motion.div>

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <span className="inline-block text-red-600 uppercase tracking-[0.5em] text-xs font-bold mb-6">
            Est. 2019 — Kenya
          </span>
          <h1 className="text-7xl md:text-9xl font-serif font-bold mb-8 leading-[0.9] tracking-tighter">
            Vick <br />
            <span className="italic text-red-600"></span>
          </h1>
          <p className="text-zinc-300 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-light tracking-widest uppercase leading-relaxed">
            Capturing the soul of Kenya through a lens of pure emotion.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a
              href="#book"
              className="px-10 py-4 bg-red-600 text-white font-bold uppercase tracking-widest text-sm hover:bg-white hover:text-black transition-all duration-500 flex items-center gap-3 group rounded-full shadow-lg shadow-red-600/20"
            >
              Book Now
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#portfolio"
              className="px-10 py-4 border border-white/30 hover:border-red-600 transition-all duration-500 uppercase tracking-widest text-sm font-medium text-white rounded-full backdrop-blur-sm hover:bg-white/5"
            >
              Explore Work
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-red-600 to-transparent" />
      </motion.div>
    </section>
  );
}
