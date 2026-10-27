import {
  collection,
  doc,
  onSnapshot,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  query,
  orderBy,
  writeBatch
} from 'firebase/firestore';
import { db } from './firebase';
import { GalleryImage, SiteConfig } from '../types';
import { GALLERY_IMAGES } from '../constants';

export const DEFAULT_SITE_CONFIG: SiteConfig = {
  heroImage: 'https://res.cloudinary.com/dpskjlq9m/image/upload/q_auto,f_auto,w_1920/v1790012739/DSC_8623.JPG_jyeuwq.jpg',
  heroTagline: 'Capturing the Soul of Kenya through a Lens of Pure Emotion',
  aboutImage: 'https://res.cloudinary.com/dpskjlq9m/image/upload/q_auto,f_auto,w_1200/v1790012649/NNP_6167rrrrrr.jpg_oouwdh.jpg',
  aboutTitle: 'Crafting Timeless Memories',
  aboutBio: 'Based in the heart of Kenya, I believe every frame should tell a story that resonates across generations. My approach combines technical precision with a deep understanding of human connection, ensuring that your most precious moments are preserved with the elegance they deserve.'
};

/**
 * Subscribes to real-time gallery updates from Firestore.
 * Automatically falls back to constants.ts default images if database is empty.
 */
export function subscribeToGallery(
  onUpdate: (images: GalleryImage[], isFromDb: boolean) => void
): () => void {
  const galleryRef = collection(db, 'gallery');
  const q = query(galleryRef, orderBy('order', 'asc'));

  const unsubscribe = onSnapshot(
    q,
    (snapshot) => {
      if (!snapshot.empty) {
        const items: GalleryImage[] = snapshot.docs.map((d) => {
          const data = d.data();
          return {
            id: d.id,
            url: data.url,
            category: data.category || 'Portrait',
            title: data.title || 'Untitled',
            order: typeof data.order === 'number' ? data.order : 0,
            createdAt: data.createdAt || new Date().toISOString()
          };
        });
        onUpdate(items, true);
      } else {
        // Fallback to static gallery
        onUpdate(GALLERY_IMAGES, false);
      }
    },
    (error) => {
      console.warn('Gallery Firestore snapshot fallback:', error.message);
      onUpdate(GALLERY_IMAGES, false);
    }
  );

  return unsubscribe;
}

/**
 * Subscribes to site configuration (Hero image, Storyteller image).
 */
export function subscribeToSiteConfig(
  onUpdate: (config: SiteConfig) => void
): () => void {
  const configRef = doc(db, 'config', 'main');

  const unsubscribe = onSnapshot(
    configRef,
    (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data();
        onUpdate({
          heroImage: data.heroImage || DEFAULT_SITE_CONFIG.heroImage,
          heroTagline: data.heroTagline || DEFAULT_SITE_CONFIG.heroTagline,
          aboutImage: data.aboutImage || DEFAULT_SITE_CONFIG.aboutImage,
          aboutTitle: data.aboutTitle || DEFAULT_SITE_CONFIG.aboutTitle,
          aboutBio: data.aboutBio || DEFAULT_SITE_CONFIG.aboutBio
        });
      } else {
        onUpdate(DEFAULT_SITE_CONFIG);
      }
    },
    (error) => {
      console.warn('Config snapshot fallback:', error.message);
      onUpdate(DEFAULT_SITE_CONFIG);
    }
  );

  return unsubscribe;
}

/**
 * Adds a new image to the gallery in Firestore.
 */
export async function addGalleryImage(
  item: Omit<GalleryImage, 'id'>
): Promise<string> {
  const galleryRef = collection(db, 'gallery');
  const docRef = await addDoc(galleryRef, {
    url: item.url,
    category: item.category,
    title: item.title,
    order: item.order ?? Date.now(),
    createdAt: item.createdAt || new Date().toISOString()
  });
  return docRef.id;
}

/**
 * Updates an existing gallery image.
 */
export async function updateGalleryImage(
  id: string,
  updates: Partial<GalleryImage>
): Promise<void> {
  const docRef = doc(db, 'gallery', id);
  await updateDoc(docRef, { ...updates });
}

/**
 * Deletes a gallery image document.
 */
export async function deleteGalleryImage(id: string): Promise<void> {
  const docRef = doc(db, 'gallery', id);
  await deleteDoc(docRef);
}

/**
 * Updates site display config (Hero, About image).
 */
export async function updateSiteConfig(updates: Partial<SiteConfig>): Promise<void> {
  const configRef = doc(db, 'config', 'main');
  await setDoc(configRef, updates, { merge: true });
}

/**
 * Seeds initial gallery items from constants into Firestore if needed.
 */
export async function seedDefaultGallery(): Promise<number> {
  const galleryRef = collection(db, 'gallery');
  const snapshot = await getDocs(galleryRef);
  
  if (!snapshot.empty) {
    return 0; // Already seeded
  }

  const batch = writeBatch(db);
  GALLERY_IMAGES.forEach((img, index) => {
    const newDoc = doc(galleryRef);
    batch.set(newDoc, {
      title: img.title,
      category: img.category,
      url: img.url,
      order: index * 10,
      createdAt: new Date().toISOString()
    });
  });

  await batch.commit();
  return GALLERY_IMAGES.length;
}
