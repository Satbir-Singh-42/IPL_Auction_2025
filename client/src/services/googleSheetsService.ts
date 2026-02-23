import Papa from "papaparse";
import {
  getTeamLogo,
  getTeamBorderColor,
  getTeamGradient,
} from "@/config/teamBranding";

// Convert Google Sheets URL to CSV export URL
const SHEET_ID = "1fyX373d3bUhnBGoZuM_eQxy991hSajyZjIuVgByg-7g";
const BASE_CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=`;
const BACKUP_CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&gid=`;

export interface Player {
  name: string;
  team: string;
  role: string;
  nation: string;
  age?: number;
  basePrice: number;
  soldPrice: number;
  status: "sold" | "unsold";
  overseas: boolean;
  points?: number;
  originalIndex?: number;
  images?: string;
  t20Matches?: number;
  isUnsold?: boolean;
}

export interface Team {
  id: string;
  name: string;
  logo: string;
  fundsRemaining: number;
  overseasPlayers: number;
  totalPlayers: number;
  borderColor: string;
  bgGradient: string;
}

export interface TeamStats {
  teamId: string;
  teamName: string;
  totalSpent: number;
  playersCount: number;
  overseasCount: number;
  fundsRemaining: number;
  totalPoints: number;
  startingBudget: number;
}

class GoogleSheetsService {
  private playerDataCache: Player[] | null = null;
  private teamStatsCache: TeamStats[] | null = null;
  private playerCacheTimestamp: number = 0;
  private teamCacheTimestamp: number = 0;
  private readonly CACHE_DURATION = 5000; // 5 seconds

  // In-flight request tracking to prevent duplicate fetches
  private playerFetchPromise: Promise<Player[]> | null = null;
  private teamFetchPromise: Promise<TeamStats[]> | null = null;

