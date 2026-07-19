import React from 'react';

interface LandingPageProps {
  onLaunchPlayground: (presetId?: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = () => {
  return (
    <div>
      <h1>MailCraft Landing Page</h1>
    </div>
  );
};
