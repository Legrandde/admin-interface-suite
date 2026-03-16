import { CrudPage } from "@/components/CrudPage";

interface Compteur {
  id?: number;
  credit?: number;
  quantite_energy?: number;
  type: string;
  utilisateur: number;
  fournisseur: number;
}

const columns = [
  { key: "id", label: "ID" },
  { key: "type", label: "Type" },
  { key: "credit", label: "Crédit" },
  { key: "quantite_energy", label: "Énergie (qté)" },
  { key: "utilisateur", label: "Utilisateur" },
  { key: "fournisseur", label: "Fournisseur" },
];

const formFields = [
  { key: "type", label: "Type", required: true },
  { key: "credit", label: "Crédit", type: "number" as const },
  { key: "quantite_energy", label: "Quantité énergie", type: "number" as const },
  { key: "utilisateur", label: "Utilisateur (ID)", type: "number" as const, required: true },
  { key: "fournisseur", label: "Fournisseur (ID)", type: "number" as const, required: true },
];

const CompteursPage = () => (
  <CrudPage<Compteur> title="Compteurs" endpoint="/compteur/" columns={columns} formFields={formFields} />
);

export default CompteursPage;
