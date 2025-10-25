import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AnimatePresence } from "framer-motion";
import { PageTransition } from "@/components/PageTransition";
import NotFound from "@/pages/not-found";

import { ElementLight } from "@/pages/ElementLight";
import { TeamDashboard } from "@/pages/TeamDashboard";
import { TeamsListing } from "@/pages/TeamsListing";
import { PlayingXI } from "@/pages/PlayingXI";
import AuctionPage from "@/pages/AuctionPage";

function Router() {
  const [location] = useLocation();
  
  return (
    <AnimatePresence mode="wait" initial={false}>
      <PageTransition key={location}>
        <Switch location={location}>
          {/* Add pages below */}
          <Route path="/" component={ElementLight} />
          <Route path="/team" component={TeamsListing} />
          <Route path="/team/:teamId/playing-xi" component={PlayingXI} />
          <Route path="/team/:teamId" component={TeamDashboard} />
          <Route path="/auction" component={AuctionPage} />
          {/* Fallback to 404 */}
          <Route component={NotFound} />
        </Switch>
      </PageTransition>
    </AnimatePresence>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
