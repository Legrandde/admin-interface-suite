import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { DataTable, Column } from "@/components/DataTable";
import { EntityFormDialog, FormField } from "@/components/EntityFormDialog";
import { useCrud } from "@/hooks/useCrud";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

interface CrudPageProps<T extends { id?: number }> {
  title: string;
  endpoint: string;
  columns: Column<T>[];
  formFields: FormField[];
}

export function CrudPage<T extends { id?: number }>({ title, endpoint, columns, formFields }: CrudPageProps<T>) {
  const { data, loading, create, update, remove } = useCrud<T>(endpoint);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editItem, setEditItem] = useState<T | null>(null);
  const [deleteItem, setDeleteItem] = useState<T | null>(null);

  const handleAdd = () => {
    setEditItem(null);
    setDialogOpen(true);
  };

  const handleEdit = (item: T) => {
    setEditItem(item);
    setDialogOpen(true);
  };

  const handleSubmit = async (formData: Record<string, unknown>) => {
    if (editItem?.id) {
      await update(editItem.id, formData as Partial<T>);
    } else {
      await create(formData as Partial<T>);
    }
  };

  const handleDelete = async () => {
    if (deleteItem?.id) {
      await remove(deleteItem.id);
      setDeleteItem(null);
    }
  };

  return (
    <DashboardLayout>
      <DataTable
        title={title}
        columns={columns}
        data={data}
        loading={loading}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={(item) => setDeleteItem(item)}
      />

      <EntityFormDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSubmit={handleSubmit}
        title={editItem ? `Modifier ${title}` : `Ajouter ${title}`}
        fields={formFields}
        initialData={editItem as Record<string, unknown> | undefined}
      />

      <AlertDialog open={!!deleteItem} onOpenChange={(v) => !v && setDeleteItem(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
            <AlertDialogDescription>Cette action est irréversible.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  );
}
