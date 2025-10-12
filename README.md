# 🏏 IPL 2025 Player Auction Dashboard

A modern, real-time web application for tracking and visualizing IPL (Indian Premier League) 2025 player auction data. Built with cutting-edge web technologies, it provides live auction results, team statistics, and comprehensive player information through direct Google Sheets integration.

## ✨ Features

### 🎯 Core Functionality

- **Real-time Auction Data** - Live integration with Google Sheets for up-to-the-minute auction results
- **Team Overview** - Comprehensive team cards showing funds, players, and statistics in ranking order
- **Player Management** - Detailed views for sold and unsold players with advanced filtering
- **Live Leaderboard** - Dynamic team rankings with circular rank indicators based on points, budget, and performance
- **Foreign Players Tracking** - Dedicated column showing overseas player count for each team
- **Responsive Design** - Optimized for desktop, tablet, and mobile viewing
- **Custom Branding** - ISTE logo favicon and IPL-themed design

### 🚀 Technical Features

- **Direct Data Fetching** - No backend database required - fetches data directly from Google Sheets
- **Smart Caching** - 5-second client-side cache with automatic refresh intervals
- **Type-Safe** - Full TypeScript implementation with runtime validation
- **Modern UI** - Beautiful interface built with Tailwind CSS and shadcn/ui
- **Smooth Animations** - Framer Motion powered transitions and interactions
- **Real-time Updates** - Background data synchronization every 5 seconds

## 🛠️ Technology Stack

### Frontend

- **React 18** - Modern React with hooks and concurrent features
- **TypeScript** - Type-safe development with strict mode
- **Vite** - Lightning-fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework with custom IPL theming
- **shadcn/ui** - High-quality accessible component library built on Radix UI
- **TanStack Query** - Powerful data synchronization and caching
- **Wouter** - Lightweight client-side routing
- **Framer Motion** - Smooth animations and transitions
- **Lucide React** - Beautiful icons for UI elements

### Data Management

- **Google Sheets Integration** - Primary data source for real-time auction information
- **Papa Parse** - Efficient CSV parsing for Google Sheets data
- **TanStack Query Caching** - Advanced client-side data caching with 5-second refresh intervals

### Backend

- **Node.js + Express** - Development and production server
- **TSX** - Fast TypeScript execution for development
- **ESBuild** - Fast JavaScript bundler for production builds

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
│   │   ├── lib/            # Utility libraries
│   │   ├── pages/          # Page components and sections
│   │   ├── services/       # Google Sheets integration
│   │   └── App.tsx         # Main app component with routing
│   ├── public/             # Public static files
│   └── index.html          # HTML entry point
├── server/                 # Backend server
│   ├── index.ts            # Express server
│   ├── routes.ts           # API route definitions
│   ├── storage.ts          # Storage interface
│   └── vite.ts             # Vite dev server integration
├── shared/                 # Shared TypeScript types
│   ├── schema.ts           # Data schemas and types
│   └── config.ts           # Application configuration
├── attached_assets/        # Project assets
├── package.json           # Dependencies and scripts
├── vite.config.ts         # Vite build configuration
├── tsconfig.json          # TypeScript configuration
└── tailwind.config.ts     # Tailwind CSS theming
```

## 🎮 Usage Guide

### Navigation Tabs

The dashboard features four main sections accessible via navigation tabs:

#### 1. **OVERVIEW** (Default)

- Team cards sorted by current ranking
- Shows top 3 teams with medal indicators
- Real-time budget tracking
- Player count with foreign player limits
- Team logos and branding
- Click any card for detailed team view

#### 2. **SOLD PLAYERS**

- Complete list of all purchased players
- Filter by team using dropdown
- Sortable columns (name, team, sold amount, base price, nationality)
- Search functionality
- Real-time status updates

#### 3. **UNSOLD PLAYERS**

- All available players not yet purchased
- Detailed player information
- Base price and category
- Player roles and specializations
- Searchable and sortable interface

#### 4. **LEADERBOARD**

- Complete team rankings table
- **Circular rank indicators** with gradient styling
- Sortable columns (Rank, Team, Total Spent, Budget, Players, Foreign Players, Points)
- Multi-level ranking system based on points, budget, and team name
- Color-coded data for easy reading
- Updates every 5 seconds

### Key Features Explained

#### Player Details Modal

- Click any player card to view detailed information
- Shows player image or initials fallback
- Displays age, matches, base price, and points
- Shows sold price and team (if purchased)
- Overseas player indicator
- **Enhanced close button** - White, fully visible, and easy to click

#### Smart Data Caching

- Initial data fetch from Google Sheets
- 5-second client-side cache
- Automatic background refresh
- Minimal API calls for performance

## 🛠️ Development

### Available Scripts

```bash
# Development
npm run dev          # Start dev server on port 5000 with hot reload
npm run check        # Run TypeScript type checking

