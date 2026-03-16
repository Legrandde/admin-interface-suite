import { CrudPage } from "@/components/CrudPage";
import { Badge } from "@/components/ui/badge";

interface Equipement {
  id?: number;
  nom: string;
  consommation?: number;
  etat?: number;
}

const columns = [
  { key: "id", label: "ID" },
  { key: "nom", label: "Nom" },
  { key: "consommation", label: "Consommation" },
  {
    key: "etat", label: "État",
    render: (item: Equipement) => (
      <Badge variant={item.etat === 1 ? "default" : "secondary"}>
        {item.etat === 1 ? "Actif" : "Inactif"}
      </Badge>
    ),
  },
];

const formFields = [
  { key: "nom", label: "Nom", required: true },
  { key: "consommation", label: "Consommation", type: "number" as const },
  { key: "etat", label: "État", type: "number" as const },
];

const EquipementsPage = () => (
  <CrudPage<Equipement> title="Équipements" endpoint="/equipement/" columns={columns} formFields={formFields} />
);

export default EquipementsPage;
