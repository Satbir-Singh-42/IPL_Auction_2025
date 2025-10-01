import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  googleSheetsService,
  TeamStats,
  Player,
} from "@/services/googleSheetsService";

export const useIPLData = () => {
  const {
    data: teamStats,
    isLoading: isLoadingTeams,
    error: teamsError,
    refetch: refetchTeams,
  } = useQuery({
    queryKey: ["teamStats"],
    queryFn: () => googleSheetsService.getTeamStats(),
    refetchInterval: 5000,
    staleTime: 2500,
  });

  const {
    data: players,
    isLoading: isLoadingPlayers,
    error: playersError,
    refetch: refetchPlayers,
  } = useQuery({
    queryKey: ["players"],
    queryFn: () => googleSheetsService.getPlayers(),
    refetchInterval: 5000,
    staleTime: 2500,
  });

  const {
    data: leaderboard,
    isLoading: isLoadingLeaderboard,
    error: leaderboardError,
    refetch: refetchLeaderboard,
  } = useQuery({
    queryKey: ["leaderboard"],
    queryFn: () => googleSheetsService.getLeaderboard(),
    refetchInterval: 5000,
    staleTime: 2500,
  });

  const getSoldPlayersByTeam = (teamId: string) => {
    return useQuery({
      queryKey: ["soldPlayers", teamId],
      queryFn: () => googleSheetsService.getSoldPlayersByTeam(teamId),
      enabled: !!teamId,
      refetchInterval: 5000,
      staleTime: 2500,
    });
  };

  const getUnsoldPlayers = () => {
    return useQuery({
      queryKey: ["unsoldPlayers"],
      queryFn: () => googleSheetsService.getUnsoldPlayers(),
      refetchInterval: 5000,
      staleTime: 2500,
    });
  };

  const refreshAllData = () => {
    refetchTeams();
    refetchPlayers();
    refetchLeaderboard();
  };

  return {
    teamStats,
    players,
    leaderboard,
    isLoading: isLoadingTeams || isLoadingPlayers || isLoadingLeaderboard,
    error: teamsError || playersError || leaderboardError,
    getSoldPlayersByTeam,
    getUnsoldPlayers,
    refreshAllData,
  };
};
