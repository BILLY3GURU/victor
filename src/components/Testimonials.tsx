import { motion } from 'motion/react';
import { TESTIMONIALS } from '../constants';
import { Quote } from 'lucide-react';

export default function Testimonials() {
  return (
    <section className="py-24 px-6 bg-zinc-950">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-red-600 uppercase tracking-[0.2em] text-xs font-medium mb-2 block">Client Love</span>
          <h2 className="text-4xl md:text-5xl font-serif">What They Say</h2>
          <div className="w-20 h-[1px] bg-red-600 mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial, i) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-zinc-900/30 backdrop-blur-sm p-12 border border-white/5 rounded-3xl relative group hover:border-red-600/20 transition-all duration-500"
            >
              <Quote className="w-12 h-12 text-red-600/5 absolute top-10 right-10 group-hover:text-red-600/10 transition-colors" />
              <p className="text-zinc-400 font-light italic mb-10 leading-relaxed relative z-10 text-lg">
                "{testimonial.content}"
              </p>
              <div className="flex items-center gap-5">
                <div className="relative">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 border border-white/10"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-red-600 rounded-full border-2 border-black" />
                </div>
                <div>
                  <h4 className="font-serif text-xl text-white">{testimonial.name}</h4>
                  <p className="text-red-600 text-[10px] uppercase tracking-[0.3em] font-bold">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
