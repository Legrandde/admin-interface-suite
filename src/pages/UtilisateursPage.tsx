import { CrudPage } from "@/components/CrudPage";
import { Badge } from "@/components/ui/badge";

interface Utilisateur {
  id?: number;
  username: string;
  password: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  user_number: string;
  user_role: string;
  is_active?: boolean;
  date_joined?: string;
}

const columns = [
  { key: "id", label: "ID" },
  { key: "username", label: "Username" },
  { key: "first_name", label: "Prénom" },
  { key: "last_name", label: "Nom" },
  { key: "email", label: "Email" },
  { key: "user_number", label: "Numéro" },
  {
    key: "user_role", label: "Rôle",
    render: (item: Utilisateur) => (
      <Badge variant={item.user_role === "admin" ? "default" : "secondary"}>
        {item.user_role}
      </Badge>
    ),
  },
  {
    key: "is_active", label: "Actif",
    render: (item: Utilisateur) => (
      <Badge variant={item.is_active ? "default" : "outline"}>
        {item.is_active ? "Oui" : "Non"}
      </Badge>
    ),
  },
];

const formFields = [
  { key: "username", label: "Nom d'utilisateur", required: true },
  { key: "password", label: "Mot de passe", type: "password" as const, required: true },
  { key: "first_name", label: "Prénom" },
  { key: "last_name", label: "Nom" },
  { key: "email", label: "Email", type: "email" as const },
  { key: "user_number", label: "Numéro", required: true },
  {
    key: "user_role", label: "Rôle", type: "select" as const, required: true,
    options: [{ value: "admin", label: "Admin" }, { value: "client", label: "Client" }],
  },
];

const UtilisateursPage = () => (
  <CrudPage<Utilisateur> title="Utilisateurs" endpoint="/utilisateur/" columns={columns} formFields={formFields} />
);

export default UtilisateursPage;
