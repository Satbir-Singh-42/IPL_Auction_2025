# 🏏 IPL 2025 Player Auction Dashboard

A modern, real-time web application for tracking and managing IPL (Indian Premier League) 2025 player auction data. Built with cutting-edge web technologies, it provides live auction results, team statistics, comprehensive player information, and an interactive auction management interface through direct Google Sheets integration.

## ✨ Features

### 🎯 Core Functionality

- **Real-time Auction Data** - Live integration with Google Sheets for up-to-the-minute auction results
- **Interactive Auction Page** - Full-featured auction management interface with player viewer and bidding system
- **Team Overview** - Comprehensive team cards showing funds, players, and statistics in ranking order
- **Player Management** - Detailed views for sold and unsold players with advanced filtering
- **Live Leaderboard** - Dynamic team rankings with circular rank indicators based on points, budget, and performance
- **Playing XI Selection** - Interactive team selection with validation and CSV export for each team
- **Foreign Players Tracking** - Dedicated column showing overseas player count for each team
- **Fully Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **Custom Branding** - ISTE logo favicon and IPL-themed design

### 🎪 Auction Page Features

The **Auction Page** (`/auction`) is the centerpiece of this application, providing a complete auction management experience:

#### Live Auction Management
- **Real-time Player Cards** - Browse all active players with images, stats, and details
- **Search & Filter** - Search across player names, roles, nations, and teams
  - Works for both active and sold players simultaneously
- **Player Viewer Modal** - Full-screen player details with:
  - High-quality player images or initials fallback
  - Complete stats: Age, T20 Matches, Base Price, Points
  - Current bid tracker with live updates
  - Overseas player indicator
  - Sold status and team assignment

#### Interactive Bidding System
- **Dynamic Bid Increment** - Configurable bid increments
- **Quick Actions** - Mark players as Sold or Unsold with visual effects:
  - 🎉 **Sold**: Celebration confetti animation
  - ❌ **Unsold**: UNSOLD stamp with animation
- **Automatic Navigation** - Smooth transition to next player (1-second delay after action)
- **Undo Functionality** - Quick undo last action with 'R' key

#### Advanced Navigation
- **Keyboard Shortcuts**:
  - **R** - Quick Undo last action
  - **Z** - Manual sync with Google Sheets
  - **← / →** - Navigate between players (instant)
  - **S** - Mark as Sold (with animation delay)
  - **U** - Mark as Unsold (with animation delay)
  - **Escape** - Close player viewer
  - **Space/Enter/Any Key** - Increase current bid
- **Touch Gestures** (Mobile):
  - **Swipe Left** - Next player
  - **Swipe Right** - Previous player
  - Minimum 50px swipe distance for accuracy

#### Visual Enhancements
- **Smooth Animations** - Framer Motion powered transitions:
  - Fade effects after sold/unsold actions
  - Scale animations during transitions
  - Entrance/exit animations for modals
- **Background Effects** - Beautiful blur and overlay effects
- **Confetti Celebration** - Multi-burst confetti on successful sale
- **Status Indicators** - Live counter showing Active, Sold, and Unsold counts

#### Data Management
- **Local Storage** - Session persistence for auction state
- **Google Sheets Sync** - Auto-sync every 60 seconds
- **Manual Refresh** - Force sync with 'Z' key
- **Reset Functionality** - Clear local data and restore from sheet
- **Restore Players** - Move sold players back to active (for non-sheet entries)

#### Mobile Optimization
- **Responsive Layout** - Adapts to all screen sizes
- **Touch-Friendly** - Large tap targets and swipe gestures
- **Compact Stats Display** - Abbreviated labels on small screens (A/S/U)
- **Flexible Buttons** - Stack vertically on mobile, horizontal on desktop
- **Optimized Typography** - Scales from mobile to desktop

### 🚀 Technical Features

