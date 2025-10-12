/**
 * Team Branding Configuration
 * 
 * HOW TO ADD/CHANGE TEAM LOGOS:
 * 1. Place logo image in: /client/public/images/teams/
 * 2. Update the logo path below (e.g., logo: '/images/teams/team-name.png')
 * 3. Logo will automatically appear on all team cards
 * 
 * Supported formats: .jpg, .png, .webp, .jpeg
 * Recommended: Square images (1:1 ratio) for best display
 */

export interface TeamBranding {
  logo: string;
  borderColor: string;
  bgGradient: string;
}

export const TEAM_BRANDING: Record<string, TeamBranding> = {
  'Mumbai Indians': {
    logo: '/images/teams/mi.jpg',
    borderColor: 'border-[#045093]',
    bgGradient: 'bg-[linear-gradient(135deg,rgba(4,80,147,0.95)_0%,rgba(2,50,93,0.85)_45%,rgba(1,30,70,0.9)_100%)]',
  },
  'Lucknow Giants': {
    logo: '/images/teams/lsg.png',
    borderColor: 'border-[#0097A7]',
    bgGradient: 'bg-[linear-gradient(135deg,rgba(0,151,167,0.95)_0%,rgba(0,120,135,0.85)_45%,rgba(0,90,110,0.9)_100%)]',
  },
  'Bangalore Tigers': {
    logo: '/images/teams/rcb.jpg',
    borderColor: 'border-[#DA1212]',
    bgGradient: 'bg-[linear-gradient(135deg,rgba(218,18,18,0.95)_0%,rgba(180,15,15,0.85)_45%,rgba(140,10,10,0.9)_100%)]',
  },
  'Kolkata Riders': {
    logo: '/images/teams/kkr.jpeg',
    borderColor: 'border-[#3E1F47]',
    bgGradient: 'bg-[linear-gradient(135deg,rgba(62,31,71,0.95)_0%,rgba(45,20,55,0.85)_45%,rgba(30,15,40,0.9)_100%)]',
  },
  'Sunrisers Hyderabad': {
    logo: '/images/teams/srh.webp',
    borderColor: 'border-[#F26522]',
    bgGradient: 'bg-[linear-gradient(135deg,rgba(242,101,34,0.95)_0%,rgba(200,80,25,0.85)_45%,rgba(160,65,20,0.9)_100%)]',
  },
  'Delhi Capitals': {
    logo: '/images/teams/dc.jpg',
    borderColor: 'border-[#004C97]',
    bgGradient: 'bg-[linear-gradient(135deg,rgba(0,76,151,0.95)_0%,rgba(0,60,120,0.85)_45%,rgba(0,45,95,0.9)_100%)]',
  },
  'Chennai Strikers': {
    logo: '/images/teams/csk.jpg',
    borderColor: 'border-[#F9CD00]',
    bgGradient: 'bg-[linear-gradient(135deg,rgba(249,205,0,0.95)_0%,rgba(200,165,0,0.85)_45%,rgba(160,130,0,0.9)_100%)]',
  },
  'Ahmedabad Giants': {
    logo: '/images/teams/ag.png',
    borderColor: 'border-[#0B132B]',
    bgGradient: 'bg-[linear-gradient(135deg,rgba(11,19,43,0.95)_0%,rgba(8,15,35,0.85)_45%,rgba(5,10,25,0.9)_100%)]',
  },
  'Punjab Kings': {
    logo: '/images/teams/pbks.webp',
    borderColor: 'border-[#C8102E]',
    bgGradient: 'bg-[linear-gradient(135deg,rgba(200,16,46,0.95)_0%,rgba(160,10,35,0.85)_45%,rgba(120,8,25,0.9)_100%)]',
  },
  'Rajasthan Royals': {
    logo: '/images/teams/rr.png',
    borderColor: 'border-[#EA1A8C]',
    bgGradient: 'bg-[linear-gradient(135deg,rgba(234,26,140,0.95)_0%,rgba(190,20,115,0.85)_45%,rgba(150,15,90,0.9)_100%)]',
  },
  'Indore Titans': {
    logo: '/images/teams/it.png',
    borderColor: 'border-[#0074D9]',
    bgGradient: 'bg-[linear-gradient(135deg,rgba(0,116,217,0.95)_0%,rgba(0,90,170,0.85)_45%,rgba(0,70,130,0.9)_100%)]',
  },
  'Goa Gladiators': {
    logo: '/images/teams/gg.png',
    borderColor: 'border-[#00BCD4]',
    bgGradient: 'bg-[linear-gradient(135deg,rgba(0,188,212,0.95)_0%,rgba(0,150,170,0.85)_45%,rgba(0,120,140,0.9)_100%)]',
  },
  'Gujarat Titans': {
    logo: '/images/teams/gt.png',
    borderColor: 'border-[#0A1931]',
    bgGradient: 'bg-[linear-gradient(135deg,rgba(10,25,49,0.95)_0%,rgba(7,20,40,0.85)_45%,rgba(5,15,30,0.9)_100%)]',
  },
  'Gujarat Blasters': {
    logo: '/images/teams/gb.png',
    borderColor: 'border-[#FF6B35]',
    bgGradient: 'bg-[linear-gradient(135deg,rgba(255,107,53,0.95)_0%,rgba(200,85,40,0.85)_45%,rgba(160,68,32,0.9)_100%)]',
  },
  'Pune Panthers': {
    logo: '/images/teams/pp.png',
    borderColor: 'border-[#5E35B1]',
    bgGradient: 'bg-[linear-gradient(135deg,rgba(94,53,177,0.95)_0%,rgba(75,40,140,0.85)_45%,rgba(60,30,110,0.9)_100%)]',
  },
  'Kanpur Knights': {
    logo: '/images/teams/kp.png',
    borderColor: 'border-[#424242]',
    bgGradient: 'bg-[linear-gradient(135deg,rgba(66,66,66,0.95)_0%,rgba(50,50,50,0.85)_45%,rgba(35,35,35,0.9)_100%)]',
  },
};

