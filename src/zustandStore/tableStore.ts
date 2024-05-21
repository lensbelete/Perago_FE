import { create } from "zustand";

export interface TableInterface {
  id: string;
  name: string;
  projectId: string;
}

interface tableStore {
  tables: TableInterface[];
  isLoading: boolean;
  setLoading: (isLoading: boolean) => void;
  setTables: (tables: TableInterface[]) => void;
  addTable: (table: TableInterface) => void;
}

const useTableStore = create<tableStore>((set) => ({
  isLoading: true,
  tables: [] as TableInterface[],
  setLoading: (isLoading: boolean) => set({ isLoading: isLoading }),
  setTables: (tables: TableInterface[]) => set(() => ({ tables: tables })),
  addTable: (table: TableInterface) =>
    set((state) => ({ tables: state.tables.concat([table]) })),
}));

export default useTableStore;
