import { Service, GalleryImage } from './types';

export const SERVICES: Service[] = [
  {
    id: 'wedding',
    title: 'Wedding Photography',
    description: 'Capturing your special day with elegance and emotion. Full day coverage with high-end editing.',
    image: 'https://res.cloudinary.com/dpskjlq9m/image/upload/q_auto,f_auto,w_1200/v1790012654/DSC02050.jpg_ptsnxa.jpg',
  },
  {
    id: 'wedding-journey',
    title: 'Beginning of a Journey',
    description: 'A special wedding photography package to capture the start of your forever.',
    image: 'https://res.cloudinary.com/dpskjlq9m/image/upload/q_auto,f_auto,w_1200/v1774415830/KHA_8702rr_jvhjxk.jpg',
  },
  {
    id: 'portrait',
    title: 'Portrait Sessions',
    description: 'Professional portraits for individuals, couples, or families. Studio or outdoor locations.',
    image: 'https://res.cloudinary.com/dpskjlq9m/image/upload/q_auto,f_auto,w_1200/v1774415853/DSC_0212_r6o3gp.jpg',
  },
  {
    id: 'fashion',
    title: 'Fashion & Editorial',
    description: 'High-concept photography for brands, models, and magazines. Creative direction included.',
    image: 'https://res.cloudinary.com/dpskjlq9m/image/upload/q_auto,f_auto,w_1200/v1774415961/DSC02672_lvhmp4.jpg',
  },
  {
    id: 'real-estate',
    title: 'Real Estate & Architecture',
    description: 'Crisp, high-impact interior and architectural photography for luxury residences, commercial spaces, and developments.',
    image: 'https://res.cloudinary.com/dpskjlq9m/image/upload/q_auto,f_auto,w_1200/v1790012684/DJI_0040.jpg_wtdptg.jpg',
  },
  {
    id: 'family',
    title: 'Family & Milestones',
    description: 'Heartfelt generational portraits, milestone celebrations, and authentic memories preserved for a lifetime.',
    image: 'https://res.cloudinary.com/dpskjlq9m/image/upload/q_auto,f_auto,w_1200/v1774415810/1_54_jrqylx.jpg',
  },
];

