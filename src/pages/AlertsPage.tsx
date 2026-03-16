import { CrudPage } from "@/components/CrudPage";
import { Badge } from "@/components/ui/badge";

interface Alert {
  id?: number;
  message: string;
  niveau: string;
  date?: string;
  status: string;
  site: number;
  equipement: number;
}

const columns = [
  { key: "id", label: "ID" },
  { key: "message", label: "Message" },
  {
    key: "niveau", label: "Niveau",
    render: (item: Alert) => (
      <Badge variant={item.niveau === "critique" ? "destructive" : "secondary"}>
        {item.niveau}
      </Badge>
    ),
  },
  {
    key: "status", label: "Statut",
    render: (item: Alert) => (
      <Badge variant={item.status === "actif" ? "default" : "outline"}>
        {item.status}
      </Badge>
    ),
  },
  { key: "date", label: "Date", render: (item: Alert) => item.date ? new Date(item.date).toLocaleDateString("fr-FR") : "—" },
  { key: "site", label: "Site" },
  { key: "equipement", label: "Équipement" },
];

const formFields = [
  { key: "message", label: "Message", required: true },
  { key: "niveau", label: "Niveau", required: true },
  { key: "status", label: "Statut", required: true },
  { key: "site", label: "Site (ID)", type: "number" as const, required: true },
  { key: "equipement", label: "Équipement (ID)", type: "number" as const, required: true },
];

const AlertsPage = () => (
  <CrudPage<Alert> title="Alertes" endpoint="/alert/" columns={columns} formFields={formFields} />
);

export default AlertsPage;
