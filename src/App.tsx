import { useState } from 'react';
import { LandingPage } from './components/LandingPage/LandingPage';
import { Playground } from './components/Playground/Playground';
import { getPresetById } from './templates/presets';

function App() {
  const [view, setView] = useState<'landing' | 'playground'>('landing');
  const [presetId, setPresetId] = useState<string>('weekly-digest');
  const [appTheme, setAppTheme] = useState<'dark' | 'light'>('dark');

  const handleLaunch = (id?: string) => {
    const resolvedId = id || 'weekly-digest';
    setPresetId(resolvedId);
    setView('playground');
  };

  if (view === 'playground') {
    const preset = getPresetById(presetId);
    const initialLayout = preset?.data.layoutType || 'editorial';
    const initialData = preset?.data;
    return (
      <Playground
        key={presetId}
        initialLayout={initialLayout}
        initialData={initialData}
        onBackToLanding={() => setView('landing')}
        appTheme={appTheme}
        onChangeTheme={setAppTheme}
      />
    );
  }

  return (
    <LandingPage 
      onLaunchPlayground={handleLaunch} 
      appTheme={appTheme}
      onToggleTheme={() => setAppTheme(appTheme === 'dark' ? 'light' : 'dark')}
    />
  );
}

export default App;
