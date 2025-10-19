'use client';

import { useState } from 'react';
import { Package, Store, BookOpen, Plus, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<'products' | 'storefront' | 'story'>('products');

  return (
    <div className="min-h-screen bg-bg">
      {/* Header */}
      <header className="border-b" style={{ borderColor: 'var(--color-border)' }}>
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-fg">Cement Canvas</h1>
              <p className="text-sm text-fg opacity-70 mt-1">Artisan Marketplace</p>
            </div>
            <Link href="/theme-preview">
              <button className="btn-secondary text-sm">
                Theme Preview
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="border-b" style={{ borderColor: 'var(--color-border)' }}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex gap-1">
            <button
              onClick={() => setActiveTab('products')}
              className={`flex items-center gap-2 px-6 py-4 font-semibold transition-all duration-200 ${
                activeTab === 'products'
                  ? 'border-b-2 text-accent'
                  : 'text-fg opacity-60 hover:opacity-100'
              }`}
              style={activeTab === 'products' ? { borderColor: 'var(--color-accent)' } : {}}
            >
              <Package size={20} />
              Products
            </button>
            <button
              onClick={() => setActiveTab('storefront')}
              className={`flex items-center gap-2 px-6 py-4 font-semibold transition-all duration-200 ${
                activeTab === 'storefront'
                  ? 'border-b-2 text-accent'
                  : 'text-fg opacity-60 hover:opacity-100'
              }`}
              style={activeTab === 'storefront' ? { borderColor: 'var(--color-accent)' } : {}}
            >
              <Store size={20} />
              Storefront
            </button>
            <button
              onClick={() => setActiveTab('story')}
              className={`flex items-center gap-2 px-6 py-4 font-semibold transition-all duration-200 ${
                activeTab === 'story'
                  ? 'border-b-2 text-accent'
                  : 'text-fg opacity-60 hover:opacity-100'
              }`}
              style={activeTab === 'story' ? { borderColor: 'var(--color-accent)' } : {}}
            >
              <BookOpen size={20} />
              Brand Story
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {activeTab === 'products' && <ProductsTab />}
        {activeTab === 'storefront' && <StorefrontTab />}
        {activeTab === 'story' && <BrandStoryTab />}
      </main>
    </div>
  );
}

function ProductsTab() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-fg">Product Listings</h2>
          <p className="text-fg opacity-70 mt-1">Manage your cement art pieces</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus size={20} />
          Add Product
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="card group cursor-pointer hover:scale-105 transition-transform duration-200">
            <div className="aspect-square rounded-xl mb-4 overflow-hidden" style={{ backgroundColor: 'var(--color-bg)' }}>
              <div className="w-full h-full flex items-center justify-center">
                <ShoppingBag size={48} className="text-accent opacity-50" />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-fg mb-2">Product {i}</h3>
            <p className="text-fg opacity-70 text-sm mb-4">Hand-crafted cement piece</p>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-accent">$45</span>
              <span className="text-sm text-fg opacity-60">In Stock</span>
            </div>
          </div>
        ))}
      </div>

      <div className="card">
        <h3 className="text-xl font-semibold text-fg mb-4">Quick Add Product</h3>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-fg mb-2">Product Name</label>
            <input type="text" className="input-field" placeholder="e.g., Minimalist Planter" />
          </div>
          <div>
            <label className="block text-sm font-medium text-fg mb-2">Price (USD)</label>
            <input type="number" className="input-field" placeholder="45" />
          </div>
          <div>
            <label className="block text-sm font-medium text-fg mb-2">Description</label>
            <textarea className="input-field" rows={3} placeholder="Describe your piece..."></textarea>
          </div>
          <button type="submit" className="btn-primary w-full">
            Create Listing
          </button>
        </form>
      </div>
    </div>
  );
}

function StorefrontTab() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-fg">Social Storefront</h2>
        <p className="text-fg opacity-70 mt-1">Your public-facing shop on Farcaster</p>
      </div>

      <div className="card">
        <h3 className="text-xl font-semibold text-fg mb-4">Storefront Preview</h3>
        <div className="space-y-4">
          <div className="aspect-video rounded-xl overflow-hidden" style={{ backgroundColor: 'var(--color-bg)' }}>
            <div className="w-full h-full flex items-center justify-center">
              <Store size={64} className="text-accent opacity-50" />
            </div>
          </div>
          <div className="text-center">
            <h4 className="text-2xl font-bold text-fg mb-2">Your Artisan Shop</h4>
            <p className="text-fg opacity-70">Share your unique cement creations with the community</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-fg mb-3">Customize Layout</h3>
          <div className="space-y-3">
            <button className="btn-secondary w-full">Grid View</button>
            <button className="btn-secondary w-full">List View</button>
            <button className="btn-secondary w-full">Featured + Grid</button>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-fg mb-3">Share Options</h3>
          <div className="space-y-3">
            <button className="btn-primary w-full">Share on Farcaster</button>
            <button className="btn-secondary w-full">Copy Storefront Link</button>
            <button className="btn-secondary w-full">Generate QR Code</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function BrandStoryTab() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-fg">Brand Story Wizard</h2>
        <p className="text-fg opacity-70 mt-1">Tell your unique artisan journey</p>
      </div>

      <div className="card">
        <h3 className="text-xl font-semibold text-fg mb-4">Craft Your Story</h3>
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-fg mb-2">Your Headline</label>
            <input 
              type="text" 
              className="input-field" 
              placeholder="e.g., Transforming Cement into Art Since 2020"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-fg mb-2">Your Story</label>
            <textarea 
              className="input-field" 
              rows={5} 
              placeholder="Share what inspired you to start creating cement art..."
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-fg mb-2">Your Mission</label>
            <textarea 
              className="input-field" 
              rows={3} 
              placeholder="What drives your craft? What do you hope to achieve?"
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-fg mb-2">Your Process</label>
            <div className="space-y-2">
              <input type="text" className="input-field" placeholder="Step 1: Design & Sketch" />
              <input type="text" className="input-field" placeholder="Step 2: Mix & Pour" />
              <input type="text" className="input-field" placeholder="Step 3: Cure & Finish" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-fg mb-2">Core Values</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {['Sustainability', 'Craftsmanship', 'Innovation', 'Community'].map((value) => (
                <span 
                  key={value}
                  className="px-3 py-1 rounded-full text-sm font-medium"
                  style={{ 
                    backgroundColor: 'var(--color-accent)',
                    color: 'var(--color-bg)'
                  }}
                >
                  {value}
                </span>
              ))}
            </div>
            <input type="text" className="input-field" placeholder="Add your own values..." />
          </div>

          <button type="submit" className="btn-primary w-full">
            Save Brand Story
          </button>
        </form>
      </div>

      <div className="card">
        <h3 className="text-lg font-semibold text-fg mb-3">Story Preview</h3>
        <div className="space-y-4 p-4 rounded-xl" style={{ backgroundColor: 'var(--color-bg)' }}>
          <h4 className="text-xl font-bold text-fg">Transforming Cement into Art</h4>
          <p className="text-fg opacity-80">
            Every piece tells a story of patience, precision, and passion. I discovered the beauty 
            of cement art while renovating my first home, and I've been hooked ever since.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-full text-sm" style={{ backgroundColor: 'var(--color-muted)' }}>
              Sustainability
            </span>
            <span className="px-3 py-1 rounded-full text-sm" style={{ backgroundColor: 'var(--color-muted)' }}>
              Craftsmanship
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