- **Direct Data Fetching** - No backend database required - fetches data directly from Google Sheets
- **Smart Caching** - 5-second client-side cache with automatic refresh intervals
- **Type-Safe** - Full TypeScript implementation with runtime validation
- **Modern UI** - Beautiful interface built with Tailwind CSS and shadcn/ui
- **Smooth Animations** - Framer Motion powered transitions and interactions
- **Real-time Updates** - Background data synchronization every 5 seconds (home) / 60 seconds (auction)

## 📊 Data Sources

The application integrates with Google Sheets to fetch three types of data:

### 1. Teams & Budget Sheet
- Team names and identifiers
- Initial budget allocations
- Current remaining funds
- Total players count
- Foreign players count
- Total team points

### 2. Players Catalogue
- Complete player database
- Player names and nationalities
- Base prices and categories
- Player roles and specializations
- Team assignments (if sold)
- Player images and statistics

### 3. Auctioneer Sheet
- Live auction results
- Final bid amounts
- Player status (sold/unsold)
- Real-time updates during auction

**Note**: The application expects some 400 errors during sheet fetching as it tries multiple sheet identifiers to find the correct data source. This is normal behavior and doesn't affect functionality.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ (Node.js 20 recommended)
- npm package manager
- Google Sheets with publicly accessible data (CSV export enabled)

### Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd ipl-auction-dashboard
```

2. **Install dependencies**

```bash
npm install
```

3. **Start the development server**

```bash
npm run dev
```

4. **Open your browser**
   Navigate to `http://localhost:5000`

## 📁 Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   │   ├── ui/         # shadcn/ui component library
│   │   │   ├── LeaderboardView.tsx    # Leaderboard with rankings
│   │   │   ├── PlayerCard.tsx         # Player display cards
│   │   │   ├── PlayerDetailsModal.tsx # Player detail modal
│   │   │   ├── TeamCard.tsx           # Team overview cards
│   │   │   └── ...
│   │   ├── hooks/          # Custom React hooks
│   │   │   └── useIPLData.ts          # Google Sheets data hook
│   │   ├── lib/            # Utility libraries
│   │   ├── pages/          # Page components
│   │   │   ├── AuctionPage.tsx        # Main auction interface
│   │   │   ├── HomePage.tsx           # Overview dashboard
│   │   │   └── ...
│   │   ├── services/       # Google Sheets integration
│   │   │   └── googleSheetsService.ts
│   │   └── App.tsx         # Main app component with routing
│   ├── public/             # Public static files
│   │   └── images/         # Auction assets & team logos
│   └── index.html          # HTML entry point
├── shared/                 # Shared configuration and types
│   ├── schema.ts           # Data schemas and types
│   └── config.ts           # Application configuration (auction rules, UI styling)
├── package.json            # Dependencies and scripts
├── vite.config.ts          # Vite build configuration
├── vercel.json             # Vercel deployment configuration
├── tsconfig.json           # TypeScript configuration
└── tailwind.config.ts      # Tailwind CSS theming
```

## 🎮 Usage Guide

### Main Pages

The dashboard features multiple pages accessible via navigation:

#### 1. **HOME** (Overview Dashboard)
- Team cards sorted by current ranking
- Shows top 3 teams with medal indicators
- Real-time budget tracking
- Player count with foreign player limits
- Team logos and branding
- Click any card for detailed team view

#### 2. **AUCTION** (`/auction`)
- **Interactive auction management interface**
- Browse all active and sold players
- Real-time bidding with current bid tracker
- Mark players as Sold/Unsold with animations
- Keyboard shortcuts and touch gestures
- Auto-save auction state to local storage
- Sync with Google Sheets every 60 seconds

#### 3. **SOLD PLAYERS**
- Complete list of all purchased players
- Filter by team using dropdown
- Sortable columns (name, team, sold amount, base price, nationality)
- Search functionality
- Real-time status updates

#### 4. **UNSOLD PLAYERS**
- All available players not yet purchased
- Detailed player information
- Base price and category
- Player roles and specializations
- Searchable and sortable interface

#### 5. **LEADERBOARD**
- Complete team rankings table
- Circular rank indicators with gradient styling
- Sortable columns (Rank, Team, Total Spent, Budget, Players, Foreign Players, Points)
- Multi-level ranking system based on points, budget, and team name
- Color-coded data for easy reading
- Updates every 5 seconds

#### 6. **PLAYING XI SELECTION**
- Access from individual team dashboard pages
- Interactive player selection with drag-and-drop style interface
- Real-time validation against IPL playing XI rules:
  - Exactly 11 players required
  - Batsmen: 2-5 players
  - Wicket-Keepers: 1-3 players (at least 1 required)
  - All-Rounders: at least 1
  - Bowlers: at least 2
  - Foreign players: maximum 4
- Filter and sort players by role and points
- Two-column layout - Rest of Squad and Playing XI side-by-side
- CSV Export - Download validated playing XI
- Local storage - Saves your selection automatically
- Points tracking - Shows total points for selected XI

### Auction Page Keyboard Shortcuts

#### Global Shortcuts (anytime)
- **R** - Quick Undo (revert last sold/unsold action)
- **Z** - Manual Sync with Google Sheets

#### Player Viewer Shortcuts
- **← Left Arrow** - Previous player (instant)
- **→ Right Arrow** - Next player (instant)
- **Escape** - Close player viewer
- **S** - Mark as Sold (with confetti + 1s transition)
- **U** - Mark as Unsold (with stamp + 1s transition)
- **Any Key / Space / Enter** - Increase bid by increment

**Note**: All shortcuts are disabled when typing in the search box.

### Mobile Gestures (Auction Page)
- **Swipe Left** - Navigate to next player
- **Swipe Right** - Navigate to previous player
- **Tap Player Card** - Open player viewer
- **Tap Outside Modal** - Close viewer

## 🛠️ Development

### Available Scripts

```bash
# Development
npm run dev          # Start Vite dev server on port 5000 with HMR
npm run check        # Run TypeScript type checking

