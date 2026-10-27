import React, { useState, useEffect, useRef, FormEvent } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  subscribeToGallery,
  subscribeToSiteConfig,
  addGalleryImage,
  updateGalleryImage,
  deleteGalleryImage,
  updateSiteConfig,
  seedDefaultGallery,
  DEFAULT_SITE_CONFIG
} from '../../lib/galleryService';
import { GalleryImage, SiteConfig } from '../../types';
import {
  Plus,
  Trash2,
  ExternalLink,
  LogOut,
  FolderOpen,
  Image as ImageIcon,
  Sliders,
  Check,
  Upload,
  ArrowUp,
  ArrowDown,
  Layers,
  Sparkles,
  Camera,
  RefreshCw,
  Edit2,
  Eye,
  AlertCircle
} from 'lucide-react';

const CATEGORIES = [
  'Wedding',
  'Portrait',
  'Fashion',
  'Real Estate',
  'Family'
];

export default function AdminDashboard({ onGoHome }: { onGoHome?: () => void }) {
  const { user, signOut } = useAuth();

  // State
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(DEFAULT_SITE_CONFIG);
  const [isFromDb, setIsFromDb] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeTab, setActiveTab] = useState<'gallery' | 'homepage'>('gallery');

  // Modals & Forms
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Form fields for new image
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Portrait');
  const [customCategory, setCustomCategory] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');
  const [isUploadingFile, setIsUploadingFile] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Home page customizer fields
  const [heroImageUrl, setHeroImageUrl] = useState('');
  const [aboutImageUrl, setAboutImageUrl] = useState('');
  const [isSavingConfig, setIsSavingConfig] = useState(false);
  const [configSuccessMsg, setConfigSuccessMsg] = useState<string | null>(null);

  // Seeding state
  const [isSeeding, setIsSeeding] = useState(false);
  const [seedSuccessMsg, setSeedSuccessMsg] = useState<string | null>(null);

  // Subscribe to real-time updates
  useEffect(() => {
    const unsubGallery = subscribeToGallery((data, dbFlag) => {
      setImages(data);
      setIsFromDb(dbFlag);
    });

    const unsubConfig = subscribeToSiteConfig((cfg) => {
      setSiteConfig(cfg);
      setHeroImageUrl(cfg.heroImage);
      setAboutImageUrl(cfg.aboutImage);
    });

    return () => {
      unsubGallery();
      unsubConfig();
    };
  }, []);

  // Handle local file read to optimized base64 data-URL (instant preview and persistent storage)
  const handleFileUpload = (file: File, target: 'new' | 'edit' | 'hero' | 'about') => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file (JPG, PNG, WebP).');
      return;
    }

    setIsUploadingFile(true);
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (target === 'new') setNewImageUrl(result);
      if (target === 'edit' && editingImage) setEditingImage({ ...editingImage, url: result });
      if (target === 'hero') setHeroImageUrl(result);
      if (target === 'about') setAboutImageUrl(result);
      setIsUploadingFile(false);
    };
    reader.onerror = () => {
      alert('Failed to read image file.');
      setIsUploadingFile(false);
    };
    reader.readAsDataURL(file);
  };

  // Add new image
  const handleAddImage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newImageUrl.trim()) {
      alert('Please provide an image URL or upload a file.');
      return;
    }

    const category = newCategory === '__custom' ? customCategory.trim() : newCategory;
    if (!category) {
      alert('Please select or specify a category.');
      return;
    }

    try {
      await addGalleryImage({
        title: newTitle.trim() || 'Untitled',
        category,
        url: newImageUrl.trim(),
        order: images.length > 0 ? Math.max(...images.map(i => i.order || 0)) + 10 : 10,
        createdAt: new Date().toISOString()
      });

      // Reset
      setNewTitle('');
      setNewImageUrl('');
      setNewCategory('Portrait');
      setCustomCategory('');
      setIsUploadModalOpen(false);
    } catch (err) {
      console.error(err);
      alert('Failed to save image. Please verify your connection.');
    }
  };

  // Update image
  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingImage) return;

    try {
      await updateGalleryImage(editingImage.id, {
        title: editingImage.title,
        category: editingImage.category,
        url: editingImage.url,
        order: editingImage.order
      });
      setIsEditModalOpen(false);
      setEditingImage(null);
    } catch (err) {
      console.error(err);
      alert('Failed to update image.');
    }
  };

  // Delete image
  const handleDelete = async (id: string) => {
    try {
      await deleteGalleryImage(id);
      setDeleteConfirmId(null);
    } catch (err) {
      console.error(err);
      alert('Failed to delete image.');
    }
  };

  // Reorder
  const handleMoveOrder = async (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= filteredImages.length) return;

    const currentItem = filteredImages[index];
    const targetItem = filteredImages[targetIndex];

    const currentOrder = currentItem.order ?? index * 10;
    const targetOrder = targetItem.order ?? targetIndex * 10;

    await updateGalleryImage(currentItem.id, { order: targetOrder });
    await updateGalleryImage(targetItem.id, { order: currentOrder });
  };

  // Save Homepage Hero & About config
  const handleSaveHomepageConfig = async () => {
    setIsSavingConfig(true);
    setConfigSuccessMsg(null);
    try {
      await updateSiteConfig({
        heroImage: heroImageUrl.trim(),
        aboutImage: aboutImageUrl.trim()
      });
      setConfigSuccessMsg('Homepage images updated successfully! The live website is updated.');
      setTimeout(() => setConfigSuccessMsg(null), 4000);
    } catch (err) {
      console.error(err);
      alert('Failed to update homepage images.');
    } finally {
      setIsSavingConfig(false);
    }
  };

  // Seed default gallery
  const handleSeed = async () => {
    setIsSeeding(true);
    setSeedSuccessMsg(null);
    try {
      const count = await seedDefaultGallery();
      setSeedSuccessMsg(`Successfully imported ${count} initial portfolio images into your database!`);
      setTimeout(() => setSeedSuccessMsg(null), 5000);
    } catch (err) {
      console.error(err);
      alert('Failed to seed database.');
    } finally {
      setIsSeeding(false);
    }
  };

  // Category filtering
  const allCategories = Array.from(new Set([...CATEGORIES, ...images.map(i => i.category)]));
  const filteredImages = selectedCategory === 'All'
    ? images
    : images.filter(img => img.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div className="min-h-screen bg-[#070707] text-white flex flex-col selection:bg-red-600 selection:text-white">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-black/80 backdrop-blur-xl border-b border-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-red-900 flex items-center justify-center font-serif text-lg font-bold shadow-lg shadow-red-900/40">
              V
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-xl tracking-wide text-white">Vick Photography</h1>
                <span className="text-[10px] uppercase font-bold tracking-widest bg-red-600/20 text-red-400 border border-red-500/30 px-2 py-0.5 rounded-full">
                  Admin
                </span>
              </div>
              <p className="text-zinc-500 text-xs truncate max-w-xs md:max-w-md">
                Logged in as <span className="text-zinc-300 font-mono">{user?.email}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onGoHome || (() => { window.location.href = '/'; })}
              className="hidden sm:flex items-center gap-2 text-xs uppercase tracking-wider text-zinc-300 hover:text-white py-2 px-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5 text-red-500" />
              <span>View Live Website</span>
            </button>

            <button
              onClick={() => signOut()}
              className="flex items-center gap-2 text-xs uppercase tracking-wider text-zinc-400 hover:text-red-400 py-2 px-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-red-500/30 transition-all cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-8 flex-1">
        {/* Sync Prompt if database is empty */}
        {!isFromDb && images.length > 0 && (
          <div className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-red-950/40 to-black border border-red-600/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-red-600/20 rounded-xl text-red-400 mt-1">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-serif font-bold text-white mb-1">
                  Connect Your Existing 28 Photos to Firebase
                </h3>
                <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed max-w-2xl">
                  Your portfolio is currently displaying default fallback images. Click the button to sync them into your live Firestore database so you can reorder, replace, or delete any of them without writing code.
                </p>
              </div>
            </div>
            <button
              onClick={handleSeed}
              disabled={isSeeding}
              className="bg-red-600 hover:bg-red-700 text-white text-xs uppercase tracking-wider font-bold py-3 px-6 rounded-xl transition-all shadow-lg shadow-red-900/40 shrink-0 flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isSeeding ? 'animate-spin' : ''}`} />
              <span>{isSeeding ? 'Syncing...' : 'Sync All 28 Photos'}</span>
            </button>
          </div>
        )}

        {seedSuccessMsg && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 text-xs flex items-center gap-3">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>{seedSuccessMsg}</span>
          </div>
        )}

        {/* Section Tabs */}
        <div className="flex border-b border-white/10 mb-8 gap-8">
          <button
            onClick={() => setActiveTab('gallery')}
            className={`pb-4 text-sm uppercase tracking-wider font-bold flex items-center gap-2.5 transition-colors relative cursor-pointer ${
              activeTab === 'gallery'
                ? 'text-white'
                : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <FolderOpen className="w-4 h-4 text-red-500" />
            <span>Portfolio Archive Folders ({images.length})</span>
            {activeTab === 'gallery' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('homepage')}
            className={`pb-4 text-sm uppercase tracking-wider font-bold flex items-center gap-2.5 transition-colors relative cursor-pointer ${
              activeTab === 'homepage'
                ? 'text-white'
                : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <Sliders className="w-4 h-4 text-red-500" />
            <span>Homepage Cover & Storyteller</span>
            {activeTab === 'homepage' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600" />
            )}
          </button>
        </div>

        {/* ================= TAB 1: GALLERY ARCHIVES ================= */}
        {activeTab === 'gallery' && (
          <div>
            {/* Header Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              {/* Category Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
                <button
                  onClick={() => setSelectedCategory('All')}
                  className={`text-xs px-4 py-2 rounded-full font-medium transition-all whitespace-nowrap cursor-pointer ${
                    selectedCategory === 'All'
                      ? 'bg-red-600 text-white shadow-md shadow-red-900/30'
                      : 'bg-zinc-900 text-zinc-400 hover:text-white border border-white/5'
                  }`}
                >
                  All Folders ({images.length})
                </button>
                {allCategories.map((cat) => {
                  const count = images.filter(i => i.category.toLowerCase() === cat.toLowerCase()).length;
                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`text-xs px-4 py-2 rounded-full font-medium transition-all whitespace-nowrap cursor-pointer ${
                        selectedCategory === cat
                          ? 'bg-red-600 text-white shadow-md shadow-red-900/30'
                          : 'bg-zinc-900 text-zinc-400 hover:text-white border border-white/5'
                      }`}
                    >
                      {cat} ({count})
                    </button>
                  );
                })}
              </div>

              {/* Upload Button */}
              <button
                onClick={() => setIsUploadModalOpen(true)}
                className="bg-red-600 hover:bg-red-700 text-white text-xs uppercase tracking-wider font-bold py-2.5 px-5 rounded-xl transition-all shadow-lg shadow-red-900/30 flex items-center justify-center gap-2 shrink-0 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add / Upload Photo</span>
              </button>
            </div>

            {/* Gallery Grid */}
            {filteredImages.length === 0 ? (
              <div className="p-16 border border-dashed border-white/10 rounded-3xl text-center bg-zinc-950/40">
                <Camera className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
                <h3 className="font-serif text-xl text-white mb-2">No photos in this folder yet</h3>
                <p className="text-zinc-500 text-sm mb-6 max-w-md mx-auto">
                  Click the button below to upload a new photograph or sync the existing portfolio.
                </p>
                <button
                  onClick={() => setIsUploadModalOpen(true)}
                  className="bg-red-600 hover:bg-red-700 text-white text-xs uppercase tracking-wider font-bold py-2.5 px-6 rounded-xl transition-all cursor-pointer"
                >
                  Add Photo
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredImages.map((image, index) => (
                  <div
                    key={image.id}
                    className="group bg-zinc-900/50 border border-white/10 rounded-2xl overflow-hidden hover:border-red-600/40 transition-all duration-300 flex flex-col"
                  >
                    {/* Image Preview Container */}
                    <div className="relative aspect-[4/5] bg-black overflow-hidden">
                      <img
                        src={image.url}
                        alt={image.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                        <div className="flex items-center gap-2 w-full justify-between">
                          <button
                            onClick={() => {
                              setEditingImage(image);
                              setIsEditModalOpen(true);
                            }}
                            className="bg-white/20 hover:bg-white text-white hover:text-black p-2 rounded-lg backdrop-blur-md transition-colors text-xs flex items-center gap-1.5 cursor-pointer font-medium"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                            <span>Edit / Replace</span>
                          </button>

                          <div className="flex items-center gap-1">
                            {index > 0 && (
                              <button
                                onClick={() => handleMoveOrder(index, 'up')}
                                className="bg-black/60 hover:bg-red-600 text-white p-2 rounded-lg backdrop-blur-md transition-colors cursor-pointer"
                                title="Move up"
                              >
                                <ArrowUp className="w-3.5 h-3.5" />
                              </button>
                            )}
                            {index < filteredImages.length - 1 && (
                              <button
                                onClick={() => handleMoveOrder(index, 'down')}
                                className="bg-black/60 hover:bg-red-600 text-white p-2 rounded-lg backdrop-blur-md transition-colors cursor-pointer"
                                title="Move down"
                              >
                                <ArrowDown className="w-3.5 h-3.5" />
                              </button>
                            )}
                            <button
                              onClick={() => setDeleteConfirmId(image.id)}
                              className="bg-red-600/80 hover:bg-red-600 text-white p-2 rounded-lg backdrop-blur-md transition-colors cursor-pointer"
                              title="Delete photograph"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Folder Badge */}
                      <span className="absolute top-3 left-3 bg-black/70 backdrop-blur-md text-[10px] uppercase font-bold tracking-wider text-white px-2.5 py-1 rounded-md border border-white/10">
                        {image.category}
                      </span>
                    </div>

                    {/* Metadata Footer */}
                    <div className="p-4 flex items-center justify-between gap-2 border-t border-white/5 bg-zinc-950/60">
                      <div className="min-w-0">
                        <h4 className="font-serif text-sm font-medium text-white truncate">
                          {image.title}
                        </h4>
                        <p className="text-[11px] text-zinc-500 truncate">
                          Folder: {image.category}
                        </p>
                      </div>

                      <button
                        onClick={() => {
                          setEditingImage(image);
                          setIsEditModalOpen(true);
                        }}
                        className="text-zinc-400 hover:text-white p-1 rounded transition-colors cursor-pointer shrink-0"
                        title="Edit image details"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 2: HOMEPAGE COVER & STORYTELLER ================= */}
        {activeTab === 'homepage' && (
          <div className="max-w-4xl space-y-8">
            <div>
              <h2 className="text-2xl font-serif font-bold text-white mb-2">
                Homepage Featured Photographs
              </h2>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Replace the primary hero banner that visitors first see when landing on the site, as well as the portrait in "The Storyteller" (About Vick) section.
              </p>
            </div>

            {configSuccessMsg && (
              <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 text-xs flex items-center gap-3">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>{configSuccessMsg}</span>
              </div>
            )}

            {/* Hero Image Section */}
            <div className="bg-zinc-900/40 border border-white/10 rounded-3xl p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-2 h-2 rounded-full bg-red-600" />
                <h3 className="font-serif text-lg text-white">First Image on Home Page (Hero Banner)</h3>
              </div>
              <p className="text-zinc-400 text-xs mb-6">
                Full-screen background image displayed at the very top of the home page.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                {/* Preview */}
                <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 bg-black">
                  <img
                    src={heroImageUrl || siteConfig.heroImage}
                    alt="Hero Preview"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute bottom-2 left-2 bg-black/70 backdrop-blur-md text-[10px] text-zinc-300 px-2 py-0.5 rounded">
                    Live Preview
                  </span>
                </div>

                {/* Inputs */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-zinc-400 font-medium mb-1.5">
                      Image URL (Cloudinary or Direct Web URL)
                    </label>
                    <input
                      type="url"
                      value={heroImageUrl}
                      onChange={(e) => setHeroImageUrl(e.target.value)}
                      placeholder="https://res.cloudinary.com/..."
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-red-600"
                    />
                  </div>

                  <div>
                    <span className="text-[11px] text-zinc-500 block mb-2">Or select from your device:</span>
                    <label className="flex items-center justify-center gap-2 p-3 border border-dashed border-white/20 hover:border-red-500 rounded-xl bg-black/30 hover:bg-red-600/5 text-zinc-300 text-xs transition-colors cursor-pointer">
                      <Upload className="w-4 h-4 text-red-500" />
                      <span>Choose New Hero Image</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleFileUpload(file, 'hero');
                        }}
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* About Section Image */}
            <div className="bg-zinc-900/40 border border-white/10 rounded-3xl p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-2 h-2 rounded-full bg-red-600" />
                <h3 className="font-serif text-lg text-white">Second Image After Home Page (About Section / The Storyteller)</h3>
              </div>
              <p className="text-zinc-400 text-xs mb-6">
                Featured portrait shown right beside Vick's personal statement and craft philosophy.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                {/* Preview */}
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 bg-black max-w-xs mx-auto md:mx-0">
                  <img
                    src={aboutImageUrl || siteConfig.aboutImage}
                    alt="About Preview"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute bottom-2 left-2 bg-black/70 backdrop-blur-md text-[10px] text-zinc-300 px-2 py-0.5 rounded">
                    Live Preview
                  </span>
                </div>

                {/* Inputs */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-zinc-400 font-medium mb-1.5">
                      Image URL (Cloudinary or Direct Web URL)
                    </label>
                    <input
                      type="url"
                      value={aboutImageUrl}
                      onChange={(e) => setAboutImageUrl(e.target.value)}
                      placeholder="https://res.cloudinary.com/..."
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-red-600"
                    />
                  </div>

                  <div>
                    <span className="text-[11px] text-zinc-500 block mb-2">Or select from your device:</span>
                    <label className="flex items-center justify-center gap-2 p-3 border border-dashed border-white/20 hover:border-red-500 rounded-xl bg-black/30 hover:bg-red-600/5 text-zinc-300 text-xs transition-colors cursor-pointer">
                      <Upload className="w-4 h-4 text-red-500" />
                      <span>Choose New Storyteller Portrait</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleFileUpload(file, 'about');
                        }}
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end pt-4">
              <button
                onClick={handleSaveHomepageConfig}
                disabled={isSavingConfig}
                className="bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-8 rounded-xl transition-all shadow-lg shadow-red-900/30 flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSavingConfig ? (
                  <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Check className="w-4 h-4" />
                )}
                <span>Save Homepage Images</span>
              </button>
            </div>
          </div>
        )}
      </main>

      {/* ================= MODAL: UPLOAD / ADD NEW PHOTO ================= */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-zinc-900 border border-white/10 rounded-3xl w-full max-w-lg p-6 sm:p-8 shadow-2xl relative">
            <h3 className="text-2xl font-serif text-white mb-1">Add Photograph to Portfolio</h3>
            <p className="text-zinc-400 text-xs mb-6">
              Upload a photograph from your device or paste a Cloudinary/web image link.
            </p>

            <form onSubmit={handleAddImage} className="space-y-5">
              {/* Image Preview & Upload Option */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-zinc-400 font-medium mb-2">
                  Image Source
                </label>
                
                {/* Drag and drop or file picker */}
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-white/15 hover:border-red-500/50 rounded-2xl p-6 text-center bg-black/30 hover:bg-red-950/10 transition-colors cursor-pointer relative overflow-hidden"
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileUpload(file, 'new');
                    }}
                  />

                  {newImageUrl ? (
                    <div className="relative aspect-video rounded-xl overflow-hidden mx-auto max-h-48">
                      <img
                        src={newImageUrl}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <span className="text-xs bg-red-600 text-white py-1 px-3 rounded-lg font-medium">
                          Click to Change
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="py-4">
                      <Upload className="w-8 h-8 text-red-500 mx-auto mb-2" />
                      <p className="text-sm text-zinc-200 font-medium">Click to upload photo from device</p>
                      <p className="text-[11px] text-zinc-500 mt-1">Supports JPG, PNG, WebP</p>
                    </div>
                  )}
                </div>

                {/* Or paste link */}
                <div className="mt-3">
                  <span className="text-[11px] text-zinc-500 block mb-1">Or paste direct Cloudinary / web link:</span>
                  <input
                    type="url"
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    placeholder="https://res.cloudinary.com/..."
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-red-600"
                  />
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-zinc-400 font-medium mb-1.5">
                  Photo Title / Caption
                </label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Joyful Bonds, Golden Hour Kiss"
                  required
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-red-600"
                />
              </div>

              {/* Folder / Category */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-zinc-400 font-medium mb-1.5">
                  Folder / Category
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full bg-black border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-red-600"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      Folder: {cat}
                    </option>
                  ))}
                  <option value="__custom">+ Custom Category Folder...</option>
                </select>

                {newCategory === '__custom' && (
                  <input
                    type="text"
                    value={customCategory}
                    onChange={(e) => setCustomCategory(e.target.value)}
                    placeholder="Enter new folder name (e.g. Commercial)"
                    className="mt-2 w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-red-600"
                    required
                  />
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  className="px-5 py-2.5 text-xs uppercase tracking-wider text-zinc-400 hover:text-white transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUploadingFile || !newImageUrl}
                  className="bg-red-600 hover:bg-red-700 text-white font-medium text-xs uppercase tracking-wider py-2.5 px-6 rounded-xl transition-all shadow-lg shadow-red-900/30 disabled:opacity-50 cursor-pointer"
                >
                  Save to Portfolio
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: EDIT / REPLACE IMAGE ================= */}
      {isEditModalOpen && editingImage && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-zinc-900 border border-white/10 rounded-3xl w-full max-w-lg p-6 sm:p-8 shadow-2xl relative">
            <h3 className="text-2xl font-serif text-white mb-1">Edit / Replace Photograph</h3>
            <p className="text-zinc-400 text-xs mb-6">
              Update the photo URL, title, or folder destination.
            </p>

            <form onSubmit={handleSaveEdit} className="space-y-5">
              {/* Current preview */}
              <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10 bg-black max-h-48">
                <img
                  src={editingImage.url}
                  alt={editingImage.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Replace file */}
              <div>
                <label className="flex items-center justify-center gap-2 p-3 border border-dashed border-white/20 hover:border-red-500 rounded-xl bg-black/30 hover:bg-red-600/5 text-zinc-300 text-xs transition-colors cursor-pointer">
                  <Upload className="w-4 h-4 text-red-500" />
                  <span>Upload New Image to Replace</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileUpload(file, 'edit');
                    }}
                  />
                </label>
              </div>

              {/* URL */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-zinc-400 font-medium mb-1.5">
                  Image URL
                </label>
                <input
                  type="url"
                  value={editingImage.url}
                  onChange={(e) => setEditingImage({ ...editingImage, url: e.target.value })}
                  required
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-red-600"
                />
              </div>

              {/* Title */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-zinc-400 font-medium mb-1.5">
                  Photo Title
                </label>
                <input
                  type="text"
                  value={editingImage.title}
                  onChange={(e) => setEditingImage({ ...editingImage, title: e.target.value })}
                  required
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-red-600"
                />
              </div>

              {/* Folder */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-zinc-400 font-medium mb-1.5">
                  Folder Category
                </label>
                <input
                  type="text"
                  value={editingImage.category}
                  onChange={(e) => setEditingImage({ ...editingImage, category: e.target.value })}
                  required
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-red-600"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-5 py-2.5 text-xs uppercase tracking-wider text-zinc-400 hover:text-white transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-red-600 hover:bg-red-700 text-white font-medium text-xs uppercase tracking-wider py-2.5 px-6 rounded-xl transition-all shadow-lg shadow-red-900/30 cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: DELETE CONFIRMATION ================= */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-red-500/30 rounded-3xl w-full max-w-md p-6 sm:p-8 shadow-2xl text-center">
            <div className="w-12 h-12 rounded-full bg-red-600/20 text-red-500 flex items-center justify-center mx-auto mb-4 border border-red-500/30">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-serif text-white mb-2">Delete Photograph?</h3>
            <p className="text-zinc-400 text-xs mb-6 leading-relaxed">
              Are you sure you want to remove this photo from your portfolio? It will disappear from the live site immediately.
            </p>

            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-5 py-2.5 text-xs uppercase tracking-wider text-zinc-400 hover:text-white rounded-xl bg-white/5 border border-white/10 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="bg-red-600 hover:bg-red-700 text-white text-xs uppercase tracking-wider font-bold py-2.5 px-6 rounded-xl transition-all shadow-lg shadow-red-900/40 cursor-pointer"
              >
                Yes, Delete Photo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
