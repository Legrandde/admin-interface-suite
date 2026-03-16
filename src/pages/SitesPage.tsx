import { CrudPage } from "@/components/CrudPage";

interface Site {
  id?: number;
  nom: string;
  type?: string;
  utilisateur: number;
  compteur: number;
  equipements: number;
}

const columns = [
  { key: "id", label: "ID" },
  { key: "nom", label: "Nom" },
  { key: "type", label: "Type" },
  { key: "utilisateur", label: "Utilisateur" },
  { key: "compteur", label: "Compteur" },
  { key: "equipements", label: "Équipements" },
];

const formFields = [
  { key: "nom", label: "Nom", required: true },
  { key: "type", label: "Type" },
  { key: "utilisateur", label: "Utilisateur (ID)", type: "number" as const, required: true },
  { key: "compteur", label: "Compteur (ID)", type: "number" as const, required: true },
  { key: "equipements", label: "Équipements (ID)", type: "number" as const, required: true },
];

const SitesPage = () => (
  <CrudPage<Site> title="Sites" endpoint="/site/" columns={columns} formFields={formFields} />
);

export default SitesPage;
