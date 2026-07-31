import React, { useState } from 'react';
import { 
  Layers, 
  Printer, 
  Copy, 
  Check, 
  Activity, 
  ShieldCheck,
  X,
  Mail,
  Globe,
  Code,
  FileJson,
  RotateCcw
} from 'lucide-react';
import type { QuantumTemplateData } from '../../types';

interface CanvasPanelProps {
  data: QuantumTemplateData;
  viewport: 'desktop' | 'tablet' | 'mobile';
  tab: 'preview' | 'editor' | 'html' | 'json' | 'jsx' | 'dashboard';
  setTab: (t: 'preview' | 'editor' | 'html' | 'json' | 'jsx' | 'dashboard') => void;
  compiledHtml: string;
  compiledWebHtml: string;
  compiledPrintHtml: string;
  compiledJson: string;
  loadTemplateInEditor: () => void;
  onResetTemplate: () => void;
  handleCopy: (text: string) => void;
  copied: boolean;
  isPreviewMode: boolean;
  appTheme: 'dark' | 'light';
}

type PreviewTabType = 'email' | 'web' | 'print' | 'html' | 'json';

export const CanvasPanel: React.FC<CanvasPanelProps> = ({
  data,
  viewport,
  tab,
  setTab,
  compiledHtml,
  compiledWebHtml,
  compiledPrintHtml,
  compiledJson,
  loadTemplateInEditor,
  onResetTemplate,
  handleCopy,
  copied,
  isPreviewMode,
  appTheme
}) => {
  const [previewTab, setPreviewTab] = useState<PreviewTabType>('email');
  const [showInsights, setShowInsights] = useState(true);
  const [dashboardTab, setDashboardTab] = useState<'split' | 'email' | 'web' | 'print'>('split');
  const [dashboardDevice, setDashboardDevice] = useState<'desktop' | 'mobile'>('desktop');

  // Auto-switch standard tabs when previewMode changes
  React.useEffect(() => {
    if (tab === 'dashboard') return;
    if (isPreviewMode) {
      if (tab !== 'preview' && tab !== 'html' && tab !== 'json' && tab !== 'jsx') {
        setTab('preview');
      }
    } else {
      if (tab !== 'editor') {
        setTab('editor');
      }
    }
  }, [isPreviewMode, tab, setTab]);

  // Sizing styles for previewers
  const viewportWidth = 
    viewport === 'mobile' 
      ? '375px' 
      : viewport === 'tablet' 
      ? '768px' 
      : '100%';

  const renderEmailPreview = () => {
    const isMobile = dashboardDevice === 'mobile';
    const widthStyle = isMobile ? '375px' : '100%';
    
    return (
      <div 
        className={`flex flex-col h-full border rounded-2xl overflow-hidden shadow-xl transition-all duration-300 mx-auto ${
          appTheme === 'dark' ? 'bg-[#09090b] border-zinc-800/85' : 'bg-white border-zinc-200/80 shadow'
        }`}
        style={{
          width: widthStyle,
          maxWidth: '100%',
          height: '100%',
        }}
      >
        <div className={`border-b px-4 py-3 flex items-center justify-between shrink-0 select-none ${
          appTheme === 'dark' ? 'bg-[#09090b] border-zinc-850' : 'bg-[#fafafa] border-zinc-150'
        }`}>
          <div className="flex space-x-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
          </div>
          <div className={`text-[9.5px] font-bold uppercase tracking-widest flex items-center gap-1.5 ${
            appTheme === 'dark' ? 'text-zinc-400' : 'text-zinc-550'
          }`}>
            <Mail className={`w-3.5 h-3.5 ${appTheme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`} /> Email Format {isMobile && '(Mobile)'}
          </div>
          <div className="w-4 h-4" />
        </div>
        <div className="flex-1 bg-white relative">
          <iframe
            key={compiledHtml}
            title="Dashboard Email View"
            srcDoc={compiledHtml}
            className="w-full h-full border-0"
          />
        </div>
      </div>
    );
  };

  const renderWebPreview = () => {
    const isMobile = dashboardDevice === 'mobile';
    
    if (isMobile) {
      return (
        <div className={`flex flex-col h-full border rounded-2xl overflow-hidden shadow-xl mx-auto w-full max-w-[380px] ${
          appTheme === 'dark' ? 'bg-[#09090b] border-zinc-800/85' : 'bg-white border-zinc-200/80'
        }`}>
          <div className={`border-b px-4 py-3 flex items-center justify-between shrink-0 select-none ${
            appTheme === 'dark' ? 'bg-[#09090b] border-zinc-850' : 'bg-[#fafafa] border-zinc-150'
          }`}>
            <div className="w-3.5 h-3.5 rounded-full border-2 border-zinc-700 bg-black flex items-center justify-center shrink-0">
              <div className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
            </div>
            <div className={`text-[9.5px] font-bold uppercase tracking-widest flex items-center gap-1.5 ${
              appTheme === 'dark' ? 'text-zinc-400' : 'text-zinc-550'
            }`}>
              <Globe className={`w-3.5 h-3.5 ${appTheme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`} /> Web Format (Mobile)
            </div>
            <div className="w-4 h-4" />
          </div>
          <div className={`flex-1 p-4 overflow-y-auto custom-scrollbar flex justify-center items-start ${
            appTheme === 'dark' ? 'bg-[#050507]' : 'bg-[#f4f4f5]'
          }`}>
            <div className={`border rounded-[32px] overflow-hidden shadow-2xl p-1 relative shrink-0 ${
              appTheme === 'dark' ? 'bg-[#0c0c0e] border-zinc-800' : 'bg-[#fafafa] border-zinc-250'
            }`}>
              {/* Phone Speaker & Camera Notch */}
              <div className={`absolute top-3 left-1/2 -translate-x-1/2 w-24 h-4 rounded-full z-20 flex items-center justify-center gap-1.5 border shadow-inner ${
                appTheme === 'dark' ? 'bg-black border-zinc-900' : 'bg-zinc-150 border-zinc-250'
              }`}>
                <div className="w-6 h-0.5 bg-zinc-800 rounded-full" />
                <div className="w-1.5 h-1.5 rounded-full bg-zinc-900 border border-zinc-800" />
              </div>
              {/* Content frame */}
              <div className="rounded-[28px] overflow-hidden w-full bg-white pt-6 min-h-[460px] h-[520px]">
                <iframe
                  key={compiledWebHtml}
                  title="Web Mobile Preview"
                  srcDoc={compiledWebHtml}
                  className="w-full h-full border-0"
                />
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className={`flex flex-col h-full border rounded-2xl overflow-hidden shadow-xl w-full mx-auto ${
          appTheme === 'dark' ? 'bg-[#09090b] border-zinc-800/85' : 'bg-white border-zinc-200/80'
        }`}>
          <div className={`border-b px-4 py-3 flex items-center justify-between shrink-0 select-none ${
            appTheme === 'dark' ? 'bg-[#09090b] border-zinc-850' : 'bg-[#fafafa] border-zinc-150'
          }`}>
            <div className="flex space-x-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
            </div>
            <div className={`text-[9.5px] font-bold uppercase tracking-widest flex items-center gap-1.5 ${
              appTheme === 'dark' ? 'text-zinc-400' : 'text-zinc-550'
            }`}>
              <Globe className={`w-3.5 h-3.5 ${appTheme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`} /> Web Format (Desktop)
            </div>
            <div className="w-4 h-4" />
          </div>
          <div className="flex-1 bg-white relative">
            <iframe
              key={compiledWebHtml}
              title="Web Desktop Preview"
              srcDoc={compiledWebHtml}
              className="w-full h-full border-0"
            />
          </div>
        </div>
      );
    }
  };

  const renderPrintPreview = () => {
    const isMobile = dashboardDevice === 'mobile';
    const paperWidth = isMobile ? '360px' : '780px';
    
    return (
      <div className={`flex flex-col h-full border rounded-2xl overflow-hidden shadow-xl mx-auto w-full ${
        appTheme === 'dark' ? 'bg-[#09090b] border-zinc-800/85' : 'bg-white border-zinc-200/80'
      }`}>
        <div className={`border-b px-4 py-3 flex items-center justify-between shrink-0 select-none ${
          appTheme === 'dark' ? 'bg-[#09090b] border-zinc-850' : 'bg-[#fafafa] border-zinc-150'
        }`}>
          <div className="w-4 h-4" />
          <div className={`text-[9.5px] font-bold uppercase tracking-widest flex items-center gap-1.5 ${
            appTheme === 'dark' ? 'text-zinc-400' : 'text-zinc-550'
          }`}>
            <Printer className={`w-3.5 h-3.5 ${appTheme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`} /> Print Format {isMobile && '(Mobile)'}
          </div>
          <button 
            onClick={() => window.print()}
            className={`px-2.5 py-1 border rounded-md text-[8px] font-bold tracking-widest uppercase transition flex items-center gap-1 active:scale-95 cursor-pointer ${
              appTheme === 'dark' 
                ? 'bg-zinc-800 hover:bg-zinc-700 border-zinc-700 text-white' 
                : 'bg-white hover:bg-zinc-50 border-zinc-300 text-zinc-700'
            }`}
            title="Print / Save PDF"
          >
            <Printer className="w-2.5 h-2.5" /> PDF
          </button>
        </div>
        <div className={`flex-1 p-6 overflow-y-auto custom-scrollbar flex justify-center items-start ${
          appTheme === 'dark' ? 'bg-[#050507]' : 'bg-[#f4f4f5]'
        }`}>
          <div 
            className="bg-white border border-zinc-300 rounded shadow-2xl shrink-0 transition-all duration-300 overflow-hidden"
            style={{
              width: paperWidth,
              maxWidth: '100%',
              minHeight: isMobile ? '400px' : '900px'
            }}
          >
            <iframe
              key={compiledPrintHtml}
              title="Print Preview"
              srcDoc={compiledPrintHtml}
              className="w-full border-0"
              style={{
                height: isMobile ? '450px' : '950px'
              }}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <main className={`flex-1 flex flex-col p-6 overflow-hidden relative transition-colors duration-300 ${
      appTheme === 'dark' ? 'bg-[#050507]' : 'bg-[#f4f4f5]'
    }`}>
      
      {/* 1. EDITING MODE: Display Unlayer Designer Container directly */}
      <div 
        className="flex-1 justify-center items-center z-10"
        style={{ 
          height: '100%',
          display: 'flex',
          position: tab === 'editor' ? 'relative' : 'absolute',
          left: tab === 'editor' ? '0' : '-9999px',
          top: tab === 'editor' ? '0' : '-9999px',
          visibility: tab === 'editor' ? 'visible' : 'hidden',
          pointerEvents: tab === 'editor' ? 'auto' : 'none',
        }}
      >
        <div
          className={`w-full h-full border rounded-2xl overflow-hidden flex flex-col shadow-2xl transition-all duration-300 ${
            appTheme === 'dark' ? 'bg-[#030303] border-zinc-800/80' : 'bg-white border-zinc-200'
          }`}
          style={{
            width: viewportWidth,
            height: '100%',
            maxWidth: '100%',
          }}
        >
          <div className={`px-4 py-2.5 border-b flex items-center justify-between text-xs select-none shrink-0 ${
            appTheme === 'dark' ? 'bg-[#09090b] border-zinc-850 text-zinc-400' : 'bg-[#fafafa] border-zinc-150 text-zinc-550'
          }`}>
            <div className="flex items-center space-x-2.5">
              <Layers className={`h-4 w-4 ${appTheme === 'dark' ? 'text-zinc-450' : 'text-zinc-500'}`} />
              <span className={`font-bold uppercase tracking-wider text-[10.5px] ${appTheme === 'dark' ? 'text-white' : 'text-zinc-850'}`}>Official Unlayer Editor Canvas</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-[9px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 border border-emerald-500/20 rounded-md font-mono font-bold tracking-widest uppercase flex items-center gap-1.5 select-none">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>Sync Active</span>
              </span>
              <button
                onClick={loadTemplateInEditor}
                className={`px-2.5 py-1 border rounded-md text-[9px] font-bold tracking-widest uppercase transition duration-150 active:scale-95 cursor-pointer shadow-sm ${
                  appTheme === 'dark' 
                    ? 'bg-zinc-900 hover:bg-zinc-800 border-zinc-700 text-[#fafafa]' 
                    : 'bg-white hover:bg-zinc-50 border-zinc-300 text-zinc-700'
                }`}
              >
                Reset Canvas
              </button>
            </div>
          </div>
          <div className="flex-1 w-full relative font-medium">
            <div id="editor-container" className="w-full h-full bg-[#15181C]" />
          </div>
        </div>
      </div>

      {/* 2. MULTI-CHANNEL DASHBOARD VIEWPORT (only when tab === 'dashboard') */}
      {tab === 'dashboard' && (
        <div className="flex-1 flex flex-col gap-6 overflow-hidden relative z-10 animate-fade">
          
          {/* Dashboard Header Control Bar */}
          <div className={`flex flex-col md:flex-row items-stretch md:items-center justify-between shrink-0 select-none px-6 py-4 rounded-2xl border shadow-md gap-4 ${
            appTheme === 'dark' ? 'bg-[#09090b] border-zinc-800/80' : 'bg-white border-zinc-200'
          }`}>
            <div>
              <h2 className={`text-sm font-black uppercase tracking-wider ${appTheme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>Multi-Channel Layout Workspace</h2>
              <p className={`text-[10px] font-semibold mt-0.5 uppercase tracking-wider ${appTheme === 'dark' ? 'text-zinc-550' : 'text-zinc-450'}`}>Simulating Email, Web, and Print formats in real-time</p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {/* Format Select tabs */}
              <div className={`flex p-0.5 rounded-lg border gap-0.5 shadow-lg shrink-0 ${
                appTheme === 'dark' ? 'bg-[#030303] border-white/[0.06]' : 'bg-zinc-100 border-zinc-200'
              }`}>
                {(['split', 'email', 'web', 'print'] as const).map((t) => (
                  <button 
                    key={t}
                    onClick={() => setDashboardTab(t)}
                    className={`px-3 py-1 rounded-[6px] text-[10px] font-extrabold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
                      dashboardTab === t
                        ? (appTheme === 'dark' ? 'bg-white/[0.08] text-white border border-white/10 shadow-inner' : 'bg-white text-zinc-900 border-zinc-200 shadow') 
                        : (appTheme === 'dark' ? 'text-zinc-500 hover:text-zinc-300' : 'text-zinc-500 hover:text-zinc-800')
                    }`}
                  >
                    {t === 'split' ? 'Split View' : t === 'email' ? 'Email' : t === 'web' ? 'Web Menu' : 'Document'}
                  </button>
                ))}
              </div>

              {/* PC / Mobile select tab */}
              <div className={`flex p-0.5 rounded-lg border gap-0.5 shadow-lg shrink-0 ${
                appTheme === 'dark' ? 'bg-[#030303] border-white/[0.06]' : 'bg-zinc-100 border-zinc-200'
              }`}>
                {(['desktop', 'mobile'] as const).map((d) => (
                  <button 
                    key={d}
                    onClick={() => setDashboardDevice(d)}
                    className={`px-3 py-1 rounded-[6px] text-[10px] font-extrabold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
                      dashboardDevice === d
                        ? (appTheme === 'dark' ? 'bg-white/[0.08] text-white border border-white/10 shadow-inner' : 'bg-white text-zinc-900 border-zinc-200 shadow') 
                        : (appTheme === 'dark' ? 'text-zinc-500 hover:text-zinc-300' : 'text-zinc-500 hover:text-zinc-800')
                    }`}
                  >
                    {d === 'desktop' ? 'PC View' : 'Mobile View'}
                  </button>
                ))}
              </div>

              {/* Reset Template Action Button */}
              <button 
                onClick={onResetTemplate}
                className={`h-8 px-3 rounded-lg border text-[10px] font-bold transition duration-150 active:scale-95 flex items-center gap-1.5 cursor-pointer shadow-sm ${
                  appTheme === 'dark'
                    ? 'bg-zinc-900 hover:bg-zinc-800 border-zinc-700 text-zinc-400 hover:text-white'
                    : 'bg-white hover:bg-zinc-50 border-zinc-300 text-zinc-650 hover:text-zinc-900'
                }`}
                title="Reset layout to default baseline"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Template</span>
              </button>
            </div>
          </div>

          <div className="flex-grow overflow-hidden min-h-0">
            {dashboardTab === 'split' ? (
              <div className="h-full grid grid-cols-1 lg:grid-cols-3 gap-6 overflow-x-auto overflow-y-hidden custom-scrollbar py-2 font-medium">
                <div className="h-full overflow-hidden flex flex-col">{renderEmailPreview()}</div>
                <div className="h-full overflow-hidden flex flex-col">{renderWebPreview()}</div>
                <div className="h-full overflow-hidden flex flex-col">{renderPrintPreview()}</div>
              </div>
            ) : (
              <div className="h-full w-full overflow-hidden flex flex-col">
                {dashboardTab === 'email' && renderEmailPreview()}
                {dashboardTab === 'web' && renderWebPreview()}
                {dashboardTab === 'print' && renderPrintPreview()}
              </div>
            )}
          </div>

        </div>
      )}

      {/* 3. PREVIEW MODE: Display Segmented Preview Navigation Drawer + Content Viewports */}
      {tab !== 'editor' && tab !== 'dashboard' && (
        <div className="flex-1 flex flex-col gap-5 overflow-hidden relative z-10">
          
          {/* Previews Navigation Bar with Lucide React SVG Icons */}
          <div className={`p-1.5 rounded-xl border flex items-center justify-center gap-1 max-w-2xl mx-auto w-full shadow-lg shrink-0 ${
            appTheme === 'dark' ? 'bg-[#09090b] border-zinc-800' : 'bg-white border-zinc-200'
          }`}>
            {[
              { id: 'email', name: 'Email Simulator', icon: Mail },
              { id: 'web', name: 'Web Page', icon: Globe },
              { id: 'print', name: 'PDF Document', icon: Printer },
              { id: 'html', name: 'HTML Output', icon: Code },
              { id: 'json', name: 'JSON Layout', icon: FileJson }
            ].map((ptab) => {
              const IconComponent = ptab.icon;
              return (
                <button 
                  key={ptab.id}
                  onClick={() => setPreviewTab(ptab.id as PreviewTabType)}
                  className={`flex-1 py-1.5 rounded-lg text-[10.5px] font-bold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${
                    previewTab === ptab.id 
                      ? (appTheme === 'dark' ? 'bg-zinc-800 text-white border border-zinc-700 shadow-sm' : 'bg-zinc-100 text-zinc-900 border-zinc-250 shadow-sm') 
                      : (appTheme === 'dark' ? 'text-zinc-400 hover:text-white' : 'text-zinc-500 hover:text-zinc-950')
                  }`}
                >
                  <IconComponent className="w-3.5 h-3.5" />
                  <span>{ptab.name}</span>
                </button>
              );
            })}
          </div>

          {/* Active Preview Area */}
          <div className="flex-1 flex justify-center items-start overflow-y-auto custom-scrollbar relative">
            
            {/* 2a. Simulated Email Viewport */}
            {previewTab === 'email' && (
              <div
                className={`h-full border rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 relative shrink-0 ${
                  appTheme === 'dark' ? 'bg-[#09090b] border-zinc-800/85' : 'bg-white border-zinc-200/80 shadow'
                }`}
                style={{
                  width: viewportWidth,
                  height: '100%',
                  minHeight: '600px',
                  maxWidth: '100%',
                }}
              >
                <div className={`border-b px-4 py-2.5 flex items-center justify-between shrink-0 select-none ${
                  appTheme === 'dark' ? 'bg-[#09090b] border-zinc-850' : 'bg-[#fafafa] border-zinc-150'
                }`}>
                  <div className="flex space-x-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-zinc-750" />
                    <div className="w-2.5 h-2.5 rounded-full bg-zinc-750" />
                    <div className="w-2.5 h-2.5 rounded-full bg-zinc-750" />
                  </div>
                  <div className={`border px-4 py-1 rounded-md text-[9px] font-mono text-center flex-1 max-w-sm truncate select-none shadow-inner ${
                    appTheme === 'dark' ? 'bg-black border-zinc-800 text-zinc-500' : 'bg-zinc-100 border-zinc-250 text-zinc-650'
                  }`}>
                    mailcraft-sandbox://simulated-inbox
                  </div>
                  <div className={`flex items-center space-x-1.5 px-2 py-0.5 rounded border ${
                    appTheme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-zinc-100 border-zinc-200'
                  }`}>
                    <div className="w-1.5 h-1.5 rounded-full bg-zinc-400"></div>
                    <span className={`text-[7.5px] font-bold tracking-widest uppercase ${appTheme === 'dark' ? 'text-zinc-300' : 'text-zinc-600'}`}>COMPILE LIVE</span>
                  </div>
                </div>

                <iframe
                  key={compiledHtml}
                  title="Simulated Email Client Viewport"
                  srcDoc={compiledHtml}
                  className="flex-1 w-full bg-white border-0"
                />
              </div>
            )}

            {/* 2b. Web Page compiler */}
            {previewTab === 'web' && (
              <div className="flex-grow flex flex-col w-full max-w-3xl mx-auto gap-5 h-full min-h-[600px]">
                <div className={`border px-6 py-4 rounded-2xl flex items-center justify-between shadow-md ${
                  appTheme === 'dark' ? 'bg-[#09090b] border-zinc-800' : 'bg-white border-zinc-200'
                }`}>
                  <div className="flex flex-col">
                    <span className={`text-[9px] font-mono font-bold uppercase tracking-widest ${appTheme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'}`}>Web Engine Compiler</span>
                    <h3 className={`text-sm font-bold uppercase tracking-wide ${appTheme === 'dark' ? 'text-[#fafafa]' : 'text-zinc-900'}`}>Responsive Web Page View</h3>
                  </div>
                  <span className={`border px-2.5 py-0.5 rounded font-mono font-bold uppercase tracking-widest text-[9px] ${
                    appTheme === 'dark' ? 'text-zinc-400 border-zinc-800 bg-black' : 'text-zinc-600 border-zinc-200 bg-zinc-100'
                  }`}>HTML5 Styled</span>
                </div>
                <div className={`flex-1 bg-white border rounded-2xl overflow-hidden shadow-2xl relative min-h-[500px] ${
                  appTheme === 'dark' ? 'border-zinc-800' : 'border-zinc-200/80'
                }`}>
                  <iframe
                    key={compiledWebHtml}
                    title="Web Preview Iframe"
                    srcDoc={compiledWebHtml}
                    className="w-full h-full border-0"
                  />
                </div>
              </div>
            )}

            {/* 2c. PDF Print sheet layout */}
            {previewTab === 'print' && (
              <div className="flex-grow flex flex-col w-full max-w-3xl mx-auto gap-5 h-full min-h-[650px]">
                <div className={`border px-6 py-3 rounded-2xl flex items-center justify-between shadow-md ${
                  appTheme === 'dark' ? 'bg-[#09090b] border-zinc-800' : 'bg-white border-zinc-200'
                }`}>
                  <div className="flex flex-col">
                    <span className={`text-[9px] font-mono font-bold uppercase tracking-widest ${appTheme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`}>Print Engine Preview</span>
                    <h3 className={`text-sm font-bold uppercase tracking-wide ${appTheme === 'dark' ? 'text-[#fafafa]' : 'text-zinc-900'}`}>PDF Print document (A4 Sizing)</h3>
                  </div>
                  <button 
                    onClick={() => window.print()}
                    className={`h-8 px-3 rounded-lg font-bold text-[10px] tracking-widest uppercase transition-all flex items-center gap-1.5 shadow-md cursor-pointer active:scale-95 ${
                      appTheme === 'dark' ? 'bg-white hover:bg-zinc-200 text-black' : 'bg-zinc-900 hover:bg-zinc-800 text-white'
                    }`}
                  >
                    <Printer className="w-3.5 h-3.5" /> Print / Save PDF
                  </button>
                </div>
                <div className={`flex-1 p-6 overflow-y-auto border rounded-2xl flex justify-center items-start min-h-[500px] ${
                  appTheme === 'dark' ? 'bg-[#050507] border-zinc-800' : 'bg-[#f4f4f5] border-zinc-200'
                }`}>
                  <div className="bg-white border border-zinc-300 rounded shadow-2xl overflow-hidden w-[780px] max-w-full">
                    <iframe
                      key={compiledPrintHtml}
                      title="Print Preview Iframe"
                      srcDoc={compiledPrintHtml}
                      className="w-full border-0 h-[1000px]"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 2d. Clean HTML output code block */}
            {previewTab === 'html' && (
              <div className={`w-full max-w-4xl mx-auto h-full flex flex-col border rounded-2xl overflow-hidden shadow-2xl relative font-mono ${
                appTheme === 'dark' ? 'border-zinc-800 bg-black' : 'border-zinc-250 bg-zinc-900 shadow'
              }`}>
                <div className={`px-4 py-3 border-b flex items-center justify-between text-xs select-none shrink-0 ${
                  appTheme === 'dark' ? 'bg-[#09090b] border-zinc-850 text-zinc-400' : 'bg-zinc-950 border-zinc-800 text-zinc-350'
                }`}>
                  <div className="flex items-center space-x-2.5">
                    <div className="flex space-x-1.5 shrink-0">
                      <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
                      <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
                      <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
                    </div>
                    <span className="font-bold text-zinc-300 ml-2">{data.layoutType}_compiled.html</span>
                  </div>
                  <button
                    onClick={() => handleCopy(compiledHtml)}
                    className={`px-2.5 py-1 border rounded-md text-[9px] font-bold tracking-widest uppercase transition active:scale-95 cursor-pointer flex items-center gap-1.5 ${
                      appTheme === 'dark'
                        ? 'bg-zinc-900 hover:bg-zinc-800 border-zinc-700 text-[#fafafa]'
                        : 'bg-zinc-800 hover:bg-zinc-700 border-zinc-700 text-white'
                    }`}
                  >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied HTML!' : 'Copy'}</span>
                  </button>
                </div>
                <div className="flex-1 p-5 overflow-auto font-mono text-xs text-zinc-300 leading-relaxed select-text custom-scrollbar max-h-[60vh]">
                  <table className="w-full border-collapse">
                    <tbody>
                      {compiledHtml.split('\n').map((line, idx) => (
                        <tr key={idx} className="hover:bg-zinc-900/50 group">
                          <td className="text-zinc-600 text-right pr-4 select-none w-10 border-r border-zinc-800 text-[9.5px] font-mono leading-none py-0.5">
                            {idx + 1}
                          </td>
                          <td className="pl-4 whitespace-pre text-[11.5px]">{line}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 2e. Unlayer JSON Schema */}
            {previewTab === 'json' && (
              <div className={`w-full max-w-4xl mx-auto h-full flex flex-col border rounded-2xl overflow-hidden shadow-2xl relative font-mono ${
                appTheme === 'dark' ? 'border-zinc-800 bg-black' : 'border-zinc-250 bg-zinc-900'
              }`}>
                <div className={`px-4 py-3 border-b flex items-center justify-between text-xs select-none shrink-0 ${
                  appTheme === 'dark' ? 'bg-[#09090b] border-zinc-850 text-zinc-400' : 'bg-zinc-955 border-zinc-800 text-zinc-350'
                }`}>
                  <div className="flex items-center space-x-2.5">
                    <div className="flex space-x-1.5 shrink-0">
                      <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
                      <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
                      <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
                    </div>
                    <span className="font-bold text-zinc-300 ml-2">{data.layoutType}_schema.json</span>
                  </div>
                  <button
                    onClick={() => handleCopy(compiledJson)}
                    className={`px-2.5 py-1 border rounded-md text-[9px] font-bold tracking-widest uppercase transition active:scale-95 cursor-pointer flex items-center gap-1.5 ${
                      appTheme === 'dark'
                        ? 'bg-zinc-900 hover:bg-zinc-800 border-zinc-700 text-[#fafafa]'
                        : 'bg-zinc-800 hover:bg-zinc-700 border-zinc-700 text-white'
                    }`}
                  >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied JSON!' : 'Copy'}</span>
                  </button>
                </div>
                <div className="flex-1 p-5 overflow-auto font-mono text-xs text-zinc-300 leading-relaxed select-text custom-scrollbar max-h-[60vh]">
                  <table className="w-full border-collapse">
                    <tbody>
                      {compiledJson.split('\n').map((line, idx) => (
                        <tr key={idx} className="hover:bg-zinc-900/50 group">
                          <td className="text-zinc-600 text-right pr-4 select-none w-10 border-r border-zinc-800 text-[9.5px] font-mono leading-none py-0.5">
                            {idx + 1}
                          </td>
                          <td className="pl-4 whitespace-pre text-[11.5px]">{line}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

          </div>

          {/* Collapsible Floating Metrics Panel / Compiler Insights */}
          {showInsights && (
            <div className={`border p-4.5 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4.5 relative z-20 shadow-2xl animate-fade ${
              appTheme === 'dark' ? 'bg-[#09090b] border-zinc-800 text-white' : 'bg-white border-zinc-200 text-zinc-900'
            }`}>
              <button 
                onClick={() => setShowInsights(false)}
                className={`absolute top-2.5 right-2.5 p-0.5 rounded-md transition duration-150 cursor-pointer ${
                  appTheme === 'dark' ? 'text-zinc-600 hover:text-zinc-400 hover:bg-zinc-800' : 'text-zinc-450 hover:text-zinc-700 hover:bg-zinc-100'
                }`}
                title="Collapse insights widget"
              >
                <X className="h-3.5 w-3.5" />
              </button>
              
              <div className="flex items-center space-x-3.5">
                <div className={`h-10 w-10 rounded-xl border flex items-center justify-center shrink-0 ${
                  appTheme === 'dark' ? 'bg-zinc-900 border-zinc-800 text-zinc-300' : 'bg-zinc-100 border-zinc-250 text-zinc-750'
                }`}>
                  <Activity className="h-5 w-5" />
                </div>
                <div>
                  <span className={`text-[10px] font-bold uppercase tracking-widest font-mono ${appTheme === 'dark' ? 'text-zinc-500' : 'text-zinc-450'}`}>Compiler Insights</span>
                  <div className="flex items-center space-x-2 mt-0.5">
                    <span className={`text-xs font-bold uppercase tracking-wide ${appTheme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>{data.layoutType} Sizing Metrics</span>
                    <span className={`text-[8px] border px-1.5 py-0.5 rounded font-mono font-bold uppercase tracking-widest ${
                      appTheme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-zinc-300' : 'bg-zinc-50 border-zinc-200 text-zinc-650'
                    }`}>Client Safe</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-4.5 flex-1 max-w-xl md:justify-end">
                <div className="space-y-1.5 min-w-[110px]">
                  <div className={`flex justify-between text-[9.5px] font-bold tracking-wider ${
                    appTheme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'
                  }`}>
                    <span>HTML WEIGHT</span>
                    <span className={`font-mono ${appTheme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>{(compiledHtml.length / 1024).toFixed(1)} KB</span>
                  </div>
                  <div className={`h-1.5 w-full rounded-full overflow-hidden border ${
                    appTheme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-zinc-100 border-zinc-250'
                  }`}>
                    <div className={`h-full rounded-full ${appTheme === 'dark' ? 'bg-zinc-400' : 'bg-zinc-600'}`} style={{ width: `${Math.min(100, (compiledHtml.length / 102400) * 100)}%` }} />
                  </div>
                </div>

                <div className="space-y-1.5 min-w-[110px]">
                  <div className={`flex justify-between text-[9.5px] font-bold tracking-wider ${
                    appTheme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'
                  }`}>
                    <span>DOM COMPLEXITY</span>
                    <span className={`font-mono ${appTheme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>{(compiledHtml.split('<').length - 1)} NODES</span>
                  </div>
                  <div className={`h-1.5 w-full rounded-full overflow-hidden border ${
                    appTheme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-zinc-100 border-zinc-250'
                  }`}>
                    <div className={`h-full rounded-full ${appTheme === 'dark' ? 'bg-zinc-400' : 'bg-zinc-600'}`} style={{ width: `${Math.min(100, ((compiledHtml.split('<').length - 1) / 350) * 100)}%` }} />
                  </div>
                </div>

                <div className="space-y-1.5 min-w-[110px]">
                  <div className={`flex justify-between text-[9.5px] font-bold tracking-wider ${
                    appTheme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'
                  }`}>
                    <span>DELIVERABILITY</span>
                    <span className="font-mono text-emerald-400 flex items-center gap-0.5"><ShieldCheck className="w-3.5 h-3.5" /> 99.9%</span>
                  </div>
                  <div className={`h-1.5 w-full rounded-full overflow-hidden border ${
                    appTheme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-zinc-100 border-zinc-250'
                  }`}>
                    <div className="h-full bg-emerald-500 rounded-full w-full" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {!showInsights && (
            <button
              onClick={() => setShowInsights(true)}
              className={`fixed bottom-6 right-6 h-10 w-10 rounded-full border flex items-center justify-center shadow-2xl hover:scale-105 transition-all duration-200 z-50 cursor-pointer active:scale-95 group ${
                appTheme === 'dark'
                  ? 'bg-[#09090b] border-zinc-800 text-zinc-400 hover:text-white'
                  : 'bg-white border-zinc-200 text-zinc-600 hover:text-zinc-950'
              }`}
              title="Show compiler insights"
            >
              <Activity className="h-4 w-4" />
            </button>
          )}

        </div>
      )}

    </main>
  );
};
