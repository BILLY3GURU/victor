export interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  category: string;
  title: string;
  order?: number;
  createdAt?: string;
}

export interface SiteConfig {
  heroImage: string;
  heroTagline?: string;
  aboutImage: string;
  aboutTitle?: string;
  aboutBio?: string;
}
