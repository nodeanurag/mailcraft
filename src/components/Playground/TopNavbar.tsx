import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Monitor, 
  Tablet, 
  Smartphone, 
  Eye, 
  ChevronDown, 
  Copy, 
  FileJson,
  Layers,
  Printer,
  Image as ImageIcon,
  Sidebar,
  Sun,
  Moon
} from 'lucide-react';

interface TopNavbarProps {
  onBack: () => void;
  viewportMode: 'desktop' | 'tablet' | 'mobile';
  setViewportMode: (v: 'desktop' | 'tablet' | 'mobile') => void;
  isPreviewMode: boolean;
  setIsPreviewMode: (p: boolean) => void;
  onSaveChanges: () => void;
  tab: 'preview' | 'editor' | 'html' | 'json' | 'jsx' | 'dashboard';
  setTab: (t: 'preview' | 'editor' | 'html' | 'json' | 'jsx' | 'dashboard') => void;
  
  // Data for advanced exports
  data: any;
  compiledHtml: string;
  compiledWebHtml: string;
  compiledPrintHtml: string;
  compiledJson: string;

  // Sidebar Visibility
  isSidebarVisible: boolean;
  onToggleSidebar: () => void;

  // Theme Switching
  appTheme: 'dark' | 'light';
  onToggleTheme: () => void;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({
  onBack,
  viewportMode,
  setViewportMode,
  isPreviewMode,
  setIsPreviewMode,
  onSaveChanges,
  tab,
  setTab,
  data,
  compiledHtml,
  compiledWebHtml,
  compiledPrintHtml,
  compiledJson,
  isSidebarVisible,
  onToggleSidebar,
  appTheme,
  onToggleTheme
}) => {
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(type);
    setTimeout(() => setCopiedText(null), 2500);
  };

