import { useState, useEffect, useCallback } from "react";
import { apiRequest } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

export function useCrud<T extends { id?: number }>(endpoint: string) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const result = await apiRequest<T[]>(endpoint);
      setData(result);
    } catch (err) {
      toast({ title: "Erreur", description: String(err), variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }, [endpoint, toast]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const create = async (item: Partial<T>) => {
    await apiRequest<T>(endpoint, { method: "POST", body: item });
    toast({ title: "Succès", description: "Élément créé" });
    fetchData();
  };

  const update = async (id: number, item: Partial<T>) => {
    await apiRequest<T>(`${endpoint}${id}/`, { method: "PUT", body: item });
    toast({ title: "Succès", description: "Élément modifié" });
    fetchData();
  };

  const remove = async (id: number) => {
    await apiRequest(`${endpoint}${id}/`, { method: "DELETE" });
    toast({ title: "Succès", description: "Élément supprimé" });
    fetchData();
  };

  return { data, loading, create, update, remove, refresh: fetchData };
}
