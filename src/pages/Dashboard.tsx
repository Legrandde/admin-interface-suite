import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, MapPin, Box, Zap, FileText, Truck, Users, BarChart3 } from "lucide-react";
import { useCrud } from "@/hooks/useCrud";

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ElementType;
  loading: boolean;
}

function StatCard({ title, value, icon: Icon, loading }: StatCardProps) {
  return (
    <Card className="border border-border shadow-none hover:shadow-sm transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-semibold text-foreground">
          {loading ? "—" : value}
        </div>
      </CardContent>
    </Card>
  );
}

const Dashboard = () => {
  const alerts = useCrud("/alert/");
  const sites = useCrud("/site/");
  const equipements = useCrud("/equipement/");
  const compteurs = useCrud("/compteur/");
  const factures = useCrud("/facture/");
  const fournisseurs = useCrud("/fournisseur/");
  const utilisateurs = useCrud("/utilisateur/");
  const historique = useCrud("/historiqueConsomatin/");

  const stats = [
    { title: "Alertes", value: alerts.data.length, icon: Bell, loading: alerts.loading },
    { title: "Sites", value: sites.data.length, icon: MapPin, loading: sites.loading },
    { title: "Équipements", value: equipements.data.length, icon: Box, loading: equipements.loading },
    { title: "Compteurs", value: compteurs.data.length, icon: Zap, loading: compteurs.loading },
    { title: "Factures", value: factures.data.length, icon: FileText, loading: factures.loading },
    { title: "Fournisseurs", value: fournisseurs.data.length, icon: Truck, loading: fournisseurs.loading },
    { title: "Utilisateurs", value: utilisateurs.data.length, icon: Users, loading: utilisateurs.loading },
    { title: "Historique", value: historique.data.length, icon: BarChart3, loading: historique.loading },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Dashboard</h1>
          <p className="text-sm text-muted-foreground">Vue d'ensemble de votre écosystème</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <StatCard key={stat.title} {...stat} />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
