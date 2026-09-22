import { motion } from 'motion/react';
import { MessageCircle, Phone } from 'lucide-react';

export default function FloatingContact() {
  const phoneNumber = '254717305574';
  const whatsappUrl = `https://wa.me/${phoneNumber}`;
  const callUrl = `tel:+${phoneNumber}`;

  return (
    <div className="fixed bottom-8 right-8 z-[60] flex flex-col gap-4 items-end">
      {/* Call Button */}
      <motion.a
        href={callUrl}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-red-600 text-white px-6 py-3 rounded-full flex items-center gap-3 shadow-2xl hover:bg-red-700 transition-all duration-300 group"
      >
        <Phone className="w-5 h-5" />
        <span className="font-bold text-sm tracking-wide">Call us</span>
      </motion.a>

      {/* WhatsApp Button */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-[#25D366] text-white px-6 py-3 rounded-full flex items-center gap-3 shadow-2xl hover:bg-[#128C7E] transition-all duration-300 group relative"
      >
        <MessageCircle className="w-5 h-5 fill-white" />
        <span className="font-bold text-sm tracking-wide">Chat with us</span>
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
        </span>
      </motion.a>
    </div>
  );
}
