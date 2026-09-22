import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'motion/react';
import { Send, Calendar, User, Mail, MessageSquare, Camera, CheckCircle2, ArrowRight, Phone, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import Modal from './Modal';

const bookingSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^\+?[1-9]\d{7,14}$/, 'Please enter a valid phone number'),
  sessionType: z.string().min(1, 'Please select a session type'),
  date: z.string().min(1, 'Please select a preferred date'),
  message: z.string().min(10, 'Please tell us a bit more about your vision'),
});

type BookingFormData = z.infer<typeof bookingSchema>;

export default function BookingForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
  });

  const onSubmit = async (data: BookingFormData) => {
    setError(null);
    
    try {
      const response = await fetch('https://formspree.io/f/vickphotography751@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
          session_type: data.sessionType,
          preferred_date: data.date,
          message: data.message,
          _subject: `New Booking Request from ${data.name}`
        })
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }
      
      setIsSubmitted(true);
      reset();
    } catch (err) {
      console.error('Failed to send email:', err);
      setError('Something went wrong. Please try again or contact us via WhatsApp.');
    }
  };

  return (
    <section id="book" className="py-24 px-6 bg-[#0a0a0a] relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-600/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-red-600 uppercase tracking-[0.2em] text-xs font-medium mb-2 block">Get in Touch</span>
            <h2 className="text-4xl md:text-5xl font-serif mb-6">Book Your Session</h2>
            <p className="text-zinc-400 font-light mb-8 leading-relaxed">
              Ready to capture something beautiful? Fill out the form below and I'll get back to you within 24 hours to discuss your vision and availability.
            </p>

            <div className="mb-12">
              <a href="https://wa.me/254717305574" target="_blank" rel="noopener noreferrer">
                <button className="bg-[#25D366] text-white border-none px-8 py-4 text-base rounded-xl cursor-pointer font-bold flex items-center gap-3 hover:bg-[#128C7E] transition-all duration-300 shadow-lg shadow-green-500/20 hover:-translate-y-1">
                  <span className="text-xl">💬</span>
                  Chat with us on WhatsApp
                </button>
              </a>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center border border-white/5">
                  <Camera className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h4 className="font-serif text-lg">Custom Vision</h4>
                  <p className="text-zinc-500 text-sm">Every session is uniquely tailored to your style.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center border border-white/5">
                  <Calendar className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h4 className="font-serif text-lg">Flexible Scheduling</h4>
                  <p className="text-zinc-500 text-sm">Weekend and evening slots available.</p>
                </div>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-zinc-900/30 backdrop-blur-xl p-10 md:p-14 border border-white/5 rounded-[2rem] shadow-2xl"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-bold flex items-center gap-2">
                    <User className="w-3 h-3" /> Full Name
                  </label>
                  <input
                    {...register('name')}
                    className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 focus:border-red-600 outline-none transition-all duration-300 text-sm"
                    placeholder="John Doe"
                  />
                  {errors.name && <p className="text-red-500 text-[10px] uppercase tracking-wider font-bold">{errors.name.message}</p>}
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-bold flex items-center gap-2">
                    <Mail className="w-3 h-3" /> Email Address
                  </label>
                  <input
                    {...register('email')}
                    className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 focus:border-red-600 outline-none transition-all duration-300 text-sm"
                    placeholder="john@example.com"
                  />
                  {errors.email && <p className="text-red-500 text-[10px] uppercase tracking-wider font-bold">{errors.email.message}</p>}
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-bold flex items-center gap-2">
                    <Phone className="w-3 h-3" /> Phone Number
                  </label>
                  <input
                    {...register('phone')}
                    className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 focus:border-red-600 outline-none transition-all duration-300 text-sm"
                    placeholder="+254 700 000000"
                  />
                  {errors.phone && <p className="text-red-500 text-[10px] uppercase tracking-wider font-bold">{errors.phone.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-bold flex items-center gap-2">
                    <Camera className="w-3 h-3" /> Session Type
                  </label>
                  <div className="relative">
                    <select
                      {...register('sessionType')}
                      className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 focus:border-red-600 outline-none transition-all duration-300 text-sm appearance-none"
                    >
                      <option value="">Select a type</option>
                      <option value="wedding">Wedding</option>
                      <option value="portrait">Portrait</option>
                      <option value="fashion">Fashion</option>
                      <option value="real-estate">Real Estate & Architecture</option>
                      <option value="family">Family & Milestones</option>
                      <option value="event">Event</option>
                    </select>
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500">
                      <ArrowRight className="w-4 h-4 rotate-90" />
                    </div>
                  </div>
                  {errors.sessionType && <p className="text-red-500 text-[10px] uppercase tracking-wider font-bold">{errors.sessionType.message}</p>}
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-bold flex items-center gap-2">
                    <Calendar className="w-3 h-3" /> Preferred Date
                  </label>
                  <input
                    type="date"
                    {...register('date')}
                    className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 focus:border-red-600 outline-none transition-all duration-300 text-sm color-scheme-dark"
                  />
                  {errors.date && <p className="text-red-500 text-[10px] uppercase tracking-wider font-bold">{errors.date.message}</p>}
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-bold flex items-center gap-2">
                  <MessageSquare className="w-3 h-3" /> Your Vision
                </label>
                <textarea
                  {...register('message')}
                  rows={4}
                  className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 focus:border-red-600 outline-none transition-all duration-300 text-sm resize-none"
                  placeholder="Tell me about your dream photoshoot..."
                />
                {errors.message && <p className="text-red-500 text-[10px] uppercase tracking-wider font-bold">{errors.message.message}</p>}
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-red-600/10 border border-red-600/20 rounded-2xl flex items-center gap-3 text-red-500 text-xs font-bold"
                >
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {error}
                </motion.div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-5 bg-red-600 text-white font-bold uppercase tracking-[0.3em] text-[10px] rounded-2xl hover:bg-white hover:text-black transition-all duration-500 disabled:opacity-50 flex items-center justify-center gap-3 shadow-xl shadow-red-600/20 group"
              >
                {isSubmitting ? 'Sending...' : 'Confirm Booking'}
                {!isSubmitting && <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
              </button>
            </form>
          </motion.div>
        </div>
      </div>

      <Modal isOpen={isSubmitted} onClose={() => setIsSubmitted(false)}>
        <div className="text-center py-6 relative overflow-hidden">
          {/* Confetti Effect */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ 
                opacity: 0, 
                scale: 0,
                x: 0,
                y: 0 
              }}
              animate={{ 
                opacity: [0, 1, 0],
                scale: [0, 1, 0.5],
                x: (Math.random() - 0.5) * 200,
                y: (Math.random() - 0.5) * 200,
                rotate: Math.random() * 360
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatDelay: 1,
                delay: i * 0.1
              }}
              className="absolute left-1/2 top-1/2 w-2 h-2 bg-red-600 rounded-sm pointer-events-none"
            />
          ))}

          <div className="w-24 h-24 bg-red-600/10 rounded-full flex items-center justify-center mx-auto mb-8 relative">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ 
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 0.1 
              }}
              className="absolute inset-0 bg-red-600/20 rounded-full"
            />
            <svg 
              className="w-12 h-12 text-red-600 relative z-10" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              strokeWidth={3}
            >
              <motion.path
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ 
                  duration: 0.8, 
                  ease: "easeInOut",
                  delay: 0.2
                }}
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h3 className="text-4xl font-serif mb-4">Request Sent!</h3>
            <p className="text-zinc-400 font-light leading-relaxed mb-10 max-w-sm mx-auto">
              Thank you for reaching out to Vick Photography. Your booking request has been received, and I'll be in touch within 24 hours to discuss the details.
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="w-full py-5 bg-red-600 text-white hover:bg-white hover:text-black transition-all duration-500 uppercase tracking-[0.3em] text-[10px] font-bold rounded-2xl shadow-xl shadow-red-600/20"
            >
              Back to Site
            </button>
          </motion.div>
        </div>
      </Modal>
    </section>
  );
}
