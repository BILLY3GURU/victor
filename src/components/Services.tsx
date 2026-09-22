import { motion } from 'motion/react';
import { SERVICES } from '../constants';

export default function Services() {
  return (
    <section id="services" className="py-24 px-6 bg-zinc-950 relative overflow-hidden">
      <div className="absolute top-24 left-1/2 -translate-x-1/2 text-[15vw] font-serif font-bold text-outline pointer-events-none select-none uppercase tracking-widest opacity-50">
        Services
      </div>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-xl">
            <span className="text-red-600 uppercase tracking-[0.2em] text-xs font-medium mb-2 block">Our Expertise</span>
            <h2 className="text-4xl md:text-5xl font-serif">Photography Services</h2>
          </div>
          <p className="text-zinc-400 max-w-md font-light">
            We offer a range of specialized photography packages tailored to your needs, ensuring every moment is captured with precision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative overflow-hidden bg-zinc-900/50 backdrop-blur-sm border border-white/5 hover:border-red-600/30 transition-all duration-500 rounded-3xl"
            >
              <div className="flex flex-col md:flex-row h-full">
                <div className="w-full md:w-1/2 h-72 md:h-auto overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
                  <span className="text-red-600 text-[10px] uppercase tracking-[0.4em] font-bold mb-4 block">Package</span>
                  <h3 className="text-3xl font-serif mb-4 group-hover:text-red-600 transition-colors">{service.title}</h3>
                  <p className="text-zinc-400 text-sm font-light mb-8 leading-relaxed">
                    {service.description}
                  </p>
                  <div className="mt-auto flex items-center justify-end pt-6 border-t border-white/5">
                    <a
                      href="#book"
                      className="text-[10px] uppercase tracking-[0.2em] font-bold text-red-600 hover:text-white transition-colors"
                    >
                      Book Now
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