  const handleDownloadFile = (content: string, filename: string, contentType: string) => {
    const blob = new Blob([content], { type: contentType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleExportPdf = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Pop-up blocked! Please allow pop-ups for this site to export PDF.');
      return;
    }
    printWindow.document.write(compiledPrintHtml);
    printWindow.document.close();
    printWindow.onload = () => {
      printWindow.focus();
      printWindow.print();
    };
    setTimeout(() => {
      try {
        printWindow.focus();
        printWindow.print();
      } catch (e) {
        console.error(e);
      }
    }, 1000);
  };

  const handleCaptureImage = async (format: 'email' | 'web' | 'print') => {
    setIsCapturing(true);
    try {
      const html2canvas = (await import('html2canvas')).default;
      
      let targetHtml = compiledHtml;
      let targetWidth = '600px';
      if (format === 'web') {
        targetHtml = compiledWebHtml;
        targetWidth = '1200px';
      } else if (format === 'print') {
        targetHtml = compiledPrintHtml;
        targetWidth = '794px';
      }
      
      const offscreenDiv = document.createElement('div');
      offscreenDiv.style.position = 'absolute';
      offscreenDiv.style.left = '-9999px';
      offscreenDiv.style.top = '-9999px';
      offscreenDiv.style.width = targetWidth;
      offscreenDiv.style.backgroundColor = data.theme.backgroundColor;
      offscreenDiv.style.height = 'auto';
      offscreenDiv.style.overflow = 'visible';
      
      offscreenDiv.innerHTML = targetHtml;
      document.body.appendChild(offscreenDiv);

      await new Promise(resolve => setTimeout(resolve, 800));

      const canvas = await html2canvas(offscreenDiv, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: data.theme.backgroundColor,
        logging: false,
        width: parseInt(targetWidth),
        windowWidth: parseInt(targetWidth)
      });

      document.body.removeChild(offscreenDiv);

      const dataUrl = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = `${data.layoutType || 'mailcraft'}-capture-${format}-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (e) {
      alert(`Error capturing image: ${(e as Error).message}`);
    } finally {
      setIsCapturing(false);
    }
  };

  return (
    <header className={`h-14 border-b transition-colors duration-300 z-50 shrink-0 relative select-none flex items-center justify-between px-6 ${
      appTheme === 'dark' 
        ? 'border-white/[0.06] bg-[#09090b] text-[#fafafa]' 
        : 'border-zinc-200 bg-white text-[#18181b]'
    }`}>
      
      {/* Left: Back button + Logo + Sidebar Toggle + Theme Toggle */}
      <div className="flex items-center gap-3">
        <button 
          onClick={onBack}
          className={`flex items-center gap-1.5 text-xs font-bold transition duration-150 active:scale-95 cursor-pointer ${
            appTheme === 'dark' ? 'text-zinc-400 hover:text-white' : 'text-zinc-600 hover:text-zinc-950'
          }`}
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        
        <div className={`h-4 w-px transition-colors duration-300 ${appTheme === 'dark' ? 'bg-white/[0.08]' : 'bg-zinc-200'}`} />

        {/* Sidebar Toggle */}
        <button 
          onClick={onToggleSidebar}
          className={`p-1.5 rounded-lg border transition duration-150 flex items-center justify-center cursor-pointer active:scale-95 ${
            isSidebarVisible 
              ? (appTheme === 'dark' ? 'bg-white/[0.04] border-white/[0.08] text-indigo-400 hover:text-indigo-300' : 'bg-zinc-100 border-zinc-200 text-indigo-600 hover:text-indigo-500') 
              : 'bg-transparent border-transparent text-zinc-500 hover:text-zinc-300'
          }`}
          title={isSidebarVisible ? "Hide Sidebar" : "Show Sidebar"}
        >
          <Sidebar className="w-4 h-4" />
        </button>

        {/* Theme Toggle */}
        <button 
          onClick={onToggleTheme}
          className={`p-1.5 rounded-lg border transition duration-150 flex items-center justify-center cursor-pointer active:scale-95 ${
            appTheme === 'dark'
              ? 'bg-transparent border-transparent text-zinc-400 hover:text-white hover:bg-zinc-800/55'
              : 'bg-transparent border-transparent text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100'
          }`}
          title={appTheme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {appTheme === 'dark' ? (
            <Sun className="w-4 h-4 text-amber-400" />
          ) : (
            <Moon className="w-4 h-4 text-indigo-600" />
          )}
        </button>
        
        <div className={`h-4 w-px transition-colors duration-300 ${appTheme === 'dark' ? 'bg-white/[0.08]' : 'bg-zinc-200'}`} />
 
        <span className={`font-extrabold text-[11px] tracking-[0.25em] uppercase flex items-center ${
          appTheme === 'dark' ? 'text-[#fafafa]' : 'text-[#18181b]'
        }`}>
          MAILCRAFT<span className="text-indigo-500 font-black">.</span>
        </span>
      </div>

      {/* Center: Dynamic view based on tab */}
      <div className="flex justify-center items-center">
        {tab === 'dashboard' ? (
          <div className={`text-[10px] font-extrabold uppercase tracking-[0.2em] flex items-center gap-2 border px-3 py-1.5 rounded-full ${
            appTheme === 'dark' 
              ? 'text-zinc-400 bg-white/[0.02] border-white/[0.06]' 
              : 'text-zinc-600 bg-zinc-100 border-zinc-200'
          }`}>
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
            Multi-Channel Workspace
          </div>
        ) : (
          <div className={`flex p-0.5 rounded-lg border gap-0.5 shadow-lg ${
            appTheme === 'dark' ? 'bg-[#030303] border-white/[0.06]' : 'bg-zinc-100 border-zinc-200'
          }`}>
            <button 
              onClick={() => setViewportMode('desktop')}
              className={`px-3 py-1 rounded-[6px] text-[10px] font-extrabold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
                viewportMode === 'desktop' 
                  ? (appTheme === 'dark' ? 'bg-white/[0.08] text-white border border-white/10 shadow-inner' : 'bg-white text-zinc-900 border-zinc-200/80 shadow') 
                  : (appTheme === 'dark' ? 'text-zinc-500 hover:text-zinc-300' : 'text-zinc-500 hover:text-zinc-800')
              }`}
            >
              <Monitor className="w-3.5 h-3.5" /> Desktop
            </button>
            <button 
              onClick={() => setViewportMode('tablet')}
              className={`px-3 py-1 rounded-[6px] text-[10px] font-extrabold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
                viewportMode === 'tablet' 
                  ? (appTheme === 'dark' ? 'bg-white/[0.08] text-white border border-white/10 shadow-inner' : 'bg-white text-zinc-900 border-zinc-200/80 shadow') 
                  : (appTheme === 'dark' ? 'text-zinc-500 hover:text-zinc-300' : 'text-zinc-500 hover:text-zinc-800')
              }`}
            >
              <Tablet className="w-3.5 h-3.5" /> Tablet
            </button>
            <button 
              onClick={() => setViewportMode('mobile')}
              className={`px-3 py-1 rounded-[6px] text-[10px] font-extrabold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
                viewportMode === 'mobile' 
                  ? (appTheme === 'dark' ? 'bg-white/[0.08] text-white border border-white/10 shadow-inner' : 'bg-white text-zinc-900 border-zinc-200/80 shadow') 
                  : (appTheme === 'dark' ? 'text-zinc-500 hover:text-zinc-300' : 'text-zinc-500 hover:text-zinc-800')
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" /> Mobile
            </button>
          </div>
        )}
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-4">
        {/* Preview Toggle (only visible in editor mode) */}
        {tab === 'editor' && (
          <button 
            onClick={() => setIsPreviewMode(!isPreviewMode)}
            className={`text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
              appTheme === 'dark' ? 'text-zinc-400 hover:text-white' : 'text-zinc-600 hover:text-zinc-950'
            }`}
          >
            <Eye className="w-4 h-4" /> {isPreviewMode ? 'Editing Mode' : 'Preview'}
          </button>
        )}

        {/* Export Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setIsExportOpen(!isExportOpen)}
            disabled={isCapturing}
            className={`text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer disabled:opacity-50 ${
              appTheme === 'dark' ? 'text-zinc-400 hover:text-white' : 'text-zinc-600 hover:text-zinc-950'
            }`}
          >
            {isCapturing ? 'Capturing...' : 'Export'} <ChevronDown className="w-3.5 h-3.5" />
          </button>
          {isExportOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setIsExportOpen(false)} />
              <div className={`absolute right-0 mt-2 w-56 rounded-xl border p-1.5 shadow-[0_10px_30px_rgba(0,0,0,0.25)] z-50 animate-fade text-left space-y-1 ${
                appTheme === 'dark' ? 'bg-[#0c0c0e] border-white/[0.08]' : 'bg-white border-zinc-200'
              }`}>
                {/* File Downloads Category */}
                <div className={`px-2 py-1 text-[8.5px] font-bold uppercase tracking-wider select-none ${
                  appTheme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'
                }`}>
                  Download Files
                </div>
                <button 
                  onClick={() => {
                    setIsExportOpen(false);
                    handleDownloadFile(
                      JSON.stringify(data, null, 2), 
                      `${data.layoutType || 'mailcraft'}-config.json`, 
                      'application/json'
                    );
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs flex items-center gap-2 font-medium transition cursor-pointer ${
                    appTheme === 'dark' ? 'text-zinc-400 hover:text-white hover:bg-white/[0.03]' : 'text-zinc-700 hover:text-zinc-950 hover:bg-zinc-50'
                  }`}
                >
                  <FileJson className={`w-3.5 h-3.5 ${appTheme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`} /> Save Config JSON
                </button>
                <button 
                  onClick={() => {
                    setIsExportOpen(false);
                    handleDownloadFile(
                      compiledJson, 
                      `${data.layoutType || 'mailcraft'}-editor.json`, 
                      'application/json'
                    );
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs flex items-center gap-2 font-medium transition cursor-pointer ${
                    appTheme === 'dark' ? 'text-zinc-400 hover:text-white hover:bg-white/[0.03]' : 'text-zinc-700 hover:text-zinc-950 hover:bg-zinc-50'
                  }`}
                >
                  <Layers className={`w-3.5 h-3.5 ${appTheme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`} /> Save Editor JSON
                </button>
                
                <div className={`h-px my-1 ${appTheme === 'dark' ? 'bg-white/[0.06]' : 'bg-zinc-100'}`} />

                {/* Clipboard Category */}
                <div className={`px-2 py-1 text-[8.5px] font-bold uppercase tracking-wider select-none ${
                  appTheme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'
                }`}>
                  Copy to Clipboard
                </div>
                <button 
                  onClick={() => {
                    handleCopy(compiledHtml, 'Email');
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs flex items-center justify-between font-medium transition cursor-pointer ${
                    appTheme === 'dark' ? 'text-zinc-400 hover:text-white hover:bg-white/[0.03]' : 'text-zinc-700 hover:text-zinc-950 hover:bg-zinc-50'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Copy className={`w-3.5 h-3.5 ${appTheme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`} /> Copy Email HTML
                  </span>
                  {copiedText === 'Email' && <span className="text-[9px] text-emerald-400 font-bold uppercase tracking-wider">Copied</span>}
                </button>
                <button 
                  onClick={() => {
                    handleCopy(compiledPrintHtml, 'Print');
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs flex items-center justify-between font-medium transition cursor-pointer ${
                    appTheme === 'dark' ? 'text-zinc-400 hover:text-white hover:bg-white/[0.03]' : 'text-zinc-700 hover:text-zinc-950 hover:bg-zinc-50'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Copy className={`w-3.5 h-3.5 ${appTheme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`} /> Copy Print HTML
                  </span>
                  {copiedText === 'Print' && <span className="text-[9px] text-emerald-400 font-bold uppercase tracking-wider">Copied</span>}
                </button>
                
                <div className={`h-px my-1 ${appTheme === 'dark' ? 'bg-white/[0.06]' : 'bg-zinc-100'}`} />

                {/* Print/PDF Category */}
                <div className={`px-2 py-1 text-[8.5px] font-bold uppercase tracking-wider select-none ${
                  appTheme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'
                }`}>
                  Print & PDF
                </div>
                <button 
                  onClick={() => {
                    setIsExportOpen(false);
                    handleExportPdf();
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs flex items-center gap-2 font-medium transition cursor-pointer ${
                    appTheme === 'dark' ? 'text-zinc-400 hover:text-white hover:bg-white/[0.03]' : 'text-zinc-700 hover:text-zinc-950 hover:bg-zinc-50'
                  }`}
                >
                  <Printer className={`w-3.5 h-3.5 ${appTheme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`} /> Export High-Res PDF
                </button>

                <div className={`h-px my-1 ${appTheme === 'dark' ? 'bg-white/[0.06]' : 'bg-zinc-100'}`} />

                {/* Image Capture Category */}
                <div className={`px-2 py-1 text-[8.5px] font-bold uppercase tracking-wider select-none ${
                  appTheme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'
                }`}>
                  Image Capture (PNG)
                </div>
                <button 
                  onClick={() => {
                    setIsExportOpen(false);
                    handleCaptureImage('email');
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs flex items-center gap-2 font-medium transition cursor-pointer ${
                    appTheme === 'dark' ? 'text-zinc-400 hover:text-white hover:bg-white/[0.03]' : 'text-zinc-700 hover:text-zinc-950 hover:bg-zinc-50'
                  }`}
                >
                  <ImageIcon className={`w-3.5 h-3.5 ${appTheme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`} /> Capture Email View
                </button>
                <button 
                  onClick={() => {
                    setIsExportOpen(false);
                    handleCaptureImage('web');
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs flex items-center gap-2 font-medium transition cursor-pointer ${
                    appTheme === 'dark' ? 'text-zinc-400 hover:text-white hover:bg-white/[0.03]' : 'text-zinc-700 hover:text-zinc-950 hover:bg-zinc-50'
                  }`}
                >
                  <ImageIcon className={`w-3.5 h-3.5 ${appTheme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`} /> Capture Web View
                </button>
                <button 
                  onClick={() => {
                    setIsExportOpen(false);
                    handleCaptureImage('print');
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs flex items-center gap-2 font-medium transition cursor-pointer ${
                    appTheme === 'dark' ? 'text-zinc-400 hover:text-white hover:bg-white/[0.03]' : 'text-zinc-700 hover:text-zinc-950 hover:bg-zinc-50'
                  }`}
                >
                  <ImageIcon className={`w-3.5 h-3.5 ${appTheme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`} /> Capture Print View
                </button>
              </div>
            </>
          )}
        </div>

        {/* Toggle Editor / Dashboard View */}
        {tab === 'dashboard' ? (
          <button 
            onClick={() => setTab('editor')}
            className="h-8 px-4 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white text-xs font-black transition duration-150 active:scale-95 cursor-pointer shadow-[0_2px_12px_rgba(99,102,241,0.3)] flex items-center gap-1.5"
          >
            Launch Drag & Drop Editor
          </button>
        ) : (
          <button 
            onClick={() => setTab('dashboard')}
            className={`h-8 px-4 rounded-lg text-xs font-bold transition duration-150 active:scale-95 cursor-pointer border flex items-center gap-1.5 ${
              appTheme === 'dark' 
                ? 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white border-white/[0.06]' 
                : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700 hover:text-zinc-950 border-zinc-200'
            }`}
          >
            Back to Dashboard
          </button>
        )}

        {/* Save Changes Button */}
        <button 
          onClick={onSaveChanges}
          className="h-8 px-4 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-black text-xs font-black transition duration-150 active:scale-95 cursor-pointer shadow-[0_2px_10px_rgba(16,185,129,0.2)]"
        >
          Save Changes
        </button>
      </div>
    </header>
  );
};
