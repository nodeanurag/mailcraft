export interface QuantumTemplateData {
  layoutType: 'editorial' | 'shop' | 'event';
  layoutOrder: string[];
  theme: {
    primaryColor: string;
    backgroundColor: string;
    textColor: string;
    cardBgColor: string;
    buttonColor: string;
    buttonTextColor: string;
    borderColor: string;
    borderFrame?: boolean;
    fontFamilyTitle?: string;
    fontFamilyBody?: string;
    cardRadius?: string;
    buttonRadius?: string;
    borderStyle?: string;
    cardShadow?: string;
    buttonShadow?: string;
    dividerStyle?: 'solid' | 'dashed' | 'double' | 'ornate';
  };
  header: {
    logoUrl: string;
    logoWidth: string;
    logoHeight: string;
    logoAlt?: string;
    title: string;
    tagline: string;
    issueNumber: string;
    dateString: string;
  };
  intro: {
    show: boolean;
    title: string;
    content: string;
    signOff: string;
  };
  hero: {
    show: boolean;
    category: string;
    readTime: string;
    title: string;
    subtitle: string;
    coverUrl: string;
    ctaText: string;
    ctaUrl: string;
  };
  features: Array<{
    id: string;
    number: string;
    category: string;
    title: string;
    description: string;
    url: string;
  }>;
  quote: {
    show: boolean;
    text: string;
    author: string;
  };
  spotlight: {
    show: boolean;
    title: string;
    description: string;
    imageUrl: string;
    ctaText: string;
    ctaUrl: string;
    imagePosition: 'left' | 'right';
  };
  shopHero: {
    show: boolean;
    title: string;
    description: string;
    price: string;
    imageUrl: string;
    ctaText: string;
    ctaUrl: string;
  };
  products: Array<{
    id: string;
    title: string;
    price: string;
    imageUrl: string;
    url: string;
    badge?: string;
  }>;
  promo: {
    show: boolean;
    title: string;
    code: string;
    description: string;
  };
  eventHero: {
    show: boolean;
    title: string;
    subtitle: string;
    imageUrl: string;
    ctaText: string;
    ctaUrl: string;
  };
  eventDetails: {
    show: boolean;
    date: string;
    time: string;
    location: string;
  };
  speakers: Array<{
    id: string;
    name: string;
    role: string;
    imageUrl: string;
  }>;
  feedback: {
    show: boolean;
    title: string;
  };
  footer: {
    companyName: string;
    address: string;
    unsubscribeUrl: string;
    twitterUrl: string;
    githubUrl: string;
    linkedinUrl: string;
  };
}
