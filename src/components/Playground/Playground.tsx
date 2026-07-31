import React, { useState, useMemo, useRef, useEffect } from 'react';
import { renderToHtml, renderToJson } from '@unlayer/react-elements';
import {
  QuantumTemplate,
  defaultEditorialData
} from '../../templates/QuantumTemplate';
import type { QuantumTemplateData } from '../../types';
import { TEMPLATE_PRESETS } from '../../templates/presets';
import { TopNavbar } from './TopNavbar';
import { SidebarPanel } from './SidebarPanel';
import { CanvasPanel } from './CanvasPanel';
import { Send, CheckCircle2, X } from 'lucide-react';

const LAYER_NAMES: Record<string, string> = {
  header: 'Brand Header',
  toc: 'Table of Contents',
  intro: 'Editor\'s Note',
  hero: 'Featured Cover (Hero)',
  quote: 'Quote Breakout',
  features: 'Curation List',
  spotlight: 'Side Spotlight',
  shopHero: 'Featured Release',
  products: 'Product Grid',
  promoBlock: 'Coupon Block',
  eventHero: 'Event Launch Hero',
  eventDetails: 'Event Details Bar',
  speakers: 'Speakers Grid',
  feedback: 'Feedback Block',
  footer: 'Publication Footer'
};

export const Playground: React.FC<{
  initialLayout?: 'editorial' | 'shop' | 'event';
  initialData?: QuantumTemplateData;
  onBackToLanding?: () => void;
  appTheme: 'dark' | 'light';
  onChangeTheme: (theme: 'dark' | 'light') => void;
}> = ({ initialLayout = 'editorial', initialData, onBackToLanding, appTheme, onChangeTheme }) => {
  const [selectedPresetId, setSelectedPresetId] = useState<string>(() => {
    if (initialData) {
      const match = TEMPLATE_PRESETS.find(p => JSON.stringify(p.data.header.title) === JSON.stringify(initialData.header.title));
      if (match) return match.id;
    }
    return initialLayout === 'shop' ? 'new-collection' : initialLayout === 'event' ? 'product-launch' : 'weekly-digest';
  });

  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const [data, setData] = useState<QuantumTemplateData>(() => {
    if (initialData) return initialData;
    const preset = TEMPLATE_PRESETS.find(p => p.id === selectedPresetId);
    if (preset) return preset.data;
    
    const defaultOrder = 
      initialLayout === 'shop' 
        ? ['header', 'shopHero', 'products', 'promoBlock', 'feedback', 'footer']
        : initialLayout === 'event'
        ? ['header', 'eventHero', 'eventDetails', 'speakers', 'feedback', 'footer']
        : ['header', 'toc', 'intro', 'hero', 'quote', 'features', 'spotlight', 'feedback', 'footer'];

    return {
      ...defaultEditorialData,
      layoutType: initialLayout,
      layoutOrder: defaultOrder,
      header: {
        ...defaultEditorialData.header,
        title: initialLayout === 'shop' ? 'MAILCRAFT SHOP' : initialLayout === 'event' ? 'MAILCRAFT EVENTS' : 'MAILCRAFT JOURNAL',
        tagline: initialLayout === 'shop' ? 'Premium Product Email Templates' : initialLayout === 'event' ? 'Beautiful Event Invitation Templates' : 'Professional Newsletter & Editorial Templates'
      }
    };
  });

  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [tab, setTab] = useState<'preview' | 'editor' | 'html' | 'json' | 'jsx' | 'dashboard'>('dashboard');
  const [copied, setCopied] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isEditorReady, setIsEditorReady] = useState(false);

  // Send Test modal states
  const [showSendTestModal, setShowSendTestModal] = useState(false);
  const [testEmailAddress, setTestEmailAddress] = useState('test-inbox@mailcraft.studio');
  const [testEmailSent, setTestEmailSent] = useState(false);
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);

  // Unlayer Editor refs & overrides
  const unlayerInstanceRef = useRef<any>(null);
  const lastLoadedDataStrRef = useRef<string>('');
  const [editorHtmlOverride, setEditorHtmlOverride] = useState<string | null>(null);
  const [editorJsonOverride, setEditorJsonOverride] = useState<string | null>(null);

  // Clear overrides when user interacts with custom sidebar controls or resets
  useEffect(() => {
    setEditorHtmlOverride(null);
    setEditorJsonOverride(null);
  }, [data]);

  // Compile to HTML & JSON dynamically
  const compiledHtml = useMemo(() => {
    if (editorHtmlOverride) return editorHtmlOverride;
    try {
      const html = renderToHtml(<QuantumTemplate data={data} mode="email" />);
      const printStyles = `
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,700;1,400&family=DM+Sans:ital,wght@0,400;0,700;1,400&family=Inter:wght@400;700&family=Outfit:wght@400;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
<style>
  @media print {
    body {
      background-color: ${data.theme.backgroundColor} !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    @page {
      margin: 1.6cm !important;
      size: A4 portrait;
    }
    table {
      max-width: 100% !important;
    }
  }
</style>
</head>`;
      let processed = html.replace('</head>', printStyles);
      const origin = window.location.origin;
      processed = processed.replace(/(src|href)="\/([^/][^"]*)"/g, `$1="${origin}/$2"`);
      return processed;
    } catch (e) {
      return `Error compiling template: ${(e as Error).message}`;
    }
  }, [data, editorHtmlOverride]);

  const compiledWebHtml = useMemo(() => {
    if (editorHtmlOverride) return editorHtmlOverride;
    try {
      const html = renderToHtml(<QuantumTemplate data={data} mode="page" />);
      const fontStyles = `
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,700;1,400&family=DM+Sans:ital,wght@0,400;0,700;1,400&family=Inter:wght@400;700&family=Outfit:wght@400;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
</head>`;
      let processed = html.replace('</head>', fontStyles);
      const origin = window.location.origin;
      processed = processed.replace(/(src|href)="\/([^/][^"]*)"/g, `$1="${origin}/$2"`);
      return processed;
    } catch (e) {
      console.error(e);
      return `<html><body><div style="color:red;padding:20px;font-family:sans-serif;"><h3>Web Render Error</h3><pre>${(e as Error).stack || (e as Error).message}</pre></div></body></html>`;
    }
  }, [data, editorHtmlOverride]);

  const compiledPrintHtml = useMemo(() => {
    if (editorHtmlOverride) return editorHtmlOverride;
    try {
      const html = renderToHtml(<QuantumTemplate data={data} mode="document" />);
      const printStyles = `
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,700;1,400&family=DM+Sans:ital,wght@0,400;0,700;1,400&family=Inter:wght@400;700&family=Outfit:wght@400;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
<style>
  @media print {
    body {
      background-color: ${data.theme.backgroundColor} !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    @page {
      margin: 1.6cm !important;
      size: A4 portrait;
    }
    table {
      max-width: 100% !important;
    }
  }
</style>
</head>`;
      let processed = html.replace('</head>', printStyles);
      const origin = window.location.origin;
      processed = processed.replace(/(src|href)="\/([^/][^"]*)"/g, `$1="${origin}/$2"`);
      return processed;
    } catch (e) {
      console.error(e);
      return `<html><body><div style="color:red;padding:20px;font-family:sans-serif;"><h3>Print Render Error</h3><pre>${(e as Error).stack || (e as Error).message}</pre></div></body></html>`;
    }
  }, [data, editorHtmlOverride]);

  const compiledJson = useMemo(() => {
    if (editorJsonOverride) return editorJsonOverride;
    try {
      const json = renderToJson(<QuantumTemplate data={data} mode="email" />);
      let jsonStr = JSON.stringify(json, null, 2);
      if (typeof window !== 'undefined') {
        const origin = window.location.origin;
        jsonStr = jsonStr.replace(/"url":\s*"\/(?!http)([^"]+)"/g, `"url": "${origin}/$1"`);
        jsonStr = jsonStr.replace(/"src":\s*"\/(?!http)([^"]+)"/g, `"src": "${origin}/$1"`);
      }
      return jsonStr;
    } catch (e) {
      return `Error generating JSON: ${(e as Error).message}`;
    }
  }, [data, editorJsonOverride]);

  // Initialize unlayer once editor container is mounted
  const onEditorReady = () => {
    const unlayer = (window as any).unlayer;
    if (!unlayer) return;

    unlayerInstanceRef.current = unlayer;
    try {
      unlayer.init({
        id: 'editor-container',
        displayMode: 'email',
        appearance: {
          theme: 'dark'
        }
      });

      unlayer.addEventListener('design:updated', () => {
        unlayer.saveDesign((design: any) => {
          const designStr = JSON.stringify(design, null, 2);
          setEditorJsonOverride(designStr);
        });
        unlayer.exportHtml((res: any) => {
          const { html } = res;
          setEditorHtmlOverride(html);
        });
      });

      unlayer.addEventListener('editor:ready', () => {
        setIsEditorReady(true);
        if (!compiledJson.startsWith('Error')) {
          try {
            const design = JSON.parse(compiledJson);
            unlayer.loadDesign(design);
            lastLoadedDataStrRef.current = JSON.stringify(data);
          } catch (e) {
            console.error('Error parsing compiled JSON inside editor:ready:', e);
          }
        }
      });
    } catch (e) {
      console.error('Error initializing unlayer script:', e);
    }
  };

  useEffect(() => {
    const timer = setTimeout(onEditorReady, 150);
    return () => clearTimeout(timer);
  }, []);

  // Sync layout modifications from sidebar controls into unlayer once ready
  useEffect(() => {
    if (unlayerInstanceRef.current && !compiledJson.startsWith('Error')) {
      const currentDataStr = JSON.stringify(data);
      if (currentDataStr !== lastLoadedDataStrRef.current) {
        try {
          const design = JSON.parse(compiledJson);
          unlayerInstanceRef.current.loadDesign(design);
          lastLoadedDataStrRef.current = currentDataStr;
        } catch (e) {
          console.error('Error syncing design changes to unlayer:', e);
        }
      }
    }
  }, [isEditorReady, data, compiledJson]);

  // Automatically load the design into the editor when the user switches to the editor tab
  useEffect(() => {
    if (tab === 'editor' && unlayerInstanceRef.current && !compiledJson.startsWith('Error')) {
      try {
        const design = JSON.parse(compiledJson);
        unlayerInstanceRef.current.loadDesign(design);
        lastLoadedDataStrRef.current = JSON.stringify(data);
      } catch (e) {
        console.error('Error loading design on tab switch:', e);
      }
    }
  }, [tab, compiledJson]);

  const handleSelectPreset = (presetId: string) => {
    const preset = TEMPLATE_PRESETS.find(p => p.id === presetId);
    if (!preset) return;
    setSelectedPresetId(presetId);
    setEditorJsonOverride(null);
    setEditorHtmlOverride(null);
    setData(preset.data);
  };

  const loadTemplateInEditor = () => {
    if (unlayerInstanceRef.current) {
      try {
        if (!compiledJson.startsWith('Error')) {
          const design = JSON.parse(compiledJson);
          unlayerInstanceRef.current.loadDesign(design);
          lastLoadedDataStrRef.current = JSON.stringify(data);
        } else {
          alert("Cannot load template because there is a compilation error in the current design.");
        }
      } catch (e) {
        alert(`Error reloading design: ${(e as Error).message}`);
      }
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveChanges = () => {
    setShowSaveSuccess(true);
    setTimeout(() => setShowSaveSuccess(false), 3000);
  };

  const handleAddBlock = (blockKey: string) => {
    setData(prev => {
      const layoutOrder = [...prev.layoutOrder];
      layoutOrder.push(blockKey);
      return { ...prev, layoutOrder };
    });
  };

  const handleResetTemplate = () => {
    const baseline = TEMPLATE_PRESETS.find(p => p.id === selectedPresetId)?.data || defaultEditorialData;
    setEditorJsonOverride(null);
    setEditorHtmlOverride(null);
    setData(baseline);
  };

  const handleImportJson = (design: any) => {
    if (unlayerInstanceRef.current) {
      try {
        unlayerInstanceRef.current.loadDesign(design);
      } catch (e) {
        alert(`Error loading imported JSON: ${(e as Error).message}`);
      }
    }
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans relative transition-colors duration-300 ${
      appTheme === 'dark' ? 'bg-[#09090b] text-[#fafafa]' : 'bg-[#f4f4f5] text-[#18181b]'
    }`}>
      
      {/* Toast Notification for Save Success */}
      {showSaveSuccess && (
        <div className={`fixed top-16 right-6 border px-4.5 py-3.5 rounded-xl shadow-2xl z-50 flex items-center gap-3.5 animate-fade max-w-sm ${
          appTheme === 'dark' ? 'bg-[#18181b] border-zinc-700 text-[#fafafa]' : 'bg-white border-zinc-200 text-[#18181b]'
        }`}>
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-bold uppercase tracking-wider">Changes saved successfully!</span>
        </div>
      )}

      {/* Modal: Send Test Email */}
      {showSendTestModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className={`border rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl animate-scale relative z-50 ${
            appTheme === 'dark' ? 'bg-[#09090b] border-zinc-800' : 'bg-white border-zinc-200 text-[#18181b]'
          }`}>
            <button 
              onClick={() => setShowSendTestModal(false)}
              className={`absolute top-4 right-4 p-1 rounded-md transition ${
                appTheme === 'dark' ? 'text-zinc-500 hover:text-white hover:bg-zinc-800' : 'text-zinc-400 hover:text-zinc-950 hover:bg-zinc-100'
              }`}
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className={`text-sm font-bold flex items-center gap-2.5 uppercase tracking-wider ${
              appTheme === 'dark' ? 'text-[#fafafa]' : 'text-zinc-900'
            }`}>
              <Send className="w-4 h-4 text-zinc-400" /> Dispatch Test Email
            </h3>
            
            <p className="text-xs text-zinc-400 leading-relaxed">
              Verify how the rendered email layout fits in actual inbox clients. Enter the target email:
            </p>

            <div className="space-y-2">
              <label className="text-[9px] font-bold tracking-wider text-zinc-500 uppercase font-mono">Destination Email</label>
              <input 
                type="email"
                value={testEmailAddress}
                onChange={(e) => setTestEmailAddress(e.target.value)}
                className="w-full h-10 px-3 rounded-lg bg-black border border-zinc-800 text-xs text-[#fafafa] placeholder-zinc-600 focus:border-zinc-500 focus:outline-none transition"
                placeholder="test@example.com"
              />
            </div>

            {testEmailSent && (
              <div className="p-3 rounded-lg bg-zinc-800 border border-zinc-700 text-xs text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> Test email sent successfully!
              </div>
            )}

            <div className="flex justify-end gap-2.5 pt-2">
              <button 
                onClick={() => setShowSendTestModal(false)}
                className="px-4 py-2 rounded-lg border border-zinc-800 text-xs font-bold text-zinc-400 hover:text-white transition duration-150 cursor-pointer"
              >
                Close
              </button>
              <button 
                onClick={() => {
                  setTestEmailSent(true);
                  setTimeout(() => {
                    setShowSendTestModal(false);
                    setTestEmailSent(false);
                  }, 2000);
                }}
                className="px-4 py-2 rounded-lg bg-white text-black text-xs font-bold hover:bg-zinc-200 transition duration-150 active:scale-95 cursor-pointer shadow-md"
              >
                Send Test
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Top Navbar */}
      <TopNavbar
        onBack={onBackToLanding || (() => {})}
        viewportMode={viewport}
        setViewportMode={setViewport}
        isPreviewMode={isPreviewMode}
        setIsPreviewMode={setIsPreviewMode}
        onSaveChanges={handleSaveChanges}
        tab={tab}
        setTab={setTab}
        data={data}
        compiledHtml={compiledHtml}
        compiledWebHtml={compiledWebHtml}
        compiledPrintHtml={compiledPrintHtml}
        compiledJson={compiledJson}
        isSidebarVisible={isSidebarVisible}
        onToggleSidebar={() => setIsSidebarVisible(!isSidebarVisible)}
        appTheme={appTheme}
        onToggleTheme={() => onChangeTheme(appTheme === 'dark' ? 'light' : 'dark')}
      />

      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar Container with transition */}
        <div 
          className={`transition-all duration-300 overflow-hidden shrink-0 ${
            appTheme === 'dark' ? 'border-zinc-800 bg-[#030303]' : 'border-zinc-200 bg-[#fafafa]'
          }`}
          style={{ 
            width: isSidebarVisible ? '288px' : '0px', 
            borderRightWidth: isSidebarVisible ? '1px' : '0px' 
          }}
        >
          <SidebarPanel
            data={data}
            onImportJson={handleImportJson}
            onAddBlock={handleAddBlock}
            onResetTemplate={handleResetTemplate}
            onSelectPreset={handleSelectPreset}
            currentPresetId={selectedPresetId}
            LAYER_NAMES={LAYER_NAMES}
            onChangeData={setData}
            appTheme={appTheme}
          />
        </div>

        {/* Center/Right Canvas Panel */}
        <CanvasPanel
          data={data}
          viewport={viewport}
          tab={tab}
          setTab={setTab}
          compiledHtml={compiledHtml}
          compiledWebHtml={compiledWebHtml}
          compiledPrintHtml={compiledPrintHtml}
          compiledJson={compiledJson}
          loadTemplateInEditor={loadTemplateInEditor}
          onResetTemplate={handleResetTemplate}
          handleCopy={handleCopy}
          copied={copied}
          isPreviewMode={isPreviewMode}
          appTheme={appTheme}
        />
      </div>
    </div>
  );
};
