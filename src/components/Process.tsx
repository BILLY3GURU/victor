import { motion } from 'motion/react';
import { PROCESS_STEPS } from '../constants';

export default function Process() {
  return (
    <section className="py-24 px-6 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-red-600 uppercase tracking-[0.2em] text-xs font-medium mb-2 block">How We Work</span>
          <h2 className="text-4xl md:text-5xl font-serif">The Creative Process</h2>
          <div className="w-20 h-[1px] bg-red-600 mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {PROCESS_STEPS.map((step, i) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative group p-8 bg-zinc-900/30 rounded-3xl border border-white/5 hover:border-red-600/20 transition-all duration-500"
            >
              <div className="mb-8 relative">
                <span className="text-7xl font-serif font-bold text-white/5 group-hover:text-red-600/10 transition-colors duration-500">
                  {step.number}
                </span>
                <div className="absolute top-1/2 left-0 w-8 h-[1px] bg-red-600 transform -translate-y-1/2 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </div>
              <h3 className="text-2xl font-serif mb-4 group-hover:text-red-600 transition-colors">{step.title}</h3>
              <p className="text-zinc-500 text-sm font-light leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
