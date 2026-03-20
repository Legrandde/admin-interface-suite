import { useState, useMemo } from "react";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, Trash2, Plus, Loader2, Search, X } from "lucide-react";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

export interface Column<T> {
  key: keyof T | string;
  label: string;
  render?: (item: T) => React.ReactNode;
  filterable?: boolean;
}

interface DataTableProps<T extends { id?: number }> {
  title: string;
  columns: Column<T>[];
  data: T[];
  loading: boolean;
  onAdd?: () => void;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
}

export function DataTable<T extends { id?: number }>({
  title, columns, data, loading, onAdd, onEdit, onDelete,
}: DataTableProps<T>) {
  const [search, setSearch] = useState("");
  const [filterCol, setFilterCol] = useState<string>("__all__");
  const [filterValue, setFilterValue] = useState("");

  const filterableColumns = columns.filter((c) => c.filterable !== false && !c.render);

  const filterOptions = useMemo(() => {
    if (filterCol === "__all__") return [];
    const vals = new Set<string>();
    data.forEach((item) => {
      const v = (item as Record<string, unknown>)[filterCol];
      if (v != null && v !== "") vals.add(String(v));
    });
    return Array.from(vals).sort();
  }, [data, filterCol]);

  const filteredData = useMemo(() => {
    let result = data;
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((item) =>
        columns.some((col) => {
          const v = (item as Record<string, unknown>)[String(col.key)];
          return v != null && String(v).toLowerCase().includes(q);
        })
      );
    }
    if (filterCol !== "__all__" && filterValue) {
      result = result.filter((item) => {
        const v = (item as Record<string, unknown>)[filterCol];
        return v != null && String(v) === filterValue;
      });
    }
    return result;
  }, [data, search, filterCol, filterValue, columns]);

  const hasActiveFilters = search.trim() || filterValue;

  const clearFilters = () => {
    setSearch("");
    setFilterCol("__all__");
    setFilterValue("");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-foreground">{title}</h1>
          <p className="text-sm text-muted-foreground">
            {filteredData.length}{filteredData.length !== data.length ? ` / ${data.length}` : ""} élément(s)
          </p>
        </div>
        {onAdd && (
          <Button onClick={onAdd} size="sm">
            <Plus className="h-4 w-4 mr-1" /> Ajouter
          </Button>
        )}
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-9"
          />
        </div>
        {filterableColumns.length > 0 && (
          <>
            <Select value={filterCol} onValueChange={(v) => { setFilterCol(v); setFilterValue(""); }}>
              <SelectTrigger className="w-40 h-9">
                <SelectValue placeholder="Filtrer par…" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="__all__">Tous les champs</SelectItem>
                {filterableColumns.map((col) => (
                  <SelectItem key={String(col.key)} value={String(col.key)}>
                    {col.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {filterCol !== "__all__" && filterOptions.length > 0 && (
              <Select value={filterValue} onValueChange={setFilterValue}>
                <SelectTrigger className="w-40 h-9">
                  <SelectValue placeholder="Valeur…" />
                </SelectTrigger>
                <SelectContent>
                  {filterOptions.map((opt) => (
                    <SelectItem key={opt} value={opt}>
                      {opt}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </>
        )}
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={clearFilters} className="h-9 px-2 text-muted-foreground">
            <X className="h-4 w-4 mr-1" /> Effacer
          </Button>
        )}
      </div>

      <div className="rounded-lg border border-border bg-card overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : filteredData.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
            <p className="text-sm">
              {data.length === 0 ? "Aucune donnée disponible" : "Aucun résultat pour cette recherche"}
            </p>
            {hasActiveFilters && (
              <Button variant="link" size="sm" onClick={clearFilters} className="mt-2">
                Effacer les filtres
              </Button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  {columns.map((col) => (
                    <TableHead key={String(col.key)} className="text-xs font-medium uppercase tracking-wider">
                      {col.label}
                    </TableHead>
                  ))}
                  {(onEdit || onDelete) && <TableHead className="w-24" />}
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((item, i) => (
                  <TableRow key={item.id ?? i} className="hover:bg-muted/30 transition-colors">
                    {columns.map((col) => (
                      <TableCell key={String(col.key)} className="text-sm">
                        {col.render
                          ? col.render(item)
                          : String((item as Record<string, unknown>)[String(col.key)] ?? "—")}
                      </TableCell>
                    ))}
                    {(onEdit || onDelete) && (
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {onEdit && (
                            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onEdit(item)}>
                              <Pencil className="h-3.5 w-3.5" />
                            </Button>
                          )}
                          {onDelete && (
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => onDelete(item)}>
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
}