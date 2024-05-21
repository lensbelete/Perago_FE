import { createSlice } from "@reduxjs/toolkit";

interface RelationShipInterface {
  columnId: string;
  referencedColumnId: string;
  name: string;
  type: string;
  eager: boolean;
  nullable: boolean;
}

interface ColumnInterface {
  id: string;
  name: string;
  type: string;
  model_id: string;
  isPrimary: boolean;
  isUnique: boolean;
  isForiegn: boolean;
  relations?: RelationShipInterface[];
}

const initialState = [] as ColumnInterface[];

const columnSlice = createSlice({
  name: "columnSlice",
  initialState,
  reducers: {
    addColumn: (state, action) => {
      const column = action.payload;
      state.push(column);
    },
    removeColumn: (state, action) => {
      const column = action.payload;
      state = state.filter((columnInstance) => columnInstance.id != column.id);
    },
    addColumns: (state, action) => {
      const columns = action.payload;
      state.concat(columns);
    },
  },
});

export const { addColumn, removeColumn, addColumns } = columnSlice.actions;
export default columnSlice.reducer;
