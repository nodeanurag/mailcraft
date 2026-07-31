import React from 'react';
import {
  Email,
  Page,
  Document,
  Row,
  Column,
  Heading,
  Paragraph,
  Button,
  Image,
  Divider,
  ColumnLayouts
} from '@unlayer/react-elements';

import type { QuantumTemplateData } from '../types';

const chunkArray = <T,>(arr: T[], size: number): T[][] => {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
};

export const defaultEditorialData: QuantumTemplateData = {
  layoutType: 'editorial',
  layoutOrder: ['header', 'toc', 'intro', 'hero', 'quote', 'features', 'spotlight', 'feedback', 'footer'],
  theme: {
    primaryColor: '#000000',
    backgroundColor: '#ffffff',
    textColor: '#1a1a1a',
    cardBgColor: '#f7f7f7',
    buttonColor: '#1a1a1a',
    buttonTextColor: '#ffffff',
    borderColor: '#e5e5e5',
    borderFrame: false,
    fontFamilyTitle: "'Playfair Display', Georgia, serif",
    fontFamilyBody: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    cardRadius: '0px',
    buttonRadius: '0px',
    borderStyle: 'none',
    cardShadow: 'none',
    buttonShadow: 'none',
    dividerStyle: 'solid'
  },
  header: {
    logoUrl: '/logo.png',
    logoWidth: '28px',
    logoHeight: '28px',
    title: 'MAILCRAFT JOURNAL',
    tagline: 'A Monthly Journal on Engineering, Design, and Reductionist Architecture',
    issueNumber: '012',
    dateString: 'July 2026',
  },
  intro: {
    show: true,
    title: 'THE CORE PHILOSOPHY',
    content: 'In modern software engineering, we are constantly barraged by options. Every project demands choices between dozens of frameworks, databases, and hosting solutions. Yet, the teams that move the fastest are often those that choose the least. By restricting our toolset and adopting a reductionist approach, we free our minds to focus on what truly matters: solving core problems. This edition is dedicated to monolithic simplicity, silent interfaces, and the art of subtraction.',
    signOff: '— The Editors',
  },
  hero: {
    show: true,
    category: 'ESSAY',
    readTime: '6 MIN',
    title: 'Reclaiming Monolithic Simplicity',
    subtitle: 'An inquiry into why minimalist API designs, clean single-file structures, and monolith architectures are reclaiming modern software development from the exhaustion of over-distributed microservices.',
    coverUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    ctaText: 'Read Full Essay',
    ctaUrl: 'https://example.com/essay',
  },
  features: [
    {
      id: 'f1',
      number: '01',
      category: 'ARCHITECTURE',
      title: 'The Single-Binary Deploy',
      description: 'Why shipping a unified binary contains deployment complexity and optimizes operational overhead.',
      url: 'https://example.com/single-binary',
    },
    {
      id: 'f2',
      number: '02',
      category: 'USER INTERFACE',
      title: 'Silent UI Design Systems',
      description: 'How reducing layouts, eliminating vibrant indicators, and using strict gray-scales focuses attention.',
      url: 'https://example.com/silent-ui',
    },
  ],
  quote: {
    show: true,
    text: 'Simplicity is a great virtue but it requires hard work to achieve it and education to appreciate it. And to make things worse: complexity sells better.',
    author: 'Edsger W. Dijkstra',
  },
  spotlight: {
    show: true,
    title: 'The Monolith Stack',
    description: 'A curated selection of tools built for monolithic simplicity: SQLite for zero-config database storage, jiti for runtime typescript execution, and Tailwind CSS for utility-first responsive layout styling.',
    imageUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80',
    ctaText: 'Browse the Stack',
    ctaUrl: 'https://example.com/stack',
    imagePosition: 'right',
  },
  shopHero: {
    show: true,
    title: 'MailCraft Supply: Release 01',
    description: 'A capsule collection built on reductionist design values. Structured silhouettes, zero branding, and premium organic textiles designed to simplify your everyday carry.',
    price: '$180',
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80',
    ctaText: 'Shop the Release',
    ctaUrl: 'https://example.com/shop',
  },
  products: [
    {
      id: 'p1',
      title: 'Structured Wool Cap',
      price: '$65',
      imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80',
      url: 'https://example.com/cap',
    },
    {
      id: 'p2',
      title: 'Minimalist Canvas Tote',
      price: '$95',
      imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80',
      url: 'https://example.com/tote',
    },
  ],
  promo: {
    show: true,
    title: 'OFFER',
    code: 'SIMPLICITY',
    description: 'Enter code SIMPLICITY at checkout for 15% off our inaugural release catalog.',
  },
  eventHero: {
    show: true,
    title: 'Reductionist Engineering 2026',
    subtitle: 'Join us for a single-day symposium dedicated to building fast, maintainable, and simple software systems. No sponsors, no tracks, just technical depth.',
    imageUrl: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1200&q=80',
    ctaText: 'Register Now',
    ctaUrl: 'https://example.com/register',
  },
  eventDetails: {
    show: true,
    date: 'OCT 14, 2026',
    time: '09:00 - 17:00 EST',
    location: 'NEW YORK CITY, NY',
  },
  speakers: [
    {
      id: 's1',
      name: 'Dr. Evelyn Martinez',
      role: 'Principal Engineer, SQLite Core Team',
      imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 's2',
      name: 'Marcus Thorne',
      role: 'Author, The Monolith Framework',
      imageUrl: '/colorful_export.png',
    },
  ],
  feedback: {
    show: true,
    title: 'Was this edition insightful?',
  },
  footer: {
    companyName: 'MailCraft Studio',
    address: '42 Editorial Way, Suite 100, New York, NY 10001',
    unsubscribeUrl: 'https://example.com/unsubscribe',
    twitterUrl: 'https://twitter.com',
    githubUrl: 'https://github.com/unlayer/elements',
    linkedinUrl: 'https://linkedin.com',
  },
};

