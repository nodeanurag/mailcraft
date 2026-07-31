import type { QuantumTemplateData } from '../types';
import { defaultEditorialData } from './QuantumTemplate';

export interface TemplatePreset {
  id: string;
  name: string;
  description: string;
  category: 'editorial' | 'commerce' | 'event';
  categoryLabel: string;
  gradient: string;
  data: QuantumTemplateData;
}

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? Partial<T[P]> : T[P];
};

const STYLE_PROFILES = {
  luxurySerif: {
    fontFamilyTitle: "'Cormorant Garamond', Georgia, serif",
    fontFamilyBody: "'Inter', -apple-system, sans-serif",
    cardRadius: '4px',
    buttonRadius: '2px',
    borderStyle: '1px solid',
    cardShadow: '0 4px 30px rgba(0, 0, 0, 0.15)',
    buttonShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    dividerStyle: 'ornate' as const,
  },
  rusticWarm: {
    fontFamilyTitle: "'Playfair Display', Georgia, serif",
    fontFamilyBody: "'DM Sans', -apple-system, sans-serif",
    cardRadius: '8px',
    buttonRadius: '4px',
    borderStyle: '1px solid',
    cardShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
    buttonShadow: '0 2px 4px rgba(0, 0, 0, 0.08)',
    dividerStyle: 'dashed' as const,
  },
  starkMinimalist: {
    fontFamilyTitle: "'Outfit', -apple-system, sans-serif",
    fontFamilyBody: "'Inter', -apple-system, sans-serif",
    cardRadius: '0px',
    buttonRadius: '0px',
    borderStyle: '1px solid',
    cardShadow: 'none',
    buttonShadow: 'none',
    dividerStyle: 'solid' as const,
  },
  frenchBistro: {
    fontFamilyTitle: "'Playfair Display', Georgia, serif",
    fontFamilyBody: "'Inter', -apple-system, sans-serif",
    cardRadius: '12px',
    buttonRadius: '6px',
    borderStyle: '1px solid',
    cardShadow: '0 10px 30px rgba(0, 0, 0, 0.04)',
    buttonShadow: '0 4px 10px rgba(0, 0, 0, 0.08)',
    dividerStyle: 'double' as const,
  },
  artisanRound: {
    fontFamilyTitle: "'Outfit', -apple-system, sans-serif",
    fontFamilyBody: "'DM Sans', -apple-system, sans-serif",
    cardRadius: '24px',
    buttonRadius: '12px',
    borderStyle: '1px solid',
    cardShadow: '0 8px 24px rgba(0, 0, 0, 0.04)',
    buttonShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
    dividerStyle: 'solid' as const,
  },
};

const makePreset = (
  overrides: DeepPartial<QuantumTemplateData> & { layoutType: QuantumTemplateData['layoutType'] },
  profileName: keyof typeof STYLE_PROFILES = 'starkMinimalist'
): QuantumTemplateData => {
  const profile = STYLE_PROFILES[profileName];
  return {
    ...defaultEditorialData,
    ...overrides,
    theme: { 
      ...defaultEditorialData.theme, 
      ...profile, 
      ...(overrides.theme || {}) 
    },
    header: { ...defaultEditorialData.header, ...(overrides.header || {}) },
    intro: { ...defaultEditorialData.intro, ...(overrides.intro || {}) },
    hero: { ...defaultEditorialData.hero, ...(overrides.hero || {}) },
    quote: { ...defaultEditorialData.quote, ...(overrides.quote || {}) },
    spotlight: { ...defaultEditorialData.spotlight, ...(overrides.spotlight || {}) },
    shopHero: { ...defaultEditorialData.shopHero, ...(overrides.shopHero || {}) },
    promo: { ...defaultEditorialData.promo, ...(overrides.promo || {}) },
    eventHero: { ...defaultEditorialData.eventHero, ...(overrides.eventHero || {}) },
    eventDetails: { ...defaultEditorialData.eventDetails, ...(overrides.eventDetails || {}) },
    feedback: { ...defaultEditorialData.feedback, ...(overrides.feedback || {}) },
    footer: { ...defaultEditorialData.footer, ...(overrides.footer || {}) },
    features: (overrides.features as any) || defaultEditorialData.features,
    products: (overrides.products as any) || defaultEditorialData.products,
    speakers: (overrides.speakers as any) || defaultEditorialData.speakers,
    layoutOrder: (overrides.layoutOrder as string[]) || defaultEditorialData.layoutOrder,
  };
};