export const GALLERY_IMAGES: GalleryImage[] = [
  { id: 'fam-1', url: 'https://res.cloudinary.com/dpskjlq9m/image/upload/q_auto,f_auto,w_1200/v1774415810/1_54_jrqylx.jpg', category: 'Family', title: 'Generational Warmth' },
  { id: 'fam-2', url: 'https://res.cloudinary.com/dpskjlq9m/image/upload/q_auto,f_auto,w_1200/v1774415825/1_179_ziw6ee.jpg', category: 'Family', title: 'Joyful Bonds' },
  { id: 'fam-3', url: 'https://res.cloudinary.com/dpskjlq9m/image/upload/q_auto,f_auto,w_1200/v1774415830/KHA_8702rr_jvhjxk.jpg', category: 'Family', title: 'Cherished Milestones' },
  { id: 'fam-4', url: 'https://res.cloudinary.com/dpskjlq9m/image/upload/q_auto,f_auto,w_1200/v1774415829/1_162_vptnto.jpg', category: 'Family', title: 'Kinship & Love' },
  { id: 're-drone', url: 'https://res.cloudinary.com/dpskjlq9m/image/upload/q_auto,f_auto,w_1200/v1790012684/DJI_0040.jpg_wtdptg.jpg', category: 'Real Estate', title: 'Aerial Drone Perspective' },
  { id: 're-1', url: 'https://res.cloudinary.com/dpskjlq9m/image/upload/q_auto,f_auto,w_1200/v1790013927/WhatsApp_Image_2026-09-21_at_9.03.02_PM_1_somgqh.jpg', category: 'Real Estate', title: 'Modern Architecture' },
  { id: 're-2', url: 'https://res.cloudinary.com/dpskjlq9m/image/upload/q_auto,f_auto,w_1200/v1790013913/WhatsApp_Image_2026-09-21_at_9.03.01_PM_1_cx56hl.jpg', category: 'Real Estate', title: 'Interior Elegance' },
  { id: 're-3', url: 'https://res.cloudinary.com/dpskjlq9m/image/upload/q_auto,f_auto,w_1200/v1790013819/WhatsApp_Image_2026-09-21_at_9.03.00_PM_1_mx58vr.jpg', category: 'Real Estate', title: 'Luxury Living Space' },
  { id: 're-4', url: 'https://res.cloudinary.com/dpskjlq9m/image/upload/q_auto,f_auto,w_1200/v1790013797/WhatsApp_Image_2026-09-21_at_9.03.00_PM_htn7ar.jpg', category: 'Real Estate', title: 'Estate Perspective' },
  { id: 'img-wa-hero', url: 'https://res.cloudinary.com/dpskjlq9m/image/upload/q_auto,f_auto,w_800/v1790013501/WhatsApp_Image_2026-09-21_at_8.58.00_PM_gwhugf.jpg', category: 'Portrait', title: 'Timeless Beauty' },
  { id: 'img-nnp-6167', url: 'https://res.cloudinary.com/dpskjlq9m/image/upload/q_auto,f_auto,w_800/v1790012649/NNP_6167rrrrrr.jpg_oouwdh.jpg', category: 'Portrait', title: 'Elegance & Style' },
  { id: 'img-20260814-02', url: 'https://res.cloudinary.com/dpskjlq9m/image/upload/q_auto,f_auto,w_800/v1786719177/IMG-20260814-WA0006_eikakq.jpg', category: 'Portrait', title: 'Grace & Poise' },
  { id: 'img-20260814-01', url: 'https://res.cloudinary.com/dpskjlq9m/image/upload/q_auto,f_auto,w_800/v1786719161/IMG-20260814-WA0003_hqni2t.jpg', category: 'Portrait', title: 'Radiant Portrait' },
  { id: 'wedding-lead', url: 'https://res.cloudinary.com/dpskjlq9m/image/upload/q_auto,f_auto,w_1200/v1790012654/DSC02050.jpg_ptsnxa.jpg', category: 'Wedding', title: 'Eternal Vows' },
  { id: '1', url: 'https://res.cloudinary.com/dpskjlq9m/image/upload/q_auto,f_auto,w_800/v1774416035/IMG_2419_z9ib8k.jpg', category: 'Wedding', title: 'Celebration Moments' },
  { id: '2', url: 'https://res.cloudinary.com/dpskjlq9m/image/upload/q_auto,f_auto,w_800/v1774416033/VIC_9969rr_s3jeaj.jpg', category: 'Portrait', title: 'Soulful Gaze' },
  { id: '3', url: 'https://res.cloudinary.com/dpskjlq9m/image/upload/q_auto,f_auto,w_800/v1774416027/IMG_2346_r7zuq6.jpg', category: 'Fashion', title: 'Modern African' },
  { id: '5', url: 'https://res.cloudinary.com/dpskjlq9m/image/upload/q_auto,f_auto,w_800/v1774416022/IMG_2342_izgyje.jpg', category: 'Wedding', title: 'Traditional Union' },
  { id: '6', url: 'https://res.cloudinary.com/dpskjlq9m/image/upload/q_auto,f_auto,w_800/v1774416020/IMG_2104_nutdph.jpg', category: 'Portrait', title: 'Natural Essence' },
  { id: '7', url: 'https://res.cloudinary.com/dpskjlq9m/image/upload/q_auto,f_auto,w_800/v1774416019/IMG_2112_ytge9o.jpg', category: 'Fashion', title: 'Editorial Chic' },
  { id: '9', url: 'https://res.cloudinary.com/dpskjlq9m/image/upload/q_auto,f_auto,w_800/v1774416016/IMG_2088_bkbyes.jpg', category: 'Wedding', title: 'Golden Hour' },
  { id: '10', url: 'https://res.cloudinary.com/dpskjlq9m/image/upload/q_auto,f_auto,w_800/v1774416014/IMG_6473_onqcej.jpg', category: 'Portrait', title: 'Urban Vibe' },
  { id: '11', url: 'https://res.cloudinary.com/dpskjlq9m/image/upload/q_auto,f_auto,w_800/v1774416007/DSC_2499_kfl0et.jpg', category: 'Fashion', title: 'High Style' },
  { id: '13', url: 'https://res.cloudinary.com/dpskjlq9m/image/upload/q_auto,f_auto,w_800/v1774415988/DSC08119_crns9c.jpg', category: 'Wedding', title: 'Love Story' },
  { id: '14', url: 'https://res.cloudinary.com/dpskjlq9m/image/upload/q_auto,f_auto,w_800/v1774415976/DSC09272_hlgkuy.jpg', category: 'Portrait', title: 'Studio Session' },
  { id: '15', url: 'https://res.cloudinary.com/dpskjlq9m/image/upload/q_auto,f_auto,w_800/v1774415967/DSC_8641_btpel3.jpg', category: 'Fashion', title: 'Runway Ready' },
  { id: '17', url: 'https://res.cloudinary.com/dpskjlq9m/image/upload/q_auto,f_auto,w_800/v1774415952/DUK02326_vnntdx.jpg', category: 'Wedding', title: 'The Kiss' },
  { id: '18', url: 'https://res.cloudinary.com/dpskjlq9m/image/upload/q_auto,f_auto,w_800/v1774415952/DSC00514_srzqlw.jpg', category: 'Portrait', title: 'Candid Moment' },
  { id: '19', url: 'https://res.cloudinary.com/dpskjlq9m/image/upload/q_auto,f_auto,w_800/v1774415948/DSC00436_byxksk.jpg', category: 'Fashion', title: 'Street Style' },
  { id: '21', url: 'https://res.cloudinary.com/dpskjlq9m/image/upload/q_auto,f_auto,w_800/v1774415937/DUK02395_lhmcia.jpg', category: 'Wedding', title: 'Bridal Glow' },
  { id: '22', url: 'https://res.cloudinary.com/dpskjlq9m/image/upload/q_auto,f_auto,w_800/v1774415937/DSC_5228_mhynrv.jpg', category: 'Portrait', title: 'Classic Look' },
  { id: '23', url: 'https://res.cloudinary.com/dpskjlq9m/image/upload/q_auto,f_auto,w_800/v1774415929/DSC_8914_h7fv36.jpg', category: 'Fashion', title: 'Avant Garde' },
];

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  avatar: string;
}

