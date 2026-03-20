import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/lib/auth";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AlertsPage from "./pages/AlertsPage";
import SitesPage from "./pages/SitesPage";
import EquipementsPage from "./pages/EquipementsPage";
import CompteursPage from "./pages/CompteursPage";
import EvenementsPage from "./pages/EvenementsPage";
import FacturesPage from "./pages/FacturesPage";
import FournisseursPage from "./pages/FournisseursPage";
import HistoriquePage from "./pages/HistoriquePage";
import UtilisateursPage from "./pages/UtilisateursPage";
import ProfilPage from "./pages/ProfilPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { authenticated, loading } = useAuth();
  if (loading) return null;
  if (!authenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { authenticated, loading } = useAuth();
  if (loading) return null;
  if (authenticated) return <Navigate to="/" replace />;
  return <>{children}</>;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
            <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/alertes" element={<ProtectedRoute><AlertsPage /></ProtectedRoute>} />
            <Route path="/sites" element={<ProtectedRoute><SitesPage /></ProtectedRoute>} />
            <Route path="/equipements" element={<ProtectedRoute><EquipementsPage /></ProtectedRoute>} />
            <Route path="/compteurs" element={<ProtectedRoute><CompteursPage /></ProtectedRoute>} />
            <Route path="/evenements" element={<ProtectedRoute><EvenementsPage /></ProtectedRoute>} />
            <Route path="/factures" element={<ProtectedRoute><FacturesPage /></ProtectedRoute>} />
            <Route path="/fournisseurs" element={<ProtectedRoute><FournisseursPage /></ProtectedRoute>} />
            <Route path="/historique" element={<ProtectedRoute><HistoriquePage /></ProtectedRoute>} />
            <Route path="/utilisateurs" element={<ProtectedRoute><UtilisateursPage /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