interface QuantumTemplateProps {
  data?: QuantumTemplateData;
  mode?: 'email' | 'page' | 'document';
}

const resolveUrl = (url?: string) => {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) return url;
  if (typeof window !== 'undefined') {
    const origin = window.location.origin;
    return `${origin}${url.startsWith('/') ? '' : '/'}${url}`;
  }
  return url;
};

export const QuantumTemplate: React.FC<QuantumTemplateProps> = ({
  data = defaultEditorialData,
  mode = 'email'
}) => {
  const { theme, header, footer, feedback, layoutOrder } = data;

  const defaultFontStack = { label: "Plus Jakarta Sans", value: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" };
  const defaultSerifFontStack = { label: "Playfair Display", value: "'Playfair Display', Georgia, serif" };

  const fontStack = theme.fontFamilyBody ? { label: theme.fontFamilyBody.replace(/['"]/g, ''), value: theme.fontFamilyBody } : defaultFontStack;
  const serifFontStack = theme.fontFamilyTitle ? { label: theme.fontFamilyTitle.replace(/['"]/g, ''), value: theme.fontFamilyTitle } : defaultSerifFontStack;

  // 1. BRAND HEADER RENDERER
  const renderHeader = () => (
    <Row padding="32px 20px" backgroundColor={theme.backgroundColor}>
      <Column>
        {header.logoUrl && (
          <Image
            src={resolveUrl(header.logoUrl)}
            alt={header.logoAlt || 'Logo'}
            width={28}
          />
        )}
        <Paragraph
          fontSize="9px"
          color="#737373"
          textAlign="center"
          letterSpacing="2.5px"
          fontWeight="bold"
          fontFamily={fontStack}
          containerPadding="16px 0px 8px 0px"
        >
          ISSUE NO. {header.issueNumber} • {header.dateString.toUpperCase()}
        </Paragraph>
        
        <Divider border={{ borderTopWidth: '1px', borderTopStyle: 'solid', borderTopColor: theme.borderColor }} containerPadding="4px 0px" />
        <Heading
          headingType="h1"
          fontSize="26px"
          color={theme.textColor}
          textAlign="center"
          fontWeight="900"
          letterSpacing="5px"
          fontFamily={serifFontStack}
          containerPadding="12px 0px"
        >
          {header.title.toUpperCase()}
        </Heading>
        <Divider border={{ borderTopWidth: '1px', borderTopStyle: 'solid', borderTopColor: theme.borderColor }} containerPadding="4px 0px" />

        <Paragraph
          fontSize="11px"
          color="#525252"
          textAlign="center"
          letterSpacing="1px"
          fontFamily={fontStack}
          lineHeight="1.4"
          containerPadding="8px 0px 0px 0px"
        >
          {header.tagline}
        </Paragraph>
      </Column>
    </Row>
  );

  // 2. T.O.C. RENDERER
  const renderToc = () => (
    <Row padding="16px 20px" backgroundColor={theme.cardBgColor} layout={ColumnLayouts.ThreeEqual} noStackMobile>
      <Column border={{ borderRightWidth: '1px', borderRightStyle: 'solid', borderRightColor: theme.borderColor }}>
        <Paragraph fontSize="9px" color="#737373" letterSpacing="1.5px" fontFamily={fontStack} textAlign="center">
          <strong style={{ color: theme.textColor }}>01 /</strong> MONOLITH
        </Paragraph>
      </Column>
      <Column border={{ borderRightWidth: '1px', borderRightStyle: 'solid', borderRightColor: theme.borderColor }}>
        <Paragraph fontSize="9px" color="#737373" letterSpacing="1.5px" fontFamily={fontStack} textAlign="center">
          <strong style={{ color: theme.textColor }}>02 /</strong> SILENT UI
        </Paragraph>
      </Column>
      <Column>
        <Paragraph fontSize="9px" color="#737373" letterSpacing="1.5px" fontFamily={fontStack} textAlign="center">
          <strong style={{ color: theme.textColor }}>03 /</strong> ZERO-JS
        </Paragraph>
      </Column>
    </Row>
  );

  // 3. EDITORIAL INTRO NOTE RENDERER
  const renderIntro = () => {
    const { intro } = data;
    if (!intro.show) return null;
    return (
      <Row padding="45px 20px" backgroundColor={theme.backgroundColor}>
        <Column>
          <Heading
            headingType="h3"
            fontSize="11px"
            color={theme.textColor}
            textAlign="left"
            fontWeight="900"
            letterSpacing="2.5px"
            fontFamily={fontStack}
            containerPadding="0px 0px 16px 0px"
          >
            ▪ NOTE FROM THE EDITORS
          </Heading>
          <Paragraph
            fontSize="14px"
            color="#3f3f46"
            textAlign="left"
            lineHeight="1.8"
            fontFamily={fontStack}
            containerPadding="0px 0px 18px 0px"
          >
            {intro.content}
          </Paragraph>
          
          <Divider border={{ borderTopWidth: '1px', borderTopStyle: 'dashed', borderTopColor: theme.borderColor }} containerPadding="24px 0px 16px 0px" />
          <Paragraph
            fontSize="12px"
            color={theme.textColor}
            textAlign="left"
            fontWeight="bold"
            letterSpacing="1.5px"
            fontFamily={fontStack}
            containerPadding="0px 0px 4px 0px"
          >
            {intro.signOff.toUpperCase()}
          </Paragraph>
          <Paragraph
            fontSize="26px"
            color={theme.textColor}
            textAlign="left"
            fontFamily={{ label: "Georgia", value: "georgia,serif" }}
            fontWeight="normal"
            containerPadding="0px"
            lineHeight="1.2"
          >
            <em>{intro.signOff.replace(/^[—\s]+/, '')}</em>
          </Paragraph>
        </Column>
      </Row>
    );
  };

  // 4. EDITORIAL HERO RENDERER
  const renderHero = () => {
    const { hero } = data;
    if (!hero.show) return null;
    return (
      <Row padding="45px 20px" backgroundColor={theme.backgroundColor}>
        <Column border={{ borderTopWidth: '1px', borderTopStyle: 'solid', borderTopColor: theme.borderColor, borderBottomWidth: '1px', borderBottomStyle: 'solid', borderBottomColor: theme.borderColor, borderLeftWidth: '1px', borderLeftStyle: 'solid', borderLeftColor: theme.borderColor, borderRightWidth: '1px', borderRightStyle: 'solid', borderRightColor: theme.borderColor }} padding="6px">
          {hero.coverUrl && (
            <Image
              src={resolveUrl(hero.coverUrl)}
              alt={hero.title}
              width={560}
              containerPadding="0px 0px 24px 0px"
            />
          )}
          
          <Paragraph
            fontSize="9px"
            color={theme.textColor}
            textAlign="left"
            letterSpacing="2px"
            fontWeight="bold"
            fontFamily={fontStack}
            containerPadding="4px 8px"
          >
            <span style={{ border: `1px solid ${theme.textColor}`, padding: '4px 8px', display: 'inline-block' }}>
              {hero.category.toUpperCase()} • {hero.readTime.toUpperCase()}
            </span>
          </Paragraph>

          <Heading
            headingType="h1"
            fontSize="30px"
            color={theme.textColor}
            textAlign="left"
            fontWeight="800"
            lineHeight="1.2"
            fontFamily={fontStack}
            containerPadding="14px 0px"
          >
            {hero.title}
          </Heading>
          <Paragraph
            fontSize="14px"
            color="#52525b"
            textAlign="left"
            lineHeight="1.7"
            fontFamily={fontStack}
            containerPadding="0px 0px 28px 0px"
          >
            {hero.subtitle}
          </Paragraph>
          <Button
            href={{ name: 'web', attrs: { href: hero.ctaUrl } }}
            backgroundColor={theme.primaryColor}
            color={theme.buttonTextColor}
            padding="12px 28px"
            borderRadius={theme.buttonRadius || '0px'} fontSize="11px"
            fontWeight="bold"
            letterSpacing="2px"
            fontFamily={fontStack}
          >
            {hero.ctaText.toUpperCase()}
          </Button>
        </Column>
      </Row>
    );
  };

  // 5. BLOCKQUOTE RENDERER
  const renderQuote = () => {
    const { quote } = data;
    if (!quote.show) return null;
    return (
      <Row padding="45px 30px" backgroundColor={theme.cardBgColor}>
        <Column border={{ borderLeftWidth: '3px', borderLeftStyle: 'solid', borderLeftColor: theme.textColor }} padding="0px 0px 0px 20px">
          <Paragraph
            fontSize="20px"
            color={theme.textColor}
            textAlign="left"
            lineHeight="1.6"
            fontFamily={{ label: "Georgia", value: "georgia,serif" }}
            containerPadding="0px 0px 12px 0px"
          >
            {quote.text}
          </Paragraph>
          <Paragraph
            fontSize="11px"
            color="#71717a"
            textAlign="left"
            letterSpacing="1.5px"
            fontWeight="bold"
            fontFamily={fontStack}
            containerPadding="0px"
          >
            — {quote.author.toUpperCase()}
          </Paragraph>
        </Column>
      </Row>
    );
  };

  // 6. CURATION LIST RENDERER
  const renderFeatures = () => {
    const { features } = data;
    if (features.length === 0) return null;

    const colChildren: React.ReactNode[] = [];
    colChildren.push(
      <Heading
        key="features-title"
        headingType="h2"
        fontSize="11px"
        color={theme.textColor}
        textAlign="left"
        fontWeight="900"
        letterSpacing="2.5px"
        fontFamily={fontStack}
        containerPadding="0px 0px 32px 0px"
      >
        FURTHER READINGS & DIGESTS
      </Heading>
    );

    features.forEach((feature, idx) => {
      if (idx > 0) {
        colChildren.push(
          <Divider key={`divider-${feature.id}`} border={{ borderTopWidth: '1px', borderTopStyle: 'solid', borderTopColor: theme.borderColor }} containerPadding="0px 0px 24px 0px" />
        );
      }
      colChildren.push(
        <Paragraph
          key={`cat-${feature.id}`}
          fontSize="11px"
          color="#71717a"
          textAlign="left"
          letterSpacing="2px"
          fontWeight="800"
          fontFamily={fontStack}
          containerPadding="0px 0px 6px 0px"
        >
          [{feature.number}] {feature.category.toUpperCase()}
        </Paragraph>
      );
      colChildren.push(
        <Heading
          key={`title-${feature.id}`}
          headingType="h3"
          fontSize="20px"
          color={theme.textColor}
          textAlign="left"
          fontWeight="800"
          fontFamily={fontStack}
          containerPadding="0px 0px 10px 0px"
        >
          {feature.title}
        </Heading>
      );
      colChildren.push(
        <Paragraph
          key={`desc-${feature.id}`}
          fontSize="13px"
          color="#52525b"
          textAlign="left"
          lineHeight="1.6"
          fontFamily={fontStack}
          containerPadding="0px 0px 16px 0px"
        >
          {feature.description}
        </Paragraph>
      );
      colChildren.push(
        <Button
          key={`btn-${feature.id}`}
          href={{ name: 'web', attrs: { href: feature.url } }}
          backgroundColor="transparent"
          color={theme.textColor}
          padding="0px"
          fontSize="12px"
          fontWeight="bold"
          fontFamily={fontStack}
          containerPadding="0px 0px 24px 0px"
        >
          READ ARTICLE →
        </Button>
      );
    });

    return (
      <Row padding="45px 20px" backgroundColor={theme.backgroundColor}>
        <Column>
          {colChildren}
        </Column>
      </Row>
    );
  };

  // 7. SPOTLIGHT RENDERER
  const renderSpotlight = () => {
    const { spotlight } = data;
    if (!spotlight.show) return null;

    const isLeft = spotlight.imagePosition === 'left';

    const imageColumn = (
      <Column key="spotlight-image" border={{ borderTopWidth: '1px', borderTopStyle: 'solid', borderTopColor: theme.borderColor, borderBottomWidth: '1px', borderBottomStyle: 'solid', borderBottomColor: theme.borderColor, borderLeftWidth: '1px', borderLeftStyle: 'solid', borderLeftColor: theme.borderColor, borderRightWidth: '1px', borderRightStyle: 'solid', borderRightColor: theme.borderColor }} padding="4px" backgroundColor={theme.backgroundColor} borderRadius={theme.cardRadius || '0px'}>
        <Image
          src={resolveUrl(spotlight.imageUrl)}
          alt={spotlight.title}
          width={260}
          containerPadding="0px"
        />
      </Column>
    );

    const textColumn = (
      <Column key="spotlight-text" padding={isLeft ? "0px 0px 0px 16px" : "0px 16px 0px 0px"}>
        <Heading
          headingType="h3"
          fontSize="22px"
          color={theme.textColor}
          textAlign="left"
          fontWeight="800"
          fontFamily={fontStack}
          containerPadding="0px 0px 10px 0px"
        >
          {spotlight.title}
        </Heading>
        <Paragraph
          fontSize="13px"
          color="#52525b"
          textAlign="left"
          lineHeight="1.6"
          fontFamily={fontStack}
          containerPadding="0px 0px 20px 0px"
        >
          {spotlight.description}
        </Paragraph>
        <Button
          href={{ name: 'web', attrs: { href: spotlight.ctaUrl } }}
          backgroundColor={theme.buttonColor}
          color={theme.buttonTextColor}
          padding="10px 24px"
          borderRadius={theme.buttonRadius || '0px'} fontSize="11px"
          fontWeight="bold"
          letterSpacing="1.5px"
          fontFamily={fontStack}
        >
          {spotlight.ctaText.toUpperCase()}
        </Button>
      </Column>
    );

    return (
      <Row padding="45px 20px" backgroundColor={theme.cardBgColor} layout={ColumnLayouts.TwoEqual}>
        {isLeft ? [imageColumn, textColumn] : [textColumn, imageColumn]}
      </Row>
    );
  };

  // 8. PROMO BAR RENDERER (SHOP)
  const renderPromoHeader = () => {
    const { promo } = data;
    if (!promo.show) return null;
    return (
      <Row padding="14px 20px" backgroundColor={theme.textColor}>
        <Column>
          <Paragraph fontSize="9px" color={theme.backgroundColor} textAlign="center" letterSpacing="2px" fontWeight="900" fontFamily={fontStack}>
            {promo.title.toUpperCase()}: USE CODE {promo.code} FOR 20% OFF ALL ITEMS
          </Paragraph>
        </Column>
      </Row>
    );
  };

  // 9. SHOP HERO FEATURED RENDERER (SHOP)
  const renderShopHero = () => {
    const { shopHero } = data;
    if (!shopHero.show) return null;
    return (
      <>
        {shopHero.imageUrl && (
          <Row padding="45px 20px 10px 20px" backgroundColor={theme.backgroundColor}>
            <Column border={{ borderTopWidth: '1px', borderTopStyle: 'solid', borderTopColor: theme.borderColor, borderBottomWidth: '1px', borderBottomStyle: 'solid', borderBottomColor: theme.borderColor, borderLeftWidth: '1px', borderLeftStyle: 'solid', borderLeftColor: theme.borderColor, borderRightWidth: '1px', borderRightStyle: 'solid', borderRightColor: theme.borderColor }} padding="6px" backgroundColor={theme.cardBgColor} borderRadius={theme.cardRadius || '0px'}>
              <Image
                src={shopHero.imageUrl}
                alt={shopHero.title}
                width={560}
                containerPadding="0px"
              />
            </Column>
          </Row>
        )}
        
        <Row padding="10px 20px" backgroundColor={theme.backgroundColor} layout={ColumnLayouts.TwoEqual} noStackMobile>
          <Column>
            <Paragraph fontSize="10px" color="#71717a" fontWeight="bold" letterSpacing="1.5px" fontFamily={fontStack} containerPadding="0px">
              FEATURED RELEASE
            </Paragraph>
          </Column>
          <Column>
            <Paragraph fontSize="11px" color={theme.textColor} fontWeight="bold" fontFamily={fontStack} containerPadding="0px" textAlign="right">
              <span style={{ border: `1px solid ${theme.textColor}`, padding: '2px 8px', display: 'inline-block' }}>
                {shopHero.price}
              </span>
            </Paragraph>
          </Column>
        </Row>

        <Row padding="10px 20px 45px 20px" backgroundColor={theme.backgroundColor}>
          <Column>
            <Heading headingType="h2" fontSize="26px" color={theme.textColor} textAlign="left" fontWeight="800" fontFamily={fontStack} containerPadding="0px 0px 12px 0px">
              {shopHero.title}
            </Heading>
            <Paragraph fontSize="13px" color="#52525b" lineHeight="1.6" fontFamily={fontStack} containerPadding="0px 0px 24px 0px">
              {shopHero.description}
            </Paragraph>
            <Button
              href={{ name: 'web', attrs: { href: shopHero.ctaUrl } }}
              backgroundColor={theme.buttonColor}
              color={theme.buttonTextColor}
              padding="12px 28px"
              borderRadius={theme.buttonRadius || '0px'} fontSize="11px"
              fontWeight="bold"
              letterSpacing="2px"
              fontFamily={fontStack}
            >
              {shopHero.ctaText.toUpperCase()}
            </Button>
          </Column>
        </Row>
      </>
    );
  };

  // 10. PRODUCTS CATALOG GRID RENDERER (SHOP)
  const renderProducts = () => {
    const { products } = data;
    if (products.length === 0) return null;
    const chunks = chunkArray(products, 2);
    return (
      <>
        <Row padding="40px 20px 10px 20px" backgroundColor={theme.cardBgColor}>
          <Column>
            <Heading
              headingType="h3"
              fontSize="11px"
              color={theme.textColor}
              fontWeight="900"
              letterSpacing="2.5px"
              fontFamily={fontStack}
              containerPadding="0px"
            >
              THE SYSTEM CATALOG
            </Heading>
          </Column>
        </Row>
        {chunks.map((chunk, idx) => (
          <Row
            key={`products-row-${idx}`}
            padding={idx === chunks.length - 1 ? "10px 20px 40px 20px" : "10px 20px 10px 20px"}
            backgroundColor={theme.cardBgColor}
            layout={ColumnLayouts.TwoEqual}
          >
            <Column key={chunk[0].id} padding="12px" border={{ borderTopWidth: '1px', borderTopStyle: 'solid', borderTopColor: theme.borderColor, borderBottomWidth: '1px', borderBottomStyle: 'solid', borderBottomColor: theme.borderColor, borderLeftWidth: '1px', borderLeftStyle: 'solid', borderLeftColor: theme.borderColor, borderRightWidth: '1px', borderRightStyle: 'solid', borderRightColor: theme.borderColor }} backgroundColor={theme.backgroundColor} borderRadius={theme.cardRadius || '0px'}>
              {chunk[0].badge && (
                <Paragraph fontSize="8px" color={theme.textColor} fontWeight="bold" letterSpacing="1px" fontFamily={fontStack} containerPadding="2px 6px">
                  <span style={{ border: `1px solid ${theme.textColor}`, padding: '2px 6px', display: 'inline-block' }}>
                    {chunk[0].badge.toUpperCase()}
                  </span>
                </Paragraph>
              )}
              {chunk[0].imageUrl && (
                <Image
                  src={resolveUrl(chunk[0].imageUrl)}
                  alt={chunk[0].title}
                  width={260}
                  containerPadding="12px 0px"
                />
              )}
              <Heading headingType="h4" fontSize="14px" color={theme.textColor} fontWeight="bold" fontFamily={fontStack} containerPadding="0px 0px 4px 0px">
                {chunk[0].title}
              </Heading>
              <Paragraph fontSize="12px" color="#71717a" fontWeight="bold" fontFamily={fontStack} containerPadding="0px 0px 14px 0px">
                {chunk[0].price}
              </Paragraph>
              <Button
                href={{ name: 'web', attrs: { href: chunk[0].url } }}
                backgroundColor="transparent"
                color={theme.textColor}
                padding="8px 16px"
                borderRadius={theme.buttonRadius || '0px'} fontSize="10px"
                fontWeight="bold"
                letterSpacing="1px"
                fontFamily={fontStack}
                border={{
                  borderTopWidth: '1px', borderTopColor: theme.textColor, borderTopStyle: 'solid',
                  borderBottomWidth: '1px', borderBottomColor: theme.textColor, borderBottomStyle: 'solid',
                  borderLeftWidth: '1px', borderLeftColor: theme.textColor, borderLeftStyle: 'solid',
                  borderRightWidth: '1px', borderRightColor: theme.textColor, borderRightStyle: 'solid'
                }}
              >
                VIEW DETAILS
              </Button>
            </Column>
            {chunk.length === 2 ? (
              <Column key={chunk[1].id} padding="12px" border={{ borderTopWidth: '1px', borderTopStyle: 'solid', borderTopColor: theme.borderColor, borderBottomWidth: '1px', borderBottomStyle: 'solid', borderBottomColor: theme.borderColor, borderLeftWidth: '1px', borderLeftStyle: 'solid', borderLeftColor: theme.borderColor, borderRightWidth: '1px', borderRightStyle: 'solid', borderRightColor: theme.borderColor }} backgroundColor={theme.backgroundColor} borderRadius={theme.cardRadius || '0px'}>
                {chunk[1].badge && (
                  <Paragraph fontSize="8px" color={theme.textColor} fontWeight="bold" letterSpacing="1px" fontFamily={fontStack} containerPadding="2px 6px">
                    <span style={{ border: `1px solid ${theme.textColor}`, padding: '2px 6px', display: 'inline-block' }}>
                      {chunk[1].badge.toUpperCase()}
                    </span>
                  </Paragraph>
                )}
                {chunk[1].imageUrl && (
                  <Image
                    src={resolveUrl(chunk[1].imageUrl)}
                    alt={chunk[1].title}
                    width={260}
                    containerPadding="12px 0px"
                  />
                )}
                <Heading headingType="h4" fontSize="14px" color={theme.textColor} fontWeight="bold" fontFamily={fontStack} containerPadding="0px 0px 4px 0px">
                  {chunk[1].title}
                </Heading>
                <Paragraph fontSize="12px" color="#71717a" fontWeight="bold" fontFamily={fontStack} containerPadding="0px 0px 14px 0px">
                  {chunk[1].price}
                </Paragraph>
                <Button
                  href={{ name: 'web', attrs: { href: chunk[1].url } }}
                  backgroundColor="transparent"
                  color={theme.textColor}
                  padding="8px 16px"
                  borderRadius={theme.buttonRadius || '0px'} fontSize="10px"
                  fontWeight="bold"
                  letterSpacing="1px"
                  fontFamily={fontStack}
                  border={{
                    borderTopWidth: '1px', borderTopColor: theme.textColor, borderTopStyle: 'solid',
                    borderBottomWidth: '1px', borderBottomColor: theme.textColor, borderBottomStyle: 'solid',
                    borderLeftWidth: '1px', borderLeftColor: theme.textColor, borderLeftStyle: 'solid',
                    borderRightWidth: '1px', borderRightColor: theme.textColor, borderRightStyle: 'solid'
                  }}
                >
                  VIEW DETAILS
                </Button>
              </Column>
            ) : (
              <Column key="empty-product-column" />
            )}
          </Row>
        ))}
      </>
    );
  };

  // 11. PROMO BLOCK RENDERER (SHOP)
  const renderPromoBlock = () => {
    const { promo } = data;
    if (!promo.show) return null;
    return (
      <Row padding="45px 20px" backgroundColor={theme.backgroundColor}>
        <Column border={{ borderTopWidth: '1px', borderTopStyle: 'dashed', borderTopColor: theme.textColor, borderBottomWidth: '1px', borderBottomStyle: 'dashed', borderBottomColor: theme.textColor, borderLeftWidth: '1px', borderLeftStyle: 'dashed', borderLeftColor: theme.textColor, borderRightWidth: '1px', borderRightStyle: 'dashed', borderRightColor: theme.textColor }} padding="32px" backgroundColor={theme.cardBgColor} borderRadius={theme.cardRadius || '0px'}>
          <Heading headingType="h3" fontSize="11px" color={theme.textColor} letterSpacing="2.5px" fontWeight="900" fontFamily={fontStack} containerPadding="0px 0px 12px 0px" textAlign="center">
            OFFER DETAILS
          </Heading>
          <Paragraph fontSize="13px" color="#52525b" lineHeight="1.6" fontFamily={fontStack} containerPadding="0px 0px 20px 0px" textAlign="center">
            {promo.description}
          </Paragraph>
          <Paragraph fontSize="18px" color={theme.backgroundColor} fontWeight="bold" fontFamily="monospace" letterSpacing="4px" containerPadding="0px" textAlign="center">
            <span style={{ backgroundColor: theme.textColor, padding: '12px 32px', display: 'inline-block' }}>
              {promo.code}
            </span>
          </Paragraph>
        </Column>
      </Row>
    );
  };

  // 12. EVENT HERO RENDERER (EVENT)
  const renderEventHero = () => {
    const { eventHero } = data;
    if (!eventHero.show) return null;
    return (
      <Row padding="45px 20px" backgroundColor={theme.backgroundColor}>
        <Column>
          {eventHero.imageUrl && (
            <Row border={{ borderTopWidth: '1px', borderTopStyle: 'solid', borderTopColor: theme.borderColor, borderBottomWidth: '1px', borderBottomStyle: 'solid', borderBottomColor: theme.borderColor, borderLeftWidth: '1px', borderLeftStyle: 'solid', borderLeftColor: theme.borderColor, borderRightWidth: '1px', borderRightStyle: 'solid', borderRightColor: theme.borderColor }} padding="6px" backgroundColor={theme.cardBgColor} borderRadius={theme.cardRadius || '0px'}>
              <Column>
                <Image
                  src={resolveUrl(eventHero.imageUrl)}
                  alt={eventHero.title}
                  width={560}
                  containerPadding="0px"
                />
              </Column>
            </Row>
          )}
          <Paragraph fontSize="9px" color="#71717a" fontWeight="bold" letterSpacing="2.5px" fontFamily={fontStack} containerPadding="16px 0px 8px 0px">
            ANNUAL SYMPOSIUM INVITATION
          </Paragraph>
          <Heading headingType="h1" fontSize="32px" color={theme.textColor} fontWeight="900" fontFamily={fontStack} containerPadding="0px 0px 14px 0px">
            {eventHero.title}
          </Heading>
          <Paragraph fontSize="14px" color="#52525b" lineHeight="1.7" fontFamily={fontStack} containerPadding="0px 0px 28px 0px">
            {eventHero.subtitle}
          </Paragraph>
          <Button
            href={{ name: 'web', attrs: { href: eventHero.ctaUrl } }}
            backgroundColor={theme.buttonColor}
            color={theme.buttonTextColor}
            padding="12px 28px"
            borderRadius={theme.buttonRadius || '0px'} fontSize="11px"
            fontWeight="bold"
            letterSpacing="2px"
            fontFamily={fontStack}
          >
            {eventHero.ctaText.toUpperCase()}
          </Button>
        </Column>
      </Row>
    );
  };

  // 13. EVENT DETAILS RENDERER (EVENT)
  const renderEventDetails = () => {
    const { eventDetails } = data;
    if (!eventDetails.show) return null;
    return (
      <Row padding="32px 20px" backgroundColor={theme.cardBgColor} layout={ColumnLayouts.ThreeEqual} noStackMobile>
        <Column border={{ borderRightWidth: '1px', borderRightStyle: 'solid', borderRightColor: theme.borderColor }}>
          <Paragraph fontSize="9px" color="#71717a" fontWeight="bold" letterSpacing="1.5px" fontFamily={fontStack} containerPadding="0px 0px 4px 0px" textAlign="center">DATE</Paragraph>
          <Paragraph fontSize="13px" color={theme.textColor} fontWeight="bold" fontFamily={fontStack} textAlign="center">{eventDetails.date}</Paragraph>
        </Column>
        <Column border={{ borderRightWidth: '1px', borderRightStyle: 'solid', borderRightColor: theme.borderColor }}>
          <Paragraph fontSize="9px" color="#71717a" fontWeight="bold" letterSpacing="1.5px" fontFamily={fontStack} containerPadding="0px 0px 4px 0px" textAlign="center">TIME</Paragraph>
          <Paragraph fontSize="13px" color={theme.textColor} fontWeight="bold" fontFamily={fontStack} textAlign="center">{eventDetails.time}</Paragraph>
        </Column>
        <Column>
          <Paragraph fontSize="9px" color="#71717a" fontWeight="bold" letterSpacing="1.5px" fontFamily={fontStack} containerPadding="0px 0px 4px 0px" textAlign="center">LOCATION</Paragraph>
          <Paragraph fontSize="12px" color={theme.textColor} fontWeight="bold" fontFamily={fontStack} textAlign="center">{eventDetails.location}</Paragraph>
        </Column>
      </Row>
    );
  };

  // 14. SPEAKERS LIST RENDERER (EVENT)
  const renderSpeakers = () => {
    const { speakers } = data;
    if (speakers.length === 0) return null;
    const chunks = chunkArray(speakers, 2);
    return (
      <>
        <Row padding="40px 20px 10px 20px" backgroundColor={theme.backgroundColor}>
          <Column>
            <Heading
              headingType="h3"
              fontSize="11px"
              color={theme.textColor}
              fontWeight="900"
              letterSpacing="2.5px"
              fontFamily={fontStack}
              containerPadding="0px"
            >
              DISTINGUISHED SPEAKERS
            </Heading>
          </Column>
        </Row>
        {chunks.map((chunk, idx) => (
          <Row
            key={`speakers-row-${idx}`}
            padding={idx === chunks.length - 1 ? "10px 20px 40px 20px" : "10px 20px 10px 20px"}
            backgroundColor={theme.backgroundColor}
            layout={ColumnLayouts.TwoEqual}
          >
            <Column key={chunk[0].id} padding="16px" border={{ borderTopWidth: '1px', borderTopStyle: 'solid', borderTopColor: theme.borderColor, borderBottomWidth: '1px', borderBottomStyle: 'solid', borderBottomColor: theme.borderColor, borderLeftWidth: '1px', borderLeftStyle: 'solid', borderLeftColor: theme.borderColor, borderRightWidth: '1px', borderRightStyle: 'solid', borderRightColor: theme.borderColor }} backgroundColor={theme.cardBgColor} borderRadius={theme.cardRadius || '0px'}>
              {chunk[0].imageUrl && (
                <Image
                  src={resolveUrl(chunk[0].imageUrl)}
                  alt={chunk[0].name}
                  width={100}
                  containerPadding="0px 0px 14px 0px"
                />
              )}
              <Heading headingType="h4" fontSize="15px" color={theme.textColor} fontWeight="bold" fontFamily={fontStack} containerPadding="0px 0px 4px 0px" textAlign="center">
                {chunk[0].name}
              </Heading>
              <Paragraph fontSize="11px" color="#71717a" fontFamily={fontStack} containerPadding="0px" textAlign="center">
                {chunk[0].role}
              </Paragraph>
            </Column>
            {chunk.length === 2 ? (
              <Column key={chunk[1].id} padding="16px" border={{ borderTopWidth: '1px', borderTopStyle: 'solid', borderTopColor: theme.borderColor, borderBottomWidth: '1px', borderBottomStyle: 'solid', borderBottomColor: theme.borderColor, borderLeftWidth: '1px', borderLeftStyle: 'solid', borderLeftColor: theme.borderColor, borderRightWidth: '1px', borderRightStyle: 'solid', borderRightColor: theme.borderColor }} backgroundColor={theme.cardBgColor} borderRadius={theme.cardRadius || '0px'}>
                {chunk[1].imageUrl && (
                  <Image
                    src={resolveUrl(chunk[1].imageUrl)}
                    alt={chunk[1].name}
                    width={100}
                    containerPadding="0px 0px 14px 0px"
                  />
                )}
                <Heading headingType="h4" fontSize="15px" color={theme.textColor} fontWeight="bold" fontFamily={fontStack} containerPadding="0px 0px 4px 0px" textAlign="center">
                  {chunk[1].name}
                </Heading>
                <Paragraph fontSize="11px" color="#71717a" fontFamily={fontStack} containerPadding="0px" textAlign="center">
                  {chunk[1].role}
                </Paragraph>
              </Column>
            ) : (
              <Column key="empty-speaker-column" />
            )}
          </Row>
        ))}
      </>
    );
  };

  // 15. FEEDBACK SURVEY RENDERER
  const renderFeedback = () => {
    if (!feedback.show) return null;
    return (
      <>
        <Row padding="40px 20px 10px 20px" backgroundColor={theme.backgroundColor}>
          <Column>
            <Heading
              headingType="h3"
              fontSize="12px"
              color={theme.textColor}
              textAlign="center"
              fontWeight="800"
              letterSpacing="2px"
              fontFamily={fontStack}
              containerPadding="0px"
            >
              {feedback.title.toUpperCase()}
            </Heading>
          </Column>
        </Row>
        <Row padding="10px 20px 40px 20px" backgroundColor={theme.backgroundColor} layout={ColumnLayouts.TwoEqual} noStackMobile>
          <Column padding="0px 10px 0px 0px">
            <Button
              href={{ name: 'web', attrs: { href: 'https://github.com/unlayer/elements' } }}
              backgroundColor={theme.textColor}
              color={theme.backgroundColor}
              padding="10px 28px"
              borderRadius={theme.buttonRadius || '0px'} fontSize="11px"
              fontWeight="bold"
              letterSpacing="1.5px"
              fontFamily={fontStack}
            >
              YES, IT WAS
            </Button>
          </Column>
          <Column padding="0px 0px 0px 10px">
            <Button
              href={{ name: 'web', attrs: { href: 'https://github.com/unlayer/elements' } }}
              backgroundColor="transparent"
              color={theme.textColor}
              padding="10px 28px"
              borderRadius={theme.buttonRadius || '0px'} fontSize="11px"
              fontWeight="bold"
              letterSpacing="1.5px"
              fontFamily={fontStack}
              border={{
                borderTopWidth: '1px', borderTopColor: theme.textColor, borderTopStyle: 'solid',
                borderBottomWidth: '1px', borderBottomColor: theme.textColor, borderBottomStyle: 'solid',
                borderLeftWidth: '1px', borderLeftColor: theme.textColor, borderLeftStyle: 'solid',
                borderRightWidth: '1px', borderRightColor: theme.textColor, borderRightStyle: 'solid'
              }}
            >
              NOT REALLY
            </Button>
          </Column>
        </Row>
      </>
    );
  };

  // 16. PUBLICATION FOOTER RENDERER
  const renderFooter = () => (
    <Row padding="50px 20px" backgroundColor={theme.cardBgColor}>
      <Column>
        <Paragraph
          fontSize="9px"
          color="#71717a"
          textAlign="center"
          containerPadding="0px 0px 6px 0px"
          letterSpacing="1.5px"
          fontWeight="bold"
          fontFamily={fontStack}
        >
          © {new Date().getFullYear()} {footer.companyName.toUpperCase()}
        </Paragraph>
        <Paragraph
          fontSize="10px"
          color="#71717a"
          textAlign="center"
          fontFamily={fontStack}
          containerPadding="0px 0px 28px 0px"
        >
          {footer.address}
        </Paragraph>
        
        <Paragraph fontSize="10px" color={theme.textColor} textAlign="center" letterSpacing="2px" fontWeight="bold" fontFamily={fontStack} containerPadding="0px 0px 28px 0px">
          <a href={footer.twitterUrl} style={{ color: theme.textColor, textDecoration: 'none', margin: '0 14px' }}>TWITTER</a>
          <a href={footer.githubUrl} style={{ color: theme.textColor, textDecoration: 'none', margin: '0 14px' }}>GITHUB</a>
          <a href={footer.linkedinUrl} style={{ color: theme.textColor, textDecoration: 'none', margin: '0 14px' }}>LINKEDIN</a>
        </Paragraph>

        <Paragraph fontSize="10px" color="#a1a1aa" textAlign="center" fontFamily={fontStack} lineHeight="1.6">
          You received this letter because you subscribed to {header.title}.<br />
          <a href={footer.unsubscribeUrl} style={{ color: theme.textColor, textDecoration: 'underline', fontWeight: 'bold' }}>Unsubscribe</a> to manage preferences.
        </Paragraph>
      </Column>
    </Row>
  );

  const sectionMap: Record<string, () => React.ReactNode> = {
    header: renderHeader,
    toc: renderToc,
    intro: renderIntro,
    hero: renderHero,
    quote: renderQuote,
    features: renderFeatures,
    spotlight: renderSpotlight,
    promoHeader: renderPromoHeader,
    shopHero: renderShopHero,
    products: renderProducts,
    promoBlock: renderPromoBlock,
    eventHero: renderEventHero,
    eventDetails: renderEventDetails,
    speakers: renderSpeakers,
    feedback: renderFeedback,
    footer: renderFooter
  };

  const rows: React.ReactElement[] = [];
  layoutOrder.forEach((sectionKey, index) => {
    const renderer = sectionMap[sectionKey];
    if (!renderer) return;
    const rendered = renderer();
    if (!rendered) return;

    if (index > 0) {
      const dividerStyle = theme.dividerStyle || 'solid';
      if (dividerStyle === 'ornate') {
        rows.push(
          <Row key={`divider-${sectionKey}`} padding="16px 20px" backgroundColor={theme.backgroundColor} layout={ColumnLayouts.ThreeEqual} noStackMobile>
            <Column padding="6px 0px">
              <Divider border={{ borderTopWidth: '1px', borderTopStyle: 'solid', borderTopColor: theme.borderColor }} containerPadding="0px" />
            </Column>
            <Column>
              <Paragraph fontSize="12px" color={theme.primaryColor} textAlign="center" fontWeight="bold" fontFamily={serifFontStack} containerPadding="0px">
                ✦
              </Paragraph>
            </Column>
            <Column padding="6px 0px">
              <Divider border={{ borderTopWidth: '1px', borderTopStyle: 'solid', borderTopColor: theme.borderColor }} containerPadding="0px" />
            </Column>
          </Row>
        );
      } else if (dividerStyle === 'dashed') {
        rows.push(
          <Row key={`divider-${sectionKey}`} padding="0px" backgroundColor={theme.backgroundColor}>
            <Column>
              <Divider border={{ borderTopWidth: '1px', borderTopStyle: 'dashed', borderTopColor: theme.borderColor }} containerPadding="0px" />
            </Column>
          </Row>
        );
      } else if (dividerStyle === 'double') {
        rows.push(
          <Row key={`divider-${sectionKey}`} padding="0px" backgroundColor={theme.backgroundColor}>
            <Column>
              <Divider border={{ borderTopWidth: '3px', borderTopStyle: 'double', borderTopColor: theme.borderColor }} containerPadding="0px" />
            </Column>
          </Row>
        );
      } else {
        rows.push(
          <Row key={`divider-${sectionKey}`} padding="0px" backgroundColor={theme.backgroundColor}>
            <Column>
              <Divider border={{ borderTopWidth: '1px', borderTopStyle: 'solid', borderTopColor: theme.borderColor }} containerPadding="0px" />
            </Column>
          </Row>
        );
      }
    }

    if (React.isValidElement(rendered)) {
      if (rendered.type === React.Fragment) {
        const children = React.Children.toArray((rendered as React.ReactElement<any>).props.children);
        children.forEach((child, childIdx) => {
          if (React.isValidElement(child)) {
            rows.push(React.cloneElement(child, { key: `${sectionKey}-${childIdx}` }));
          }
        });
      } else {
        rows.push(React.cloneElement(rendered as React.ReactElement, { key: sectionKey }));
      }
    }
  });

  const content = theme.borderFrame ? [
    <Row key="frame-wrapper" border={{ borderTopWidth: '1px', borderTopStyle: 'solid', borderTopColor: theme.borderColor, borderBottomWidth: '1px', borderBottomStyle: 'solid', borderBottomColor: theme.borderColor, borderLeftWidth: '1px', borderLeftStyle: 'solid', borderLeftColor: theme.borderColor, borderRightWidth: '1px', borderRightStyle: 'solid', borderRightColor: theme.borderColor }}>
      <Column>
        {rows}
      </Column>
    </Row>
  ] : rows;

  if (mode === 'page') {
    return <Page backgroundColor={theme.backgroundColor}>{content}</Page>;
  }

  if (mode === 'document') {
    return <Document>{content}</Document>;
  }

  return (
    <Email backgroundColor={theme.backgroundColor} contentWidth="600px">
      {content}
    </Email>
  );
};
