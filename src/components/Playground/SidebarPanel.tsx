import React, { useRef, useState } from 'react';
import { Upload, RotateCcw, Box, LayoutGrid, Palette, FileText, Image, Grid, ShieldAlert, Link } from 'lucide-react';
import type { QuantumTemplateData } from '../../types';
import { TEMPLATE_PRESETS } from '../../templates/presets';

interface SidebarPanelProps {
  data: QuantumTemplateData;
  onImportJson: (design: any) => void;
  onAddBlock: (blockKey: string) => void;
  onResetTemplate: () => void;
  onSelectPreset: (presetId: string) => void;
  currentPresetId?: string;
  LAYER_NAMES: Record<string, string>;
  onChangeData: (data: QuantumTemplateData) => void;
  appTheme: 'dark' | 'light';
}

// Helper components for customizer controls with theme awareness
const ColorInput: React.FC<{
  label: string;
  value: string;
  onChange: (val: string) => void;
  appTheme: 'dark' | 'light';
}> = ({ label, value, onChange, appTheme }) => (
  <div className="flex items-center justify-between py-0.5">
    <span className={`text-[10px] font-medium uppercase tracking-wider ${appTheme === 'dark' ? 'text-zinc-400' : 'text-zinc-650'}`}>{label}</span>
    <div className="flex items-center gap-1.5">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-16 h-6 px-1.5 rounded border text-[10px] font-mono text-center focus:outline-none ${
          appTheme === 'dark' 
            ? 'bg-zinc-900 border-zinc-800 text-white focus:border-zinc-700' 
            : 'bg-white border-zinc-200 text-zinc-900 focus:border-zinc-400'
        }`}
      />
      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-6 h-6 rounded border-0 cursor-pointer overflow-hidden p-0 bg-transparent shrink-0"
      />
    </div>
  </div>
);

const TextInput: React.FC<{
  label: string;
  value: string;
  onChange: (val: string) => void;
  appTheme: 'dark' | 'light';
}> = ({ label, value, onChange, appTheme }) => (
  <div className="space-y-1">
    <label className={`text-[9px] font-bold uppercase tracking-wider block ${appTheme === 'dark' ? 'text-zinc-400' : 'text-zinc-550'}`}>{label}</label>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full h-8 px-2.5 rounded border text-[11px] focus:outline-none ${
        appTheme === 'dark'
          ? 'bg-zinc-900 border-zinc-800 text-white focus:border-zinc-700'
          : 'bg-white border-zinc-300 text-zinc-900 focus:border-zinc-400'
      }`}
    />
  </div>
);

