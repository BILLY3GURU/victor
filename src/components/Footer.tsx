import { Instagram, Twitter, Facebook, Mail, Phone, MapPin } from 'lucide-react';
import logoImg from '../assets/logo.jpg';

export default function Footer() {
  return (
    <footer id="contact" className="bg-black pt-24 pb-12 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden border border-red-600/40 bg-zinc-900 flex items-center justify-center shadow-lg shadow-red-600/10">
                <img 
                  src={logoImg} 
                  alt="Vick Photography Logo" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-serif tracking-[0.2em] uppercase font-bold text-white leading-none">
                  Vick
                </span>
                <span className="text-[10px] uppercase tracking-[0.4em] text-red-600 font-bold mt-1">
                  Photography
                </span>
              </div>
            </div>
            <p className="text-zinc-500 text-sm font-light leading-relaxed">
              Capturing the essence of life's most beautiful moments with precision and artistic vision. Based in Kenya, serving worldwide.
            </p>
            <div className="flex gap-4">
              {[
                { icon: Instagram, href: 'https://www.instagram.com/vickphotographyke?igsh=MWRmYXd0dTlxdG5mcA==' },
                { icon: Facebook, href: 'https://www.facebook.com/share/1GUeL3oFFR/' },
                { icon: Twitter, href: '#' },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-zinc-400 hover:border-red-600 hover:text-red-600 transition-all duration-500"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-serif text-xl mb-8 italic">Quick Links</h4>
            <ul className="space-y-4">
              {['Portfolio', 'Reels', 'Services', 'About', 'Booking'].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-zinc-500 text-sm hover:text-red-600 transition-colors flex items-center gap-2 group"
                  >
                    <div className="w-0 h-[1px] bg-red-600 group-hover:w-4 transition-all duration-300" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-serif text-xl mb-8 italic">Contact</h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <Mail className="w-5 h-5 text-red-600 shrink-0" />
                <span className="text-zinc-500 text-sm">vickphotography751@gmail.com</span>
              </li>
              <li className="flex items-start gap-4">
                <Phone className="w-5 h-5 text-red-600 shrink-0" />
                <span className="text-zinc-500 text-sm">+254 717 305574</span>
              </li>
              <li className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-red-600 shrink-0" />
                <span className="text-zinc-500 text-sm">Eden Center, 1st Floor, Room F4</span>
              </li>
              <li className="pt-4">
                <a 
                  href="https://wa.me/254717305574" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
                >
                  <span className="text-lg">💬</span>
                  Chat with us on WhatsApp
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-serif text-xl mb-8 italic">Newsletter</h4>
            <p className="text-zinc-500 text-sm mb-6">Join our community for photography tips and exclusive offers.</p>
            <form className="relative">
              <input
                type="email"
                placeholder="Your email"
                className="w-full bg-zinc-900/50 border border-white/10 rounded-full px-6 py-4 text-sm focus:border-red-600 outline-none transition-colors"
              />
              <button className="absolute right-2 top-2 bottom-2 px-6 bg-red-600 text-white rounded-full text-[10px] uppercase tracking-widest font-bold hover:bg-white hover:text-black transition-all duration-500">
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-zinc-600 text-[10px] uppercase tracking-widest">
            © {new Date().getFullYear()} Vick Photography. All Rights Reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-zinc-600 text-[10px] uppercase tracking-widest hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-zinc-600 text-[10px] uppercase tracking-widest hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
