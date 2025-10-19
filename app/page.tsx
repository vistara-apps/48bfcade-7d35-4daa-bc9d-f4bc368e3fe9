'use client';

import { useState } from 'react';
import { Package, Store, BookOpen, Plus } from 'lucide-react';
import Link from 'next/link';
import { ProductCard } from './components/ProductCard';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'products' | 'storefront' | 'story'>('products');

  return (
    <main className="min-h-screen bg-bg text-fg">
      {/* Header */}
      <header className="border-b border-accent/20 bg-bg/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
                <Package className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Cement Canvas</h1>
                <p className="text-sm text-fg/60">Artisan Marketplace</p>
              </div>
            </div>
            <Link 
              href="/theme-preview"
              className="text-sm text-accent hover:text-accent/80 transition-colors"
            >
              Themes
            </Link>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="border-b border-accent/10 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex gap-1">
            <button
              onClick={() => setActiveTab('products')}
              className={`flex items-center gap-2 px-4 py-3 rounded-t-lg transition-all ${
                activeTab === 'products'
                  ? 'bg-bg text-accent border-b-2 border-accent'
                  : 'text-fg/60 hover:text-fg hover:bg-muted/50'
              }`}
            >
              <Package className="w-4 h-4" />
              <span className="font-medium">Products</span>
            </button>
            <button
              onClick={() => setActiveTab('storefront')}
              className={`flex items-center gap-2 px-4 py-3 rounded-t-lg transition-all ${
                activeTab === 'storefront'
                  ? 'bg-bg text-accent border-b-2 border-accent'
                  : 'text-fg/60 hover:text-fg hover:bg-muted/50'
              }`}
            >
              <Store className="w-4 h-4" />
              <span className="font-medium">Storefront</span>
            </button>
            <button
              onClick={() => setActiveTab('story')}
              className={`flex items-center gap-2 px-4 py-3 rounded-t-lg transition-all ${
                activeTab === 'story'
                  ? 'bg-bg text-accent border-b-2 border-accent'
                  : 'text-fg/60 hover:text-fg hover:bg-muted/50'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span className="font-medium">Brand Story</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {activeTab === 'products' && <ProductsTab />}
        {activeTab === 'storefront' && <StorefrontTab />}
        {activeTab === 'story' && <StoryTab />}
      </div>
    </main>
  );
}

function ProductsTab() {
  // Sample products with payment enabled
  const products = [
    {
      id: 1,
      name: 'Minimalist Cement Planter',
      description: 'Handcrafted concrete planter with drainage',
      price: 45.00,
    },
    {
      id: 2,
      name: 'Geometric Cement Sculpture',
      description: 'Modern abstract cement art piece',
      price: 89.00,
    },
    {
      id: 3,
      name: 'Industrial Cement Coasters',
      description: 'Set of 4 polished cement coasters',
      price: 28.00,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Your Products</h2>
          <p className="text-fg/60 mt-1">Manage your cement decorative pieces</p>
        </div>
        <button className="flex items-center gap-2 bg-accent text-white px-4 py-2 rounded-xl hover:bg-accent/90 transition-colors">
          <Plus className="w-4 h-4" />
          Add Product
        </button>
      </div>

      {/* Quick Add Form */}
      <div className="bg-muted/30 rounded-2xl p-6 border border-accent/10">
        <h3 className="text-lg font-semibold mb-4">Quick Product Listing</h3>
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Product Name</label>
              <input
                type="text"
                placeholder="e.g., Minimalist Cement Planter"
                className="w-full bg-bg border border-accent/20 rounded-xl px-4 py-2 focus:outline-none focus:border-accent transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Price (USD)</label>
              <input
                type="number"
                placeholder="0.00"
                className="w-full bg-bg border border-accent/20 rounded-xl px-4 py-2 focus:outline-none focus:border-accent transition-colors"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              rows={3}
              placeholder="Describe your piece, materials used, and what makes it special..."
              className="w-full bg-bg border border-accent/20 rounded-xl px-4 py-2 focus:outline-none focus:border-accent transition-colors resize-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <select className="w-full bg-bg border border-accent/20 rounded-xl px-4 py-2 focus:outline-none focus:border-accent transition-colors">
                <option>Planters & Pots</option>
                <option>Sculptures</option>
                <option>Tiles & Panels</option>
                <option>Furniture</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Dimensions</label>
              <input
                type="text"
                placeholder="e.g., 6x6x8 inches"
                className="w-full bg-bg border border-accent/20 rounded-xl px-4 py-2 focus:outline-none focus:border-accent transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Weight</label>
              <input
                type="text"
                placeholder="e.g., 2.5 lbs"
                className="w-full bg-bg border border-accent/20 rounded-xl px-4 py-2 focus:outline-none focus:border-accent transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Product Image</label>
            <div className="border-2 border-dashed border-accent/20 rounded-xl p-8 text-center hover:border-accent/40 transition-colors cursor-pointer">
              <Plus className="w-8 h-8 text-accent mx-auto mb-2" />
              <p className="text-sm text-fg/60">Click to upload or drag and drop</p>
              <p className="text-xs text-fg/40 mt-1">PNG, JPG up to 10MB</p>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-accent text-white py-3 rounded-xl font-medium hover:bg-accent/90 transition-colors"
          >
            Create Product Listing
          </button>
        </form>
      </div>

      {/* Products with Payment Integration */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

function StorefrontTab() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Social Storefront</h2>
        <p className="text-fg/60 mt-1">Customize your public-facing shop</p>
      </div>

      {/* Profile Section */}
      <div className="bg-muted/30 rounded-2xl p-6 border border-accent/10">
        <h3 className="text-lg font-semibold mb-4">Artisan Profile</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center">
              <Store className="w-10 h-10 text-accent" />
            </div>
            <button className="text-sm text-accent hover:text-accent/80 transition-colors">
              Upload Photo
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Artisan Name</label>
              <input
                type="text"
                placeholder="Your name or studio name"
                className="w-full bg-bg border border-accent/20 rounded-xl px-4 py-2 focus:outline-none focus:border-accent transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Location</label>
              <input
                type="text"
                placeholder="City, State"
                className="w-full bg-bg border border-accent/20 rounded-xl px-4 py-2 focus:outline-none focus:border-accent transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Bio</label>
            <textarea
              rows={4}
              placeholder="Tell customers about yourself and your craft..."
              className="w-full bg-bg border border-accent/20 rounded-xl px-4 py-2 focus:outline-none focus:border-accent transition-colors resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Specialties (comma-separated)</label>
            <input
              type="text"
              placeholder="e.g., Planters, Sculptures, Custom Orders"
              className="w-full bg-bg border border-accent/20 rounded-xl px-4 py-2 focus:outline-none focus:border-accent transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Storefront Preview */}
      <div className="bg-muted/30 rounded-2xl p-6 border border-accent/10">
        <h3 className="text-lg font-semibold mb-4">Storefront Preview</h3>
        <div className="bg-bg rounded-xl p-6 border border-accent/10">
          <div className="text-center mb-6">
            <div className="w-24 h-24 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
              <Store className="w-12 h-12 text-accent" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Your Artisan Studio</h2>
            <p className="text-fg/60">Handcrafted cement decorative pieces</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-square bg-muted/50 rounded-xl flex items-center justify-center">
                <Package className="w-8 h-8 text-accent/40" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <button className="w-full bg-accent text-white py-3 rounded-xl font-medium hover:bg-accent/90 transition-colors">
        Save Storefront Settings
      </button>
    </div>
  );
}

function StoryTab() {
  const [currentPrompt, setCurrentPrompt] = useState(0);
  const prompts = [
    'What inspired you to start working with cement?',
    'Describe your creative process from concept to finished piece',
    'What makes your cement pieces unique?',
    'What values guide your craft?'
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Brand Story Wizard</h2>
        <p className="text-fg/60 mt-1">Share your journey and connect with customers</p>
      </div>

      {/* Story Prompt Card */}
      <div className="bg-muted/30 rounded-2xl p-8 border border-accent/10">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-accent font-medium">
              Question {currentPrompt + 1} of {prompts.length}
            </span>
            <div className="flex gap-2">
              {prompts.map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    i === currentPrompt ? 'bg-accent' : 'bg-accent/20'
                  }`}
                />
              ))}
            </div>
          </div>
          <h3 className="text-xl font-semibold mb-4">{prompts[currentPrompt]}</h3>
        </div>

        <textarea
          rows={8}
          placeholder="Share your story here... Be authentic and let your passion shine through."
          className="w-full bg-bg border border-accent/20 rounded-xl px-4 py-3 focus:outline-none focus:border-accent transition-colors resize-none mb-4"
        />

        <div className="flex gap-3">
          <button
            onClick={() => setCurrentPrompt(Math.max(0, currentPrompt - 1))}
            disabled={currentPrompt === 0}
            className="px-6 py-2 rounded-xl border border-accent/20 hover:bg-muted/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentPrompt(Math.min(prompts.length - 1, currentPrompt + 1))}
            className="flex-1 bg-accent text-white py-2 rounded-xl font-medium hover:bg-accent/90 transition-colors"
          >
            {currentPrompt === prompts.length - 1 ? 'Complete Story' : 'Next Question'}
          </button>
        </div>
      </div>

      {/* Story Tips */}
      <div className="bg-accent/10 rounded-2xl p-6 border border-accent/20">
        <h4 className="font-semibold mb-3 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-accent" />
          Storytelling Tips
        </h4>
        <ul className="space-y-2 text-sm text-fg/80">
          <li className="flex items-start gap-2">
            <span className="text-accent mt-1">•</span>
            <span>Be authentic - customers connect with genuine stories</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent mt-1">•</span>
            <span>Share specific details about your process and materials</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent mt-1">•</span>
            <span>Explain what makes your work unique and valuable</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent mt-1">•</span>
            <span>Include your values and commitment to quality</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