# Production
npm run build        # Build static site for production
npm run preview      # Preview production build locally
```

### Development Workflow

1. **Start the development server**

```bash
npm run dev
```

Server starts on `http://localhost:5000`

2. **Make your changes**
   - Hot module replacement (HMR) enabled
   - Changes reflect immediately in browser
   - TypeScript errors shown in terminal

3. **Run type checking**

```bash
npm run check
```

4. **Build for production**

```bash
npm run build
```

### Code Style Guidelines

- **TypeScript** - Strict mode with comprehensive type safety
- **Component Structure** - React functional components with hooks
- **Styling** - Tailwind CSS utility classes with shadcn/ui components
- **State Management** - TanStack Query for server state, useState for local state
- **Data Fetching** - Direct Google Sheets integration via frontend services
- **File Organization** - Feature-based organization with shared components
- **Responsive Design** - Mobile-first approach with Tailwind breakpoints

## 🔍 Troubleshooting

### Common Issues

#### 1. Google Sheets 400 Errors (EXPECTED BEHAVIOR)

```
Failed to load resource: the server responded with a status of 400
```

**This is normal!** The service tries multiple sheet identifiers (GIDs) to find the correct data. These 400 errors are expected and don't affect functionality.

#### 2. Data Not Refreshing

**Solution**:
- Check browser console for fetch errors
- Verify Google Sheets are publicly accessible
- Clear browser cache and reload
- Ensure sheet permissions allow public CSV export

#### 3. Auction State Lost

**Solution**:
- Check browser local storage is enabled
- Don't use incognito/private mode
- Use "Reset View" button to reload from Google Sheets

#### 4. Touch Gestures Not Working

**Solution**:
- Ensure you're on the auction page
- Swipe distance must be at least 50px
- Try disabling browser gesture navigation

## 🔧 Configuration

### Google Sheets Setup

#### Required Sheet Structure