export interface ProcessStep {
  id: string;
  number: string;
  title: string;
  description: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Valary Brooke',
    role: 'Bride',
    content: 'Vick captured our wedding day in a way that felt like a dream. Every photo tells a story and brings back the emotions of that day perfectly.',
    avatar: 'https://res.cloudinary.com/dpskjlq9m/image/upload/v1774415810/1_54_jrqylx.jpg',
  },
  {
    id: '2',
    name: 'Kikwetu Fashion',
    role: 'Fashion Brand',
    content: 'Working with Vick on our latest collection was a game-changer. Her eye for detail and creative direction elevated our brand to a new level.',
    avatar: 'https://res.cloudinary.com/dpskjlq9m/image/upload/v1774415825/1_179_ziw6ee.jpg',
  },
  {
    id: '3',
    name: 'Vanesse Lepiren',
    role: 'Model',
    content: 'The portrait session was relaxed and professional. Vick knows exactly how to work with light to create stunning, natural results.',
    avatar: 'https://res.cloudinary.com/dpskjlq9m/image/upload/v1774415829/1_162_vptnto.jpg',
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    id: '1',
    number: '01',
    title: 'Consultation',
    description: 'We discuss your vision, style preferences, and the specific goals for your shoot.',
  },
  {
    id: '2',
    number: '02',
    title: 'Planning',
    description: 'Choosing locations, selecting outfits, and finalizing the creative direction.',
  },
  {
    id: '3',
    number: '03',
    title: 'The Session',
    description: 'A professional and relaxed environment where we capture the magic.',
  },
  {
    id: '4',
    number: '04',
    title: 'Delivery',
    description: 'Carefully edited high-resolution images delivered in a private online gallery.',
  },
];