// Secure HTTPS Unsplash Photography Assets (Prevents HTTPS iframe mixed content blocks)
const IMAGES = {
  architecturalStairs: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
  darkWorkspace: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80',
  codeEditor: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
  scandinavianInterior: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
  studioDisplay: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80',
  abstractClay: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80',
  luxuryWatch: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80',
  linenTote: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80',
  armchair: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80',
  sneakers: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1200&q=80',
  deskMatBundle: 'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=1200&q=80',
  perfume: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1200&q=80',
  auditorium: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1200&q=80',
  podcastStudio: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=1200&q=80',
  femaleFounder: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
  maleEngineer: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80'
};

export const TEMPLATE_PRESETS: TemplatePreset[] = [
  // ─── EDITORIAL (6) ───
  {
    id: 'weekly-digest',
    name: 'Weekly Digest',
    description: 'Curated architectural essays, design systems, and software philosophy.',
    category: 'editorial',
    categoryLabel: 'Editorial',
    gradient: 'linear-gradient(135deg, #18181b 0%, #09090b 100%)',
    data: makePreset({
      layoutType: 'editorial',
      layoutOrder: ['header', 'toc', 'intro', 'hero', 'quote', 'features', 'spotlight', 'feedback', 'footer'],
      theme: { primaryColor: '#09090b', backgroundColor: '#ffffff', textColor: '#18181b', cardBgColor: '#f4f4f5', buttonColor: '#18181b', buttonTextColor: '#ffffff', borderColor: '#e4e4e7', borderFrame: false },
      header: { title: 'WEEKLY DIGEST', tagline: 'Curated highlights and essays on reductionist software engineering.', issueNumber: '043', dateString: 'July 2026' },
      intro: { show: true, title: 'THE CORE PHILOSOPHY', content: 'This week we cover single-binary deployments, silent interface design, and edge computing primers across modern software systems.', signOff: '— The Editors' },
      hero: { show: true, category: 'ARCHITECTURE', readTime: '6 MIN', title: 'Reclaiming Monolithic Simplicity', subtitle: 'Why minimalist single-file structures and monolith architectures are reclaiming developer focus from distributed microservices.', coverUrl: IMAGES.architecturalStairs, ctaText: 'Read Full Essay', ctaUrl: '#' },
      quote: { show: true, text: '"Simplicity is prerequisite for reliability."', author: 'Edsger W. Dijkstra' },
      features: [
        { id: 'wd1', number: '01', category: 'ESSAY', title: 'The Fallacy of Premature Abstraction', description: 'Why writing duplicate code early yields far cleaner boundaries than early interface abstractions.', url: '#' },
        { id: 'wd2', number: '02', category: 'SYSTEMS', title: 'Zero-Dependency TypeScript Pipelines', description: 'How compiling directly with native tsc tools cuts build pipeline latency in half.', url: '#' },
        { id: 'wd3', number: '03', category: 'UI DESIGN', title: 'Optical Spacing vs Mathematical Grids', description: 'Aligning typography with human visual perception rather than strict pixel bounds.', url: '#' }
      ]
    }, 'luxurySerif')
  },
  {
    id: 'founder-letter',
    name: 'Founder Letter',
    description: 'Personal letter from the founder on building and shipping products in public.',
    category: 'editorial',
    categoryLabel: 'Editorial',
    gradient: 'linear-gradient(135deg, #27272a 0%, #18181b 100%)',
    data: makePreset({
      layoutType: 'editorial',
      layoutOrder: ['header', 'intro', 'hero', 'quote', 'spotlight', 'feedback', 'footer'],
      theme: { primaryColor: '#18181b', backgroundColor: '#fafafa', textColor: '#09090b', cardBgColor: '#f4f4f5', buttonColor: '#09090b', buttonTextColor: '#ffffff', borderColor: '#e4e4e7', borderFrame: true },
      header: { title: 'FOUNDER LETTER', tagline: 'Honest reflections on building a product company from scratch.', issueNumber: '008', dateString: 'July 2026' },
      intro: { show: true, title: 'LETTER FROM ALEX', content: 'Building in public is messy. Some weeks are breakthroughs, others are lessons. Every feature we ship serves a single, clear intention.', signOff: '— Alex Chen, Founder' },
      hero: { show: true, category: 'PERSONAL', readTime: '5 MIN', title: 'The Art of Subtraction', subtitle: 'How removing 40% of our code base increased system throughput and customer satisfaction.', coverUrl: IMAGES.darkWorkspace, ctaText: 'Read Founder Letter', ctaUrl: '#' },
      quote: { show: true, text: '"Perfection is achieved when there is nothing left to take away."', author: 'Antoine de Saint-Exupéry' }
    }, 'rusticWarm')
  },
  {
    id: 'product-changelog',
    name: 'Product Changelog',
    description: 'Everything shipped in the latest technical release cycle.',
    category: 'editorial',
    categoryLabel: 'Editorial',
    gradient: 'linear-gradient(135deg, #09090b 0%, #18181b 100%)',
    data: makePreset({
      layoutType: 'editorial',
      layoutOrder: ['header', 'hero', 'features', 'spotlight', 'feedback', 'footer'],
      theme: { primaryColor: '#09090b', backgroundColor: '#ffffff', textColor: '#18181b', cardBgColor: '#fafafa', buttonColor: '#09090b', buttonTextColor: '#ffffff', borderColor: '#e4e4e7', borderFrame: false },
      header: { title: 'PRODUCT CHANGELOG', tagline: 'Version 2.4.0 — High-performance developer API endpoints.', issueNumber: 'V2.4.0', dateString: 'July 2026' },
      hero: { show: true, category: 'RELEASE', readTime: '3 MIN', title: 'Changelog Release 2.4', subtitle: 'A comprehensive overview of new developer tools, performance optimizations, and export improvements.', coverUrl: IMAGES.codeEditor, ctaText: 'View Full Release Notes', ctaUrl: '#' },
      features: [
        { id: 'pc1', number: '01', category: 'PERFORMANCE', title: '10x Faster Design Compilation', description: 'Our compiler pipeline now generates inline styles in under 12ms.', url: '#' },
        { id: 'pc2', number: '02', category: 'API', title: 'Webhooks for Export Triggers', description: 'Receive instant webhooks when email templates are exported or updated.', url: '#' }
      ]
    }, 'starkMinimalist')
  },
  {
    id: 'design-journal',
    name: 'Design Journal',
    description: 'Deep dive stories on grid systems, typography, and visual order.',
    category: 'editorial',
    categoryLabel: 'Editorial',
    gradient: 'linear-gradient(135deg, #18181b 0%, #27272a 100%)',
    data: makePreset({
      layoutType: 'editorial',
      layoutOrder: ['header', 'hero', 'intro', 'features', 'quote', 'spotlight', 'feedback', 'footer'],
      theme: { primaryColor: '#18181b', backgroundColor: '#fafafa', textColor: '#18181b', cardBgColor: '#f4f4f5', buttonColor: '#18181b', buttonTextColor: '#ffffff', borderColor: '#e4e4e7', borderFrame: true },
      header: { title: 'DESIGN JOURNAL', tagline: 'Exploring grid systems, typography pairings, and layout structures.', issueNumber: 'VOL. 07', dateString: 'Summer 2026' },
      intro: { show: true, title: 'THE VISUAL LANGUAGE', content: 'Design is not just what it looks like and feels like. Design is how it functions under real production conditions.', signOff: '— Design Team' },
      hero: { show: true, category: 'ESSAY', readTime: '7 MIN', title: 'Grid Systems in Modern Interfaces', subtitle: 'How constraint-driven layout grids create more scannable, accessible digital products.', coverUrl: IMAGES.scandinavianInterior, ctaText: 'Read Design Journal', ctaUrl: '#' },
      quote: { show: true, text: '"Good design is as little design as possible."', author: 'Dieter Rams' }
    }, 'luxurySerif')
  },
  {
    id: 'case-study',
    name: 'Case Study',
    description: 'Engineering case study on scaling design systems across teams.',
    category: 'editorial',
    categoryLabel: 'Editorial',
    gradient: 'linear-gradient(135deg, #09090b 0%, #18181b 100%)',
    data: makePreset({
      layoutType: 'editorial',
      layoutOrder: ['header', 'hero', 'intro', 'features', 'quote', 'spotlight', 'feedback', 'footer'],
      theme: { primaryColor: '#09090b', backgroundColor: '#ffffff', textColor: '#18181b', cardBgColor: '#fafafa', buttonColor: '#09090b', buttonTextColor: '#ffffff', borderColor: '#e4e4e7', borderFrame: false },
      header: { title: 'ENGINEERING CASE STUDY', tagline: 'How we helped Acme Corp scale their design system.', issueNumber: 'CS-04', dateString: '2026' },
      intro: { show: true, title: 'EXECUTIVE SUMMARY', content: 'Scaling an enterprise design system requires unifying tokens, accessibility compliance, and developer documentation under a single source of truth.', signOff: '— Engineering Team' },
      hero: { show: true, category: 'CASE STUDY', readTime: '10 MIN', title: 'Scaling Design Systems at Scale', subtitle: 'Reducing design handoff friction by 60% across 14 engineering product teams.', coverUrl: IMAGES.studioDisplay, ctaText: 'Read Full Case Study', ctaUrl: '#' }
    }, 'frenchBistro')
  },
  {
    id: 'monthly-recap',
    name: 'Monthly Recap',
    description: 'Curated monthly highlights, metric milestones, and team updates.',
    category: 'editorial',
    categoryLabel: 'Editorial',
    gradient: 'linear-gradient(135deg, #18181b 0%, #09090b 100%)',
    data: makePreset({
      layoutType: 'editorial',
      layoutOrder: ['header', 'hero', 'intro', 'features', 'quote', 'spotlight', 'feedback', 'footer'],
      theme: { primaryColor: '#18181b', backgroundColor: '#ffffff', textColor: '#18181b', cardBgColor: '#f4f4f5', buttonColor: '#18181b', buttonTextColor: '#ffffff', borderColor: '#e4e4e7', borderFrame: false },
      header: { title: 'MONTHLY RECAP', tagline: 'A look back at what we built and shipped this month.', issueNumber: 'JULY', dateString: 'July 2026' },
      hero: { show: true, category: 'MONTHLY RECAP', readTime: '4 MIN', title: 'July Milestones & Highlights', subtitle: 'Reflecting on 1.2M template exports, new typography primitives, and community updates.', coverUrl: IMAGES.abstractClay, ctaText: 'Explore Monthly Highlights', ctaUrl: '#' }
    }, 'artisanRound')
  },

  // ─── COMMERCE (6) ───
  {
    id: 'new-collection',
    name: 'New Collection',
    description: 'Showcase your flagship products with high-resolution imagery.',
    category: 'commerce',
    categoryLabel: 'Commerce',
    gradient: 'linear-gradient(135deg, #18181b 0%, #09090b 100%)',
    data: makePreset({
      layoutType: 'shop',
      layoutOrder: ['header', 'promoHeader', 'shopHero', 'products', 'promoBlock', 'feedback', 'footer'],
      theme: { primaryColor: '#09090b', backgroundColor: '#ffffff', textColor: '#09090b', cardBgColor: '#fafafa', buttonColor: '#09090b', buttonTextColor: '#ffffff', borderColor: '#e4e4e7', borderFrame: true },
      header: { title: 'MAILCRAFT SUPPLY', tagline: 'Minimalist catalog, crafted for everyday utility.' },
      shopHero: { show: true, title: 'The Chronograph Mark I', description: 'Matte black case, basalt stone dial, and sapphire crystal. Swiss quartz precision movement.', price: '$340', imageUrl: IMAGES.luxuryWatch, ctaText: 'Shop Mark I', ctaUrl: '#' },
      products: [
        { id: 'nc1', title: 'Chronograph Mark I', price: '$340', imageUrl: IMAGES.luxuryWatch, url: '#', badge: 'FLAGSHIP' },
        { id: 'nc2', title: 'Structured Organic Linen Tote', price: '$95', imageUrl: IMAGES.linenTote, url: '#', badge: 'LIMITED' },
        { id: 'nc3', title: 'Bouclé Lounge Armchair', price: '$850', imageUrl: IMAGES.armchair, url: '#', badge: 'PRE-ORDER' },
        { id: 'nc4', title: 'White Leather Sneakers', price: '$220', imageUrl: IMAGES.sneakers, url: '#', badge: 'NEW' }
      ],
      promo: { show: true, title: 'INAUGURAL DISCOUNT', code: 'RELEASE20', description: 'Enjoy 20% off our inaugural collection with code RELEASE20 at checkout.' }
    }, 'frenchBistro')
  },
  {
    id: 'featured-product',
    name: 'Featured Product',
    description: 'Highlight a flagship centerpiece product.',
    category: 'commerce',
    categoryLabel: 'Commerce',
    gradient: 'linear-gradient(135deg, #27272a 0%, #18181b 100%)',
    data: makePreset({
      layoutType: 'shop',
      layoutOrder: ['header', 'shopHero', 'products', 'promoBlock', 'feedback', 'footer'],
      theme: { primaryColor: '#18181b', backgroundColor: '#fafafa', textColor: '#09090b', cardBgColor: '#f4f4f5', buttonColor: '#18181b', buttonTextColor: '#ffffff', borderColor: '#e4e4e7', borderFrame: true },
      header: { title: 'FLAGSHIP SPOTLIGHT', tagline: 'Handpicked centerpiece for this season.' },
      shopHero: { show: true, title: 'Structured Organic Linen Tote', description: 'Handcrafted from 100% unbleached European flax. Internal laptop sleeve and brass hardware.', price: '$95', imageUrl: IMAGES.linenTote, ctaText: 'Order Linen Tote', ctaUrl: '#' },
      products: [
        { id: 'fp1', title: 'Basalt Chronograph Watch', price: '$340', imageUrl: IMAGES.luxuryWatch, url: '#', badge: 'POPULAR' },
        { id: 'fp2', title: 'Minimalist White Sneakers', price: '$220', imageUrl: IMAGES.sneakers, url: '#', badge: 'NEW' }
      ]
    }, 'rusticWarm')
  },
  {
    id: 'best-sellers',
    name: 'Best Sellers',
    description: 'Showcase customer favorite catalog items.',
    category: 'commerce',
    categoryLabel: 'Commerce',
    gradient: 'linear-gradient(135deg, #09090b 0%, #18181b 100%)',
    data: makePreset({
      layoutType: 'shop',
      layoutOrder: ['header', 'promoHeader', 'shopHero', 'products', 'feedback', 'footer'],
      theme: { primaryColor: '#09090b', backgroundColor: '#ffffff', textColor: '#09090b', cardBgColor: '#fafafa', buttonColor: '#09090b', buttonTextColor: '#ffffff', borderColor: '#e4e4e7', borderFrame: false },
      header: { title: 'BEST SELLERS', tagline: 'Our most loved pieces based on community reviews.' },
      shopHero: { show: true, title: 'Bouclé Lounge Armchair', description: 'Scandinavian design with textured cream bouclé upholstery and solid oak frame.', price: '$850', imageUrl: IMAGES.armchair, ctaText: 'Shop Armchair', ctaUrl: '#' },
      products: [
        { id: 'bs1', title: 'Chronograph Mark I Watch', price: '$340', imageUrl: IMAGES.luxuryWatch, url: '#', badge: '#1 BESTSELLER' },
        { id: 'bs2', title: 'Desk Setup Bundle', price: '$180', imageUrl: IMAGES.deskMatBundle, url: '#', badge: 'TOP RATED' },
        { id: 'bs3', title: 'Glass Fragrance Perfume', price: '$130', imageUrl: IMAGES.perfume, url: '#', badge: 'FAVORITE' }
      ]
    }, 'artisanRound')
  },
  {
    id: 'flash-sale',
    name: 'Flash Sale',
    description: 'Limited-time 48-hour promotional offer.',
    category: 'commerce',
    categoryLabel: 'Commerce',
    gradient: 'linear-gradient(135deg, #18181b 0%, #27272a 100%)',
    data: makePreset({
      layoutType: 'shop',
      layoutOrder: ['header', 'promoHeader', 'shopHero', 'products', 'promoBlock', 'feedback', 'footer'],
      theme: { primaryColor: '#18181b', backgroundColor: '#ffffff', textColor: '#09090b', cardBgColor: '#f4f4f5', buttonColor: '#18181b', buttonTextColor: '#ffffff', borderColor: '#e4e4e7', borderFrame: true },
      header: { title: 'FLASH SALE', tagline: '48 hours only. Exclusive seasonal savings.' },
      shopHero: { show: true, title: 'Minimalist White Sneakers', description: 'Handcrafted full-grain Italian leather with margom rubber outsole. Now 25% off.', price: '$165', imageUrl: IMAGES.sneakers, ctaText: 'Shop Flash Sale', ctaUrl: '#' },
      products: [
        { id: 'fs1', title: 'Structured Linen Tote', price: '$75', imageUrl: IMAGES.linenTote, url: '#', badge: '20% OFF' },
        { id: 'fs2', title: 'Glass Fragrance Perfume', price: '$100', imageUrl: IMAGES.perfume, url: '#', badge: '25% OFF' }
      ],
      promo: { show: true, title: 'FLASH PROMO CODE', code: 'FLASH30', description: 'Take an extra 10% off flash prices with code FLASH30.' }
    }, 'starkMinimalist')
  },
  {
    id: 'bundle-offer',
    name: 'Bundle Offer',
    description: 'Curated workspace and lifestyle packages.',
    category: 'commerce',
    categoryLabel: 'Commerce',
    gradient: 'linear-gradient(135deg, #09090b 0%, #18181b 100%)',
    data: makePreset({
      layoutType: 'shop',
      layoutOrder: ['header', 'shopHero', 'products', 'promoBlock', 'feedback', 'footer'],
      theme: { primaryColor: '#09090b', backgroundColor: '#fafafa', textColor: '#09090b', cardBgColor: '#ffffff', buttonColor: '#09090b', buttonTextColor: '#ffffff', borderColor: '#e4e4e7', borderFrame: false },
      header: { title: 'BUNDLE & SAVE', tagline: 'Curated workspace packages for maximum focus.' },
      shopHero: { show: true, title: 'The Studio Desk Bundle', description: 'Includes leather desk mat, brass fountain pen, ceramic mug, and focus timer.', price: '$180', imageUrl: IMAGES.deskMatBundle, ctaText: 'Get Desk Bundle', ctaUrl: '#' },
      products: [
        { id: 'bo1', title: 'Studio Desk Bundle', price: '$180', imageUrl: IMAGES.deskMatBundle, url: '#', badge: 'SAVE $50' },
        { id: 'bo2', title: 'Chronograph + Linen Tote', price: '$395', imageUrl: IMAGES.luxuryWatch, url: '#', badge: 'SAVE $40' }
      ]
    }, 'luxurySerif')
  },
  {
    id: 'product-comparison',
    name: 'Product Comparison',
    description: 'Side by side luxury product comparison.',
    category: 'commerce',
    categoryLabel: 'Commerce',
    gradient: 'linear-gradient(135deg, #18181b 0%, #09090b 100%)',
    data: makePreset({
      layoutType: 'shop',
      layoutOrder: ['header', 'shopHero', 'products', 'promoBlock', 'feedback', 'footer'],
      theme: { primaryColor: '#18181b', backgroundColor: '#ffffff', textColor: '#09090b', cardBgColor: '#fafafa', buttonColor: '#18181b', buttonTextColor: '#ffffff', borderColor: '#e4e4e7', borderFrame: true },
      header: { title: 'LUXURY FRAGRANCE EDITION', tagline: 'Compare scents and find your signature note.' },
      shopHero: { show: true, title: 'The Glass Fragrance Collection', description: 'Artisanal scents distilled in Grasse, France. Notes of sandalwood, Bergamot, and fresh rain.', price: '$130', imageUrl: IMAGES.perfume, ctaText: 'Explore Collection', ctaUrl: '#' },
      products: [
        { id: 'cp1', title: 'Fragrance No. 01 (Sandalwood)', price: '$130', imageUrl: IMAGES.perfume, url: '#', badge: 'EARTHY' },
        { id: 'cp2', title: 'Fragrance No. 02 (Bergamot)', price: '$130', imageUrl: IMAGES.perfume, url: '#', badge: 'CITRUS' }
      ]
    }, 'starkMinimalist')
  },

  // ─── EVENT (6) ───
  {
    id: 'product-launch',
    name: 'Product Launch',
    description: 'Official livestream product launch invitation.',
    category: 'event',
    categoryLabel: 'Event',
    gradient: 'linear-gradient(135deg, #09090b 0%, #18181b 100%)',
    data: makePreset({
      layoutType: 'event',
      layoutOrder: ['header', 'eventHero', 'eventDetails', 'speakers', 'feedback', 'footer'],
      theme: { primaryColor: '#09090b', backgroundColor: '#ffffff', textColor: '#09090b', cardBgColor: '#fafafa', buttonColor: '#09090b', buttonTextColor: '#ffffff', borderColor: '#e4e4e7', borderFrame: true },
      header: { title: 'PRODUCT LAUNCH', tagline: 'The future of developer tools is here.' },
      eventHero: { show: true, title: 'Introducing Nexus Platform', subtitle: 'Join us for the official livestream unveiling of Nexus — our next generation developer platform.', imageUrl: IMAGES.auditorium, ctaText: 'Reserve Seat', ctaUrl: '#' },
      eventDetails: { show: true, date: 'OCT 14, 2026', time: '10:00 AM EST', location: 'ONLINE & SAN FRANCISCO' },
      speakers: [
        { id: 'pl1', name: 'Dr. Evelyn Martinez', role: 'Principal Engineer', imageUrl: IMAGES.femaleFounder },
        { id: 'pl2', name: 'Marcus Thorne', role: 'Head of Systems', imageUrl: IMAGES.maleEngineer }
      ]
    }, 'starkMinimalist')
  },
  {
    id: 'webinar',
    name: 'Webinar Invitation',
    description: 'Technical architecture masterclass webinar.',
    category: 'event',
    categoryLabel: 'Event',
    gradient: 'linear-gradient(135deg, #18181b 0%, #27272a 100%)',
    data: makePreset({
      layoutType: 'event',
      layoutOrder: ['header', 'eventHero', 'eventDetails', 'speakers', 'feedback', 'footer'],
      theme: { primaryColor: '#18181b', backgroundColor: '#fafafa', textColor: '#09090b', cardBgColor: '#f4f4f5', buttonColor: '#18181b', buttonTextColor: '#ffffff', borderColor: '#e4e4e7', borderFrame: true },
      header: { title: 'TECHNICAL WEBINAR', tagline: 'Best practices for high-throughput software architectures.' },
      eventHero: { show: true, title: 'Architectures That Scale', subtitle: 'Learn how lead engineers design transactional ledgers and zero-latency caches.', imageUrl: IMAGES.podcastStudio, ctaText: 'Register Free', ctaUrl: '#' },
      eventDetails: { show: true, date: 'AUG 12, 2026', time: '13:00 EST', location: 'ZOOM LIVESTREAM' },
      speakers: [
        { id: 'wb1', name: 'Sarah Lin', role: 'Lead Architect', imageUrl: IMAGES.femaleFounder }
      ]
    }, 'rusticWarm')
  },
  {
    id: 'conference',
    name: 'Symposium Conference',
    description: 'Promote 2-day developer conference.',
    category: 'event',
    categoryLabel: 'Event',
    gradient: 'linear-gradient(135deg, #09090b 0%, #18181b 100%)',
    data: makePreset({
      layoutType: 'event',
      layoutOrder: ['header', 'eventHero', 'eventDetails', 'speakers', 'feedback', 'footer'],
      theme: { primaryColor: '#09090b', backgroundColor: '#ffffff', textColor: '#09090b', cardBgColor: '#fafafa', buttonColor: '#09090b', buttonTextColor: '#ffffff', borderColor: '#e4e4e7', borderFrame: false },
      header: { title: 'REDUCTIONIST 2026', tagline: 'A 2-day technical symposium for software builders.' },
      eventHero: { show: true, title: 'Build For Reliability', subtitle: 'Two days of deep technical talks, live code reviews, and networking in NYC.', imageUrl: IMAGES.auditorium, ctaText: 'Get Conference Pass', ctaUrl: '#' },
      eventDetails: { show: true, date: 'OCT 24–25, 2026', time: '09:00 - 18:00 EST', location: 'NEW YORK CITY, NY' },
      speakers: [
        { id: 'cf1', name: 'David Vance', role: 'Keynote Speaker', imageUrl: IMAGES.maleEngineer },
        { id: 'cf2', name: 'Elena Rostova', role: 'VP of Product', imageUrl: IMAGES.femaleFounder }
      ]
    }, 'luxurySerif')
  },
  {
    id: 'meetup',
    name: 'Local Meetup',
    description: 'Community meetup and lightning talks.',
    category: 'event',
    categoryLabel: 'Event',
    gradient: 'linear-gradient(135deg, #18181b 0%, #09090b 100%)',
    data: makePreset({
      layoutType: 'event',
      layoutOrder: ['header', 'eventHero', 'eventDetails', 'speakers', 'feedback', 'footer'],
      theme: { primaryColor: '#18181b', backgroundColor: '#fafafa', textColor: '#09090b', cardBgColor: '#f4f4f5', buttonColor: '#18181b', buttonTextColor: '#ffffff', borderColor: '#e4e4e7', borderFrame: true },
      header: { title: 'DEV MEETUP', tagline: 'Real conversations. No slides.' },
      eventHero: { show: true, title: 'Engineers Unplugged NYC', subtitle: 'An intimate gathering of product builders sharing honest stories about engineering.', imageUrl: IMAGES.podcastStudio, ctaText: 'RSVP Now', ctaUrl: '#' },
      eventDetails: { show: true, date: 'AUG 05, 2026', time: '18:30 EST', location: 'BROOKLYN, NY' },
      speakers: [
        { id: 'mu1', name: 'James Wright', role: 'Host', imageUrl: IMAGES.maleEngineer }
      ]
    }, 'frenchBistro')
  },
  {
    id: 'workshop',
    name: 'Hands-on Workshop',
    description: 'Interactive design system workshop.',
    category: 'event',
    categoryLabel: 'Event',
    gradient: 'linear-gradient(135deg, #27272a 0%, #18181b 100%)',
    data: makePreset({
      layoutType: 'event',
      layoutOrder: ['header', 'eventHero', 'eventDetails', 'speakers', 'feedback', 'footer'],
      theme: { primaryColor: '#27272a', backgroundColor: '#ffffff', textColor: '#09090b', cardBgColor: '#fafafa', buttonColor: '#09090b', buttonTextColor: '#ffffff', borderColor: '#e4e4e7', borderFrame: true },
      header: { title: 'DESIGN WORKSHOP', tagline: 'Hands-on system design exercises.' },
      eventHero: { show: true, title: 'UI Systems Masterclass', subtitle: 'Build consistent component systems and token pipelines in 3 hours.', imageUrl: IMAGES.auditorium, ctaText: 'Reserve Workshop Seat', ctaUrl: '#' },
      eventDetails: { show: true, date: 'SEP 18, 2026', time: '14:00 - 17:00 EST', location: 'INTERACTIVE STREAM' },
      speakers: [
        { id: 'ws1', name: 'Claire Dupont', role: 'Design Lead', imageUrl: IMAGES.femaleFounder }
      ]
    }, 'artisanRound')
  },
  {
    id: 'demo-day',
    name: 'Demo Day',
    description: 'Startup cohort presentations.',
    category: 'event',
    categoryLabel: 'Event',
    gradient: 'linear-gradient(135deg, #09090b 0%, #18181b 100%)',
    data: makePreset({
      layoutType: 'event',
      layoutOrder: ['header', 'eventHero', 'eventDetails', 'speakers', 'feedback', 'footer'],
      theme: { primaryColor: '#09090b', backgroundColor: '#ffffff', textColor: '#09090b', cardBgColor: '#fafafa', buttonColor: '#09090b', buttonTextColor: '#ffffff', borderColor: '#e4e4e7', borderFrame: false },
      header: { title: 'DEMO DAY 2026', tagline: '12 teams. 5 minutes each. Live product demos.' },
      eventHero: { show: true, title: 'Summer Cohort Demo Day', subtitle: 'Watch our inaugural builder cohort present their products live.', imageUrl: IMAGES.auditorium, ctaText: 'Watch Livestream', ctaUrl: '#' },
      eventDetails: { show: true, date: 'SEP 30, 2026', time: '16:00 EST', location: 'SAN FRANCISCO & LIVESTREAM' },
      speakers: [
        { id: 'dd1', name: 'Alex Rivera', role: 'Cohort Director', imageUrl: IMAGES.maleEngineer }
      ]
    }, 'starkMinimalist')
  },
];

export const getEditorialPresets = () => TEMPLATE_PRESETS.filter(p => p.category === 'editorial');
export const getCommercePresets = () => TEMPLATE_PRESETS.filter(p => p.category === 'commerce');
export const getEventPresets = () => TEMPLATE_PRESETS.filter(p => p.category === 'event');
export const getPresetById = (id: string) => TEMPLATE_PRESETS.find(p => p.id === id);