const TextAreaInput: React.FC<{
  label: string;
  value: string;
  onChange: (val: string) => void;
  appTheme: 'dark' | 'light';
}> = ({ label, value, onChange, appTheme }) => (
  <div className="space-y-1">
    <label className={`text-[9px] font-bold uppercase tracking-wider block ${appTheme === 'dark' ? 'text-zinc-400' : 'text-zinc-550'}`}>{label}</label>
    <textarea
      rows={3}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full p-2 rounded border text-[11px] focus:outline-none custom-scrollbar resize-none font-medium ${
        appTheme === 'dark'
          ? 'bg-zinc-900 border-zinc-800 text-white focus:border-zinc-700'
          : 'bg-white border-zinc-300 text-zinc-900 focus:border-zinc-400'
      }`}
    />
  </div>
);

const CheckboxInput: React.FC<{
  label: string;
  checked: boolean;
  onChange: (val: boolean) => void;
  appTheme: 'dark' | 'light';
}> = ({ label, checked, onChange, appTheme }) => (
  <label className="flex items-center gap-2 cursor-pointer py-1.5 select-none">
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      className={`rounded border focus:ring-0 focus:ring-offset-0 w-3.5 h-3.5 cursor-pointer ${
        appTheme === 'dark' ? 'bg-zinc-900 border-zinc-800 text-indigo-500' : 'bg-white border-zinc-300 text-indigo-600'
      }`}
    />
    <span className={`text-[10px] font-bold uppercase tracking-wider ${appTheme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}`}>{label}</span>
  </label>
);

const ImageUploadInput: React.FC<{
  label: string;
  value: string;
  onChange: (val: string) => void;
  appTheme: 'dark' | 'light';
}> = ({ label, value, onChange, appTheme }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        onChange(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-1">
      <label className={`text-[9px] font-bold uppercase tracking-wider block ${appTheme === 'dark' ? 'text-zinc-400' : 'text-zinc-550'}`}>
        {label}
      </label>
      <div className="flex gap-1.5">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`flex-1 h-8 px-2 rounded border text-[10px] focus:outline-none truncate ${
            appTheme === 'dark'
              ? 'bg-zinc-900 border-zinc-800 text-white focus:border-zinc-700'
              : 'bg-white border-zinc-300 text-zinc-900 focus:border-zinc-400'
          }`}
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          className={`h-8 w-8 rounded border flex items-center justify-center transition cursor-pointer shrink-0 active:scale-95 ${
            appTheme === 'dark'
              ? 'bg-zinc-800 hover:bg-zinc-700 border-zinc-700 hover:text-white text-zinc-300'
              : 'bg-zinc-100 hover:bg-zinc-200 border-zinc-350 hover:text-zinc-950 text-zinc-600'
          }`}
          title="Upload local image"
        >
          <Upload className="w-3.5 h-3.5" />
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
      </div>
    </div>
  );
};

const AccordionSection: React.FC<{
  title: string;
  icon: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  appTheme: 'dark' | 'light';
}> = ({ title, icon, isOpen, onToggle, children, appTheme }) => (
  <div className={`border-b ${appTheme === 'dark' ? 'border-zinc-900' : 'border-zinc-250'}`}>
    <button
      onClick={onToggle}
      className={`w-full py-3 px-6 text-left flex items-center justify-between text-[10px] font-bold uppercase tracking-widest transition cursor-pointer ${
        appTheme === 'dark'
          ? 'text-zinc-300 hover:text-white bg-zinc-950/40 hover:bg-zinc-900/40'
          : 'text-zinc-700 hover:text-zinc-950 bg-zinc-100 hover:bg-zinc-200/50'
      }`}
    >
      <span className="flex items-center gap-2">
        {icon}
        {title}
      </span>
      <span className="text-zinc-650 text-[8px]">{isOpen ? '▼' : '►'}</span>
    </button>
    {isOpen && (
      <div className={`p-4 space-y-4 border-t transition-colors duration-300 ${
        appTheme === 'dark' ? 'bg-[#030303] border-zinc-900' : 'bg-white border-zinc-200'
      }`}>
        {children}
      </div>
    )}
  </div>
);

export const SidebarPanel: React.FC<SidebarPanelProps> = ({
  data,
  onImportJson,
  onAddBlock,
  onResetTemplate,
  onSelectPreset,
  currentPresetId,
  LAYER_NAMES,
  onChangeData,
  appTheme
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeTab, setActiveTab] = useState<'build' | 'customize'>('build');
  const [expandedSection, setExpandedSection] = useState<string | null>('theme');

  const toggleSection = (sectionName: string) => {
    setExpandedSection(prev => (prev === sectionName ? null : sectionName));
  };

  // Group presets by category for selector
  const editorialPresets = TEMPLATE_PRESETS.filter(p => p.category === 'editorial');
  const commercePresets = TEMPLATE_PRESETS.filter(p => p.category === 'commerce');
  const eventPresets = TEMPLATE_PRESETS.filter(p => p.category === 'event');

  // Group blocks by layout compatibility
  const availableBlocks = 
    data.layoutType === 'shop'
      ? ['header', 'shopHero', 'products', 'promoBlock', 'feedback', 'footer']
      : data.layoutType === 'event'
      ? ['header', 'eventHero', 'eventDetails', 'speakers', 'feedback', 'footer']
      : ['header', 'toc', 'intro', 'hero', 'quote', 'features', 'spotlight', 'feedback', 'footer'];

  const handleJsonUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const design = JSON.parse(event.target?.result as string);
        onImportJson(design);
      } catch (err) {
        alert('Invalid JSON structure. Please upload a valid Unlayer design JSON.');
      }
    };
    reader.readAsText(file);
  };

  const triggerUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <aside className={`w-72 border-r transition-colors duration-300 py-6 flex flex-col justify-between overflow-hidden shrink-0 select-none ${
      appTheme === 'dark' 
        ? 'border-zinc-800 bg-[#030303] text-zinc-400' 
        : 'border-zinc-200 bg-[#fafafa] text-zinc-650'
    }`}>
      <div className="flex-1 flex flex-col overflow-hidden space-y-4">
        
        {/* Tab Switcher */}
        <div className="px-6 grid grid-cols-2 gap-1.5 shrink-0 select-none">
          <button
            onClick={() => setActiveTab('build')}
            className={`py-1.5 rounded text-[10px] font-bold uppercase tracking-wider transition ${
              activeTab === 'build'
                ? (appTheme === 'dark' ? 'bg-zinc-800 text-white border border-zinc-700 shadow-inner' : 'bg-white text-zinc-900 border-zinc-300 shadow')
                : (appTheme === 'dark' ? 'text-zinc-500 hover:text-zinc-300' : 'text-zinc-500 hover:text-zinc-750')
            }`}
          >
            Build Layout
          </button>
          <button
            onClick={() => setActiveTab('customize')}
            className={`py-1.5 rounded text-[10px] font-bold uppercase tracking-wider transition ${
              activeTab === 'customize'
                ? (appTheme === 'dark' ? 'bg-zinc-800 text-white border border-zinc-700 shadow-inner' : 'bg-white text-zinc-900 border-zinc-300 shadow')
                : (appTheme === 'dark' ? 'text-zinc-500 hover:text-zinc-300' : 'text-zinc-500 hover:text-zinc-750')
            }`}
          >
            Customize
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {activeTab === 'build' ? (
            <div className="space-y-6">
              
              {/* Section 1: Template Preset Selector */}
              <div className="px-6 space-y-3">
                <div className="flex items-center space-x-1.5">
                  <LayoutGrid className="w-3.5 h-3.5 text-zinc-455" />
                  <span className={`text-[10px] font-bold tracking-wider uppercase font-mono ${appTheme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`}>Active Studio</span>
                </div>

                <div className="space-y-1.5">
                  <label className={`text-[9px] font-bold uppercase tracking-wider block ${appTheme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'}`}>
                    Choose Preset Template
                  </label>
                  <select
                    value={currentPresetId || ''}
                    onChange={(e) => onSelectPreset(e.target.value)}
                    className={`w-full h-9 px-2.5 rounded-lg border text-xs font-bold focus:outline-none cursor-pointer shadow-sm ${
                      appTheme === 'dark'
                        ? 'bg-zinc-900 border-zinc-700 text-white focus:border-zinc-500'
                        : 'bg-white border-zinc-300 text-zinc-900 focus:border-zinc-400'
                    }`}
                  >
                    <optgroup label="EDITORIAL PRESETS">
                      {editorialPresets.map(p => (
                        <option key={p.id} value={p.id}>{p.name}</option>
                      ))}
                    </optgroup>
                    <optgroup label="COMMERCE PRESETS">
                      {commercePresets.map(p => (
                        <option key={p.id} value={p.id}>{p.name}</option>
                      ))}
                    </optgroup>
                    <optgroup label="EVENT PRESETS">
                      {eventPresets.map(p => (
                        <option key={p.id} value={p.id}>{p.name}</option>
                      ))}
                    </optgroup>
                  </select>
                </div>

                <div className="pt-1">
                  <button 
                    onClick={triggerUploadClick}
                    className={`w-full py-2 text-left text-[11px] font-bold flex items-center gap-1.5 transition-colors cursor-pointer border-b border-transparent ${
                      appTheme === 'dark' ? 'text-zinc-400 hover:text-white hover:border-zinc-800' : 'text-zinc-600 hover:text-zinc-950 hover:border-zinc-200'
                    }`}
                  >
                    <Upload className="w-3.5 h-3.5" />
                    Import JSON Layout
                  </button>
                  <input 
                    type="file"
                    ref={fileInputRef}
                    onChange={handleJsonUpload}
                    accept=".json"
                    className="hidden"
                  />
                </div>
              </div>

              {/* Divider */}
              <hr className={`mx-6 ${appTheme === 'dark' ? 'border-zinc-850' : 'border-zinc-200'}`} />

              {/* Section 2: Insertable template blocks */}
              <div className="px-6 space-y-2">
                <div className="flex items-center space-x-1.5 pb-1">
                  <Box className="w-3.5 h-3.5 text-zinc-455" />
                  <span className={`text-[10px] font-bold tracking-wider uppercase font-mono ${appTheme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`}>Template Blocks</span>
                </div>
                
                <div className="space-y-1">
                  {availableBlocks.map((blockKey) => (
                    <button 
                      key={blockKey} 
                      onClick={() => onAddBlock(blockKey)}
                      className={`w-full text-left py-2 px-2 text-xs font-bold rounded-lg transition-all flex items-center justify-between group cursor-pointer border border-transparent ${
                        appTheme === 'dark'
                          ? 'text-zinc-400 hover:text-white hover:bg-zinc-900 hover:border-zinc-800'
                          : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100 hover:border-zinc-200'
                      }`}
                    >
                      <span>{LAYER_NAMES[blockKey] || blockKey}</span>
                      <span className={`text-[10px] font-mono transition-colors ${appTheme === 'dark' ? 'text-zinc-650 group-hover:text-white' : 'text-zinc-400 group-hover:text-zinc-950'}`}>+ Add</span>
                    </button>
                  ))}
                </div>
              </div>

            </div>
          ) : (
            // CUSTOMIZER TAB CONTENT (Collapsible Accordion Panels)
            <div className={`border-t select-text ${appTheme === 'dark' ? 'border-zinc-900' : 'border-zinc-200'}`}>
              
              {/* Category 1: Theme & Style System */}
              <AccordionSection
                title="Theme Aesthetics"
                icon={<Palette className="w-3.5 h-3.5" />}
                isOpen={expandedSection === 'theme'}
                onToggle={() => toggleSection('theme')}
                appTheme={appTheme}
              >
                <div className="space-y-2">
                  <ColorInput 
                    label="Primary Accent" 
                    value={data.theme.primaryColor} 
                    onChange={(val) => onChangeData({ ...data, theme: { ...data.theme, primaryColor: val } })}
                    appTheme={appTheme}
                  />
                  <ColorInput 
                    label="Background" 
                    value={data.theme.backgroundColor} 
                    onChange={(val) => onChangeData({ ...data, theme: { ...data.theme, backgroundColor: val } })}
                    appTheme={appTheme}
                  />
                  <ColorInput 
                    label="Text Color" 
                    value={data.theme.textColor} 
                    onChange={(val) => onChangeData({ ...data, theme: { ...data.theme, textColor: val } })}
                    appTheme={appTheme}
                  />
                  <ColorInput 
                    label="Card Background" 
                    value={data.theme.cardBgColor} 
                    onChange={(val) => onChangeData({ ...data, theme: { ...data.theme, cardBgColor: val } })}
                    appTheme={appTheme}
                  />
                  <ColorInput 
                    label="Button Color" 
                    value={data.theme.buttonColor} 
                    onChange={(val) => onChangeData({ ...data, theme: { ...data.theme, buttonColor: val } })}
                    appTheme={appTheme}
                  />
                  <ColorInput 
                    label="Button Text" 
                    value={data.theme.buttonTextColor} 
                    onChange={(val) => onChangeData({ ...data, theme: { ...data.theme, buttonTextColor: val } })}
                    appTheme={appTheme}
                  />
                  <ColorInput 
                    label="Borders & Lines" 
                    value={data.theme.borderColor} 
                    onChange={(val) => onChangeData({ ...data, theme: { ...data.theme, borderColor: val } })}
                    appTheme={appTheme}
                  />
                </div>
                <div className="pt-2 grid grid-cols-2 gap-2">
                  <TextInput
                    label="Card Radius"
                    value={data.theme.cardRadius || '0px'}
                    onChange={(val) => onChangeData({ ...data, theme: { ...data.theme, cardRadius: val } })}
                    appTheme={appTheme}
                  />
                  <TextInput
                    label="Button Radius"
                    value={data.theme.buttonRadius || '0px'}
                    onChange={(val) => onChangeData({ ...data, theme: { ...data.theme, buttonRadius: val } })}
                    appTheme={appTheme}
                  />
                </div>
                <CheckboxInput
                  label="Wrap Layout in Frame Border"
                  checked={data.theme.borderFrame || false}
                  onChange={(val) => onChangeData({ ...data, theme: { ...data.theme, borderFrame: val } })}
                  appTheme={appTheme}
                />
              </AccordionSection>

              {/* Category 2: Branding & Header */}
              <AccordionSection
                title="Branding & Header"
                icon={<FileText className="w-3.5 h-3.5" />}
                isOpen={expandedSection === 'header'}
                onToggle={() => toggleSection('header')}
                appTheme={appTheme}
              >
                <div className="space-y-3">
                  <ImageUploadInput
                    label="Logo URL / Upload"
                    value={data.header.logoUrl}
                    onChange={(val) => onChangeData({ ...data, header: { ...data.header, logoUrl: val } })}
                    appTheme={appTheme}
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <TextInput
                      label="Logo Width"
                      value={data.header.logoWidth}
                      onChange={(val) => onChangeData({ ...data, header: { ...data.header, logoWidth: val } })}
                      appTheme={appTheme}
                    />
                    <TextInput
                      label="Logo Height"
                      value={data.header.logoHeight}
                      onChange={(val) => onChangeData({ ...data, header: { ...data.header, logoHeight: val } })}
                      appTheme={appTheme}
                    />
                  </div>
                  <TextInput
                    label="Publication Title"
                    value={data.header.title}
                    onChange={(val) => onChangeData({ ...data, header: { ...data.header, title: val } })}
                    appTheme={appTheme}
                  />
                  <TextInput
                    label="Tagline / Description"
                    value={data.header.tagline}
                    onChange={(val) => onChangeData({ ...data, header: { ...data.header, tagline: val } })}
                    appTheme={appTheme}
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <TextInput
                      label="Issue Tracker"
                      value={data.header.issueNumber}
                      onChange={(val) => onChangeData({ ...data, header: { ...data.header, issueNumber: val } })}
                      appTheme={appTheme}
                    />
                    <TextInput
                      label="Publish Date"
                      value={data.header.dateString}
                      onChange={(val) => onChangeData({ ...data, header: { ...data.header, dateString: val } })}
                      appTheme={appTheme}
                    />
                  </div>
                </div>
              </AccordionSection>

              {/* Category 3: Layout Type Dependent Customizers */}
              {data.layoutType === 'editorial' && (
                <>
                  {/* Hero Cover Customizer */}
                  <AccordionSection
                    title="Hero Cover Section"
                    icon={<Image className="w-3.5 h-3.5" />}
                    isOpen={expandedSection === 'hero'}
                    onToggle={() => toggleSection('hero')}
                    appTheme={appTheme}
                  >
                    <CheckboxInput
                      label="Show Hero Cover Block"
                      checked={data.hero.show}
                      onChange={(val) => onChangeData({ ...data, hero: { ...data.hero, show: val } })}
                      appTheme={appTheme}
                    />
                    {data.hero.show && (
                      <div className="space-y-3 pt-2">
                        <ImageUploadInput
                          label="Cover Image"
                          value={data.hero.coverUrl}
                          onChange={(val) => onChangeData({ ...data, hero: { ...data.hero, coverUrl: val } })}
                          appTheme={appTheme}
                        />
                        <TextInput
                          label="Hero Title"
                          value={data.hero.title}
                          onChange={(val) => onChangeData({ ...data, hero: { ...data.hero, title: val } })}
                          appTheme={appTheme}
                        />
                        <TextInput
                          label="Hero Subtitle"
                          value={data.hero.subtitle}
                          onChange={(val) => onChangeData({ ...data, hero: { ...data.hero, subtitle: val } })}
                          appTheme={appTheme}
                        />
                        <div className="grid grid-cols-2 gap-2">
                          <TextInput
                            label="Category Badge"
                            value={data.hero.category}
                            onChange={(val) => onChangeData({ ...data, hero: { ...data.hero, category: val } })}
                            appTheme={appTheme}
                          />
                          <TextInput
                            label="Read Time"
                            value={data.hero.readTime}
                            onChange={(val) => onChangeData({ ...data, hero: { ...data.hero, readTime: val } })}
                            appTheme={appTheme}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <TextInput
                            label="CTA Label"
                            value={data.hero.ctaText}
                            onChange={(val) => onChangeData({ ...data, hero: { ...data.hero, ctaText: val } })}
                            appTheme={appTheme}
                          />
                          <TextInput
                            label="CTA URL"
                            value={data.hero.ctaUrl}
                            onChange={(val) => onChangeData({ ...data, hero: { ...data.hero, ctaUrl: val } })}
                            appTheme={appTheme}
                          />
                        </div>
                      </div>
                    )}
                  </AccordionSection>

                  {/* Intro block customizer */}
                  <AccordionSection
                    title="Intro Notes"
                    icon={<FileText className="w-3.5 h-3.5" />}
                    isOpen={expandedSection === 'intro'}
                    onToggle={() => toggleSection('intro')}
                    appTheme={appTheme}
                  >
                    <CheckboxInput
                      label="Show Intro Block"
                      checked={data.intro.show}
                      onChange={(val) => onChangeData({ ...data, intro: { ...data.intro, show: val } })}
                      appTheme={appTheme}
                    />
                    {data.intro.show && (
                      <div className="space-y-3 pt-2">
                        <TextInput
                          label="Intro Title"
                          value={data.intro.title}
                          onChange={(val) => onChangeData({ ...data, intro: { ...data.intro, title: val } })}
                          appTheme={appTheme}
                        />
                        <TextAreaInput
                          label="Body Content"
                          value={data.intro.content}
                          onChange={(val) => onChangeData({ ...data, intro: { ...data.intro, content: val } })}
                          appTheme={appTheme}
                        />
                        <TextInput
                          label="Sign-Off Signature"
                          value={data.intro.signOff}
                          onChange={(val) => onChangeData({ ...data, intro: { ...data.intro, signOff: val } })}
                          appTheme={appTheme}
                        />
                      </div>
                    )}
                  </AccordionSection>

                  {/* Features List Customizer */}
                  <AccordionSection
                    title="Features Grid"
                    icon={<Grid className="w-3.5 h-3.5" />}
                    isOpen={expandedSection === 'features'}
                    onToggle={() => toggleSection('features')}
                    appTheme={appTheme}
                  >
                    <div className="space-y-4">
                      {data.features.map((feat, idx) => (
                        <div key={feat.id} className={`border p-2.5 rounded space-y-2 ${appTheme === 'dark' ? 'border-zinc-900 bg-zinc-950/40' : 'border-zinc-200 bg-zinc-50'}`}>
                          <div className="text-[8px] font-bold text-zinc-500 uppercase font-mono">Feature #{idx + 1}</div>
                          <TextInput
                            label="Feature Title"
                            value={feat.title}
                            onChange={(val) => {
                              const newFeats = [...data.features];
                              newFeats[idx] = { ...feat, title: val };
                              onChangeData({ ...data, features: newFeats });
                            }}
                            appTheme={appTheme}
                          />
                          <div className="grid grid-cols-2 gap-2">
                            <TextInput
                              label="Category Badge"
                              value={feat.category}
                              onChange={(val) => {
                                const newFeats = [...data.features];
                                newFeats[idx] = { ...feat, category: val };
                                onChangeData({ ...data, features: newFeats });
                              }}
                              appTheme={appTheme}
                            />
                            <TextInput
                              label="Number Badge"
                              value={feat.number}
                              onChange={(val) => {
                                const newFeats = [...data.features];
                                newFeats[idx] = { ...feat, number: val };
                                onChangeData({ ...data, features: newFeats });
                              }}
                              appTheme={appTheme}
                            />
                          </div>
                          <TextAreaInput
                            label="Short Description"
                            value={feat.description}
                            onChange={(val) => {
                              const newFeats = [...data.features];
                              newFeats[idx] = { ...feat, description: val };
                              onChangeData({ ...data, features: newFeats });
                            }}
                            appTheme={appTheme}
                          />
                          <TextInput
                            label="Read More URL"
                            value={feat.url}
                            onChange={(val) => {
                              const newFeats = [...data.features];
                              newFeats[idx] = { ...feat, url: val };
                              onChangeData({ ...data, features: newFeats });
                            }}
                            appTheme={appTheme}
                          />
                        </div>
                      ))}
                    </div>
                  </AccordionSection>

                  {/* Spotlight Article Customizer */}
                  <AccordionSection
                    title="Spotlight Section"
                    icon={<Image className="w-3.5 h-3.5" />}
                    isOpen={expandedSection === 'spotlight'}
                    onToggle={() => toggleSection('spotlight')}
                    appTheme={appTheme}
                  >
                    <CheckboxInput
                      label="Show Spotlight Block"
                      checked={data.spotlight.show}
                      onChange={(val) => onChangeData({ ...data, spotlight: { ...data.spotlight, show: val } })}
                      appTheme={appTheme}
                    />
                    {data.spotlight.show && (
                      <div className="space-y-3 pt-2">
                        <ImageUploadInput
                          label="Spotlight Image"
                          value={data.spotlight.imageUrl}
                          onChange={(val) => onChangeData({ ...data, spotlight: { ...data.spotlight, imageUrl: val } })}
                          appTheme={appTheme}
                        />
                        <div className="space-y-1">
                          <label className={`text-[9px] font-bold uppercase tracking-wider block ${appTheme === 'dark' ? 'text-zinc-400' : 'text-zinc-555'}`}>Image Layout Position</label>
                          <select
                            value={data.spotlight.imagePosition}
                            onChange={(e) => onChangeData({ ...data, spotlight: { ...data.spotlight, imagePosition: e.target.value as any } })}
                            className={`w-full h-8 px-2.5 rounded border text-[11px] focus:outline-none cursor-pointer ${
                              appTheme === 'dark' ? 'bg-zinc-900 border-zinc-800 text-white focus:border-zinc-700' : 'bg-white border-zinc-300 text-zinc-900 focus:border-zinc-400'
                            }`}
                          >
                            <option value="left">Image on Left, Text on Right</option>
                            <option value="right">Text on Left, Image on Right</option>
                          </select>
                        </div>
                        <TextInput
                          label="Spotlight Title"
                          value={data.spotlight.title}
                          onChange={(val) => onChangeData({ ...data, spotlight: { ...data.spotlight, title: val } })}
                          appTheme={appTheme}
                        />
                        <TextAreaInput
                          label="Description"
                          value={data.spotlight.description}
                          onChange={(val) => onChangeData({ ...data, spotlight: { ...data.spotlight, description: val } })}
                          appTheme={appTheme}
                        />
                        <div className="grid grid-cols-2 gap-2">
                          <TextInput
                            label="CTA Label"
                            value={data.spotlight.ctaText}
                            onChange={(val) => onChangeData({ ...data, spotlight: { ...data.spotlight, ctaText: val } })}
                            appTheme={appTheme}
                          />
                          <TextInput
                            label="CTA URL"
                            value={data.spotlight.ctaUrl}
                            onChange={(val) => onChangeData({ ...data, spotlight: { ...data.spotlight, ctaUrl: val } })}
                            appTheme={appTheme}
                          />
                        </div>
                      </div>
                    )}
                  </AccordionSection>

                  {/* Quote block customizer */}
                  <AccordionSection
                    title="Quote Breakout"
                    icon={<FileText className="w-3.5 h-3.5" />}
                    isOpen={expandedSection === 'quote'}
                    onToggle={() => toggleSection('quote')}
                    appTheme={appTheme}
                  >
                    <CheckboxInput
                      label="Show Quote block"
                      checked={data.quote.show}
                      onChange={(val) => onChangeData({ ...data, quote: { ...data.quote, show: val } })}
                      appTheme={appTheme}
                    />
                    {data.quote.show && (
                      <div className="space-y-3 pt-2">
                        <TextAreaInput
                          label="Quote Text"
                          value={data.quote.text}
                          onChange={(val) => onChangeData({ ...data, quote: { ...data.quote, text: val } })}
                          appTheme={appTheme}
                        />
                        <TextInput
                          label="Quote Author"
                          value={data.quote.author}
                          onChange={(val) => onChangeData({ ...data, quote: { ...data.quote, author: val } })}
                          appTheme={appTheme}
                        />
                      </div>
                    )}
                  </AccordionSection>
                </>
              )}

              {data.layoutType === 'shop' && (
                <>
                  {/* Shop Hero customizer */}
                  <AccordionSection
                    title="Shop Hero Banner"
                    icon={<Image className="w-3.5 h-3.5" />}
                    isOpen={expandedSection === 'shopHero'}
                    onToggle={() => toggleSection('shopHero')}
                    appTheme={appTheme}
                  >
                    <CheckboxInput
                      label="Show Shop Hero Block"
                      checked={data.shopHero.show}
                      onChange={(val) => onChangeData({ ...data, shopHero: { ...data.shopHero, show: val } })}
                      appTheme={appTheme}
                    />
                    {data.shopHero.show && (
                      <div className="space-y-3 pt-2">
                        <ImageUploadInput
                          label="Cover Image"
                          value={data.shopHero.imageUrl}
                          onChange={(val) => onChangeData({ ...data, shopHero: { ...data.shopHero, imageUrl: val } })}
                          appTheme={appTheme}
                        />
                        <TextInput
                          label="Headline"
                          value={data.shopHero.title}
                          onChange={(val) => onChangeData({ ...data, shopHero: { ...data.shopHero, title: val } })}
                          appTheme={appTheme}
                        />
                        <TextAreaInput
                          label="Subtext Description"
                          value={data.shopHero.description}
                          onChange={(val) => onChangeData({ ...data, shopHero: { ...data.shopHero, description: val } })}
                          appTheme={appTheme}
                        />
                        <TextInput
                          label="Featured Price Label"
                          value={data.shopHero.price}
                          onChange={(val) => onChangeData({ ...data, shopHero: { ...data.shopHero, price: val } })}
                          appTheme={appTheme}
                        />
                        <div className="grid grid-cols-2 gap-2">
                          <TextInput
                            label="CTA Label"
                            value={data.shopHero.ctaText}
                            onChange={(val) => onChangeData({ ...data, shopHero: { ...data.shopHero, ctaText: val } })}
                            appTheme={appTheme}
                          />
                          <TextInput
                            label="CTA URL"
                            value={data.shopHero.ctaUrl}
                            onChange={(val) => onChangeData({ ...data, shopHero: { ...data.shopHero, ctaUrl: val } })}
                            appTheme={appTheme}
                          />
                        </div>
                      </div>
                    )}
                  </AccordionSection>

                  {/* Products list Customizer */}
                  <AccordionSection
                    title="Product Showcase"
                    icon={<Grid className="w-3.5 h-3.5" />}
                    isOpen={expandedSection === 'products'}
                    onToggle={() => toggleSection('products')}
                    appTheme={appTheme}
                  >
                    <div className="space-y-4">
                      {data.products.map((prod, idx) => (
                        <div key={prod.id} className={`border p-2.5 rounded space-y-2 ${appTheme === 'dark' ? 'border-zinc-900 bg-zinc-950/40' : 'border-zinc-200 bg-zinc-50'}`}>
                          <div className="text-[8px] font-bold text-zinc-500 uppercase font-mono">Product #{idx + 1}</div>
                          <TextInput
                            label="Title"
                            value={prod.title}
                            onChange={(val) => {
                              const newProds = [...data.products];
                              newProds[idx] = { ...prod, title: val };
                              onChangeData({ ...data, products: newProds });
                            }}
                            appTheme={appTheme}
                          />
                          <div className="grid grid-cols-2 gap-2">
                            <TextInput
                              label="Price"
                              value={prod.price}
                              onChange={(val) => {
                                const newProds = [...data.products];
                                newProds[idx] = { ...prod, price: val };
                                onChangeData({ ...data, products: newProds });
                              }}
                              appTheme={appTheme}
                            />
                            <TextInput
                              label="Promo Badge"
                              value={prod.badge || ''}
                              onChange={(val) => {
                                const newProds = [...data.products];
                                newProds[idx] = { ...prod, badge: val };
                                onChangeData({ ...data, products: newProds });
                              }}
                              appTheme={appTheme}
                            />
                          </div>
                          <ImageUploadInput
                            label="Product Image"
                            value={prod.imageUrl}
                            onChange={(val) => {
                              const newProds = [...data.products];
                              newProds[idx] = { ...prod, imageUrl: val };
                              onChangeData({ ...data, products: newProds });
                            }}
                            appTheme={appTheme}
                          />
                          <TextInput
                            label="Product Link"
                            value={prod.url}
                            onChange={(val) => {
                              const newProds = [...data.products];
                              newProds[idx] = { ...prod, url: val };
                              onChangeData({ ...data, products: newProds });
                            }}
                            appTheme={appTheme}
                          />
                        </div>
                      ))}
                    </div>
                  </AccordionSection>

                  {/* Promo Code block customizer */}
                  <AccordionSection
                    title="Promo Coupon Code"
                    icon={<FileText className="w-3.5 h-3.5" />}
                    isOpen={expandedSection === 'promo'}
                    onToggle={() => toggleSection('promo')}
                    appTheme={appTheme}
                  >
                    <CheckboxInput
                      label="Show Promo Banner"
                      checked={data.promo.show}
                      onChange={(val) => onChangeData({ ...data, promo: { ...data.promo, show: val } })}
                      appTheme={appTheme}
                    />
                    {data.promo.show && (
                      <div className="space-y-3 pt-2">
                        <TextInput
                          label="Promo Header Title"
                          value={data.promo.title}
                          onChange={(val) => onChangeData({ ...data, promo: { ...data.promo, title: val } })}
                          appTheme={appTheme}
                        />
                        <TextInput
                          label="Coupon Code"
                          value={data.promo.code}
                          onChange={(val) => onChangeData({ ...data, promo: { ...data.promo, code: val } })}
                          appTheme={appTheme}
                        />
                        <TextAreaInput
                          label="Description / Terms"
                          value={data.promo.description}
                          onChange={(val) => onChangeData({ ...data, promo: { ...data.promo, description: val } })}
                          appTheme={appTheme}
                        />
                      </div>
                    )}
                  </AccordionSection>
                </>
              )}

              {data.layoutType === 'event' && (
                <>
                  {/* Event Hero customizer */}
                  <AccordionSection
                    title="Event Hero Cover"
                    icon={<Image className="w-3.5 h-3.5" />}
                    isOpen={expandedSection === 'eventHero'}
                    onToggle={() => toggleSection('eventHero')}
                    appTheme={appTheme}
                  >
                    <CheckboxInput
                      label="Show Event Hero"
                      checked={data.eventHero.show}
                      onChange={(val) => onChangeData({ ...data, eventHero: { ...data.eventHero, show: val } })}
                      appTheme={appTheme}
                    />
                    {data.eventHero.show && (
                      <div className="space-y-3 pt-2">
                        <ImageUploadInput
                          label="Cover Image"
                          value={data.eventHero.imageUrl}
                          onChange={(val) => onChangeData({ ...data, eventHero: { ...data.eventHero, imageUrl: val } })}
                          appTheme={appTheme}
                        />
                        <TextInput
                          label="Headline"
                          value={data.eventHero.title}
                          onChange={(val) => onChangeData({ ...data, eventHero: { ...data.eventHero, title: val } })}
                          appTheme={appTheme}
                        />
                        <TextInput
                          label="Event Subtitle"
                          value={data.eventHero.subtitle}
                          onChange={(val) => onChangeData({ ...data, eventHero: { ...data.eventHero, subtitle: val } })}
                          appTheme={appTheme}
                        />
                        <div className="grid grid-cols-2 gap-2">
                          <TextInput
                            label="CTA Label"
                            value={data.eventHero.ctaText}
                            onChange={(val) => onChangeData({ ...data, eventHero: { ...data.eventHero, ctaText: val } })}
                            appTheme={appTheme}
                          />
                          <TextInput
                            label="CTA URL"
                            value={data.eventHero.ctaUrl}
                            onChange={(val) => onChangeData({ ...data, eventHero: { ...data.eventHero, ctaUrl: val } })}
                            appTheme={appTheme}
                          />
                        </div>
                      </div>
                    )}
                  </AccordionSection>

                  {/* Event details block customizer */}
                  <AccordionSection
                    title="Event Logistics"
                    icon={<FileText className="w-3.5 h-3.5" />}
                    isOpen={expandedSection === 'eventDetails'}
                    onToggle={() => toggleSection('eventDetails')}
                    appTheme={appTheme}
                  >
                    <CheckboxInput
                      label="Show Logistics Block"
                      checked={data.eventDetails.show}
                      onChange={(val) => onChangeData({ ...data, eventDetails: { ...data.eventDetails, show: val } })}
                      appTheme={appTheme}
                    />
                    {data.eventDetails.show && (
                      <div className="space-y-3 pt-2">
                        <TextInput
                          label="Date Details"
                          value={data.eventDetails.date}
                          onChange={(val) => onChangeData({ ...data, eventDetails: { ...data.eventDetails, date: val } })}
                          appTheme={appTheme}
                        />
                        <TextInput
                          label="Time Details"
                          value={data.eventDetails.time}
                          onChange={(val) => onChangeData({ ...data, eventDetails: { ...data.eventDetails, time: val } })}
                          appTheme={appTheme}
                        />
                        <TextInput
                          label="Location"
                          value={data.eventDetails.location}
                          onChange={(val) => onChangeData({ ...data, eventDetails: { ...data.eventDetails, location: val } })}
                          appTheme={appTheme}
                        />
                      </div>
                    )}
                  </AccordionSection>

                  {/* Speakers list Customizer */}
                  <AccordionSection
                    title="Guest Speakers"
                    icon={<Grid className="w-3.5 h-3.5" />}
                    isOpen={expandedSection === 'speakers'}
                    onToggle={() => toggleSection('speakers')}
                    appTheme={appTheme}
                  >
                    <div className="space-y-4">
                      {data.speakers.map((spk, idx) => (
                        <div key={spk.id} className={`border p-2.5 rounded space-y-2 ${appTheme === 'dark' ? 'border-zinc-900 bg-zinc-950/40' : 'border-zinc-200 bg-zinc-50'}`}>
                          <div className="text-[8px] font-bold text-zinc-500 uppercase font-mono">Speaker #{idx + 1}</div>
                          <TextInput
                            label="Full Name"
                            value={spk.name}
                            onChange={(val) => {
                              const newSpeakers = [...data.speakers];
                              newSpeakers[idx] = { ...spk, name: val };
                              onChangeData({ ...data, speakers: newSpeakers });
                            }}
                            appTheme={appTheme}
                          />
                          <TextInput
                            label="Role / Subtitle"
                            value={spk.role}
                            onChange={(val) => {
                              const newSpeakers = [...data.speakers];
                              newSpeakers[idx] = { ...spk, role: val };
                              onChangeData({ ...data, speakers: newSpeakers });
                            }}
                            appTheme={appTheme}
                          />
                          <ImageUploadInput
                            label="Speaker Photo"
                            value={spk.imageUrl}
                            onChange={(val) => {
                              const newSpeakers = [...data.speakers];
                              newSpeakers[idx] = { ...spk, imageUrl: val };
                              onChangeData({ ...data, speakers: newSpeakers });
                            }}
                            appTheme={appTheme}
                          />
                        </div>
                      ))}
                    </div>
                  </AccordionSection>
                </>
              )}

              {/* Feedback Block */}
              <AccordionSection
                title="Feedback Section"
                icon={<ShieldAlert className="w-3.5 h-3.5" />}
                isOpen={expandedSection === 'feedback'}
                onToggle={() => toggleSection('feedback')}
                appTheme={appTheme}
              >
                <CheckboxInput
                  label="Show Interactive Feedback Block"
                  checked={data.feedback.show}
                  onChange={(val) => onChangeData({ ...data, feedback: { ...data.feedback, show: val } })}
                  appTheme={appTheme}
                />
                {data.feedback.show && (
                  <div className="space-y-3 pt-2">
                    <TextInput
                      label="Title Label"
                      value={data.feedback.title}
                      onChange={(val) => onChangeData({ ...data, feedback: { ...data.feedback, title: val } })}
                      appTheme={appTheme}
                    />
                  </div>
                )}
              </AccordionSection>

              {/* Footer info Customizer */}
              <AccordionSection
                title="Footer Information"
                icon={<Link className="w-3.5 h-3.5" />}
                isOpen={expandedSection === 'footer'}
                onToggle={() => toggleSection('footer')}
                appTheme={appTheme}
              >
                <div className="space-y-3">
                  <TextInput
                    label="Company / Publisher"
                    value={data.footer.companyName}
                    onChange={(val) => onChangeData({ ...data, footer: { ...data.footer, companyName: val } })}
                    appTheme={appTheme}
                  />
                  <TextInput
                    label="Physical Address"
                    value={data.footer.address}
                    onChange={(val) => onChangeData({ ...data, footer: { ...data.footer, address: val } })}
                    appTheme={appTheme}
                  />
                  <TextInput
                    label="Unsubscribe URL"
                    value={data.footer.unsubscribeUrl}
                    onChange={(val) => onChangeData({ ...data, footer: { ...data.footer, unsubscribeUrl: val } })}
                    appTheme={appTheme}
                  />
                  <div className="pt-2 text-[9px] font-bold text-zinc-500 uppercase tracking-wider block">Social Network Links</div>
                  <TextInput
                    label="Twitter / X"
                    value={data.footer.twitterUrl}
                    onChange={(val) => onChangeData({ ...data, footer: { ...data.footer, twitterUrl: val } })}
                    appTheme={appTheme}
                  />
                  <TextInput
                    label="GitHub"
                    value={data.footer.githubUrl}
                    onChange={(val) => onChangeData({ ...data, footer: { ...data.footer, githubUrl: val } })}
                    appTheme={appTheme}
                  />
                  <TextInput
                    label="LinkedIn"
                    value={data.footer.linkedinUrl}
                    onChange={(val) => onChangeData({ ...data, footer: { ...data.footer, linkedinUrl: val } })}
                    appTheme={appTheme}
                  />
                </div>
              </AccordionSection>

            </div>
          )}
        </div>

      </div>

      {/* Section 3: Reset Template action */}
      <div className="px-6 space-y-4 shrink-0">
        <button 
          onClick={onResetTemplate}
          className={`w-full py-2.5 px-3 rounded-lg border text-center text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 shadow-sm ${
            appTheme === 'dark' 
              ? 'border-zinc-800 bg-zinc-950 hover:bg-zinc-900 text-zinc-400 hover:text-white' 
              : 'border-zinc-300 bg-white hover:bg-zinc-50 text-zinc-600 hover:text-zinc-900'
          }`}
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset Template
        </button>
        <div className="text-[9.5px] text-zinc-650 font-mono uppercase tracking-widest text-center select-none">
          MailCraft Studio • MIT
        </div>
      </div>
    </aside>
  );
};
