import { useState, useRef, useEffect, FC, MouseEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GALLERY_IMAGES } from '../constants';
import { GalleryImage } from '../types';
import { cn } from '../lib/utils';
import { 
  Folder, 
  FolderOpen, 
  ChevronLeft, 
  ChevronRight, 
  X, 
  Maximize2, 
  MoveHorizontal 
} from 'lucide-react';

interface FolderDefinition {
  id: string;
  name: string;
  category: string;
  badge: string;
  tagline: string;
  description: string;
}

const FOLDERS: FolderDefinition[] = [
  {
    id: 'portrait',
    name: 'Portrait Collection',
    category: 'Portrait',
    badge: 'Folder 01',
    tagline: 'Soulful & Studio Portraits',
    description: 'Intimate expressions, radiant studio lighting, and timeless character captures.'
  },
  {
    id: 'wedding',
    name: 'Wedding Stories',
    category: 'Wedding',
    badge: 'Folder 02',
    tagline: 'Eternal Love & Celebrations',
    description: 'Unscripted emotions, sacred vows, and romantic celebration highlights.'
  },
  {
    id: 'fashion',
    name: 'Fashion & Editorial',
    category: 'Fashion',
    badge: 'Folder 03',
    tagline: 'High Style & Runway Chic',
    description: 'Creative direction, bold avant-garde textures, and modern African aesthetics.'
  },
  {
    id: 'real-estate',
    name: 'Real Estate & Architecture',
    category: 'Real Estate',
    badge: 'Folder 04',
    tagline: 'Architectural & Space Design',
    description: 'Striking interior perspectives, architectural angles, and commercial & residential estate showcases.'
  },
  {
    id: 'family',
    name: 'Family & Milestones',
    category: 'Family',
    badge: 'Folder 05',
    tagline: 'Generations & Precious Bonds',
    description: 'Heartfelt milestones, multi-generational portraits, and authentic family connections.'
  }
];

interface FolderScrollRowProps {
  folder: FolderDefinition;
  images: GalleryImage[];
  onOpenLightbox: (image: GalleryImage, images: GalleryImage[], index: number) => void;
}

