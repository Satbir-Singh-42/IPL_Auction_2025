# Team Branding Configuration Guide

This guide explains how to manage team logos, colors, and branding for the IPL 2025 Player Auction application.

## File Location
All team branding configuration is managed in: **`client/src/config/teamBranding.ts`**

## Adding a New Team

### Automatic Color Assignment ✨
**NEW**: Teams are now automatically assigned vibrant colors! When you add a team to the Google Sheet without configuring it in `teamBranding.ts`, the system will:
- **Automatically show team initials** (e.g., "Mumbai Indians" → "MI")
- **Auto-assign one of 5 vibrant colors** (Green, Orange, Purple, Cyan, or Red)
- **Consistently use the same color** for that team name

You only need to add configuration if you want custom colors or have a logo!

### Step 1: Add Team Configuration (Optional)
If you want custom colors/logo, add your team to the `TEAM_BRANDING` object in `teamBranding.ts`:

```typescript
'Your Team Name': {
  logo: '/images/teams/your-logo.png',  // Path to logo file
  borderColor: 'border-[#HEXCOLOR]',    // Border color
  bgGradient: 'bg-[linear-gradient(...)]', // Background gradient
},
```

**If you skip this step**, the system will automatically assign a vibrant color from the reserved palette!

### Step 2: Team Logo Management (Easy!)

#### Adding or Changing a Logo
**It's a simple 2-step process:**

1. **Upload your logo file** to: `/client/public/images/teams/`
   - Supported formats: `.jpg`, `.png`, `.webp`, `.jpeg`
   - Recommended: Square images (1:1 ratio) for best display
   
2. **Update the logo path** in `teamBranding.ts`:
   ```typescript
   'Your Team Name': {
     logo: '/images/teams/your-logo.png',  // Just change this path!
     // ... rest stays the same
   }
   ```

That's it! The logo will automatically appear everywhere.

#### Option B: Use Team Initials (No Logo)
1. If you don't have a logo yet, the system will automatically show team initials
2. The initials are extracted from the team name (e.g., "Mumbai Indians" → "MI")
3. Set: `logo: '??'` or leave empty

**How Initials Work:**
- Takes first letter of each word (max 3 words)
- Example: "Mumbai Indians" → "MI"
- Example: "Royal Challengers Bangalore" → "RCB"
- Initials appear in a gradient circle matching team colors

### Step 3: Choose Team Colors

#### Reserved Color Palette
We've reserved 5 unique vibrant color gradients for new teams. These colors are guaranteed NOT to conflict with any existing team colors:

**1. Emerald Green (Team 17):**
```typescript
borderColor: 'border-[#00C853]',
bgGradient: 'bg-[linear-gradient(135deg,rgba(0,200,83,0.95)_0%,rgba(0,160,65,0.85)_45%,rgba(0,120,50,0.9)_100%)]',
```

**2. Wine/Maroon (Team 18):**
```typescript
borderColor: 'border-[#880E4F]',
bgGradient: 'bg-[linear-gradient(135deg,rgba(136,14,79,0.95)_0%,rgba(110,10,65,0.85)_45%,rgba(85,8,50,0.9)_100%)]',
```

**3. Brown (Team 19):**
```typescript
borderColor: 'border-[#795548]',
bgGradient: 'bg-[linear-gradient(135deg,rgba(121,85,72,0.95)_0%,rgba(95,65,55,0.85)_45%,rgba(70,50,40,0.9)_100%)]',
```

**4. Teal (Team 20):**
```typescript
borderColor: 'border-[#009688]',
bgGradient: 'bg-[linear-gradient(135deg,rgba(0,150,136,0.95)_0%,rgba(0,120,110,0.85)_45%,rgba(0,90,85,0.9)_100%)]',
```

**5. Magenta (Team 21):**
```typescript
borderColor: 'border-[#E91E63]',
bgGradient: 'bg-[linear-gradient(135deg,rgba(233,30,99,0.95)_0%,rgba(190,25,80,0.85)_45%,rgba(150,20,65,0.9)_100%)]',
```

**Note:** These colors were specifically chosen to avoid conflicts with existing team colors (Blue, Red, Purple, Orange, Yellow, Pink, Gray, Cyan, Dark Blue).

#### Custom Colors
To create your own gradient:
```typescript
borderColor: 'border-[#YOUR_HEX]',
bgGradient: 'bg-[linear-gradient(135deg,rgba(R,G,B,0.95)_0%,rgba(R,G,B,0.85)_45%,rgba(R,G,B,0.9)_100%)]',
```

## Complete Example: Adding "Bangalore Blasters"

```typescript
'Bangalore Blasters': {
  logo: '??', // Will show "BB" as initials until logo is uploaded
  borderColor: 'border-[#00C853]', // Green from reserved colors
  bgGradient: 'bg-[linear-gradient(135deg,rgba(0,200,83,0.95)_0%,rgba(0,160,65,0.85)_45%,rgba(0,120,50,0.9)_100%)]',
},
```

Later, when you have a logo:
```typescript
'Bangalore Blasters': {
  logo: '/images/teams/bb.png', // Updated with actual logo
  borderColor: 'border-[#00C853]',
  bgGradient: 'bg-[linear-gradient(135deg,rgba(0,200,83,0.95)_0%,rgba(0,160,65,0.85)_45%,rgba(0,120,50,0.9)_100%)]',
},
```

## Key Features

✅ **Automatic Team Initials**: Teams without logos automatically show initials  
✅ **No More ??**: The system never displays "??" - it shows meaningful team initials  
✅ **Auto Color Assignment**: New teams automatically get unique vibrant colors (no more silver/gray!)  
✅ **5 Unique Color Palette**: Emerald Green, Wine/Maroon, Brown, Teal, Magenta - all with great contrast for white text!  
✅ **Easy Logo Updates**: Just add logo file and update path - no code changes needed  
✅ **Consistent Styling**: All teams use the same gradient pattern for visual harmony  
✅ **Zero Configuration**: Add team to Google Sheet and it works immediately with auto colors!

## Troubleshooting

**Q: My team shows ??**  
A: This is now automatically replaced with team initials. Check that the team name is correctly spelled.

**Q: How do I change team initials?**  
A: Initials are auto-generated from team name. To customize, change the team name or add a logo.

**Q: Logo not showing?**  
A: Verify the logo file exists in `/client/public/images/teams/` and the path is correct.

**Q: Want different colors?**  
A: Copy one of the 5 reserved color options or create your own gradient using the pattern above.
