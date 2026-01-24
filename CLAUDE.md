# Kary Waves

A marketing website for Kary Waves, a father & daughter garment manufacturing atelier located in NYC's Garment District.

## Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4 with CSS variables
- **Fonts** (loaded via Google Fonts in `index.html` + local):
  - `--font-display`: "Instrument Serif", serif — headings, display text
  - `--font-body`: "Outfit", sans-serif — body text, paragraphs
  - `--font-script`: "Satisfy", cursive — decorative script text
  - `MixStitch`: Custom stitch-pattern font for logo (`/public/fonts/MixStitch.ttf`)

## Project Structure

```
src/
├── components/       # React components
│   ├── Header.tsx    # Fixed header with scroll-based blur/color changes
│   ├── Hero.tsx      # Hero section with background image
│   ├── About.tsx     # About section with family story
│   ├── Services.tsx  # Services offered
│   ├── Lookbook.tsx  # Image gallery
│   ├── Installations.tsx  # Hardware installations showcase (currently commented out, may be removed - content merged into Services)
│   ├── FAQ.tsx       # Frequently asked questions and process steps
│   ├── Marquee.tsx   # Scrolling text marquee
│   ├── Contact.tsx   # Contact form and info
│   └── Footer.tsx    # Site footer
├── context/
│   └── ThemeContext.tsx  # Dark/light mode context provider
├── hooks/
│   └── useDarkMode.ts    # Dark mode state persistence hook
├── main.tsx          # App entry point
├── App.tsx           # Main app component
└── index.css         # Global styles, CSS variables, animations
```

## Key Design Decisions

### Theme System
- Uses CSS variables defined in `@theme` block in `index.css`
- ThemeContext provides `isDark` and `toggle()` for dark/light mode
- Dark mode applies `.dark` class to `<html>` element

### Color Palette
- `--color-cream` / `--color-cream-dark`: Light backgrounds
- `--color-espresso` / `--color-espresso-light`: Dark backgrounds/text
- `--color-terracotta`: Accent color
- `--color-gold` / `--color-gold-light`: Heritage badge accents

### Header Behavior
- Blur effect: Appears when `scrollY > 0`
- Color change: Switches from white (over hero) to theme colors after scrolling past hero section
- Text over hero always stays white regardless of theme

### Hero Section
- Text is always white with drop shadows for visibility
- Does NOT change colors with dark/light mode toggle
- Uses explicit colors instead of CSS variables

### Contact Form (Dark Mode)
- **Form card**: Very dark `#13110F` (distinct from page background)
- **Labels**: Muted cream `#FAF8F5` at 70% opacity
- **Required asterisks**: Terracotta `#B83D0C`
- **Inputs**:
  - Background: `#1E1B19`
  - Border: `#3D3835`
  - Rounded: `rounded-xl`
  - Glow effect: `shadow-[inset_0_1px_2px_rgba(0,0,0,0.3),0_0_0_1px_rgba(255,255,255,0.03)]`
- **Button**: Terracotta `#B83D0C`, hover `#D94F1A`

### Contact Form (Light Mode)
- **Form card**: Terracotta `#B83D0C` (accent color as container)
- **Labels**: White at 90% opacity
- **Required asterisks**: White
- **Inputs**:
  - Background: `white/95`
  - Border: `white/50` (for consistent sizing with dark mode)
  - Rounded: `rounded-xl`
- **Button**: Dark espresso `#1A1614`, hover `#2D2926`
- **Email note below form**: `mt-10` spacing to align with map bottom

**Note**: Use hex values directly (not CSS variables) for Tailwind arbitrary values

## Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

## Coding Principles

- **Simpler is better** - Choose straightforward solutions over complex ones
- **Avoid over-engineering** - Don't add unnecessary abstractions, media queries, or special cases when a simple approach works
- **Never use `!important`** - It's bad practice; find a cleaner solution
- **Image sizing**: Prefer container width adjustments with `background-size: cover` over percentage-based background-size values (they cause jarring jumps at breakpoints)

## Style Guidelines

- Use `hover:opacity-70` for subtle hover effects (avoid drastic color changes)
- Heritage badge has shimmer effect on hover
- Logo uses MixStitch font for stitch-pattern appearance
- Maintain high contrast for accessibility (older audience)
- Use Unsplash for reliable image sources

## Assets

### Images
- **Hero**: Unsplash tailor workspace (`scale-x-[-1]` for horizontal flip)
- **Lookbook**: Local images in `/public/images/lookbook/` (custom garments, celebrity pieces, fashion shoots)
- **Installations**: Unsplash sewing/hardware imagery

### Video
- **About section**: `/public/videos/about.mp4` - background video for the About section