  private async fetchCSVData(
    identifier: string = "0",
    sheetName: string = "Unknown",
    useSheetName: boolean = false,
  ): Promise<any[]> {
    try {
      let csvUrl: string;

      if (useSheetName) {
        // Use sheet name approach (preferred for named sheets)
        const encodedSheetName = encodeURIComponent(identifier);
        csvUrl = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${encodedSheetName}`;
      } else {
        // Use GID approach (for Players Catalogue)
        csvUrl = `${BASE_CSV_URL}${identifier}`;
      }

      let response = await fetch(csvUrl);

      // Try backup URL if first fails and we're using GID
      if (!response.ok && !useSheetName) {
        response = await fetch(`${BACKUP_CSV_URL}${identifier}`);
      }

      if (!response.ok) {
        return [];
      }

      const csvText = await response.text();

      // Check if we got HTML (redirect/error) instead of CSV
      if (
        csvText.trim().startsWith("<HTML>") ||
        csvText.trim().startsWith("<!DOCTYPE")
      ) {
        return [];
      }

      return new Promise((resolve, reject) => {
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            resolve(results.data);
          },
          error: (error: any) => {
            reject(error);
          },
        });
      });
    } catch (error) {
      return [];
    }
  }

  private normalizeHeader(header: string): string {
    // Remove emojis, rupee symbols, extra spaces, and normalize
    return header
      .replace(/[✅🏆🔽❌₹]/g, "") // Remove emojis and rupee symbol
      .replace(/[()]/g, "") // Remove parentheses
      .trim()
      .toLowerCase()
      .replace(/\s+/g, " "); // Normalize spaces
  }

  async getPlayers(): Promise<Player[]> {
    // Return cached data if still valid
    if (
      this.playerDataCache &&
      Date.now() - this.playerCacheTimestamp < this.CACHE_DURATION
    ) {
      return this.playerDataCache;
    }

    // If a fetch is already in progress, return that promise instead of starting a new one
    if (this.playerFetchPromise) {
      return this.playerFetchPromise;
    }

    // Start a new fetch and track the promise
    this.playerFetchPromise = this.fetchPlayersData();

    try {
      const result = await this.playerFetchPromise;
      return result;
    } finally {
      // Clear the in-flight promise once complete
      this.playerFetchPromise = null;
    }
  }

  private async fetchPlayersData(): Promise<Player[]> {
    // First, get the base player data from Players Catalogue
    const catalogueData = await this.fetchCSVData("0", "Players Catalogue");

    // Then, get auction results from Auctioneer Sheet
    const auctionData = await this.fetchCSVData(
      "Auctioneer Sheet",
      "Auctioneer Sheet",
      true,
    );

    // Create a map of auction results by player name with flexible column matching
    const auctionMap = new Map();

    // Only process real auction data from the actual Google Sheet
    if (auctionData.length > 0) {
      auctionData.forEach((row: any) => {
        // Find player name column (flexible matching)
        const playerNameKey = Object.keys(row).find((key) =>
          this.normalizeHeader(key).includes("player name"),
        );
        const playerName = playerNameKey ? row[playerNameKey]?.trim() : "";

        if (playerName) {
          // Find other columns flexibly
          const finalBidKey = Object.keys(row).find((key) =>
            this.normalizeHeader(key).includes("final bid price"),
          );
          const boughtByKey = Object.keys(row).find((key) =>
            this.normalizeHeader(key).includes("bought by"),
          );
          const statusKey = Object.keys(row).find((key) =>
            this.normalizeHeader(key).includes("status"),
          );
          const pointsKey = Object.keys(row).find((key) =>
            this.normalizeHeader(key).includes("points"),
          );

          auctionMap.set(playerName, {
            finalBidPrice: this.cleanPrice(
              finalBidKey ? row[finalBidKey] || "0" : "0",
            ),
            boughtBy: boughtByKey ? row[boughtByKey] || "" : "",
            status: this.parseAuctionStatus(
              statusKey ? row[statusKey] || "" : "",
            ),
            points: parseInt(pointsKey ? row[pointsKey] || "0" : "0") || 0,
          });
        }
      });
    }

    const players = catalogueData
      .map((row: any, index: number) => {
        const playerName = (row["Player Name"] || "").trim();
        const country = row["Country"] || "";
        const isOverseas = country && country.toLowerCase() !== "india";

        // Get auction result for this player
        const auctionResult = auctionMap.get(playerName);
        const finalBidPrice = auctionResult?.finalBidPrice || 0;
        const team = auctionResult?.boughtBy || "";
        const statusFromSheet = auctionResult?.status || "unsold";
        const playerPoints = auctionResult?.points || 0;

        // Determine final status: if no final bid price or team, definitely unsold
        let finalStatus: "sold" | "unsold";
        if (finalBidPrice > 0 && team.trim() !== "") {
          finalStatus = "sold";
        } else if (finalBidPrice === 0 || team.trim() === "") {
          finalStatus = "unsold";
        } else {
          finalStatus = statusFromSheet;
        }

        return {
          name: playerName,
          team: team,
          role: row["Role"] || "",
          nation: country || (isOverseas ? "Unknown" : "India"),
          age: parseInt(row["Age"] || "0") || undefined,
          basePrice: this.cleanPrice(row["Base Prize"] || "0"),
          soldPrice: finalBidPrice,
          status: finalStatus,
          overseas: isOverseas,
          points: parseInt(row["Evaluation Points"] || "0") || 0,
          originalIndex: index,
          images: row["Images"] || "",
          t20Matches: parseInt(row["T20 Matches"] || "0") || undefined,
        };
      })
      .filter((player) => player.name);

    // Cache the results
    this.playerDataCache = players;
    this.playerCacheTimestamp = Date.now();

    return players;
  }

  private cleanPrice(price: string): number {
    if (!price) return 0;
    return parseFloat(price.toString().replace(/[₹,]/g, "")) || 0;
  }

  private parseAuctionStatus(status: string): "sold" | "unsold" {
    if (!status) return "unsold";
    const statusLower = status.toLowerCase();

    // Check for unsold indicators first (more specific)
    if (statusLower.includes("unsold") || statusLower.includes("❌")) {
      return "unsold";
    }

    // Check for sold indicators
    if (
      statusLower.includes("sold") ||
      statusLower.includes("✅") ||
      statusLower.includes("🏆") ||
      statusLower.includes("🔽")
    ) {
      return "sold";
    }

    return "unsold";
  }

  async getTeamStats(): Promise<TeamStats[]> {
    // Return cached data if still valid
    if (
      this.teamStatsCache &&
      Date.now() - this.teamCacheTimestamp < this.CACHE_DURATION
    ) {
      return this.teamStatsCache;
    }

    // If a fetch is already in progress, return that promise instead of starting a new one
    if (this.teamFetchPromise) {
      return this.teamFetchPromise;
    }

    // Start a new fetch and track the promise
    this.teamFetchPromise = this.fetchTeamStatsData();

    try {
      const result = await this.teamFetchPromise;
      return result;
    } finally {
      // Clear the in-flight promise once complete
      this.teamFetchPromise = null;
    }
  }

  private async fetchTeamStatsData(): Promise<TeamStats[]> {
    const teamBudgetData = await this.fetchCSVData(
      "Teams & Budget",
      "Teams & Budget",
      true,
    );

    let teamStats: TeamStats[];

    if (teamBudgetData.length > 0) {
      // Parse real team data with flexible column matching
      teamStats = teamBudgetData
        .map((row: any) => {
          // Find columns flexibly based on the actual sheet structure
          const teamNameKey = Object.keys(row).find((key) =>
            this.normalizeHeader(key).includes("team name"),
          );
          const totalSpentKey = Object.keys(row).find((key) =>
            this.normalizeHeader(key).includes("total spent"),
          );
          const remainingBudgetKey = Object.keys(row).find((key) =>
            this.normalizeHeader(key).includes("remaining budget"),
          );
          const totalPlayerKey = Object.keys(row).find((key) =>
            this.normalizeHeader(key).includes("total player"),
          );
          const foreignPlayersKey = Object.keys(row).find((key) =>
            this.normalizeHeader(key).includes("foreign players"),
          );

          const teamName = teamNameKey ? row[teamNameKey] || "" : "";
          const totalSpent = this.cleanPrice(
            totalSpentKey ? row[totalSpentKey] || "0" : "0",
          );
          const remainingBudget = this.cleanPrice(
            remainingBudgetKey ? row[remainingBudgetKey] || "0" : "0",
          );
          const totalPlayers =
            parseInt(totalPlayerKey ? row[totalPlayerKey] || "0" : "0") || 0;
          const foreignPlayers =
            parseInt(foreignPlayersKey ? row[foreignPlayersKey] || "0" : "0") ||
            0;

          const startingBudget = totalSpent + remainingBudget;

          return {
            teamId: this.getTeamId(teamName),
            teamName: teamName,
            totalSpent: totalSpent,
            playersCount: totalPlayers,
            overseasCount: foreignPlayers,
            fundsRemaining: remainingBudget,
            totalPoints: 0, // Will be calculated after getting player data
            startingBudget: startingBudget,
          };
        })
        .filter((team) => team.teamName);

      // Calculate team points by summing player points
      const players = await this.getPlayers();

      teamStats = teamStats.map((team) => {
        const teamPlayers = players.filter(
          (p) =>
            p.status === "sold" &&
            (p.team.toLowerCase().includes(team.teamName.toLowerCase()) ||
              p.team.toLowerCase().includes(team.teamId.toLowerCase())),
        );

        const totalPoints = teamPlayers.reduce(
          (sum, player) => sum + (player.points || 0),
          0,
        );

        return {
          ...team,
          totalPoints,
        };
      });
    } else {
      teamStats = [];
    }

    // Cache the results
    this.teamStatsCache = teamStats;
    this.teamCacheTimestamp = Date.now();

    return teamStats;
  }

  private getTeamId(teamName: string): string {
    // Convert team name to URL-friendly slug
    return teamName
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
  }

  async getLeaderboard(): Promise<TeamStats[]> {
    const teamStats = await this.getTeamStats();
    return teamStats.sort((a, b) => {
      // Primary sort: Total Team Points (highest first)
      if (a.totalPoints !== b.totalPoints) {
        return b.totalPoints - a.totalPoints;
      }

      // Secondary sort: If same points, compare remaining budget (highest first)
      if (a.fundsRemaining !== b.fundsRemaining) {
        return b.fundsRemaining - a.fundsRemaining;
      }

      // Tertiary sort: If same points and budget, alphabetical order
      return a.teamName.toLowerCase().localeCompare(b.teamName.toLowerCase());
    });
  }

  async getSoldPlayersByTeam(teamId: string): Promise<Player[]> {
    const players = await this.getPlayers();
    const teams = await this.getTeamConfigs();
    const team = teams.find((t: Team) => t.id === teamId);

    if (!team) return [];

    return players.filter(
      (p) =>
        p.status === "sold" &&
        (p.team.toLowerCase().includes(teamId.toLowerCase()) ||
          p.team.toLowerCase().includes(team.name.toLowerCase())),
    );
  }

  async getUnsoldPlayers(): Promise<Player[]> {
    const players = await this.getPlayers();
    return players.filter((p) => p.status === "unsold");
  }

  async getTeamConfigs(): Promise<Team[]> {
    try {
      const teamStats = await this.getTeamStats();

      return teamStats.map((stat) => ({
        id: stat.teamId,
        name: stat.teamName,
        logo: this.getTeamLogo(stat.teamName),
        fundsRemaining: stat.fundsRemaining,
        overseasPlayers: stat.overseasCount,
        totalPlayers: stat.playersCount,
        borderColor: this.getTeamBorderColor(stat.teamName),
        bgGradient: this.getTeamGradient(stat.teamName),
      }));
    } catch (error) {
      return [];
    }
  }

  clearCache(): void {
    this.playerDataCache = null;
    this.teamStatsCache = null;
    this.playerCacheTimestamp = 0;
    this.teamCacheTimestamp = 0;
  }

  getTeamLogo(teamName: string): string {
    // Use centralized branding configuration
    const logo = getTeamLogo(teamName);

    // If logo is the default placeholder, generate team initials
    if (logo === "??") {
      return teamName
        .split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase();
    }

    return logo;
  }

  getTeamBorderColor(teamName: string): string {
    return getTeamBorderColor(teamName);
  }

  getTeamGradient(teamName: string): string {
    return getTeamGradient(teamName);
  }

  getTeamInitials(teamName: string): string {
    if (!teamName) return "??";

    // Split by spaces and take first letter of each word (max 3)
    const words = teamName.trim().split(/\s+/);
    const initials = words
      .slice(0, 3) // Max 3 words
      .map((word) => word[0]?.toUpperCase() || "")
      .filter(Boolean)
      .join("");

    return initials || "??";
  }
}

export const googleSheetsService = new GoogleSheetsService();
