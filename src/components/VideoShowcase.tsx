import { motion } from 'motion/react';
import { Play, Instagram, ExternalLink } from 'lucide-react';
import { useRef, useState, FC, useEffect } from 'react';

const REELS = [
  {
    id: 1,
    title: 'Grace & Poise',
    url: 'https://www.instagram.com/vickphotographyke',
    thumbnail: 'https://res.cloudinary.com/dpskjlq9m/image/upload/v1786719177/IMG-20260814-WA0006_eikakq.jpg',
    preview: 'https://res.cloudinary.com/dpskjlq9m/video/upload/v1786720131/VID-20260814-WA0007_2_zcckom.mp4',
    category: 'Editorial Motion'
  },
  {
    id: 2,
    title: 'Elegance & Style',
    url: 'https://www.instagram.com/vickphotographyke',
    thumbnail: 'https://res.cloudinary.com/dpskjlq9m/image/upload/q_auto,f_auto,w_800/v1790012649/NNP_6167rrrrrr.jpg_oouwdh.jpg',
    preview: 'https://res.cloudinary.com/dpskjlq9m/video/upload/v1786720131/VID-20260814-WA0007_2_zcckom.mp4',
    category: 'Studio Session'
  },
  {
    id: 3,
    title: 'Ethereal Moments',
    url: 'https://www.instagram.com/vickphotographyke',
    thumbnail: 'https://res.cloudinary.com/dpskjlq9m/image/upload/q_auto,f_auto,w_800/v1790012654/DSC02050.jpg_ptsnxa.jpg',
    preview: 'https://res.cloudinary.com/dpskjlq9m/video/upload/v1776505330/Ethereal_moments_by_the_river_made_for_day_dreams_%EF%B8%8F_%EF%B8%8FAt_%C3%89LAN_SOCIETY_dreams_are_made_true_vnbr2q.mp4',
    category: 'Behind the Scenes'
  }
];

interface ReelCardProps {
  reel: typeof REELS[0];
  index: number;
}

const ReelCard: FC<ReelCardProps> = ({ reel, index }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isInViewport, setIsInViewport] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isHovered || isInViewport) {
      video.play().catch(() => {
        // Autoplay might be blocked by browser policy even if muted
      });
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }, [isHovered, isInViewport]);

  return (
    <motion.a
      href={reel.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      onViewportEnter={() => setIsInViewport(true)}
      onViewportLeave={() => setIsInViewport(false)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      viewport={{ once: false, amount: 0.2 }}
      whileHover={{ scale: 1.02, opacity: 0.95 }}
      transition={{ delay: index * 0.1 }}
      className="group relative aspect-[9/16] rounded-3xl overflow-hidden bg-zinc-900"
    >
      {/* Thumbnail Image */}
      <img
        src={reel.thumbnail}
        alt={reel.title}
        className={`w-full h-full object-cover transition-all duration-1000 ${
          isPlaying ? 'opacity-0' : 'opacity-80 group-hover:scale-110'
        }`}
        referrerPolicy="no-referrer"
        loading="lazy"
      />

      {/* Video Preview */}
      <video
        ref={videoRef}
        src={reel.preview}
        muted
        loop
        playsInline
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
          isPlaying ? 'opacity-100' : 'opacity-0'
        }`}
      />
      
      <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
        <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center mb-6 group-hover:bg-red-600 group-hover:border-red-600 transition-all duration-500 transform group-hover:scale-110">
          <Play className="w-6 h-6 text-white fill-white group-hover:scale-110 transition-transform" />
        </div>
        
        <span className="text-red-600 text-[10px] uppercase tracking-[0.4em] font-bold mb-2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
          {reel.category}
        </span>
        <h3 className="text-xl font-serif italic text-white mb-4 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 translate-y-4 group-hover:translate-y-0">
          {reel.title}
        </h3>
        
        <div className="flex items-center gap-2 text-zinc-400 text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200">
          <Instagram className="w-3 h-3" />
          View on Instagram
          <ExternalLink className="w-3 h-3" />
        </div>
      </div>

      {/* Decorative corner elements */}
      <div className="absolute top-6 right-6 w-8 h-8 border-t border-r border-white/20 group-hover:border-red-600/50 transition-colors duration-500" />
      <div className="absolute bottom-6 left-6 w-8 h-8 border-b border-l border-white/20 group-hover:border-red-600/50 transition-colors duration-500" />
    </motion.a>
  );
}

export default function VideoShowcase() {
  return (
    <section id="reels" className="py-32 px-6 bg-black relative overflow-hidden">
      <div className="absolute top-32 left-1/2 -translate-x-1/2 text-[15vw] font-serif font-bold text-outline pointer-events-none select-none uppercase tracking-widest opacity-30">
        Motion
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-red-600 uppercase tracking-[0.5em] text-[10px] font-bold mb-4 block"
          >
            Cinematic Stories
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-serif mb-8"
          >
            Featured <span className="italic text-red-600">Reels</span>
          </motion.h2>
          <div className="w-20 h-[1px] bg-red-600 mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 max-w-6xl mx-auto gap-8">
          {REELS.map((reel, i) => (
            <ReelCard key={reel.id} reel={reel} index={i} />
          ))}
        </div>

        <div className="mt-20 text-center">
          <p className="text-zinc-500 text-sm font-light mb-8">
            Follow us for more daily inspiration and behind-the-scenes content.
          </p>
          <a
            href="https://www.instagram.com/vickphotographyke"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 text-white hover:text-red-600 transition-colors group"
          >
            <Instagram className="w-5 h-5" />
            <span className="text-xs uppercase tracking-[0.3em] font-bold">@vickphotographyke</span>
            <div className="w-0 h-[1px] bg-red-600 group-hover:w-12 transition-all duration-500" />
          </a>
        </div>
      </div>
    </section>
  );
}
