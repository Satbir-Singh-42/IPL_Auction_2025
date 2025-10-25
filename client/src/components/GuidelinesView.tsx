import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const GuidelinesView = (): JSX.Element => {
  return (
    <div className="w-full space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-gradient-to-br from-[#1a1f3a]/90 to-[#0a0e1a]/90 border-[#90b6ff]/30">
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl font-bold text-white text-center">
              IPL 2025 Player Auction Dashboard - Guidelines
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5 text-white/90">
            {/* Introduction */}
            <div>
              <p className="text-base leading-relaxed">
                Real-time IPL 2025 player auction tracking with live updates. 
                View team budgets, player stats, and leaderboard rankings instantly.
              </p>
            </div>

            <Separator className="bg-white/20" />

            {/* Navigation Guide */}
            <div>
              <h3 className="text-lg font-semibold text-[#fe6804] mb-3">
                Navigation
              </h3>
              <div className="space-y-3 text-sm">
                <div>
                  <h4 className="font-semibold text-white mb-1">OVERVIEW</h4>
                  <p className="ml-3 text-white/80">Team cards with rankings, budgets, and player counts. Click any team for details.</p>
                </div>

                <div>
                  <h4 className="font-semibold text-white mb-1">SOLD PLAYERS</h4>
                  <p className="ml-3 text-white/80">All purchased players with filtering, search, and sortable columns.</p>
                </div>

                <div>
                  <h4 className="font-semibold text-white mb-1">UNSOLD PLAYERS</h4>
                  <p className="ml-3 text-white/80">Available players with base prices and detailed information.</p>
                </div>

                <div>
                  <h4 className="font-semibold text-white mb-1">LEADERBOARD</h4>
                  <p className="ml-3 text-white/80">Complete team rankings with circular rank indicators and sortable stats.</p>
                </div>

                <div>
                  <h4 className="font-semibold text-white mb-1">PLAYING XI</h4>
                  <p className="ml-3 text-white/80">Select your team's best 11 players from the team dashboard. Download validated lineups as CSV.</p>
                </div>
              </div>
            </div>

            <Separator className="bg-white/20" />

            {/* Playing XI Rules */}
            <div>
              <h3 className="text-lg font-semibold text-[#fe6804] mb-3">
                Playing XI Rules
              </h3>
              <ul className="space-y-1.5 text-sm list-disc list-inside text-white/80">
                <li>Exactly 11 players required</li>
                <li>Batsmen: 2-5 players</li>
                <li>Wicket-Keepers: 1-3 players (at least 1 required)</li>
                <li>All-Rounders: at least 1</li>
                <li>Bowlers: at least 2</li>
                <li>Foreign players: maximum 4 in playing XI</li>
                <li>Download CSV only when lineup is valid</li>
              </ul>
            </div>

            <Separator className="bg-white/20" />

            {/* IPL Auction Rules */}
            <div>
              <h3 className="text-lg font-semibold text-[#fe6804] mb-3">
                Auction Rules
              </h3>
              <ul className="space-y-1.5 text-sm list-disc list-inside text-white/80">
                <li>₹1,00,000 budget per team (controlled by admin)</li>
                <li>15 players per squad</li>
                <li>Max 7 foreign players (4 in playing XI)</li>
                <li>Live bidding with base price and categories</li>
              </ul>
            </div>

            <Separator className="bg-white/20" />

            {/* Features */}
            <div>
              <h3 className="text-lg font-semibold text-[#fe6804] mb-3">
                Features
              </h3>
              <ul className="space-y-1.5 text-sm list-disc list-inside text-white/80">
                <li>Auto-refresh every 5 seconds</li>
                <li>Responsive design for all devices</li>
                <li>Advanced search and filtering</li>
                <li>Player detail modals</li>
              </ul>
            </div>

            <Separator className="bg-white/20" />

            {/* Credits Section */}
            <div className="pt-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="bg-gradient-to-br from-[#0b2a7d]/50 to-[#18184a]/50 p-8 rounded-lg border-2 border-[#fe6804]/30"
              >
                <div className="flex flex-col items-center justify-center space-y-4">
                  <h3 className="text-2xl font-bold text-[#fe6804] text-center">
                    Credits
                  </h3>
                  
                  <div className="flex items-center justify-center gap-4">
                    <img 
                      src="/images/iste-logo.webp" 
                      alt="ISTE Logo" 
                      className="w-20 h-20 md:w-24 md:h-24 object-contain"
                    />
                  </div>
                  
                  <p className="text-xl font-semibold text-white text-center">
                    Made by
                  </p>
                  
                  <p className="text-2xl font-bold text-white text-center">
                    Indian Society for Technical Education
                  </p>
                </div>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};
