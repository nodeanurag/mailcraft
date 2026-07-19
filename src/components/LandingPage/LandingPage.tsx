import React, { useMemo, useState } from 'react';
import { ArrowRight, Layout, ShoppingBag, Calendar, Sparkles, Zap, Shield, Heart, X, Search } from 'lucide-react';
import { TEMPLATE_PRESETS } from '../../templates/presets';
import type { TemplatePreset } from '../../templates/presets';
import { renderToHtml } from '@unlayer/react-elements';
import { QuantumTemplate } from '../../templates/QuantumTemplate';

interface LandingPageProps {
  onLaunchPlayground: (presetId?: string) => void;
}

const CATEGORIES = [
  { key: 'all', label: 'All Layouts', icon: Layout },
  { key: 'editorial', label: 'Newsletters', icon: Layout },
  { key: 'commerce', label: 'E-Commerce', icon: ShoppingBag },
  { key: 'event', label: 'Events & Launches', icon: Calendar },
] as const;

type CategoryKey = typeof CATEGORIES[number]['key'];

export const LandingPage: React.FC<LandingPageProps> = ({ onLaunchPlayground }) => {
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
    <div className="min-h-screen bg-[#030303] text-[#fafafa] flex flex-col selection:bg-[#ffffff] selection:text-[#000000] relative overflow-hidden">
      
      {/* DECORATIVE LIGHT BLOBS */}
      <div className="blur-blob-purple top-[-100px] left-[-50px]" />
      <div className="blur-blob-pink bottom-[20%] right-[-100px]" />
      
      {/* NAVBAR */}
      <nav className="glass-premium px-6 py-4 flex items-center justify-between sticky top-0 z-50 shadow-md">
        <div className="flex items-center space-x-3">
          <div className="h-9 w-9 rounded-xl overflow-hidden flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-[1.5px] shadow-lg shadow-indigo-500/10">
            <div className="h-full w-full bg-black rounded-[10px] flex items-center justify-center">
              <svg className="h-4 w-4 text-white animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
          <div>
            <span className="font-extrabold tracking-wider text-white text-sm uppercase">MailCraft</span>
            <span className="text-[8px] text-[#71717a] block tracking-widest uppercase font-bold mt-0.5">Premium Email Studio</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <a href="https://github.com/unlayer/elements" target="_blank" rel="noopener noreferrer"
            className="text-xs text-[#71717a] hover:text-white transition duration-200 flex items-center space-x-1.5 px-3.5 py-2 rounded-lg bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.06] hover:border-white/[0.08] shadow-sm">
            <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
            <span className="hidden sm:inline font-semibold">GitHub</span>
          </a>
          <button onClick={() => onLaunchPlayground('weekly-digest')}
            className="px-4 py-2 bg-[#ffffff] hover:bg-neutral-200 text-black text-xs font-bold rounded-lg shadow-lg shadow-white/5 active:scale-95 transition-all duration-200 flex items-center space-x-1.5 cursor-pointer">
            <span>Open Studio</span>
            <ArrowRight className="h-3.5 w-3.5 text-black" />
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header className="relative bg-grid border-b border-white/[0.04] py-24 px-6 overflow-hidden z-10">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-14">
          
          {/* Left Intro content */}
          <div className="flex-1 space-y-7 text-left animate-fade-in-up">
            <div className="inline-flex items-center space-x-2 bg-white/[0.03] border border-white/[0.06] px-4 py-1.5 rounded-full">
              <Sparkles className="h-3.5 w-3.5 text-indigo-400 animate-pulse" />
              <span className="text-[10px] font-bold text-zinc-300 tracking-wider uppercase">Unlayer Elements Sandbox</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.05] text-white font-extrabold uppercase">
              The Premium <br/>
              <span className="text-gradient-neon font-black">Email Studio</span>
            </h1>
            
            <p className="text-sm md:text-[14.5px] text-[#a1a1aa] leading-relaxed max-w-lg font-normal">
              Create gorgeous, email-client compliant templates with absolute structural precision. Powered by `@unlayer/react-elements` for complete custom themes. Reorder layers, live-preview responsive grids, and export responsive HTML.
            </p>
            
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => onLaunchPlayground('weekly-digest')}
                className="px-6 py-4 bg-white text-black hover:bg-neutral-200 text-xs font-bold rounded-xl transition duration-200 shadow-xl shadow-white/5 active:scale-95 flex items-center gap-1.5 cursor-pointer"
              >
                <span>Launch Interactive Studio</span>
                <ArrowRight className="h-4 w-4 text-black" />
              </button>
              
              <a href="#gallery" className="px-6 py-4 border border-white/10 hover:border-white/20 bg-white/[0.02] hover:bg-white/[0.05] rounded-xl text-xs font-bold text-white transition duration-200 active:scale-95 shadow">
                Browse 18 Templates
              </a>
            </div>

            {/* Micro Highlights */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/[0.06] max-w-md">
              <div>
                <div className="text-xl font-extrabold text-white font-mono-tech">18</div>
                <div className="text-[9px] text-[#71717a] font-bold uppercase tracking-widest mt-0.5">Presets</div>
              </div>
              <div>
                <div className="text-xl font-extrabold text-white font-mono-tech">0%</div>
                <div className="text-[9px] text-[#71717a] font-bold uppercase tracking-widest mt-0.5">JS Overhead</div>
              </div>
              <div>
                <div className="text-xl font-extrabold text-white font-mono-tech">100%</div>
                <div className="text-[9px] text-[#71717a] font-bold uppercase tracking-widest mt-0.5">Responsive</div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};
