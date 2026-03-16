import { CrudPage } from "@/components/CrudPage";

interface HistoriqueConsomation {
  id?: number;
  site: number;
  consommation: number;
  datej_debut: string;
  date_fin: string;
  equipement: number;
  compter: number;
}

const columns = [
  { key: "id", label: "ID" },
  { key: "site", label: "Site" },
  { key: "consommation", label: "Consommation" },
  { key: "datej_debut", label: "Début", render: (item: HistoriqueConsomation) => new Date(item.datej_debut).toLocaleDateString("fr-FR") },
  { key: "date_fin", label: "Fin", render: (item: HistoriqueConsomation) => new Date(item.date_fin).toLocaleDateString("fr-FR") },
  { key: "equipement", label: "Équipement" },
  { key: "compter", label: "Compteur" },
];

const formFields = [
  { key: "site", label: "Site (ID)", type: "number" as const, required: true },
  { key: "consommation", label: "Consommation", type: "number" as const, required: true },
  { key: "datej_debut", label: "Date début", type: "datetime" as const, required: true },
  { key: "date_fin", label: "Date fin", type: "datetime" as const, required: true },
  { key: "equipement", label: "Équipement (ID)", type: "number" as const, required: true },
  { key: "compter", label: "Compteur (ID)", type: "number" as const, required: true },
];

const HistoriquePage = () => (
  <CrudPage<HistoriqueConsomation> title="Historique Consommation" endpoint="/historiqueConsomatin/" columns={columns} formFields={formFields} />
);

export default HistoriquePage;