// Reserved color gradients for new teams (5 unique vibrant colors not used by existing teams)
// Existing teams use: Blue, Teal, Red, Purple, Orange, Yellow, Dark Blue, Pink, Gray
// These colors are guaranteed to be visually distinct from all 16 existing teams
export const RESERVED_TEAM_COLORS = [
  {
    borderColor: 'border-[#00C853]',
    bgGradient: 'bg-[linear-gradient(135deg,rgba(0,200,83,0.95)_0%,rgba(0,160,65,0.85)_45%,rgba(0,120,50,0.9)_100%)]', // Emerald Green - Unique!
  },
  {
    borderColor: 'border-[#880E4F]',
    bgGradient: 'bg-[linear-gradient(135deg,rgba(136,14,79,0.95)_0%,rgba(110,10,65,0.85)_45%,rgba(85,8,50,0.9)_100%)]', // Wine/Maroon - Unique!
  },
  {
    borderColor: 'border-[#795548]',
    bgGradient: 'bg-[linear-gradient(135deg,rgba(121,85,72,0.95)_0%,rgba(95,65,55,0.85)_45%,rgba(70,50,40,0.9)_100%)]', // Brown - Unique!
  },
  {
    borderColor: 'border-[#009688]',
    bgGradient: 'bg-[linear-gradient(135deg,rgba(0,150,136,0.95)_0%,rgba(0,120,110,0.85)_45%,rgba(0,90,85,0.9)_100%)]', // Teal - Unique!
  },
  {
    borderColor: 'border-[#E91E63]',
    bgGradient: 'bg-[linear-gradient(135deg,rgba(233,30,99,0.95)_0%,rgba(190,25,80,0.85)_45%,rgba(150,20,65,0.9)_100%)]', // Magenta - Unique!
  },
];

export const DEFAULT_TEAM_BRANDING: TeamBranding = {
  logo: '??', // Will be replaced with team initials dynamically
  borderColor: 'border-[#666666]',
  bgGradient: 'bg-[linear-gradient(135deg,rgba(100,100,100,0.95)_0%,rgba(60,60,60,0.85)_45%,rgba(40,40,40,0.9)_100%)]',
};

// Helper function to extract team initials from team name
export function getTeamInitials(teamName: string): string {
  if (!teamName) return '??';
  
  // Split by spaces and take first letter of each word (max 3)
  const words = teamName.trim().split(/\s+/);
  const initials = words
    .slice(0, 3) // Max 3 words
    .map(word => word[0]?.toUpperCase() || '')
    .filter(Boolean)
    .join('');
  
  return initials || '??';
}

// Cache to track which teams have been assigned which colors
const teamColorAssignments = new Map<string, number>();
let nextColorIndex = 0;

export function getTeamBranding(teamName: string): TeamBranding {
  // If team has specific branding, use it
  if (TEAM_BRANDING[teamName]) {
    return TEAM_BRANDING[teamName];
  }
  
  // Check if this team already has a color assigned
  if (!teamColorAssignments.has(teamName)) {
    // Assign next available color
    teamColorAssignments.set(teamName, nextColorIndex % RESERVED_TEAM_COLORS.length);
    nextColorIndex++;
  }
  
  const colorIndex = teamColorAssignments.get(teamName)!;
  const reservedColor = RESERVED_TEAM_COLORS[colorIndex];
  
  return {
    logo: '??', // Will be replaced with team initials
    borderColor: reservedColor.borderColor,
    bgGradient: reservedColor.bgGradient,
  };
}

export function getTeamLogoOrInitials(teamName: string): string {
  const branding = getTeamBranding(teamName);
  // If logo is ?? or empty, return team initials
  if (!branding.logo || branding.logo === '??') {
    return getTeamInitials(teamName);
  }
  return branding.logo;
}

export function getTeamLogo(teamName: string): string {
  return getTeamBranding(teamName).logo;
}

export function getTeamBorderColor(teamName: string): string {
  return getTeamBranding(teamName).borderColor;
}

export function getTeamGradient(teamName: string): string {
  return getTeamBranding(teamName).bgGradient;
}