**Teams & Budget Sheet** columns:
- Team Name
- Initial Budget
- Total Spent
- Funds Remaining
- Players Count
- Foreign Players
- Total Points

**Players Catalogue** columns:
- Player Name
- Base Price
- Category
- Role
- Nationality
- Team (if sold)
- Images (optional)
- Age, Matches, Points

**Auctioneer Sheet** columns:
- Player Name
- Status (Sold/Unsold)
- Final Amount
- Winning Team

#### Sheet Permissions

1. Open Google Sheet → Share
2. Set to "Anyone with the link can view"
3. Copy sheet URL
4. Extract spreadsheet ID from URL
5. Update in `client/src/services/googleSheetsService.ts`

### Application Settings

The application provides centralized configuration in `shared/config.ts`:

#### Auction Configuration
```typescript
export const AUCTION_CONFIG = {
  maxPlayers: 15,         // Maximum players per team
  minPlayers: 11,         // Minimum players required
  maxOverseasPlayers: 7,  // Maximum foreign players per team
  teamsQualifying: 8,     // Number of teams advancing to playoffs
  bidIncrement: 1000,     // Default bid increment amount
};
```

#### Playing XI Validation Rules
```typescript
export const PLAYING_XI_CONFIG = {
  totalPlayers: 11,       // Total players in Playing XI
  batsmen: {
    min: 2,               // Minimum batsmen required
    max: 5,               // Maximum batsmen allowed
  },
  wicketKeepers: {
    min: 1,               // Minimum wicket-keepers required
    max: 3,               // Maximum wicket-keepers allowed (increase if you want multiple WKs)
  },
  allRounders: {
    min: 1,               // Minimum all-rounders required
  },
  bowlers: {
    min: 2,               // Minimum bowlers required
  },
  foreignPlayers: {
    max: 4,               // Maximum foreign players in Playing XI
  },
};
```

**Note**: All Playing XI validation rules are now configurable in one place. Simply edit the values in `shared/config.ts` to customize the requirements for your tournament.

### Team Logos

#### Simple 2-Step Process

**Step 1:** Upload logo file to `/client/public/images/teams/`
- Supported formats: `.jpg`, `.png`, `.webp`, `.jpeg`
- Recommended: Square images (1:1 ratio)

**Step 2:** Update `client/src/config/teamBranding.ts`:

```typescript
'Your Team Name': {
  logo: '/images/teams/your-logo.png',
  borderColor: 'border-[#HEXCOLOR]',
  bgGradient: 'bg-[linear-gradient(...)]',
}
```

The logo will automatically appear everywhere in the application!

## 📊 Data Flow

```
Google Sheets (Source)
       ↓
CSV Export URLs
       ↓
Papa Parse (Parser)
       ↓
googleSheetsService.ts (Transform)
       ↓
TanStack Query (Cache - 5s home / 60s auction)
       ↓
React Components (Display)
       ↓
User Interface
```


## 🤝 Contributing

We welcome contributions! Here's how:

1. **Fork the repository**
2. **Create feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
   - Follow existing code style
   - Add TypeScript types
   - Test thoroughly
4. **Commit with clear message**
   ```bash
   git commit -m 'Add: Feature description'
   ```
5. **Push to your fork**
   ```bash
   git push origin feature/amazing-feature
   ```
6. **Open Pull Request**
   - Describe changes clearly
   - Reference any related issues
   - Include screenshots if UI changes

## 📄 License

This project is licensed under the MIT License.

## 🚀 Deployment

### Deployment Options

- **Vercel**: Fast static site deployment with serverless functions
- **Render**: Traditional Node.js hosting with automatic builds
- **Netlify**: Static site with serverless functions
- **Railway**: Modern app platform with automatic deployments
- **DigitalOcean**: VPS hosting for full control

## 🙏 Acknowledgments

- ISTE for branding and logo
- IPL for the exciting cricket league
- Open source community for amazing tools and libraries
