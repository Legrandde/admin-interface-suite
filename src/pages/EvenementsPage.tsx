import { CrudPage } from "@/components/CrudPage";

interface Evenement {
  id?: number;
  type: string;
  date_evenement?: string;
  equipement: number;
}

const columns = [
  { key: "id", label: "ID" },
  { key: "type", label: "Type" },
  { key: "date_evenement", label: "Date", render: (item: Evenement) => item.date_evenement ? new Date(item.date_evenement).toLocaleDateString("fr-FR") : "—" },
  { key: "equipement", label: "Équipement" },
];

const formFields = [
  { key: "type", label: "Type", required: true },
  { key: "equipement", label: "Équipement (ID)", type: "number" as const, required: true },
];

const EvenementsPage = () => (
  <CrudPage<Evenement> title="Événements" endpoint="/evenement/" columns={columns} formFields={formFields} />
);

export default EvenementsPage;
