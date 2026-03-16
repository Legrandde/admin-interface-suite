import { CrudPage } from "@/components/CrudPage";

interface Fournisseur {
  id?: number;
  nom: string;
  type: string;
}

const columns = [
  { key: "id", label: "ID" },
  { key: "nom", label: "Nom" },
  { key: "type", label: "Type" },
];

const formFields = [
  { key: "nom", label: "Nom", required: true },
  { key: "type", label: "Type", required: true },
];

const FournisseursPage = () => (
  <CrudPage<Fournisseur> title="Fournisseurs" endpoint="/fournisseur/" columns={columns} formFields={formFields} />
);

export default FournisseursPage;
