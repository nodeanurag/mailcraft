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
      
      <div>
        <h1>MailCraft Landing Page</h1>
      </div>
    </div>
  );
};
