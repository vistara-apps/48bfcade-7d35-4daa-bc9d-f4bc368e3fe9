'use client';

import { useTheme } from '../components/ThemeProvider';
import { Package, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const themes = [
  { id: 'default', name: 'Warm Social', description: 'Cozy community spaces with coral accents' },
  { id: 'celo', name: 'Celo', description: 'Bold black and yellow with sharp edges' },
  { id: 'solana', name: 'Solana', description: 'Deep purple with vibrant magenta' },
  { id: 'base', name: 'Base', description: 'Dark blue with Base brand colors' },
  { id: 'coinbase', name: 'Coinbase', description: 'Navy with Coinbase blue accents' }
] as const;

export default function ThemePreview() {
  const { theme, setTheme } = useTheme();

  return (
    <main className="min-h-screen bg-bg text-fg">
      <header className="border-b border-accent/20 bg-bg/95 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Link 
            href="/"
            className="flex items-center gap-2 text-accent hover:text-accent/80 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to App
          </Link>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Theme Preview</h1>
          <p className="text-fg/60">Choose a theme for your Cement Canvas experience</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {themes.map((t) => (
            <button
              key={t.id}
              onClick={() => setTheme(t.id as any)}
              className={`text-left p-6 rounded-2xl border-2 transition-all ${
                theme === t.id
                  ? 'border-accent bg-accent/10'
                  : 'border-accent/20 hover:border-accent/40 bg-muted/30'
              }`}
            >
              <h3 className="text-xl font-bold mb-2">{t.name}</h3>
              <p className="text-sm text-fg/60">{t.description}</p>
              {theme === t.id && (
                <div className="mt-4 text-sm text-accent font-medium">✓ Active</div>
              )}
            </button>
          ))}
        </div>

        {/* Preview Components */}
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">Component Preview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Card */}
              <div className="bg-muted/30 rounded-2xl p-6 border border-accent/10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                    <Package className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Product Card</h3>
                    <p className="text-sm text-fg/60">Sample item</p>
                  </div>
                </div>
                <p className="text-sm text-fg/80 mb-4">
                  This is a preview of how cards will look with the current theme.
                </p>
                <button className="w-full bg-accent text-white py-2 rounded-xl hover:bg-accent/90 transition-colors">
                  Primary Button
                </button>
              </div>

              {/* Form */}
              <div className="bg-muted/30 rounded-2xl p-6 border border-accent/10">
                <h3 className="font-semibold mb-4">Form Elements</h3>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Text input"
                    className="w-full bg-bg border border-accent/20 rounded-xl px-4 py-2 focus:outline-none focus:border-accent transition-colors"
                  />
                  <textarea
                    rows={3}
                    placeholder="Textarea"
                    className="w-full bg-bg border border-accent/20 rounded-xl px-4 py-2 focus:outline-none focus:border-accent transition-colors resize-none"
                  />
                  <button className="w-full border border-accent/20 py-2 rounded-xl hover:bg-muted/50 transition-colors">
                    Secondary Button
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Color Palette */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Color Palette</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <div className="h-24 bg-bg rounded-xl border border-accent/20"></div>
                <p className="text-sm font-medium">Background</p>
              </div>
              <div className="space-y-2">
                <div className="h-24 bg-fg rounded-xl"></div>
                <p className="text-sm font-medium">Foreground</p>
              </div>
              <div className="space-y-2">
                <div className="h-24 bg-accent rounded-xl"></div>
                <p className="text-sm font-medium">Accent</p>
              </div>
              <div className="space-y-2">
                <div className="h-24 bg-muted rounded-xl"></div>
                <p className="text-sm font-medium">Muted</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
