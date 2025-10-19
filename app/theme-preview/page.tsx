'use client';

import { useTheme } from '../components/ThemeProvider';
import { Palette } from 'lucide-react';

export default function ThemePreviewPage() {
  const { theme, setTheme } = useTheme();

  const themes = [
    { id: 'default', name: 'Warm Social', description: 'Cozy community spaces' },
    { id: 'celo', name: 'Celo', description: 'Bold yellow accents' },
    { id: 'solana', name: 'Solana', description: 'Purple gradient vibes' },
    { id: 'base', name: 'Base', description: 'Classic blue theme' },
    { id: 'coinbase', name: 'Coinbase', description: 'Professional navy' },
  ] as const;

  return (
    <div className="min-h-screen bg-bg">
      <header className="border-b" style={{ borderColor: 'var(--color-border)' }}>
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <Palette className="text-accent" size={32} />
            <div>
              <h1 className="text-3xl font-bold text-fg">Theme Preview</h1>
              <p className="text-sm text-fg opacity-70 mt-1">Explore different blockchain themes</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="space-y-8">
          <div className="card">
            <h2 className="text-2xl font-bold text-fg mb-4">Select Theme</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {themes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTheme(t.id as any)}
                  className={`p-6 rounded-xl transition-all duration-200 text-left ${
                    theme === t.id
                      ? 'ring-2 scale-105'
                      : 'hover:scale-105'
                  }`}
                  style={{
                    backgroundColor: 'var(--color-muted)',
                    borderColor: theme === t.id ? 'var(--color-accent)' : 'var(--color-border)',
                    border: '2px solid',
                  }}
                >
                  <h3 className="text-lg font-semibold text-fg mb-1">{t.name}</h3>
                  <p className="text-sm text-fg opacity-70">{t.description}</p>
                  {theme === t.id && (
                    <div className="mt-3 text-sm font-medium text-accent">✓ Active</div>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="card">
            <h2 className="text-2xl font-bold text-fg mb-6">Component Preview</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-fg mb-3">Buttons</h3>
                <div className="flex flex-wrap gap-3">
                  <button className="btn-primary">Primary Button</button>
                  <button className="btn-secondary">Secondary Button</button>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-fg mb-3">Input Fields</h3>
                <input type="text" className="input-field" placeholder="Enter text..." />
              </div>

              <div>
                <h3 className="text-lg font-semibold text-fg mb-3">Cards</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="card">
                    <h4 className="text-lg font-semibold text-fg mb-2">Sample Card</h4>
                    <p className="text-fg opacity-70">This is how cards look in the current theme.</p>
                  </div>
                  <div className="card">
                    <h4 className="text-lg font-semibold text-fg mb-2">Another Card</h4>
                    <p className="text-fg opacity-70">Cards adapt to the selected theme colors.</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-fg mb-3">Color Palette</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <div className="h-20 rounded-lg" style={{ backgroundColor: 'var(--color-bg)' }}></div>
                    <p className="text-sm text-fg">Background</p>
                  </div>
                  <div className="space-y-2">
                    <div className="h-20 rounded-lg" style={{ backgroundColor: 'var(--color-fg)' }}></div>
                    <p className="text-sm text-fg">Foreground</p>
                  </div>
                  <div className="space-y-2">
                    <div className="h-20 rounded-lg" style={{ backgroundColor: 'var(--color-accent)' }}></div>
                    <p className="text-sm text-fg">Accent</p>
                  </div>
                  <div className="space-y-2">
                    <div className="h-20 rounded-lg" style={{ backgroundColor: 'var(--color-muted)' }}></div>
                    <p className="text-sm text-fg">Muted</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
