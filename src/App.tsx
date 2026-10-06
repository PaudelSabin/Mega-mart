// MegaMart homepage.
// Every component lives in this one file so the whole page is easy to follow
// from top to bottom: images -> icons -> small pieces -> page sections -> App.
// All measurements live in style.css and are copied from the Figma "Landing
// Page" frame (1440px wide). Images are placed in exact boxes (see ImageBox).
//
// Components in this file (each has its own comment block):
//   ImageBox, BoxImage, Icons, SearchBar, TopBar, Header, Navigation, CarouselDots, HeroBanner,
//   SectionHeader, ProductSection, ProductCard, CategoryCard, BrandBanner,
//   EssentialCard, Footer, App

import { useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';

// ---------------------------------------------------------------------------
// Images (all stored in src/assets/images)
// ---------------------------------------------------------------------------
import heroWatch from './assets/images/hero-watch.webp';
import phoneS22Blue from './assets/images/galaxy-s22-ultra.webp';
import phoneM13 from './assets/images/galaxy-m13.webp';
import phoneM33 from './assets/images/galaxy-m33.webp';
import phoneM53 from './assets/images/galaxy-m53.webp';
import phoneS22Green from './assets/images/galaxy-s22-ultra-green.webp';
import catMobile from './assets/images/cat-mobile.webp';
import catCosmetics from './assets/images/cat-cosmetics.webp';
import catElectronics from './assets/images/cat-electronics.webp';
import catFurniture from './assets/images/cat-furniture.webp';
import catWatches from './assets/images/cat-watches.webp';
import catDecor from './assets/images/cat-decor.webp';
import catAccessories from './assets/images/cat-accessories.webp';
import brandIphone from './assets/images/brand-iphone.webp';
import brandRealme from './assets/images/brand-realme.webp';
import brandXiaomi from './assets/images/brand-xiaomi.webp';
import essEssential from './assets/images/ess-essential.webp';
import essVegetables from './assets/images/ess-vegetables.webp';
import essFruits from './assets/images/ess-fruits.webp';
import essStrawberry from './assets/images/ess-strawberry.webp';
import essMango from './assets/images/ess-mango.webp';
import essCherry from './assets/images/ess-cherry.webp';
import storeApple from './assets/images/store-apple.png';
import storeGoogle from './assets/images/store-google.png';

// ===========================================================================
// ImageBox
// Exact position and size of an image inside its card, in pixels measured from
// the card's top-left corner (copied from the Figma file).
// Some Figma images are a zoomed crop of a bigger photo; for those the
// optional `crop` holds Figma's exact width / height / left / top (in % of the box).
// ===========================================================================
interface ImageCrop {
  width: string;
  height: string;
  left: string;
  top: string;
}

interface ImageBox {
  x: number;
  y: number;
  width: number;
  height: number;
  radius?: number; // optional round corners (px)
  crop?: ImageCrop; // optional zoomed crop (otherwise the photo covers the box)
}

// ===========================================================================
// BoxImage
// Draws a photo inside its exact Figma box.
//  - no crop: the whole photo covers the box (Figma "object-cover"), so a photo
//    with transparent margins keeps those margins, just like in Figma
//  - with crop: the photo is scaled/moved by Figma's percentages and clipped
//    to the box
// `className` is put on the outer element (the box itself).
// ===========================================================================
interface BoxImageProps {
  src: string;
  alt: string;
  box: ImageBox;
  className?: string;
}

function BoxImage({ src, alt, box, className = '' }: BoxImageProps) {
  const position: CSSProperties = {
    left: box.x,
    top: box.y,
    width: box.width,
    height: box.height,
    borderRadius: box.radius,
  };

  if (!box.crop) {
    return <img className={`box-image ${className}`} src={src} alt={alt} style={position} />;
  }

  return (
    <span className={`box-image box-image--crop ${className}`} style={position}>
      <img src={src} alt={alt} style={box.crop} />
    </span>
  );
}

// ===========================================================================
// ICONS
// Small inline SVG icons. They use "currentColor" so they take the text color
// of whatever element they are placed in. The `size` prop sets width/height.
// ===========================================================================
interface IconProps {
  size?: number;
  className?: string;
}

// Shared SVG attributes for every outline icon.
const outline = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

// Magnifying glass (search bar, 18 x 18).
const SearchIcon = ({ size = 18, className }: IconProps) => (
  <svg {...outline} width={size} height={size} className={className}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </svg>
);

// Dots + lines "list" icon on the right of the search bar (24 x 24).
const ListIcon = ({ size = 24, className }: IconProps) => (
  <svg {...outline} width={size} height={size} className={className}>
    <path d="M9 6h11M9 12h11M9 18h11" />
    <circle cx="4.5" cy="6" r="1" />
    <circle cx="4.5" cy="12" r="1" />
    <circle cx="4.5" cy="18" r="1" />
  </svg>
);

// Person (Sign Up / Sign In, 24 x 24).
const UserIcon = ({ size = 24 }: IconProps) => (
  <svg {...outline} width={size} height={size}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
  </svg>
);

// Shopping bag (Cart, 24 x 24).
const CartIcon = ({ size = 24 }: IconProps) => (
  <svg {...outline} width={size} height={size}>
    <path d="M5 8h14l-1 12H6z" />
    <path d="M9 8V6a3 3 0 0 1 6 0v2" />
  </svg>
);

// Menu button glyph next to the logo (26 x 18 in Figma).
const MenuIcon = () => (
  <svg {...outline} width={26} height={18} viewBox="0 0 26 18" strokeWidth={2.2}>
    <path d="M1.5 1.5h23M1.5 9h14M1.5 16.5h23" />
  </svg>
);

// Down arrow inside the category pills (18 x 18).
const ChevronDownIcon = ({ size = 18 }: IconProps) => (
  <svg {...outline} width={size} height={size} strokeWidth={2}>
    <path d="m7 10 5 5 5-5" />
  </svg>
);

// Right arrow after "View All" (18 x 18).
const ChevronRightIcon = ({ size = 18 }: IconProps) => (
  <svg {...outline} width={size} height={size} strokeWidth={2}>
    <path d="m10 7 5 5-5 5" />
  </svg>
);

// Left/right arrow for the hero carousel buttons (24 x 24).
const ArrowIcon = ({ direction }: { direction: 'left' | 'right' }) => (
  <svg {...outline} width={24} height={24} strokeWidth={2.2}>
    <path d={direction === 'left' ? 'm14 6-6 6 6 6' : 'm10 6 6 6-6 6'} />
  </svg>
);

// Map pin (Deliver to, 18 x 18).
const LocationIcon = ({ size = 18, className }: IconProps) => (
  <svg {...outline} width={size} height={size} className={className}>
    <path d="M12 21s-6-5.5-6-11a6 6 0 0 1 12 0c0 5.5-6 11-6 11z" />
    <circle cx="12" cy="10" r="2.2" />
  </svg>
);

// Delivery truck (Track your order, 18 x 18).
const TruckIcon = ({ size = 18, className }: IconProps) => (
  <svg {...outline} width={size} height={size} className={className}>
    <path d="M2 6h11v10H2zM13 10h4l3 3v3h-7" />
    <circle cx="7" cy="17.5" r="1.8" />
    <circle cx="17" cy="17.5" r="1.8" />
  </svg>
);

// Percent tag (All Offers, 18 x 18).
const DiscountIcon = ({ size = 18, className }: IconProps) => (
  <svg {...outline} width={size} height={size} className={className}>
    <path d="M4 4h8l8 8-8 8-8-8z" />
    <circle cx="9" cy="9" r="1" />
  </svg>
);

// WhatsApp speech bubble (footer, 24 x 24).
const WhatsAppIcon = ({ size = 24 }: IconProps) => (
  <svg {...outline} width={size} height={size}>
    <path d="M4 20l1.2-4A8 8 0 1 1 8 19z" />
    <path d="M9 9c0 3 3 6 6 6l1-1.5-2-1-1 .8c-1-.5-1.8-1.3-2.3-2.3l.8-1-1-2z" />
  </svg>
);

// Phone handset (footer, 24 x 24).
const CallIcon = ({ size = 24 }: IconProps) => (
  <svg {...outline} width={size} height={size}>
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
  </svg>
);

// Apple logo used inside the Apple brand banner (filled shape, 37.2 x 46.5).
const AppleLogo = () => (
  <svg width="37.2" height="46.5" viewBox="0 0 24 30" fill="currentColor">
    <path d="M19.7 15.9c0-3 2.5-4.4 2.6-4.5-1.4-2.1-3.6-2.4-4.4-2.4-1.9-.2-3.7 1.1-4.6 1.1-1 0-2.4-1.1-4-1.1-2 0-3.9 1.2-5 3-2.1 3.7-.5 9.2 1.5 12.2 1 1.5 2.2 3.1 3.8 3 1.5-.1 2.1-1 3.9-1s2.3 1 3.9.9c1.6 0 2.7-1.5 3.7-3 1.2-1.7 1.6-3.3 1.7-3.4-.1 0-3.1-1.2-3.1-4.8zM16.7 6.9c.8-1 1.4-2.4 1.2-3.8-1.2.1-2.6.8-3.5 1.8-.8.9-1.4 2.3-1.2 3.7 1.3.1 2.7-.7 3.5-1.7z" />
  </svg>
);

// ===========================================================================
// SearchBar
// 507 x 48 light-blue bar: search icon, placeholder text and a list icon.
// Controlled text input: React state ("query") always holds what is typed.
// ===========================================================================
function SearchBar() {
  const [query, setQuery] = useState('');

  return (
    <label className="search-bar">
      <SearchIcon className="icon icon--search" />
      <input
        type="text"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search essentials, groceries and more..."
      />
      <ListIcon className="icon icon--list" />
    </label>
  );
}

// ===========================================================================
// TopBar
// Thin grey strip (42px) above the header: welcome text on the left and the
// delivery / tracking / offers links on the right, each at an exact x position.
// ===========================================================================
function TopBar() {
  return (
    <div className="topbar">
      <div className="container topbar__inner">
        <span className="topbar__welcome">Welcome to worldwide Megamart!</span>
        <span className="topbar__link topbar__link--deliver">
          <LocationIcon className="icon" />
          <span>
            Deliver to <strong>423651</strong>
          </span>
        </span>
        <span className="topbar__divider topbar__divider--first" />
        <span className="topbar__link topbar__link--track">
          <TruckIcon className="icon" />
          <span>Track your order</span>
        </span>
        <span className="topbar__divider topbar__divider--second" />
        <span className="topbar__link topbar__link--offers">
          <DiscountIcon className="icon" />
          <span>All Offers</span>
        </span>
      </div>
    </div>
  );
}

// ===========================================================================
// Header
// Main white bar: menu button + logo on the left, the search bar in the
// middle, then Sign In and Cart. Every part has an exact x/y in style.css.
// ===========================================================================
function Header() {
  return (
    <header>
      <TopBar />
      <div className="header__main">
        <div className="container header__inner">
          <span className="logo__menu">
            <MenuIcon />
          </span>
          <span className="logo__text">MegaMart</span>
          <SearchBar />
          <div className="header__actions">
            <button type="button" className="header__action header__action--user">
              <UserIcon />
              <span>Sign Up/Sign In</span>
            </button>
            <span className="header__divider" />
            <button type="button" className="header__action header__action--cart">
              <CartIcon />
              <span>Cart</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

// ===========================================================================
// Navigation (category pills)
// Each pill has an exact width taken from Figma; the active one is remembered.
// ===========================================================================
interface NavItem {
  label: string;
  width: number; // exact pill width in px
}

interface NavigationProps {
  items: NavItem[];
}

function Navigation({ items }: NavigationProps) {
  const [active, setActive] = useState(0);

  return (
    <nav className="category-nav">
      <ul className="container category-nav__list">
        {items.map((item, index) => (
          <li key={item.label}>
            <button
              type="button"
              className={index === active ? 'pill pill--active' : 'pill'}
              style={{ width: item.width }}
              onClick={() => setActive(index)}
            >
              <span>{item.label}</span>
              <ChevronDownIcon />
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

// ===========================================================================
// CarouselDots
// Row of small dots showing which slide is active (114 x 8). Used by the hero
// banner (clickable) and under the brand banners (display only).
// ===========================================================================
interface CarouselDotsProps {
  count: number;
  active: number;
  onSelect?: (index: number) => void;
}

function CarouselDots({ count, active, onSelect }: CarouselDotsProps) {
  return (
    <div className="dots">
      {Array.from({ length: count }, (_, index) => (
        <button
          key={index}
          type="button"
          aria-label={`Slide ${index + 1}`}
          className={index === active ? 'dots__dot dots__dot--active' : 'dots__dot'}
          onClick={() => onSelect?.(index)}
        />
      ))}
    </div>
  );
}

// ===========================================================================
// HeroBanner
// Big navy banner (1201 x 316) with text on the left, product image on the
// right, round prev/next buttons and carousel dots.
// ===========================================================================
interface HeroBannerProps {
  eyebrow: string; // small line above the title
  title: string; // large headline
  offer: string; // offer text under the headline
  image: string; // product image
}

const HERO_SLIDE_COUNT = 8;

function HeroBanner({ eyebrow, title, offer, image }: HeroBannerProps) {
  const [slide, setSlide] = useState(0);

  // Move forward (+1) or backward (-1) and wrap around at the ends.
  const go = (step: number) =>
    setSlide((slide + step + HERO_SLIDE_COUNT) % HERO_SLIDE_COUNT);

  return (
    <section className="container hero-wrap">
      <div className="hero">
        {/* Decorative circles on the right side */}
        <div className="hero__decor">
          <span className="hero__circle hero__circle--1" />
          <span className="hero__circle hero__circle--2" />
          <span className="hero__circle hero__circle--3" />
          <span className="hero__circle hero__circle--4" />
        </div>
        <p className="hero__eyebrow">{eyebrow}</p>
        <h1 className="hero__title">{title}</h1>
        <p className="hero__offer">{offer}</p>
        <img className="hero__image" src={image} alt="Smart watch" />
        <CarouselDots count={HERO_SLIDE_COUNT} active={slide} onSelect={setSlide} />
      </div>

      <button type="button" className="hero__arrow hero__arrow--left" aria-label="Previous" onClick={() => go(-1)}>
        <ArrowIcon direction="left" />
      </button>
      <button type="button" className="hero__arrow hero__arrow--right" aria-label="Next" onClick={() => go(1)}>
        <ArrowIcon direction="right" />
      </button>
    </section>
  );
}

// ===========================================================================
// SectionHeader
// Section title (with a highlighted part), blue underline and "View All >".
// The title block and underline widths are exact Figma values.
// ===========================================================================
interface SectionHeaderProps {
  prefix: string; // normal text, e.g. "Grab the best deal on"
  highlight: string; // blue text, e.g. "Smartphones"
  titleWidth: number; // exact width of the title block (px)
  underlineWidth: number; // exact width of the blue underline (px)
}

function SectionHeader({ prefix, highlight, titleWidth, underlineWidth }: SectionHeaderProps) {
  const titleStyle = { width: titleWidth, '--underline': `${underlineWidth}px` } as CSSProperties;

  return (
    <div className="section-header">
      <h2 className="section-header__title" style={titleStyle}>
        {prefix} <span>{highlight}</span>
      </h2>
      <a href="#" className="section-header__link">
        <span>View All</span>
        <ChevronRightIcon />
      </a>
    </div>
  );
}

// ===========================================================================
// ProductSection
// Reusable wrapper: a SectionHeader plus a row of cards (children).
// "layout" picks the column sizes of the row.
// "footer" is optional extra content shown under the row (e.g. dots).
// ===========================================================================
interface ProductSectionProps extends SectionHeaderProps {
  layout: 'three' | 'five' | 'six' | 'seven';
  children: ReactNode;
  footer?: ReactNode;
}

function ProductSection({ layout, children, footer, ...header }: ProductSectionProps) {
  return (
    <section className="container section">
      <SectionHeader {...header} />
      <div className={`row row--${layout}`}>{children}</div>
      {footer}
    </section>
  );
}

// ===========================================================================
// ProductCard
// One smartphone card (227 x 295): phone image, blue discount tab, and a white
// info panel with name, price, crossed-out price, divider and savings.
// Every child is placed with exact pixel offsets (see .product-card in CSS).
// ===========================================================================
interface ProductCardProps {
  name: string; // e.g. "Galaxy M13 (4GB | 64 GB )"
  image: string;
  imageBox: ImageBox; // exact image position/size inside the card
  price: string;
  oldPrice: string; // crossed-out price
  discount: string; // blue tab, e.g. "56% OFF"
  savings: string; // green "Save - ₹..." line
  highlighted?: boolean; // draws the blue border (like the hovered card)
}

function ProductCard({ name, image, imageBox, price, oldPrice, discount, savings, highlighted }: ProductCardProps) {
  // Figma text-box widths: long names are 191px, short ones 120px;
  // 4-digit savings are 92px, 5-digit ones 102px.
  const nameWidth = name.length > 16 ? 191 : 120;
  const savingsWidth = savings.length > 12 ? 102 : 92;

  return (
    <article className={highlighted ? 'product-card product-card--highlighted' : 'product-card'}>
      <BoxImage className="product-card__image" src={image} alt={name} box={imageBox} />
      <span className="product-card__badge">{discount}</span>
      <div className="product-card__info">
        <h3 className="product-card__name" style={{ width: nameWidth }}>{name}</h3>
        <strong className="product-card__price">{price}</strong>
        <s className="product-card__old-price">{oldPrice}</s>
        <div className="product-card__divider" />
        <p className="product-card__savings" style={{ width: savingsWidth }}>{savings}</p>
      </div>
    </article>
  );
}

// ===========================================================================
// CategoryCard
// 132px round holder with an image at an exact position, and the name below.
// ===========================================================================
interface CategoryCardProps {
  name: string;
  image: string;
  imageBox: ImageBox; // exact image position/size inside the circle
  selected?: boolean; // blue ring around the circle
}

function CategoryCard({ name, image, imageBox, selected }: CategoryCardProps) {
  return (
    <article className={selected ? 'category-card category-card--selected' : 'category-card'}>
      <div className="category-card__circle">
        <BoxImage src={image} alt={name} box={imageBox} />
      </div>
      <h3 className="category-card__name">{name}</h3>
    </article>
  );
}

// ===========================================================================
// BrandBanner
// Coloured promo card (389 x 207) for an electronics brand. Colours arrive as
// props and reach the CSS through custom properties (--banner-bg etc.).
// The chip sits at (20,20), the logo at (20,75), the offer text at (20,promoTop)
// and the phone image at its own exact box.
// ===========================================================================
interface BrandBannerProps {
  chip: string; // small label, e.g. "IPHONE"
  chipWidth: number; // exact chip width in px
  logo: ReactNode; // brand logo shown under the chip
  image: string; // phone image on the right
  imageBox: ImageBox; // exact phone position/size inside the card
  promotion: string; // offer text
  promoTop: number; // exact y of the offer text inside the card
  backgroundColor: string;
  textColor: string;
  chipColor: string; // chip background (also tints the big circle)
  chipTextColor: string;
}

function BrandBanner({
  chip,
  chipWidth,
  logo,
  image,
  imageBox,
  promotion,
  promoTop,
  backgroundColor,
  textColor,
  chipColor,
  chipTextColor,
}: BrandBannerProps) {
  const colors = {
    '--banner-bg': backgroundColor,
    '--banner-text': textColor,
    '--banner-chip': chipColor,
    '--banner-chip-text': chipTextColor,
  } as CSSProperties;

  return (
    <article className="brand-banner" style={colors}>
      {/* Big circle behind the phone, clipped to a 215 x 189 window like Figma's mask */}
      <div className="brand-banner__window">
        <div className="brand-banner__circle" />
      </div>
      <span className="brand-banner__chip" style={{ width: chipWidth }}>{chip}</span>
      {logo}
      <p className="brand-banner__promo" style={{ top: promoTop }}>{promotion}</p>
      <BoxImage className="brand-banner__image" src={image} alt={chip} box={imageBox} />
    </article>
  );
}

// ===========================================================================
// EssentialCard
// 187px grey tile with an image at an exact position, then name and discount.
// ===========================================================================
interface EssentialCardProps {
  name: string;
  image: string;
  imageBox: ImageBox; // exact image position/size inside the tile
  discount: string;
  selected?: boolean; // draws the blue border on the tile
}

function EssentialCard({ name, image, imageBox, discount, selected }: EssentialCardProps) {
  return (
    <article className={selected ? 'essential-card essential-card--selected' : 'essential-card'}>
      <div className="essential-card__tile">
        <BoxImage src={image} alt={name} box={imageBox} />
      </div>
      <h3 className="essential-card__name">{name}</h3>
      <p className="essential-card__discount">{discount}</p>
    </article>
  );
}

// ===========================================================================
// Footer
// Blue footer (592px): decorative circles, contact info, two link columns,
// app-store buttons and the copyright line. Each block is placed at an exact
// (x, y) from Figma (see section 8 of style.css).
// ===========================================================================
function Footer() {
  return (
    <footer className="footer">
      {/* Decorative circles in the top-right corner */}
      <div className="footer__decor">
        <span className="footer__circle footer__circle--1" />
        <span className="footer__circle footer__circle--2" />
      </div>

      <div className="container footer__inner">
        {/* Column 1: brand, contact details, app download buttons */}
        <h3 className="footer__brand">MegaMart</h3>
        <h4 className="footer__title footer__contact-title">Contact Us</h4>
        <div className="footer__contact footer__contact--whatsapp">
          <WhatsAppIcon />
          <span>Whats App</span>
          <b>+1 202-918-2132</b>
        </div>
        <div className="footer__contact footer__contact--call">
          <CallIcon />
          <span>Call Us</span>
          <b>+1 202-918-2132</b>
        </div>
        <h4 className="footer__title footer__download-title">Download App</h4>
        <a href="#" className="footer__store footer__store--apple">
          <img src={storeApple} alt="Download on the App Store" />
        </a>
        <a href="#" className="footer__store footer__store--google">
          <img src={storeGoogle} alt="Get it on Google Play" />
        </a>

        {/* Column 2: popular categories */}
        <div className="footer__col footer__col--categories">
          <h4 className="footer__heading" style={{ width: 219 }}>Most Popular Categories</h4>
          <ul className="footer__list">
            <li>Staples</li>
            <li>Beverages</li>
            <li>Personal Care</li>
            <li>Home Care</li>
            <li>Baby Care</li>
            <li>Vegetables &amp; Fruits</li>
            <li>Snacks &amp; Foods</li>
            <li>Dairy &amp; Bakery</li>
          </ul>
        </div>

        {/* Column 3: customer services */}
        <div className="footer__col footer__col--services">
          <h4 className="footer__heading" style={{ width: 167 }}>Customer Services</h4>
          <ul className="footer__list">
            <li>About Us</li>
            <li>Terms &amp; Conditions</li>
            <li>FAQ</li>
            <li>Privacy Policy</li>
            <li>E-waste Policy</li>
            <li>Cancellation &amp; Return Policy</li>
          </ul>
        </div>

        <p className="footer__line" />
        <p className="footer__copy">© 2022 All rights reserved. Reliance Retail Ltd.</p>
      </div>
    </footer>
  );
}

// ===========================================================================
// App (the homepage)
// Puts every section together in order. All content is passed as props.
// ===========================================================================
function App() {
  return (
    <>
      <Header />

      <Navigation
        items={[
          { label: 'Groceries', width: 113 },
          { label: 'Premium Fruits', width: 148 },
          { label: 'Home & Kitchen', width: 153 },
          { label: 'Fashion', width: 101 },
          { label: 'Electronics', width: 121 },
          { label: 'Beauty', width: 96 },
          { label: 'Home Improvement', width: 176 },
          { label: 'Sports, Toys & Luggage', width: 195 },
        ]}
      />

      <main>
        {/* Hero banner */}
        <HeroBanner
          eyebrow="Best Deal Online on smart watches"
          title="SMART WEARABLE."
          offer="UP to 80% OFF"
          image={heroWatch}
        />

        {/* Smartphones: 5 product cards (image boxes are exact Figma values) */}
        <ProductSection prefix="Grab the best deal on" highlight="Smartphones" titleWidth={378} underlineWidth={378} layout="five">
          <ProductCard name="Galaxy S22 Ultra" image={phoneS22Blue} imageBox={{ x: 71, y: 15, width: 84, height: 158, crop: { width: '278.38%', height: '117.61%', left: '-89.19%', top: '-8.81%' } }} price="₹32999" oldPrice="₹74999" discount="56% OFF" savings="Save - ₹32999" />
          <ProductCard name="Galaxy M13 (4GB | 64 GB )" image={phoneM13} imageBox={{ x: 50, y: 7, width: 126, height: 174 }} price="₹10499" oldPrice="₹14999" discount="56% OFF" savings="Save - ₹4500" highlighted />
          <ProductCard name="Galaxy M33 (4GB | 64 GB )" image={phoneM33} imageBox={{ x: 42, y: 0, width: 142, height: 188 }} price="₹16999" oldPrice="₹24999" discount="56% OFF" savings="Save - ₹8000" />
          <ProductCard name="Galaxy M53 (4GB | 64 GB )" image={phoneM53} imageBox={{ x: 38, y: 0, width: 150, height: 188 }} price="₹31999" oldPrice="₹40999" discount="56% OFF" savings="Save - ₹9000" />
          <ProductCard name="Galaxy S22 Ultra" image={phoneS22Green} imageBox={{ x: 48, y: -12, width: 132, height: 212 }} price="₹67999" oldPrice="₹85999" discount="56% OFF" savings="Save - ₹18000" />
        </ProductSection>

        {/* Top categories: 7 round cards */}
        <ProductSection prefix="Shop From" highlight="Top Categories" titleWidth={281} underlineWidth={281} layout="seven">
          <CategoryCard name="Mobile" image={catMobile} imageBox={{ x: 40, y: 17, width: 52, height: 98, crop: { width: '278.38%', height: '117.61%', left: '-89.19%', top: '-8.81%' } }} selected />
          <CategoryCard name="Cosmetics" image={catCosmetics} imageBox={{ x: 36, y: 9, width: 60, height: 113, radius: 30 }} />
          <CategoryCard name="Electronics" image={catElectronics} imageBox={{ x: 0, y: 0, width: 132, height: 132 }} />
          <CategoryCard name="Furniture" image={catFurniture} imageBox={{ x: 4, y: 4, width: 124, height: 124, radius: 62 }} />
          <CategoryCard name="Watches" image={catWatches} imageBox={{ x: 20, y: 20, width: 92, height: 92 }} />
          <CategoryCard name="Decor" image={catDecor} imageBox={{ x: 7, y: 7, width: 118, height: 118, radius: 59 }} />
          <CategoryCard name="Accessories" image={catAccessories} imageBox={{ x: 4, y: 4, width: 124, height: 124, radius: 62 }} />
        </ProductSection>

        {/* Top electronics brands: 3 promo banners + carousel dots */}
        <ProductSection
          prefix="Top"
          highlight="Electronics Brands"
          titleWidth={245}
          underlineWidth={245}
          layout="three"
          footer={
            <div className="brand-dots">
              <CarouselDots count={8} active={0} />
            </div>
          }
        >
          <BrandBanner
            chip="IPHONE"
            chipWidth={99}
            logo={
              <span className="brand-logo brand-logo--apple">
                <AppleLogo />
              </span>
            }
            image={brandIphone}
            imageBox={{ x: 241, y: 12, width: 104, height: 185, crop: { width: '462.09%', height: '145.16%', left: '-181.05%', top: '-18.75%' } }}
            promotion="UP to 80% OFF"
            promoTop={157}
            backgroundColor="var(--apple-bg)"
            textColor="var(--white)"
            chipColor="var(--apple-chip)"
            chipTextColor="var(--white)"
          />
          <BrandBanner
            chip="REALME"
            chipWidth={102}
            logo={<span className="brand-logo brand-logo--realme">realme</span>}
            image={brandRealme}
            imageBox={{ x: 214, y: 12, width: 158, height: 185 }}
            promotion="UP to 80% OFF"
            promoTop={129}
            backgroundColor="var(--realme-bg)"
            textColor="var(--heading)"
            chipColor="var(--realme-chip)"
            chipTextColor="var(--heading)"
          />
          <BrandBanner
            chip="XIAOMI"
            chipWidth={96}
            logo={<span className="brand-logo brand-logo--xiaomi">mi</span>}
            image={brandXiaomi}
            imageBox={{ x: 217, y: 13, width: 152, height: 183, crop: { width: '142.31%', height: '117.83%', left: '-21.15%', top: '-8.92%' } }}
            promotion="UP to 80% OFF"
            promoTop={157}
            backgroundColor="var(--xiaomi-bg)"
            textColor="var(--heading)"
            chipColor="var(--xiaomi-chip)"
            chipTextColor="var(--heading)"
          />
        </ProductSection>

        {/* Daily essentials: 6 square tiles */}
        <ProductSection prefix="Daily" highlight="Essentials" titleWidth={167} underlineWidth={164} layout="six">
          <EssentialCard name="Daily Essentials" image={essEssential} imageBox={{ x: 1, y: 33, width: 183, height: 122 }} discount="UP to 50% OFF" selected />
          <EssentialCard name="Vegetables" image={essVegetables} imageBox={{ x: 21, y: 12, width: 145, height: 164 }} discount="UP to 50% OFF" />
          <EssentialCard name="Fruits" image={essFruits} imageBox={{ x: 5, y: 17, width: 176, height: 153 }} discount="UP to 50% OFF" />
          <EssentialCard name="Strawberry" image={essStrawberry} imageBox={{ x: 11, y: 43, width: 166, height: 102, crop: { width: '109.57%', height: '117.13%', left: '-4.79%', top: '-8.56%' } }} discount="UP to 50% OFF" />
          <EssentialCard name="Mango" image={essMango} imageBox={{ x: 10, y: 26, width: 168, height: 136, crop: { width: '124.72%', height: '114.08%', left: '-12.36%', top: '-7.04%' } }} discount="UP to 50% OFF" />
          <EssentialCard name="Cherry" image={essCherry} imageBox={{ x: 28, y: 20, width: 132, height: 148, crop: { width: '120.73%', height: '107.61%', left: '-10.37%', top: '-1.63%' } }} discount="UP to 50% OFF" />
        </ProductSection>
      </main>

      <Footer />
    </>
  );
}

export default App;