# Production
npm run build        # Build frontend + backend for production
npm run start        # Start production server
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

```typescript
export const AUCTION_CONFIG = {
  maxPlayers: 15, // Maximum players per team
  minPlayers: 11, // Minimum players required
  maxOverseasPlayers: 7, // Maximum foreign players per team
  teamsQualifying: 8, // Number of teams advancing to playoffs
};
```

# Quick Guide: Adding or Changing Team Logos

## Simple 2-Step Process

### Step 1: Upload Logo File
Place your logo image in the folder:
```
/client/public/images/teams/
```

**Supported formats:** `.jpg`, `.png`, `.webp`, `.jpeg`  
**Recommended:** Square images (1:1 ratio) for best display

### Step 2: Update Logo Path
Open `client/src/config/teamBranding.ts` and update the logo path:

```typescript
'Your Team Name': {
  logo: '/images/teams/your-logo.png',  // Change this path
  borderColor: 'border-[#HEXCOLOR]',
  bgGradient: 'bg-[linear-gradient(...)]',
}
```

**That's it!** The logo will automatically appear on:
- Team cards on the overview page
- Team dashboard headers
- Leaderboard listings
- All other team displays

## Examples

### Example 1: Adding a New Team Logo
1. Save `mumbai-indians.png` to `/client/public/images/teams/`
2. Update the path:
   ```typescript
   'Mumbai Indians': {
     logo: '/images/teams/mumbai-indians.png',
     // ...
   }
   ```

### Example 2: Replacing an Existing Logo
1. Upload new logo: `/client/public/images/teams/new-logo.jpg`
2. Update the path in `teamBranding.ts`:
   ```typescript
   'Team Name': {
     logo: '/images/teams/new-logo.jpg',  // Updated!
     // ...
   }
   ```

## No Logo? No Problem!
If you don't have a logo yet, the system automatically:
- Shows team initials (e.g., "Mumbai Indians" → "MI")
- Assigns a vibrant color from the reserved palette
- Works perfectly without any configuration

## Need Help?
See the full documentation at: `client/src/config/README.md`


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
TanStack Query (Cache - 5s)
       ↓
React Components (Display)
       ↓
User Interface
```

### Cache Strategy

1. **Initial Load**: Fetch from Google Sheets
2. **Cache**: Store in TanStack Query cache (5 seconds)
3. **Subsequent Requests**: Return cached data
4. **Background Refresh**: Auto-refresh every 5 seconds
5. **Stale Data**: Invalidate and refetch on user interaction

## 🎨 Design Features

### Color Palette

- **Background**: Dark blue gradient (`#0a0e1a` to `#1a1f3a`)
- **Primary**: Orange (`#ff8c00`) for IPL branding
- **Accent**: Red gradient for ranks and highlights
- **Text**: White with varied opacity for hierarchy
- **Close Button**: White, fully visible for accessibility

### Typography

- **Headers**: Bold, large sizes for prominence
- **Data**: Medium weight for readability
- **Labels**: Smaller, gray for secondary information

### Animations

- **Framer Motion**: Smooth page transitions
- **Hover Effects**: Interactive feedback on all clickable elements
- **Loading States**: Skeleton screens during data fetch
- **Modal Animations**: Smooth open/close transitions

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

## 🏏 About IPL 2025

The Indian Premier League (IPL) 2025 promises to be the most exciting season yet. This dashboard provides real-time insights into the player auction process, helping fans, analysts, and team management track the dynamic world of cricket's premier T20 league.

### IPL Auction Rules

- **Team Budget**: ₹100 crore per team
- **Squad Size**: Minimum 18, Maximum 25 players
- **Foreign Players**: Maximum 8 in squad, 4 in playing XI
- **Auction Format**: Live bidding with base price categories
- **Player Categories**: Capped/Uncapped, Indian/Overseas

## 🚀 Deployment

### Deployment Options

- **Vercel**: Fast static site deployment
- **Render**: Traditional Node.js hosting
- **Netlify**: Static site with serverless functions

## 🙏 Acknowledgments

- ISTE for branding and logo
- IPL for the exciting cricket league
- Open source community for amazing tools and libraries

---

Built with ❤️ for cricket fans everywhere
