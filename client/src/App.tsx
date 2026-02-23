import { lazy, Suspense } from "react";
import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AnimatePresence } from "framer-motion";
import { PageTransition } from "@/components/PageTransition";
import { LoadingPage } from "@/components/LoadingPage";
import NotFound from "@/pages/not-found";

// Lazy-loaded pages for code splitting
const ElementLight = lazy(() =>
  import("@/pages/ElementLight").then((m) => ({ default: m.ElementLight })),
);
const TeamDashboard = lazy(() =>
  import("@/pages/TeamDashboard").then((m) => ({ default: m.TeamDashboard })),
);
const TeamsListing = lazy(() =>
  import("@/pages/TeamsListing").then((m) => ({ default: m.TeamsListing })),
);
const PlayingXI = lazy(() =>
  import("@/pages/PlayingXI").then((m) => ({ default: m.PlayingXI })),
);
const AuctionPage = lazy(() => import("@/pages/AuctionPage"));

function Router() {
  const [location] = useLocation();

  return (
    <Suspense fallback={<LoadingPage />}>
      <AnimatePresence mode="wait" initial={false}>
        <PageTransition key={location}>
          <Switch location={location}>
            <Route path="/" component={ElementLight} />
            <Route path="/team" component={TeamsListing} />
            <Route path="/team/:teamId/playing-xi" component={PlayingXI} />
            <Route path="/team/:teamId" component={TeamDashboard} />
            <Route path="/auction" component={AuctionPage} />
            <Route component={NotFound} />
          </Switch>
        </PageTransition>
      </AnimatePresence>
    </Suspense>
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
