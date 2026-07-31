import React, { useMemo, useState } from 'react';
import { ArrowRight, Layout, ShoppingBag, Calendar, Sparkles, Zap, Shield, Heart, X, Search, Mail, Sun, Moon } from 'lucide-react';
import { TEMPLATE_PRESETS } from '../../templates/presets';
import type { TemplatePreset } from '../../templates/presets';
import { renderToHtml } from '@unlayer/react-elements';
import { QuantumTemplate } from '../../templates/QuantumTemplate';

interface LandingPageProps {
  onLaunchPlayground: (presetId?: string) => void;
  appTheme: 'dark' | 'light';
  onToggleTheme: () => void;
}

const CATEGORIES = [
  { key: 'all', label: 'All Layouts', icon: Layout },
  { key: 'editorial', label: 'Newsletters', icon: Layout },
  { key: 'commerce', label: 'E-Commerce', icon: ShoppingBag },
  { key: 'event', label: 'Events & Launches', icon: Calendar },
] as const;

type CategoryKey = typeof CATEGORIES[number]['key'];

export const LandingPage: React.FC<LandingPageProps> = ({ 
  onLaunchPlayground, 
  appTheme, 
  onToggleTheme 
}) => {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPresets = useMemo(() => {
    return TEMPLATE_PRESETS.filter(p => {
      const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
      const matchesSearch = searchQuery === '' || 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const editorialPresets = useMemo(() => filteredPresets.filter(p => p.category === 'editorial'), [filteredPresets]);
  const commercePresets = useMemo(() => filteredPresets.filter(p => p.category === 'commerce'), [filteredPresets]);
  const eventPresets = useMemo(() => filteredPresets.filter(p => p.category === 'event'), [filteredPresets]);

  return (
    <div className={`min-h-screen flex flex-col selection:bg-[#ffffff] selection:text-[#000000] relative overflow-hidden transition-colors duration-300 ${
      appTheme === 'dark' ? 'bg-[#030303] text-[#fafafa]' : 'bg-[#f4f4f5] text-[#18181b]'
    }`}>
      
      {/* DECORATIVE LIGHT BLOBS */}
      {appTheme === 'dark' && (
        <>
          <div className="blur-blob-purple top-[-100px] left-[-50px]" />
          <div className="blur-blob-pink bottom-[20%] right-[-100px]" />
        </>
      )}
      
      {/* NAVBAR */}
      <nav className={`px-6 py-4 flex items-center justify-between sticky top-0 z-50 shadow-sm transition-all duration-300 ${
        appTheme === 'dark' ? 'glass-premium border-b border-white/[0.04]' : 'bg-white/80 border-b border-zinc-200/80 backdrop-blur-md'
      }`}>
        <div className="flex items-center space-x-3">
          <div className="h-9 w-9 rounded-xl overflow-hidden flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-[1.5px] shadow-lg shadow-indigo-500/10">
            <div className={`h-full w-full rounded-[10px] flex items-center justify-center ${appTheme === 'dark' ? 'bg-black' : 'bg-white'}`}>
              <Mail className={`h-4 w-4 animate-pulse ${appTheme === 'dark' ? 'text-white' : 'text-indigo-600'}`} />
            </div>
          </div>
          <div>
            <span className={`font-extrabold tracking-wider text-sm uppercase ${appTheme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>MailCraft</span>
            <span className={`text-[8px] block tracking-widest uppercase font-bold mt-0.5 ${appTheme === 'dark' ? 'text-[#71717a]' : 'text-zinc-500'}`}>Premium Email Studio</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2.5">
          {/* GitHub link */}
          <a href="https://github.com/unlayer/elements" target="_blank" rel="noopener noreferrer"
            className={`text-xs transition duration-250 flex items-center space-x-1.5 px-3.5 py-2 rounded-lg border shadow-sm ${
              appTheme === 'dark' 
                ? 'text-[#71717a] hover:text-white bg-white/[0.02] border-white/[0.04] hover:bg-white/[0.06] hover:border-white/[0.08]' 
                : 'text-zinc-650 hover:text-zinc-900 bg-zinc-100 border border-zinc-200 hover:bg-zinc-200/60'
            }`}
          >
            <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
            <span className="hidden sm:inline font-semibold">GitHub</span>
          </a>

          {/* Theme Toggle Button */}
          <button 
            onClick={onToggleTheme}
            className={`p-1.5 rounded-lg border transition duration-150 flex items-center justify-center cursor-pointer active:scale-95 ${
              appTheme === 'dark'
                ? 'bg-transparent border-transparent text-zinc-400 hover:text-white hover:bg-white/[0.04]'
                : 'bg-transparent border-transparent text-zinc-650 hover:text-zinc-950 hover:bg-zinc-100'
            }`}
            title={appTheme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {appTheme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-650" />
            )}
          </button>

          {/* Open Studio */}
          <button onClick={() => onLaunchPlayground('weekly-digest')}
            className={`px-4 py-2 text-xs font-bold rounded-lg shadow-lg active:scale-95 transition-all duration-200 flex items-center space-x-1.5 cursor-pointer ${
              appTheme === 'dark' 
                ? 'bg-[#ffffff] hover:bg-neutral-200 text-black shadow-white/5' 
                : 'bg-[#09090b] hover:bg-zinc-800 text-white shadow-zinc-200/50'
            }`}
          >
            <span>Open Studio</span>
            <ArrowRight className={`h-3.5 w-3.5 ${appTheme === 'dark' ? 'text-black' : 'text-white'}`} />
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header className={`relative bg-grid border-b py-24 px-6 overflow-hidden z-10 transition-colors duration-300 ${
        appTheme === 'dark' ? 'border-white/[0.04]' : 'border-zinc-200'
      }`}>
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-14">
          
          {/* Left Intro content */}
          <div className="flex-1 space-y-7 text-left animate-fade-in-up">
            <div className={`inline-flex items-center space-x-2 border px-4 py-1.5 rounded-full ${
              appTheme === 'dark' ? 'bg-white/[0.03] border-white/[0.06] text-zinc-300' : 'bg-zinc-100 border-zinc-200 text-zinc-650'
            }`}>
              <Sparkles className="h-3.5 w-3.5 text-indigo-400 animate-pulse" />
              <span className="text-[10px] font-bold tracking-wider uppercase">Unlayer Elements Sandbox</span>
            </div>
            
            <h1 className={`text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.05] font-extrabold uppercase ${
              appTheme === 'dark' ? 'text-white' : 'text-zinc-900'
            }`}>
              The Premium <br/>
              <span className="text-gradient-neon font-black">Email Studio</span>
            </h1>
            
            <p className={`text-sm md:text-[14.5px] leading-relaxed max-w-lg font-normal ${
              appTheme === 'dark' ? 'text-[#a1a1aa]' : 'text-zinc-600'
            }`}>
              Create gorgeous, email-client compliant templates with absolute structural precision. Powered by `@unlayer/react-elements` for complete custom themes. Reorder layers, live-preview responsive grids, and export responsive HTML.
            </p>
            
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => onLaunchPlayground('weekly-digest')}
                className={`px-6 py-4 text-xs font-bold rounded-xl transition duration-200 shadow-xl active:scale-95 flex items-center gap-1.5 cursor-pointer ${
                  appTheme === 'dark' ? 'bg-white text-black hover:bg-neutral-200 shadow-white/5' : 'bg-[#09090b] text-white hover:bg-zinc-800 shadow-zinc-200'
                }`}
              >
                <span>Launch Interactive Studio</span>
                <ArrowRight className={`h-4 w-4 ${appTheme === 'dark' ? 'text-black' : 'text-white'}`} />
              </button>
              
              <a href="#gallery" className={`px-6 py-4 border rounded-xl text-xs font-bold transition duration-200 active:scale-95 shadow ${
                appTheme === 'dark'
                  ? 'border-white/10 hover:border-white/20 bg-white/[0.02] hover:bg-white/[0.05] text-white'
                  : 'border-zinc-300 hover:border-zinc-400 bg-white hover:bg-zinc-50 text-zinc-850'
              }`}>
                Browse 18 Templates
              </a>
            </div>

            {/* Micro Highlights */}
            <div className={`grid grid-cols-3 gap-6 pt-6 border-t max-w-md ${
              appTheme === 'dark' ? 'border-white/[0.06]' : 'border-zinc-200'
            }`}>
              <div>
                <div className={`text-xl font-extrabold font-mono-tech ${appTheme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>18</div>
                <div className={`text-[9px] font-bold uppercase tracking-widest mt-0.5 ${appTheme === 'dark' ? 'text-[#71717a]' : 'text-zinc-550'}`}>Presets</div>
              </div>
              <div>
                <div className={`text-xl font-extrabold font-mono-tech ${appTheme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>0%</div>
                <div className={`text-[9px] font-bold uppercase tracking-widest mt-0.5 ${appTheme === 'dark' ? 'text-[#71717a]' : 'text-zinc-550'}`}>JS Overhead</div>
              </div>
              <div>
                <div className={`text-xl font-extrabold font-mono-tech ${appTheme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>100%</div>
                <div className={`text-[9px] font-bold uppercase tracking-widest mt-0.5 ${appTheme === 'dark' ? 'text-[#71717a]' : 'text-zinc-550'}`}>Responsive</div>
              </div>
            </div>
          </div>

          {/* Right Floating Mockup */}
          <div className="flex-1 w-full flex justify-center animate-fade-in-up stagger-2">
            <div className="relative max-w-sm w-full animate-float">
              {appTheme === 'dark' && <div className="absolute -inset-4 bg-indigo-500/5 rounded-2xl blur-2xl opacity-40" />}
              <div className={`border p-3 rounded-2xl shadow-2xl transition-colors duration-300 ${
                appTheme === 'dark' ? 'border-white/[0.06] bg-[#09090b]' : 'border-zinc-200 bg-white'
              }`}>
                <img
                  src="/landing_hero.png"
                  alt="Email builder canvas preview mockup"
                  className="w-full h-auto rounded-xl opacity-95 hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* TEMPLATE SECTION */}
      <section id="gallery" className="max-w-[1400px] mx-auto w-full px-6 py-20 md:py-28 space-y-16 relative z-10">
        
        {/* Section Title */}
        <div className="text-center space-y-5 max-w-xl mx-auto">
          <h2 className={`text-2xl md:text-3.5xl font-black tracking-tight uppercase font-editorial ${
            appTheme === 'dark' ? 'text-white' : 'text-zinc-900'
          }`}>
            Choose a Template Preset
          </h2>
          <p className={`text-sm leading-relaxed font-normal ${
            appTheme === 'dark' ? 'text-[#a1a1aa]' : 'text-zinc-600'
          }`}>
            Launch any layout directly in the sandbox playground to live-edit content blocks, re-arrange section layers, tweak palette themes, and compile responsive tables.
          </p>

          {/* Search bar & Categories filter */}
          <div className="pt-4 flex flex-col sm:flex-row items-center gap-3.5 justify-center">
            {/* Search */}
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#71717a]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search templates..."
                className={`w-full pl-10 pr-8 py-2.5 border rounded-xl text-xs transition duration-205 focus:outline-none ${
                  appTheme === 'dark' 
                    ? 'bg-black/60 border-white/[0.06] text-[#fafafa] placeholder-[#52525b] focus:border-indigo-500' 
                    : 'bg-white border-zinc-300 text-zinc-900 placeholder-zinc-400 focus:border-indigo-600'
                }`}
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-3.5 top-1/2 -translate-y-1/2 cursor-pointer">
                  <X className="h-3 w-3 text-[#71717a] hover:text-white" />
                </button>
              )}
            </div>

            {/* Filter Tabs */}
            <div className={`flex items-center gap-1 border rounded-xl p-1 w-full sm:w-auto overflow-x-auto ${
              appTheme === 'dark' ? 'bg-black/60 border-white/[0.06]' : 'bg-zinc-150 border-zinc-250'
            }`}>
              {CATEGORIES.map(cat => {
                const isActive = activeCategory === cat.key;
                return (
                  <button
                    key={cat.key}
                    onClick={() => setActiveCategory(cat.key)}
                    className={`px-3.5 py-2 rounded-lg text-[10px] font-extrabold uppercase tracking-wider transition duration-200 whitespace-nowrap cursor-pointer ${
                      isActive
                        ? (appTheme === 'dark' ? 'bg-white text-black shadow-md' : 'bg-[#09090b] text-white shadow-sm')
                        : (appTheme === 'dark' ? 'text-[#71717a] hover:text-white' : 'text-zinc-500 hover:text-zinc-900')
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Categories rendering */}
        <div className="space-y-14">
          {(activeCategory === 'all' || activeCategory === 'editorial') && editorialPresets.length > 0 && (
            <TemplateCategoryRow
              title="MINIMALIST JOURNAL"
              subtitle="Clean newsletters, editorial digests, and weekly curation boards"
              presets={editorialPresets}
              onLaunch={onLaunchPlayground}
              appTheme={appTheme}
            />
          )}

          {(activeCategory === 'all' || activeCategory === 'commerce') && commercePresets.length > 0 && (
            <TemplateCategoryRow
              title="PRODUCT SHOWCASE"
              subtitle="Promotional catalogs, new item releases, discount vouchers"
              presets={commercePresets}
              onLaunch={onLaunchPlayground}
              appTheme={appTheme}
            />
          )}

          {(activeCategory === 'all' || activeCategory === 'event') && eventPresets.length > 0 && (
            <TemplateCategoryRow
              title="EVENTS & LAUNCHES"
              subtitle="Event invites, product launch timelines, speaker spotlights"
              presets={eventPresets}
              onLaunch={onLaunchPlayground}
              appTheme={appTheme}
            />
          )}

          {filteredPresets.length === 0 && (
            <div className="text-center py-16">
              <p className="text-sm text-[#71717a]">No presets matching your criteria found.</p>
              <button onClick={() => { setSearchQuery(''); setActiveCategory('all'); }} className="mt-3 text-xs text-indigo-400 font-bold hover:underline">
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CORE BENEFITS */}
      <section className={`border-t py-24 px-6 relative z-10 transition-colors duration-300 ${
        appTheme === 'dark' ? 'border-white/[0.04] bg-[#050507]' : 'border-zinc-200 bg-[#fbfbfb]'
      }`}>
        <div className="max-w-6xl mx-auto space-y-16 text-center">
          <div className="space-y-4 max-w-xl mx-auto">
            <h2 className={`text-2xl md:text-3.5xl font-black uppercase font-editorial ${
              appTheme === 'dark' ? 'text-white' : 'text-zinc-900'
            }`}>Engineered for Reliability</h2>
            <p className={`text-sm font-normal leading-relaxed ${
              appTheme === 'dark' ? 'text-[#a1a1aa]' : 'text-zinc-600'
            }`}>
              Email layouts compile into robust, standardized table markup. High compatibility across standard web clients and mobile mail software.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className={`p-7 rounded-2xl space-y-5 transition-all ${
              appTheme === 'dark' ? 'glass-card' : 'bg-white border border-zinc-200 shadow-sm'
            }`}>
              <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${
                appTheme === 'dark' ? 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400' : 'bg-indigo-50 border-indigo-200 text-indigo-600'
              }`}>
                <Zap className="h-5 w-5 animate-pulse" />
              </div>
              <h3 className={`text-sm font-bold uppercase tracking-widest ${appTheme === 'dark' ? 'text-white' : 'text-zinc-800'}`}>Fast Compilation</h3>
              <p className={`text-[12.5px] leading-relaxed font-normal ${appTheme === 'dark' ? 'text-[#a1a1aa]' : 'text-zinc-650'}`}>
                React elements compile locally on the fly. Change inputs in the sidebar and watch the responsive visual canvas render updates instantly.
              </p>
            </div>

            <div className={`p-7 rounded-2xl space-y-5 transition-all ${
              appTheme === 'dark' ? 'glass-card' : 'bg-white border border-zinc-200 shadow-sm'
            }`}>
              <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${
                appTheme === 'dark' ? 'bg-purple-500/10 border-purple-500/20 text-purple-400' : 'bg-purple-50 border-purple-200 text-purple-600'
              }`}>
                <Shield className="h-5 w-5" />
              </div>
              <h3 className={`text-sm font-bold uppercase tracking-widest ${appTheme === 'dark' ? 'text-white' : 'text-zinc-800'}`}>Secure Layouts</h3>
              <p className={`text-[12.5px] leading-relaxed font-normal ${appTheme === 'dark' ? 'text-[#a1a1aa]' : 'text-zinc-650'}`}>
                HTML generated by Unlayer Elements guarantees safe rendering across Gmail, Outlook, and Apple Mail by utilizing robust table primitives.
              </p>
            </div>

            <div className={`p-7 rounded-2xl space-y-5 transition-all ${
              appTheme === 'dark' ? 'glass-card' : 'bg-white border border-zinc-200 shadow-sm'
            }`}>
              <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${
                appTheme === 'dark' ? 'bg-pink-500/10 border-pink-500/20 text-pink-400' : 'bg-pink-50 border-pink-200 text-pink-600'
              }`}>
                <Heart className="h-5 w-5" />
              </div>
              <h3 className={`text-sm font-bold uppercase tracking-widest ${appTheme === 'dark' ? 'text-white' : 'text-zinc-800'}`}>Highly Themeable</h3>
              <p className={`text-[12.5px] leading-relaxed font-normal ${appTheme === 'dark' ? 'text-[#a1a1aa]' : 'text-zinc-650'}`}>
                Fully dynamic color variables hook directly into every card, heading, button, and border. Match your brand aesthetics effortlessly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className={`border-t px-6 py-10 text-center text-xs select-none mt-auto relative z-10 transition-colors ${
        appTheme === 'dark' ? 'border-white/[0.04] bg-[#000000] text-[#52525b]' : 'border-zinc-200 bg-zinc-100 text-zinc-500'
      }`}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <div className="h-6 w-6 rounded-lg overflow-hidden flex items-center justify-center bg-black border border-white/10 p-[1px]">
              <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-pink-500 rounded flex items-center justify-center">
                <Mail className="h-3 w-3 text-white" />
              </div>
            </div>
            <span className={`font-extrabold tracking-widest uppercase ${appTheme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>MailCraft</span>
            <span className={`text-[10px] ${appTheme === 'dark' ? 'text-[#3f3f46]' : 'text-zinc-400'}`}>• Premium Studio</span>
          </div>
          <p>© {new Date().getFullYear()} MailCraft. Built with Unlayer Elements. Open-source under MIT.</p>
        </div>
      </footer>
    </div>
  );
};

// ─── CATEGORY ROW COMPONENT ───────────────────────────────
interface TemplateCategoryRowProps {
  title: string;
  subtitle: string;
  presets: TemplatePreset[];
  onLaunch: (id: string) => void;
  appTheme: 'dark' | 'light';
}

const TemplateCategoryRow: React.FC<TemplateCategoryRowProps> = ({ title, subtitle, presets, onLaunch, appTheme }) => {
  return (
    <div className="space-y-4">
      {/* Section info */}
      <div className={`flex items-end justify-between border-b pb-2 ${appTheme === 'dark' ? 'border-white/[0.04]' : 'border-zinc-200'}`}>
        <div>
          <h3 className={`text-[11.5px] font-black tracking-widest uppercase ${appTheme === 'dark' ? 'text-white' : 'text-zinc-800'}`}>{title}</h3>
          <p className={`text-[11px] mt-0.5 ${appTheme === 'dark' ? 'text-[#52525b]' : 'text-zinc-400'}`}>{subtitle}</p>
        </div>
        <div className={`text-[9.5px] font-mono-tech select-none ${appTheme === 'dark' ? 'text-[#52525b]' : 'text-zinc-400'}`}>
          {presets.length} Presets
        </div>
      </div>

      {/* Card Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 animate-fade">
        {presets.map((preset) => (
          <TemplatePreviewCard key={preset.id} preset={preset} onLaunch={onLaunch} appTheme={appTheme} />
        ))}
      </div>
    </div>
  );
};

// ─── LIVE PREVIEW CARD ─────────────────────────────────────
interface TemplatePreviewCardProps {
  preset: TemplatePreset;
  onLaunch: (id: string) => void;
  appTheme: 'dark' | 'light';
}

const TemplatePreviewCard: React.FC<TemplatePreviewCardProps> = ({ preset, onLaunch, appTheme }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Memoize rendered HTML template
  const previewHtml = useMemo(() => {
    try {
      const html = renderToHtml(<QuantumTemplate data={preset.data} mode="email" />);
      const origin = window.location.origin;
      return html.replace(/(src|href)="\/([^/][^"]*)"/g, `$1="${origin}/$2"`);
    } catch {
      return '<div style="padding:40px;color:#777;">Preview Error</div>';
    }
  }, [preset.data]);

  return (
    <div
      className="group flex flex-col space-y-3.5 select-none cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onLaunch(preset.id)}
    >
      {/* Mini email preview container */}
      <div className={`relative aspect-[3/4] rounded-xl overflow-hidden border transition-all duration-300 group-hover:-translate-y-1 ${
        appTheme === 'dark' 
          ? 'border-white/[0.06] bg-[#09090b] group-hover:border-[#6366f1]/40 group-hover:shadow-xl group-hover:shadow-indigo-500/5' 
          : 'border-zinc-250 bg-white group-hover:border-indigo-600/40 group-hover:shadow-lg group-hover:shadow-indigo-500/5'
      }`}>
        
        {/* scaled iframe showing actual compiled template design */}
        <div className="w-[100%] h-[100%] overflow-hidden pointer-events-none select-none">
          <iframe
            srcDoc={previewHtml}
            title={preset.name}
            sandbox="allow-same-origin"
            className="border-0 pointer-events-none"
            style={{
              width: '540px',
              height: '720px',
              transform: 'scale(0.334)',
              transformOrigin: 'top left',
            }}
            scrolling="no"
          />
        </div>

        {/* Hover backdrop overlay */}
        <div className={`absolute inset-0 backdrop-blur-[2px] flex items-center justify-center transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        } ${appTheme === 'dark' ? 'bg-black/65' : 'bg-white/80'}`}>
          <button
            onClick={(e) => { e.stopPropagation(); onLaunch(preset.id); }}
            className={`px-3.5 py-2 text-[10px] font-bold rounded-lg shadow-xl flex items-center gap-1 active:scale-95 transition-all duration-200 cursor-pointer ${
              appTheme === 'dark' ? 'bg-white text-black' : 'bg-[#09090b] text-white'
            }`}
          >
            <span>Edit Template</span>
            <ArrowRight className={`h-3 w-3 ${appTheme === 'dark' ? 'text-black' : 'text-white'}`} />
          </button>
        </div>
      </div>

      {/* Title & Desc */}
      <div className="px-1 text-left">
        <h4 className={`text-[11px] font-extrabold truncate uppercase tracking-widest ${
          appTheme === 'dark' ? 'text-white' : 'text-zinc-800'
        }`}>{preset.name}</h4>
        <p className={`text-[10px] line-clamp-2 mt-1 min-h-[28px] leading-tight font-normal ${
          appTheme === 'dark' ? 'text-[#71717a]' : 'text-zinc-500'
        }`}>{preset.description}</p>
        <span className={`inline-block text-[8px] font-bold tracking-wider uppercase px-2 py-0.5 rounded mt-2.5 ${
          appTheme === 'dark' ? 'text-zinc-300 bg-white/[0.04] border border-white/[0.06]' : 'text-zinc-650 bg-zinc-100 border border-zinc-200'
        }`}>
          {preset.categoryLabel}
        </span>
      </div>
    </div>
  );
};
