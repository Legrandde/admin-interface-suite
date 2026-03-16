import { CrudPage } from "@/components/CrudPage";

interface Facture {
  id?: number;
  monatant?: string;
  quantite?: string;
  mode_payement: string;
  date_paiement?: string;
  compteur: number;
}

const columns = [
  { key: "id", label: "ID" },
  { key: "monatant", label: "Montant" },
  { key: "quantite", label: "Quantité" },
  { key: "mode_payement", label: "Mode paiement" },
  { key: "date_paiement", label: "Date", render: (item: Facture) => item.date_paiement ? new Date(item.date_paiement).toLocaleDateString("fr-FR") : "—" },
  { key: "compteur", label: "Compteur" },
];

const formFields = [
  { key: "monatant", label: "Montant" },
  { key: "quantite", label: "Quantité" },
  { key: "mode_payement", label: "Mode paiement", required: true },
  { key: "compteur", label: "Compteur (ID)", type: "number" as const, required: true },
];

const FacturesPage = () => (
  <CrudPage<Facture> title="Factures" endpoint="/facture/" columns={columns} formFields={formFields} />
);

export default FacturesPage;