const FolderScrollRow: FC<FolderScrollRowProps> = ({ folder, images, onOpenLightbox }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Mouse drag-to-scroll state
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);
  const hasDragged = useRef(false);

  const updateScrollState = () => {
    const el = scrollRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < maxScroll - 10);
    if (maxScroll > 0) {
      setScrollProgress((el.scrollLeft / maxScroll) * 100);
    }
  };

  useEffect(() => {
    updateScrollState();
    const el = scrollRef.current;
    if (!el) return;

    const handleResize = () => updateScrollState();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [images]);

  const handleScrollLeft = () => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: -360, behavior: 'smooth' });
  };

  const handleScrollRight = () => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: 360, behavior: 'smooth' });
  };

  const handleMouseDown = (e: MouseEvent) => {
    if (!scrollRef.current) return;
    isDragging.current = true;
    hasDragged.current = false;
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeftStart.current = scrollRef.current.scrollLeft;
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging.current || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    if (Math.abs(walk) > 5) {
      hasDragged.current = true;
    }
    scrollRef.current.scrollLeft = scrollLeftStart.current - walk;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  return (
    <div className="mb-20 last:mb-0">
      {/* Folder Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="flex items-center gap-1.5 text-[11px] font-bold tracking-[0.25em] uppercase text-red-600 bg-red-600/10 px-3 py-1 rounded-full border border-red-600/30">
              <Folder className="w-3.5 h-3.5" />
              {folder.badge}
            </span>
            <span className="text-zinc-500 text-xs tracking-wider">
              {images.length} {images.length === 1 ? 'Photograph' : 'Photographs'}
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-serif text-white">
            {folder.name}
          </h3>
          <p className="text-zinc-400 text-xs sm:text-sm font-light mt-1 max-w-xl">
            {folder.description}
          </p>
        </div>

        {/* Scroll Controls & Indicator */}
        <div className="flex items-center gap-4 self-end md:self-auto">
          <div className="hidden sm:flex items-center gap-2 text-zinc-500 text-[11px] uppercase tracking-widest mr-2 select-none">
            <MoveHorizontal className="w-4 h-4 text-red-600" />
            <span>Scroll sideways</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleScrollLeft}
              disabled={!canScrollLeft}
              aria-label={`Scroll ${folder.name} left`}
              className={cn(
                'w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300',
                canScrollLeft
                  ? 'border-white/20 text-white hover:border-red-600 hover:bg-red-600/20 active:scale-95'
                  : 'border-white/5 text-zinc-600 cursor-not-allowed opacity-40'
              )}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleScrollRight}
              disabled={!canScrollRight}
              aria-label={`Scroll ${folder.name} right`}
              className={cn(
                'w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300',
                canScrollRight
                  ? 'border-white/20 text-white hover:border-red-600 hover:bg-red-600/20 active:scale-95'
                  : 'border-white/5 text-zinc-600 cursor-not-allowed opacity-40'
              )}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Sideways Scroll Track */}
      <div className="relative">
        <div
          ref={scrollRef}
          onScroll={updateScrollState}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className="flex gap-5 md:gap-6 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory py-2 px-1 cursor-grab active:cursor-grabbing select-none"
        >
          {images.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3) }}
              onClick={() => {
                if (!hasDragged.current) {
                  onOpenLightbox(image, images, index);
                }
              }}
              className="snap-start flex-shrink-0 w-[260px] sm:w-[300px] md:w-[340px] aspect-[4/5] relative rounded-2xl overflow-hidden group cursor-pointer border border-white/10 hover:border-red-600/50 transition-all duration-500 shadow-xl bg-zinc-950"
            >
              <img
                src={image.url}
                alt={image.title}
                loading="lazy"
                draggable={false}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 pointer-events-none"
                referrerPolicy="no-referrer"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-between p-6">
                <div className="flex justify-end">
                  <span className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white group-hover:bg-red-600 group-hover:border-red-600 transition-colors">
                    <Maximize2 className="w-4 h-4" />
                  </span>
                </div>

                <div>
                  <span className="text-red-500 text-[10px] uppercase tracking-[0.3em] font-bold block mb-1">
                    {image.category}
                  </span>
                  <h4 className="text-xl font-serif italic text-white mb-2">
                    {image.title}
                  </h4>
                  <div className="w-10 h-[1px] bg-red-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Scroll Progress Bar for the Folder */}
        <div className="mt-4 h-[2px] w-full bg-white/5 rounded-full overflow-hidden">
          <div
            className="h-full bg-red-600/70 transition-all duration-150 ease-out"
            style={{ width: `${Math.max(12, scrollProgress)}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default function Gallery() {
  const [activeFolderId, setActiveFolderId] = useState<string>('all');
  const [lightboxData, setLightboxData] = useState<{
    image: GalleryImage;
    images: GalleryImage[];
    index: number;
  } | null>(null);

  const displayedFolders = activeFolderId === 'all'
    ? FOLDERS
    : FOLDERS.filter(f => f.id === activeFolderId);

  const handleOpenLightbox = (image: GalleryImage, images: GalleryImage[], index: number) => {
    setLightboxData({ image, images, index });
  };

  const handleNextPhoto = () => {
    if (!lightboxData) return;
    const nextIndex = (lightboxData.index + 1) % lightboxData.images.length;
    setLightboxData({
      ...lightboxData,
      index: nextIndex,
      image: lightboxData.images[nextIndex]
    });
  };

  const handlePrevPhoto = () => {
    if (!lightboxData) return;
    const prevIndex = (lightboxData.index - 1 + lightboxData.images.length) % lightboxData.images.length;
    setLightboxData({
      ...lightboxData,
      index: prevIndex,
      image: lightboxData.images[prevIndex]
    });
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!lightboxData) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNextPhoto();
      if (e.key === 'ArrowLeft') handlePrevPhoto();
      if (e.key === 'Escape') setLightboxData(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxData]);

  return (
    <section id="portfolio" className="py-28 px-6 bg-[#0a0a0a] relative overflow-hidden">
      <div className="absolute top-24 left-1/2 -translate-x-1/2 text-[15vw] font-serif font-bold text-outline pointer-events-none select-none uppercase tracking-widest opacity-40">
        Folders
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-red-600 uppercase tracking-[0.4em] text-xs font-bold mb-3 block">
            Curated Archives
          </span>
          <h2 className="text-4xl md:text-6xl font-serif mb-4 text-white">
            Photo <span className="italic text-red-600">Folders</span>
          </h2>
          <div className="w-20 h-[1px] bg-red-600 mx-auto mb-6" />
          <p className="text-zinc-400 text-sm max-w-xl mx-auto font-light">
            Browse through categorized albums. Swipe or scroll sideways through each folder to explore high-resolution editorial work.
          </p>

          {/* Folder Tabs / Filter */}
          <div className="flex flex-wrap justify-center items-center gap-3 mt-10">
            <button
              onClick={() => setActiveFolderId('all')}
              className={cn(
                'flex items-center gap-2 px-5 py-2.5 rounded-full text-xs uppercase tracking-widest font-semibold transition-all duration-300 border',
                activeFolderId === 'all'
                  ? 'bg-red-600 text-white border-red-600 shadow-lg shadow-red-600/20'
                  : 'bg-zinc-900/60 text-zinc-400 border-white/10 hover:text-white hover:border-white/20'
              )}
            >
              <FolderOpen className="w-3.5 h-3.5" />
              <span>All Folders ({GALLERY_IMAGES.length})</span>
            </button>

            {FOLDERS.map((folder) => {
              const count = GALLERY_IMAGES.filter(img => img.category === folder.category).length;
              const isActive = activeFolderId === folder.id;
              return (
                <button
                  key={folder.id}
                  onClick={() => setActiveFolderId(folder.id)}
                  className={cn(
                    'flex items-center gap-2 px-5 py-2.5 rounded-full text-xs uppercase tracking-widest font-semibold transition-all duration-300 border',
                    isActive
                      ? 'bg-red-600 text-white border-red-600 shadow-lg shadow-red-600/20'
                      : 'bg-zinc-900/60 text-zinc-400 border-white/10 hover:text-white hover:border-white/20'
                  )}
                >
                  <Folder className="w-3.5 h-3.5" />
                  <span>{folder.name.replace(' Collection', '').replace(' Stories', '')} ({count})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Horizontal Scroll Rows for each Folder */}
        <div className="space-y-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFolderId}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              {displayedFolders.map((folder) => {
                const folderImages = GALLERY_IMAGES.filter(
                  img => img.category === folder.category
                );
                return (
                  <FolderScrollRow
                    key={folder.id}
                    folder={folder}
                    images={folderImages}
                    onOpenLightbox={handleOpenLightbox}
                  />
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Enhanced Lightbox Modal with Sideways Navigation */}
      <AnimatePresence>
        {lightboxData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-8"
            onClick={() => setLightboxData(null)}
          >
            {/* Close Button */}
            <button
              className="absolute top-6 right-6 text-white hover:text-red-600 transition-colors z-[110] p-2 rounded-full bg-white/5 hover:bg-white/10"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxData(null);
              }}
              aria-label="Close Lightbox"
            >
              <X className="w-7 h-7" />
            </button>

            {/* Previous Button */}
            <button
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-[110] text-white/70 hover:text-white p-3 rounded-full bg-black/60 border border-white/10 hover:border-red-600 hover:bg-red-600/30 transition-all duration-300"
              onClick={(e) => {
                e.stopPropagation();
                handlePrevPhoto();
              }}
              aria-label="Previous Photo"
            >
              <ChevronLeft className="w-7 h-7" />
            </button>

            {/* Next Button */}
            <button
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-[110] text-white/70 hover:text-white p-3 rounded-full bg-black/60 border border-white/10 hover:border-red-600 hover:bg-red-600/30 transition-all duration-300"
              onClick={(e) => {
                e.stopPropagation();
                handleNextPhoto();
              }}
              aria-label="Next Photo"
            >
              <ChevronRight className="w-7 h-7" />
            </button>

            {/* Photo Container */}
            <motion.div
              key={lightboxData.image.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="relative max-w-5xl w-full max-h-full flex flex-col items-center select-none"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative max-h-[75vh] flex items-center justify-center">
                <img
                  src={lightboxData.image.url}
                  alt={lightboxData.image.title}
                  className="max-w-full max-h-[75vh] object-contain shadow-2xl rounded-lg border border-white/10"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Photo Information & Sideways Navigation Indicator */}
              <div className="mt-6 text-center">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <span className="text-red-500 text-xs uppercase tracking-[0.3em] font-bold">
                    {lightboxData.image.category}
                  </span>
                  <span className="text-zinc-600 text-xs">•</span>
                  <span className="text-zinc-400 text-xs tracking-widest font-mono">
                    {lightboxData.index + 1} / {lightboxData.images.length}
                  </span>
                </div>
                <h3 className="text-2xl md:text-4xl font-serif italic text-white">
                  {lightboxData.image.title}
                </h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
