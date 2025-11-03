# IPL 2025 Player Auction Dashboard

## Overview

A real-time web application for tracking and managing IPL (Indian Premier League) 2025 player auction data. The application provides live auction results, team statistics, player management, and interactive auction controls with Google Sheets integration for real-time data synchronization.

**Key Features:**
- Real-time auction data from Google Sheets
- Interactive auction page with player viewer and bidding system
- Team overview with rankings and statistics
- Player management (sold/unsold) with filtering and search
- Live leaderboard with dynamic team rankings
- Playing XI selection with validation and CSV export
- Fully responsive design for desktop, tablet, and mobile
- Custom IPL-themed branding and animations

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System:**
- React 18 with TypeScript for type-safe UI development
- Vite as the build tool and development server
- Wouter for lightweight client-side routing
- Framer Motion for page transitions and animations

**State Management & Data Fetching:**
- TanStack React Query (v5) for server state management
- Automatic refetching with configurable intervals (5s for home page, 60s for auction page)
- Local storage for auction state persistence (sold/unsold player tracking)
- Custom hooks (`useIPLData`, `useIsMobile`) for shared logic

**UI Component Library:**
- Radix UI primitives for accessible, headless components
- Tailwind CSS for utility-first styling with custom theme
- shadcn/ui component patterns (New York style)
- Custom component variants using class-variance-authority

**Responsive Design Strategy:**
- Mobile-first approach with breakpoint at 768px
- Touch gestures for mobile auction navigation (swipe left/right)
- Tap-to-increment bidding (mobile only, ≤768px)
- Adaptive layouts using Tailwind responsive utilities

**Key Frontend Patterns:**
1. **Page Components** - Route-level components in `client/src/pages/`
2. **Shared Components** - Reusable UI in `client/src/components/`
3. **Service Layer** - Google Sheets integration in `client/src/services/`
4. **Configuration** - Centralized config in `shared/config.ts`

### Data Layer Architecture

**Data Source:**
- Google Sheets as the primary data source (no traditional backend)
- CSV export API for reading sheet data
- Three main sheets:
  - Players Catalogue (player data)
  - Auctioneer Sheet (auction status)
  - Teams Budget (team finances)

**Data Fetching Strategy:**
- PapaParse for CSV parsing
- Systematic GID discovery for sheet identification
- Automatic fallback to team initials when logos unavailable
- Error handling with graceful degradation

**Data Models:**
- `Player` - Player information with auction status
- `Team` - Team configuration and statistics
- `TeamStats` - Calculated team metrics (spending, player count, rankings)

**Local State Management:**
- Browser localStorage for auction page state
- Undo functionality tracking last action
- Sold/unsold player name sets for instant UI updates
- Current bid tracking with increment configuration

### Configuration System

**Centralized Configuration (`shared/config.ts`):**
- Auction rules (max players, budget limits, overseas limits)
- Bid increments and starting values
- Auto-sync intervals (5s/60s depending on page)
- Playing XI constraints (min/max by role)
- Dashboard colors and styling constants

**Team Branding System (`client/src/config/teamBranding.ts`):**
- Team logo paths (stored in `/client/public/images/teams/`)
- Color gradients and border colors per team
- Automatic color assignment from reserved palette
- Team initials generation when logos unavailable

**Design Principle:** Configuration-driven approach allows easy customization without code changes.

### User Interface Patterns

**Page Transitions:**
- AnimatePresence with route-based animations
- PageTransition wrapper for consistent experience
- Smooth opacity/position transitions

**Loading States:**
- Custom LoadingPage with background image preloading
- Skeleton states for data fetching
- Progressive image loading with fallbacks

**Interactive Elements:**
1. **Auction Page:**
   - Player card carousel with search/filter
   - Modal viewer for detailed player stats
   - Bid increment system (mobile-only tap interaction)
   - Celebration animations (confetti on sold, unsold stamp)
   - Keyboard shortcuts (R for undo, Z for sync, arrow keys for navigation)

2. **Team Dashboard:**
   - Team logo with hover animations
   - Statistics cards with color-coded metrics
   - Player grouping by role
   - Playing XI selection with drag-and-drop potential

3. **Leaderboard:**
   - Sortable columns with visual indicators
   - Dynamic rank circles with color gradients
   - Team logo/initials display

### Styling Architecture

**Tailwind Configuration:**
- Custom color palette including IPL team colors
- Extended theme with custom gradients
- CSS variables for dynamic theming
- Responsive breakpoints (sm: 640px, md: 768px, lg: 1024px, xl: 1280px, 2xl: 1536px)

**Custom Scrollbar Styling:**
- Webkit and Firefox scrollbar customization
- Gradient scrollbar thumbs matching theme
- Consistent across all components

**Animation Library:**
- Framer Motion for complex animations
- CSS transitions for simple hover effects
- Canvas-confetti for celebration effects

### Accessibility & Performance

**Accessibility Features:**
- Semantic HTML structure
- ARIA labels for screen readers
- Keyboard navigation support
- Focus management in modals

**Performance Optimizations:**
- Image preloading for backgrounds
- Lazy loading for player images with fallbacks
- Memoized calculations (useMemo for sorting/filtering)
- Efficient re-render control with React Query caching

## External Dependencies

### Third-Party Services

**Google Sheets API:**
- Sheet ID: `1fyX373d3bUhnBGoZuM_eQxy991hSajyZjIuVgByg-7g`
- CSV export endpoints for data retrieval
- No authentication required (public read access)
- Systematic GID discovery for sheet identification

### Key NPM Packages

**Core Framework:**
- `react` & `react-dom` - UI library
- `vite` - Build tool and dev server
- `typescript` - Type safety

**State & Data:**
- `@tanstack/react-query` - Server state management
- `papaparse` - CSV parsing for Google Sheets data
- `wouter` - Lightweight routing

**UI Components:**
- `@radix-ui/*` - Accessible component primitives (dialog, tooltip, etc.)
- `framer-motion` - Animation library
- `canvas-confetti` - Celebration animations
- `lucide-react` - Icon library

**Styling:**
- `tailwindcss` - Utility-first CSS framework
- `class-variance-authority` - Component variant management
- `clsx` & `tailwind-merge` - Class name utilities

**Forms & Validation:**
- `@hookform/resolvers` - Form validation
- `zod` - Schema validation (used with Drizzle schemas)

**Data Export:**
- `date-fns` - Date formatting
- CSV export functionality for Playing XI

**Development:**
- `@types/*` - TypeScript definitions
- `autoprefixer` & `postcss` - CSS processing

### Database Schema (Future-Ready)

The application includes Drizzle ORM schema definitions (`shared/schema.ts`) for future database integration:
- `users` table - Authentication (prepared but not implemented)
- `teams` table - Team data structure
- `players` table - Player data structure

**Current State:** Schema defined but not connected to a database. Google Sheets serves as the data source. The schema is ready for migration to PostgreSQL if needed.

### Asset Dependencies

**Images & Media:**
- Team logos: `/client/public/images/teams/`
- Background images: `/client/public/images/auction/`, `/client/public/images/backgrounds/`
- IPL logo: `/client/public/IPL-logo.png` (favicon)

**Fonts:**
- Google Fonts: Work Sans, Architects Daughter, DM Sans, Fira Code, Geist Mono
- Custom font loading via CDN

### Deployment Configuration

**Vercel Configuration (`vercel.json`):**
- SPA routing with fallback to index.html
- Client-side routing rewrites

**Build Output:**
- Vite builds to `/dist` directory
- Static assets served from `/client/public`
- TypeScript compilation with incremental builds